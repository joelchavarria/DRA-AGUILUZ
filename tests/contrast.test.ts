import assert from "node:assert/strict";
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
