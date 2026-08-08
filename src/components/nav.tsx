import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import gsap from 'gsap'
import { cn, prefersReducedMotion } from '@/lib/utils'
import { BrandMark } from '@/components/brand-mark'

const links = [
  { hash: 'about', label: 'À propos' },
  { hash: 'projects', label: 'Projets' },
  { hash: 'machine-room', label: 'Preuves' },
  { hash: 'services', label: 'Services' },
]

// Vraies routes (pas des ancres) : méthode de travail et notes éditoriales.
const routeLinks = [
  { to: '/methode', label: 'Méthode' },
  { to: '/notes', label: 'Notes' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const firstRender = useRef(true)
  // Sur l'accueil, les liens sont des ancres locales (#about). Ailleurs (/projets,
  // etudes de cas), ils ramenent a l'accueil puis scrollent (/#about).
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const hrefFor = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`)
  const contactHref = onHome ? '#contact' : '/#contact'

  useEffect(() => {
    let scrollY = 0
    function onScroll() {
      setScrolled(window.scrollY > 10)
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((s) => {
        const el = s as HTMLElement
        if (window.scrollY >= el.offsetTop - 120) current = el.id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // iOS scroll lock
    if (open) {
      scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (top) window.scrollTo(0, parseInt(top || '0') * -1)
    }
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Entrée/sortie du menu mobile en GSAP (remplace AnimatePresence).
  // L'overlay reste monté : autoAlpha gère opacity + visibility (a11y ok).
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const reduced = prefersReducedMotion()
    if (open) {
      gsap.to(overlay, { autoAlpha: 1, duration: reduced ? 0 : 0.25, ease: 'power1.out', overwrite: 'auto' })
      if (!reduced && listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06, delay: 0.1, overwrite: 'auto' },
        )
      }
    } else {
      gsap.to(overlay, { autoAlpha: 0, duration: reduced ? 0 : 0.25, ease: 'power1.out', overwrite: 'auto' })
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
          'flex items-center justify-between px-6 py-4 md:px-12',
          scrolled
            ? 'border-line bg-ink/95 backdrop-blur-xl'
            : 'border-transparent bg-ink/70 backdrop-blur-md'
        )}
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <a
          href={onHome ? '#' : '/'}
          className="group flex items-center gap-2.5"
          aria-label="Marcel DJEDJE-LI, accueil"
        >
          <BrandMark className="h-8 w-8 shrink-0 transition-opacity group-hover:opacity-80" />
          <span className="font-display text-lg font-extrabold tracking-tight text-accent">
            LeVraiMD_DEV
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <li key={l.hash}>
              <a
                href={hrefFor(l.hash)}
                className={cn(
                  'mono-caps whitespace-nowrap transition-colors duration-200',
                  onHome && activeSection === l.hash
                    ? 'text-paper'
                    : 'text-muted hover:text-paper'
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
          {routeLinks.map((r) => (
            <li key={r.to}>
              <Link
                to={r.to}
                className="mono-caps whitespace-nowrap text-muted transition-colors duration-200 hover:text-paper"
                activeProps={{ className: 'mono-caps whitespace-nowrap text-paper' }}
              >
                {r.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={contactHref}
              className="whitespace-nowrap bg-accent px-5 py-2 font-mono text-xs font-medium transition-colors hover:bg-accent-soft"
              style={{ color: '#0a0a08' }}
            >
              Me contacter
            </a>
          </li>
        </ul>

        <button
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              'block h-0.5 w-7 rounded-full bg-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              open && 'translate-y-[7px] rotate-45'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-7 rounded-full bg-paper transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              open && 'scale-x-0 opacity-0'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-7 rounded-full bg-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              open && '-translate-y-[7px] -rotate-45'
            )}
          />
        </button>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink/97 backdrop-blur-2xl lg:hidden"
        style={{
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
          opacity: 0,
          visibility: 'hidden',
        }}
        aria-hidden={!open}
      >
        <ul ref={listRef} className="flex w-full flex-col">
          {links.map((l) => (
            <li key={l.hash} className="border-b border-line first:border-t">
              <a
                href={hrefFor(l.hash)}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className="block px-10 py-5 text-center font-display text-2xl font-bold text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
          {routeLinks.map((r) => (
            <li key={r.to} className="border-b border-line">
              <Link
                to={r.to}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className="block px-10 py-5 text-center font-display text-2xl font-bold text-muted transition-colors hover:text-accent"
              >
                {r.label}
              </Link>
            </li>
          ))}
          <li className="mt-8 flex justify-center">
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="bg-accent px-10 py-3.5 font-mono text-sm font-medium"
              style={{ color: '#0a0a08' }}
            >
              Me contacter
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
