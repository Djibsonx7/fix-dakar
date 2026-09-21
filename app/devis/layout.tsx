import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIX Dépannage Dakar | Fiche d’intervention',
  description: 'Générateur de fiche d’intervention FIX Dépannage Dakar.',
  robots: { index: false, follow: false },
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
