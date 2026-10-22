import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWhatsAppUrl, clinicContact } from "../src/config/contact.ts";

test("WhatsApp usa el número público y codifica tildes, signos y saltos", () => {
  assert.equal(clinicContact.whatsappNumber, "50557450031");
  const message = "Hola, ¿hay valoración?\nMaría & José";
  const url = new URL(buildWhatsAppUrl(message));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/50557450031");
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
