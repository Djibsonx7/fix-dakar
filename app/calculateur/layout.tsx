import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculateur de prix | FIX Dépannage Dakar',
  description: 'Simulateur interne FIX de calcul de la main-d’œuvre, des commissions et des négociations.',
  robots: { index: false, follow: false },
};

export default function CalculateurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
