import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIX Dépannage Dakar | Facture',
  description: 'Générateur de facture FIX Dépannage Dakar.',
};

export default function FactureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
