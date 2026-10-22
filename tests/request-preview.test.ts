import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WhatsAppMessagePreview } from "../src/components/WhatsAppMessagePreview.tsx";

test("la vista previa muestra títulos y etiquetas en negrita sin asteriscos visibles", () => {
  const html = renderToStaticMarkup(createElement(WhatsAppMessagePreview, {
    message: "🦷 *Solicitud de cita*\n\n*Nombre:* María\n*Servicio:* Odontopediatría",
  }));
  assert.match(html, /🦷 <strong>Solicitud de cita<\/strong>/);
  assert.match(html, /<strong>Nombre:<\/strong> María\n<strong>Servicio:<\/strong>/);
  assert.equal((html.match(/<p\b/g) || []).length, 2);
  assert.ok(!html.includes("*"));
});

test("la vista previa conserva saltos y trata el contenido escrito como texto, no HTML", () => {
  const html = renderToStaticMarkup(createElement(WhatsAppMessagePreview, {
    message: "*Mi pregunta:*\nPrimera línea\n<script>alert(1)</script> & otra línea",
  }));
  assert.match(html, /Primera línea\n&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; otra línea/);
  assert.ok(!html.includes("<script>"));
});

test("la vista previa no oculta asteriscos sin contenido en negrita", () => {
  const html = renderToStaticMarkup(createElement(WhatsAppMessagePreview, {
    message: "*\n\n**",
  }));
  assert.ok(!html.includes("<strong>"));
  assert.match(html, />\*<\/p>/);
  assert.match(html, />\*\*<\/p>/);
});
