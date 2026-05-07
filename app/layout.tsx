import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FIX Dakar | Réparation machine à laver à Dakar',
  description:
    'FIX Dakar intervient pour la réparation de machine à laver, dépannage électroménager et assistance rapide à Dakar.',
  keywords: [
    'réparation machine à laver Dakar',
    'dépannage machine à laver Dakar',
    'technicien lave linge Dakar',
    'FIX Dakar',
    'réparation électroménager Dakar',
  ],
  openGraph: {
    title: 'FIX Dakar | Réparation machine à laver à Dakar',
    description: 'Service moderne de dépannage machine à laver à Dakar. Assistance WhatsApp rapide.',
    type: 'website',
    locale: 'fr_SN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
