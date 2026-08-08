import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { MachineRoom } from '@/components/sections/machine-room'
import { Journal } from '@/components/sections/journal'
import { Formation } from '@/components/sections/formation'
import { Services } from '@/components/sections/services'
import { Contact } from '@/components/sections/contact'
import { SheetHeader, SectionCut } from '@/components/primitives/plate'
import { getLiveMetrics } from '@/server/live-metrics'

export const Route = createFileRoute('/')({
  component: Home,
  // Les métriques sont résolues côté serveur : elles sont donc présentes dans
  // le HTML SSR. La server function ne jette jamais, le loader non plus.
  loader: () => getLiveMetrics(),
})

function Home() {
  const metrics = Route.useLoaderData()

  return (
    <>
      <Nav />
      <main id="main">
        {/* En-tête de planche : la page se lit comme un plan d'exécution. */}
        <div style={{ paddingTop: 'calc(4.75rem + env(safe-area-inset-top))' }}>
          <SheetHeader reference="Plan · MD-2026 · échelle 1:1" revision="rév. 03 · Abidjan" />
        </div>
        <Hero />
        <SectionCut from="← le sujet" to="qui je suis →" />
        <About />
        <Skills />
        <Experience />
        <SectionCut from="← relevé chronologique" to="coupe transversale des projets →" />
        <Projects />
        <SectionCut from="← ouvrages réalisés" to="compteurs en direct →" />
        <MachineRoom data={metrics} />
        <SectionCut from="← compteurs en direct" to="notes de chantier →" />
        <Journal />
        <Formation />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
