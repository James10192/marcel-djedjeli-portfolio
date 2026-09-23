/**
 * Origine publique du site : source unique pour toutes les URLs absolues
 * (canonical, Open Graph, partage, sitemap, RSS). Un domaine faux ici casse
 * silencieusement le référencement et les aperçus de partage.
 */
export const SITE_URL = 'https://marcel-djedjeli-portfolio.vercel.app'

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Lien canonical d'une page, à poser dans le `head.links` de sa route. */
export function canonicalLink(path: string) {
  return { rel: 'canonical', href: absoluteUrl(path) }
}

/** `og:url` d'une page : toujours la même URL que son canonical. */
export function ogUrlMeta(path: string) {
  return { property: 'og:url', content: absoluteUrl(path) }
}
