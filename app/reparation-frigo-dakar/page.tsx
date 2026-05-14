import FrigoRepairClient from './FrigoRepairClient';

export const metadata = {
  title: 'Réparation frigo Dakar | Dépannage réfrigérateur - FIX Dakar',
  description:
    'Réparation frigo à Dakar : panne de froid, fuite, bruit anormal, congélateur ou réfrigérateur. Contact rapide WhatsApp avec FIX Dakar.',
  alternates: {
    canonical: '/reparation-frigo-dakar',
  },
};

export default function FrigoRepairPage() {
  return <FrigoRepairClient />;
}
