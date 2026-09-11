'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const phone = '221788208080';
const displayPhone = '78 820 80 80';
const googleReviewsUrl = 'https://g.page/r/CcFvrzJsaYBnEAE';
const siteUrl = 'https://fix.fenixfuz.com';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const proMessage = "Bonjour FIX Pro, j'ai besoin d'un dépannage pour mon activité.";

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const icons = {
  washer: (
    <IconWrap>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="1.6" />
      <path d="M8 6.5h.01M11 6.5h.01" />
    </IconWrap>
  ),
  snowflake: (
    <IconWrap>
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
      <path d="M8 3.5l4 2 4-2M8 20.5l4-2 4 2M3 8.5l1 4-1 4M21 8.5l-1 4 1 4" />
    </IconWrap>
  ),
  key: (
    <IconWrap>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 6l2 2M14 9l2 2" />
    </IconWrap>
  ),
  building: (
    <IconWrap>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h1M8 11h1M8 15h1M15 7h1M15 11h1M15 15h1M10 21v-4h4v4" />
    </IconWrap>
  ),
  storefront: (
    <IconWrap>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </IconWrap>
  ),
  help: (
    <IconWrap>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 114.2 1.8c-.8.7-1.7 1.1-1.7 2.4" />
      <path d="M12 17h.01" />
    </IconWrap>
  ),
  fridge: (
    <IconWrap>
      <rect x="6" y="2.5" width="12" height="19" rx="1.5" />
      <path d="M6 10h12" />
      <path d="M9 5v3M9 13v3" />
    </IconWrap>
  ),
  ac: (
    <IconWrap>
      <rect x="3" y="6" width="18" height="7" rx="2" />
      <path d="M7 17c0 1-1 1-1 2M12 17c0 1-1 1-1 2M17 17c0 1-1 1-1 2" />
    </IconWrap>
  ),
  heater: (
    <IconWrap>
      <path d="M12 2c2 3-2 4-2 7a2 2 0 004 0c0-1-.5-1.5-.5-2.5" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
    </IconWrap>
  ),
  microwave: (
    <IconWrap>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <rect x="5" y="8.5" width="10" height="7" rx="1" />
      <path d="M18 10h.01M18 13h.01" />
    </IconWrap>
  ),
  wifi: (
    <IconWrap>
      <path d="M4 9a13 13 0 0116 0" />
      <path d="M7.5 12.5a8 8 0 019 0" />
      <path d="M10.5 16a3.5 3.5 0 013 0" />
      <path d="M12 19h.01" />
    </IconWrap>
  ),
};

const verticals = [
  {
    icon: icons.washer,
    title: 'Pressings et laveries',
    text: "Une machine à l'arrêt, ce sont des commandes en retard. Envoyez-nous la marque et le modèle de votre machine : nous vous confirmons tout de suite si nous pouvons intervenir.",
  },
  {
    icon: icons.snowflake,
    title: 'Restaurants et commerces alimentaires',
    text: 'Un frigo qui lâche, c\'est de la marchandise perdue. Frigos, congélateurs, climatisation de salle.',
  },
  {
    icon: icons.key,
    title: 'Locations meublées et Airbnb',
    text: 'Un voyageur sans clim ni eau chaude laisse un mauvais avis. Clims, chauffe-eau, machines à laver et frigos, dans un ou plusieurs logements.',
  },
  {
    icon: icons.building,
    title: 'Bureaux et agences',
    text: "Une clim en panne ou un Wi-Fi coupé, et l'équipe ne travaille plus. Climatisation, frigos, micro-ondes, Wi-Fi et réseau.",
  },
  {
    icon: icons.storefront,
    title: 'Commerces et salons',
    text: 'Un client qui a trop chaud ne revient pas. Climatisation, chauffe-eau, électroménager du local.',
  },
  {
    icon: icons.help,
    title: 'Une autre activité ?',
    text: 'Décrivez-nous votre équipement. Si nous ne savons pas le réparer correctement, nous vous le dirons.',
  },
];

const changes = [
  "Un seul contact : plusieurs métiers, un seul numéro WhatsApp pour tous vos sites.",
  "Devis écrit avant toute intervention : rien n'est fait sans votre accord.",
  "Facture au nom de votre entreprise : pour votre comptabilité ou pour le propriétaire.",
  "Techniciens sélectionnés par FIX, pour chaque type d'équipement.",
  "Historique de vos équipements : chaque intervention est gardée, par site et par appareil.",
];

