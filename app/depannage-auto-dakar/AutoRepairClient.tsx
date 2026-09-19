'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BatteryCharging, CarFront } from 'lucide-react';
import ProBanner from '@/components/ProBanner';
import ProBottomBlock from '@/components/ProBottomBlock';

const siteUrl = 'https://fix.fenixfuz.com';
const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const simpleAutoMessage = `Bonjour FIX Dakar, j'ai besoin d'un dépannage automobile à Dakar.`;

const quickCases = [
  'Voiture qui ne démarre plus',
  'Batterie à plat',
  'Besoin d’un remorquage',
];

const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Cœur', 'Grand Yoff', 'Point E', 'Autre quartier à Dakar'];
const displayAreas = areas.filter((area) => area !== 'Autre quartier à Dakar');

const vehicleTypes = ['Petite voiture', 'Berline / SUV', 'Utilitaire / camionnette', 'Autre'];

const batterySymptoms = ['Ne démarre pas du tout', 'Clic au démarrage', 'Tableau de bord faible', 'Autre symptôme'];

const autoServices = [
  {
    icon: '🚛',
    title: 'Remorquage automobile',
    text: 'Véhicule immobilisé : transport vers le garage, votre domicile ou une autre destination à Dakar et environs, selon disponibilité.',
  },
  {
    icon: '🔋',
    title: 'SOS Batterie / Démarrage',
    text: 'Batterie à plat : démarrage avec booster portable, avec vérification rapide selon l’intervenant disponible.',
  },
];

const faqs: [string, string][] = [
  ['Le prix est-il connu avant l’arrivée du dépanneur ?', 'Oui. Le tarif et le délai estimé sont confirmés par FIX avant l’envoi de l’intervenant, selon le véhicule et le trajet.'],
  ['Que dois-je envoyer sur WhatsApp ?', 'Votre position ou quartier, le type de véhicule, le problème constaté (batterie ou remorquage) et, pour un remorquage, la destination souhaitée.'],
  ['FIX intervient-il directement ?', 'FIX qualifie votre demande et trouve un partenaire disponible (remorqueur ou intervenant batterie) pour l’intervention. FIX assure le suivi de bout en bout.'],
  ['Quelles zones sont couvertes ?', 'Dakar et ses environs, selon la disponibilité des partenaires au moment de la demande.'],
  ['Et si mon véhicule est accidenté ?', 'Précisez-le dans votre message : cela permet de proposer un partenaire et un véhicule de remorquage adaptés.'],
  ['Comment l’état du véhicule est-il documenté avant remorquage ?', 'Le partenaire prend des photos avant le chargement afin de documenter l’état visible du véhicule avant le transport.'],
];

function AutoVisual() {
  return (
    <div className="auto-visual-wrap">
      <div className="auto-orbit auto-orbit-one"></div>
      <div className="auto-orbit auto-orbit-two"></div>
      <div className="auto-car-icon-shell" aria-hidden="true">
        <div className="auto-car-icon-glow"></div>
        <CarFront className="auto-car-icon" strokeWidth={1.65} />
        <div className="auto-battery-badge auto-battery-badge-icon">
          <BatteryCharging size={24} strokeWidth={2} />
        </div>
      </div>
      <div className="status-card auto-status auto-status-one"><b>Véhicule immobilisé</b><span>Remorquage ou batterie</span><small>Dakar</small></div>
      <div className="status-card auto-status auto-status-two"><b>Demande reçue</b><span>Position + véhicule</span><small>WhatsApp préparé</small></div>
      <div className="status-card auto-status auto-status-three"><b>Prix confirmé</b><span>Avant déplacement</span><small>Selon disponibilité</small></div>
    </div>
  );
}

type ContactVisualProps = { service: string; area: string };

function AutoContactVisual({ service, area }: ContactVisualProps) {
  return (
    <div className="contact-visual auto-contact-visual" aria-label="Aperçu du message WhatsApp auto préparé">
      <div className="mini-auto-icon-shell" aria-hidden="true">
        <CarFront className="mini-auto-icon" strokeWidth={1.8} />
      </div>
      <div className="message-bubble bubble-one"><b>Service</b><span>{service}</span></div>
      <div className="message-bubble bubble-two"><b>Quartier</b><span>{area}</span></div>
      <div className="message-bubble bubble-three"><b>Message</b><span>Prêt</span></div>
    </div>
  );
}

