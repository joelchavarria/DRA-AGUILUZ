import { Photo } from "@/components/Photo";
import { RequestLink } from "@/components/RequestLink";
import { pageContent, homeContent } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Conocé a la Dra. Aguiluz",
  "Conocé la forma de atención de la Dra. Aguiluz: odontología cercana, comunicación clara y cuidado personalizado en Granada.",
  "/dra-aguiluz",
);
export default function DoctorPage() {
  const content = pageContent.doctor;
  return (
    <main id="contenido">
      <section className="doctor-intro section-space">
        <div className="page-width doctor-intro-grid">
          <Photo id="doctorAtWork" priority />
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <RequestLink />
          </div>
        </div>
      </section>
      <section className="section-space philosophy">
        <div className="page-width split-grid">
          <div>
            <p className="eyebrow">NUESTRA FORMA DE CUIDAR</p>
            <h2>{content.philosophyTitle}</h2>
          </div>
          <div>
            <p>{content.philosophy}</p>
            <ul className="plain-list">
              {homeContent.welcome.principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="page-width editorial-grid">
          <Photo id="children" />
          <div>
            <p className="eyebrow">PARA VOS Y TU FAMILIA</p>
            <h2>{content.familyTitle}</h2>
            <p>{content.family}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
