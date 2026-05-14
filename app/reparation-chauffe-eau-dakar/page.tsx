import ChauffeEauRepairClient from './ChauffeEauRepairClient';

export const metadata = {
  title: 'Réparation chauffe-eau Dakar | Dépannage chauffe-eau - FIX Dakar',
  description:
    'Réparation chauffe-eau à Dakar : ne chauffe plus, eau tiède, fuite, disjonction, thermostat ou résistance. Contact rapide WhatsApp avec FIX Dakar.',
  alternates: {
    canonical: '/reparation-chauffe-eau-dakar',
  },
};

export default function ChauffeEauRepairPage() {
  return <ChauffeEauRepairClient />;
}
