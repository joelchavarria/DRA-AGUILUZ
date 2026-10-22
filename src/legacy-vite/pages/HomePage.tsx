import {
  ArrowRight, Baby, CalendarDots, CheckCircle, Heart, ShieldCheck, Tooth,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { WhatsAppLink } from '@/components/SiteLayout'
import { Button } from '@/components/ui/button'
import { clinicAddress, patientComments, services } from '@/site-data'

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Clínica Dental Dra. Aguiluz',
    description: 'Clínica de odontología integral para niñas, niños y adultos en Granada, Nicaragua.',
    image: '/images/aguiluz/dra-aguiluz-consultorio.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle El Consulado, del Ministerio Público 25 varas al Este',
      addressLocality: 'Granada',
      addressCountry: 'NI',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 11.9300494, longitude: -85.957051 },
    areaServed: 'Granada, Nicaragua',
    sameAs: [
      'https://www.facebook.com/aguiluzclinicadental/',
      'https://www.instagram.com/aguiluz_clinicadental/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Clínica Dental Dra. Aguiluz',
    inLanguage: 'es-NI',
  },
]

export function HomePage() {
  return (
    <main>
      <Seo
        title="Dentista en Granada, Nicaragua"
        description="Atención dental integral, odontopediatría, ortodoncia y prevención con la Dra. Aguiluz en Granada, Nicaragua. Agendá tu valoración por WhatsApp."
        path="/"
        jsonLd={homeSchema}
      />

      <section className="home-hero">
        <div className="page-width home-hero-grid">
          <div className="home-hero-copy">
            <p className="overline">CLÍNICA DENTAL EN GRANADA</p>
            <h1>Cuidamos tu sonrisa <em>con calma y cercanía.</em></h1>
            <p className="hero-description">Atención dental para niñas, niños y adultos, guiada por explicaciones claras, paciencia y un trato genuinamente humano.</p>
            <div className="hero-buttons">
              <Button asChild className="gold-button"><Link to="/contacto"><CalendarDots weight="bold" /> Agendá tu cita</Link></Button>
              <WhatsAppLink>Escribinos por WhatsApp</WhatsAppLink>
            </div>
            <div className="hero-trust" aria-label="Principios de atención">
              <span><ShieldCheck weight="duotone" /><strong>Atención<br />responsable</strong></span>
              <span><Heart weight="duotone" /><strong>Trato amable<br />y cercano</strong></span>
              <span><Baby weight="duotone" /><strong>Para toda<br />la familia</strong></span>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="hero-photo-wrap"><img src="/images/aguiluz/dra-aguiluz-consultorio.jpg" alt="Dra. Aguiluz sonriendo en su consultorio dental en Granada" /></div>
            <div className="hero-note"><Tooth weight="duotone" /><span><strong>Odontología integral</strong>Una visita a tu ritmo</span></div>
            <p className="hero-location">Granada, Nicaragua <span>11.9300° N</span></p>
          </div>
        </div>
      </section>

      <section className="welcome-story">
        <div className="page-width welcome-grid">
          <div className="welcome-image"><img src="/images/aguiluz/odontopediatria-comodidad.jpg" alt="Paciente infantil sonriendo con tranquilidad en la clínica" /></div>
          <div className="welcome-copy">
            <p className="overline">UNA EXPERIENCIA MÁS AMABLE</p>
            <h2>Sentirte escuchado también es parte del cuidado.</h2>
            <p>Antes de hablar de tratamientos, queremos entenderte. La consulta empieza con una conversación clara y continúa respetando el ritmo de cada paciente.</p>
            <ul className="editorial-list">
              <li><CheckCircle weight="fill" /><span><strong>Explicaciones sencillas</strong>Entendés lo que vemos y qué opciones tenés.</span></li>
              <li><CheckCircle weight="fill" /><span><strong>Atención sin prisas</strong>Un espacio para preguntar y sentirte acompañado.</span></li>
              <li><CheckCircle weight="fill" /><span><strong>Cuidado para cada etapa</strong>Desde la primera visita hasta el seguimiento familiar.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="service-preview">
        <div className="page-width">
          <div className="section-heading service-preview-heading">
            <div><p className="overline">SERVICIOS DENTALES</p><h2>Todo empieza con una buena valoración.</h2></div>
            <div><p>Estos son los cuidados que la clínica comunica actualmente. Te orientamos según lo que necesités.</p><Link className="text-link" to="/servicios">Ver todos los servicios <ArrowRight /></Link></div>
          </div>
          <div className="service-lines">
            {services.map((service, index) => (
              <Link className="service-line" to={`/servicios/${service.slug}`} key={service.slug}>
                <span className="service-number">0{index + 1}</span>
                <span className="service-name"><strong>{service.name}</strong><small>{service.shortName}</small></span>
                <p>{service.summary}</p>
                <span className="service-arrow" aria-hidden="true"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="doctor-feature">
        <div className="page-width doctor-feature-grid">
          <div className="doctor-feature-copy">
            <p className="overline">DRA. AGUILUZ</p>
            <h2>Profesionalismo que se siente cercano.</h2>
            <p>Una atención cuidadosa, sensible y directa. La Dra. Aguiluz acompaña a cada paciente con una mirada integral y un interés genuino por su bienestar.</p>
            <Button asChild variant="outline" className="outline-button"><Link to="/dra-aguiluz">Conocé a la doctora <ArrowRight /></Link></Button>
          </div>
          <div className="doctor-feature-images">
            <img className="feature-image-tall" src="/images/aguiluz/calidad-servicio.jpg" alt="Dra. Aguiluz durante una consulta dental" />
            <img className="feature-image-small" src="/images/aguiluz/dra-aguiluz-retrato.jpg" alt="Retrato de la Dra. Aguiluz" />
            <p>“Cuidado real, de persona a persona.”</p>
          </div>
        </div>
      </section>

      <section className="home-gallery" aria-labelledby="gallery-title">
        <div className="page-width home-gallery-heading"><div><p className="overline">LA CLÍNICA EN IMÁGENES</p><h2 id="gallery-title">Momentos reales, sonrisas reales.</h2></div><Link className="text-link light" to="/experiencias">Ver experiencias <ArrowRight /></Link></div>
        <div className="home-gallery-strip">
          <figure><img src="/images/aguiluz/odontopediatria-acompanamiento.jpg" alt="Atención odontopediátrica cercana" /><figcaption>Odontopediatría</figcaption></figure>
          <figure><img src="/images/aguiluz/atencion-adultos.jpg" alt="Atención dental para adultos" /><figcaption>Atención integral</figcaption></figure>
          <figure><img src="/images/aguiluz/nueva-clinica.jpg" alt="Espacio de Clínica Dental Dra. Aguiluz" /><figcaption>Nuestra clínica</figcaption></figure>
        </div>
      </section>

      <section className="home-quote">
        <div className="page-width home-quote-grid">
          <p className="quote-mark" aria-hidden="true">“</p>
          <blockquote>{patientComments[1]}</blockquote>
          <div><p>Comentario compartido por una familia con la clínica.</p><Link className="text-link" to="/experiencias">Leer más experiencias <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-width closing-cta-grid">
          <div><p className="overline">TU PRÓXIMA VISITA</p><h2>Empecemos con una conversación sencilla.</h2><p>{clinicAddress}</p></div>
          <div className="closing-actions"><Button asChild className="gold-button"><Link to="/contacto">Agendar una cita <ArrowRight /></Link></Button><WhatsAppLink>Consultar por WhatsApp</WhatsAppLink></div>
        </div>
      </section>
    </main>
  )
}