const steps = [
  "Vous nous écrivez sur WhatsApp : votre activité, le quartier, l'appareil et la panne.",
  "Un technicien fait le diagnostic.",
  "Vous recevez un devis écrit et vous validez.",
  "Le technicien intervient, puis vous recevez la facture au nom de votre entreprise.",
];

const equipment = [
  { icon: icons.washer, label: 'Machines à laver (pressings : modèle confirmé avant déplacement)' },
  { icon: icons.fridge, label: 'Réfrigérateurs et congélateurs' },
  { icon: icons.ac, label: 'Climatiseurs : dépannage et entretien' },
  { icon: icons.heater, label: 'Chauffe-eau' },
  { icon: icons.microwave, label: 'Micro-ondes' },
  { icon: icons.wifi, label: 'Wifi et réseau' },
];

const faqs: [string, string][] = [
  ['Faut-il signer un contrat ?', 'Non. Vous payez intervention par intervention, sur devis accepté.'],
  ['Pouvez-vous établir une facture au nom de ma société ?', 'Oui. Chaque intervention donne lieu à une facture au nom de votre entreprise.'],
  ['Je gère plusieurs logements ou plusieurs locaux. Comment faire ?', "Un seul numéro pour tous vos sites. Indiquez l'adresse à chaque demande : nous gardons l'historique de chaque site."],
  ['Faites-vous l\'entretien des climatiseurs ?', 'Oui, pour les professionnels : nettoyage et entretien, avec un prix par appareil communiqué sur devis. Plusieurs appareils peuvent être traités en un seul passage.'],
  ["Et si l'appareil n'est pas réparable ?", "Le technicien vous le dit après le diagnostic, et c'est vous qui décidez."],
  ['Dans quels quartiers intervenez-vous ?', 'À Dakar et environs : Ouakam, Almadies, Yoff, Hann, Maristes, Sacré-Cœur, Grand Yoff, Point E et les autres quartiers de Dakar.'],
];

const services = [
  { name: 'Réparation machine à laver pour professionnels à Dakar', serviceType: 'Dépannage machine à laver professionnel' },
  { name: 'Réparation frigo et congélateur pour professionnels à Dakar', serviceType: 'Dépannage froid commercial' },
  { name: 'Dépannage et entretien climatiseur pour professionnels à Dakar', serviceType: 'Climatisation professionnelle' },
  { name: 'Réparation chauffe-eau pour professionnels à Dakar', serviceType: 'Dépannage chauffe-eau professionnel' },
  { name: 'Réparation micro-ondes pour professionnels à Dakar', serviceType: 'Dépannage électroménager professionnel' },
  { name: 'Dépannage wifi et réseau pour professionnels à Dakar', serviceType: 'Installation et dépannage réseau professionnel' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': services.map((service) => ({
    '@type': 'Service',
    name: service.name,
    serviceType: service.serviceType,
    provider: { '@id': `${siteUrl}/#localbusiness` },
    areaServed: 'Dakar',
  })),
};

function ProDocPreview() {
  return (
    <div className="pro-doc-card" aria-hidden="true">
      <div className="pro-doc-head">
        <span className="pro-doc-logo">
          <Image src="/assets/fix-logo.png" alt="" width={26} height={26} />
        </span>
        <div>
          <b>Devis FIX Pro</b>
          <span>Réf. FP-0148</span>
        </div>
      </div>
      <div className="pro-doc-row"><span>Diagnostic climatiseur — salle serveur</span><b>Sur devis</b></div>
      <div className="pro-doc-row"><span>Entretien 3 climatiseurs — bureaux</span><b>Sur devis</b></div>
      <div className="pro-doc-row"><span>Intervention machine à laver — pressing</span><b>Sur devis</b></div>
      <div className="pro-doc-foot">
        <span>Facture au nom de l'entreprise</span>
        <b className="pro-doc-check">✓ Validé par le client</b>
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const isOpen = openIndex === index;
        return (
          <article className={`faq-item ${isOpen ? 'open' : ''}`} key={question}>
            <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span>{question}</span>
              <strong>{isOpen ? '−' : '+'}</strong>
            </button>
            <div className="faq-answer"><p>{answer}</p></div>
          </article>
        );
      })}
    </div>
  );
}

