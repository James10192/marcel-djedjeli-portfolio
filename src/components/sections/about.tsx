import { motion } from 'motion/react'
import { Reveal } from '@/components/primitives/reveal'
import { personal } from '@/data/personal'

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <span className="select-none pt-px font-mono text-[10.5px] leading-[1.9] text-muted/50">
        {String(n).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1 break-words font-mono text-[12.5px] leading-[1.9] text-paper/90 sm:text-[13px]">
        {children}
      </div>
    </div>
  )
}

const profileLines = [
  { k: 'role', v: '"Head of Development"', comment: 'leading the dev team @ ADC' },
  { k: 'company', v: '"African Digit Consulting"', link: 'https://africandigitconsulting.com' },
  { k: 'shipping', v: '"Klassci"', comment: '5 écoles · 7 600+ étudiants', link: 'https://klassci.com' },
  { k: 'location', v: '"Koumassi, Abidjan, CI"' },
  { k: 'email', v: '"Marcel-_12@outlook.fr"', link: 'mailto:Marcel-_12@outlook.fr' },
  { k: 'graduate', v: '"BSc Hons · UCLan"' },
  { k: 'stack', v: '["Laravel","React","Next","TanStack"]' },
  { k: 'status', v: '"open to opportunities"', highlight: true },
] as const

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      {/* Decorative giant section number */}
      <div
        className="pointer-events-none absolute right-2 top-8 font-display text-[100px] font-extrabold leading-none text-accent opacity-[0.025] md:right-12 md:top-12 md:text-[260px]"
        aria-hidden
      >
        01
      </div>

      {/* Section header — code-comment style */}
      <Reveal className="mb-12 md:mb-16">
        <div className="flex items-baseline gap-3 font-mono text-[12px] tracking-wider text-accent">
          <span>{`//`}</span>
          <span>SECTION_01</span>
          <span className="text-muted">/</span>
          <span className="text-muted">about.md</span>
        </div>
        <h2 className="heading mt-3 text-[clamp(28px,6vw,68px)]">
          Qui code derrière
          <br />
          <em>la machine</em>
          <span className="text-accent">.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[5fr_6fr] md:gap-14">
        {/* LEFT — Glyph badge + Bio prose */}
        <Reveal>
          <div className="space-y-8">
            {/* Geometric MD initials badge */}
            <div className="relative inline-flex">
              <div className="relative flex h-28 w-28 items-center justify-center border border-accent/40 bg-ink2">
                <div className="absolute -top-px -left-px h-3 w-3 border-l-2 border-t-2 border-accent" aria-hidden />
                <div className="absolute -top-px -right-px h-3 w-3 border-r-2 border-t-2 border-accent" aria-hidden />
                <div className="absolute -bottom-px -left-px h-3 w-3 border-l-2 border-b-2 border-accent" aria-hidden />
                <div className="absolute -bottom-px -right-px h-3 w-3 border-r-2 border-b-2 border-accent" aria-hidden />
                <span className="font-display text-4xl font-extrabold tracking-tighter text-accent">
                  MD
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -inset-3 border border-dashed border-accent/30"
              />
            </div>

            {/* Bio paragraphs with code-comment markers */}
            <div className="space-y-5 text-[14.5px] leading-[1.85] text-paper/90">
              <div className="border-l-2 border-accent pl-5">
                <p>
                  Je suis{' '}
                  <span className="font-mono text-accent">N'Guessan Marcel DJEDJE-LI</span>,
                  développeur Full Stack et{' '}
                  <span className="font-mono text-accent">Head of Development</span> chez{' '}
                  <a
                    href="https://africandigitconsulting.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-accent decoration-dotted underline-offset-4 hover:underline"
                  >
                    African Digit Consulting
                  </a>{' '}
                  à Abidjan.
                </p>
              </div>

              <p className="pl-5">
                Mon obsession : transformer des problèmes métier complexes en{' '}
                <span className="text-accent">logiciels qui marchent vraiment</span>, au quotidien,
                sur le terrain africain. Pas une démo de hackathon, du code de production.
              </p>

              <p className="pl-5">
                Chez ADC, je conçois et livre{' '}
                <a
                  href="https://klassci.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-accent decoration-dotted underline-offset-4 hover:underline"
                >
                  Klassci
                </a>
                , notre SaaS phare de gestion scolaire pour l'enseignement supérieur. Déployé
                dans <span className="text-accent">5+ écoles</span> (ESBTP Abidjan, ESBTP Yakro,
                Institut Pascal, San Andrea, ITS), il administre aujourd'hui plus de{' '}
                <span className="text-accent font-mono">7 600 étudiants</span>.
              </p>

              <p className="pl-5">
                Avant ADC, j'ai contribué au backend bancaire de{' '}
                <span className="font-mono text-accent">NSIA Banque CI</span> (outil interne SDAI
                de régularisation SMARTVISTA, ~1000 comptes/seconde). En parallèle je livre des
                sites premium : ITM, Fejeci, SOPREMI, et un package open source pour Claude Code,{' '}
                <a
                  href="https://github.com/James10192/iroko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-accent decoration-dotted underline-offset-4 hover:underline"
                >
                  iroko
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — profile.json editor card */}
        <Reveal delay={0.15}>
          <div className="min-w-0 overflow-hidden border border-line bg-ink2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            {/* Editor chrome */}
            <header className="flex items-center justify-between gap-4 border-b border-line bg-surface/40 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-400/60" />
                <span className="ml-3 truncate font-mono text-[11px] text-muted">profile.ts</span>
              </div>
              <span className="flex-shrink-0 font-mono text-[10px] tracking-wider text-muted">
                MASTER
              </span>
            </header>

            {/* Code body — horizontal scroll on small viewports for long lines */}
            <div className="overflow-x-auto px-4 py-5 md:px-6 md:py-7">
              <CodeLine n={1}>
                <span className="text-muted">{`// who I am — runtime config`}</span>
              </CodeLine>
              <CodeLine n={2}>
                <span className="text-accent">const</span>{' '}
                <span className="text-paper">marcel</span>{' '}
                <span className="text-muted">=</span>{' '}
                <span className="text-paper">{`{`}</span>
              </CodeLine>

              {profileLines.map((line, idx) => (
                <CodeLine key={line.k} n={idx + 3}>
                  <span className="ml-4 inline-flex flex-wrap items-baseline gap-x-1">
                    <span className="text-[#94d8ff]">{line.k}</span>
                    <span className="text-muted">:</span>{' '}
                    {('link' in line && line.link) ? (
                      <a
                        href={line.link}
                        target={line.link?.startsWith('http') ? '_blank' : undefined}
                        rel={line.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={line.highlight ? 'text-accent underline decoration-dotted underline-offset-4' : 'text-accent decoration-dotted underline-offset-4 hover:underline'}
                      >
                        {line.v}
                      </a>
                    ) : (
                      <span className={line.highlight ? 'text-accent' : 'text-paper/80'}>
                        {line.v}
                      </span>
                    )}
                    <span className="text-muted">,</span>
                    {line.comment && (
                      <span className="text-muted">
                        {` // ${line.comment}`}
                      </span>
                    )}
                  </span>
                </CodeLine>
              ))}

              <CodeLine n={profileLines.length + 3}>
                <span className="text-paper">{`}`}</span>
                <span className="text-muted">;</span>
              </CodeLine>

              <CodeLine n={profileLines.length + 4}>
                <span className="text-muted">{`// → ready to ship.`}</span>
                <span className="ml-1 inline-block h-3 w-1.5 translate-y-[2px] animate-pulse bg-accent" />
              </CodeLine>
            </div>

            {/* Status bar */}
            <footer className="flex items-center justify-between border-t border-line bg-surface/40 px-4 py-2 font-mono text-[10px] text-muted">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  AVAILABLE
                </span>
                <span>·</span>
                <span>UTC+0 · Abidjan</span>
              </div>
              <span>ln {profileLines.length + 4}, col 22</span>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
