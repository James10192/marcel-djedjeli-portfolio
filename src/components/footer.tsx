import { personal } from '@/data/personal'

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-line px-6 py-8 text-center md:flex-row md:px-12 md:text-left">
      <span className="font-display text-sm font-extrabold text-accent">
        {personal.shortName}
      </span>
      <p className="text-xs text-muted">
        Full Stack Developer · Abidjan, Côte d'Ivoire ·{' '}
        <span suppressHydrationWarning>{new Date().getFullYear()}</span>
      </p>
      <p className="text-xs text-accent">Laravel · React · Next.js · TanStack</p>
    </footer>
  )
}
