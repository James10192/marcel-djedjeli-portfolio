import { personal } from '@/data/personal'
import { BrandMark } from '@/components/brand-mark'

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 md:px-12">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <BrandMark className="h-11 shrink-0" />
          <div>
            <span className="block font-display text-sm font-extrabold text-accent">
              {personal.shortName}
            </span>
            <span className="mono-caps text-muted">Full Stack Developer</span>
          </div>
        </div>

        <p className="font-mono text-[11px] leading-relaxed text-muted">
          Koumassi, Abidjan, Côte d'Ivoire
          <br />
          <span className="text-accent">5.3097° N, 3.9464° W</span>
        </p>

        <p className="font-mono text-[11px] leading-relaxed text-muted">
          Laravel · React · Next.js · TanStack
          <br />
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span> LeVraiMD_DEV
          <span className="ml-1 inline-block h-3 w-1.5 translate-y-[2px] bg-accent" aria-hidden />
        </p>
      </div>
    </footer>
  )
}
