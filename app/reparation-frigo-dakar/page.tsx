import FrigoRepairClient from './FrigoRepairClient';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata = {
  title: 'FIX Dépannage Dakar | Réparation frigo à Dakar',
  description:
    'Réparation frigo à Dakar : panne de froid, fuite, bruit anormal, congélateur ou réfrigérateur. Contact rapide WhatsApp avec FIX Dakar.',
  keywords: [
    'réparation frigo Dakar',
    'dépannage frigo Dakar',
    'réparation réfrigérateur Dakar',
    'frigo ne refroidit plus Dakar',
    'dépannage congélateur Dakar',
    'technicien frigo Dakar',
    'réparateur réfrigérateur Dakar',
    'FIX Dakar frigo',
  ],
  alternates: {
    canonical: '/reparation-frigo-dakar',
  },
  openGraph: {
    title: 'FIX Dépannage Dakar | Réparation frigo à Dakar',
    description:
      'Frigo qui ne refroidit plus, fuite, bruit anormal ou congélateur en panne ? Contact rapide WhatsApp pour dépannage frigo à Dakar.',
    url: `${siteUrl}/reparation-frigo-dakar`,
    siteName: 'FIX Dépannage Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIX Dépannage Dakar | Réparation frigo à Dakar',
    description:
      'Dépannage frigo à Dakar : panne de froid, fuite, bruit ou congélateur. Contact WhatsApp rapide.',
  },
};

export default function FrigoRepairPage() {
  return <FrigoRepairClient />;
}
