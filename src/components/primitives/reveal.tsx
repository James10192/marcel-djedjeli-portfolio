import { motion, type Variants, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header'
  once?: boolean
  duration?: number
}

export function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
  as = 'div',
  once = true,
  duration = 0.9,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <MotionTag className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

type RevealStaggerProps = {
  children: ReactNode
  stagger?: number
  delay?: number
  className?: string
}

export function RevealStagger({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div className={className} initial={false} animate="visible">
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

type ParallaxProps = {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 50, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
