import { Clock, MapPinLine, WhatsappLogo } from '@phosphor-icons/react'

import { Seo } from '@/components/Seo'
import { AppointmentForm } from '@/components/SiteLayout'
import { clinicContact } from '@/config/contact'
import { clinicAddress, mapDirectionsUrl, mapEmbedUrl } from '@/site-data'

export function ContactPage() {
  return (
    <main>
      <Seo
        title="Agendar cita dental en Granada"
        description="Solicitá una cita con la Clínica Dental Dra. Aguiluz en Granada. Completá pocos datos y prepará tu mensaje de WhatsApp."
        path="/contacto"
        image="/images/aguiluz/bienvenida-cita.jpg"
      />
      <section className="contact-page-hero">
        <div className="page-width contact-page-grid">
          <div className="contact-page-copy"><p className="overline">AGENDA TU CITA</p><h1>Contanos lo esencial. Nosotros te orientamos.</h1><p>Completá cuatro datos y abriremos un mensaje listo para revisar en WhatsApp. No enviamos nada sin tu confirmación.</p><div className="contact-detail-lines"><a href={`https://wa.me/${clinicContact.whatsappNumber}`} target="_blank" rel="noreferrer"><WhatsappLogo weight="fill" /><span><small>WhatsApp de prueba</small><strong>{clinicContact.whatsappDisplay}</strong></span></a><span><MapPinLine weight="duotone" /><span><small>Dirección</small><strong>{clinicAddress}</strong></span></span><span><Clock weight="duotone" /><span><small>Disponibilidad</small><strong>Coordinamos tu horario por WhatsApp</strong></span></span></div></div>
          <AppointmentForm />
        </div>
      </section>

      <section className="contact-location">
        <div className="page-width contact-location-grid">
          <div><p className="overline">CÓMO LLEGAR</p><h2>Te esperamos en Granada.</h2><p>{clinicAddress}</p><a className="text-link" href={mapDirectionsUrl} target="_blank" rel="noreferrer">Abrir indicaciones en Google Maps <MapPinLine weight="bold" /></a></div>
          <div className="map-frame"><iframe title="Ubicación de Clínica Dental Dra. Aguiluz" src={mapEmbedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" /></div>
        </div>
      </section>
    </main>
  )
}

