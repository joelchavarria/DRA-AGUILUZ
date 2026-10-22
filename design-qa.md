# Revisión del rediseño — 22 de octubre de 2026

## Diseño

El navbar usa el logo original blanco y dorado, encuadrado horizontalmente sobre su mismo azul `#001B30`, según la opción aprobada por Joel. Se sirve el original para conservar la nitidez. El contenido mantiene el fondo crema y el menú móvil conserva texto oscuro sobre crema.

La web usa un fondo crema uniforme `#F8F5EF`, textos y botones azul petróleo, y acentos terracota discretos. No hay alternancia de secciones blancas y coloreadas. Los componentes shadcn comparten los mismos tokens. Los servicios se presentan en un directorio editorial, no en tarjetas repetidas. Se retiró el separador decorativo del pie de página.

Las fotografías son archivos originales autorizados. La foto de inicio usa el original aportado por Joel, `dra-aguiluz-consultorio-hd.png` (1080 × 1350 px), completo y con su proporción original. La página de la doctora usa `doctorAtWork`, un recorte de la foto con uniforme naranja que excluye el contacto antiguo del afiche. Los materiales nuevos de prevención y restauraciones se muestran completos en sus respectivos servicios. Los siete servicios usan imágenes distintas. No se utilizan fotografías generadas de pacientes, instalaciones o resultados; tampoco se reconstruye el rostro de la doctora.

Se retiró la galería de navegación, inicio y rutas activas. Su fuente se conserva en `src/legacy-vite/retired-gallery-page.tsx`.

## Solicitud y simplificación del contenido

- Una sola llamada a solicitar atención por página informativa, sin acceso flotante a WhatsApp ni bloques de cierre repetidos.
- Preguntas frecuentes en una página central, sin repetirlas debajo de cada servicio.
- Contacto contiene datos de la clínica y un acceso a `/solicitud`, no un segundo formulario.
- En `/solicitud` se elige cita o consulta, servicio y nombre. Las preferencias de cita son opcionales; las consultas incluyen un tema.
- La revisión muestra el mensaje organizado, permite corregir y solo entonces ofrece el enlace a WhatsApp.

## Smoke HTTP de esta revisión

Ejecutado con `node scripts/smoke.mjs` contra `http://127.0.0.1:5173`. Es una comprobación de respuestas y HTML, no una prueba de navegador.

- Las 13 páginas actuales responden HTTP 200, con un solo H1, idioma `es-NI`, título, descripción, Open Graph y `noindex`.
- Cada página informativa contiene exactamente un enlace a `/solicitud`; la propia solicitud no repite ese acceso.
- No hay enlaces `wa.me` en el HTML inicial de ninguna de esas páginas. El único componente activo que construye ese enlace es la revisión final de `RequestForm`.
- Las siete páginas de servicio transfieren el servicio correspondiente mediante query.
- Las variantes `?servicio=odontopediatria&tipo=cita` y `tipo=consulta` responden 200 y preseleccionan los campos correspondientes en el HTML.
- La ruta inexistente general responde 404 con la página personalizada. Un servicio inexistente también responde 404. En desarrollo, este último entrega inicialmente el fallback de Next; el smoke comprueba el código HTTP, no certifica la apariencia del error después de hidratar.
- `robots.txt` y `sitemap.xml` responden 200. Robots bloquea indexación; no se han inventado URLs de producción para el sitemap.
- Ninguna página informativa enlaza a la galería retirada. `/galeria` y `/experiencias` responden 308 hacia `/dra-aguiluz`.

Resultado: **21 de 21 comprobaciones HTTP aprobadas**, con el límite de alcance del 404 de servicio descrito arriba. No se abrió WhatsApp ni se enviaron mensajes. Build, TypeScript, tests unitarios y comprobación interactiva se registran por separado cuando se ejecutan sobre la versión final; los resultados de iteraciones anteriores no se consideran certificación de esta versión.

## Contenido y publicación

Se mantienen los seis servicios documentados y se agregó restauraciones dentales con el material de la clínica aportado por Joel. No se inventaron credenciales, horarios, resultados ni valoraciones de Google. Los comentarios compartidos por la clínica se identifican como tales.

WhatsApp permanece en `50589953348`, número temporal solicitado por Joel. No aparece como teléfono público en los datos estructurados. El formulario prepara una solicitud, no una reserva confirmada.

La web sigue siendo una vista local. La indexación está desactivada hasta aprobar el contenido, configurar el dominio y cambiar el teléfono temporal. Metadata, canonical, sitemap y robots están implementados con esas condiciones. La lista de datos pendientes y las instrucciones de publicación están en README.md.
