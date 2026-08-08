import { useEffect, useState } from 'react'
import { personal } from '@/data/personal'
import { prefersReducedMotion } from '@/lib/utils'

const MESSAGE = 'Bonjour Marcel, je vous contacte au sujet d\'un projet.'
const HREF = `https://wa.me/${personal.whatsappIntl}?text=${encodeURIComponent(MESSAGE)}`
/** Le bouton n'apparaît qu'une fois le premier écran dépassé. */
const SCROLL_THRESHOLD = 600

/**
 * Bouton WhatsApp flottant.
 *
 * · rendu dans le HTML SSR (le lien existe toujours dans le document) ;
 * · révélé après 600 px de défilement, masqué quand le pied de page est à
 *   l'écran pour ne jamais recouvrir ses informations sur mobile ;
 * · masqué = retiré de l'ordre de tabulation et de l'arbre d'accessibilité ;
 * · sans transition si l'utilisateur demande moins d'animations.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(prefersReducedMotion())

    let footerVisible = false
    let scrolledPast = false

    const sync = () => setVisible(scrolledPast && !footerVisible)

    const onScroll = () => {
      scrolledPast = window.scrollY > SCROLL_THRESHOLD
      sync()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const footer = document.querySelector('footer')
    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            footerVisible = entry.isIntersecting
            sync()
          },
          { rootMargin: '0px 0px -8px 0px' },
        )
      : null
    if (footer && observer) observer.observe(footer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à Marcel sur WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-ink2 text-accent shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] outline-offset-4 transition-colors hover:border-accent hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:right-6"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(0.75rem)',
        pointerEvents: visible ? 'auto' : 'none',
        transitionProperty: reduced ? 'border-color, background-color' : 'opacity, transform, border-color, background-color',
        transitionDuration: reduced ? '0ms' : '280ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <WhatsAppGlyph />
    </a>
  )
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.08 8.08 0 0 1-4.12-1.13l-.29-.17-3.06.8.82-2.99-.19-.31a8.02 8.02 0 0 1-1.23-4.29c0-4.46 3.63-8.09 8.08-8.09Zm-4.5 4.3c-.2 0-.53.08-.81.38-.28.3-1.07 1.04-1.07 2.54s1.09 2.95 1.25 3.15c.15.2 2.11 3.22 5.13 4.39.72.28 1.27.45 1.71.57.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.41-1.49-.89-.79-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57Z" />
    </svg>
  )
}
