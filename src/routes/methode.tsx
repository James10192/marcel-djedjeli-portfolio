import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { Reveal } from '@/components/primitives/reveal'
import { Magnetic } from '@/components/primitives/magnetic'
import { personal } from '@/data/personal'

const IROKO_REPO = 'https://github.com/James10192/iroko'
const IROKO_SITE = 'https://iroko-site.vercel.app'
const IROKO_NPM = 'https://www.npmjs.com/package/@james10192/iroko'
const WHATSAPP_HREF = `https://wa.me/${personal.whatsappIntl}?text=${encodeURIComponent(
  "Bonjour Marcel, je vous contacte au sujet d'un projet.",
)}`

type Step = {
  num: string
  title: string
  promise: string
  work: string
  deliverable: string
  risk: string
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Cadrer',
    promise: "D'abord comprendre votre métier, ensuite parler technique.",
    work: "Je vous écoute décrire votre quotidien : qui fait quoi, à quel moment, avec quels documents, et où ça coince aujourd'hui. Je reformule jusqu'à ce que vous me disiez « oui, c'est exactement ça ». Nous décidons ensemble de ce qui entre dans la première version et de ce qui attend.",
    deliverable: "Une note de cadrage en français simple : le problème, les personnes concernées, la liste de ce qui sera livré, le budget et le calendrier.",
    risk: "La majorité des projets ratés ne le sont pas techniquement : ils répondent à un besoin mal compris. Écrire le besoin avant de coder coûte quelques heures, se tromper de produit coûte des mois.",
  },
  {
    num: '02',
    title: 'Illustrer',
    promise: 'Voir avant de payer la construction.',
    work: "Je dessine les écrans clés et l'enchaînement des parcours : la page d'accueil, le formulaire critique, le tableau de bord. Vous cliquez, vous circulez, vous critiquez. On corrige à ce stade, là où changer d'avis ne coûte presque rien.",
    deliverable: "Des maquettes navigables de votre projet, sur ordinateur et sur téléphone, avec vos vrais libellés et vos vraies données d'exemple.",
    risk: "Déplacer un bouton sur une maquette prend dix minutes. Le déplacer dans un logiciel déjà construit, testé et déployé peut prendre plusieurs jours. Cette étape déplace les décisions au moment où elles sont encore bon marché.",
  },
  {
    num: '03',
    title: 'Documenter',
    promise: 'Écrire les règles avant de les programmer.',
    work: "Je mets par écrit les règles de gestion : qui a le droit de faire quoi, comment se calcule un montant, ce qui se passe quand une donnée manque, ce qu'on garde et pendant combien de temps. Vous validez ces règles ligne à ligne, en français.",
    deliverable: "Un document de référence des règles métier et des droits d'accès, plus le plan technique de la plateforme.",
    risk: "Une règle non écrite est une règle qui sera interprétée. La documenter, c'est garantir que le logiciel fera ce que votre métier exige, et pas ce qu'un développeur aura supposé un mardi soir.",
  },
  {
    num: '04',
    title: 'Construire',
    promise: 'Livrer par morceaux utilisables, pas en une fois à la fin.',
    work: "Je développe par tranches courtes. À chaque tranche, vous recevez un lien vers une version en ligne de votre plateforme, avec ce qui a avancé depuis la fois précédente. Vous testez avec vos propres données et vos remarques repartent dans la tranche suivante.",
    deliverable: "Une adresse web privée, mise à jour en continu, plus un point d'avancement régulier qui liste ce qui est terminé, en cours et à venir.",
    risk: "Un projet livré d'un bloc à la fin est un pari. Un projet livré par tranches se corrige en route : vous voyez la valeur arriver et vous gardez la main sur les priorités jusqu'au bout.",
  },
  {
    num: '05',
    title: 'Vérifier',
    promise: 'Prouver que ça marche, et le prouver encore demain.',
    work: "J'écris des tests automatiques sur les parties sensibles, calculs, droits d'accès, paiements. Ils se rejouent à chaque modification. Avant la mise en ligne, je contrôle la vitesse d'affichage, l'accessibilité, le référencement et le comportement sur téléphone en connexion lente.",
    deliverable: "Un rapport de mise en production, la formation de vos équipes, et un logiciel qui signale lui-même une régression avant vos utilisateurs.",
    risk: "Sans tests, chaque correction peut casser autre chose en silence. Avec eux, une plateforme peut évoluer pendant des années sans que la peur du changement paralyse les décisions.",
  },
]

