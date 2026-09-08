export type ProjectStatus = 'Concept Project' | 'Client Work'

export type Project = {
  id: string
  number: string
  title: string
  category: string
  services: string
  status: ProjectStatus
  description: string
  /** Case study path */
  href: string
  /**
   * Live demo URL.
   * TODO: Replace placeholder when the production demo URL is ready.
   * Currently points to the in-repo concept demo.
   */
  liveDemoHref: string
  coverImage: string
  coverAlt: string
  gallery: { src: string; alt: string }[]
  industry: string
  servicesDetail: string
  concept: string
  approach: string
  built: string[]
}

/**
 * Portfolio projects shown in Selected Work.
 * Add future entries (Fitness / Gym, Fashion / E-commerce) here —
 * the homepage section maps over `projects` automatically.
 */
export const projects: Project[] = [
  {
    id: 'noir-and-bean',
    number: '01',
    title: 'NOIR & BEAN',
    category: 'Hospitality / Café',
    services: 'Web Design · Development · UX',
    status: 'Concept Project',
    description:
      'A premium digital experience for a modern specialty café — designed around atmosphere, discovery, menu exploration and reservations.',
    href: '/work/noir-and-bean',
    // Exact original HTML demo (served raw — not wrapped in HNA styles)
    liveDemoHref: '/noir-and-bean',
    coverImage:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'NOIR & BEAN — specialty coffee hero visual',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
        alt: 'NOIR & BEAN homepage — coffee hero atmosphere',
      },
      {
        src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
        alt: 'NOIR & BEAN café interior and seating',
      },
      {
        src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80',
        alt: 'NOIR Signature Latte — product moment',
      },
    ],
    industry: 'Hospitality / Café',
    servicesDetail: 'Web Design / Development / UX / Digital Experience',
    concept:
      'Create a premium digital identity for a modern specialty café.',
    approach:
      'Focus on strong typography, warm editorial visuals, menu discovery, mobile usability and clear conversion paths.',
    built: [
      'Responsive café website',
      'Interactive filtered menu',
      'Reservation experience',
      'Location/visit section',
      'Mobile navigation',
      'Motion and micro-interactions',
    ],
  },
  // Future:
  // { id: 'fitness-gym', number: '02', title: '...', category: 'Fitness / Gym', ... }
  // { id: 'fashion-commerce', number: '03', title: '...', category: 'Fashion / E-commerce', ... }
]

export function getProject(id: string) {
  return projects.find((p) => p.id === id)
}
