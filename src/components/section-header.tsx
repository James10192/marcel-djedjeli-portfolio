import { motion } from 'motion/react'
import { Reveal } from '@/components/primitives/reveal'

type SectionHeaderProps = {
  num: string
  title: string
  caption?: string
}

export function SectionHeader({ num, title, caption }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline gap-5"
      >
        <span className="font-mono text-[11px] tracking-widest text-accent">{num}</span>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="heading text-[clamp(28px,5vw,52px)]"
        >
          {title}
        </motion.h2>
      </motion.div>
      {caption && (
        <Reveal delay={0.2} y={20}>
          <p className="mt-3 max-w-xl text-sm text-muted md:ml-12">{caption}</p>
        </Reveal>
      )}
    </div>
  )
}
