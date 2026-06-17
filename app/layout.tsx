import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const siteUrl = 'https://fix.fenixfuz.com';
const gaMeasurementId = 'G-GZTJW5JJFF';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'FIX Dépannage Dakar | Réparation machine à laver à Dakar',
  description:
    'FIX Dakar intervient pour la réparation de machine à laver, dépannage électroménager et assistance WhatsApp rapide à Dakar.',
  verification: {
    google: 'tAaWXb7_C-KS5YpIOggnimhWnZdzKFt8mFF75hw4SX8',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FIX Dépannage Dakar | Réparation machine à laver à Dakar',
    description: 'FIX Dakar intervient pour la réparation de machine à laver, dépannage électroménager et assistance WhatsApp rapide à Dakar.',
    url: 'https://fix.fenixfuz.com',
    siteName: 'FIX Dépannage Dakar',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }],
    locale: 'fr_SN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og-image.png'],
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        <Script id="conversion-click-tracking" strategy="afterInteractive">
          {`
            document.addEventListener('click', function (event) {
              var target = event.target;
              if (!target || !target.closest) return;

              var link = target.closest('[data-conversion]');
              if (!link) return;

              var conversionLocation = link.getAttribute('data-conversion');
              var href = link.getAttribute('href') || '';
              var eventName = href.indexOf('tel:') === 0 ? 'phone_click' : 'whatsapp_click';

              if (typeof window.gtag === 'function') {
                window.gtag('event', eventName, {
                  conversion_location: conversionLocation,
                  link_url: href,
                  page_location: window.location.href,
                  transport_type: 'beacon'
                });
              }
            });
          `}
        </Script>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
