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
import { Formation } from '@/components/sections/formation'
import { Services } from '@/components/sections/services'
import { Contact } from '@/components/sections/contact'
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
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <MachineRoom data={metrics} />
        <Formation />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
