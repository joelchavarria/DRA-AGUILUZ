import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <main className="not-found"><Seo title="Página no encontrada" description="La página que buscás no existe." path="/404" /><div><p className="overline">ERROR 404</p><h1>Esta página no está disponible.</h1><p>Volvé al inicio para seguir explorando la clínica.</p><Button asChild className="navy-button"><Link to="/"><ArrowLeft /> Volver al inicio</Link></Button></div></main>
  )
}

