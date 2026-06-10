import { Mail, Phone, Github, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '@/components/primitives/reveal'
import { Magnetic } from '@/components/primitives/magnetic'
import { personal } from '@/data/personal'

type ContactLink = {
  cmd: string
  label: string
  value: string
  href?: string
  icon: typeof Mail
}

const contactLinks: ContactLink[] = [
  { cmd: 'mail', label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { cmd: 'call', label: 'Téléphone', value: personal.phone, href: `tel:${personal.phoneIntl}`, icon: Phone },
  { cmd: 'wa', label: 'WhatsApp', value: personal.whatsapp, href: `https://wa.me/${personal.whatsappIntl}`, icon: MessageCircle },
  { cmd: 'git', label: 'GitHub', value: `github.com/${personal.github}`, href: personal.githubUrl, icon: Github },
  { cmd: 'loc', label: 'Location', value: personal.location, icon: MapPin },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      {/* Decorative giant number */}
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        06
      </div>

      {/* Code-comment section header */}
      <Reveal className="mb-10 md:mb-14">
        <div className="flex items-baseline gap-3 font-mono text-[12px] tracking-wider text-accent">
          <span>{`//`}</span>
          <span>SECTION_06</span>
          <span className="text-muted">/</span>
          <span className="text-muted">contact.sh</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {/* LEFT — Massive outlined heading */}
        <Reveal>
          <div className="@container min-w-0 overflow-hidden">
            <h2 className="heading mb-6 w-full max-w-full text-[clamp(28px,9cqi,72px)] leading-[0.92] tracking-[-0.03em]">
              <span
                className="block"
                style={{
                  WebkitTextStroke: '1.5px var(--color-accent)',
                  color: 'transparent',
                }}
              >
                Construisons
              </span>
              <em className="-mt-1 block">
                ensemble
                <span className="text-accent">.</span>
              </em>
            </h2>

            <p className="mb-8 max-w-md text-[15px] leading-[1.7] text-muted">
              Motivé, curieux et prêt à relever des défis. Je cherche un environnement où apprendre vite et livrer de la valeur réelle. Échangeons.
            </p>

            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex h-12 items-center bg-accent px-7 font-mono text-sm font-medium transition-colors hover:bg-accent-soft"
                  style={{ color: '#0a0a08' }}
                >
                  Envoyer un email →
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={personal.cvPdf}
                  download
                  className="inline-flex h-12 items-center border border-line px-7 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  Télécharger le CV
                </a>
              </Magnetic>
            </div>

            <div className="mt-10 inline-flex items-center gap-3 border border-line bg-ink2 px-4 py-3 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted">status:</span>
              <span className="text-accent">{personal.availability}</span>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — Terminal contact card */}
        <Reveal delay={0.15}>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-ink2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            {/* Terminal header */}
            <header className="flex items-center justify-between gap-3 border-b border-line bg-surface/40 px-3 py-3 sm:px-4">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-400/60" />
                <span className="ml-2 truncate font-mono text-[10.5px] text-muted sm:ml-3 sm:text-[11px]">
                  marcel @ portfolio : ~/contact
                </span>
              </div>
              <span className="flex-shrink-0 font-mono text-[10px] tracking-wider text-muted">zsh</span>
            </header>

            {/* Body — contact commands */}
            <div className="px-2 py-4 font-mono text-[13px] md:px-3">
              <div className="px-3 pb-3 text-muted">
                <span className="text-accent">$</span> ls --reach
              </div>

              <ul className="space-y-px">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  const Inner = (
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`group flex items-center justify-between gap-4 rounded-sm px-3 py-3 transition-colors ${
                        link.href ? 'hover:bg-surface/60' : ''
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                        <span className="flex-shrink-0 font-mono text-accent">▸</span>
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-accent/80" strokeWidth={2} />
                        <span className="w-10 flex-shrink-0 font-mono text-[11.5px] text-muted sm:w-12 sm:text-[12px]">
                          {link.cmd}
                        </span>
                        <span className="min-w-0 truncate text-[12.5px] text-paper sm:text-[13px]">
                          {link.value}
                        </span>
                      </div>
                      {link.href && (
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-accent" />
                      )}
                    </motion.div>
                  )
                  return link.href ? (
                    <li key={link.cmd}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {Inner}
                      </a>
                    </li>
                  ) : (
                    <li key={link.cmd}>{Inner}</li>
                  )
                })}
              </ul>

              <div className="mt-2 px-3 pt-2 text-muted">
                <span className="text-accent">$</span>{' '}
                <span className="inline-block h-3 w-1.5 translate-y-[2px] animate-pulse bg-accent" />
              </div>
            </div>

            {/* Footer status bar */}
            <footer className="flex items-center justify-between border-t border-line bg-surface/40 px-4 py-2 font-mono text-[10px] text-muted">
              <span>5 channels · response &lt;24h</span>
              <span>{personal.location.split(',').slice(-1)}</span>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
