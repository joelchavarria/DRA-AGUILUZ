import { services } from "../site-data";

export type RequestKind = "cita" | "consulta";
export const requestServices = [
  { value: "orientacion", label: "No sé qué servicio necesito" },
  ...services.map(({ slug, name }) => ({ value: slug, label: name })),
];
export const inquiryTopics = [
  "Disponibilidad y horarios",
  "Precios y formas de pago",
  "Información sobre el servicio",
  "Otra consulta",
] as const;
export const preferredTimes = [
  "Por la mañana",
  "Por la tarde",
  "Sin preferencia",
] as const;

export type CareRequest = {
  kind: RequestKind | "";
  name: string;
  service: string;
  date: string;
  time: string;
  topic: string;
  comment: string;
};
export type RequestErrors = Partial<Record<keyof CareRequest, string>>;

export function changeRequestKind(
  data: CareRequest,
  kind: RequestKind,
): CareRequest {
  if (data.kind === kind) return data;
  return { ...data, kind, date: "", time: "", topic: "", comment: "" };
}

export function requestPath(service?: string, kind?: RequestKind) {
  const params = new URLSearchParams();
  if (service && requestServices.some((option) => option.value === service))
    params.set("servicio", service);
  if (kind === "cita" || kind === "consulta") params.set("tipo", kind);
  return `/solicitud${params.size ? `?${params}` : ""}`;
}

export function validateCareRequest(
  data: CareRequest,
  today: string,
): RequestErrors {
  const errors: RequestErrors = {};
  if (data.kind !== "cita" && data.kind !== "consulta")
    errors.kind = "Elegí el tipo de atención.";
  if (!requestServices.some((option) => option.value === data.service))
    errors.service = "Seleccioná un servicio o la opción de orientación.";
  if (data.name.trim().length < 2 || data.name.trim().length > 90)
    errors.name = "Escribí un nombre de entre 2 y 90 caracteres.";
  if (data.kind === "cita") {
    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(data.date) &&
      !Number.isNaN(Date.parse(`${data.date}T12:00:00Z`)) &&
      new Date(`${data.date}T12:00:00Z`).toISOString().slice(0, 10) ===
        data.date;
    if (data.date && (!validDate || data.date < today))
      errors.date = "Elegí una fecha válida, de hoy en adelante.";
    if (
      data.time &&
      !preferredTimes.includes(data.time as (typeof preferredTimes)[number])
    )
      errors.time = "Elegí uno de los horarios disponibles en la lista.";
  }
  if (data.kind === "consulta") {
    if (!inquiryTopics.includes(data.topic as (typeof inquiryTopics)[number]))
      errors.topic = "Elegí el tema de tu consulta.";
    if (data.topic === "Otra consulta" && data.comment.trim().length < 5)
      errors.comment = "Contanos brevemente qué información necesitás.";
  }
  if (data.comment.trim().length > 300)
    errors.comment = "Usá un máximo de 300 caracteres.";
  return errors;
}

const inline = (value: string) =>
  value
    .trim()
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ");
export function careRequestMessage(data: CareRequest) {
  const service = requestServices.find(
    (option) => option.value === data.service,
  );
  // Revalidate structure without a clock dependency. The form additionally
  // validates that appointment dates are not in the past before review.
  if (!service || Object.keys(validateCareRequest(data, "0000-01-01")).length)
    throw new Error("Revisá los datos de la solicitud.");
  const appointment = data.kind === "cita";
  const sections = [
    "Hola, Dra. Aguiluz.",
    appointment ? "*SOLICITUD DE CITA*" : "*CONSULTA DE INFORMACIÓN*",
    [`Nombre: ${inline(data.name)}`, `Servicio: ${service.label}`].join("\n"),
  ];
  if (appointment) {
    sections.push(
      [
        "*PREFERENCIAS DE CITA*",
        `Fecha: ${data.date ? data.date.split("-").reverse().join("/") : "Por coordinar"}`,
        `Horario: ${data.time || "Sin preferencia"}`,
      ].join("\n"),
    );
  } else {
    sections.push(`*TEMA DE LA CONSULTA*\n${data.topic}`);
  }
  if (data.comment.trim())
    sections.push(
      `*${appointment ? "COMENTARIO" : "MI PREGUNTA"}*\n${data.comment.trim()}`,
    );
  sections.push(
    appointment
      ? "Quedo pendiente de la confirmación de disponibilidad. Muchas gracias."
      : "Agradezco la información. Muchas gracias.",
  );
  return sections.join("\n\n");
}
