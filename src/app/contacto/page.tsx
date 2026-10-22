import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { RequestLink } from "@/components/RequestLink";
import { Photo } from "@/components/Photo";
import { clinic, pageContent } from "@/config/site";
import { clinicContact } from "@/config/contact";
import { mapEmbedUrl } from "@/site-data";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Agendá tu cita dental en Granada",
  "Solicitá tu cita por WhatsApp con la Dra. Aguiluz. Ubicación, indicaciones y formulario de contacto en Granada, Nicaragua.",
  "/contacto",
);
export default function ContactPage() {
  const content = pageContent.contact;
  return (
    <main id="contenido">
      <section className="contact-section section-space">
        <div className="page-width contact-grid">
          <Photo id="contactDoctor" className="contact-photo" priority />
          <div className="contact-copy">
            <div className="contact-intro">
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p>{content.description}</p>
              <RequestLink />
              {clinicContact.isTestNumber && (
                <small className="test-number">
                  WhatsApp de pruebas: +505 {clinicContact.whatsappDisplay}
                </small>
              )}
            </div>
            <dl className="contact-details">
              <div>
                <MapPin size={19} />
                <dt>Visitanos</dt>
                <dd>{clinic.address}</dd>
              </div>
              <div>
                <Clock size={19} />
                <dt>Horarios</dt>
                <dd>{clinic.schedule}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section-space contact-location">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NOS ENCONTRÁS EN GRANADA</p>
              <h2>Nos vemos en la clínica.</h2>
            </div>
            <a
              className="text-link"
              href={clinic.maps}
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
              <ArrowUpRight size={16} />
            </a>
          </div>
          <iframe
            title="Ubicación de Clínica Dental Dra. Aguiluz en Google Maps"
            src={mapEmbedUrl}
            className="map-frame"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>
    </main>
  );
}
