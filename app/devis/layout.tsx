import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIX Dépannage Dakar | Devis digital',
  description: 'Générateur de devis digital FIX Dépannage Dakar.',
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
