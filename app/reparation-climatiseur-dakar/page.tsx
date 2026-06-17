import ClimatiseurRepairClient from './ClimatiseurRepairClient';

export const metadata = {
  title: 'FIX Dépannage Dakar | Réparation climatiseur à Dakar',
  description:
    "Réparation climatiseur à Dakar : clim qui ne refroidit plus, fuite d'eau, bruit, entretien ou dépannage climatisation. Contact rapide WhatsApp avec FIX Dakar.",
  keywords: [
    'réparation climatiseur Dakar',
    'dépannage climatiseur Dakar',
    'réparation climatisation Dakar',
    'dépannage clim Dakar',
    'technicien climatiseur Dakar',
    'entretien climatiseur Dakar',
    'clim qui ne refroidit plus Dakar',
    'FIX Dakar climatiseur',
  ],
  alternates: {
    canonical: '/reparation-climatiseur-dakar',
  },
  openGraph: {
    title: 'FIX Dépannage Dakar | Réparation climatiseur à Dakar',
    description:
      "Clim qui ne refroidit plus, fuite d'eau, bruit ou entretien ? Contact rapide WhatsApp pour dépannage climatiseur à Dakar.",
    url: 'https://fix.fenixfuz.com/reparation-climatiseur-dakar',
    siteName: 'FIX Dépannage Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIX Dépannage Dakar | Réparation climatiseur à Dakar',
    description:
      "Dépannage climatiseur à Dakar : clim qui ne refroidit plus, fuite, bruit ou entretien. Contact WhatsApp rapide.",
  },
};

export default function ClimatiseurRepairPage() {
  return <ClimatiseurRepairClient />;
}
