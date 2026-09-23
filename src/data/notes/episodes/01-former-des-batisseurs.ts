import type { PublishedNote } from '../types'

export const formerDesBatisseurs: PublishedNote = {
  slug: 'former-des-batisseurs',
  episode: 1,
  status: 'publie',
  date: '2026-07-14',
  title: 'On forme des développeurs. Mais forme-t-on des bâtisseurs ?',
  thesis:
    "Le talent technique est nécessaire, mais l'écosystème ne progresse vraiment que le jour où une compétence devient un produit, un revenu, une équipe et un actif durable.",
  audience:
    "Développeurs, formateurs et fondateurs d'Afrique francophone qui veulent dépasser le stade de la mission facturée.",
  chapo:
    "Nous n'avons jamais eu autant de talents techniques à Abidjan, Dakar, Lomé ou Douala. Et pourtant l'écosystème produit encore peu de produits, peu de revenus récurrents, peu d'actifs. Je ne crois pas que le problème soit la compétence.",
  sections: [
    {
      heading: "Ce qu'on apprend, et ce qu'on n'apprend pas",
      paragraphs: [
        "En trois ans, j'ai vu passer beaucoup de jeunes développeurs. Le niveau technique monte, et il monte vite. React, Laravel, Python, les modèles d'IA, Docker, le déploiement : tout cela s'apprend, et cela s'apprend bien. Les chaînes YouTube, la documentation, les bootcamps et les communautés locales font un travail remarquable, il faut le dire clairement.",
        "Ce qu'on n'apprend nulle part, c'est le reste. Choisir un problème qui vaut la peine d'être résolu. Aller parler à dix personnes qui vivent ce problème tous les jours. Fixer un prix, et le tenir. Facturer. Gérer un client mécontent un vendredi soir. Recruter quelqu'un de meilleur que soi sur un sujet précis. Maintenir un produit en production pendant deux ans sans y laisser sa santé.",
        "On sort de formation avec un certificat et un portfolio. On ne sort pas avec un client.",
      ],
    },
    {
      heading: 'Le plafond invisible',
      paragraphs: [
        "Le schéma que je croise le plus souvent est toujours le même : on apprend, on décroche une certification, on trouve une mission, on construit le produit d'un autre. C'est honorable, c'est formateur, et cela paie les factures. Mais l'horizon s'arrête là.",
        "Individuellement, ça marche. Collectivement, ça bloque. Parce qu'à la fin de l'année, l'écosystème a produit beaucoup d'heures facturées et très peu d'actifs. Un actif, c'est un produit qui continue de générer de la valeur pendant que tu dors. Une base de clients. Une marque que quelqu'un cite sans que tu sois dans la pièce. Un savoir-faire industrialisé. Une équipe qui sait livrer sans toi.",
        "Le jour où un développeur talentueux change de pays ou de secteur, il emporte tout avec lui, parce que rien n'a été capitalisé. On recommence à zéro, et on appelle ça un problème de fuite des cerveaux. C'est d'abord un problème d'accumulation.",
      ],
    },
    {
      heading: 'La chaîne : compétence, revenu, équipe, produit',
      paragraphs: [
        "Je crois à une chaîne très simple, et je crois qu'elle se casse presque toujours au même maillon.",
        "Une compétence devient un revenu. Ce revenu finance une équipe, même minuscule : deux personnes suffisent au début. Cette équipe construit un produit utile à un marché réel. Ce produit génère un revenu récurrent, qui finance à son tour la maintenance, la recherche, l'infrastructure et les salaires du mois prochain.",
        "Chez nous, la chaîne casse entre le premier et le deuxième maillon. Le revenu existe, mais il reste strictement individuel. Il ne finance jamais rien d'autre que la vie de celui qui l'a gagné. Résultat : pas d'équipe, donc pas de produit, donc pas de récurrence, donc retour à la case mission, année après année.",
        "La souveraineté numérique dont tout le monde parle commence exactement là. Pas dans un discours, pas dans un centre de données inauguré avec des ciseaux dorés. Dans le moment très concret où une compétence locale devient un revenu, et où ce revenu finance une équipe locale qui construit un produit dont un marché local a réellement besoin.",
      ],
    },
    {
      heading: "Ce que ça change dans la façon d'apprendre",
      paragraphs: [
        "Si on prend cette chaîne au sérieux, la formation change de forme. On n'apprend plus React pour savoir React. On apprend React pour livrer quelque chose à quelqu'un qui l'attend. La première ligne de code n'arrive pas au premier cours, elle arrive après la première conversation avec un utilisateur.",
        "Concrètement, cela veut dire poser trois questions avant d'ouvrir l'éditeur :",
      ],
      bullets: [
        "Qui a ce problème, et combien lui coûte-t-il aujourd'hui, en argent ou en heures ?",
        "Combien serait-il prêt à payer pour ne plus l'avoir, et à qui paie-t-il déjà pour cela ?",
        "Qu'est-ce qui fera qu'il ouvrira encore mon outil le mois prochain ?",
      ],
    },
    {
      heading: 'Ce que je ne dis pas',
      paragraphs: [
        "Je ne dis pas que tout le monde doit créer une entreprise. Beaucoup d'excellents développeurs n'ont aucune envie d'être entrepreneurs, et ils ont raison : c'est un autre métier, avec ses propres épreuves et ses propres nuits blanches.",
        "Je dis qu'il manque, dans nos parcours, une étape entre « je sais coder » et « je construis quelque chose qui dure ». Cette étape peut se vivre en salarié, dans une structure qui construit son propre produit. Elle peut se vivre à trois, entre amis, le soir. Elle peut se vivre dans une agence qui décide de garder un produit à elle en plus des missions clients. Ce qui compte, c'est de passer de l'exécution à la construction.",
      ],
    },
    {
      heading: 'Ce que je fais de mon côté',
      paragraphs: [
        "Chez African Digit Consulting, on a fait ce pari il y a trois ans. Un produit à nous, vendu à des écoles, maintenu par nous, avec les vraies contraintes : les rôles et les permissions, les migrations de données saisies avant nous, le support un vendredi soir, les exports que l'administration réclame dans un format précis.",
        "Aujourd'hui, plus de 7 600 étudiants et 5 établissements en dépendent. Ce chiffre ne m'impressionne pas pour la vitrine, il m'impressionne pour ce qu'il a coûté à apprendre : ce que pèse réellement un logiciel dont d'autres dépendent. Aucune formation ne me l'aurait appris.",
        "C'est inconfortable. C'est aussi la seule chose que je referais sans hésiter.",
      ],
    },
  ],
  debate:
    "Selon toi, quel est le principal frein : la compétence, le capital, l'accès au marché ou la culture produit ?",
}
