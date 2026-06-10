import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
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
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
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
          email: 'Marcel-_12@outlook.fr',
          telephone: '+2250705843901',
          sameAs: ['https://github.com/James10192'],
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
})

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
