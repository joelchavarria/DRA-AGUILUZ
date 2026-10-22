import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

function luminance(hex: string) {
  const values = hex
    .match(/[a-f0-9]{2}/gi)!
    .map((value) => parseInt(value, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
test("texto principal, texto secundario y botones superan WCAG AA para texto normal", () => {
  for (const [foreground, background] of [
    ["183a46", "f8f5ef"],
    ["65716f", "f8f5ef"],
    ["945b46", "f8f5ef"],
    ["ffffff", "183a46"],
  ]) {
    assert.ok(
      contrast(foreground, background) >= 4.5,
      `${foreground} sobre ${background}`,
    );
  }
});

test("el footer azul mantiene contraste AA en textos, enlaces y anotaciones", () => {
  const css = readFileSync(new URL("../src/app/site.css", import.meta.url), "utf8");
  const color = (name: string) => {
    const value = css.match(new RegExp(`--${name}:\\s*#([a-f0-9]{6})`, "i"))?.[1];
    assert.ok(value, `color ${name} definido`);
    return value;
  };
  assert.match(css, /--footer-background:\s*var\(--brand-navy\)/);
  const background = color("brand-navy");
  for (const name of ["footer-foreground", "footer-muted", "brand-gold"]) {
    assert.ok(contrast(color(name), background) >= 4.5, `${name} sobre el footer azul`);
  }
});
