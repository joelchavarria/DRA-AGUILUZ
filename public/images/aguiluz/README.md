# Banco visual — Clínica Dental Dra. Aguiluz

- `odontopediatria-dientes-leche.png`: pieza de 1080 × 1350 aportada por Joel para Odontopediatría. Se muestra completa en el listado y en la página del servicio.

- `cuidado-encias.png`: pieza de 1080 × 1350 aportada por Joel para Cuidado de encías. El encuadre CSS conserva la fotografía de dientes y encías y deja fuera el texto publicitario y el teléfono antiguo.

- `limpieza-dental-servicios.png`: pieza de 2048 × 2048 aportada por Joel para la portada de Servicios. Se conserva el original y se encuadra con CSS la fotografía de la limpieza, dejando fuera el texto publicitario y los datos antiguos de contacto.

Selección preparada el 22 de octubre de 2026 a partir de las cuentas públicas de
Facebook e Instagram de la clínica. El usuario confirmó que la clínica autorizó
el uso de sus fotografías para el proyecto.

## Selección y uso recomendado

- `dra-aguiluz-consultorio.jpg`: imagen humana principal; recomendada para el hero.
- `dra-aguiluz-consultorio-hd.png`: archivo de 1080 × 1350 proporcionado directamente por Joel el 22 de octubre de 2026. Sustituye la imagen de 512 × 640 en la portada, donde se muestra completa por petición del usuario. En otros contextos el encuadre CSS excluye los textos del anuncio; no se retoca el rostro ni se reconstruyen píxeles con IA. Se conserva el archivo anterior.
- `dra-aguiluz-retrato.jpg`: retrato profesional para la sección sobre la doctora.
- `odontopediatria-comodidad.jpg`: atención infantil; comunica un entorno amable.
- `odontopediatria-acompanamiento.jpg`: vínculo entre la doctora y pacientes niños.
- `atencion-adultos.jpg`: evidencia que la clínica ofrece atención integral, no solo pediátrica.
- `calidad-servicio.jpg`: procedimiento real para apoyar la sección de servicios.
- `bienvenida-cita.jpg`: bienvenida y atención personalizada; útil junto al formulario.
- `nueva-clinica.jpg`: fachada y referencia visual para la sección de ubicación.
- `prueba-social.jpg`: pieza de confianza; usar como apoyo, no como titular principal.
- `referencia-marca.png`: referencia de colores, formas y estilo de marca. Tiene texto
  incrustado, por lo que no se recomienda como imagen principal de la web.
- `prevencion-caries-placa.png`: pieza educativa de 1080 × 1350 adjuntada directamente por Joel el 22 de octubre de 2026. Se muestra completa, con su proporción original, en prevención y limpieza dental.
- `restauraciones-dentales.png`: pieza de 1080 × 1350 adjuntada directamente por Joel el 22 de octubre de 2026. Se muestra completa en restauraciones dentales y respalda las opciones descritas en ese servicio. Sus ilustraciones no se presentan como resultados de pacientes.
- `doctora-atencion-ortodoncia.png`: pieza horizontal de 3170 × 1321 adjuntada directamente por Joel el 22 de octubre de 2026. En la página de la doctora se utiliza un encuadre CSS de la profesional con uniforme naranja. El encuadre excluye el teléfono y la dirección antiguos de la pieza; el original se conserva sin modificar.

Los siete servicios usan siete archivos diferentes. La asignación se edita en
`src/config/services.ts`; los encuadres y la presentación completa de las piezas
educativas se definen en `src/config/photos.ts`. Estas incorporaciones no emplean
generación de imagen ni reconstrucción de rostros.

Se excluyeron imágenes clínicas invasivas y una publicación de carillas con señales
de ser material compartido de un tercero. La landing debe priorizar calma, cercanía,
familia y profesionalismo.

## Contacto de desarrollo

- WhatsApp temporal para pruebas: `+505 8995 3348`.
- El número público encontrado en las redes no se usará durante las pruebas.
- La configuración editable vive en `src/config/contact.ts`.

## Ubicación verificada

- Nombre: Clínica Dental Dra. Aguiluz.
- Dirección: del Ministerio Público, Calle Real Xalteva / Calle El Consulado,
  25 varas al este, Granada, Nicaragua.
- Coordenadas: `11.9300494, -85.957051`.
- Plus Code: `W2JV+25 Granada`.
- Teléfono publicado: `5745 0031` (referencia; no usar para las pruebas).

El mapa puede integrarse en la sección de ubicación usando el iframe suministrado
por el cliente, con carga diferida y un enlace alternativo para abrir Google Maps.
