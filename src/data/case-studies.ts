// AUTO-GÉNÉRÉ à partir du workflow d'études de cas (recherche + vérification
// adversariale sur les repos réels). NE CONTIENT QUE LES PROJETS PUBLICS.
// Les 5 produits non lancés (ImmoBidjan, DUKA, MailPulse, E-pagne, KALGA) sont
// volontairement ABSENTS de ce fichier pour ne pas être embarqués dans le bundle
// client public. Ils vivent dans case-studies.private.ts (gitignoré, non importé)
// jusqu'à validation explicite de Marcel pour leur mise en ligne.

export type DiagramNode = {
  id: string
  label: string
  kind: 'client' | 'server' | 'db' | 'service' | 'external' | 'job'
}
export type DiagramEdge = { from: string; to: string; label?: string }
export type Decision = { title: string; choice: string; rationale: string; tradeoff: string }
export type Challenge = { problem: string; solution: string }
export type Metric = { value: string; label: string }

export type CaseStudy = {
  slug: string
  title: string
  oneLiner: string
  role: string
  year: string
  status: 'prod' | 'maquette' | 'dev' | 'livre'
  headlineMetric?: Metric | null
  stack: string[]
  links?: { live?: string; github?: string; docs?: string }
  context: string
  architectureSummary: string
  architectureDiagram: { nodes: DiagramNode[]; edges: DiagramEdge[] }
  decisions: Decision[]
  challenges: Challenge[]
  results: Metric[]
  confidential: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    "slug": "klassci",
    "title": "Klassci, plateforme SaaS multi-instance de gestion scolaire pour l'enseignement supérieur ivoirien",
    "oneLiner": "Un SaaS Laravel multi-instance qui gère inscriptions, scolarité LMD, paiements mobile money et bulletins pour des écoles supérieures en Côte d'Ivoire, avec une base de données isolée par établissement.",
    "role": "Head of Development chez African Digit Consulting : conception de l'architecture SaaS multi-instance (app master + apps tenant), du moteur d'allocation des paiements par échéancier, du provisioning automatisé des établissements et du SSO inter-applications.",
    "year": "2025",
    "status": "prod",
    "stack": [
      "Laravel (10.x métier / 12.x master)",
      "PHP 8.x",
      "MySQL 8.x",
      "Filament v3 (app master)",
      "Blade",
      "Alpine.js",
      "Chart.js",
      "DataTables",
      "DomPDF / mpdf / Browsershot",
      "Laravel Sanctum",
      "spatie/laravel-permission",
      "owen-it/laravel-auditing",
      "Service Worker (PWA offline)",
      "Google Gemini 2.0 Flash"
    ],
    "context": "Les écoles supérieures ivoiriennes (BTS, Licence, systèmes LMD) gèrent encore inscriptions, scolarité et bulletins sur papier ou tableurs, dans un contexte où les familles paient majoritairement par mobile money (Wave, Orange Money, MTN, Moov, Djamo) et par tranches échelonnées sur l'année. Klassci répond à ce besoin avec une plateforme qui doit servir plusieurs établissements distincts tout en garantissant une isolation stricte des données de chacun, fonctionner sur des connexions instables, et respecter les règles métier locales (frais par catégories, échéanciers, conformité LMD avec crédits ECTS et unités d'enseignement).",
    "architectureSummary": "Klassci est composé de deux applications Laravel distinctes. Une application master (adminKlassci, Filament v3, Laravel 12, base unique klassci_master) tient le registre des établissements (tenants), leur plan tarifaire, leurs credentials de base de données et leur branche Git, et orchestre le provisioning, le déploiement, les health checks et l'agrégation de statistiques. Chaque établissement tourne comme une instance dédiée de l'application métier (KLASSCIv2) avec sa propre base de données isolée et sa propre branche Git synchronisée depuis une branche de référence. L'application métier couvre l'académique (classes, matières, planifications, emplois du temps), les étudiants et inscriptions, les notes et bulletins, les présences, et la comptabilité (frais par catégories et variantes, échéanciers, paiements). Le master peut ouvrir une session sur un tenant via un SSO maison signé en HMAC-SHA256, et regrouper plusieurs établissements d'un même réseau (Group) pour un portail consolidé. Un chatbot s'appuie sur Gemini 2.0 Flash, et un service worker apporte un mode hors-ligne.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "browser",
          "label": "Navigateur (secrétaire, comptable, enseignant, étudiant)",
          "kind": "client"
        },
        {
          "id": "pwa",
          "label": "Service Worker (mode hors-ligne)",
          "kind": "client"
        },
        {
          "id": "master",
          "label": "App Master adminKlassci (Filament v3, Laravel 12)",
          "kind": "server"
        },
        {
          "id": "tenant",
          "label": "App métier KLASSCIv2 (par établissement)",
          "kind": "server"
        },
        {
          "id": "masterdb",
          "label": "DB klassci_master (tenants, plans, déploiements)",
          "kind": "db"
        },
        {
          "id": "tenantdb",
          "label": "DB isolée (1 par établissement)",
          "kind": "db"
        },
        {
          "id": "gemini",
          "label": "Google Gemini 2.0 Flash (chatbot)",
          "kind": "external"
        },
        {
          "id": "momo",
          "label": "Mobile money (Wave / Orange / MTN / Moov / Djamo)",
          "kind": "external"
        },
        {
          "id": "provision",
          "label": "Provisioning & déploiement tenant (commandes artisan)",
          "kind": "job"
        }
      ],
      "edges": [
        {
          "from": "browser",
          "to": "tenant",
          "label": "HTTPS app métier"
        },
        {
          "from": "pwa",
          "to": "tenant",
          "label": "sync à la reconnexion"
        },
        {
          "from": "browser",
          "to": "master",
          "label": "admin SaaS"
        },
        {
          "from": "master",
          "to": "masterdb",
          "label": "registre tenants"
        },
        {
          "from": "master",
          "to": "provision",
          "label": "déclenche"
        },
        {
          "from": "provision",
          "to": "tenantdb",
          "label": "crée DB + migrate + seed"
        },
        {
          "from": "master",
          "to": "tenant",
          "label": "SSO HMAC-SHA256 master→tenant"
        },
        {
          "from": "tenant",
          "to": "tenantdb",
          "label": "données métier isolées"
        },
        {
          "from": "tenant",
          "to": "gemini",
          "label": "requêtes chatbot"
        },
        {
          "from": "tenant",
          "to": "momo",
          "label": "encaissement scolarité (saisie mode paiement)"
        }
      ]
    },
    "decisions": [
      {
        "title": "SSO maison HMAC-SHA256 plutôt que JWT",
        "choice": "Jetons inter-applications signés en HMAC-SHA256 avec secret partagé et expiration courte (120s), au lieu d'une librairie JWT.",
        "rationale": "Les URLs signées Laravel dépendent de l'APP_KEY locale, qui diffère entre l'app master et chaque tenant. HMAC-SHA256 avec secret partagé donne la même garantie d'intégrité sans dépendance supplémentaire.",
        "tradeoff": "Les jetons ne sont pas à usage unique : un jeton intercepté peut être rejoué dans la fenêtre de 2 minutes. Les mitigations sont l'expiration courte, HTTPS et une politique Referrer-Policy no-referrer ; le passage à une table de nonce mono-usage reste à faire."
      },
      {
        "title": "Une base de données isolée par établissement",
        "choice": "Chaque tenant tourne sur sa propre base de données dédiée plutôt qu'un schéma partagé avec une colonne tenant_id.",
        "rationale": "Garantit une isolation stricte des données entre établissements concurrents et simplifie l'export, la sauvegarde ou la suppression par établissement.",
        "tradeoff": "Multiplie les bases à migrer et à déployer (commande tenant:deploy centralisée pour compenser) et complexifie l'agrégation de statistiques inter-tenants côté master."
      }
    ],
    "challenges": [
      {
        "problem": "Servir plusieurs établissements concurrents sans fuite de données ni déploiement manuel école par école.",
        "solution": "Architecture master/tenant avec base isolée par établissement et chaîne de provisioning automatisée (commande tenant:provision en 17 étapes : enregistrement master, création DB + credentials, clone Git, .env, dépendances, migrations, seed) plus un déploiement centralisé (tenant:deploy) et des health checks. Les étapes sous-domaine et certificat SSL sont prévues mais encore en simulation (intégration cPanel/Let's Encrypt à finaliser)."
      },
      {
        "problem": "Réconcilier des paiements échelonnés saisis de façons hétérogènes (mobile money, espèces, chèque) avec des échéanciers par catégorie de frais.",
        "solution": "Un ensemble de services Echeancier qui calculent les tranches dues, allouent en priorité les paiements ciblés sur leur tranche puis répartissent le reste par pool de catégorie, et un catalogue de modes de paiement normalisé par alias pour fiabiliser les agrégations."
      },
      {
        "problem": "Permettre à l'admin SaaS d'entrer dans n'importe quel tenant sans partager d'APP_KEY ni gérer N comptes.",
        "solution": "Un SSO inter-applications signé en HMAC-SHA256 avec secret partagé, jetons à courte durée de vie, journalisation des accès, et un mécanisme de Group pour fédérer les établissements d'un même réseau dans un portail consolidé."
      },
      {
        "problem": "Maîtriser la dette d'un domaine métier dense (bulletins, comptabilité, inscriptions) où certains contrôleurs ont enflé à plusieurs milliers de lignes.",
        "solution": "Extraction progressive vers une large couche de services dédiés (allocation, calcul de frais, planification, bulletins, exports) et un registre centralisé de permissions audité par commande artisan."
      }
    ],
    "results": [
      {
        "value": "2 000+",
        "label": "inscriptions sur l'instance ESBTP Abidjan (offre Élite)"
      },
      {
        "value": "2 000+",
        "label": "inscriptions sur l'instance ESBTP Yakro (offre Élite)"
      },
      {
        "value": "6",
        "label": "instances établissements (Abidjan et Yakro en production, Ephrata partenaire, Hetec et Rostan en test, instance démo)"
      }
    ],
    "confidential": false,
    "headlineMetric": {
      "label": "Établissements supérieurs servis en instances isolées",
      "value": "6"
    },
    "links": {
      "live": "https://presentation.klassci.com",
      "github": "https://github.com/James10192/KLASSCIv2"
    }
  },
  {
    "slug": "klassci-landing",
    "title": "KLASSCI Landing — site vitrine et documentation bilingue en Next.js sur Vercel",
    "oneLiner": "Le site marketing et la documentation produit de KLASSCI, extraits du SaaS Laravel et reconstruits en Next.js 14 bilingue sur Vercel, pour présenter une gestion scolaire pensée pour les écoles d'Afrique francophone.",
    "role": "Conception et développement intégral (architecture, i18n, design system de marque, docs MDX, SEO, analytics) en tant que Head of Development.",
    "year": "2026",
    "status": "livre",
    "stack": [
      "Next.js 14.2 (App Router)",
      "TypeScript strict",
      "Tailwind CSS v3",
      "next-intl 4.9",
      "Fumadocs (MDX + recherche Orama)",
      "framer-motion",
      "PostHog",
      "Vercel Analytics + Speed Insights",
      "IBM Plex (next/font/google)",
      "pnpm (node-linker hoisted)",
      "Vercel"
    ],
    "context": "KLASSCI est un SaaS de gestion scolaire (notes, bulletins, paiements, présences, LMD) servi par une application Laravel multi-tenant sur des sous-domaines `<ecole>.klassci.com` hébergés en cpanel. Le besoin métier : sortir la vitrine commerciale et la documentation de cette application Laravel monolithique pour les faire vivre à part, sur un apex rapide et internationalisable, sans toucher au SaaS authentifié qui reste en place. La contrainte terrain est explicite dans le produit lui-même : cibles écoles supérieures d'Afrique francophone, tarifs et offres en FCFA, conformité LMD/UEMOA, support via WhatsApp et Telegram, et une formule Partenaire pensée pour les établissements sans trésorerie cash (installation plus montant par élève payés via les frais de scolarité parents). La page d'accueil reprend fidèlement le `welcome.blade.php` canonique de KLASSCIv2.",
    "architectureSummary": "Architecture découplée par responsabilité. Le site est une application Next.js 14 (App Router) déployée sur Vercel et servie directement sur l'apex `klassci.com` ; les instances applicatives authentifiées restent, elles, sur les sous-domaines `<ecole>.klassci.com` (par exemple `presentation.klassci.com` pour le compte de présentation), servies par l'application Laravel multi-instance hébergée en cpanel. La vitrine et la doc sont donc bien séparées du SaaS. Le site Next.js est entièrement statique au build (generateStaticParams par locale et par page de docs) : la home assemble une quinzaine de sections React (hero, piliers, fonctionnalités, témoignages, tarifs, FAQ, contact) et la documentation est rendue depuis des fichiers MDX via Fumadocs. L'internationalisation FR/EN passe par next-intl (FR par défaut sans préfixe, EN sous `/en`, stratégie `as-needed`) et un middleware de routing. La recherche docs s'appuie sur Fumadocs avec une API `/api/search` qui crée un index Orama par langue (createI18nSearchAPI) pour éviter la fuite de résultats entre locales. La télémétrie repose sur PostHog (catalogue d'événements typé) plus Vercel Analytics et Speed Insights. Le formulaire de contact poste vers `/api/contact`, route encore à livrer (TODO assumé dans le code), avec un état d'erreur propre côté client en attendant.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "visitor",
          "label": "Visiteur (FR/EN, mobile-first)",
          "kind": "client"
        },
        {
          "id": "vercel",
          "label": "Next.js 14 sur Vercel (apex klassci.com)",
          "kind": "server"
        },
        {
          "id": "mdx",
          "label": "Docs MDX (content/docs, Fumadocs)",
          "kind": "db"
        },
        {
          "id": "search",
          "label": "API /api/search (Orama par locale)",
          "kind": "service"
        },
        {
          "id": "contact",
          "label": "API /api/contact (à livrer)",
          "kind": "service"
        },
        {
          "id": "laravel",
          "label": "SaaS Laravel multi-instance (cpanel, sous-domaines <ecole>.klassci.com)",
          "kind": "external"
        },
        {
          "id": "posthog",
          "label": "PostHog + Vercel Analytics",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "visitor",
          "to": "vercel",
          "label": "HTTPS, static + headers sécurité"
        },
        {
          "from": "vercel",
          "to": "mdx",
          "label": "build MDX -> pages docs"
        },
        {
          "from": "visitor",
          "to": "search",
          "label": "recherche docs ?locale="
        },
        {
          "from": "search",
          "to": "mdx",
          "label": "index Orama par langue"
        },
        {
          "from": "visitor",
          "to": "contact",
          "label": "POST formulaire démo"
        },
        {
          "from": "visitor",
          "to": "laravel",
          "label": "connexion tenant <ecole>.klassci.com"
        },
        {
          "from": "visitor",
          "to": "posthog",
          "label": "events typés + pageviews"
        }
      ]
    },
    "decisions": [
      {
        "title": "Sortir la vitrine du monolithe Laravel vers Next.js sur Vercel",
        "choice": "Reconstruire uniquement la vitrine et la doc en Next.js 14, en laissant le SaaS authentifié sur Laravel/cpanel inchangé.",
        "rationale": "La vitrine est la page la plus visitée et la plus sensible au SEO et à la performance ; la sortir du monolithe permet un rendu statique, un CDN global et des déploiements rapides sans risquer la stabilité du SaaS en production chez des écoles payantes.",
        "tradeoff": "On gagne vitesse, isolation et itération marketing libre ; on sacrifie l'unicité du codebase et on maintient deux environnements (Next sur Vercel pour l'apex klassci.com, Laravel sur cpanel pour les instances <ecole>.klassci.com)."
      },
      {
        "title": "next-intl avec FR par défaut sans préfixe et EN sous /en",
        "choice": "localePrefix 'as-needed', defaultLocale 'fr', et messages FR extraits directement du welcome.blade.php canonique.",
        "rationale": "Le marché premier est francophone (Côte d'Ivoire, UEMOA) : garder les URLs FR propres à la racine sert le SEO local, tout en ouvrant une version EN complète pour l'export.",
        "tradeoff": "Bilingue maintenu à la main dans deux fichiers de messages et des MDX dupliqués par locale ; gain en pertinence locale contre un coût de synchronisation des traductions."
      },
      {
        "title": "Documentation en MDX via Fumadocs plutôt qu'un CMS",
        "choice": "content/docs en MDX, rendu Fumadocs, recherche Orama, avec un ordre de plugins remark maîtrisé (remarkHeading avant remarkStructure).",
        "rationale": "La doc évolue au rythme du produit et est rédigée par l'équipe dev ; le MDX versionné dans Git colle au workflow et reste gratuit à héberger, ce qui compte dans un contexte budget-first.",
        "tradeoff": "Pas d'édition par des non-développeurs et quelques pièges de configuration (un tableau de plugins remplace la liste par défaut et casse silencieusement les ancres de recherche), au profit d'un contrôle total et zéro dépendance externe."
      },
      {
        "title": "Index de recherche séparé par locale (createI18nSearchAPI)",
        "choice": "Abandonner createFromSource au profit de createI18nSearchAPI avec un index Orama tagué par langue.",
        "rationale": "En Fumadocs v14, createFromSource ne segmente pas réellement les index : une recherche depuis /en renvoyait des titres FR. L'API i18n explicite route chaque requête vers la bonne instance Orama.",
        "tradeoff": "Code de construction d'index plus verbeux et filtrage manuel du bruit (cellules de tableau, libellés courts) contre une recherche correcte et sans fuite entre langues."
      },
      {
        "title": "Offre commerciale en FCFA avec formule Partenaire sans cash",
        "choice": "Modéliser dans le pricing trois tiers Essentiel/Pro/Élite en FCFA plus une formule Partenaire (installation plus montant par élève payés via les frais de scolarité), avec ancrage inversé sur l'offre Élite.",
        "rationale": "La trésorerie des écoles est la vraie contrainte d'achat sur le terrain : proposer un financement adossé aux frais parents lève le frein principal à l'adoption.",
        "tradeoff": "Grille de prix plus complexe à expliquer (table comparative repliable, trois lignes de tarif) que trois cartes simples, en échange d'une porte d'entrée réaliste pour les établissements sans budget mobilisable."
      }
    ],
    "challenges": [
      {
        "problem": "La recherche de documentation renvoyait des résultats de la mauvaise langue (titres FR sur une recherche depuis /en) car l'API Fumadocs par défaut mélange toutes les pages dans un seul index Orama.",
        "solution": "Bascule vers createI18nSearchAPI avec un index par page tagué de sa locale et un localeMap french/english, plus un filtre de prose significative (longueur minimale et ponctuation terminale) pour éviter d'indexer les libellés et cellules de tableau."
      },
      {
        "problem": "Les liens de recherche pointaient vers des ancres (#section) inexistantes dans le DOM, empêchant le scroll vers la bonne section.",
        "solution": "Ordonnancement explicite des plugins remark (remarkHeading d'abord pour poser les id sur chaque heading, puis remarkStructure qui les réutilise), au lieu de laisser un tableau de plugins écraser silencieusement la liste par défaut de Fumadocs."
      },
      {
        "problem": "Préserver le SEO et les backlinks des anciennes URLs Laravel lors du passage de la vitrine vers Next.js.",
        "solution": "Redirections permanentes 301 des anciennes URLs (/api-reference, /changelog) vers leurs équivalents /docs, alternates canoniques par locale, sitemap et robots générés, et en-têtes de sécurité (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy)."
      },
      {
        "problem": "Le thème sombre cassait certaines sections : texte blanc sur fond blanc codé en dur dans la carte Partenaire et les CTA de comparaison.",
        "solution": "Remplacement des fonds bg-white codés en dur par les tokens de marque (bg-bg-card) pilotés par variables CSS, pour que toute la grille tarifaire s'adapte au mode sombre géré par next-themes via Fumadocs RootProvider."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://klassci.com",
      "github": "https://github.com/James10192/klassci-landing"
    }
  },
  {
    "slug": "esbtp",
    "title": "ESBTP — refonte proposée du site institutionnel, en TanStack Start déployée en SPA statique",
    "oneLiner": "Une refonte spontanée du site de l'École Spéciale du Bâtiment et des Travaux Publics, proposée de ma propre initiative à un établissement déjà client de Klassci, avec un langage visuel \"plan d'ingénieur\" thématisé par filière.",
    "role": "Initiative personnelle — proposition non commandée. Conception, design et développement intégral (architecture SPA, design system, contenus, déploiement) en tant que Head of Development chez African Digit Consulting.",
    "year": "2026",
    "status": "livre",
    "stack": [
      "TanStack Start",
      "React 19",
      "Vite 8",
      "Tailwind CSS v4",
      "Motion",
      "lucide-react",
      "Vercel (SPA statique)"
    ],
    "context": "L'ESBTP (École Spéciale du Bâtiment et des Travaux Publics) est déjà cliente de Klassci, qui administre ses inscriptions et sa scolarité sur ses instances d'Abidjan et de Yamoussoukro. En revanche, sa présence web institutionnelle reposait encore sur un site template daté (esbtp-ci.net), peu lisible, non responsive, au branding faible et aux contenus obsolètes. Personne ne m'a demandé de le refaire : j'ai choisi, de ma propre initiative, de concevoir et déployer une refonte complète pour démontrer à un client existant la valeur d'une vitrine moderne — une proposition commerciale concrète plutôt qu'un argumentaire. La contrainte assumée : reprendre fidèlement l'identité ESBTP (vert et orange, logo, photographies) et livrer un site rapide, crédible et mobile-first, sans aucun backend à maintenir côté école.",
    "architectureSummary": "Le site est une application TanStack Start compilée en SPA purement statique : le plugin émet un shell unique (_shell.html) plus les assets, sans runtime serveur. Sur Vercel, des rewrites renvoient toutes les routes vers ce shell, et tout le rendu se fait côté client — ce qui supprime par construction tout risque de désynchronisation d'hydratation en production. Le contenu (filières, formations, contacts, statistiques, navigation) est centralisé dans un seul module de données typé, ce qui rend chaque page cohérente et maintenable. Les pages couvrent l'accueil, cinq filières du génie civil (routes dynamiques), quatre modes de formation, l'admission (parcours guidé), les coûts, les résultats, l'historique, la pédagogie, les campus et le contact (avec cartes Google Maps embarquées sans clé). Le langage visuel est un système \"blueprint\" : grilles d'ingénieur, lignes de cote, équerres d'angle et annotations monospace, intégrés au contenu et thématisés par spécialité (ossature pour le bâtiment, axe routier pour les travaux publics, plan de blocs pour l'urbanisme, courbes de niveau pour le géomètre, strates pour les mines). Les animations (entrée et parallax du hero, reveals au scroll) sont rendues sûres pour le SSR via un gate de montage et un filet de sécurité, et désactivées sous prefers-reduced-motion.",
    "architectureDiagram": {
      "nodes": [
        { "id": "visitor", "label": "Visiteur (mobile-first, Côte d'Ivoire)", "kind": "client" },
        { "id": "vercel", "label": "Vercel CDN — rewrites vers _shell.html", "kind": "server" },
        { "id": "spa", "label": "SPA TanStack Start (rendu 100% client)", "kind": "client" },
        { "id": "data", "label": "Module de données central (filières, contacts, stats)", "kind": "db" },
        { "id": "maps", "label": "Google Maps Embed (sans clé)", "kind": "external" },
        { "id": "build", "label": "Build Vite (émet _shell.html + assets)", "kind": "job" }
      ],
      "edges": [
        { "from": "visitor", "to": "vercel", "label": "HTTPS" },
        { "from": "vercel", "to": "spa", "label": "sert le shell + assets" },
        { "from": "spa", "to": "data", "label": "contenu importé au build" },
        { "from": "spa", "to": "maps", "label": "iframe par campus" },
        { "from": "build", "to": "vercel", "label": "déploiement statique" }
      ]
    },
    "decisions": [
      {
        "title": "SPA statique plutôt que SSR",
        "choice": "Activer le mode SPA de TanStack Start (shell unique, rewrites Vercel) au lieu d'un rendu serveur Nitro.",
        "rationale": "Le site est une vitrine sans donnée dynamique ni authentification : un rendu 100% client servi depuis le CDN est le plus rapide, le moins cher et le plus simple à exploiter, sans serveur à maintenir pour l'école.",
        "tradeoff": "Pas de HTML pré-rendu par route pour le SEO de premier chargement ; compensé par des métadonnées soignées et un contenu indexable après hydratation, suffisant pour une vitrine."
      },
      {
        "title": "Préserver l'identité ESBTP, ne pas la réinventer",
        "choice": "Extraire les couleurs réelles (vert #006738, orange #F37122), le logo et les photographies du site existant, et composer autour.",
        "rationale": "Sur une proposition non sollicitée, la reconnaissance immédiate de la marque est ce qui rend la démonstration crédible et adoptable par le décideur.",
        "tradeoff": "Moins de liberté créative qu'une refonte de marque complète, au profit d'une continuité visuelle qui rassure."
      },
      {
        "title": "Une géométrie \"plan d'ingénieur\" intégrée au contenu",
        "choice": "Construire un système de motifs (grilles, lignes de cote, équerres, annotations mono) tissé dans les sections et thématisé par filière, plutôt que de simples fonds décoratifs.",
        "rationale": "Le sujet est le génie civil : un vocabulaire visuel de dessin technique donne au site une personnalité cohérente avec le métier, loin du template générique d'origine.",
        "tradeoff": "Plus de composants sur mesure à maintenir qu'une grille de cartes standard."
      },
      {
        "title": "Animations sûres pour l'hydratation",
        "choice": "Gater les animations d'entrée derrière un état de montage et révéler le contenu via IntersectionObserver avec filet de sécurité, contenu visible par défaut.",
        "rationale": "Le serveur de dev (SSR) exposait une race d'hydratation avec les états initiaux de Motion ; en garantissant un contenu visible par défaut, on évite tout écran blanc quel que soit le contexte de rendu.",
        "tradeoff": "Un peu plus de logique côté composant que des animations naïves, en échange d'une robustesse totale."
      }
    ],
    "challenges": [
      {
        "problem": "Le contenu apparaissait par intermittence en blanc sur le serveur de dev (race d'hydratation SSR avec les états initiaux d'animation).",
        "solution": "Diagnostic prouvant que la production (SPA pure, sans SSR) rend correctement, puis durcissement du code (gate de montage, reveals avec filet de sécurité) pour que le contenu soit toujours visible, dev comme prod. Vérifié au navigateur sur le build de production."
      },
      {
        "problem": "Le menu mobile se retrouvait coupé à la hauteur du header une fois la page scrollée.",
        "solution": "Le header sticky applique un backdrop-filter au scroll, ce qui piège les enfants position:fixed dans sa boîte. Le tiroir et l'overlay sont désormais rendus via un portal vers le body pour échapper à ce contexte d'empilement."
      },
      {
        "problem": "Garantir un affichage sans débordement et lisible sur tous les écrans (chaînes longues, pastilles flottantes).",
        "solution": "Refonte responsive vérifiée par captures à 390px : pastilles repositionnées à l'intérieur des images, chaîne BTS→Licence→Master compactée pour tenir sur une ligne, hauteurs et tailles de police adaptatives, zéro overflow horizontal."
      },
      {
        "problem": "Donner des informations institutionnelles exactes plutôt que reprendre des données obsolètes.",
        "solution": "Recherche et vérification des implantations réelles : trois villes (Abidjan avec plusieurs campus — Yopougon, Plateau, Treichville, Riviera —, Yamoussoukro siège, Bouaké), reflétées dans les statistiques, le pied de page et la page contact."
      }
    ],
    "results": [
      { "value": "en ligne", "label": "Proposition livrée et déployée (esbtp.vercel.app)" },
      { "value": "3", "label": "villes d'implantation couvertes" },
      { "value": "5", "label": "filières du génie civil présentées" }
    ],
    "confidential": false,
    "headlineMetric": {
      "label": "Proposition spontanée livrée à un client Klassci",
      "value": "en ligne"
    },
    "links": {
      "live": "https://esbtp.vercel.app",
      "github": "https://github.com/James10192/esbtp-ci"
    }
  },
  {
    "slug": "akwaba",
    "title": "AKWABA, l'assistant conversationnel de la diaspora ivoirienne",
    "oneLiner": "Un assistant IA d'État serviciel pour la diaspora ivoirienne, avec routage multi-modèles visible, détection d'urgence déterministe et relais humain, sur WhatsApp et web.",
    "role": "Conception et développement full stack de bout en bout (architecture IA, backend Convex temps réel, frontend SSR, console de gestion). Head of Development, Africandigit Consulting.",
    "year": "2026",
    "status": "maquette",
    "stack": [
      "TanStack Start",
      "React 19",
      "Vite 8",
      "Nitro",
      "TypeScript",
      "Convex",
      "Better Auth",
      "AI SDK v6",
      "OpenRouter",
      "Tailwind v4",
      "shadcn/ui",
      "WhatsApp Cloud API",
      "Vercel",
      "Vitest"
    ],
    "context": "La diaspora ivoirienne (chiffre de 1,24 million affiché sur la page d'accueil) se heurte à des démarches consulaires opaques : files d'attente, pièces à fournir incertaines, délais flous, et des arnaques fréquentes (foncier, faux visa, Mobile Money). Le projet vise un assistant conversationnel d'État serviciel qui accueille, oriente et rassure, accessible là où la diaspora est déjà, c'est-à-dire WhatsApp et le web. La contrainte du terrain africain francophone est centrale : un seul jeton IA doit suffire pour fonctionner partout, le système doit rester opérationnel même sans aucune clé configurée, et les garde-fous sur les sujets sensibles (nationalité, état civil, urgences) sont une obligation de responsabilité, pas une option.",
    "architectureSummary": "AKWABA est une application TanStack Start (React 19, Vite 8, rendu SSR via Nitro) déployée sur Vercel, adossée à un backend Convex en single-store qui héberge à la fois la donnée métier, l'état conversationnel, la recherche vectorielle, les crons et le journal d'audit append-only. Le coeur est une passerelle IA (gateway) à routage par rôle : une couche déterministe et gratuite classe chaque message (intention, niveau SOS P0 à P3, sensibilité, signaux d'arnaque) sans appel LLM, puis choisit un rôle (standard, sensible, escalade) qui sélectionne le premier modèle disponible parmi une liste ordonnée de candidats (Gemini Flash, GPT mini, Claude Haiku, escalade GPT/Sonnet, secours Kimi). OpenRouter sert de passerelle universelle pour fonctionner avec un seul jeton et assurer le failover. La réponse est ancrée par un RAG hybride : recherche sémantique vectorielle Convex fusionnée avec un retriever lexical hors-ligne, puis reclassement par un petit LLM dans le chemin de chat, l'ensemble étant fail-safe (sans clé ou en cas d'erreur, le grounding lexical reste actif). Le canal WhatsApp passe par un webhook HTTP Convex qui valide la signature HMAC SHA-256 de Meta et traite les messages de façon asynchrone. Une console de gestion (RBAC stocké dans une table Convex) offre triage des conversations, relais humain en temps réel, base de connaissance avec boucle d'apprentissage validée, registre d'usage et de coût IA, et notifications. Des crons gèrent les rappels J-1, un stub d'ingestion de la base de connaissance et le retour automatique à l'IA quand un agent humain est inactif.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "web",
          "label": "Web SSR (TanStack Start / React 19)",
          "kind": "client"
        },
        {
          "id": "wa",
          "label": "WhatsApp Cloud API",
          "kind": "external"
        },
        {
          "id": "chatapi",
          "label": "Server route /api/chat (streaming)",
          "kind": "server"
        },
        {
          "id": "gateway",
          "label": "Gateway IA + intent/SOS/scam déterministe",
          "kind": "service"
        },
        {
          "id": "llm",
          "label": "Modèles LLM via OpenRouter (Gemini/GPT/Claude/Kimi)",
          "kind": "external"
        },
        {
          "id": "convex",
          "label": "Convex single-store (DB, vector, audit, RBAC)",
          "kind": "db"
        },
        {
          "id": "crons",
          "label": "Crons (rappels J-1, ingestion KB, auto-relais)",
          "kind": "job"
        },
        {
          "id": "console",
          "label": "Console de gestion (triage, relais humain)",
          "kind": "client"
        }
      ],
      "edges": [
        {
          "from": "web",
          "to": "chatapi",
          "label": "messages"
        },
        {
          "from": "chatapi",
          "to": "gateway",
          "label": "classification + routage"
        },
        {
          "from": "chatapi",
          "to": "convex",
          "label": "RAG hybride + grounding"
        },
        {
          "from": "gateway",
          "to": "llm",
          "label": "génération + rerank"
        },
        {
          "from": "chatapi",
          "to": "web",
          "label": "stream + trace de routage"
        },
        {
          "from": "wa",
          "to": "convex",
          "label": "webhook signé HMAC"
        },
        {
          "from": "convex",
          "to": "wa",
          "label": "réponse Cloud API"
        },
        {
          "from": "crons",
          "to": "convex",
          "label": "jobs planifiés"
        },
        {
          "from": "console",
          "to": "convex",
          "label": "triage + relais temps réel"
        }
      ]
    },
    "decisions": [
      {
        "title": "Routage IA multi-modèles par rôle, rendu visible dans la conversation",
        "choice": "Une passerelle qui, par rôle (classifier, standard, sensitive, escalation, report), parcourt une liste ordonnée de candidats et retient le premier dont la clé existe, avec Kimi en secours fournisseur et OpenRouter en passerelle universelle.",
        "rationale": "Le bon arbitrage coût/qualité diffère selon l'enjeu : un délai administratif banal ne mérite pas le même modèle qu'une question de nationalité ou une urgence. Faire fonctionner tout le système avec un seul jeton OpenRouter colle à la contrainte terrain. Exposer la trace (intention, rôle, modèle, niveau SOS) rend le raisonnement du gateway auditable plutôt que magique.",
        "tradeoff": "Le routage est piloté par des heuristiques déterministes par mots-clés, rapides et gratuites mais faillibles sur les formulations ambigües ; un raffinage LLM asynchrone corrige a posteriori. La multiplication des candidats par rôle ajoute de la configuration à maintenir quand les identifiants de modèles évoluent."
      },
      {
        "title": "Détection SOS, sensibilité et arnaque déterministe, sans LLM",
        "choice": "Une couche de classification par expressions régulières (SOS P0 à P3, sujets sensibles, cinq familles d'arnaque) qui s'exécute avant tout appel modèle et pilote le routage et les garde-fous.",
        "rationale": "Sur une urgence vitale ou une tentative d'arnaque Mobile Money, on ne peut pas dépendre de la latence, du coût ou de la disponibilité d'un LLM pour déclencher le bon protocole. Déterministe veut dire instantané, gratuit et testable unitairement.",
        "tradeoff": "Les regex ratent les paraphrases et les fautes éloignées des motifs ; risque de faux négatifs sur des détresses formulées autrement. Le choix assume ce compromis en faveur de la fiabilité et de la rapidité sur les cas critiques fréquents."
      },
      {
        "title": "Convex en single-store plutôt qu'une stack à bases multiples",
        "choice": "Toute la donnée (utilisateurs, conversations, messages, mémoire, base de connaissance vectorielle, audit, RBAC, config runtime, usage) vit dans Convex, avec Better Auth tournant lui aussi sur Convex.",
        "rationale": "Un seul backend supprime les webhooks de synchronisation, donne le temps réel natif pour la console et le relais humain, et rapproche le journal d'audit append-only de la donnée métier. Cohérent avec un projet à petite équipe qui doit livrer vite et sûrement.",
        "tradeoff": "Dépendance forte à un fournisseur unique et à ses limites (le plugin admin de Better Auth n'étant pas supporté par le composant, le RBAC a dû être réimplémenté dans une table Convex). L'orchestration durable des flux longs reste à brancher via les composants workflow."
      },
      {
        "title": "RAG hybride entièrement fail-safe",
        "choice": "Recherche sémantique vectorielle Convex fusionnée avec un retriever lexical embarqué, puis reclassement par un petit LLM dans le chemin de chat ; chaque étape dégrade proprement si une clé manque ou si un appel échoue.",
        "rationale": "Sur faible bande passante et budget contraint, le grounding ne doit jamais tomber : sans clé d'embedding, le lexical hors-ligne suffit ; sans rerank, on garde les meilleurs candidats bruts. Le système reste utile dans toutes les configurations.",
        "tradeoff": "Le mode dégradé est moins précis que le sémantique complet, et la fusion à pondération fixe (0,6 vectoriel / 0,4 lexical) plus un seuil de confiance documenté (0,7) restent des réglages empiriques à affiner avec l'usage réel."
      },
      {
        "title": "Relais humain cohabitant avec l'IA dans la même conversation",
        "choice": "Une frontière de handoff où les tours IA et humains coexistent dans la même conversation Convex, distingués par un champ via, avec présence agent, retour automatique à l'IA après inactivité et relais WhatsApp best-effort quand l'usager est hors ligne.",
        "rationale": "La diaspora a besoin d'un humain sur les cas sensibles et les urgences, sans perdre le fil ni rejouer le contexte. Garder un transcript unifié préserve la continuité côté usager comme côté agent.",
        "tradeoff": "Mêler deux canaux dans une conversation impose d'assainir l'historique avant le modèle (messages vides, rôles consécutifs) pour ne pas faire échouer des fournisseurs stricts, ce qui ajoute de la logique défensive non triviale."
      }
    ],
    "challenges": [
      {
        "problem": "Fonctionner du tout-configuré au zéro-clé sans casser l'expérience, contrainte directe du terrain budget et bande passante.",
        "solution": "Chaque fournisseur n'est instancié que si sa clé existe (console ou variable d'environnement), OpenRouter débloque tous les modèles avec un seul jeton, et sans aucune clé l'interface, le routage et la détection SOS restent opérationnels avec une réponse de configuration explicite."
      },
      {
        "problem": "Sécuriser le canal WhatsApp entrant contre les requêtes falsifiées tout en respectant le délai d'acquittement de Meta.",
        "solution": "Le webhook Convex vérifie la signature HMAC SHA-256 du corps brut avec une comparaison à temps constant, accuse réception immédiatement à Meta, puis traite le message en tâche de fond, le retry étant géré côté action."
      },
      {
        "problem": "Capter le coût réel par appel modèle malgré la course entre le streaming et l'arrivée tardive de la métadonnée OpenRouter, pour un registre d'usage fiable.",
        "solution": "Le coût est accumulé pendant le streaming via onStepFinish, puis rattaché à la métadonnée du message de fin plutôt qu'écrit après coup ; tout est fail-safe, une absence de donnée laisse simplement l'estimation côté console et n'altère jamais le tour."
      },
      {
        "problem": "Empêcher qu'une fiche de connaissance apprise d'un échange humain ne pollue les réponses avant validation.",
        "solution": "Un garde-fou de groundabilité exclut du RAG toute fiche d'origine apprise non encore approuvée en console, tout en la gardant visible et éditable ; les fiches officielles ou manuelles sont de confiance d'emblée."
      },
      {
        "problem": "Réimplémenter un RBAC propre alors que le plugin admin de Better Auth n'est pas supporté par le composant Convex.",
        "solution": "Un modèle de rôles (admin, agent, viewer) stocké dans une table Convex dédiée, avec cloisonnement par poste et présence en ligne, inspiré de l'access control Better Auth mais piloté côté Convex."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": {
      "label": "Modèles IA routés à la demande",
      "value": "5"
    },
    "links": {
      "live": "https://akwaba-zeta.vercel.app",
      "github": ""
    }
  },
  {
    "slug": "adc-paie",
    "title": "ADC Paie & RH",
    "oneLiner": "Un SaaS de paie multi-tenant conforme CNPS et DGI, pensé pour les PME ivoiriennes, où chaque bulletin est calculé côté serveur par un moteur de barèmes 2026 testé et tracé dans un journal d'audit chaîné par hash.",
    "role": "Head of Development chez African Digit Consulting. Marcel a conçu l'architecture, écrit le moteur de paie, le backend Convex multi-tenant, le RBAC, le journal d'audit hash-chained et l'intégralité du front TanStack Start (auteur git unique du dépôt).",
    "year": "2026",
    "status": "dev",
    "stack": [
      "TanStack Start v1.168",
      "React 19",
      "Tailwind v4",
      "Convex v1.39",
      "Better Auth v1.6 (plugin organization)",
      "TypeScript",
      "Vite 8",
      "pnpm workspace",
      "Vitest",
      "Playwright",
      "Zod",
      "jsPDF / xlsx / jszip",
      "Vercel"
    ],
    "context": "La paie en Côte d'Ivoire est un champ de mines réglementaire : barèmes ITS, IGR et CN progressifs, cotisations CNPS plafonnées, CMU forfaitaire, prime d'ancienneté de la Convention Collective de 1977, mentions obligatoires de l'article 32.5 du Code du travail. Les PME ivoiriennes gèrent encore tout cela sur Excel, avec un risque permanent de sanctions DGI et de contentieux prud'homal. ADC Paie vise ces PME : plusieurs entreprises clientes sur une seule plateforme (multi-tenant), des paiements de salaires via mobile money (Wave, Orange Money, MTN MoMo) en plus du virement, en monnaie XOF, dans un contexte où la conformité légale doit être démontrable et la donnée personnelle protégée (ARTCI, Loi 2013-450).",
    "architectureSummary": "L'application est un monolithe SSR TanStack Start déployé sur Vercel, adossé à un backend unique Convex qui sert à la fois de base de données temps réel, de stockage de fichiers (PDF de bulletins) et de couche serverless. L'authentification et le multi-tenant reposent sur Better Auth, exécuté directement sur Convex via le composant officiel @convex-dev/better-auth : un seul store, pas de base tierce à synchroniser. Les organisations (chaque PME) sont des entités Better Auth, et chaque table métier porte un organizationId. Toute query ou mutation métier transite par le helper withOrg, qui valide la session, extrait l'organisation active depuis un claim JWT custom et injecte orgId, userId et userRole dans le contexte, fermant la porte aux fuites cross-tenant. Le calcul de paie n'est jamais fait côté client : il est délégué à un package workspace isolé, @adc/payroll-engine, appelé depuis les mutations Convex pour garantir un calcul reproductible et auditable. Chaque mutation sensible (génération, validation, paiement, annulation) écrit une entrée dans un journal d'audit chaîné par hash SHA-256. Le front suit un pattern de données hybride : tant qu'aucune session live n'existe, les écrans affichent un jeu de données mock pour les démonstrations commerciales, et basculent automatiquement sur les données Convex réelles après inscription et onboarding.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "browser",
          "label": "Navigateur PME (RH, comptable, salarié)",
          "kind": "client"
        },
        {
          "id": "start",
          "label": "App TanStack Start SSR (Vercel)",
          "kind": "server"
        },
        {
          "id": "engine",
          "label": "@adc/payroll-engine (barèmes CI 2026, 76 tests)",
          "kind": "service"
        },
        {
          "id": "convex",
          "label": "Convex (DB realtime + storage + serverless)",
          "kind": "db"
        },
        {
          "id": "betterauth",
          "label": "Better Auth (organization, RBAC) sur Convex",
          "kind": "service"
        },
        {
          "id": "audit",
          "label": "Journal d'audit hash-chained SHA-256",
          "kind": "service"
        },
        {
          "id": "momo",
          "label": "Mobile money Wave / Orange / MTN (cible)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "browser",
          "to": "start",
          "label": "HTTP/SSR"
        },
        {
          "from": "start",
          "to": "convex",
          "label": "queries/mutations + useQuery temps réel"
        },
        {
          "from": "start",
          "to": "betterauth",
          "label": "proxy /api/auth/*"
        },
        {
          "from": "betterauth",
          "to": "convex",
          "label": "single store (component)"
        },
        {
          "from": "convex",
          "to": "engine",
          "label": "computePayslip server-side"
        },
        {
          "from": "convex",
          "to": "audit",
          "label": "appendAuditEntry sur mutation sensible"
        },
        {
          "from": "start",
          "to": "momo",
          "label": "paiement salaires (phase ultérieure)"
        }
      ]
    },
    "decisions": [
      {
        "title": "Single store Convex pour l'auth multi-tenant",
        "choice": "Faire tourner Better Auth directement sur Convex via @convex-dev/better-auth plutôt que d'adosser une base d'authentification séparée (Postgres + webhooks de synchronisation).",
        "rationale": "Une seule source de vérité : organisations, membres, sessions et données métier vivent dans la même base, donc pas de drift ni de pipeline de synchronisation à maintenir. Le claim JWT activeOrganizationId est défini via definePayload et consommé par le helper withOrg, ce qui rend le scoping multi-tenant natif.",
        "tradeoff": "On se lie fortement à Convex et au composant Better Auth, dont la liste de plugins supportés est limitée. Certaines fonctionnalités avancées (MFA TOTP) sont repoussées à une phase ultérieure."
      },
      {
        "title": "Moteur de paie isolé en package workspace, exécuté côté serveur",
        "choice": "Extraire toute la logique de calcul dans @adc/payroll-engine, un module pur sans dépendance externe hormis Zod, et l'appeler uniquement depuis les mutations Convex.",
        "rationale": "La conformité légale exige un calcul reproductible et testable : 76 tests Vitest couvrent ITS, IGR, CN, CNPS, ancienneté, heures supplémentaires, prorata et retenues, avec des fixtures de cas ivoiriens réels. Exécuter côté serveur garantit que le bulletin persisté correspond exactement au barème versionné (engineVersion, baremeYear stockés sur chaque payslip).",
        "tradeoff": "Pas de prévisualisation instantanée côté client dans les listings : les écrans s'appuient sur les bulletins déjà persistés. Un calcul live reste exposé uniquement via la calculatrice publique."
      },
      {
        "title": "Journal d'audit chaîné par hash SHA-256",
        "choice": "Chaque mutation sensible écrit une entrée avec sequenceNumber monotone par organisation, prevHash et entryHash, permettant de rejouer et vérifier la chaîne hors ligne.",
        "rationale": "La conformité ARTCI (Loi 2013-450) et le Code du travail imposent une rétention longue et une traçabilité démontrable. Le chaînage rend toute altération détectable a posteriori.",
        "tradeoff": "Le hash inclut un timestamp Date.now() au moment de l'append, légèrement différent du _creationTime Convex ; la vérification tolère donc ce décalage avec un avertissement plutôt qu'un échec strict, dette assumée à durcir dans une phase ultérieure."
      },
      {
        "title": "Pattern de données hybride démo / live",
        "choice": "Chaque écran applicatif lit useQuery avec l'argument 'skip' tant qu'il n'y a pas de session, et retombe sur un jeu de mock ; dès qu'une organisation live a des données, l'écran bascule automatiquement.",
        "rationale": "Permet de présenter un produit complet et crédible en rendez-vous commercial (mode démo) sans toucher à Convex, tout en livrant un produit réel qui s'active après onboarding.",
        "tradeoff": "Risque de fuite de données mock en production si le garde-fou est mal posé ; un test E2E dédié (skill adc-paie-e2e) audite justement toutes les routes app/* pour détecter ce cas."
      },
      {
        "title": "RBAC métier maison plutôt que rôles génériques",
        "choice": "Définir cinq rôles métier (owner, admin, dro, comptable, salarie) et une matrice de plus de trente permissions dans convex/lib/rbac.ts, appliquée via withOrgRoles.",
        "rationale": "Le métier de la paie impose des séparations strictes : un comptable génère et paie les bulletins mais ne gère pas les embauches, un salarié ne voit que ses propres bulletins. La matrice explicite documente et applique ces frontières au niveau de la mutation.",
        "tradeoff": "La vérification se fait par une liste de rôles autorisés passée à chaque mutation plutôt que par permission granulaire dans les handlers, ce qui demande de la discipline pour rester cohérent avec la matrice."
      }
    ],
    "challenges": [
      {
        "problem": "Garantir qu'aucune query ne fuite des données entre PME clientes (cross-tenant) sur une base partagée.",
        "solution": "Centraliser tout accès derrière withOrg / withOrgRoles, qui refuse l'accès sans organisation active et injecte le orgId dans le contexte. Les requêtes utilisent des index composites by_org_* et chaque accès est re-vérifié contre l'orgId du contexte. L'appel direct à ctx.db.query est proscrit par convention."
      },
      {
        "problem": "Encoder fidèlement des barèmes fiscaux et sociaux ivoiriens progressifs et plafonnés, sans erreur de méthode.",
        "solution": "Modéliser chaque barème dans son propre fichier (its-2026, igr-2026, cn-2026, cnps-2026) avec abattement de 15 % pour frais professionnels, quotient familial, plafond CNPS retraite à 45 fois le SMIG (3 375 000 FCFA), et couvrir le tout par 76 tests Vitest sur fixtures réelles. Un audit comptable indépendant est explicitement planifié avant tout client payant."
      },
      {
        "problem": "Persister chaque bulletin de manière reproductible et démontrable légalement, même si les barèmes évoluent.",
        "solution": "Stocker sur chaque payslip le breakdown JSON complet du moteur, plus engineVersion et baremeYear ; la génération est idempotente (regénérer remet le statut à draft) et déclenche une entrée d'audit chaînée."
      },
      {
        "problem": "Migration vers TanStack Start en SSR avec des librairies browser-only (jsPDF, xlsx, file-saver) qui cassent au rendu serveur.",
        "solution": "Isoler les exports PDF/Excel/ZIP dans src/lib/downloads.ts côté client, scoper le ConvexProvider à la branche app/* plutôt que dans __root.tsx, et suivre les conventions Start (getRouter, shellComponent, proxy api/auth.$)."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": {
      "label": "Tests du moteur de paie (barèmes CI 2026)",
      "value": "76 specs Vitest"
    },
    "links": {
      "live": "https://adc-paie.vercel.app"
    }
  },
  {
    "slug": "itm",
    "title": "ITM Construction Métallique — Site vitrine premium pour la génération de leads B2C/B2B",
    "oneLiner": "Un site vitrine haut de gamme, statique et rapide, pensé pour convertir des prospects fortunés en demandes de devis sur le marché de la construction métallique à Abidjan.",
    "role": "Conception et développement complet (architecture front, design system, intégration de contenu, déploiement Vercel). Marcel Djedje-li, lead développeur.",
    "year": "2025",
    "status": "prod",
    "stack": [
      "Next.js 15 (App Router, RSC)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 3.4",
      "shadcn/ui + Radix UI",
      "Framer Motion",
      "Zod 3",
      "React Hook Form",
      "Sanity (headless CMS, câblé, optionnel)",
      "Resend (email, dépendance présente, non câblé)",
      "Cloudflare Turnstile (CAPTCHA, dépendance présente, non câblé)",
      "Vercel",
      "Vitest (configuré)"
    ],
    "context": "ITM Construction Métallique, entreprise ivoirienne spécialisée dans les maisons métalliques déplaçables (IBAK HOME), portes, palissades et mobilier sur mesure, n'avait pas de vitrine numérique pour capter une clientèle haut de gamme (particuliers fortunés, promoteurs, investisseurs) à Abidjan. Le problème métier est la génération de leads qualifiés pour des projets à fort ticket (les budgets du formulaire vont de moins de 19M à plus de 100M FCFA). La contrainte du terrain est double : un marché francophone exigeant en présentation premium, et un accès internet souvent contraint en bande passante en Côte d'Ivoire, qui impose un site très léger, rapide et bien référencé localement.",
    "architectureSummary": "Le système réellement observé est une application Next.js 15 (App Router, React Server Components) déployée sur Vercel. Le contenu des pages (réalisations, expertises, bénéfices IBAK HOME, audience cible, navigation) est servi depuis des fichiers de constantes TypeScript typés dans src/lib/constants, ce qui rend le site quasi entièrement statique et indépendant d'un backend à l'exécution ; la galerie de réalisations est ainsi alimentée par src/lib/constants/realisations.ts, pas par un CMS au runtime. Une intégration Sanity (headless CMS) est câblée avec un client et des requêtes GROQ (getSanityProjects, getFeaturedProjects, getSiteSettings, FAQ, pages), prévue pour piloter le contenu, mais les variables d'environnement Sanity sont optionnelles et le contenu en production repose actuellement sur les constantes locales. Les pages publiques (Accueil, IBAK HOME, Réalisations, À propos, Contact) sont organisées par dossiers de routes avec leurs composants de section colocalisés. Le formulaire de contact est présent côté client (React Hook Form + Zod) mais son envoi est encore simulé (setTimeout, commentaire TODO d'intégration Resend) : il n'existe pas de route API /api/contact dans le code. La validation des variables d'environnement est centralisée et type-safe via Zod (src/env.ts), les en-têtes de sécurité sont posés dans next.config.js, et les images distantes sont restreintes au CDN Sanity avec sortie AVIF/WebP.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "visitor",
          "label": "Visiteur (mobile / desktop, Abidjan)",
          "kind": "client"
        },
        {
          "id": "next",
          "label": "Next.js 15 App Router (RSC)",
          "kind": "server"
        },
        {
          "id": "vercel",
          "label": "Vercel (hosting + CDN + Analytics)",
          "kind": "external"
        },
        {
          "id": "constants",
          "label": "Contenu statique (src/lib/constants TS)",
          "kind": "db"
        },
        {
          "id": "sanity",
          "label": "Sanity headless CMS (câblé, optionnel)",
          "kind": "external"
        },
        {
          "id": "resend",
          "label": "Resend email (dépendance présente, non câblé)",
          "kind": "external"
        },
        {
          "id": "turnstile",
          "label": "Cloudflare Turnstile CAPTCHA (dépendance présente, non câblé)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "visitor",
          "to": "vercel",
          "label": "HTTPS"
        },
        {
          "from": "vercel",
          "to": "next",
          "label": "sert le rendu"
        },
        {
          "from": "next",
          "to": "constants",
          "label": "importe le contenu"
        },
        {
          "from": "next",
          "to": "sanity",
          "label": "GROQ (prévu)"
        },
        {
          "from": "next",
          "to": "resend",
          "label": "envoi devis (TODO)"
        },
        {
          "from": "next",
          "to": "turnstile",
          "label": "anti-spam (prévu)"
        }
      ]
    },
    "decisions": [
      {
        "title": "Contenu en constantes TypeScript plutôt que CMS branché dès le départ",
        "choice": "Servir le contenu des pages depuis des fichiers de constantes typés (src/lib/constants), tout en pré-câblant Sanity comme évolution.",
        "rationale": "Permet de livrer un site rapide, déployable immédiatement et sans dépendance externe à l'exécution, idéal pour un contexte de bande passante contrainte et un budget free-tier. Le contenu reste fortement typé et versionné dans Git.",
        "tradeoff": "Le client ne peut pas éditer la galerie en autonomie tant que Sanity n'est pas activé ; toute mise à jour de contenu passe par un déploiement développeur."
      },
      {
        "title": "Architecture statique sur Next.js App Router + Vercel free tier",
        "choice": "Pages publiques en RSC, ISR (revalidate 60s sur la page réalisations), images optimisées AVIF/WebP, hébergement Vercel.",
        "rationale": "Vise de bons Core Web Vitals et un SEO local francophone, ce qui compte pour convertir des prospects à fort ticket et bien ranker sur des requêtes type construction métallique Abidjan, le tout à coût nul.",
        "tradeoff": "Le free tier impose des quotas (bande passante, emails) ; les fonctionnalités dynamiques (envoi de devis, CAPTCHA) doivent rester frugales et ne sont pas encore activées."
      },
      {
        "title": "Validation Zod partagée et env type-safe",
        "choice": "Schémas Zod pour le formulaire et un schéma d'environnement validé au boot (src/env.ts) avec messages d'erreur explicites.",
        "rationale": "Évite les pannes silencieuses dues à une config manquante et garantit un contrat de données cohérent côté client comme côté futur backend.",
        "tradeoff": "Deux schémas de formulaire coexistent (un dans src/lib/validation avec budget et token Turnstile, un inline divergent dans le composant), ce qui crée une dette de cohérence à consolider."
      },
      {
        "title": "Hero vidéo avec respect de prefers-reduced-motion",
        "choice": "Carousel de trois vidéos de fond auto-cyclées, désactivé si l'utilisateur a activé la réduction de mouvement, et preload metadata seulement.",
        "rationale": "Apporte l'effet premium attendu par la cible haut de gamme tout en respectant l'accessibilité et en limitant le poids initial.",
        "tradeoff": "Trois fichiers vidéo restent lourds à charger sur réseau lent ; un fallback image plus agressif serait préférable en 3G."
      }
    ],
    "challenges": [
      {
        "problem": "Présenter une marque premium crédible auprès de particuliers fortunés et de promoteurs, sans budget infrastructure.",
        "solution": "Design system monochrome (charcoal #1A1A1A à #3F3F3F + accent cuivre #B87333) avec typographies Google Fonts en font-display swap (Orbitron, Changa One, Amaranth, Raleway), composants shadcn/ui accessibles, animations Framer Motion mesurées et galerie de réalisations basée sur de vraies photos ITM."
      },
      {
        "problem": "Garantir des performances et un SEO local solides en contexte de faible bande passante.",
        "solution": "Rendu statique RSC, ISR sur la page réalisations, optimisation d'images AVIF/WebP via next/image, métadonnées Open Graph et locale fr_CI, robots.txt et en-têtes de sécurité dans next.config.js."
      },
      {
        "problem": "Préparer la captation de leads à fort ticket tout en restant frugal.",
        "solution": "Formulaire de devis structuré (type de projet, fourchette de budget en FCFA, message) validé par Zod et React Hook Form, prévu pour brancher Resend et Cloudflare Turnstile dès l'activation des clés, sans refonte. L'envoi est encore simulé en attendant la route API."
      },
      {
        "problem": "Permettre une reprise et une maintenance propres par une équipe.",
        "solution": "Documentation technique riche (CLAUDE.md, BEST_PRACTICES.md, README modulaires), conventions de commits, hooks Husky + lint-staged, ESLint/Prettier/TypeScript stricts et Vitest configuré (suite de tests à écrire)."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://itm-website-henna.vercel.app",
      "github": "https://github.com/James10192/ITM-website"
    }
  },
  {
    "slug": "iroko",
    "title": "iroko : la configuration Claude Code distribuée comme un produit",
    "oneLiner": "Un installeur CLI qui transforme des mois de discipline d'ingénierie en 25 composants Claude Code réutilisables, versionnés et publiés sur npm.",
    "role": "Auteur unique : conception du produit, architecture du CLI TypeScript, rédaction des règles/skills/agents, pipeline de release et publication npm/plugin Claude Code.",
    "year": "2026",
    "status": "prod",
    "stack": [
      "TypeScript",
      "Node.js >=20",
      "Commander",
      "@clack/prompts",
      "picocolors",
      "tsup",
      "pnpm",
      "GitHub Actions",
      "npm registry",
      "Claude Code plugin marketplace"
    ],
    "context": "Marcel mène le développement de plusieurs SaaS en production depuis Abidjan (KLASSCI, MailPulse, E-pagne) en s'appuyant quotidiennement sur Claude Code. Le problème : sa configuration d'agent (règles de qualité, skills de workflow, sous-agents, hooks) vivait dans son ~/.claude personnel, non reproductible, non versionnée, impossible à partager ou à réinstaller proprement sur une nouvelle machine. iroko packe cette configuration en un produit distribuable : un seul npx @james10192/iroko init réinstalle l'environnement complet. La contrainte de terrain ici n'est pas un utilisateur final africain mais celle d'un lead dev solo qui doit industrialiser sa propre rigueur pour la rendre durable, d'où le nom iroko, le bois dur ouest-africain qui sert de fondation.",
    "architectureSummary": "iroko est un CLI TypeScript compilé en ESM via tsup et publié sur npm sous @james10192/iroko. Le binaire iroko (dist/cli.js) s'appuie sur Commander pour quatre sous-commandes (init, list, update, about) et sur @clack/prompts pour l'interface interactive. Un manifeste central (src/lib/manifest.ts) déclare les 25 composants (5 rules, 15 skills, 3 agents, 2 hooks) avec leur type et chemin source. L'installeur copie ces fichiers depuis le package vers ~/.claude/{rules,skills,agents,hooks}, écrit un template settings.json sans jamais l'écraser, et persiste l'état dans ~/.claude/.iroko.json. Un update-checker interroge le registre npm au plus une fois par 24 h. La commande update clone le dépôt GitHub en shallow (git clone --depth 1) et réinstalle les composants déjà sélectionnés. La distribution est double : package npm et plugin via le manifeste .claude-plugin/marketplace.json (strict: false). La gouvernance des versions est assurée par un script unique (sync-version-from-changelog.mjs) qui fait du CHANGELOG.md la seule source de vérité, vérifié par le workflow GitHub Actions release-guard avant tout merge sur master.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "dev",
          "label": "Développeur (terminal)",
          "kind": "client"
        },
        {
          "id": "cli",
          "label": "iroko CLI (Commander + clack)",
          "kind": "server"
        },
        {
          "id": "manifest",
          "label": "Manifeste 25 composants + installeur",
          "kind": "service"
        },
        {
          "id": "claudedir",
          "label": "~/.claude (rules/skills/agents/hooks)",
          "kind": "db"
        },
        {
          "id": "npm",
          "label": "Registre npm",
          "kind": "external"
        },
        {
          "id": "github",
          "label": "Dépôt GitHub (source + plugin)",
          "kind": "external"
        },
        {
          "id": "ci",
          "label": "release-guard (GitHub Actions)",
          "kind": "job"
        }
      ],
      "edges": [
        {
          "from": "dev",
          "to": "cli",
          "label": "npx iroko init / list / update"
        },
        {
          "from": "cli",
          "to": "manifest",
          "label": "résout les composants"
        },
        {
          "from": "manifest",
          "to": "claudedir",
          "label": "copie fichiers, écrit .iroko.json"
        },
        {
          "from": "cli",
          "to": "npm",
          "label": "check version (throttle 24h)"
        },
        {
          "from": "cli",
          "to": "github",
          "label": "git clone --depth 1 (update)"
        },
        {
          "from": "ci",
          "to": "github",
          "label": "bloque merge si versions divergent du CHANGELOG"
        },
        {
          "from": "github",
          "to": "npm",
          "label": "publish via /npm-publish"
        }
      ]
    },
    "decisions": [
      {
        "title": "CHANGELOG.md comme source unique de vérité des versions",
        "choice": "Un script Node (sync-version-from-changelog.mjs) lit le premier heading versionné (## [X.Y.Z], en sautant Unreleased) du CHANGELOG et propage la version vers package.json, src/lib/banner.ts et les deux champs de marketplace.json (metadata.version et plugins[0].version). Un mode --check fait échouer la CI en cas de divergence.",
        "rationale": "Quatre sources de version se désynchronisent inévitablement à la main. Centraliser sur le CHANGELOG force aussi à documenter chaque release.",
        "tradeoff": "On gagne une cohérence garantie et un historique propre, on sacrifie la liberté de bumper une version à la volée sans passer par le CHANGELOG et le script."
      },
      {
        "title": "Distribution double : package npm + plugin Claude Code",
        "choice": "Le même dépôt expose un binaire npm (champ bin) et un manifeste .claude-plugin/marketplace.json (strict: false) pointant sur les mêmes dossiers skills/agents.",
        "rationale": "Couvrir deux modes d'installation (npx pour tout le monde, /plugin install pour l'écosystème Claude Code natif) sans dupliquer le contenu.",
        "tradeoff": "Une seule arborescence à maintenir, mais deux contrats de format à respecter simultanément à chaque évolution."
      },
      {
        "title": "Manifeste déclaratif plutôt que scan du système de fichiers",
        "choice": "Les 25 composants sont listés explicitement dans src/lib/manifest.ts (type, description, chemin, hint optionnel) au lieu d'être découverts dynamiquement.",
        "rationale": "Contrôle exact de ce qui est proposé, de l'ordre, des descriptions et du marquage personnel (ex. marcel-global-preferences à désélectionner).",
        "tradeoff": "Ajouter un composant impose une entrée manuelle dans le manifeste, mais évite d'embarquer des fichiers parasites et garde l'UX d'installation prévisible."
      },
      {
        "title": "Ne jamais écraser le settings.json existant",
        "choice": "installSettingsTemplate n'écrit le template (avec substitution {{HOME}}) que si aucun settings.json n'existe déjà.",
        "rationale": "Un utilisateur a souvent déjà une configuration Claude Code ; l'écraser détruirait ses permissions et hooks.",
        "tradeoff": "Installation non destructive et sûre, au prix d'une non-application automatique des nouveaux réglages sur les installations déjà configurées."
      },
      {
        "title": "Vérification de mise à jour throttlée à 24 h",
        "choice": "checkForUpdates interroge npm au démarrage mais ne le refait qu'une fois toutes les 24 h, l'horodatage étant stocké dans .iroko.json.",
        "rationale": "Une vérification réseau à chaque invocation ajoutait une latence systématique (corrigée en 2.0.1).",
        "tradeoff": "Le CLI reste rapide et utilisable hors ligne, en contrepartie d'une notification de nouvelle version qui peut arriver avec jusqu'à un jour de retard."
      }
    ],
    "challenges": [
      {
        "problem": "Résoudre la racine des fichiers source aussi bien en dev (src/lib) qu'une fois publié sur npm (dist), où l'arborescence diffère.",
        "solution": "getConfigsRoot teste une liste ordonnée de chemins candidats (configs depuis dist, depuis la racine repo, fallback racine package) et mémorise le premier existant ; installComponent ajoute un second fallback direct vers la racine du dépôt."
      },
      {
        "problem": "Empêcher la fuite de secrets et de chemins absolus Windows personnels dans le bundle publié, sachant que les règles contiennent des références à l'infra perso.",
        "solution": "Le job skills-drift-audit du workflow release-guard scanne rules/skills/agents/hooks contre des patterns de clés (clé sk- générique, Anthropic sk-ant-, GitHub PAT ghp_, AWS AKIA, Google AIza, token openclaw local) et le chemin C:/Users/yabla, et fait échouer le build si l'un est détecté."
      },
      {
        "problem": "Garantir qu'aucune modification de composant ne soit publiée sans trace ni cohérence de version.",
        "solution": "release-guard refuse tout PR qui touche rules/skills/agents/hooks/src/templates/song sans mise à jour du CHANGELOG, vérifie l'alignement des versions via le script en mode --check, et compile le CLI pour intercepter les erreurs avant publication."
      },
      {
        "problem": "Rendre le CLI lisible sur des terminaux hétérogènes (Windows Terminal, cmd.exe legacy, Linux, macOS) sans dépendre de couleurs ou caractères non supportés.",
        "solution": "Le module theme.ts détecte COLORTERM pour activer l'ANSI 24 bits avec fallback ANSI 16, détecte UTF-8 (LANG, LC_ALL, WT_SESSION, plateforme) pour basculer entre Côte d'Ivoire et Cote d'Ivoire, et prévoit des marques ASCII de repli (#, -, ^, x) quand TERM=dumb."
      }
    ],
    "results": [
      {
        "value": "2.2.0",
        "label": "Version publiée sur npm (@james10192/iroko)"
      },
      {
        "value": "8",
        "label": "Releases taggées (v1.1.0 à v2.2.0)"
      },
      {
        "value": "25",
        "label": "Composants distribués (5 rules, 15 skills, 3 agents, 2 hooks)"
      }
    ],
    "confidential": false,
    "headlineMetric": {
      "label": "Composants Claude Code packagés et versionnés",
      "value": "25"
    },
    "links": {
      "live": "https://iroko-site.vercel.app",
      "github": "https://github.com/James10192/iroko"
    }
  },
  {
    "slug": "fejeci",
    "title": "FEJECI — Site institutionnel et SaaS membres de la Fédération des Jeunes Entrepreneurs de Côte d'Ivoire",
    "oneLiner": "Une seule plateforme qui fait cohabiter un site institutionnel public optimisé SEO et un SaaS membres temps réel, avec un back-office où l'admin valide chaque adhésion et crée le compte lui-même.",
    "role": "Conception et développement full stack de bout en bout : modèle de données Convex, authentification Better Auth, séparation stricte des rôles, workflow d'adhésion, espace membre temps réel, back-office admin, design system FEJECI et déploiement Vercel.",
    "year": "2026",
    "status": "prod",
    "stack": [
      "TanStack Start v1.121",
      "React 19",
      "Vite 7",
      "Nitro (preset Vercel)",
      "Convex",
      "Better Auth (@convex-dev/better-auth)",
      "TypeScript strict",
      "Tailwind v4",
      "Radix UI",
      "Zod",
      "Vitest",
      "Vercel"
    ],
    "context": "La FEJECI est une fédération nationale qui regroupe entrepreneurs, aspirants et associations à travers le pays. Elle avait besoin d'une vitrine institutionnelle crédible (contenu éditorial, programmes, actualités, partenaires) ET d'un outil interne pour gérer ses adhérents, leurs cotisations, leurs documents et la communication entre délégations. Contrainte de terrain ivoirienne : peu d'adhérents possèdent une carte bancaire, les paiements se font en espèces, par virement ou via mobile money (Wave, Orange Money, MTN MoMo), et l'inscription ne peut pas être un simple signup en ligne ouvert. Le métier exige qu'un administrateur de la fédération valide chaque demande et crée le compte, puis communique les accès par SMS, WhatsApp ou appel. Les montants sont gérés en XOF.",
    "architectureSummary": "L'application est mono-domaine mais à deux couches sur la même base Convex. Le frontend est une application TanStack Start (React 19, Vite 7) rendue côté serveur via Nitro avec le preset Vercel : les pages institutionnelles sont prerendered pour le SEO (configuration explicite des routes dans vite.config.ts), tandis que l'espace membre et le back-office consomment Convex en temps réel via useQuery. Le backend Convex sert de single store : une seule base héberge à la fois les tables métier (users, delegations, payments, documents, offers, forum, messagerie channels/dmThreads, audienceRequests, partners, partnerDocuments, notifications, auditLogs, membershipRequests) et le composant Better Auth, sans webhook de synchronisation entre deux systèmes. L'authentification passe par @convex-dev/better-auth : un trigger onCreate miroite chaque utilisateur Better Auth dans la table users de l'app, en y attachant le rôle (super_admin, admin, member), le statut (pending, active, suspended, archived) et les infos entreprise. Les fichiers (RCCM, DFE, CV) sont stockés dans Convex File Storage avec contrôle d'accès serveur (un membre ne lit que ses documents, un admin lit ceux de tous), avec une taille max de 10 Mo. Le routage de fichiers TanStack expose un proxy /api/auth/* qui relaie vers le handler Better Auth monté dans Convex http. Les mutations admin sensibles écrivent dans auditLogs via un helper recordAudit. La logique pure (calcul du statut de cotisation, visibilité des offres, politique documents, génération de mot de passe temporaire, clé de thread DM) est extraite dans convex/lib et couverte par 131 tests Vitest (sur 13 fichiers).",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "public",
          "label": "Site public prerendered (SEO)",
          "kind": "client"
        },
        {
          "id": "portal",
          "label": "Espace membre + back-office admin (React 19)",
          "kind": "client"
        },
        {
          "id": "ssr",
          "label": "TanStack Start + Nitro (Vercel)",
          "kind": "server"
        },
        {
          "id": "convex",
          "label": "Convex (single store + functions temps réel)",
          "kind": "db"
        },
        {
          "id": "betterauth",
          "label": "Better Auth (composant Convex)",
          "kind": "service"
        },
        {
          "id": "storage",
          "label": "Convex File Storage (documents, URL signée)",
          "kind": "service"
        },
        {
          "id": "audit",
          "label": "Audit log (recordAudit)",
          "kind": "job"
        },
        {
          "id": "momo",
          "label": "Mobile money / espèces (Wave, OM, MTN, virement) — saisi manuellement",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "public",
          "to": "ssr",
          "label": "HTML prerendered"
        },
        {
          "from": "portal",
          "to": "ssr",
          "label": "SSR + hydration"
        },
        {
          "from": "ssr",
          "to": "convex",
          "label": "useQuery / mutation temps réel"
        },
        {
          "from": "portal",
          "to": "betterauth",
          "label": "/api/auth/* (proxy)"
        },
        {
          "from": "betterauth",
          "to": "convex",
          "label": "trigger onCreate vers table users"
        },
        {
          "from": "convex",
          "to": "storage",
          "label": "upload / getUrl contrôlés"
        },
        {
          "from": "convex",
          "to": "audit",
          "label": "mutations critiques loggées"
        },
        {
          "from": "momo",
          "to": "convex",
          "label": "paiement enregistré par l'admin"
        }
      ]
    },
    "decisions": [
      {
        "title": "Single store Convex plutôt que Better Auth + base séparée",
        "choice": "Faire tourner Better Auth ON Convex via le composant NPM @convex-dev/better-auth, avec un trigger onCreate qui miroite l'utilisateur dans une table users métier.",
        "rationale": "Évite une seconde base (Postgres) et tout le webhook de synchronisation entre l'auth et le métier. Une seule source de vérité, du temps réel natif, moins de surface d'erreur pour une équipe réduite.",
        "tradeoff": "On reste dans la liste des plugins supportés par le composant NPM (pas de plugin organization/admin). La gestion des rôles et statuts a donc été portée dans la table users de l'app au lieu d'un plugin auth, ce qui demande des guards serveur explicites (requireRole, requireSelfOrAdmin)."
      },
      {
        "title": "Pas de signup public : l'admin valide et crée le compte",
        "choice": "Le visiteur soumet une demande via /adhesion (stockée en membershipRequests pending). Un admin l'examine, puis l'action approveAndCreateAccount génère un mot de passe temporaire, crée le user Better Auth, propage les infos entreprise, notifie et logge l'action.",
        "rationale": "Correspond au fonctionnement réel d'une fédération : on ne devient pas membre en un clic, l'adhésion est validée par la structure. L'admin communique ensuite les accès par le canal qu'il maîtrise (SMS, WhatsApp, appel), adapté au terrain.",
        "tradeoff": "Charge opérationnelle côté admin (validation manuelle, communication des accès hors plateforme tant que les emails transactionnels ne sont pas branchés). En contrepartie, zéro compte fantôme et un contrôle total sur qui entre."
      },
      {
        "title": "Séparation stricte admin / membre dès le guard",
        "choice": "Un admin n'a jamais accès à /espace-membre et un membre n'a jamais accès à /admin. L'AuthGuard redirige automatiquement selon le rôle, et les queries Convex re-vérifient les permissions côté serveur.",
        "rationale": "Les deux espaces ont des intentions opposées : le membre gère ses données, l'admin gère celles de tous. Mélanger les deux crée des fuites de données et une UX confuse. La double barrière (guard client + guard serveur) évite de faire confiance au seul frontend.",
        "tradeoff": "Duplication apparente de certaines vues (un paiement existe côté membre en lecture et côté admin en gestion), mais c'est volontaire : chaque espace a sa propre logique d'accès et son propre périmètre."
      },
      {
        "title": "Paiements enregistrés manuellement, méthodes mobile money first-class",
        "choice": "Le modèle payments traite cash, virement, Wave, Orange Money, MTN MoMo et mobile money autre comme des méthodes de premier niveau. L'admin enregistre le versement reçu, le calcul du statut de cotisation (à jour / partiel / impayé) est fait par un helper pur testé.",
        "rationale": "Sur le terrain ivoirien, la carte bancaire est rare. Modéliser le mobile money et l'espèces comme des citoyens de première classe, plutôt qu'un paiement en ligne par carte, colle à la réalité des adhérents.",
        "tradeoff": "Pas de réconciliation automatique ni de webhook de paiement pour l'instant. La saisie reste un acte humain, fiable mais non automatisé."
      },
      {
        "title": "Logique métier en helpers purs + couverture Vitest",
        "choice": "Extraire computeCotisationStatus, isOfferVisibleTo, la politique documents, la génération de mot de passe temporaire et la clé de thread DM dans convex/lib, et les couvrir par 131 tests unitaires.",
        "rationale": "Ces fonctions encodent des règles métier sensibles (qui voit quelle offre, qui est à jour de cotisation, accès aux documents). Les tester en isolation, hors infrastructure, donne une garantie rapide et reproductible sans dépendre du déploiement Convex.",
        "tradeoff": "Discipline d'architecture à tenir (séparer le pur de l'effet de bord, nommer les fichiers en camelCase car la plateforme Convex interdit les tirets). Le coût d'écriture des tests est réel mais amorti par la confiance lors des refontes."
      }
    ],
    "challenges": [
      {
        "problem": "Faire cohabiter un site public optimisé SEO et un SaaS temps réel sur le même domaine et la même base, sans que les providers d'auth lourds cassent le rendu des pages publiques.",
        "solution": "Architecture en deux couches : pages institutionnelles prerendered via Nitro (routes déclarées dans vite.config.ts), et providers Convex/Better Auth scopés uniquement à l'espace membre et au back-office. Le proxy /api/auth/* relaie vers le handler Better Auth monté dans Convex http, l'app racine n'embarque pas les providers d'auth sur les pages publiques."
      },
      {
        "problem": "Créer un compte authentifié à partir d'un workflow d'approbation côté serveur, sans signup public ni envoi d'email automatique.",
        "solution": "L'action Convex approveAndCreateAccount (en 'use node' pour utiliser fetch) appelle l'endpoint /api/auth/sign-up/email de Better Auth avec un mot de passe temporaire généré, puis finalise l'approbation en mutation interne (statut active, propagation des infos entreprise, notification, audit log). L'admin récupère l'email et le mot de passe temporaire à transmettre par le canal de son choix."
      },
      {
        "problem": "Garantir qu'un admin ne voie jamais l'espace membre et inversement, sans se reposer sur la seule redirection frontend.",
        "solution": "Double barrière : l'AuthGuard côté client redirige selon le rôle et l'état de session, et chaque query/mutation Convex re-vérifie via requireRole / requireSelfOrAdmin / requireActiveUser. Les documents ne sont servis (URL signée) qu'au propriétaire ou à un admin, vérifié côté serveur."
      },
      {
        "problem": "Déployer un backend Convex sur Vercel sans exposer de clé de déploiement dans le pipeline et en gérant la contrainte de nommage de fichiers de la plateforme.",
        "solution": "Les types Convex _generated sont committés pour que le build Vercel réussisse sans CONVEX_DEPLOY_KEY, et tous les fichiers Convex sont nommés en camelCase (les tirets sont interdits). Un script post-build complète la sortie Nitro pour le runtime Vercel."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": {
      "label": "Tests unitaires sur la logique métier (Vitest)",
      "value": "131"
    },
    "links": {
      "live": "https://fejeci-website.vercel.app",
      "github": ""
    }
  },
  {
    "slug": "adc-website",
    "title": "African Digit Consulting — Site vitrine bilingue et instrumenté",
    "oneLiner": "Le site institutionnel d'African Digit Consulting, pensé comme un produit : bilingue FR/EN, optimisé pour la bande passante africaine et instrumenté de bout en bout pour mesurer chaque interaction.",
    "role": "Conception et développement full stack du site (architecture Next.js, i18n, système de blog, instrumentation analytics, optimisation performance et SEO, déploiement Vercel). Head of Development chez ADC.",
    "year": "2026",
    "status": "prod",
    "stack": [
      "Next.js 14 (App Router)",
      "TypeScript",
      "next-intl",
      "Tailwind CSS",
      "Framer Motion (LazyMotion)",
      "PostHog",
      "Vercel Analytics",
      "Vercel Speed Insights",
      "Web3Forms",
      "next/og",
      "Vercel"
    ],
    "context": "African Digit Consulting est une agence digitale basée en Côte d'Ivoire qui doit présenter à la fois son travail de branding et ses produits tech (KLASSCI, WOURI, AKWABA) à une audience locale francophone et à des partenaires internationaux anglophones. Le site devait donc être nativement bilingue FR/EN, rester crédible côté SEO sur deux langues, et surtout rester rapide depuis des connexions mobiles à faible bande passante, où une page lourde se traduit directement par un visiteur perdu. Au-delà de la vitrine, l'enjeu était de transformer le site en outil de mesure : savoir quelles études de cas retiennent l'attention et d'où viennent les demandes de contact.",
    "architectureSummary": "Le site est une application Next.js 14 (App Router), pré-générée statiquement par locale via generateStaticParams. Le routage internationalisé repose sur next-intl : un middleware résout la langue (FR par défaut sans préfixe, EN préfixé en `as-needed`) et un segment dynamique `[locale]` décline chaque page. Le contenu éditorial (pages, blog, études de cas) est colocalisé dans le code sous forme de modules TypeScript typés, avec une variante FR et une variante EN par page (`page-content.tsx` / `page-content-en.tsx`), ce qui évite tout CMS externe et garde le contenu versionné dans Git. Le blog dérive ses métadonnées, son sitemap et ses images Open Graph d'une source unique (`lib/blog.ts`) : les images OG sont générées à la volée par `next/og` (ImageResponse) avec des polices Google (Fraunces, Poppins) chargées dynamiquement. Le formulaire de contact poste directement vers l'API Web3Forms avec une clé d'accès, sans backend propre (liens tel:/mailto: et lien Google Maps Directions en complément). Toute l'interaction utilisateur est instrumentée via une couche analytics maison fortement typée (union discriminée d'événements) qui alimente PostHog, en parallèle de Vercel Analytics et Speed Insights. Le déploiement est sur Vercel, avec des en-têtes de cache immuables d'un an sur les assets statiques et images, et des en-têtes de sécurité (X-Content-Type-Options, X-Frame-Options, Referrer-Policy).",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "visitor",
          "label": "Visiteur (mobile FR / desktop EN)",
          "kind": "client"
        },
        {
          "id": "middleware",
          "label": "Middleware next-intl (résolution locale)",
          "kind": "server"
        },
        {
          "id": "app",
          "label": "Next.js 14 App Router ([locale])",
          "kind": "server"
        },
        {
          "id": "content",
          "label": "Contenu typé FR/EN + lib/blog.ts",
          "kind": "db"
        },
        {
          "id": "og",
          "label": "next/og — OG images à la volée",
          "kind": "job"
        },
        {
          "id": "posthog",
          "label": "PostHog (events typés)",
          "kind": "external"
        },
        {
          "id": "vercelanalytics",
          "label": "Vercel Analytics + Speed Insights",
          "kind": "external"
        },
        {
          "id": "web3forms",
          "label": "Web3Forms (soumission contact)",
          "kind": "external"
        },
        {
          "id": "vercel",
          "label": "Vercel (hébergement + CDN)",
          "kind": "service"
        }
      ],
      "edges": [
        {
          "from": "visitor",
          "to": "middleware",
          "label": "requête HTTP"
        },
        {
          "from": "middleware",
          "to": "app",
          "label": "locale résolue"
        },
        {
          "from": "app",
          "to": "content",
          "label": "lecture build-time"
        },
        {
          "from": "app",
          "to": "og",
          "label": "génère image partage"
        },
        {
          "from": "app",
          "to": "vercel",
          "label": "servi via CDN"
        },
        {
          "from": "visitor",
          "to": "posthog",
          "label": "événements (clic, vue, partage)"
        },
        {
          "from": "visitor",
          "to": "vercelanalytics",
          "label": "web vitals"
        },
        {
          "from": "visitor",
          "to": "web3forms",
          "label": "soumission formulaire"
        }
      ]
    },
    "decisions": [
      {
        "title": "Contenu colocalisé en TypeScript plutôt qu'un CMS",
        "choice": "Chaque page existe en deux modules TypeScript (`page-content.tsx` et `page-content-en.tsx`), avec une source unique typée pour le blog (`lib/blog.ts`).",
        "rationale": "Pour un site d'agence à faible fréquence de mise à jour, un CMS headless ajoute une dépendance externe, un coût et une latence d'appel API inutiles. Garder le contenu dans Git le rend versionné, typé de bout en bout et déployable sans infrastructure supplémentaire.",
        "tradeoff": "On gagne la simplicité, la sécurité de typage et zéro coût récurrent ; on sacrifie l'édition par un non-développeur. Toute mise à jour de contenu passe par un commit."
      },
      {
        "title": "Internationalisation native FR/EN avec préfixe `as-needed`",
        "choice": "next-intl en App Router, FR comme locale par défaut sans préfixe d'URL, EN préfixé par `/en`, avec balises hreflang et alternates dans le sitemap.",
        "rationale": "Le marché principal est francophone : servir le FR sur l'URL racine maximise la lisibilité et le SEO local, tout en exposant proprement une version EN pour les partenaires internationaux.",
        "tradeoff": "On gagne des URLs propres pour l'audience cible et un SEO bilingue correct ; on accepte une duplication de contenu (deux fichiers par page) et une vigilance accrue sur les redirections de locale (un bug de prefetch /contact a dû être corrigé)."
      },
      {
        "title": "Formulaire de contact via Web3Forms, sans backend",
        "choice": "Soumission directe du formulaire vers l'API Web3Forms avec clé d'accès, sans serveur ni base de données propre, complétée par des liens tel:/mailto: et un lien Google Maps Directions.",
        "rationale": "Un site vitrine n'a pas besoin d'opérer un backend de mails. Déléguer à un service externe élimine la maintenance d'un endpoint, la gestion SMTP et une surface d'attaque, tout en restant gratuit à ce volume.",
        "tradeoff": "On gagne zéro infrastructure et une mise en production immédiate ; on sacrifie le contrôle sur le stockage des leads et on dépend de la disponibilité d'un tiers."
      },
      {
        "title": "Couche analytics maison fortement typée",
        "choice": "Une union discriminée TypeScript décrit chaque événement métier (clic nav, vue d'étude de cas, ouverture de partage, soumission de contact, etc.) et une fonction `track()` générique garantit que les propriétés correspondent au nom de l'événement.",
        "rationale": "Mesurer ce qui retient l'attention est l'objectif du site. Typer le catalogue d'événements empêche les fautes de frappe et les schémas d'événements incohérents qui ruinent l'analyse a posteriori dans PostHog.",
        "tradeoff": "On gagne un suivi fiable et auto-documenté ; on accepte un coût initial de définition du schéma et la discipline de l'étendre à chaque nouvelle interaction."
      },
      {
        "title": "Performance d'abord pour les connexions à faible bande passante",
        "choice": "LazyMotion de Framer Motion (import `m` au lieu de `motion`, features `domMax`), suppression des fades d'entrée sur l'élément LCP, allègement du chargement de PostHog, polices `display: swap`, formats WebP/AVIF et cache immuable d'un an sur les assets.",
        "rationale": "En contexte africain mobile, chaque kilooctet et chaque milliseconde de rendu bloquant compte. Le journal Git montre une suite d'optimisations ciblées guidées par PageSpeed Insights (LCP, JS inutilisé, CSS bloquant).",
        "tradeoff": "On gagne un temps de chargement réduit et de meilleurs Web Vitals ; on accepte un code d'animation plus verbeux (`m.X` partout) et des arbitrages où certains effets visuels sont retirés au profit de la vitesse."
      }
    ],
    "challenges": [
      {
        "problem": "Boucle de redirection infinie /fr <-> /fr/ en production, et redirections 307 parasites sur le prefetch des liens en version anglaise.",
        "solution": "Suppression du `trailingSlash` contradictoire dans vercel.json et passage aux composants Link conscients de la locale issus de la config i18n, pour que le prefetch cible directement la bonne URL localisée au lieu de déclencher une redirection."
      },
      {
        "problem": "Bundle JavaScript initial trop lourd pour le mobile, avec Framer Motion et PostHog identifiés par PageSpeed comme du JS inutilisé/bloquant.",
        "solution": "Migration de toutes les animations vers `m.X` sous LazyMotion (features domMax), et simplification de l'initialisation de PostHog pour réduire le poids transféré au chargement."
      },
      {
        "problem": "Générer des images de partage social localisées pour chaque article de blog, sans les produire à la main.",
        "solution": "Génération à la volée via `next/og` (ImageResponse) à partir de la source unique du blog, avec chargement dynamique des polices Google, chaque route `opengraph-image.tsx` invoquant une fabrique commune avec le slug et la locale."
      },
      {
        "problem": "Premier rendu (LCP) ralenti par un fade d'opacité sur le titre H1 de la page d'accueil.",
        "solution": "Retrait ciblé de l'animation d'entrée sur l'élément LCP après diagnostic PageSpeed (le H1 démarrait à opacity:0 et ajoutait environ 2,6 s de délai de rendu sur mobile), au profit d'un rendu immédiat."
      },
      {
        "problem": "Accessibilité : contraste de texte insuffisant en pied de page et structure de liste de définitions non conforme.",
        "solution": "Ajustement de la palette (neutral-500 vers neutral-400 sur fond neutral-950, qui passait à 4,17:1, pour repasser au-dessus du seuil de contraste) et restructuration du markup `dl` pour respecter la sémantique dt/dd."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://adc-website-khaki.vercel.app",
      "github": ""
    }
  },
  {
    "slug": "smartlink",
    "title": "SmartLink, carte de visite numérique à QR code dynamique pour professionnels d'Abidjan",
    "oneLiner": "Une plateforme SaaS qui remplace la carte de visite papier par un profil professionnel en ligne, accessible en un scan de QR code dynamique.",
    "role": "Conception et développement Full Stack (architecture, schéma de données, paiements, déploiement). Projet personnel porté par Marcel.",
    "year": "2026",
    "status": "dev",
    "stack": [
      "Next.js 16.1.1",
      "React 19",
      "TypeScript 5.9.3",
      "Bun 1.3.5",
      "Prisma 6.2.0",
      "Supabase (PostgreSQL + Storage)",
      "Better-Auth 1.2.0",
      "next-safe-action",
      "Zod",
      "TanStack Query",
      "Tailwind CSS 4.1.18",
      "Base UI / shadcn/ui",
      "Framer Motion",
      "CinetPay",
      "Lemon Squeezy",
      "Upstash Redis (rate limiting)",
      "PostHog",
      "Resend",
      "qrcode",
      "vcards-js",
      "Playwright",
      "Vitest",
      "Vercel"
    ],
    "context": "A Abidjan, l'échange de contact professionnel passe encore largement par la carte de visite papier : information figée, vite obsolète après un changement de poste ou de numéro, et impossible à mettre à jour une fois imprimée. SmartLink répond à ce problème en proposant un profil professionnel en ligne accessible via un QR code : le contact se sauvegarde en un scan (export vCard .vcf compatible avec tous les téléphones), le CV reste accessible dans le cloud, et l'information se met à jour sans réimprimer quoi que ce soit. La cible est explicite côté produit : les professionnels modernes d'Abidjan, avec un paiement par Mobile Money (CinetPay) pour le marché ivoirien et par carte bancaire (Lemon Squeezy) pour l'international, le tout dans une interface en français.",
    "architectureSummary": "SmartLink est une application Next.js 16 (App Router, React 19) déployée sur Vercel et outillée avec Bun. La logique métier des mutations (création, édition, suppression de profils, expériences, compétences, projets) passe par des Server Actions typées via next-safe-action, avec validation Zod partagée client et serveur. La persistance repose sur PostgreSQL (Supabase) accédé via Prisma 6. L'authentification est gérée par Better-Auth (email et mot de passe, plus OAuth Google), avec un middleware qui protège les routes du tableau de bord et des profils. Le stockage des fichiers utilisateurs (CV PDF plafonné à 5 Mo, avatars, images de couverture) se fait sur Supabase Storage avec des policies Row-Level Security restreignant chaque utilisateur à son propre dossier. Les QR codes pointent vers des profils publics /u/[slug] ; un modèle QrLink avec shortCode unique permet des liens dynamiques traçables (scanCount, lastScannedAt) que l'on peut désactiver sans réimprimer le code. Les paiements arrivent par deux fournisseurs, CinetPay (Mobile Money, marché ivoirien) et Lemon Squeezy (carte, international), traités hors Server Actions via des API Routes webhook dédiées. Le projet prévoit un rate limiting via Upstash Redis et une analytique produit via PostHog, complétés par des compteurs dénormalisés en base.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "client",
          "label": "App Next.js 16 (React 19, App Router) sur Vercel",
          "kind": "client"
        },
        {
          "id": "actions",
          "label": "Server Actions (next-safe-action + Zod)",
          "kind": "server"
        },
        {
          "id": "webhooks",
          "label": "API Routes Webhooks paiement",
          "kind": "server"
        },
        {
          "id": "auth",
          "label": "Better-Auth (session, OAuth Google)",
          "kind": "service"
        },
        {
          "id": "db",
          "label": "PostgreSQL (Supabase) via Prisma 6",
          "kind": "db"
        },
        {
          "id": "storage",
          "label": "Supabase Storage (CV, avatars, RLS)",
          "kind": "service"
        },
        {
          "id": "redis",
          "label": "Upstash Redis (rate limiting)",
          "kind": "service"
        },
        {
          "id": "cinetpay",
          "label": "CinetPay (Mobile Money CI)",
          "kind": "external"
        },
        {
          "id": "lemon",
          "label": "Lemon Squeezy (carte, international)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "client",
          "to": "actions",
          "label": "mutations profil/contenu"
        },
        {
          "from": "client",
          "to": "auth",
          "label": "login / session"
        },
        {
          "from": "actions",
          "to": "db",
          "label": "Prisma"
        },
        {
          "from": "actions",
          "to": "storage",
          "label": "upload CV / images"
        },
        {
          "from": "actions",
          "to": "redis",
          "label": "throttle endpoints sensibles"
        },
        {
          "from": "auth",
          "to": "db",
          "label": "users / sessions"
        },
        {
          "from": "client",
          "to": "cinetpay",
          "label": "checkout abonnement"
        },
        {
          "from": "client",
          "to": "lemon",
          "label": "checkout abonnement"
        },
        {
          "from": "cinetpay",
          "to": "webhooks",
          "label": "notification paiement"
        },
        {
          "from": "lemon",
          "to": "webhooks",
          "label": "notification paiement"
        },
        {
          "from": "webhooks",
          "to": "db",
          "label": "maj abonnement / paiement"
        }
      ]
    },
    "decisions": [
      {
        "title": "Double fournisseur de paiement : CinetPay et Lemon Squeezy",
        "choice": "Intégrer CinetPay (Mobile Money) pour le marché ivoirien et Lemon Squeezy (carte) pour l'international, chacun via son propre webhook (app/api/webhooks/cinetpay et /lemonsqueezy).",
        "rationale": "A Abidjan, l'abonnement payant doit pouvoir se régler par Mobile Money, moyen de paiement dominant ; la carte bancaire couvre mal cette cible. Lemon Squeezy ouvre en parallèle le marché international.",
        "tradeoff": "On gagne l'accès au marché local et à l'international, au prix de deux flux de réconciliation distincts à maintenir (deux fournisseurs, deux handlers webhook, deux formats de notification à normaliser vers le modèle Payment)."
      },
      {
        "title": "QR codes dynamiques via une table QrLink à shortCode",
        "choice": "Découpler le QR code du profil avec un modèle QrLink (shortCode unique, isActive, scanCount, deactivatedAt) au lieu d'encoder directement l'URL du profil dans le QR.",
        "rationale": "Permet de mettre à jour ou désactiver un QR déjà imprimé sans réimprimer la carte, et de mesurer les scans. Répond au cas Corporate identifié : couper l'accès du contact d'un employé qui quitte.",
        "tradeoff": "On ajoute une indirection (résolution du shortCode puis redirection vers /u/[slug]) et une table de plus, contre une flexibilité que l'encodage direct de l'URL ne permettrait pas."
      },
      {
        "title": "Server Actions pour les mutations, API Routes réservées aux webhooks",
        "choice": "Faire transiter create, update et delete par next-safe-action (Zod partagé client et serveur) et n'utiliser des API Routes que là où c'est imposé, notamment les webhooks de paiement externes.",
        "rationale": "next-safe-action donne une validation typée de bout en bout et supprime les désynchronisations de types entre formulaire et serveur. Les webhooks sont appelés par des tiers, sans contexte de session, donc ils ne peuvent pas passer par des Server Actions.",
        "tradeoff": "Cohérence et sécurité de typage sur tout le CRUD, mais deux paradigmes coexistent dans le code (Server Actions et API Routes) qu'il faut savoir distinguer."
      },
      {
        "title": "Limites de plan appliquées côté serveur (canCreateProfile)",
        "choice": "Encoder les quotas de profils par plan côté serveur et vérifier le nombre de profils existants avant toute création.",
        "rationale": "Le multi-profil est la valeur du tier payant ; la limite doit être inviolable côté serveur, pas seulement masquée dans l'UI, pour empêcher tout dépassement non facturé.",
        "tradeoff": "Sécurité de la monétisation garantie, au prix d'une règle métier à garder synchronisée entre l'affichage client et la validation serveur."
      },
      {
        "title": "Supabase Storage avec RLS plutôt qu'un bucket public",
        "choice": "Stocker CV et images sur Supabase Storage avec des policies Row-Level Security limitant chaque utilisateur à son propre dossier, et plafonner le CV à 5 Mo.",
        "rationale": "Les CV sont des données personnelles : la RLS empêche un utilisateur d'écrire dans le dossier d'un autre, et le plafond 5 Mo protège la bande passante et les coûts dans un contexte de connexions parfois limitées.",
        "tradeoff": "Configuration de policies plus exigeante qu'un simple bucket public, en échange d'un contrôle d'accès réel sur les fichiers sensibles."
      }
    ],
    "challenges": [
      {
        "problem": "Permettre de mettre à jour ou révoquer un QR code déjà imprimé sur une carte physique, sans réimpression.",
        "solution": "Un niveau d'indirection : le QR encode un shortCode (table QrLink) résolu vers le profil /u/[slug], avec isActive et deactivatedAt. On change la cible ou on désactive le lien sans toucher au support imprimé, et on compte les scans au passage."
      },
      {
        "problem": "Encaisser des abonnements sur un marché où le Mobile Money domine, tout en restant ouvert à l'international.",
        "solution": "Deux intégrations de paiement (CinetPay pour le Mobile Money ivoirien, Lemon Squeezy pour la carte) normalisées vers un même modèle Payment et Subscription, chacune confirmée par son webhook dédié pour fiabiliser l'état de l'abonnement indépendamment du retour navigateur."
      },
      {
        "problem": "Protéger les CV et fichiers personnels des utilisateurs.",
        "solution": "Supabase Storage avec policies RLS scopant chaque upload au dossier de l'utilisateur authentifié, plus validation de taille (5 Mo) et de type côté serveur avant écriture."
      },
      {
        "problem": "Empêcher le contournement des quotas de profils du tier gratuit.",
        "solution": "Validation serveur canCreateProfile() qui compare le nombre de profils existants à la limite du plan avant toute création, plutôt que de se fier à un masquage côté UI."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://smartlink-roan.vercel.app",
      "github": "https://github.com/James10192/SmartLink-codeQR"
    }
  },
  {
    "slug": "sopremi",
    "title": "SOPREMI Cockpit, le centre de pilotage opérationnel d'une société de services miniers",
    "oneLiner": "Une maquette interactive haute fidélité qui modélise le pilotage de chantiers miniers, le suivi des engins et la validation des décisions par la direction générale.",
    "role": "Conception et développement full stack de la maquette (architecture front, modèle de domaine, RBAC, state management, design system).",
    "year": "2026",
    "status": "maquette",
    "stack": [
      "TanStack Start",
      "TanStack Router",
      "React 19",
      "TypeScript",
      "Vite 8",
      "Tailwind CSS 4",
      "lucide-react",
      "Vitest",
      "Puppeteer",
      "pnpm",
      "Vercel"
    ],
    "context": "SOPREMI est une société de prestation de services miniers en Afrique francophone, dont l'activité repose sur la coordination de chantiers, d'engins lourds et d'équipes sur le terrain. Le pilotage quotidien (avancement des projets, état de la flotte, présence du personnel, rentabilité) restait dispersé et les actions sensibles n'avaient pas de circuit de validation formalisé par la direction générale. L'objectif de cette maquette est de matérialiser, avant tout engagement de développement backend, à quoi ressemblerait un cockpit opérationnel unique: démontrer les écrans, les rôles, les flux de validation et les indicateurs avec des données de démonstration réalistes.",
    "architectureSummary": "L'application est une SPA/SSR construite avec TanStack Start et TanStack Router (React 19, Vite 8, Tailwind 4), déployée sur Vercel. Le routage par fichiers définit les sections métier: tableau de bord (index), projets (liste, détail dynamique projets.$id, création), ressources (engins, personnel, pointage), validation, audit, reporting, notifications et login. Il n'y a pas encore de backend connecté: l'état applicatif est entièrement géré côté client via un store maison useReducer + React Context (AppStore avec reducer, actions, hooks et useCan), hydraté à partir de fichiers de seed typés (projets, engins, personnel, utilisateurs, validations, notifications) et persisté dans localStorage. La séparation des rôles est portée par un module RBAC dédié (permissions.ts) définissant quatre rôles (DG, RH, PM, DOM), onze capacités regroupées par domaine, et une logique de visibilité de navigation (full/read/hidden). Le README annonce une évolution prévue vers du temps réel avec Convex, non encore branchée.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "browser",
          "label": "Navigateur (React 19 SPA)",
          "kind": "client"
        },
        {
          "id": "tanstack",
          "label": "TanStack Start / Router (routage par fichiers)",
          "kind": "server"
        },
        {
          "id": "store",
          "label": "AppStore (useReducer + Context)",
          "kind": "service"
        },
        {
          "id": "rbac",
          "label": "RBAC permissions.ts (DG/RH/PM/DOM)",
          "kind": "service"
        },
        {
          "id": "seed",
          "label": "Seed typés (projets, engins, staff...)",
          "kind": "db"
        },
        {
          "id": "localstorage",
          "label": "localStorage (persistance session)",
          "kind": "db"
        },
        {
          "id": "vercel",
          "label": "Vercel (hébergement)",
          "kind": "external"
        },
        {
          "id": "convex",
          "label": "Convex (temps réel, prévu)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "browser",
          "to": "tanstack",
          "label": "rend les routes"
        },
        {
          "from": "tanstack",
          "to": "store",
          "label": "consomme l'état"
        },
        {
          "from": "store",
          "to": "rbac",
          "label": "filtre via useCan"
        },
        {
          "from": "store",
          "to": "seed",
          "label": "hydrate au démarrage"
        },
        {
          "from": "store",
          "to": "localstorage",
          "label": "persiste l'état"
        },
        {
          "from": "vercel",
          "to": "browser",
          "label": "sert l'app"
        },
        {
          "from": "store",
          "to": "convex",
          "label": "migration prévue"
        }
      ]
    },
    "decisions": [
      {
        "title": "Maquette interactive avant backend",
        "choice": "Construire un cockpit pleinement navigable avec données de seed et persistance localStorage, sans backend ni base de données.",
        "rationale": "Permet de valider l'ergonomie, les rôles et les flux de validation avec la direction de SOPREMI avant d'investir dans l'infrastructure temps réel. Le README assume explicitement l'absence de backend, de calcul métier final et de workflow de validation réel.",
        "tradeoff": "Aucune donnée réelle ni logique métier validée: tout devra être recâblé lors du branchement backend, et les calculs de rentabilité affichés sont illustratifs."
      },
      {
        "title": "Store maison useReducer + Context plutôt qu'une librairie d'état",
        "choice": "Implémenter AppStore (reducer, actions, hooks, useCan) avec hydratation lazy depuis localStorage et persistance par effet.",
        "rationale": "Donne une prévisibilité de type Redux sans dépendance externe, et l'init synchrone évite le flicker d'authentification au premier rendu (l'AppShell voit l'état d'auth immédiatement).",
        "tradeoff": "Code de plomberie maintenu en interne (loadPersisted, persist, garde-fous window/try-catch); ne couvre pas la synchronisation multi-onglets ni le temps réel, d'où la cible Convex."
      },
      {
        "title": "RBAC centralisé à quatre rôles métier",
        "choice": "Définir permissions.ts avec DG, RH, PM, DOM, onze capacités par domaine et une fonction navVisibility retournant full/read/hidden.",
        "rationale": "Modélise la réalité organisationnelle: tout le monde voit la file de validation mais seul le DG décide. La séparation des pouvoirs est ainsi déclarative et testable, pas dispersée dans les composants.",
        "tradeoff": "Les rôles sont figés en code (pas d'administration dynamique des droits), ce qui suffit à une maquette mais demandera une table de rôles côté backend en production."
      },
      {
        "title": "Routage par fichiers TanStack Start",
        "choice": "Organiser les modules en routes fichiers (projets.$id, ressources.engins, validation, reporting, audit...) doublées d'un dossier features par domaine.",
        "rationale": "Séparation nette page/feature, code splitting automatique et navigation typée; cohérent avec la stack TanStack utilisée sur les autres projets.",
        "tradeoff": "Stack récente (TanStack Start v1, Vite 8) avec ses gotchas SSR, et duplication apparente routes/features à discipliner."
      },
      {
        "title": "Domaine fortement typé en TypeScript",
        "choice": "Définir les entités (Project, Engin, Staff, Validation, Notification, TimelineEvent, User) et leurs unions (ProjectStatus, EnginState, Presence, ValidationState...) dans types.ts.",
        "rationale": "Le modèle de domaine sert de contrat unique entre seed, store et UI, et anticipe le schéma backend futur. Les unions littérales sécurisent les statuts et états critiques.",
        "tradeoff": "Effort de modélisation amont important pour une maquette, mais réutilisable tel quel lors de la mise en place de Convex."
      }
    ],
    "challenges": [
      {
        "problem": "Afficher l'état d'authentification dès le premier rendu sans flicker de navigation.",
        "solution": "Initialisation lazy du useReducer qui lit localStorage de façon synchrone au premier render, afin que l'AppShell voie immédiatement l'état d'auth."
      },
      {
        "problem": "Persister l'état applicatif de façon robuste côté client (mode privé, quota, SSR).",
        "solution": "loadPersisted et persist encadrés par des vérifications typeof window === 'undefined' et des try-catch pour gérer les limites de quota et la navigation privée; resetStore vide localStorage et recharge la page."
      },
      {
        "problem": "Formaliser une séparation des pouvoirs où seul le DG valide les actions sensibles.",
        "solution": "Module RBAC déclaratif avec capacités par domaine et navVisibility (full/read/hidden): la file de validation est visible par tous en lecture, l'action d'approbation reste réservée au DG."
      },
      {
        "problem": "Garantir un rendu propre du français cross-plateforme (accents, branding).",
        "solution": "Convention documentée d'écriture de tous les fichiers source en UTF-8 sans BOM pour éviter les problèmes d'encodage entre environnements."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://sopremi-maquette.vercel.app",
      "github": "https://github.com/James10192/sopremi-maquette"
    }
  },
  {
    "slug": "sdai",
    "title": "SDAI Regularisation SMARTVISTA",
    "oneLiner": "Outil interne de remédiation bancaire qui corrige en masse, dans les fichiers XML de la plateforme monétique SMARTVISTA, les numéros de compte marchands tronqués générés lors du déploiement TPE.",
    "role": "Conception et développement full stack (backend Flask, moteur de traitement XML, modèle de données, interface d'administration, packaging de déploiement). Projet réalisé pour NSIA Banque.",
    "year": "2026",
    "status": "livre",
    "stack": [
      "Python 3.8+",
      "Flask 2.3",
      "SQLAlchemy 2.0",
      "MariaDB / MySQL (PyMySQL)",
      "xml.etree.ElementTree",
      "pandas",
      "openpyxl",
      "Bootstrap 5",
      "Gunicorn",
      "Nginx",
      "RHEL / CentOS (systemd)"
    ],
    "context": "Lors du déploiement de la plateforme monétique SMARTVISTA pour les TPE marchands de NSIA Banque, une contrainte technique a empêché d'utiliser directement les vrais comptes marchands. Un contournement a généré des numéros de compte artificiels au format \"code agence + XXXXXXXX + 000\", reconnaissables à leur terminaison en \"000\". Ces comptes placeholder polluent les flux comptables et doivent être remplacés par les vrais comptes avant intégration. La correction manuelle, sur des fichiers XML SVXP volumineux contenant des milliers de balises account_number, n'est ni fiable ni traçable. Le besoin terrain : automatiser la détection et la substitution, garder une piste d'audit complète, et offrir une interface simple à une équipe projet bancaire interne.",
    "architectureSummary": "L'application est un monolithe Flask servi par Gunicorn derrière Nginx sur RHEL/CentOS. Le navigateur (interface Bootstrap 5) téléverse un ou plusieurs fichiers XML vers la route /upload. Le coeur du système est un moteur de traitement (xml_processor.py) qui parcourt récursivement l'arbre XML via xml.etree.ElementTree, repère les balises account_number dont la valeur se termine par \"000\" (regex .*000$), puis interroge une table de correspondance en base MariaDB pour substituer le vrai numéro. Deux modes existent : mode normal (tronqué vers vrai) et mode inverse (vrai vers tronqué, avec génération déterministe et anti-collision par hash MD5 sur les 3 derniers caractères). Chaque fichier corrigé est réécrit avec un suffixe _traité.xml et stocké dans un dossier processed/, téléchargeable à l'unité ou en archive ZIP. Le modèle de données comporte deux tables : CompteCorrespondance (mapping ntronque vers nvrai, plus métadonnées marchand idc/idt/mname) et TraitementLog (historique d'exécution : fichier, comptes détectés, corrections effectuées, statut succès/erreur/partiel, comptes non trouvés, mode). Une interface d'administration permet le CRUD des correspondances et l'import en masse via Excel/CSV (pandas + openpyxl). Une route JSON /api/correspondances expose les mappings.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "browser",
          "label": "Interface web (Bootstrap 5, upload XML)",
          "kind": "client"
        },
        {
          "id": "nginx",
          "label": "Nginx (reverse proxy)",
          "kind": "server"
        },
        {
          "id": "flask",
          "label": "App Flask + Gunicorn (routes upload/admin/api)",
          "kind": "server"
        },
        {
          "id": "processor",
          "label": "Moteur XML (détection 000, substitution)",
          "kind": "service"
        },
        {
          "id": "db",
          "label": "MariaDB (CompteCorrespondance, TraitementLog)",
          "kind": "db"
        },
        {
          "id": "processed",
          "label": "Dossier processed/ (fichiers _traité.xml, ZIP)",
          "kind": "service"
        },
        {
          "id": "excel",
          "label": "Import Excel/CSV (pandas, openpyxl)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "browser",
          "to": "nginx",
          "label": "HTTPS upload"
        },
        {
          "from": "nginx",
          "to": "flask",
          "label": "proxy"
        },
        {
          "from": "flask",
          "to": "processor",
          "label": "traiter_plusieurs_fichiers"
        },
        {
          "from": "processor",
          "to": "db",
          "label": "get_correspondance"
        },
        {
          "from": "flask",
          "to": "db",
          "label": "CRUD + TraitementLog"
        },
        {
          "from": "processor",
          "to": "processed",
          "label": "écrit _traité.xml"
        },
        {
          "from": "flask",
          "to": "processed",
          "label": "download / ZIP"
        },
        {
          "from": "excel",
          "to": "flask",
          "label": "import_excel en masse"
        }
      ]
    },
    "decisions": [
      {
        "title": "Monolithe Flask + MariaDB plutôt qu'une architecture distribuée",
        "choice": "Une seule application Flask servie par Gunicorn/Nginx, base MariaDB locale, aucun service externe.",
        "rationale": "L'outil cible une équipe projet interne en environnement bancaire RHEL/CentOS, avec un périmètre fonctionnel précis (correction de fichiers). Un monolithe se déploie via un simple script, s'audite facilement et ne crée pas de dépendance réseau externe, ce qui simplifie la validation sécurité côté banque.",
        "tradeoff": "On gagne en simplicité de déploiement et d'audit. On sacrifie la scalabilité horizontale et le découplage : le moteur de traitement et l'interface vivent dans le même processus."
      },
      {
        "title": "Détection par convention sur la terminaison 000 plutôt que par marquage explicite",
        "choice": "Identifier les comptes artificiels via la regex .*000$ sur le contenu des balises account_number.",
        "rationale": "Le format de contournement SMARTVISTA est déterministe (code agence + 8 caractères + 000). Exploiter directement cette convention évite d'avoir à enrichir les fichiers source en amont, sur lesquels l'équipe n'a pas la main.",
        "tradeoff": "On gagne en autonomie (aucune modification du flux SMARTVISTA requise). On sacrifie en robustesse : un vrai compte se terminant légitimement par 000 serait un faux positif, d'où la nécessité de la table de correspondance comme garde-fou (un compte non mappé n'est pas modifié et est journalisé en non trouvé)."
      },
      {
        "title": "Table de correspondance en base + import Excel/CSV comme source de vérité",
        "choice": "Stocker les mappings tronqué vers vrai dans MariaDB, alimentés manuellement ou par import en masse pandas/openpyxl, avec interface d'administration CRUD.",
        "rationale": "Les correspondances proviennent d'un travail métier (rapprochement marchand/terminal). Les externaliser en base, et non en dur dans le code, permet à l'équipe projet de les maintenir sans redéploiement, et l'import Excel colle aux fichiers de travail réels des équipes monétique.",
        "tradeoff": "On gagne en maintenabilité métier et en traçabilité (created_at/updated_at). On sacrifie la garantie d'intégrité : la qualité du résultat dépend entièrement de l'exactitude des correspondances saisies."
      },
      {
        "title": "Mode inverse avec génération anti-collision par hash MD5",
        "choice": "Permettre la transformation vrai vers tronqué, en générant un identifiant tronqué déterministe et, en cas de collision, en remplaçant les 3 derniers chiffres par un extrait de hash MD5.",
        "rationale": "Le besoin de rejouer ou de reconstituer des fichiers au format SMARTVISTA d'origine (tests, rapprochements) justifie un chemin inverse. Le hash garantit l'unicité sans table de séquence centralisée.",
        "tradeoff": "On gagne en réversibilité et en autonomie de génération. On sacrifie la lisibilité : un identifiant dérivé d'un hash n'est plus déductible visuellement du compte d'origine."
      },
      {
        "title": "Journalisation systématique de chaque traitement (TraitementLog)",
        "choice": "Enregistrer pour chaque fichier le nombre de comptes détectés, corrections effectuées, comptes non trouvés, statut (succès/erreur/partiel) et le mode.",
        "rationale": "En contexte bancaire, la piste d'audit n'est pas optionnelle. Le statut partiel et la liste des comptes non trouvés permettent à l'équipe de traiter les exceptions plutôt que de subir un échec global silencieux.",
        "tradeoff": "On gagne une traçabilité exploitable et un tableau de bord d'administration. On sacrifie un peu de simplicité : chaque traitement écrit en base et la table d'historique croît avec le volume."
      }
    ],
    "challenges": [
      {
        "problem": "Localiser les balises account_number dans des XML SVXP à structure imbriquée et potentiellement namespacée, sans connaître le chemin exact a priori.",
        "solution": "Un parcours récursif de l'arbre via xml.etree.ElementTree (extraire_balises_account_number) qui gère les tags qualifiés par namespace, complété par extraire_infos_marchand_du_xml qui remonte le contexte parent pour récupérer les informations marchand (nom, terminal, client) sous plusieurs variantes de noms de balises (merchant_name, mname, name)."
      },
      {
        "problem": "Distinguer un vrai compte légitime d'un compte artificiel quand les deux peuvent se terminer par 000.",
        "solution": "La terminaison 000 sert de présélection (est_compte_tronque), mais la substitution n'a lieu que si une correspondance existe réellement en base. Tout compte détecté mais absent de la table est laissé intact et consigné dans comptes_non_trouves, ce qui évite les corruptions et rend les exceptions visibles."
      },
      {
        "problem": "Éviter les collisions lors de la génération de comptes tronqués en mode inverse.",
        "solution": "generer_compte_tronque construit l'identifiant à partir des 13 premiers caractères (complétés par des zéros) suivis de 000, puis vérifie l'existence d'un mapping ; en cas de collision, les 3 derniers chiffres sont remplacés par un extrait de hash MD5, garantissant l'unicité de façon déterministe."
      },
      {
        "problem": "Permettre à une équipe non technique de maintenir des correspondances et de traiter des lots de fichiers.",
        "solution": "Interface d'administration CRUD sur les correspondances, import en masse depuis Excel/CSV via pandas et openpyxl, traitement par lot (traiter_plusieurs_fichiers) avec rapport agrégé, et téléchargement groupé en ZIP des fichiers corrigés."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "github": "https://github.com/James10192/SDAI-CompteSmartVtoCompeAmpli"
    }
  },
  {
    "slug": "la-victoire",
    "title": "La Victoire — Vitrine et tunnel de commande pour dark kitchen à Abidjan",
    "oneLiner": "Un site vitrine rapide et mobile-first qui transforme un menu de braisé en commandes WhatsApp, Glovo et Yango, sans back-office ni paiement intégré.",
    "role": "Conception et développement full stack (front Next.js, intégration des canaux de commande, déploiement Vercel)",
    "year": "2026",
    "status": "prod",
    "stack": [
      "Next.js",
      "React",
      "next/image",
      "Vercel",
      "WhatsApp (wa.me)",
      "Glovo",
      "Yango Food"
    ],
    "context": "La Victoire est une dark kitchen de Port-Bouët (Abidjan) spécialisée dans le poisson et le poulet braisés sur charbon, fondée par la cheffe Nancy Djedje-Li. Le besoin métier n'est pas de bâtir une plateforme de commande complète, mais de donner une vitrine crédible et professionnelle à une cuisine sans salle, dont toute la relation client passe déjà par WhatsApp et les apps de livraison. La contrainte terrain est nette: clientèle 100% mobile à Abidjan, bande passante variable, prix en FCFA, et une opératrice unique qui gère les commandes à la main. Le site doit donc convertir une visite en conversation WhatsApp ou en commande sur Glovo/Yango, sans imposer de friction (pas de compte, pas de panier).",
    "architectureSummary": "L'architecture observée est volontairement minimale et orientée conversion. Le front est une application Next.js (optimisation d'images via le endpoint /_next/image) servie par Vercel, sous forme de page unique vitrine. Il n'y a ni back-office, ni base de données, ni passerelle de paiement intégrée: le menu et les prix sont en contenu statique, et chaque action de commande est un lien sortant. Trois canaux de commande sont câblés en dur: WhatsApp (lien wa.me/2250142249553, présenté comme canal recommandé pour parler directement à la cuisine), Glovo et Yango Food pour la livraison. La logique métier (allocation, encaissement, suivi de livraison) est entièrement déléguée à ces services tiers et à la cheffe via WhatsApp. C'est un choix d'architecture assumé: le code ne porte que la présentation et l'aiguillage vers le bon canal.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "visitor",
          "label": "Visiteur mobile (Abidjan)",
          "kind": "client"
        },
        {
          "id": "web",
          "label": "Site vitrine Next.js",
          "kind": "client"
        },
        {
          "id": "vercel",
          "label": "Hébergement Vercel + next/image",
          "kind": "server"
        },
        {
          "id": "whatsapp",
          "label": "WhatsApp (wa.me) — canal recommandé",
          "kind": "external"
        },
        {
          "id": "glovo",
          "label": "Glovo — livraison",
          "kind": "external"
        },
        {
          "id": "yango",
          "label": "Yango Food — livraison",
          "kind": "external"
        },
        {
          "id": "kitchen",
          "label": "Cuisine / cheffe (traitement manuel)",
          "kind": "service"
        }
      ],
      "edges": [
        {
          "from": "visitor",
          "to": "web",
          "label": "consulte le menu"
        },
        {
          "from": "web",
          "to": "vercel",
          "label": "servi par Vercel"
        },
        {
          "from": "web",
          "to": "whatsapp",
          "label": "lien wa.me prérempli"
        },
        {
          "from": "web",
          "to": "glovo",
          "label": "redirection commande"
        },
        {
          "from": "web",
          "to": "yango",
          "label": "redirection commande"
        },
        {
          "from": "whatsapp",
          "to": "kitchen",
          "label": "commande traitée à la main"
        }
      ]
    },
    "decisions": [
      {
        "title": "Vitrine + redirection plutôt que tunnel de commande maison",
        "choice": "Aucun panier ni checkout interne: chaque plat renvoie vers WhatsApp, Glovo ou Yango.",
        "rationale": "La cliente gère déjà ses commandes par WhatsApp et les apps de livraison couvrent le paiement et la logistique. Construire un checkout maison aurait dupliqué ce qui existe et créé un back-office à maintenir pour une équipe d'une personne.",
        "tradeoff": "On perd la donnée de commande first-party (pas d'historique, pas de relance automatisée) et on dépend de la disponibilité et des marges des plateformes tierces."
      },
      {
        "title": "WhatsApp positionné comme canal recommandé",
        "choice": "Le lien wa.me est mis en avant comme voie directe vers la cuisine, devant Glovo et Yango.",
        "rationale": "À Abidjan, WhatsApp est le canal de confiance par défaut et il évite la commission des apps de livraison, ce qui protège la marge d'une petite cuisine.",
        "tradeoff": "Le traitement reste manuel et non scalable: chaque commande mobilise la cheffe, sans automatisation ni suivi structuré."
      },
      {
        "title": "Next.js sur Vercel pour une vitrine légère",
        "choice": "Site rendu via Next.js avec optimisation d'images, déployé sur Vercel.",
        "rationale": "Pages légères et images servies en formats adaptés (le endpoint /_next/image génère des variantes responsives), ce qui compte sur des connexions mobiles abidjanaises irrégulières. Déploiement et CDN gérés sans ops.",
        "tradeoff": "Stack potentiellement surdimensionnée pour un contenu quasi statique; dépendance à l'écosystème Vercel pour le build et la diffusion."
      },
      {
        "title": "Prix affichés en fourchettes FCFA, contenu en français",
        "choice": "Menu présenté avec des fourchettes (2 500 à 6 000 FCFA) et un seuil traiteur (25 000 FCFA, 48h de préavis), tout en français.",
        "rationale": "Le braisé se vend au poids et selon la taille de la pièce; une fourchette reflète la réalité du commerce de rue ivoirien sans promettre un prix faux. Le français est la langue de la cible.",
        "tradeoff": "L'absence de prix fixe par article empêche un calcul de total automatique et reporte la négociation finale sur WhatsApp."
      }
    ],
    "challenges": [
      {
        "problem": "Convertir une visite en commande sans imposer compte, panier ni paiement, sur mobile.",
        "solution": "Réduction de la page à l'essentiel: menu visuel, prix en FCFA, et boutons d'action qui ouvrent directement la bonne conversation/app (lien wa.me prérempli, redirections Glovo/Yango)."
      },
      {
        "problem": "Servir des photos de plats appétissantes malgré une bande passante mobile variable à Abidjan.",
        "solution": "Recours à l'optimisation d'images Next.js (variantes responsives via /_next/image) et diffusion via le CDN Vercel pour limiter le poids transféré."
      },
      {
        "problem": "Donner une image professionnelle à une cuisine sans local commercial visible.",
        "solution": "Identité de marque dédiée (logos horizontal, badge, app icon), hero produit, section fondatrice avec la cheffe Nancy Djedje-Li, et une promesse claire: \"Le Braisé Authentique, Livré Chaud\"."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://la-victoire.vercel.app",
      "github": ""
    }
  },
  {
    "slug": "wouri",
    "title": "Wouri, backend d'assistant conversationnel IA (Bun + Hono + Groq)",
    "oneLiner": "Un backend d'assistant IA déployé en production, bâti sur le runtime Bun et une inférence LLM via Groq.",
    "role": "Conception et développement du backend (architecture, API, intégration LLM et persistance), déploiement et exploitation.",
    "year": "2026",
    "status": "prod",
    "stack": [
      "Bun",
      "Hono",
      "TypeScript",
      "Groq",
      "Supabase",
      "Vercel"
    ],
    "context": "Wouri est un backend d'assistant conversationnel IA exposé en production. Le service se présente lui-même comme \"Wouri Bot Backend\" et annonce sa pile technique. Faute de dépôt de code et de page produit publique accessibles, le périmètre fonctionnel précis (canal d'échange, domaine métier, audience) n'est pas observable. Ce qui est attesté, c'est un choix d'architecture clair pour le contexte d'un développeur basé à Abidjan : viser un backend léger, rapide et peu coûteux à exploiter, en s'appuyant sur une inférence LLM à faible latence (Groq) plutôt que sur des modèles plus lents ou plus chers, un critère pertinent quand la bande passante et le budget sont des contraintes de terrain.",
    "architectureSummary": "L'élément réellement observable est un service HTTP unique déployé sur Vercel, qui répond sur la racine par un payload JSON de statut (\"status\": \"ok\", \"service\": \"Wouri Bot Backend\", \"version\": \"1.0.0\", \"stack\": \"Bun + Hono + TypeScript + Groq + Supabase\", \"uptime\": ...) et sur /health par un statut de santé horodaté (\"status\": \"healthy\", \"timestamp\": ISO 8601). Les autres chemins testés (/whatsapp/webhook, /api/health) renvoient 404, ce qui indique l'absence d'interface web publique et un routage volontairement restreint. La pile annoncée décrit une architecture cohérente : un runtime Bun exécutant un serveur Hono en TypeScript, qui orchestre des appels d'inférence vers Groq (le LLM) et une persistance via Supabase (Postgres managé). L'exposé est un endpoint de santé sobre, typique d'un backend conçu pour être appelé par un client ou un canal de messagerie plutôt que consulté par un navigateur. Les composants Groq et Supabase sont des services externes managés, choix qui réduit l'opérationnel côté serveur.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "client",
          "label": "Client / canal conversationnel (non observable)",
          "kind": "client"
        },
        {
          "id": "hono",
          "label": "API Hono (Bun + TypeScript) sur Vercel",
          "kind": "server"
        },
        {
          "id": "health",
          "label": "Endpoints / et /health (statut JSON)",
          "kind": "service"
        },
        {
          "id": "groq",
          "label": "Groq (inférence LLM)",
          "kind": "external"
        },
        {
          "id": "supabase",
          "label": "Supabase (Postgres managé)",
          "kind": "db"
        }
      ],
      "edges": [
        {
          "from": "client",
          "to": "hono",
          "label": "requêtes HTTP"
        },
        {
          "from": "hono",
          "to": "health",
          "label": "expose statut"
        },
        {
          "from": "hono",
          "to": "groq",
          "label": "appels d'inférence"
        },
        {
          "from": "hono",
          "to": "supabase",
          "label": "lecture / écriture"
        }
      ]
    },
    "decisions": [
      {
        "title": "Runtime Bun plutôt que Node.js classique",
        "choice": "Exécuter le backend sur Bun avec le framework Hono.",
        "rationale": "Bun et Hono offrent des temps de démarrage et un débit élevés pour une empreinte minimale, ce qui convient à un service léger et économique à héberger.",
        "tradeoff": "On gagne en performance et en simplicité, on sacrifie une partie de la maturité et de la compatibilité d'écosystème de Node.js, et on s'expose à des cas limites de support de librairies."
      },
      {
        "title": "Inférence LLM via Groq",
        "choice": "Déléguer le raisonnement à l'API Groq plutôt qu'à un modèle auto-hébergé.",
        "rationale": "Groq est réputé pour sa très faible latence d'inférence, atout pour une expérience conversationnelle fluide même quand la bande passante du client est limitée.",
        "tradeoff": "On gagne en rapidité et on évite le coût d'infrastructure GPU, on sacrifie la maîtrise totale du modèle et on introduit une dépendance à un fournisseur externe et à sa tarification."
      },
      {
        "title": "Supabase comme base de données managée",
        "choice": "Persistance sur Supabase (Postgres managé) plutôt qu'une base auto-administrée.",
        "rationale": "Supabase fournit Postgres, authentification et API prêtes à l'emploi, ce qui accélère la livraison et réduit la charge d'exploitation pour une petite équipe.",
        "tradeoff": "On gagne en vitesse de mise en place et en services intégrés, on accepte une dépendance fournisseur et des limites de personnalisation de l'infrastructure."
      },
      {
        "title": "Déploiement serverless sur Vercel",
        "choice": "Héberger le backend sur Vercel plutôt que sur un serveur dédié.",
        "rationale": "Le déploiement serverless supprime l'administration serveur : le build se fait en CI, l'exécution est managée.",
        "tradeoff": "On gagne en simplicité opérationnelle et en scalabilité automatique, on accepte les contraintes du modèle serverless (cold starts, limites d'exécution) et le couplage à la plateforme."
      }
    ],
    "challenges": [
      {
        "problem": "Garantir une latence conversationnelle acceptable dans un contexte de connexion contrainte.",
        "solution": "Choix d'une pile à faible surcharge (Bun + Hono) couplée à une inférence Groq optimisée pour la vitesse, afin de minimiser le temps de réponse de bout en bout."
      },
      {
        "problem": "Maintenir un coût d'exploitation et une charge opérationnelle minimes pour un projet porté par une petite structure.",
        "solution": "Recours à des services managés (Groq pour le LLM, Supabase pour la base, Vercel pour l'hébergement) qui évitent l'auto-hébergement de GPU et de serveurs, conformément à une approche budget-first."
      },
      {
        "problem": "Offrir une supervision simple de l'état du service en production.",
        "solution": "Exposition d'endpoints de statut sobres (/ et /health) renvoyant version, pile et horodatage, permettant un monitoring externe sans surface d'attaque inutile (les autres chemins renvoient 404)."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": null,
    "links": {
      "live": "https://wouri-ashen.vercel.app",
      "github": ""
    }
  },
  {
    "slug": "byoma",
    "title": "Les Résidences BYOMA, plateforme de réservation en temps réel pour résidences meublées à Abidjan",
    "oneLiner": "Une proposition spontanée : un site de réservation premium pour des résidences meublées de Cocody, où la disponibilité de chaque studio est calculée en temps réel et où un moteur anti-chevauchement rend la double-réservation impossible par construction.",
    "role": "Proposition spontanée conçue et développée de bout en bout chez African Digit Consulting : modèle de données Convex, moteur de disponibilité temps réel, workflow de réservation et de validation, design system de marque (serif de luxe, doré).",
    "year": "2026",
    "status": "dev",
    "stack": [
      "TanStack Start v1.121",
      "React 19",
      "Vite 7",
      "Convex (DB temps réel)",
      "Better Auth (admin uniquement)",
      "Tailwind v4",
      "GSAP 3.15 + @gsap/react",
      "ScrollTrigger",
      "Fraunces + Hanken Grotesk",
      "TypeScript",
      "Vercel"
    ],
    "context": "Les Résidences BYOMA sont des résidences meublées situées à Angré Djomi (Cocody, Abidjan), louées à la nuitée en trois catégories (Studio Standard à 25 000 FCFA, Studio Premium à 45 000 FCFA, Appartement 2 pièces Premium à 60 000 FCFA par tranche de 24 h). Comme beaucoup d'acteurs de l'hôtellerie de proximité en Côte d'Ivoire, l'établissement n'avait pas de présence digitale dédiée : la réservation se faisait par téléphone, WhatsApp et Facebook, sans visibilité publique des disponibilités et avec un risque permanent de double-réservation géré de tête. La proposition spontanée vise à transformer cette présence en un site premium qui rassure une clientèle exigeante (cadres en déplacement, diaspora de passage), expose les disponibilités en temps réel et capte les demandes de réservation, tout en restant léger sur des connexions mobiles contraintes.",
    "architectureSummary": "L'application est un monolithe SSR TanStack Start (React 19, Vite 7) déployé sur Vercel, adossé à un backend unique Convex qui sert à la fois de base de données et de couche temps réel. Le modèle métier tient en quatre tables : studios (catégorie, prix à la nuitée, équipements, photos, ordre d'affichage), reservations (client, dates d'arrivée et de départ, nombre de nuits, prix total, statut pending / confirmed / refused / cancelled), blockedPeriods (indisponibilités commerciales hors réservation : entretien, mise hors-ligne) et admins. La pièce centrale est une query de disponibilité, checkAvailability, qui détecte tout chevauchement de dates pour un studio donné via la condition d'intersection d'intervalles (checkIn < checkOut demandé ET checkOut > checkIn demandé), en ignorant les réservations refusées ou annulées et en croisant les périodes bloquées ; getBookedDates alimente un calendrier côté client. Les abonnements temps réel de Convex propagent instantanément à tous les visiteurs la prise d'un créneau ou la confirmation d'une réservation par l'admin, sans rafraîchissement. Better Auth est réservé à l'authentification de l'administrateur (validation des demandes, blocage de périodes) : la réservation publique reste sans compte, pour ne pas ajouter de friction à la conversion. Au-dessus de ce socle, le site public est entièrement composé dans un langage de marque éditorial (Fraunces en titrage, Hanken Grotesk en texte, palette espresso / ivoire / doré, navbar flottante qui se condense au scroll, hero en fondu enchaîné) et habillé d'une couche de mouvement GSAP réglée pour rester sobre : un petit module de primitives (Reveal, Stagger, Parallax) appuyé sur ScrollTrigger pilote des révélations à l'apparition, une cascade des cartes de résidences et une parallaxe légère limitée au desktop, chaque effet partant d'un état de base visible pour rester lisible sans JavaScript et sous prefers-reduced-motion.",
    "architectureDiagram": {
      "nodes": [
        {
          "id": "visitor",
          "label": "Visiteur (mobile-first, Abidjan / diaspora)",
          "kind": "client"
        },
        {
          "id": "start",
          "label": "App TanStack Start SSR (Vercel)",
          "kind": "server"
        },
        {
          "id": "availability",
          "label": "checkAvailability (moteur anti-chevauchement)",
          "kind": "service"
        },
        {
          "id": "convex",
          "label": "Convex (studios, reservations, blockedPeriods, temps réel)",
          "kind": "db"
        },
        {
          "id": "admin",
          "label": "Console admin (validation, blocage de périodes)",
          "kind": "client"
        },
        {
          "id": "auth",
          "label": "Better Auth (admin uniquement)",
          "kind": "service"
        },
        {
          "id": "contact",
          "label": "Téléphone / WhatsApp / Facebook (canaux existants)",
          "kind": "external"
        }
      ],
      "edges": [
        {
          "from": "visitor",
          "to": "start",
          "label": "HTTP/SSR"
        },
        {
          "from": "start",
          "to": "convex",
          "label": "useQuery temps réel (studios, dispo)"
        },
        {
          "from": "start",
          "to": "availability",
          "label": "vérifie les dates demandées"
        },
        {
          "from": "availability",
          "to": "convex",
          "label": "détection de chevauchement"
        },
        {
          "from": "visitor",
          "to": "convex",
          "label": "demande de réservation (pending)"
        },
        {
          "from": "admin",
          "to": "auth",
          "label": "connexion admin"
        },
        {
          "from": "admin",
          "to": "convex",
          "label": "confirme / refuse / bloque"
        },
        {
          "from": "visitor",
          "to": "contact",
          "label": "repli WhatsApp / appel"
        }
      ]
    },
    "decisions": [
      {
        "title": "Disponibilité en temps réel via Convex plutôt qu'un formulaire e-mail",
        "choice": "Modéliser les réservations et les indisponibilités dans Convex et exposer les disponibilités en direct, au lieu d'un simple formulaire de contact qui laisse l'arbitrage des dates entièrement à l'humain.",
        "rationale": "La valeur perçue par une clientèle premium tient à la promesse « ce que vous voyez est réservable » : afficher des créneaux réellement libres et synchronisés évite les allers-retours et les déceptions. Les abonnements temps réel de Convex donnent ce comportement nativement, sans WebSocket à câbler.",
        "tradeoff": "On introduit un backend stateful et un modèle de données à maintenir là où une page vitrine statique aurait suffi pour une simple présence ; en contrepartie, le site devient un vrai outil de réservation et non une plaquette."
      },
      {
        "title": "Périodes bloquées séparées des réservations",
        "choice": "Une table blockedPeriods dédiée aux indisponibilités commerciales (entretien, mise hors-ligne), distincte des reservations client.",
        "rationale": "Une indisponibilité d'entretien n'est pas une réservation : la séparer évite de polluer l'historique commercial et les statistiques, tout en étant prise en compte de la même façon dans le calcul de disponibilité.",
        "tradeoff": "Le moteur de disponibilité doit interroger et fusionner deux sources de chevauchement au lieu d'une, au profit d'une sémantique métier claire."
      },
      {
        "title": "Réservation publique sans compte, Better Auth réservé à l'admin",
        "choice": "Les visiteurs réservent sans création de compte (demande en statut pending) ; seul l'administrateur s'authentifie via Better Auth pour valider, refuser ou bloquer.",
        "rationale": "Chaque champ et chaque étape d'inscription réduit la conversion ; pour une résidence, la friction doit être minimale côté client, la sécurité ne concernant que le back-office.",
        "tradeoff": "Pas de compte client signifie pas d'historique self-service ni de réservation instantanément confirmée : toute demande passe par une validation humaine (workflow pending → confirmed / refused)."
      },
      {
        "title": "Mouvement GSAP fail-safe, sous-jacent au design plutôt que décoratif",
        "choice": "Centraliser toute l'animation dans un module de trois primitives (Reveal, Stagger, Parallax) sur ScrollTrigger, où chaque effet anime uniquement transform et opacity à partir d'un état de base déjà visible (fromTo avec immediateRender:false), au lieu de cacher le contenu en attendant le scroll.",
        "rationale": "Sur des connexions mobiles contraintes et en SSR, un contenu masqué par défaut qui dépend d'un trigger JavaScript est un risque d'écran vide ; partir d'un état visible garantit que la page reste lisible sans JavaScript, sous prefers-reduced-motion, et même si un ScrollTrigger ne se déclenche pas. Animer seulement transform et opacity garde l'effet sur le compositeur, sans reflow.",
        "tradeoff": "Le module ajoute une dépendance (GSAP) et de la discipline d'intégration (retirer toute classe .reveal du markup interne pour éviter la double animation) là où de simples transitions CSS auraient suffi ; en échange, le mouvement est cohérent, testable et toujours dégradable proprement."
      },
      {
        "title": "Parallaxe limitée au desktop, grille d'atouts laissée statique",
        "choice": "Réserver la parallaxe (sur la citation du bandeau cinéma uniquement, pas le fond) au desktop via matchMedia, n'animer en cascade que les cartes de résidences, et laisser volontairement statiques la grille des huit atouts et les blocs déjà au-dessus de la ligne de flottaison.",
        "rationale": "Une parallaxe sur mobile est coûteuse et souvent saccadée, et tout animer vire à l'effet catalogue générique ; restreindre le mouvement aux moments à fort impact (révélation des sections, cascade des cartes, titre éditorial du pied de page) donne une signature premium sobre plutôt qu'un empilement d'animations.",
        "tradeoff": "Le comportement diffère entre desktop et mobile, ce qui demande de raisonner par point de rupture (gate matchMedia min-width 768px) plutôt qu'un effet unique partout."
      }
    ],
    "challenges": [
      {
        "problem": "Rendre la double-réservation d'un même studio sur des dates qui se chevauchent impossible, alors que les demandes arrivent de façon concurrente.",
        "solution": "Une query de disponibilité fondée sur la condition d'intersection d'intervalles (checkIn < checkOut ET checkOut > checkIn), excluant les statuts refused et cancelled et croisant les périodes bloquées, doublée d'une revérification du chevauchement à l'intérieur de la mutation de création pour fermer la fenêtre de concurrence entre l'affichage et la confirmation."
      },
      {
        "problem": "Distinguer une indisponibilité d'entretien d'une vraie réservation tout en les traitant uniformément côté calendrier.",
        "solution": "Modèle à deux tables (reservations et blockedPeriods) avec un calcul de disponibilité qui agrège les deux sources de chevauchement, et un endpoint getBookedDates qui renvoie au client une vue unifiée des dates indisponibles pour le calendrier."
      },
      {
        "problem": "Projeter une image premium crédible sur des connexions mobiles contraintes, pour une clientèle exigeante.",
        "solution": "Design system de marque sobre (Fraunces en titrage éditorial, Hanken Grotesk en texte, palette espresso / ivoire / doré, navbar flottante qui se condense au scroll, hero en fondu enchaîné) servi en SSR par TanStack Start, avec photos optimisées par catégorie de studio et mise en page mobile-first."
      },
      {
        "problem": "Ajouter une couche d'animation premium sans risquer l'écran blanc en SSR ni dégrader l'expérience sur mobile et sous prefers-reduced-motion.",
        "solution": "Un module de primitives GSAP (Reveal, Stagger, Parallax) enregistré une seule fois, posé sur le hook useGSAP qui n'évalue le mouvement qu'après l'hydratation. Chaque animation part d'un état de base visible (fromTo, immediateRender:false) et n'agit que sur transform et opacity ; la parallaxe est encapsulée dans un matchMedia desktop, donc rien n'est posé sur mobile ni en mouvement réduit. Les classes de révélation du markup interne ont été retirées pour éviter toute double animation, le build SSR passant sans erreur."
      }
    ],
    "results": [],
    "confidential": false,
    "headlineMetric": {
      "label": "catégories de résidences modélisées (25 000 à 60 000 FCFA/24 h)",
      "value": "3"
    },
    "links": {
      "github": "https://github.com/James10192/byoma-website"
    }
  }
]

export const publicCaseStudies = caseStudies.filter((c) => !c.confidential)

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
