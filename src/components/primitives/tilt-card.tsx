import { useRef, type ReactNode, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * intensity
    const ry = (x - 0.5) * intensity
    el.style.setProperty('--rx', `${rx}deg`)
    el.style.setProperty('--ry', `${ry}deg`)
    if (glare) {
      el.style.setProperty('--glare-x', `${x * 100}%`)
      el.style.setProperty('--glare-y', `${y * 100}%`)
    }
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const glareStyle: CSSProperties | undefined = glare
    ? {
        background:
          'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(212,240,60,0.10), transparent 40%)',
      }
    : undefined

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('tilt-card relative', className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 [.tilt-card:hover_&]:opacity-100"
          style={glareStyle}
        />
      )}
    </div>
  )
}
