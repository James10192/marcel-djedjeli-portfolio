import { useState } from 'react'
import { Check, Link2, Linkedin, MessageCircle } from 'lucide-react'
import { PlateLabel } from '@/components/primitives/plate'

/**
 * Barre de partage d'une note : WhatsApp et LinkedIn (les deux canaux qui
 * comptent ici), X en discret, et la copie du lien. Chaque partage embarque
 * le résumé (thèse) avec l'URL, pour que le message soit lisible sans clic.
 */
export function ShareBar({
  url,
  title,
  summary,
}: {
  url: string
  title: string
  summary: string
}) {
  const [copied, setCopied] = useState(false)

  const shareText = `${title}\n\n${summary}\n\n${url}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n\n${summary}`)}&url=${encodeURIComponent(url)}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText)
    } catch {
      // Repli pour les contextes sans clipboard API (http, vieux navigateurs)
      const ta = document.createElement('textarea')
      ta.value = shareText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const btn =
    'inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-paper transition-colors hover:border-accent hover:text-accent'

  return (
    <div>
      <PlateLabel className="mb-3 block">partager cette note</PlateLabel>
      <div className="flex flex-wrap gap-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 bg-accent px-4 font-mono text-xs font-medium transition-colors hover:bg-accent-soft"
          style={{ color: '#0a0a08' }}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className={btn}>
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a href={x} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Partager sur X">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X
        </a>
        <button type="button" onClick={copy} className={btn} aria-live="polite">
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
          {copied ? 'Copié' : 'Copier le lien'}
        </button>
      </div>
    </div>
  )
}
