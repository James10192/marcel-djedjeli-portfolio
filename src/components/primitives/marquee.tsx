import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type MarqueeProps = {
  items: ReactNode[]
  className?: string
  gap?: string
}

export function Marquee({ items, className, gap = '3rem' }: MarqueeProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]',
        className
      )}
    >
      <div className="marquee-track" style={{ gap }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center whitespace-nowrap" style={{ paddingRight: gap }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
