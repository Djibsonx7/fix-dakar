import AutoRepairClient from './AutoRepairClient';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata = {
  title: 'Remorquage & Dépannage Auto à Dakar | SOS Batterie – FIX',
  description:
    'Remorquage voiture et dépannage auto à Dakar : véhicule immobilisé, batterie à plat ou démarrage. Tarif confirmé avant déplacement selon disponibilité.',
  keywords: [
    'dépannage auto Dakar',
    'remorquage Dakar',
    'remorquage voiture Dakar',
    'dépanneuse Dakar',
    'panne batterie voiture Dakar',
    'dépannage batterie voiture Dakar',
    'voiture ne démarre pas Dakar',
    'FIX Dakar auto',
  ],
  alternates: {
    canonical: '/depannage-auto-dakar',
  },
  openGraph: {
    title: 'Remorquage & Dépannage Auto à Dakar | SOS Batterie – FIX',
    description:
      'Véhicule immobilisé ou batterie à plat à Dakar ? FIX recherche un partenaire disponible pour remorquage ou démarrage et confirme le tarif avant déplacement.',
    url: `${siteUrl}/depannage-auto-dakar`,
    siteName: 'FIX Dépannage Dakar',
    type: 'website',
    locale: 'fr_SN',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630, alt: 'FIX Dépannage Auto Dakar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remorquage & Dépannage Auto à Dakar | SOS Batterie – FIX',
    description:
      'Remorquage et SOS batterie/démarrage à Dakar. Intervention selon disponibilité, tarif confirmé avant déplacement.',
    images: ['/assets/og-image.png'],
  },
};

export default function AutoRepairPage() {
  return <AutoRepairClient />;
}
