import { Reveal } from '@/components/primitives/reveal'

type SectionHeaderProps = {
  num: string
  title: string
  caption?: string
}

export function SectionHeader({ num, title, caption }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[11px] tracking-widest text-accent">{num}</span>
        <h2 className="heading text-[clamp(28px,5vw,52px)]">{title}</h2>
      </div>
      {caption && (
        <p className="mt-3 max-w-xl text-sm text-muted md:ml-12">{caption}</p>
      )}
    </Reveal>
  )
}
