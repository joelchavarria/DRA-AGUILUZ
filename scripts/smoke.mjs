import assert from "node:assert/strict";

// HTTP smoke only: this script does not operate a browser or open WhatsApp.
const base = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:5173");
const services = [
  "odontopediatria",
  "evaluacion-integral",
  "ortodoncia",
  "prevencion-limpieza",
  "cuidado-encias",
  "orientacion-familiar",
  "restauraciones-dentales",
];
const routes = [
  "/",
  "/dra-aguiluz",
  "/servicios",
  "/preguntas-frecuentes",
  "/contacto",
  "/solicitud",
  ...services.map((slug) => `/servicios/${slug}`),
];
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]),
);
const clean = (html) => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
const anchors = (html) => [...clean(html).matchAll(/<a\b[^>]*>/gi)].map(([tag]) => attributes(tag));
const metas = (html) => [...clean(html).matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
const results = [];

async function get(path, options) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(60_000), ...options });
  return { response, html: await response.text() };
}

for (const path of routes) {
  try {
    const { response, html } = await get(path);
    const content = clean(html);
    assert.equal(response.status, 200, "HTTP 200");
    assert.equal((content.match(/<h1\b/gi) || []).length, 1, "exactly one H1");
    assert.match(content, /<html[^>]*lang="es-NI"/, "Spanish locale");
    assert.match(content, /<title>[^<]+<\/title>/, "nonempty page title");
    const metadata = metas(html);
    assert.ok(metadata.some((meta) => meta.name === "description" && meta.content?.length > 20), "page description");
    assert.ok(metadata.some((meta) => meta.property === "og:title" && meta.content), "Open Graph title");
    assert.ok(metadata.some((meta) => meta.name === "robots" && meta.content?.includes("noindex")), "test site remains noindex");
    const links = anchors(html);
    assert.ok(!links.some((link) => link.href && ["/galeria", "/experiencias"].includes(new URL(link.href, base).pathname)), "no navigation to retired gallery");
    const requests = links.filter((link) => link.href && new URL(link.href, base).pathname === "/solicitud");
    assert.ok(requests.length <= 1, `at most one request CTA (found ${requests.length})`);
    assert.ok(!links.some((link) => /(?:wa\.me|api\.whatsapp\.com)/i.test(link.href || "")), "no direct WhatsApp link before review");
    if (path.startsWith("/servicios/")) {
      assert.equal(requests.length, 1, "service has one request CTA");
      assert.equal(new URL(requests[0].href, base).searchParams.get("servicio"), path.split("/").at(-1), "service is carried into request");
    }
    for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) JSON.parse(json);
    results.push({ route: path, status: response.status, requestLinks: requests.length, result: "PASS" });
  } catch (error) {
    results.push({ route: path, result: "FAIL", reason: error.message });
  }
}

for (const kind of ["cita", "consulta"]) {
  const path = `/solicitud?servicio=odontopediatria&tipo=${kind}`;
  try {
    const { response, html } = await get(path);
    assert.equal(response.status, 200);
    assert.match(clean(html), /<option[^>]*value="odontopediatria"[^>]*selected=""/, "service preselection");
    const chosen = [...clean(html).matchAll(/<input\b[^>]*>/g)].map(([tag]) => ({ tag, ...attributes(tag) })).find((input) => input.name === "kind" && input.value === kind);
    assert.ok(chosen?.tag.includes('checked=""'), "request kind preselection");
    results.push({ route: path, status: response.status, result: "PASS" });
  } catch (error) {
    results.push({ route: path, result: "FAIL", reason: error.message });
  }
}

for (const path of ["/pagina-inexistente-qa", "/servicios/servicio-inexistente-qa"]) {
  try {
    const { response, html } = await get(path);
    assert.equal(response.status, 404, "unknown route returns 404");
    // A nested notFound() may stream its UI through React in Next dev.
    // HTTP 404 is the smoke contract; verify the rendered UI in the browser.
    if (path === "/pagina-inexistente-qa") assert.match(clean(html), /Volvamos a encontrarnos/, "custom not-found content");
    results.push({ route: path, status: response.status, result: "PASS" });
  } catch (error) {
    results.push({ route: path, result: "FAIL", reason: error.message });
  }
}

for (const [path, expected] of [["/robots.txt", /Disallow: \//], ["/sitemap.xml", /<urlset/]]) {
  try {
    const { response, html } = await get(path);
    assert.equal(response.status, 200);
    assert.match(html, expected);
    results.push({ route: path, status: response.status, result: "PASS" });
  } catch (error) {
    results.push({ route: path, result: "FAIL", reason: error.message });
  }
}

for (const path of ["/experiencias", "/galeria"]) {
  try {
    const { response } = await get(path, { redirect: "manual" });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get("location"), base).pathname, "/dra-aguiluz");
    results.push({ route: path, status: response.status, result: "PASS" });
  } catch (error) {
    results.push({ route: path, result: "FAIL", reason: error.message });
  }
}

console.table(results);
const failed = results.filter((result) => result.result === "FAIL");
console.log(`${results.length - failed.length}/${results.length} HTTP checks passed. No messages were sent.`);
if (failed.length) process.exitCode = 1;
