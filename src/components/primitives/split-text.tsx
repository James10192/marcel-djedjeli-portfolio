import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'span' | 'div'
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as = 'span',
}: SplitTextProps) {
  const words = text.split(' ')
  const MotionTag = as === 'div' ? motion.div : motion.span
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as === 'div' ? 'div' : 'span'
    return (
      <Tag className={cn('inline-block', className)} aria-label={text}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block max-w-full overflow-hidden align-baseline pb-[0.18em] -mb-[0.18em]"
            aria-hidden
          >
            <span className="inline-block">
              {word}
              {i < words.length - 1 && ' '}
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={cn('inline-block', className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block max-w-full overflow-hidden align-baseline pb-[0.18em] -mb-[0.18em]"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
