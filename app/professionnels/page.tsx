import ProfessionnelsClient from './ProfessionnelsClient';

const siteUrl = 'https://fix.fenixfuz.com';

export const metadata = {
  title: 'Dépannage pour professionnels à Dakar | FIX Pro',
  description:
    'Pressings, restaurants, bureaux, logements meublés : un seul contact pour vos pannes de froid, clim et machines. Devis écrit, facture à votre entreprise.',
  alternates: {
    canonical: '/professionnels',
  },
  openGraph: {
    title: 'Dépannage pour professionnels à Dakar | FIX Pro',
    description:
      'Pressings, restaurants, bureaux, logements meublés : un seul contact pour vos pannes de froid, clim et machines. Devis écrit, facture à votre entreprise.',
    url: `${siteUrl}/professionnels`,
    siteName: 'FIX Dépannage Dakar',
    type: 'website',
    locale: 'fr_SN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dépannage pour professionnels à Dakar | FIX Pro',
    description:
      'Pressings, restaurants, bureaux, logements meublés : un seul contact pour vos pannes de froid, clim et machines.',
  },
};

export default function ProfessionnelsPage() {
  return <ProfessionnelsClient />;
}
