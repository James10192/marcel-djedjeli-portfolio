import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personal } from '@/data/personal'
import { SplitText } from '@/components/primitives/split-text'
import { Magnetic } from '@/components/primitives/magnetic'
import { useGsapEffect } from '@/lib/use-gsap'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

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
  const ref = useRef<HTMLElement>(null)

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

  useGsapEffect(() => {
    if (prefersReducedMotion()) return

    // --- Entrées au chargement (équivalent initial/animate + delay) ---
    gsap.from('[data-hero-label]', { opacity: 0, x: -20, duration: 0.7, delay: 0.1, ease: 'power2.out' })
    gsap.from('[data-hero-tagline]', { opacity: 0, y: 16, duration: 0.6, delay: 0.55, ease: 'power2.out' })
    gsap.from('[data-hero-cta]', { opacity: 0, y: 16, duration: 0.6, delay: 0.7, ease: 'power2.out' })
    gsap.from('[data-hero-right]', { opacity: 0, y: 30, duration: 0.8, delay: 0.5, ease: 'power2.out' })
    gsap.from('[data-hero-stat]', { opacity: 0, scale: 0.95, duration: 0.5, delay: 0.7, stagger: 0.08, ease: 'power2.out' })
    gsap.from('[data-hero-chip]', { opacity: 0, y: 8, duration: 0.4, delay: 0.85, stagger: 0.04, ease: 'power2.out' })
    gsap.from('[data-hero-scroll-inner]', { opacity: 0, duration: 1, delay: 1.2, ease: 'power1.out' })

    // --- Indicateur scroll en boucle (y: 0 → 6 → 0, 1.8s) ---
    gsap.to('[data-hero-scroll-line]', { y: 6, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // --- Parallaxe pilotée par le scroll (équivalent useScroll + useTransform) ---
    gsap.fromTo(
      '[data-hero-bg]',
      { y: 0 },
      { y: -120, ease: 'none', scrollTrigger: { start: 0, end: 600, scrub: true } },
    )
    gsap.fromTo(
      '[data-hero-content]',
      { y: 0 },
      { y: 60, ease: 'none', scrollTrigger: { start: 0, end: 600, scrub: true } },
    )
    gsap.fromTo(
      '[data-hero-content]',
      { opacity: 1 },
      { opacity: 0.6, ease: 'none', scrollTrigger: { start: 0, end: 500, scrub: true } },
    )
    gsap.fromTo(
      '[data-hero-scroll]',
      { opacity: 1 },
      { opacity: 0.6, ease: 'none', scrollTrigger: { start: 0, end: 500, scrub: true } },
    )
  }, ref)

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pt-32"
      style={{ paddingTop: 'calc(7rem + env(safe-area-inset-top))' }}
    >
      {/* Background layers (proper z-stack, no negative z) */}
      <div data-hero-bg className="absolute inset-0 z-0">
        <HeroBgFallback />
      </div>

      {/* 3D scene: constrained to upper-right quadrant so it doesn't bleed onto stats/chips */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[60%] w-[45%] md:block lg:h-[65%]">
        {show3D && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        {/* Bottom fade so sphere blends into solid bg before chips */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" aria-hidden />
      </div>

      {/* Foreground grid */}
      <div data-hero-content className="relative z-10 grid grid-cols-1 gap-0 md:grid-cols-2">
        {/* LEFT */}
        <div className="@container flex min-w-0 flex-col justify-center overflow-hidden pb-12 md:pr-12">
          <div data-hero-label className="mono-caps mb-7 inline-flex items-center gap-3 text-accent">
            <span className="h-px w-6 bg-accent" />
            Fullstack Developer · Abidjan, CI
          </div>

          <h1 className="heading mb-6 leading-[1.02]">
            <span className="block text-[clamp(30px,11cqi,72px)]">
              <SplitText text="N'Guessan" delay={0.15} />
            </span>
            <span className="block text-[clamp(34px,13cqi,84px)]">
              <SplitText text="Marcel" delay={0.25} className="font-serif italic text-accent" />
            </span>
            <span className="block text-[clamp(26px,10cqi,64px)]">
              <SplitText text="DJEDJE-LI" delay={0.35} />
            </span>
          </h1>

          <p data-hero-tagline className="mb-10 max-w-md text-[15px] leading-relaxed text-muted">
            {personal.tagline}
          </p>

          <div data-hero-cta className="flex flex-wrap gap-4">
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
            <a
              href={personal.cvPdf}
              download
              className="inline-flex h-12 items-center gap-2 px-2 font-mono text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Télécharger le CV (PDF)
            </a>
          </div>
        </div>

        {/* RIGHT - stats grid */}
        <div
          data-hero-right
          className="flex flex-col justify-end pb-12 pt-12 md:border-l md:border-line md:pl-12 md:pt-28"
        >
          <div className="mb-10 grid grid-cols-2 gap-3">
            {personal.stats.map((s) => (
              <div
                key={s.label}
                data-hero-stat
                className="surface group relative min-w-0 p-4 sm:p-5 md:p-6 lg:p-7"
              >
                <div className="whitespace-nowrap font-display text-2xl font-extrabold leading-none text-accent tabular-nums sm:text-3xl lg:text-4xl">
                  {s.value}
                </div>
                <div className="mono-caps mt-1.5 text-muted">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-wrap gap-2">
            {personal.techHighlights.map((t) => (
              <span
                key={t}
                data-hero-chip
                className="border border-line bg-ink2 px-3 py-1.5 text-[10.5px] uppercase tracking-wider text-muted backdrop-blur-sm transition-colors hover:border-accent hover:bg-surface hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:flex"
      >
        <div data-hero-scroll-inner className="mono-caps flex flex-col items-center gap-2 text-muted">
          <span>Scroll</span>
          <span data-hero-scroll-line className="h-6 w-px bg-accent" />
        </div>
      </div>
    </section>
  )
}
