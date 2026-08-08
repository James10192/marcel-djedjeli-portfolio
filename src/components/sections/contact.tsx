import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react'
import { Reveal } from '@/components/primitives/reveal'
import { Magnetic } from '@/components/primitives/magnetic'
import { SectionHeader } from '@/components/section-header'
import { Plate, PlateLabel } from '@/components/primitives/plate'
import { personal } from '@/data/personal'

/**
 * Le cartouche de contact.
 *
 * Chaque canal devient une planche cadrée : l'étiquette de calque nomme le
 * canal, la valeur se lit en mono comme une référence de plan. Les canaux
 * joignables ouvrent leurs crochets au survol ; la localisation, qui ne mène
 * nulle part, garde des crochets sourds.
 */

type ContactLink = {
  id: string
  /** Étiquette de calque : le nom du canal. */
  channel: string
  value: string
  href?: string
  icon: typeof Mail
}

const contactLinks: ContactLink[] = [
  {
    id: 'mail',
    channel: 'e-mail',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    id: 'wa',
    channel: 'whatsapp',
    value: personal.whatsapp,
    href: `https://wa.me/${personal.whatsappIntl}`,
    icon: MessageCircle,
  },
  {
    id: 'tel',
    channel: 'téléphone',
    value: personal.phone,
    href: `tel:${personal.phoneIntl}`,
    icon: Phone,
  },
  {
    id: 'git',
    channel: 'github',
    value: `github.com/${personal.github}`,
    href: personal.githubUrl,
    icon: Github,
  },
  {
    id: 'in',
    channel: 'linkedin',
    value: personal.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: personal.linkedinUrl,
    icon: Linkedin,
  },
  {
    id: 'loc',
    channel: 'localisation',
    value: personal.location,
    icon: MapPin,
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      {/* Chiffre géant décoratif */}
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        09
      </div>

      <SectionHeader num="09" title="Contact" state="ligne ouverte" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        {/* GAUCHE : l'appel, les deux actions, l'état de disponibilité. */}
        <Reveal>
          <div className="@container min-w-0 overflow-hidden">
            <h3 className="heading mb-6 w-full max-w-full text-[clamp(28px,9cqi,72px)] leading-[0.92] tracking-[-0.03em]">
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
            </h3>

            <p className="mb-8 max-w-md text-[15px] leading-[1.7] text-muted">
              Motivé, curieux et prêt à relever des défis. Je cherche un environnement où apprendre vite et livrer de la valeur réelle. Échangeons.
            </p>

            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex h-12 items-center gap-2.5 bg-accent px-6 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors hover:bg-accent-soft"
                  style={{ color: '#0a0a08' }}
                >
                  Envoyer un e-mail
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={personal.cvPdf}
                  download
                  className="inline-flex h-12 items-center border border-line px-6 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  Télécharger le CV
                </a>
              </Magnetic>
            </div>

            <Plate
              size="sm"
              label="état"
              className="mt-12 inline-flex items-center gap-3 px-4 py-3 font-mono text-xs"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-accent">{personal.availability}</span>
            </Plate>
          </div>
        </Reveal>

        {/* DROITE : la nomenclature des canaux. */}
        <Reveal delay={0.15}>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-3">
              <PlateLabel accent>canaux directs</PlateLabel>
              <PlateLabel>
                <span className="tabular-nums">{contactLinks.length}</span> canaux · réponse sous 24 h
              </PlateLabel>
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {contactLinks.map((link) => {
                const Icon = link.icon
                const body = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-paper transition-colors group-hover:text-accent">
                      {link.value}
                    </span>
                  </>
                )

                return (
                  <li key={link.id}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group block"
                      >
                        <Plate
                          size="sm"
                          live
                          label={link.channel}
                          className="flex min-h-[3.25rem] items-center gap-3 px-4 py-3.5"
                        >
                          {body}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            aria-hidden
                          />
                        </Plate>
                      </a>
                    ) : (
                      <Plate
                        size="sm"
                        quiet
                        label={link.channel}
                        className="flex min-h-[3.25rem] items-center gap-3 px-4 py-3.5"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
                        <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-muted">
                          {link.value}
                        </span>
                      </Plate>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 border-t border-line pt-5">
              <PlateLabel className="mb-2 block">acheminement</PlateLabel>
              <p className="text-[12.5px] leading-relaxed text-muted">
                E-mail et WhatsApp sont les voies les plus rapides. Pour un devis,
                décrivez le projet en trois lignes : je réponds avec une fourchette
                et un calendrier, pas avec un formulaire.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
