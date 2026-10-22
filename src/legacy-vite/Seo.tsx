import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value))
}

export function Seo({ title, description, path, image = '/images/aguiluz/dra-aguiluz-consultorio.jpg', jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | Clínica Dental Dra. Aguiluz`
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    const canonical = `${window.location.origin}${path}`
    const absoluteImage = `${window.location.origin}${image}`

    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'es_NI' })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!isLocal) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.href = canonical
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    } else {
      canonicalLink?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }

    const scriptId = 'page-structured-data'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    window.scrollTo({ top: 0, behavior: 'instant' })

    return () => document.getElementById(scriptId)?.remove()
  }, [description, image, jsonLd, path, title])

  return null
}

