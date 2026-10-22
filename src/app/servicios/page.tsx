import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { RequestLink } from "@/components/RequestLink";
import { pageContent } from "@/config/site";
import { serviceContent } from "@/config/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Servicios dentales en Granada",
  "Odontopediatría, valoración dental, ortodoncia, prevención, cuidado de encías y restauraciones dentales con la Dra. Aguiluz en Granada.",
  "/servicios",
);
export default function ServicesPage() {
  const content = pageContent.services;
  return (
    <main id="contenido">
      <section className="page-intro">
        <div className="page-width page-intro-grid">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <RequestLink />
          </div>
          <Photo id="care" priority />
        </div>
      </section>
      <section className="section-space">
        <div className="page-width service-directory">
          {serviceContent.map((service, index) => (
            <article className="directory-row" key={service.slug}>
              <span className="index-number">0{index + 1}</span>
              <div className="directory-copy">
                <h2>
                  <Link href={`/servicios/${service.slug}`}>
                    {service.name}
                  </Link>
                </h2>
                <p>{service.summary}</p>
                <div className="directory-actions">
                  <Link
                    className="text-link"
                    href={`/servicios/${service.slug}`}
                  >
                    Conocer el servicio
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
              <Link
                href={`/servicios/${service.slug}`}
                aria-label={`Conocer ${service.name}`}
              >
                <Photo id={service.photo} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
