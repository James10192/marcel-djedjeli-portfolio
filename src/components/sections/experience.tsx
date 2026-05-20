import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SectionHeader } from '@/components/section-header'
import { Reveal, RevealStagger, staggerItem } from '@/components/primitives/reveal'
import { experiences } from '@/data/experiences'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 30%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="experience"
      className="border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <SectionHeader
        num="03 —"
        title="Expérience"
        caption="De la maintenance réseau au leadership tech, en 4 ans."
      />

      <div ref={ref} className="relative">
        {/* Animated timeline line */}
        <div className="absolute left-[5px] top-0 hidden h-full w-px bg-line md:block md:left-[199px]" aria-hidden>
          <motion.div
            style={{ height: lineHeight }}
            className="w-px origin-top bg-accent"
          />
        </div>

        <RevealStagger className="flex flex-col">
          {experiences.map((exp) => (
            <motion.div
              key={exp.company + exp.date}
              variants={staggerItem}
              className="group relative grid grid-cols-1 gap-3 border-b border-line py-10 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-12"
            >
              {/* Date column */}
              <div className="relative">
                <div className="absolute -left-px top-2 hidden h-2.5 w-2.5 rounded-full border border-accent bg-ink transition-colors duration-300 group-hover:bg-accent md:left-[193px] md:block" aria-hidden />
                {exp.status === 'active' ? (
                  <span className="mb-2 inline-block bg-accent px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider" style={{ color: '#0a0a08' }}>
                    En poste
                  </span>
                ) : (
                  <span className="mb-2 inline-block border border-line bg-surface px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted">
                    Terminé
                  </span>
                )}
                <div className="mt-1 text-xs text-muted">{exp.date}</div>
              </div>

              {/* Body */}
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {exp.url ? (
                    <a href={exp.url} target="_blank" rel="noopener noreferrer">
                      {exp.company}
                      <span className="ml-2 inline-block text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        ↗
                      </span>
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <div className="mono-caps mt-1 text-accent">{exp.role}</div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="relative pl-5">
                      <span className="absolute left-0 top-2 h-px w-3 bg-accent/70" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <a
          href="/cv"
          className="inline-flex h-12 items-center gap-2 border border-line px-6 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Voir le CV complet →
        </a>
      </Reveal>
    </section>
  )
}
