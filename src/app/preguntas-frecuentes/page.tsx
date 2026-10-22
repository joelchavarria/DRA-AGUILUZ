import { FaqList } from "@/components/FaqList";
import { RequestLink } from "@/components/RequestLink";
import { pageContent, faqs } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Preguntas frecuentes",
  "Cómo agendar, consultar precios y preparar tu primera visita a la Clínica Dental Dra. Aguiluz en Granada.",
  "/preguntas-frecuentes",
);
export default function QuestionsPage() {
  const content = pageContent.faq;
  return (
    <main id="contenido" className="faq-page page-width section-space">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <RequestLink kind="consulta" />
      </div>
      <FaqList items={faqs} />
    </main>
  );
}
