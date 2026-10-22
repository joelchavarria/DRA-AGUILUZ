import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { RequestLink } from "@/components/RequestLink";
import { JsonLd } from "@/components/JsonLd";
import { homeContent as content } from "@/config/site";
import { photos } from "@/config/photos";
import { services } from "@/site-data";
import { pageMetadata, dentistSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "Dentista en Granada, Nicaragua",
  "Atención dental personalizada, odontopediatría y valoración con la Dra. Aguiluz en Granada. Conocé la clínica y coordiná tu cita por WhatsApp.",
  "/",
);
export default function HomePage() {
  return (
    <main id="contenido">
      <JsonLd data={dentistSchema} />
      <section className="home-hero">
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>
              {content.title}
              <br />
              <em>{content.titleAccent}</em>
            </h1>
            <p className="hero-description">{content.description}</p>
            <div className="button-row">
              <RequestLink />
              <Link className="text-link" href="/servicios">
                Conocer los servicios
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-footnote">
              <MapPin size={15} />
              <span>Atención personal en el corazón de Granada</span>
            </div>
          </div>
          <figure className="hero-figure">
            <Image
              src={`/images/aguiluz/${photos.doctor.file}`}
              alt={photos.doctor.alt}
              width={photos.doctor.width}
              height={photos.doctor.height}
              sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1100px) 50vw, 520px"
              preload
              quality={90}
              className="h-auto w-full"
            />
            <figcaption>
              {content.heroCaption}
              <span>01 / LA DOCTORA</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="welcome-section section-space">
        <Reveal className="page-width welcome-grid">
          <div className="welcome-visual">
            <Photo id="child" />
            <span className="photo-caption">
              Pequeñas sonrisas, grandes cuidados.
            </span>
          </div>
          <div className="welcome-copy">
            <p className="eyebrow">{content.welcome.eyebrow}</p>
            <h2>{content.welcome.title}</h2>
            <p>{content.welcome.description}</p>
            <ul className="principles">
              {content.welcome.principles.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
      <section className="services-section section-space">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CUIDADO PARA TODA LA FAMILIA</p>
              <h2>Una atención para cada etapa.</h2>
            </div>
            <Link className="text-link" href="/servicios">
              Todos los servicios
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="service-index">
            {services.map((service, index) => (
              <Link
                className="service-row"
                key={service.slug}
                href={`/servicios/${service.slug}`}
              >
                <span className="index-number">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="doctor-section section-space">
        <Reveal className="page-width doctor-home-grid">
          <div className="doctor-home-copy">
            <p className="eyebrow">{content.doctor.eyebrow}</p>
            <h2>{content.doctor.title}</h2>
            <p>{content.doctor.description}</p>
            <Button asChild className="outline-button">
              <Link href="/dra-aguiluz">
                Conocé a la doctora
                <ArrowUpRight size={17} />
              </Link>
            </Button>
          </div>
          <Photo id="portrait" className="doctor-home-portrait" />
          <Photo id="care" className="doctor-home-care" />
        </Reveal>
      </section>
    </main>
  );
}
