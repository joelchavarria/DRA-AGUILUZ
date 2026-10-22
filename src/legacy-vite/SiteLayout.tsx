import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowRight, CalendarDots, CaretRight, FacebookLogo, InstagramLogo, List,
  MapPinLine, WhatsappLogo,
} from '@phosphor-icons/react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { buildWhatsAppUrl, clinicContact } from '@/config/contact'
import { clinicAddress } from '@/site-data'

const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Dra. Aguiluz', href: '/dra-aguiluz' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Contacto', href: '/contacto' },
]

const currentYear = new Date().getFullYear()

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Clínica Dental Dra. Aguiluz, ir al inicio">
      <span className="brand-crop" aria-hidden="true"><img src="/images/aguiluz/referencia-marca.png" alt="" /></span>
      <span className="brand-fallback"><strong>Dra. Aguiluz</strong><small>Clínica Dental</small></span>
    </Link>
  )
}

export function WhatsAppLink({ children = 'Agendar por WhatsApp', className = '', message }: { children?: ReactNode; className?: string; message?: string }) {
  const defaultMessage = 'Hola, Clínica Dental Dra. Aguiluz. Quisiera información para agendar una cita.'
  return (
    <Button asChild className={`wa-button ${className}`}>
      <a href={buildWhatsAppUrl(message ?? defaultMessage)} target="_blank" rel="noreferrer"><WhatsappLogo weight="fill" />{children}</a>
    </Button>
  )
}

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false)

  function handleAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const patient = String(data.get('patient') ?? '').trim()
    const reason = String(data.get('reason') ?? '').trim()
    const note = String(data.get('note') ?? '').trim()
    const message = [
      'Hola, Clínica Dental Dra. Aguiluz 👋',
      `Mi nombre es ${name}.`,
      `La cita es para: ${patient}.`,
      `Motivo de consulta: ${reason}.`,
      note ? `Detalle adicional: ${note}.` : '',
      'Quisiera coordinar una cita, por favor.',
    ].filter(Boolean).join('\n')

    setSubmitted(true)
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className={`appointment-form ${compact ? 'is-compact' : ''}`} onSubmit={handleAppointment}>
      <div className="form-field full"><Label htmlFor={compact ? 'name-compact' : 'name'}>Tu nombre</Label><Input id={compact ? 'name-compact' : 'name'} name="name" placeholder="Ej. María López" required autoComplete="name" /></div>
      <div className="form-field"><Label htmlFor={compact ? 'patient-compact' : 'patient'}>¿Para quién es?</Label><select id={compact ? 'patient-compact' : 'patient'} name="patient" required defaultValue=""><option value="" disabled>Seleccioná una opción</option><option>Para mí</option><option>Para mi hijo/a</option><option>Para un familiar</option></select></div>
      <div className="form-field"><Label htmlFor={compact ? 'reason-compact' : 'reason'}>Motivo de consulta</Label><select id={compact ? 'reason-compact' : 'reason'} name="reason" required defaultValue=""><option value="" disabled>Seleccioná una opción</option><option>Primera valoración</option><option>Odontopediatría</option><option>Ortodoncia</option><option>Prevención o limpieza</option><option>Molestia o urgencia</option><option>Otro motivo</option></select></div>
      {!compact && <div className="form-field full"><Label htmlFor="note">Detalle breve <span>(opcional)</span></Label><Input id="note" name="note" placeholder="Algo que querás comentarnos" /></div>}
      <Button type="submit" className="form-submit"><WhatsappLogo weight="fill" /> Preparar mensaje <ArrowRight /></Button>
      <small className="form-note">{submitted ? 'Se abrió WhatsApp para que revisés el mensaje.' : 'Podrás revisar el mensaje antes de enviarlo.'}</small>
    </form>
  )
}

export function SiteLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => <NavLink key={item.href} to={item.href} end={item.href === '/'}>{item.label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <Button asChild className="header-book"><Link to="/contacto"><CalendarDots weight="bold" /> Agendar cita</Link></Button>
            <a className="header-whatsapp" href={buildWhatsAppUrl('Hola, quisiera información para agendar una cita.')} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><WhatsappLogo weight="fill" /></a>
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="menu-trigger" aria-label="Abrir menú"><List size={24} /></Button></SheetTrigger>
              <SheetContent className="mobile-sheet">
                <SheetHeader><SheetTitle><Brand /></SheetTitle><SheetDescription>Odontología cercana en Granada.</SheetDescription></SheetHeader>
                <nav aria-label="Navegación móvil">
                  {navigation.map((item) => <SheetClose asChild key={item.href}><NavLink to={item.href} end={item.href === '/'}>{item.label}<CaretRight /></NavLink></SheetClose>)}
                </nav>
                <SheetClose asChild><Button asChild className="mobile-book"><Link to="/contacto">Agendar cita</Link></Button></SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand"><Brand /><p>Atención dental cercana para niñas, niños y adultos en Granada, Nicaragua.</p></div>
          <div className="footer-links"><h2>Explorá</h2>{navigation.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}</div>
          <div className="footer-contact"><h2>Visitanos</h2><p><MapPinLine weight="duotone" /> {clinicAddress}</p><a href={buildWhatsAppUrl('Hola, quisiera información para agendar una cita.')} target="_blank" rel="noreferrer"><WhatsappLogo weight="fill" /> {clinicContact.whatsappDisplay} <small>Prueba</small></a></div>
          <div className="social-links"><a href="https://www.facebook.com/aguiluzclinicadental/?locale=es_LA" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo weight="fill" /></a><a href="https://www.instagram.com/aguiluz_clinicadental/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo weight="bold" /></a></div>
        </div>
        <div className="page-width footer-bottom"><span>© {currentYear} Clínica Dental Dra. Aguiluz</span><span>Granada, Nicaragua</span></div>
      </footer>

      <a className="floating-whatsapp" href={buildWhatsAppUrl('Hola, quisiera información para agendar una cita.')} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><WhatsappLogo weight="fill" /></a>
    </div>
  )
}

