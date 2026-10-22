import { ArrowRight, Quotes } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { patientComments } from '@/site-data'

const gallery = [
  { src: '/images/aguiluz/odontopediatria-acompanamiento.jpg', alt: 'Dra. Aguiluz acompañando una consulta odontopediátrica', caption: 'Acompañamiento con paciencia', className: 'story-photo-a' },
  { src: '/images/aguiluz/calidad-servicio.jpg', alt: 'Dra. Aguiluz durante una atención dental', caption: 'Atención integral', className: 'story-photo-b' },
  { src: '/images/aguiluz/odontopediatria-comodidad.jpg', alt: 'Paciente infantil sonriendo en el sillón dental', caption: 'Visitas más tranquilas', className: 'story-photo-c' },
  { src: '/images/aguiluz/atencion-adultos.jpg', alt: 'Consulta dental para un paciente adulto', caption: 'Cuidado para adultos', className: 'story-photo-d' },
  { src: '/images/aguiluz/nueva-clinica.jpg', alt: 'Espacio de atención de la clínica dental', caption: 'Nuestro espacio en Granada', className: 'story-photo-e' },
]

export function ExperiencesPage() {
  return (
    <main>
      <Seo
        title="Experiencias en nuestra clínica dental"
        description="Conocé momentos reales y comentarios compartidos por pacientes de la Clínica Dental Dra. Aguiluz en Granada, Nicaragua."
        path="/experiencias"
        image="/images/aguiluz/odontopediatria-acompanamiento.jpg"
      />
      <section className="experiences-intro">
        <div className="page-width experiences-intro-grid"><div><p className="overline">EXPERIENCIAS REALES</p><h1>La confianza también se puede ver.</h1></div><p>Estas imágenes forman parte del contenido compartido por la clínica. Muestran una atención cercana, paciente y adaptada a cada persona.</p></div>
      </section>

      <section className="story-gallery">
        <div className="page-width story-grid">
          {gallery.map((photo) => <figure className={photo.className} key={photo.src}><img src={photo.src} alt={photo.alt} /><figcaption>{photo.caption}</figcaption></figure>)}
        </div>
      </section>

      <section className="patient-words">
        <div className="page-width patient-words-grid">
          <div className="patient-words-intro"><Quotes weight="fill" /><p className="overline">PALABRAS QUE NOS ALEGRAN</p><h2>Lo que recuerdan quienes nos visitan.</h2><p>Comentarios publicados previamente en una pieza de contenido de la clínica. No se presentan como reseñas verificadas de Google.</p></div>
          <div className="patient-quote-list">{patientComments.map((comment, index) => <blockquote key={comment}><span>0{index + 1}</span><p>“{comment}”</p></blockquote>)}</div>
        </div>
      </section>

      <section className="soft-cta experience-cta"><div className="page-width soft-cta-inner"><div><p className="overline">TU EXPERIENCIA IMPORTA</p><h2>Una primera visita puede sentirse más sencilla.</h2><p>Contanos qué necesitás y prepararemos el inicio de la conversación por WhatsApp.</p></div><Button asChild className="navy-button"><Link to="/contacto">Quiero agendar <ArrowRight /></Link></Button></div></section>
    </main>
  )
}