function SmartAutoLead() {
  const [service, setService] = useState('Remorquage automobile');
  const [area, setArea] = useState('Yoff');
  const [vehicle, setVehicle] = useState('Petite voiture');
  const [destination, setDestination] = useState('');
  const [accident, setAccident] = useState('Non accidenté');
  const [symptom, setSymptom] = useState('Ne démarre pas du tout');
  const [details, setDetails] = useState('');

  const isRemorquage = service === 'Remorquage automobile';

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nPrécision : ${details.trim()}` : '';
    const specificLines = isRemorquage
      ? `\nDestination : ${destination.trim() || 'à préciser'}\nVéhicule accidenté : ${accident}`
      : `\nSymptôme : ${symptom}`;
    return `Bonjour FIX Dakar, j'ai besoin d'un dépannage automobile.\nService : ${service}\nPosition / quartier : ${area}\nVéhicule : ${vehicle}${specificLines}${detailText}`;
  }, [service, area, vehicle, destination, accident, symptom, details, isRemorquage]);

  return (
    <>
      <div>
        <p className="eyebrow">WhatsApp intelligent</p>
        <h2>Décrivez votre panne auto en quelques secondes.</h2>
        <p>Sélectionnez le service, votre quartier et le véhicule. Le message WhatsApp est préparé pour aider FIX à qualifier rapidement votre demande et confirmer le tarif.</p>
        <AutoContactVisual service={service} area={area} />
      </div>
      <div className="smart-card">
        <div className="form-grid">
          <label>Service<select value={service} onChange={(e) => setService(e.target.value)}><option>Remorquage automobile</option><option>SOS Batterie / Démarrage</option></select></label>
          <label>Quartier / position<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Véhicule<select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>{vehicleTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          {isRemorquage ? (
            <>
              <label>Destination souhaitée<input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Ex : garage à Ouakam, mon domicile..." /></label>
              <label>Véhicule accidenté ?<select value={accident} onChange={(e) => setAccident(e.target.value)}><option>Non accidenté</option><option>Accidenté</option></select></label>
            </>
          ) : (
            <label>Symptôme<select value={symptom} onChange={(e) => setSymptom(e.target.value)}>{batterySymptoms.map((item) => <option key={item}>{item}</option>)}</select></label>
          )}
          <label>Précision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : roues bloquées, stationné en sous-sol..." /></label>
        </div>
        <div className="message-preview"><span>Message préparé</span><p>{message}</p></div>
        <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp-auto-form">Envoyer ma demande sur WhatsApp</a>
      </div>
    </>
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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Remorquage automobile à Dakar',
      serviceType: 'Remorquage automobile',
      provider: { '@id': `${siteUrl}/#localbusiness` },
      areaServed: 'Dakar',
    },
    {
      '@type': 'Service',
      name: 'Dépannage batterie automobile à Dakar',
      serviceType: 'Dépannage batterie / démarrage',
      provider: { '@id': `${siteUrl}/#localbusiness` },
      areaServed: 'Dakar',
    },
  ],
};

export default function AutoRepairClient() {
  return (
    <main className="site-shell service-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Remorquage • Batterie</small></div>
        </Link>
        <div className="nav-actions">
          <Link className="nav-pro-link" href="/professionnels">Professionnels</Link>
          <a className="nav-cta" href={whatsappLink(simpleAutoMessage)} data-conversion="whatsapp-auto-header">WhatsApp</a>
        </div>
      </nav>

      <ProBanner />

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage automobile à Dakar</p>
          <h1>Voiture immobilisée à Dakar ?</h1>
          <p className="lead">Remorquage ou batterie à plat : FIX trouve rapidement un partenaire disponible et vous confirme le tarif avant son déplacement.</p>
          <div className="actions">
            <a className="primary" href="#whatsapp-auto-intelligent">Décrire ma panne auto</a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="call-auto-hero">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>Dakar</span><span>Tarif confirmé avant déplacement</span><span>Selon disponibilité</span></div>
        </div>
        <div className="hero-card service-card-visual">
          <AutoVisual />
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Cas fréquents</p><h2>Les situations les plus courantes à Dakar.</h2></div>
        <div className="chips">
          {quickCases.map((item) => (
            <a className="quick-chip" href={whatsappLink(`${simpleAutoMessage}\nSituation : ${item}.`)} key={item} data-conversion="whatsapp-auto-pain">
              <span>{item}</span><small>WhatsApp</small><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section cards">
        <article><h3>01. Envoyez position et problème</h3><p>Quartier, type de véhicule et situation : batterie à plat, panne ou besoin de remorquage.</p></article>
        <article><h3>02. Prix et délai confirmés</h3><p>FIX contacte un partenaire disponible et revient vers vous avec le tarif et le délai d’arrivée estimé.</p></article>
        <article><h3>03. Intervention selon disponibilité</h3><p>Le partenaire intervient une fois la mission confirmée, avec suivi FIX jusqu’à la fin.</p></article>
      </section>

      <section id="whatsapp-auto-intelligent" className="section form-zone">
        <SmartAutoLead />
      </section>

      <section className="section cards service-type-cards">
        {autoServices.map((item) => (
          <article key={item.title}>
            <h3>{item.icon} {item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="section promise-section">
        <div><p className="eyebrow">Avant déplacement</p><h2>Pas de prix surprise après l’arrivée du dépanneur.</h2></div>
        <div className="promise-cards">
          <article><b>Tarif confirmé avant départ</b><p>Le prix et les conditions sont annoncés par FIX avant l’envoi du partenaire.</p></article>
          <article><b>Partenaires sélectionnés</b><p>FIX travaille avec des partenaires identifiés pour le remorquage et le dépannage batterie.</p></article>
          <article><b>État du véhicule documenté</b><p>Photos avant chargement pour constater l’état visible du véhicule en cas de remorquage.</p></article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Zones d’intervention</p>
        <h2>Dépannage auto à Dakar et environs.</h2>
        <div className="areas">{displayAreas.map((a) => <span key={a}>{a}</span>)}<span>Autres quartiers à Dakar</span></div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour un dépannage auto.</h2>
        <FaqAccordion />
      </section>

      <section className="final-cta">
        <h2>Véhicule immobilisé à Dakar ?</h2>
        <p>Envoyez votre quartier, le véhicule et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(simpleAutoMessage)} data-conversion="whatsapp-auto-final">Contacter FIX</a>
      </section>

      <ProBottomBlock />

      <footer className="footer upgraded-footer">
        <div><b>FIX Dépannage Dakar</b><p>Remorquage et dépannage batterie automobile à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div>
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="call-auto-footer">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link><Link className="footer-legal" href="/mentions-legales">Mentions légales</Link><Link className="footer-legal" href="/confidentialite">Confidentialité</Link></div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
