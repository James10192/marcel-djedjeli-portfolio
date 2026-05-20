import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#experience', label: 'Expérience' },
  { href: '#projects', label: 'Projets' },
  { href: '#formation', label: 'Formation' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

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
        <a href="#" className="font-display text-lg font-extrabold tracking-tight text-accent">
          LeVraiMD_DEV
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  'mono-caps whitespace-nowrap transition-colors duration-200',
                  activeSection === l.href.slice(1)
                    ? 'text-paper'
                    : 'text-muted hover:text-paper'
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="whitespace-nowrap bg-accent px-5 py-2 font-mono text-xs font-medium text-ink transition-colors hover:bg-accent-soft"
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
              'block h-px w-7 bg-text transition-transform duration-300',
              open && 'translate-y-[7px] rotate-45'
            )}
          />
          <span
            className={cn(
              'block h-px w-7 bg-text transition-all duration-300',
              open && 'scale-x-0 opacity-0'
            )}
          />
          <span
            className={cn(
              'block h-px w-7 bg-text transition-transform duration-300',
              open && '-translate-y-[7px] -rotate-45'
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink/97 backdrop-blur-2xl lg:hidden"
            style={{
              paddingTop: 'max(0px, env(safe-area-inset-top))',
              paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
            }}
          >
            <motion.ul
              className="flex w-full flex-col"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-line first:border-t"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-10 py-5 text-center font-display text-2xl font-bold text-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-8 flex justify-center"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="bg-accent px-10 py-3.5 font-mono text-sm font-medium text-ink"
                >
                  Me contacter
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
