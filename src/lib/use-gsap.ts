import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

/**
 * Remplace useGSAP de @gsap/react : gsap.context() dans un useEffect,
 * revert au démontage. @gsap/react résout une 2e copie de React via pnpm
 * et casse le rendu SSR (useRef null) — voir rule marcel-saas-starter.
 */
export function useGsapEffect(effect: () => void, scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(effect, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
