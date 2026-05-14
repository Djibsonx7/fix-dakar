'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const simpleMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un chauffe-eau à Dakar.`;
const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Cœur', 'Grand Yoff', 'Point E', 'Autre quartier à Dakar'];
const displayAreas = areas.filter((area) => area !== 'Autre quartier à Dakar');
const brands = ['Ariston', 'Atlantic', 'Roch', 'Beko', 'Haier', 'Hisense', 'Autre'];
const heaterTypes = ['Chauffe-eau électrique', 'Chauffe-eau mural', 'Chauffe-eau horizontal', 'Ballon d’eau chaude'];
const pains = ['Ne chauffe plus', 'Eau tiède', 'Disjoncte', 'Fuite d’eau', 'Résistance', 'Thermostat', 'Voyant allumé sans eau chaude'];

function SmartLead() {
  const [area, setArea] = useState('Yoff');
  const [brand, setBrand] = useState('Ariston');
  const [heaterType, setHeaterType] = useState('Chauffe-eau électrique');
  const [problem, setProblem] = useState('Ne chauffe plus');
  const [details, setDetails] = useState('');

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nDétail : ${details.trim()}` : '';
    return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un chauffe-eau.\nQuartier : ${area}\nType : ${heaterType}\nMarque : ${brand}\nProblème : ${problem}${detailText}`;
  }, [area, heaterType, brand, problem, details]);

  return (
    <>
      <div>
        <p className="eyebrow">WhatsApp intelligent</p>
        <h2>Décrivez votre panne chauffe-eau rapidement.</h2>
        <p>Sélectionnez les informations principales pour préparer automatiquement votre message WhatsApp.</p>
      </div>

      <div className="smart-card">
        <div className="form-grid">
          <label>Quartier<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Type<select value={heaterType} onChange={(e) => setHeaterType(e.target.value)}>{heaterTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Marque<select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Panne<select value={problem} onChange={(e) => setProblem(e.target.value)}>{pains.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Précision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : le chauffe-eau disjoncte après quelques minutes" /></label>
        </div>

        <div className="message-preview"><span>Message préparé</span><p>{message}</p></div>

        <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp_click">Envoyer ma demande sur WhatsApp</a>
      </div>
    </>
  );
}

function FAQ() {
  const faqs = [
    ['Réparez-vous les chauffe-eaux à Dakar ?', 'Oui, FIX Dakar peut orienter votre demande vers un technicien disponible selon la panne et votre zone.'],
    ['Pourquoi mon chauffe-eau disjoncte ?', 'Cela peut venir de la résistance, du thermostat ou d’un problème électrique nécessitant un diagnostic.'],
    ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez une photo du chauffe-eau, la marque, le quartier et le symptôme observé.'],
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

export default function ChauffeEauRepairClient() {
  return (
    <main className="site-shell service-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Chauffe-eau • Eau chaude</small></div>
        </Link>

        <a className="nav-cta" href={whatsappLink(simpleMessage)} data-conversion="whatsapp_click">WhatsApp</a>
      </nav>

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage chauffe-eau à Dakar</p>
          <h1>Réparation chauffe-eau à Dakar.</h1>
          <p className="lead">Chauffe-eau qui ne chauffe plus, fuite, disjonction ou eau tiède ? Contactez FIX Dakar rapidement sur WhatsApp.</p>

          <div className="actions">
            <a className="primary" href="#whatsapp-chauffe-eau">Décrire ma panne</a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="phone_click">Appeler maintenant</a>
          </div>

          <div className="trust-row"><span>Dakar</span><span>Diagnostic clair</span><span>Intervention selon disponibilité</span></div>
        </div>

        <div className="hero-card service-card-visual">
          <div className="status-card"><b>Eau chaude</b><span>Diagnostic rapide</span><small>WhatsApp • Dakar</small></div>
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes fréquentes</p><h2>Les problèmes de chauffe-eau fréquents.</h2></div>

        <div className="chips">
          {pains.map((pain) => (
            <a className="quick-chip" href={whatsappLink(`${simpleMessage}\nProblème : ${pain}`)} key={pain} data-conversion="whatsapp_click">
              <span>{pain}</span><small>WhatsApp</small><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section cards">
        <article><h3>01. Décrivez la panne</h3><p>Expliquez le problème : eau froide, fuite, disjonction ou thermostat.</p></article>
        <article><h3>02. Qualification</h3><p>Le problème est qualifié selon les informations envoyées.</p></article>
        <article><h3>03. Intervention</h3><p>Un technicien peut être orienté selon disponibilité.</p></article>
      </section>

      <section id="whatsapp-chauffe-eau" className="section form-zone">
        <SmartLead />
      </section>

      <section className="section">
        <p className="eyebrow">Zones d’intervention</p>
        <h2>Intervention chauffe-eau à Dakar.</h2>
        <div className="areas">{displayAreas.map((a) => <span key={a}>{a}</span>)}<span>Autres quartiers à Dakar</span></div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour un chauffe-eau.</h2>
        <FAQ />
      </section>

      <section className="final-cta">
        <h2>Besoin d’un dépannage chauffe-eau à Dakar ?</h2>
        <p>Envoyez le quartier et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(simpleMessage)} data-conversion="whatsapp_click">Contacter FIX</a>
      </section>

      <footer className="footer upgraded-footer">
        <div><b>FIX Dépannage Dakar</b><p>Réparation chauffe-eau, frigo et électroménager à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div>
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="phone_click">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link></div>
      </footer>
    </main>
  );
}
