import { HeadContent, Scripts, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { ScrollProgress } from '@/components/scroll-progress'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#0a0a08' },
      { name: 'color-scheme', content: 'dark' },
      {
        title: "N'Guessan Marcel DJEDJE-LI — Full Stack Developer · Abidjan",
      },
      {
        name: 'description',
        content:
          "Head of Development @ African Digit Consulting. Je conçois des plateformes SaaS robustes pour l'Afrique francophone — Laravel, React, Next.js, TanStack. Klassci, 7 600+ étudiants en prod.",
      },
      { name: 'author', content: "N'Guessan Marcel Jacques Patrick DJEDJE-LI" },
      { name: 'keywords', content: 'Full Stack Developer, Laravel, React, Next.js, TanStack, Abidjan, Côte d\'Ivoire, Klassci, SaaS, African Digit Consulting' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'fr_CI' },
      { property: 'og:title', content: "N'Guessan Marcel DJEDJE-LI — Full Stack Developer" },
      {
        property: 'og:description',
        content:
          "Head of Development @ African Digit Consulting. Je conçois des plateformes SaaS robustes pour l'Afrique francophone.",
      },
      { property: 'og:site_name', content: "Marcel DJEDJE-LI · Portfolio" },
      { property: 'og:image', content: '/og.png' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: "N'Guessan Marcel DJEDJE-LI — Full Stack Developer" },
      {
        name: 'twitter:description',
        content: 'Head of Development @ ADC. Laravel, React, Next.js, TanStack. Klassci en prod.',
      },
      { name: 'twitter:image', content: '/og.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      // Fonts critiques du premier viewport (titre display + corps mono)
      { rel: 'preload', href: '/fonts/syne-800.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: '/fonts/dm-mono-400.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: "N'Guessan Marcel Jacques Patrick DJEDJE-LI",
          jobTitle: 'Full Stack Developer · Head of Development',
          worksFor: {
            '@type': 'Organization',
            name: 'African Digit Consulting',
            url: 'https://africandigitconsulting.com',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abidjan',
            addressRegion: 'Koumassi',
            addressCountry: 'CI',
          },
          email: 'djedjelipatrick@gmail.com',
          telephone: '+2250705843901',
          sameAs: [
            'https://github.com/James10192',
            'https://www.linkedin.com/in/marcel-djedje-li-099490235/',
          ],
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <span className="mono-caps text-accent">erreur 404</span>
      <h1 className="heading mt-4 text-[clamp(40px,10vw,110px)] leading-none">
        Page
        <br />
        introuvable.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        Cette page n'existe pas ou a été déplacée. Le reste du site, lui, tourne en production.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center bg-accent px-6 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-accent-soft"
          style={{ color: '#0a0a08' }}
        >
          Retour à l'accueil
        </Link>
        <Link
          to="/projets"
          search={{ famille: 'all' }}
          className="inline-flex h-11 items-center border border-line px-6 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:border-accent hover:text-accent"
        >
          Voir les études de cas
        </Link>
      </div>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="noise-overlay">
        <a
          href="#main"
          className="absolute left-2 -top-20 z-[100] rounded bg-accent px-3 py-2 font-mono text-xs text-ink focus:top-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export { Outlet }
