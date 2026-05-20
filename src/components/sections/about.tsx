import { Reveal } from '@/components/primitives/reveal'
import { SectionHeader } from '@/components/section-header'
import { personal } from '@/data/personal'

function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="text-paper">
          {p.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{p}</span>
  })
}

const infoRows = [
  { key: 'Poste actuel', val: 'Head of Development @ ADC' },
  { key: 'Localisation', val: personal.location },
  { key: 'Email', val: personal.email },
  { key: 'Téléphone', val: personal.phone },
  { key: 'WhatsApp', val: personal.whatsapp },
  { key: 'Diplôme', val: 'BSc (Hons) — BAC+3 · UCLan' },
  { key: 'Langues', val: personal.languages },
  { key: 'Disponibilité', val: personal.availability, accent: true },
]

export function About() {
  return (
    <section
      id="about"
      className="border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <SectionHeader num="01 —" title="À propos" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="space-y-6">
            {personal.longBio.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-muted">
                {renderRichText(p)}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4">
            {infoRows.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between border-b border-line pb-3"
              >
                <span className="mono-caps text-muted">{row.key}</span>
                <span
                  className={`text-right text-[13px] ${row.accent ? 'text-accent' : 'text-paper'}`}
                >
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
