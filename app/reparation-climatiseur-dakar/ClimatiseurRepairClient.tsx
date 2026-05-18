'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const phone = '221788208080';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const simpleMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un climatiseur à Dakar.`;

const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Cœur', 'Grand Yoff', 'Point E', 'Autre quartier à Dakar'];
const brands = ['Samsung', 'LG', 'Hisense', 'Haier', 'Roch', 'Sharp', 'Autre'];
const climateTypes = ['Split mural', 'Inverter', 'Climatiseur mobile', 'Autre'];
const pains = ['Ne refroidit plus', 'Fuite d’eau', 'Bruit anormal', 'Mauvaise odeur', 'Ne démarre plus', 'Entretien nécessaire'];

function ClimateVisual() {
  return (
    <div className="heater-visual-wrap">
      <div className="heat-glow glow-one"></div>
      <div className="heat-glow glow-two"></div>
      <div className="heater">
        <div className="heater-light"></div>
        <div className="heater-screen"></div>
        <div className="heater-panel"></div>
        <div className="heater-shine"></div>
      </div>
      <div className="status-card heater-status heater-status-one"><b>Air frais</b><span>Clim qui ne refroidit plus</span><small>Dakar • WhatsApp</small></div>
      <div className="status-card heater-status heater-status-two"><b>Diagnostic</b><span>Quartier + type</span><small>Demande préparée</small></div>
    </div>
  );
}

function MiniClimatePreview({ area, climateType, problem }: { area: string; climateType: string; problem: string }) {
  return (
    <div className="contact-visual heater-contact-visual" aria-label="Aperçu du message WhatsApp climatiseur préparé">
      <div className="mini-heater"><div className="mini-heater-light"></div><div className="mini-heater-screen"></div><div className="mini-heater-panel"></div><div className="mini-shine"></div></div>
      <div className="message-bubble bubble-one"><b>Quartier</b><span>{area}</span></div>
      <div className="message-bubble bubble-two"><b>Type</b><span>{climateType}</span></div>
      <div className="message-bubble bubble-three"><b>Panne</b><span>{problem}</span></div>
      <div className="message-bubble bubble-four"><b>Message</b><span>Prêt</span></div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    ['Réparez-vous les climatiseurs à Dakar ?', 'Oui, FIX Dakar peut orienter votre demande vers un technicien disponible selon votre quartier, le type de climatiseur et la panne constatée.'],
    ['Pourquoi ma clim ne refroidit plus ?', 'Cela peut venir d’un manque d’entretien, d’un filtre encrassé, d’un problème de gaz, du ventilateur ou d’un composant interne. Envoyez le symptôme sur WhatsApp pour une première qualification.'],
    ['Faites-vous aussi l’entretien climatiseur ?', 'Oui, les demandes d’entretien et de nettoyage climatiseur peuvent être qualifiées via WhatsApp, notamment si la clim sent mauvais, refroidit moins ou fait du bruit.'],
    ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez le quartier, la marque, le type de climatiseur et une photo ou courte vidéo si possible. Cela aide à comprendre rapidement la panne avant intervention.'],
  ];

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

export default function ClimatiseurRepairClient() {
  const [area, setArea] = useState('Yoff');
  const [brand, setBrand] = useState('Samsung');
  const [climateType, setClimateType] = useState('Split mural');
  const [problem, setProblem] = useState('Ne refroidit plus');
  const [details, setDetails] = useState('');

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nDétail : ${details.trim()}` : '';
    return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un climatiseur.\nQuartier : ${area}\nType : ${climateType}\nMarque : ${brand}\nProblème : ${problem}${detailText}`;
  }, [area, climateType, brand, problem, details]);

  return (
    <main className="site-shell service-page heater-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Climatiseur • Climatisation</small></div>
        </Link>

        <a className="nav-cta" href={whatsappLink(simpleMessage)} data-conversion="whatsapp-clim-header">WhatsApp</a>
      </nav>

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage climatiseur à Dakar</p>
          <h1>Réparation climatiseur à Dakar.</h1>
          <p className="lead">Clim qui ne refroidit plus, fuite d’eau, bruit anormal ou entretien ? Contactez FIX Dakar rapidement sur WhatsApp.</p>

          <div className="actions">
            <a className="primary" href="#whatsapp-clim">Décrire ma panne</a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="phone-clim-hero">Appeler maintenant</a>
          </div>

          <div className="trust-row"><span>Dakar</span><span>Air frais</span><span>Intervention selon disponibilité</span></div>
        </div>

        <div className="hero-card service-card-visual heater-hero-card">
          <ClimateVisual />
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes fréquentes</p><h2>Les problèmes fréquents de climatiseur.</h2></div>

        <div className="chips">
          {pains.map((pain) => (
            <a className="quick-chip" href={whatsappLink(`${simpleMessage}\nProblème : ${pain}`)} key={pain} data-conversion="whatsapp-clim-pain">
              <span>{pain}</span><small>WhatsApp</small><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section cards">
        <article><h3>01. Décrivez la panne</h3><p>Expliquez le problème : clim chaude, fuite, bruit ou entretien.</p></article>
        <article><h3>02. Qualification</h3><p>Le problème est qualifié selon les informations envoyées.</p></article>
        <article><h3>03. Intervention</h3><p>Un technicien peut être orienté selon disponibilité.</p></article>
      </section>

      <section id="whatsapp-clim" className="section form-zone">
        <div>
          <p className="eyebrow">WhatsApp intelligent</p>
          <h2>Décrivez votre panne climatiseur rapidement.</h2>
          <p>Préparez automatiquement votre message WhatsApp avant intervention.</p>
          <MiniClimatePreview area={area} climateType={climateType} problem={problem} />
        </div>

        <div className="smart-card">
          <div className="form-grid">
            <label>Quartier<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Type<select value={climateType} onChange={(e) => setClimateType(e.target.value)}>{climateTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Marque<select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Panne<select value={problem} onChange={(e) => setProblem(e.target.value)}>{pains.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Précision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : la clim souffle mais ne refroidit plus" /></label>
          </div>

          <div className="message-preview"><span>Message préparé</span><p>{message}</p></div>

          <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp-clim-form">Envoyer ma demande sur WhatsApp</a>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Zones d’intervention</p>
        <h2>Intervention climatiseur à Dakar.</h2>
        <div className="areas">{areas.filter((a) => a !== 'Autre quartier à Dakar').map((a) => <span key={a}>{a}</span>)}<span>Autres quartiers à Dakar</span></div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour un climatiseur.</h2>
        <FAQ />
      </section>

      <section className="final-cta">
        <h2>Besoin d’un dépannage climatiseur à Dakar ?</h2>
        <p>Envoyez votre quartier et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(simpleMessage)} data-conversion="whatsapp-clim-final">Contacter FIX</a>
      </section>
    </main>
  );
}
