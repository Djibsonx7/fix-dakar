import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'FIX Dakar | Réparation machine à laver à Dakar',
  description:
    'FIX Dakar intervient pour la réparation de machine à laver, dépannage électroménager et assistance WhatsApp rapide à Dakar.',
  keywords: [
    'réparation machine à laver Dakar',
    'dépannage machine à laver Dakar',
    'technicien lave linge Dakar',
    'technicien machine à laver Dakar',
    'réparation lave-linge Dakar',
    'FIX Dakar',
    'réparation électroménager Dakar',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FIX Dakar | Réparation machine à laver à Dakar',
    description: 'Service moderne de dépannage machine à laver à Dakar. Assistance WhatsApp rapide.',
    url: siteUrl,
    siteName: 'FIX Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIX Dakar | Réparation machine à laver à Dakar',
    description: 'Diagnostic clair, intervention rapide et assistance WhatsApp pour vos pannes de lave-linge à Dakar.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'FIX Dépannage Dakar',
  url: siteUrl,
  telephone: '+221788208080',
  areaServed: {
    '@type': 'City',
    name: 'Dakar',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  description:
    'Service de dépannage et de mise en relation pour réparation de machine à laver et électroménager à Dakar.',
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Réparation machine à laver à Dakar',
      serviceType: 'Dépannage électroménager',
      areaServed: 'Dakar',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-SN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