export default function ProfessionnelsClient() {
  return (
    <main className="site-shell pro-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <span className="pro-lockup">PRO</span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Service professionnel</small></div>
        </Link>
        <div className="nav-actions">
          <a className="nav-cta" href={whatsappLink(proMessage)} data-conversion="whatsapp-pro-header" data-ga-event="whatsapp_click_pro">WhatsApp</a>
        </div>
      </nav>

      <section className="pro-hero">
        <div className="pro-hero-copy">
          <p className="pro-eyebrow">FIX Pro</p>
          <h1>Fix Pro : le dépannage des professionnels à Dakar</h1>
          <p className="pro-accroche">Une panne ne doit pas bloquer votre activité.</p>
          <p className="pro-lead">
            Pressings, restaurants, commerces, bureaux, locations meublées : un seul contact pour toutes les
            pannes qui bloquent votre activité. Devis écrit avant intervention, facture au nom de votre
            entreprise.
          </p>
          <div className="pro-actions">
            <a className="primary" href={whatsappLink(proMessage)} data-conversion="whatsapp-pro-hero" data-ga-event="whatsapp_click_pro">
              Écrire à FIX Pro sur WhatsApp
            </a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="call-pro-hero" data-ga-event="call_click_pro">
              Appeler le {displayPhone}
            </a>
          </div>
          <p className="pro-trust">
            Le service professionnel de FIX Dépannage Dakar. Découvrez{' '}
            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">les avis de nos clients sur Google</a>.
          </p>
        </div>
        <div className="pro-hero-visual">
          <ProDocPreview />
        </div>
      </section>

      <section className="pro-section">
        <div className="pro-section-head">
          <h2>Une panne chez vous, ça coûte de l'argent</h2>
        </div>
        <div className="pro-verticals">
          {verticals.map((item) => (
            <div className="pro-vertical" key={item.title}>
              <span className="pro-vertical-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-section">
        <div className="pro-section-head">
          <h2>Ce que Fix Pro change pour vous</h2>
        </div>
        <div className="pro-changes">
          {changes.map((change) => {
            const [lead, ...rest] = change.split(' : ');
            const description = rest.join(' : ');
            return (
              <div className="pro-change-item" key={change}>
                <span className="pro-change-icon">✓</span>
                <p>{description ? <><b>{lead}</b> : {description}</> : change}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pro-section">
        <div className="pro-section-head">
          <h2>Comment ça marche</h2>
        </div>
        <div className="pro-steps">
          {steps.map((step, index) => (
            <div className="pro-step" key={step}>
              <span className="pro-step-index">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-section">
        <div className="pro-section-head">
          <h2>Équipements pris en charge</h2>
        </div>
        <div className="pro-equipment">
          {equipment.map((item) => (
            <div className="pro-equipment-item" key={item.label}>
              <span className="pro-equipment-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-section faq-section">
        <div className="pro-section-head">
          <h2>Questions fréquentes</h2>
        </div>
        <FaqAccordion />
      </section>

      <section className="pro-final-cta">
        <h2>Une panne bloque votre activité ?</h2>
        <p>Écrivez à FIX Pro sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(proMessage)} data-conversion="whatsapp-pro-final" data-ga-event="whatsapp_click_pro">
          Écrire à FIX Pro
        </a>
      </section>

      <footer className="footer upgraded-footer">
        <div>
          <b>FIX Dépannage Dakar</b>
          <p>Le service professionnel de FIX pour pressings, restaurants, bureaux et locations meublées.</p>
          <span>Dakar • Intervention selon disponibilité</span>
        </div>
        <div className="footer-links">
          <a className="footer-contact" href={`tel:+${phone}`} data-conversion="call-pro-footer" data-ga-event="call_click_pro">+221 {displayPhone}</a>
          <Link className="footer-legal" href="/">Accueil</Link>
          <Link className="footer-legal" href="/mentions-legales">Mentions légales</Link>
          <Link className="footer-legal" href="/confidentialite">Confidentialité</Link>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
