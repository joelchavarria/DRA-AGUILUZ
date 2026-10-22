import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Photo } from "@/components/Photo";
import { RequestLink } from "@/components/RequestLink";
import { JsonLd } from "@/components/JsonLd";
import { serviceContent } from "@/config/services";
import { clinic } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return serviceContent.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceContent.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata(
    `${service.name} en Granada`,
    `${service.summary} Consultá con la Dra. Aguiluz en Granada, Nicaragua.`,
    `/servicios/${slug}`,
  );
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceContent.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <main id="contenido">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          provider: { "@type": "Dentist", name: clinic.name },
          areaServed: "Granada, Nicaragua",
        }}
      />
      <section className="page-intro detail-intro">
        <div className="page-width page-intro-grid">
          <div>
            <Link className="back-link" href="/servicios">
              <ArrowLeft size={15} />
              Todos los servicios
            </Link>
            <h1>{service.name}</h1>
            <p>{service.intro}</p>
            <RequestLink service={service.slug} />
          </div>
          <Photo id={service.photo} priority />
        </div>
      </section>
      <section className="section-space">
        <div className="page-width detail-grid">
          <div>
            <h2>Cuándo consultar</h2>
            <ul className="detail-list">
              {service.idealFor.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Cómo es la atención</h2>
            <ol className="detail-list">
              {service.includes.map((item, index) => (
                <li key={item}>
                  <span className="index-number">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="page-width clinical-note">{service.note}</p>
      </section>
    </main>
  );
}
