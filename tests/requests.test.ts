import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWhatsAppUrl } from "../src/config/contact.ts";
import {
  careRequestMessage,
  changeRequestKind,
  requestPath,
  validateCareRequest,
  type CareRequest,
  type RequestKind,
} from "../src/config/requests.ts";

const appointment: CareRequest = {
  kind: "cita",
  name: "María de prueba",
  service: "odontopediatria",
  date: "2026-12-15",
  time: "Por la mañana",
  topic: "",
  comment: "La cita es para mi hija.",
};
test("la pantalla intermedia conserva únicamente servicio e intención, nunca datos personales", () => {
  assert.equal(
    requestPath("odontopediatria", "cita"),
    "/solicitud?servicio=odontopediatria&tipo=cita",
  );
  assert.equal(requestPath("servicio-inventado"), "/solicitud");
  assert.equal(requestPath(undefined, "invalido" as RequestKind), "/solicitud");
});
test("cambiar el tipo limpia preferencias y pregunta sin perder nombre o servicio", () => {
  const inquiry = changeRequestKind(appointment, "consulta");
  assert.deepEqual(inquiry, {
    ...appointment,
    kind: "consulta",
    date: "",
    time: "",
    topic: "",
    comment: "",
  });
  const nextAppointment = changeRequestKind(
    { ...inquiry, topic: "Otra consulta", comment: "Una consulta de prueba." },
    "cita",
  );
  assert.equal(nextAppointment.topic, "");
  assert.equal(nextAppointment.comment, "");
  assert.equal(nextAppointment.name, appointment.name);
  assert.equal(nextAppointment.service, appointment.service);
  assert.equal(changeRequestKind(appointment, "cita"), appointment);
});
test("una cita genera secciones legibles, nombre real del servicio y preferencias", () => {
  assert.deepEqual(validateCareRequest(appointment, "2026-10-22"), {});
  const message = careRequestMessage(appointment);
  assert.equal(message, [
    "Hola, Dra. Aguiluz.",
    "Soy *María de prueba*.\nQuisiera agendar una cita para *odontopediatría*.",
    "*Mi preferencia*\n15 de diciembre de 2026 · Por la mañana",
    "*Comentario adicional*\nLa cita es para mi hija.",
    "Quedo pendiente de su confirmación.\nMuchas gracias.",
  ].join("\n\n"));
  assert.doesNotMatch(message, /\p{Extended_Pictographic}|\uFFFD/u);
  const url = new URL(buildWhatsAppUrl(message));
  assert.equal(url.searchParams.get("text"), message);
});
test("consulta usa el tema elegido y nunca arrastra fechas de una cita anterior", () => {
  const inquiry: CareRequest = {
    ...appointment,
    kind: "consulta",
    topic: "Precios y formas de pago",
    comment: "¿Cuál es el precio de la valoración?",
  };
  assert.deepEqual(validateCareRequest(inquiry, "2026-10-22"), {});
  const message = careRequestMessage(inquiry);
  assert.match(message, /Quisiera información sobre \*odontopediatría\*/);
  assert.match(message, /\*Me gustaría saber\*\nPrecios y formas de pago/);
  assert.match(message, /\*Mi pregunta\*\n¿Cuál es el precio de la valoración\?/);
  assert.doesNotMatch(
    message,
    /Fecha:|Horario:|15 de diciembre|Mi preferencia/,
  );
});
test("rechaza nombre vacío, servicio desconocido y fechas pasadas o inexistentes", () => {
  assert.ok(
    validateCareRequest({ ...appointment, name: "  " }, "2026-10-22").name,
  );
  assert.ok(
    validateCareRequest(
      { ...appointment, service: "implantes-no-confirmados" },
      "2026-10-22",
    ).service,
  );
  for (const date of ["2026-01-01", "2026-02-30", "no-es-fecha"])
    assert.ok(validateCareRequest({ ...appointment, date }, "2026-10-22").date);
});
test("las fechas conservan el día local y se validan años bisiestos", () => {
  const today = { ...appointment, date: "2026-10-22" };
  assert.deepEqual(validateCareRequest(today, "2026-10-22"), {});
  assert.match(careRequestMessage(today), /22 de octubre de 2026 · Por la mañana/);
  assert.deepEqual(
    validateCareRequest({ ...appointment, date: "2028-02-29" }, "2026-10-22"),
    {},
  );
  assert.ok(
    validateCareRequest({ ...appointment, date: "2027-02-29" }, "2026-10-22")
      .date,
  );
});
test("no genera un mensaje con opciones desconocidas o una consulta incompleta", () => {
  assert.ok(
    validateCareRequest({ ...appointment, kind: "" }, "2026-10-22").kind,
  );
  assert.ok(
    validateCareRequest({ ...appointment, time: "Medianoche" }, "2026-10-22")
      .time,
  );
  assert.ok(
    validateCareRequest(
      { ...appointment, kind: "consulta", topic: "" },
      "2026-10-22",
    ).topic,
  );
  assert.ok(
    validateCareRequest(
      { ...appointment, comment: "a".repeat(301) },
      "2026-10-22",
    ).comment,
  );
  assert.throws(
    () => careRequestMessage({ ...appointment, date: "2026-02-30" }),
    /Revisá los datos/,
  );
  assert.throws(
    () => careRequestMessage({ ...appointment, kind: "consulta", topic: "" }),
    /Revisá los datos/,
  );
});
test("otra consulta requiere una pregunta; la cita puede omitir preferencias", () => {
  assert.ok(
    validateCareRequest(
      { ...appointment, kind: "consulta", topic: "Otra consulta", comment: "" },
      "2026-10-22",
    ).comment,
  );
  const noDate = { ...appointment, date: "", time: "", comment: "" };
  assert.deepEqual(validateCareRequest(noDate, "2026-10-22"), {});
  assert.match(
    careRequestMessage(noDate),
    /Fecha por coordinar · Sin preferencia de horario/,
  );
  assert.doesNotMatch(careRequestMessage(noDate), /undefined|null|Comentario adicional/);
});

test("la opción de orientación y una pregunta libre generan frases naturales sin etiquetas genéricas", () => {
  const orientation = careRequestMessage({ ...appointment, service: "orientacion" });
  assert.match(orientation, /Quisiera agendar una valoración y recibir orientación\./);
  assert.doesNotMatch(orientation, /cita para \*no sé/);
  const inquiry = careRequestMessage({ ...appointment, kind: "consulta", service: "orientacion", topic: "Otra consulta", comment: "¿Cómo puedo coordinar mi primera visita?" });
  assert.match(inquiry, /Quisiera orientación para saber qué servicio necesito\./);
  assert.match(inquiry, /\*Mi pregunta\*\n¿Cómo puedo coordinar mi primera visita\?/);
  assert.doesNotMatch(inquiry, /Otra consulta|Me gustaría saber/);
});