export const Route = createFileRoute('/methode')({
  component: MethodePage,
  head: () => ({
    meta: [
      { title: 'Ma méthode de travail · Marcel DJEDJE-LI' },
      {
        name: 'description',
        content:
          "Cadrer, illustrer, documenter, construire, vérifier : la méthode en 5 étapes de Marcel DJEDJE-LI pour livrer des plateformes web et SaaS sans mauvaise surprise. Une méthode publique, outillée et open source.",
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Ma méthode de travail · Marcel DJEDJE-LI' },
      {
        property: 'og:description',
        content:
          "Cinq étapes, cinq livrables concrets. Une méthode publique et outillée, pas un discours commercial.",
      },
      { property: 'og:image', content: '/og.png' },
    ],
  }),
})

function MethodePage() {
  return (
    <>
      <Nav />
      <main id="main" className="min-h-dvh px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Retour
          </Link>

          {/* En-tête éditorial */}
          <header className="mt-10 border-b border-line pb-12 md:mt-14 md:pb-16">
            <span className="mono-caps text-accent">Méthode de travail</span>
            <h1 className="heading mt-5 text-[clamp(34px,8vw,78px)] leading-[0.95] tracking-[-0.03em]">
              Cinq étapes,
              <br />
              <em>zéro mauvaise surprise</em>
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15.5px] leading-[1.8] text-muted">
              Un logiciel qui rate coûte rarement cher à cause du code. Il coûte cher
              parce que personne n'a écrit ce qu'on attendait de lui, parce que
              l'utilisateur a découvert le résultat trop tard, ou parce que la
              première correction en a cassé trois autres. Voici comment je travaille
              pour que rien de tout cela ne vous arrive.
            </p>
          </header>

          {/* Les 5 étapes */}
          <ol className="mt-12 space-y-5 md:mt-16 md:space-y-6">
            {STEPS.map((step, i) => (
              <li key={step.num}>
                <Reveal delay={i * 0.05}>
                  <StepCard step={step} />
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Fil rouge : la méthode est publique et outillée */}
          <Reveal>
            <section className="mt-16 border border-line bg-ink2 p-7 md:mt-20 md:p-10">
              <span className="mono-caps text-accent">Le fil rouge</span>
              <h2 className="heading mt-4 text-[clamp(24px,5vw,42px)] leading-[1.05]">
                Ma méthode n'est pas un discours,
                <br />
                <em>elle est publique et outillée</em>
                <span className="text-accent">.</span>
              </h2>
              <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-10">
                <p className="text-[14.5px] leading-[1.8] text-muted">
                  N'importe quel prestataire peut décrire une belle démarche sur une
                  page de vente. La mienne, j'ai passé des mois à la transformer en
                  outil : <span className="text-paper">iroko</span>, un package open
                  source qui installe ces cinq étapes directement dans mon
                  environnement de développement, sous forme de règles et de
                  vérifications automatiques.
                </p>
                <p className="text-[14.5px] leading-[1.8] text-muted">
                  Le code est lisible par tous, sous licence MIT, publié sur npm et
                  utilisé par d'autres développeurs. Concrètement : la méthode ne
                  dépend plus de ma discipline un jour de fatigue, elle est appliquée
                  par la machine. Et vous pouvez la vérifier vous-même, sans me croire
                  sur parole.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ExternalPill href={IROKO_SITE} label="iroko-site.vercel.app" />
                <ExternalPill href={IROKO_REPO} label="github.com/James10192/iroko" />
                <ExternalPill href={IROKO_NPM} label="@james10192/iroko sur npm" />
              </div>

              <p className="mt-7 font-mono text-[11.5px] text-muted">
                Les compteurs en direct de ce package sont affichés sur{' '}
                <Link
                  to="/"
                  hash="machine-room"
                  className="text-paper underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  la salle des machines
                </Link>
                .
              </p>
            </section>
          </Reveal>

          {/* CTA final */}
          <Reveal>
            <section className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-16">
              <h2 className="heading text-[clamp(26px,6vw,48px)] leading-[1.02]">
                Votre projet mérite
                <br />
                <em>une première étape</em>
                <span className="text-accent">.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-muted">
                Le cadrage est une conversation, pas un engagement. Décrivez-moi votre
                besoin en quelques phrases : je vous dis franchement si je suis la
                bonne personne, et ce que je ferais à votre place.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Magnetic strength={0.25}>
                  <a
                    href={`mailto:${personal.email}`}
                    className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-7 font-mono text-sm font-medium transition-colors hover:bg-accent-soft"
                    style={{ color: '#0a0a08' }}
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Écrire un email
                  </a>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 border border-line px-7 font-mono text-sm text-paper transition-colors hover:border-accent hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Discuter sur WhatsApp
                  </a>
                </Magnetic>
                <Link
                  to="/projets"
                  search={{ famille: 'all' }}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-line px-7 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  Voir la méthode appliquée
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

function StepCard({ step }: { step: Step }) {
  return (
    <article className="surface group relative overflow-hidden p-7 md:p-10">
      <div
        className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 font-display text-7xl font-extrabold leading-none text-accent opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.08] md:text-9xl"
        aria-hidden
      >
        {step.num}
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-widest text-accent">{step.num}</span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
            {step.title}
          </h2>
        </div>

        <p className="mt-3 max-w-xl font-serif text-[19px] leading-[1.45] text-paper md:text-[22px]">
          {step.promise}
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          <div>
            <dt className="mono-caps text-[10px] text-accent">Ce que je fais</dt>
            <dd className="mt-2.5 text-[13.5px] leading-[1.75] text-muted">{step.work}</dd>
          </div>
          <div>
            <dt className="mono-caps text-[10px] text-accent">Ce que vous recevez</dt>
            <dd className="mt-2.5 text-[13.5px] leading-[1.75] text-muted">{step.deliverable}</dd>
          </div>
          <div>
            <dt className="mono-caps text-[10px] text-accent">Le risque évité</dt>
            <dd className="mt-2.5 text-[13.5px] leading-[1.75] text-muted">{step.risk}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

function ExternalPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-2 border border-line px-4 font-mono text-[11.5px] text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
  )
}
