import { ArrowRight, CheckCircle, Heart, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

export function DoctorPage() {
  return (
    <main>
      <Seo
        title="Dra. Aguiluz"
        description="Conocé la forma de atención de la Dra. Aguiluz: odontología integral, comunicación clara y cuidado cercano para pacientes de todas las edades en Granada."
        path="/dra-aguiluz"
        image="/images/aguiluz/dra-aguiluz-retrato.jpg"
      />
      <section className="doctor-page-hero">
        <div className="page-width doctor-page-grid">
          <div className="doctor-portrait"><img src="/images/aguiluz/dra-aguiluz-retrato.jpg" alt="Retrato profesional de la Dra. Aguiluz" /><span>Dra. Aguiluz</span></div>
          <div className="doctor-page-intro"><p className="overline">CONOCÉ A LA DOCTORA</p><h1>Una odontología profesional, sensible y cercana.</h1><p>La consulta es un espacio para entender lo que pasa, hacer preguntas y avanzar con confianza. La Dra. Aguiluz cuida cada detalle para que niñas, niños y adultos se sientan acompañados.</p><Button asChild className="navy-button"><Link to="/contacto">Agendar una conversación <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <section className="care-philosophy">
        <div className="page-width philosophy-grid">
          <div><p className="overline">SU FORMA DE CUIDAR</p><h2>La confianza se construye antes de empezar.</h2></div>
          <div className="philosophy-copy"><p>No todas las personas llegan a consulta sintiéndose tranquilas. Por eso, el trato importa tanto como la atención clínica: escuchar, explicar y respetar el ritmo de cada paciente.</p><div className="principle-lines"><span><Heart weight="duotone" /><b>Escuchar primero</b></span><span><ShieldCheck weight="duotone" /><b>Cuidar con responsabilidad</b></span><span><Sparkle weight="duotone" /><b>Explicar con claridad</b></span></div></div>
        </div>
      </section>

      <section className="doctor-editorial">
        <div className="page-width doctor-editorial-grid">
          <img className="editorial-photo-main" src="/images/aguiluz/odontopediatria-acompanamiento.jpg" alt="Dra. Aguiluz acompañando una consulta odontopediátrica" />
          <div className="editorial-copy"><p className="overline">PARA TODA LA FAMILIA</p><h2>Cada paciente necesita una atención diferente.</h2><p>Con los más pequeños, la paciencia y la familiarización pueden transformar la experiencia. Con adolescentes y adultos, la claridad ayuda a tomar decisiones informadas sobre su salud bucal.</p><ul><li><CheckCircle weight="fill" /> Lenguaje sencillo y respetuoso</li><li><CheckCircle weight="fill" /> Atención adaptada a cada edad</li><li><CheckCircle weight="fill" /> Orientación para continuar el cuidado en casa</li></ul></div>
          <img className="editorial-photo-small" src="/images/aguiluz/atencion-adultos.jpg" alt="Atención dental a un paciente adulto" />
        </div>
      </section>

      <section className="doctor-signoff">
        <div className="page-width"><p>“Queremos que cada persona salga entendiendo mejor su sonrisa y sintiéndose bien acompañada.”</p><span>Clínica Dental Dra. Aguiluz · Granada</span><Button asChild className="gold-button"><Link to="/servicios">Conocé nuestros servicios <ArrowRight /></Link></Button></div>
      </section>
    </main>
  )
}

