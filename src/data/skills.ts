export type SkillGroup = {
  title: string
  icon: 'server' | 'monitor' | 'database' | 'git' | 'globe' | 'package'
  tags: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend',
    icon: 'server',
    tags: ['Laravel', 'PHP', 'Python', 'Java', 'Spring Boot', 'Flask', 'REST API', 'Webservices'],
  },
  {
    title: 'Frontend',
    icon: 'monitor',
    tags: ['React', 'Next.js', 'TanStack Start', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Alpine.js', 'Blade'],
  },
  {
    title: 'Bases de données',
    icon: 'database',
    tags: ['MySQL', 'PostgreSQL', 'Oracle', 'MongoDB', 'Supabase', 'Prisma', 'Redis'],
  },
  {
    title: 'DevOps & Outils',
    icon: 'git',
    tags: ['Git', 'GitHub', 'GitLab', 'Vercel', 'Docker', 'Slack', 'Trello', 'Claude Code'],
  },
  {
    title: 'Réseau & Infra',
    icon: 'globe',
    tags: ['Infrastructure réseau', 'Maintenance hardware', 'Assistance technique', 'Active Directory'],
  },
  {
    title: 'CMS & Services',
    icon: 'package',
    tags: ['Sanity CMS', 'Sanctum', 'CinetPay', 'Lemon Squeezy', 'Resend', 'DomPDF', 'PostHog'],
  },
]

export const techMarquee = [
  'Laravel', 'React', 'Next.js', 'TypeScript', 'TanStack', 'Tailwind CSS',
  'PostgreSQL', 'MySQL', 'Python', 'Java', 'Supabase', 'Prisma',
  'Vercel', 'Sanity', 'Redis', 'Docker', 'shadcn/ui', 'Motion',
]
