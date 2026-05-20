import { Server, Monitor, Database, GitBranch, Globe, Package } from 'lucide-react'
import { Reveal, RevealStagger, staggerItem } from '@/components/primitives/reveal'
import { SectionHeader } from '@/components/section-header'
import { Marquee } from '@/components/primitives/marquee'
import { skillGroups, techMarquee } from '@/data/skills'
import { motion } from 'motion/react'

const iconMap = {
  server: Server,
  monitor: Monitor,
  database: Database,
  git: GitBranch,
  globe: Globe,
  package: Package,
}

export function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-border px-6 py-20 md:px-12 md:py-28"
    >
      <SectionHeader
        num="02 —"
        title="Compétences"
        caption="La stack que j'utilise au quotidien, du proto à la production."
      />

      <RevealStagger className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = iconMap[group.icon]
          return (
            <motion.div
              key={group.title}
              variants={staggerItem}
              className="group relative bg-bg p-8 transition-colors duration-300 hover:bg-bg-2 md:p-9"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-border text-accent transition-all duration-300 group-hover:border-accent group-hover:shadow-lime-glow">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-surface px-2 py-1 text-[10.5px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </RevealStagger>

      {/* Tech marquee */}
      <Reveal delay={0.2}>
        <div className="mt-16 border-y border-border py-6">
          <Marquee
            items={techMarquee.map((t) => (
              <span
                key={t}
                className="font-display text-xl font-extrabold uppercase tracking-tight text-text/80"
              >
                {t}
                <span className="ml-12 inline-block text-accent">◆</span>
              </span>
            ))}
          />
        </div>
      </Reveal>
    </section>
  )
}
