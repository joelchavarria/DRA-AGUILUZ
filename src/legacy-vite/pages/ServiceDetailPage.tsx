import { ArrowLeft, ArrowRight, CalendarDots, CheckCircle, Info } from '@phosphor-icons/react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { WhatsAppLink } from '@/components/SiteLayout'
import { Button } from '@/components/ui/button'
import { services } from '@/site-data'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <Navigate to="/servicios" replace />

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.summary,
    provider: { '@type': 'Dentist', name: 'Clínica Dental Dra. Aguiluz' },
  }

  return (
    <main>
      <Seo
        title={`${service.name} en Granada`}
        description={`${service.summary} Atención cercana con la Dra. Aguiluz en Granada, Nicaragua.`}
        path={`/servicios/${service.slug}`}
        image={service.image}
        jsonLd={schema}
      />
      <section className="service-detail-hero">
        <div className="page-width service-detail-grid">
          <div className="service-detail-copy"><Link className="back-link" to="/servicios"><ArrowLeft /> Todos los servicios</Link><p className="overline">{service.shortName}</p><h1>{service.name}</h1><p>{service.intro}</p><div className="hero-buttons"><Button asChild className="gold-button"><Link to="/contacto"><CalendarDots weight="bold" /> Agendar valoración</Link></Button><WhatsAppLink message={`Hola, Clínica Dental Dra. Aguiluz. Quisiera información sobre ${service.name}.`}>Consultar por WhatsApp</WhatsAppLink></div></div>
          <div className="service-detail-image"><img src={service.image} alt={service.imageAlt} style={{ objectPosition: service.imagePosition }} /><span>Clínica Dental Dra. Aguiluz</span></div>
        </div>
      </section>

      <section className="service-detail-body">
        <div className="page-width detail-columns">
          <div><p className="overline">PUEDE SER PARA VOS SI…</p><h2>Señales y momentos para consultar.</h2><ul>{service.idealFor.map((item) => <li key={item}><CheckCircle weight="fill" />{item}</li>)}</ul></div>
          <div><p className="overline">CÓMO EMPEZAMOS</p><h2>Una visita clara, paso a paso.</h2><ol>{service.includes.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></div>
        </div>
        <div className="page-width clinical-note"><Info weight="duotone" /><div><h3>Información importante</h3><p>{service.note}</p></div></div>
      </section>

      <section className="next-service">
        <div className="page-width next-service-inner"><p>¿Querés conocer otra opción?</p><Link to="/servicios">Explorar todos los servicios <ArrowRight /></Link></div>
      </section>
    </main>
  )
}

