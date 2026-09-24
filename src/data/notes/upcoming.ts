import type { UpcomingNote } from './types'

/**
 * Épisodes annoncés : titre et thèse seulement. Quand un corps est écrit,
 * l'épisode quitte cette liste pour son propre fichier dans episodes/.
 */
export const upcomingNotes: UpcomingNote[] = [
  {
    slug: 'hackathons-et-entreprises-durables',
    episode: 4,
    status: 'a-venir',
    title: "Pourquoi nos hackathons produisent peu d'entreprises durables.",
    thesis:
      "Le problème n'est pas le hackathon lui-même : c'est l'absence de marché, de propriétaire, de budget et d'accompagnement une fois le week-end terminé.",
    audience:
      'Organisateurs, sponsors, incubateurs et anciens participants qui se demandent ce que sont devenus les projets.',
  },
  {
    slug: 'copier-un-saas-americain',
    episode: 5,
    status: 'a-venir',
    title: 'Copier un SaaS américain ne suffit pas.',
    thesis:
      "Un produit pertinent intègre les comportements, les paiements, les connexions, la confiance et l'économie de son marché : la localisation va bien au-delà de la traduction.",
    audience:
      'Fondateurs SaaS, product designers et développeurs qui construisent pour le marché africain.',
  },
  {
    slug: 'ia-et-ingenierie',
    episode: 6,
    status: 'a-venir',
    title: "L'intelligence artificielle ne remplace pas l'ingénierie.",
    thesis:
      "L'IA augmente la vitesse de production, mais la spécification, les tests, la sécurité, l'architecture et la responsabilité restent le travail de l'ingénieur.",
    audience:
      'Développeurs, CTO et équipes qui adoptent les agents de code sans vouloir sacrifier la qualité.',
  },
  {
    slug: 'sortir-du-plafond-freelance',
    episode: 7,
    status: 'a-venir',
    title: 'Pourquoi beaucoup de développeurs restent bloqués au niveau freelance.',
    thesis:
      "Le freelancing crée du cash et de l'expérience, mais devient un plafond quand chaque revenu dépend d'une nouvelle heure vendue : la sortie passe par la construction d'actifs.",
    audience:
      "Freelances, salariés qui préparent leur activité et petites agences qui veulent changer d'échelle.",
  },
  {
    slug: 'developer-capital',
    episode: 8,
    status: 'a-venir',
    title: 'Transformer sa compétence en Developer Capital.',
    thesis:
      'Le Developer Capital combine compétence, preuve publique, distribution, actifs réutilisables et réserve financière : le salaire seul ne mesure pas la progression.',
    audience:
      "Développeurs de tout niveau, étudiants et formateurs qui veulent un cadre d'auto-évaluation concret.",
  },
  {
    slug: '7600-etudiants-en-production',
    episode: 9,
    status: 'a-venir',
    title: "Ce que 7 600 étudiants m'ont appris sur le logiciel en production.",
    thesis:
      "À l'échelle réelle, les permissions, la donnée, les exports, le support, la migration et la fiabilité comptent bien plus que la démonstration spectaculaire.",
    audience:
      'Développeurs qui livrent leur premier logiciel utilisé quotidiennement par des centaines de personnes.',
  },
  {
    slug: 'je-construis-filon-publiquement',
    episode: 10,
    status: 'a-venir',
    title: 'Je construis Filon publiquement : voici le problème.',
    thesis:
      "Le problème n'est pas seulement de trouver des opportunités, mais de les suivre, de relancer à temps et d'apprendre de son propre pipeline.",
    audience:
      'Développeurs, freelances et indépendants qui perdent des opportunités faute de suivi.',
  },
]
