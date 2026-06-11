import ChauffeEauRepairClient from './ChauffeEauRepairClient';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata = {
  title: 'Réparation chauffe-eau Dakar | Dépannage chauffe-eau - FIX Dakar',
  description:
    'Réparation chauffe-eau à Dakar : ne chauffe plus, eau tiède, fuite, disjonction, thermostat ou résistance. Contact rapide WhatsApp avec FIX Dakar.',
  keywords: [
    'réparation chauffe-eau Dakar',
    'dépannage chauffe-eau Dakar',
    'chauffe-eau ne chauffe plus Dakar',
    'réparation chauffe eau électrique Dakar',
    'technicien chauffe-eau Dakar',
    'chauffe-eau fuite disjonction Dakar',
    'FIX Dakar chauffe-eau',
    'dépannage électroménager Dakar',
  ],
  alternates: {
    canonical: '/reparation-chauffe-eau-dakar',
  },
  openGraph: {
    title: 'Réparation chauffe-eau à Dakar | FIX Dakar',
    description:
      'Chauffe-eau qui ne chauffe plus, fuite, disjonction ou eau tiède ? Contact rapide WhatsApp pour dépannage chauffe-eau à Dakar.',
    url: `${siteUrl}/reparation-chauffe-eau-dakar`,
    siteName: 'FIX Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Réparation chauffe-eau à Dakar | FIX Dakar',
    description:
      'Dépannage chauffe-eau à Dakar : ne chauffe plus, eau tiède, fuite ou disjonction. Contact WhatsApp rapide.',
  },
};

export default function ChauffeEauRepairPage() {
  return <ChauffeEauRepairClient />;
}
