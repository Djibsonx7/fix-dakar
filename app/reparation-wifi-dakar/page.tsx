import WifiRepairClient from './WifiRepairClient';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata = {
  title: 'FIX Dépannage Dakar | Réparation wifi et réseau à Dakar',
  description:
    'Réparation wifi à Dakar : zone morte, coupures fréquentes, installation routeur, extension de couverture ou configuration Starlink. Contact rapide WhatsApp avec FIX Dakar.',
  keywords: [
    'réparation wifi Dakar',
    'dépannage wifi Dakar',
    'installation routeur Dakar',
    'réparation réseau internet Dakar',
    'technicien wifi Dakar',
    'extension wifi Dakar',
    'Starlink Dakar',
    'FIX Dakar wifi',
  ],
  alternates: {
    canonical: '/reparation-wifi-dakar',
  },
  openGraph: {
    title: 'FIX Dépannage Dakar | Réparation wifi et réseau à Dakar',
    description:
      'Wifi faible, coupures fréquentes, nouveau routeur ou configuration Starlink ? Contact rapide WhatsApp pour dépannage wifi et réseau à Dakar.',
    url: `${siteUrl}/reparation-wifi-dakar`,
    siteName: 'FIX Dépannage Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIX Dépannage Dakar | Réparation wifi et réseau à Dakar',
    description:
      'Dépannage wifi et réseau à Dakar : zone morte, coupures, installation routeur ou Starlink. Contact WhatsApp rapide.',
  },
};

export default function WifiRepairPage() {
  return <WifiRepairClient />;
}
