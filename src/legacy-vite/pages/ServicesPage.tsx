import { ArrowRight, CalendarDots } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { services } from '@/site-data'

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios dentales de Clínica Dental Dra. Aguiluz',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.name,
    url: `/servicios/${service.slug}`,
  })),
}

export function ServicesPage() {
  return (
    <main>
      <Seo
        title="Servicios dentales en Granada"
        description="Conocé los servicios de la Clínica Dental Dra. Aguiluz: odontopediatría, evaluación integral, ortodoncia, prevención, limpieza y cuidado de encías."
        path="/servicios"
        image="/images/aguiluz/dra-aguiluz-consultorio.jpg"
        jsonLd={servicesSchema}
      />
      <section className="page-hero services-hero">
        <div className="page-width page-hero-grid">
          <div><p className="overline">SERVICIOS DENTALES</p><h1>Cuidado claro para cada etapa de tu sonrisa.</h1><p>Comenzamos por escuchar, valorar y explicarte. Así podés tomar decisiones con tranquilidad y sin promesas que no correspondan a tu caso.</p></div>
          <img src="/images/aguiluz/dra-aguiluz-consultorio.jpg" alt="Dra. Aguiluz en su consultorio dental en Granada" />
        </div>
      </section>

      <section className="services-directory">
        <div className="page-width">
          <div className="directory-intro"><p className="overline">ENCONTRÁ TU ATENCIÓN</p><h2>¿Qué necesitás cuidar hoy?</h2><p>Elegí un servicio para conocer en qué consiste. La indicación definitiva siempre depende de una valoración profesional.</p></div>
          <div className="directory-list">
            {services.map((service, index) => (
              <article className="directory-row" key={service.slug}>
                <span className="directory-number">0{index + 1}</span>
                <div><p className="directory-kicker">{service.shortName}</p><h3>{service.name}</h3><p>{service.summary}</p><Link className="text-link" to={`/servicios/${service.slug}`}>Conocer el servicio <ArrowRight /></Link></div>
                <img src={service.image} alt={service.imageAlt} style={{ objectPosition: service.imagePosition }} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-cta">
        <div className="page-width soft-cta-inner"><div><p className="overline">¿NO SABÉS CUÁL ELEGIR?</p><h2>No tenés que diagnosticarte antes de escribirnos.</h2><p>Contanos qué sentís o qué querés revisar y te ayudamos a empezar por la consulta adecuada.</p></div><Button asChild className="navy-button"><Link to="/contacto"><CalendarDots weight="bold" /> Solicitar una valoración</Link></Button></div>
      </section>
    </main>
  )
}

