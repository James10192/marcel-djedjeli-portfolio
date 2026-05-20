import { Mail, Phone, Github, MapPin, Check, MessageCircle, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '@/components/primitives/reveal'
import { Magnetic } from '@/components/primitives/magnetic'
import { personal } from '@/data/personal'

type ContactLink = {
  label: string
  value: string
  href?: string
  icon: typeof Mail
  badge?: string
  accent?: boolean
}

const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    label: 'Téléphone direct',
    value: personal.phone,
    href: `tel:${personal.phoneIntl}`,
    icon: Phone,
  },
  {
    label: 'WhatsApp',
    value: personal.whatsapp,
    href: `https://wa.me/${personal.whatsappIntl}`,
    icon: MessageCircle,
    badge: 'WA',
  },
  {
    label: 'GitHub',
    value: `github.com/${personal.github}`,
    href: personal.githubUrl,
    icon: Github,
  },
  {
    label: 'Localisation',
    value: personal.location,
    icon: MapPin,
  },
  {
    label: 'Disponibilité',
    value: personal.availability,
    icon: Check,
    accent: true,
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div>
            <h2 className="heading text-[clamp(36px,7vw,72px)] leading-[0.95]">
              Construisons
              <br />
              <em>ensemble</em>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-muted">
              Motivé, curieux et prêt à relever des défis. Je cherche un environnement où apprendre vite et livrer de la valeur réelle. Échangeons.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex h-12 items-center bg-accent px-7 font-mono text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
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
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border border-line">
            {contactLinks.map((link, i) => {
              const Icon = link.icon
              const Content = (
                <motion.div
                  whileHover={{ x: link.href ? 4 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`flex items-center justify-between gap-4 border-line px-5 py-5 transition-colors ${
                    i < contactLinks.length - 1 ? 'border-b' : ''
                  } ${link.href ? 'hover:bg-surface' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                    <div className="flex flex-col">
                      <div className="mono-caps flex items-center gap-2 text-muted">
                        {link.label}
                        {link.badge && (
                          <span className="rounded-sm bg-emerald-500 px-1.5 py-0.5 text-[9px] tracking-wide text-white">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <div
                        className={`mt-1 text-sm ${link.accent ? 'text-accent' : 'text-paper'} break-all`}
                      >
                        {link.value}
                      </div>
                    </div>
                  </div>
                  {link.href && (
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-accent" />
                  )}
                </motion.div>
              )

              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {Content}
                </a>
              ) : (
                <div key={link.label}>{Content}</div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
