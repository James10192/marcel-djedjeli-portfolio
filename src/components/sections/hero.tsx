import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { personal } from '@/data/personal'
import { SplitText } from '@/components/primitives/split-text'
import { Magnetic } from '@/components/primitives/magnetic'
import { prefersReducedMotion } from '@/lib/utils'

const HeroScene = lazy(() => import('@/components/three/hero-scene'))

function HeroBgFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="lime-glow absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/4" />
    </div>
  )
}

export function Hero() {
  const [show3D, setShow3D] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, -120])
  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.6])

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return
    const idle = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        ;(window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(cb)
      } else {
        setTimeout(cb, 300)
      }
    }
    idle(() => setShow3D(true))
  }, [])

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pt-32"
      style={{ paddingTop: 'calc(7rem + env(safe-area-inset-top))' }}
    >
      {/* Background layers (proper z-stack, no negative z) */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <HeroBgFallback />
      </motion.div>

      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-1/2 md:block">
        {show3D && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      {/* Foreground grid */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 grid grid-cols-1 gap-0 md:grid-cols-2"
      >
        {/* LEFT */}
        <div className="flex flex-col justify-center pb-12 md:pr-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mono-caps mb-7 inline-flex items-center gap-3 text-accent"
          >
            <span className="h-px w-6 bg-accent" />
            Fullstack Developer · Abidjan, CI
          </motion.div>

          <h1 className="heading mb-6 leading-[1.02]">
            <span className="block text-[clamp(40px,7vw,72px)]">
              <SplitText text="N'Guessan" delay={0.15} />
            </span>
            <span className="block text-[clamp(48px,8vw,84px)]">
              <SplitText text="Marcel" delay={0.25} className="font-serif italic text-accent" />
            </span>
            <span className="block text-[clamp(36px,6.2vw,64px)]">
              <SplitText text="DJEDJE-LI" delay={0.35} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mb-10 max-w-md text-[15px] leading-relaxed text-muted"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="inline-flex h-12 items-center bg-accent px-8 font-mono text-sm font-medium transition-colors hover:bg-accent-soft"
                style={{ color: '#0a0a08' }}
              >
                Voir mes projets →
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="inline-flex h-12 items-center border border-line px-8 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
              >
                Me contacter
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* RIGHT - stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col justify-end pb-12 pt-12 md:border-l md:border-line md:pl-12 md:pt-28"
        >
          <div className="mb-10 grid grid-cols-2 gap-px border border-line bg-line">
            {personal.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                className="group relative bg-ink p-6 transition-colors hover:bg-ink-2 md:p-7"
              >
                <div className="font-display text-3xl font-extrabold text-accent md:text-4xl">
                  {s.value}
                </div>
                <div className="mono-caps mt-1.5 text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {personal.techHighlights.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.85 + i * 0.04 }}
                className="border border-line px-3 py-1.5 text-[10.5px] uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:flex"
        style={{ opacity: heroOpacity }}
      >
        <div className="mono-caps flex flex-col items-center gap-2 text-muted">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-6 w-px bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
