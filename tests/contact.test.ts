import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWhatsAppUrl, clinicContact } from "../src/config/contact.ts";

test("WhatsApp conserva el número temporal y codifica tildes, signos y saltos", () => {
  assert.equal(clinicContact.whatsappNumber, "50589953348");
  const message = "Hola, ¿hay valoración?\nMaría & José";
  const url = new URL(buildWhatsAppUrl(message));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/50589953348");
  assert.equal(url.searchParams.get("text"), message);
});

test("el enlace elimina espacios externos sin alterar el contenido del mensaje", () => {
  const url = new URL(
    buildWhatsAppUrl("  Hola, Dra. Aguiluz.\n\nMi pregunta: ¿hay citas?  "),
  );
  assert.equal(
    url.searchParams.get("text"),
    "Hola, Dra. Aguiluz.\n\nMi pregunta: ¿hay citas?",
  );
});
