# Clínica Dental Dra. Aguiluz

Web multipágina de la clínica en Granada, Nicaragua. Diseño editorial con contenido sobre fondo crema (`#F8F5EF`), navbar azul petróleo (`#001B30`) y logo horizontal original, fotografías reales y un flujo de cita o consulta con revisión previa al envío por WhatsApp.

## Desarrollo

Requiere Node.js 24 y npm 11. Versiones reproducibles en `package-lock.json`.

```bash
nvm use
npm ci
npm run dev
```

Abrir http://127.0.0.1:5173. El número predeterminado de WhatsApp es **50557450031**.

```bash
npm run typecheck # TypeScript
npm test          # mensajes de WhatsApp y contraste
npm run lint      # análisis estático
npm run build     # producción con Next.js
npm run preview   # servidor de producción local, después del build
node scripts/smoke.mjs # HTTP, metadata, rutas y enlaces; requiere servidor activo
```

## Tecnología y rutas

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Lucide, Motion y Next/Image. Fuentes locales: Geist y Cormorant Garamond. Next.js sustituye al servidor Vite; no se ejecutan ambos a la vez.

Rutas: `/`, `/dra-aguiluz`, `/servicios`, `/servicios/[slug]`, `/preguntas-frecuentes`, `/contacto` y `/solicitud`. La galería se retiró de la navegación y de la web; `/galeria` y `/experiencias` redirigen a `/dra-aguiluz`.

Los siete servicios tienen páginas propias e imágenes distintas, incluidas las nuevas restauraciones dentales. Las preguntas frecuentes se concentran en su página: no se repite el mismo bloque en cada servicio. Cada página informativa tiene un solo acceso a solicitar atención; se retiraron el WhatsApp flotante y los bloques finales de llamada a la acción duplicados. No hay enlaces directos a WhatsApp en estas páginas.

## Dónde editar

- `src/config/site.ts`: datos de la clínica, navegación, textos y preguntas frecuentes.
- `src/config/services.ts` y `src/site-data.ts`: catálogo y descripciones de servicios.
- `src/config/photos.ts`: fotografías, textos alternativos, categorías y encuadres.
- `src/config/contact.ts`: número, enlaces y formato de mensajes de WhatsApp.
- `src/config/requests.ts`: tipos de atención, opciones, validación y mensaje organizado de la solicitud.
- `src/components/RequestForm.tsx`: captura y revisión de la solicitud, antes de abrir WhatsApp.
- `src/app/site.css`: paleta, escala tipográfica, composición y responsive.
- `src/components/ui/`: componentes shadcn/ui.
- `src/lib/seo.ts`: metadata y datos estructurados.
- `public/images/aguiluz/README.md`: procedencia de las fotografías.

Las fotos de la web son archivos originales autorizados. La foto de inicio usa `dra-aguiluz-consultorio-hd.webp`, una conversión WebP sin pérdida del archivo de **1080 × 1350 px** aportado por Joel, completo y con su proporción original. En la página de la doctora, `doctorAtWork` presenta la foto con uniforme naranja mediante un recorte que excluye el teléfono y la dirección antiguos del afiche. Los materiales de prevención y restauraciones aportados por Joel aparecen completos en sus servicios respectivos. No se regeneraron caras, pacientes ni tratamientos. Los encuadres no agregan detalle que no exista en el original. Para sustituir una foto, actualizar su archivo, dimensiones y encuadre en `src/config/photos.ts`.

Contacto muestra ubicación, horarios por confirmar y un acceso al formulario; ya no duplica el formulario.

## Flujo de solicitud

1. Entrar a `/solicitud` y elegir **Agendar una cita** o **Hacer una consulta**.
2. Elegir servicio (incluida la opción de orientación) e indicar un nombre. Desde un servicio, la elección llega preseleccionada mediante `?servicio=slug`.
3. Para una cita, agregar fecha, franja horaria y comentario opcionales. Para una consulta, seleccionar un tema; una pregunta breve es obligatoria cuando se elige «Otra consulta».
4. Revisar el mensaje con encabezados y datos ordenados. Se puede volver a corregir sin perder la información.
5. Elegir **Continuar en WhatsApp**. La persona debe enviar el mensaje desde WhatsApp; la web no lo envía automáticamente.

No se confirma una reserva automáticamente ni se guardan datos en una base de datos. No introducir información clínica sensible. El mensaje de cita indica que la disponibilidad está sujeta a confirmación. El número de WhatsApp de la clínica se muestra antes de salir de la web. La ruta `/solicitud` permanece en `noindex`, también cuando se publique el resto del sitio.

## Publicación

1. Verificar el contenido con la doctora antes de publicarlo.
2. Crear `.env.local` a partir de `.env.example` para pruebas, o configurar esas variables en el proveedor de hosting.
3. Definir `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS real y `NEXT_PUBLIC_WHATSAPP_NUMBER=50557450031`, incluido el código de país y sin espacios.
4. Activar `NEXT_PUBLIC_ALLOW_INDEXING=true` únicamente en producción aprobada.
5. Ejecutar las verificaciones anteriores y volver a compilar: las variables `NEXT_PUBLIC_` se incorporan durante el build.
6. Desplegar en un alojamiento compatible con Next.js y Node 24. Build: `npm run build`; inicio: `npx next start --hostname 0.0.0.0 --port 3000` (adaptar el puerto al proveedor).
7. Revisar canonical, robots, sitemap, enlaces y WhatsApp en el dominio definitivo. Registrar la propiedad en Search Console y solicitar indexación con autorización de la propietaria.

El sitio permanece en `noindex` mientras falte el dominio o no se active la indexación. La configuración actual de ejemplo mantiene `NEXT_PUBLIC_ALLOW_INDEXING=false`. No se inventa un dominio para canonical/sitemap, ni se publican puntuaciones o reseñas de Google no verificadas. La preparación técnica de SEO no garantiza posiciones en búsquedas. No se ha publicado esta versión.

El smoke HTTP está pensado para la configuración de pruebas sin indexación. Para probar otro servidor local: `SMOKE_BASE_URL=http://127.0.0.1:3000 node scripts/smoke.mjs`. No sustituye las pruebas de interacción en navegador ni envía mensajes.

## Pendiente de confirmar con la clínica

Nombre completo y formación, horarios, métodos de pago, servicios adicionales, fotografías originales de instalaciones, resultados clínicos con consentimientos específicos, reseñas verificadas de Google y dominio. La lista también está en `pendingVerification` en la configuración.

## Conservación del trabajo anterior

La implementación Vite anterior está conservada en `src/legacy-vite/` y excluida de TypeScript. La página retirada de galería se conserva en `src/legacy-vite/retired-gallery-page.tsx`; no es una ruta activa. Los antiguos `index.html` y `src/App.css` no forman parte de la aplicación Next.js. No se eliminaron las fotografías originales.
