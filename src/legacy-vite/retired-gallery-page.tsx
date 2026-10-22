import { Gallery } from "@/components/Gallery";
import { RequestLink } from "@/components/RequestLink";
import { patientComments } from "@/site-data";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Galería de la clínica dental",
  "Fotografías reales de la Dra. Aguiluz y de su atención dental en Granada, Nicaragua.",
  "/galeria",
);
export default function GalleryPage() {
  const content = {
    eyebrow: "LA VIDA EN LA CLÍNICA",
    title: "Personas reales. Cuidado cercano.",
    description: "Una mirada a nuestra atención de todos los días.",
  };
  return (
    <main id="contenido">
      <section className="text-intro page-width">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <div className="button-row">
          <RequestLink />
        </div>
      </section>
      <section
        className="page-width gallery-section"
        aria-label="Fotografías de la clínica"
      >
        <Gallery />
      </section>
      <section className="section-space patient-section">
        <div className="page-width split-grid">
          <div>
            <p className="eyebrow">PALABRAS QUE NOS ACOMPAÑAN</p>
            <h2>Lo que recuerdan de su visita.</h2>
            <p className="source-note">
              Comentarios compartidos por la clínica en sus redes. No
              corresponden a reseñas verificadas de Google.
            </p>
          </div>
          <div className="patient-quotes">
            {patientComments.slice(0, 3).map((comment) => (
              <blockquote key={comment}>“{comment}”</blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
