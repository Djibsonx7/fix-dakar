'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const simpleFrigoMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un frigo à Dakar.`;
const frigoMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un frigo à Dakar.\nQuartier :\nMarque :\nProblème : ne refroidit plus / fuite / bruit / congèle trop\nPrécision :`;
const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Cœur', 'Grand Yoff', 'Point E', 'Autre quartier à Dakar'];
const displayAreas = areas.filter((area) => area !== 'Autre quartier à Dakar');
const brands = ['Samsung', 'LG', 'Beko', 'Hisense', 'Roch', 'Haier', 'Autre'];
const applianceTypes = ['Frigo', 'Réfrigérateur combiné', 'Congélateur', 'Frigo vitrine'];
const pains = ['Ne refroidit plus', 'Froid insuffisant', 'Fuite d’eau', 'Bruit anormal', 'Congèle trop', 'Trop de givre', 'Ne démarre plus'];
const coldServices = [
  { title: 'Frigo simple porte', text: 'Panne de froid, fuite, bruit ou arrêt soudain.' },
  { title: 'Réfrigérateur combiné', text: 'Partie frigo ou congélateur qui ne refroidit plus correctement.' },
  { title: 'Congélateur', text: 'Perte de froid, givre excessif ou appareil qui ne démarre plus.' },
];
const faqs = [
  ['Réparez-vous les frigos à domicile à Dakar ?', 'Oui, FIX Dakar peut orienter votre demande vers un technicien disponible selon votre quartier et le type de panne constatée.'],
  ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez le quartier, la marque, une photo ou vidéo si possible, et le symptôme exact : plus de froid, fuite, bruit, givre ou panne électrique.'],
  ['Le prix est-il fixé avant intervention ?', 'Le montant dépend de la panne et des pièces éventuelles. FIX privilégie un diagnostic clair avant toute réparation importante.'],
  ['Intervenez-vous sur réfrigérateur et congélateur ?', 'Oui, la demande peut concerner un frigo, un réfrigérateur, un combiné ou un congélateur selon disponibilité technique.'],
  ['Pourquoi mon frigo No Frost fait-il du bruit ?', 'Un bruit anormal sur un frigo No Frost indique souvent un problème de dégivrage automatique, un ventilateur bloqué ou un compresseur en difficulté. Envoyez une courte vidéo sur WhatsApp pour aider le technicien à qualifier la panne à distance.'],
  ['Peut-on recharger le gaz d\'un frigo à Dakar ?', 'Oui, si le frigo ne refroidit plus à cause d\'une fuite de gaz réfrigérant (R600a ou R134a), une recharge est possible. FIX peut orienter vers un technicien agréé pour ce type d\'intervention.'],
];

function FridgeVisual() {
  return (
    <div className="fridge-visual-wrap">
      <div className="cold-orbit orbit-one"></div>
      <div className="cold-orbit orbit-two"></div>
      <div className="fridge">
        <div className="fridge-screen"></div>
        <div className="fridge-door top-door"><span className="fridge-handle"></span></div>
        <div className="fridge-door bottom-door"><span className="fridge-handle"></span></div>
        <div className="fridge-vent"></div>
        <div className="fridge-shine"></div>
      </div>
      <div className="status-card fridge-status fridge-status-one"><b>Panne de froid</b><span>Frigo qui ne refroidit plus</span><small>Diagnostic • Dakar</small></div>
      <div className="status-card fridge-status fridge-status-two"><b>Demande reçue</b><span>Marque + quartier</span><small>WhatsApp préparé</small></div>
      <div className="status-card fridge-status fridge-status-three"><b>Intervention</b><span>Technicien disponible</span><small>Selon la zone</small></div>
    </div>
  );
}

function SmartFridgeLead() {
  const [area, setArea] = useState('Yoff');
  const [brand, setBrand] = useState('Samsung');
  const [applianceType, setApplianceType] = useState('Réfrigérateur combiné');
  const [problem, setProblem] = useState('Ne refroidit plus');
  const [details, setDetails] = useState('');

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nDétail : ${details.trim()}` : '';
    return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un frigo.\nQuartier : ${area}\nType d'appareil : ${applianceType}\nMarque : ${brand}\nProblème : ${problem}${detailText}`;
  }, [area, applianceType, brand, problem, details]);

  return (
    <>
      <div>
        <p className="eyebrow">WhatsApp intelligent</p>
        <h2>Décrivez votre panne frigo en quelques secondes.</h2>
        <p>Sélectionnez le quartier, la marque et le symptôme. Le message WhatsApp est préparé automatiquement pour aider FIX Dakar à qualifier rapidement votre demande.</p>
        <div className="contact-visual fridge-contact-visual" aria-label="Aperçu du message WhatsApp frigo préparé">
          <div className="mini-fridge"><div className="mini-fridge-screen"></div><div className="mini-fridge-door top"></div><div className="mini-fridge-door bottom"></div><div className="mini-shine"></div></div>
          <div className="message-bubble bubble-one"><b>Quartier</b><span>{area}</span></div>
          <div className="message-bubble bubble-two"><b>Appareil</b><span>{applianceType}</span></div>
          <div className="message-bubble bubble-three"><b>Panne</b><span>{problem}</span></div>
          <div className="message-bubble bubble-four"><b>Message</b><span>Prêt</span></div>
        </div>
      </div>
      <div className="smart-card">
        <div className="form-grid">
          <label>Quartier<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Type d’appareil<select value={applianceType} onChange={(e) => setApplianceType(e.target.value)}>{applianceTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Marque<select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Panne<select value={problem} onChange={(e) => setProblem(e.target.value)}>{pains.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Précision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : le moteur tourne mais l'intérieur reste chaud" /></label>
        </div>
        <div className="message-preview"><span>Message préparé</span><p>{message}</p></div>
        <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp-frigo-form">Envoyer ma demande sur WhatsApp</a>
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

export default function FrigoRepairClient() {
  return (
    <main className="site-shell service-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Frigo • Réfrigérateur</small></div>
        </Link>
        <a className="nav-cta" href={whatsappLink(simpleFrigoMessage)} data-conversion="whatsapp-frigo-header">WhatsApp</a>
      </nav>

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage électroménager à Dakar</p>
          <h1>Réparation frigo à Dakar.</h1>
          <p className="lead">Frigo qui ne refroidit plus, fuite, bruit anormal ou congélateur en panne ? Envoyez les détails sur WhatsApp pour une première qualification rapide.</p>
          <div className="actions">
            <a className="primary" href="#whatsapp-frigo-intelligent">Décrire ma panne frigo</a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="call-frigo-hero">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>Dakar</span><span>Diagnostic clair</span><span>Selon disponibilité</span></div>
        </div>
        <div className="hero-card service-card-visual fridge-hero-card">
          <FridgeVisual />
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes fréquentes</p><h2>Les problèmes de frigo à vérifier rapidement.</h2></div>
        <div className="chips">
          {pains.map((pain) => (
            <a className="quick-chip" href={whatsappLink(`${simpleFrigoMessage}\nProblème : ${pain}.`)} key={pain} data-conversion="whatsapp-frigo-pain">
              <span>{pain}</span><small>WhatsApp</small><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section cards">
        <article><h3>01. Envoyez le symptôme</h3><p>Expliquez si le frigo ne refroidit plus, fuit, fait du bruit ou crée trop de givre.</p></article>
        <article><h3>02. Diagnostic clair</h3><p>On qualifie la panne avec la marque, le quartier et les informations disponibles.</p></article>
        <article><h3>03. Intervention selon zone</h3><p>Un technicien peut être orienté selon disponibilité et type de réparation.</p></article>
      </section>

      <section id="whatsapp-frigo-intelligent" className="section form-zone">
        <SmartFridgeLead />
      </section>

      <section className="section cards service-type-cards">
        {coldServices.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </section>

      <section className="section brand-section">
        <p className="eyebrow">Marques prises en charge</p>
        <h2>Frigos et réfrigérateurs des grandes marques réparés à Dakar.</h2>
        <div className="brand-grid">
          {['Samsung', 'LG', 'Beko', 'Hisense', 'Roch', 'Haier'].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
        <div className="promise-cards" style={{ marginTop: '32px' }}>
          <article>
            <b>Samsung & LG</b>
            <p>Frigos No Frost haut de gamme très courants à Dakar. Pannes fréquentes : défaut de dégivrage, compresseur, carte électronique ou joint de porte.</p>
          </article>
          <article>
            <b>Beko & Hisense</b>
            <p>Marques populaires avec un bon rapport qualité-prix. Réparations courantes : thermostat, gaz réfrigérant R600a, fuite et moteur ventilateur.</p>
          </article>
          <article>
            <b>Roch & Haier</b>
            <p>Très répandus sur le marché sénégalais. Diagnostic possible sur pannes de froid, bruit anormal ou congélateur qui ne descend plus en température.</p>
          </article>
        </div>
      </section>

      <section className="section promise-section">
        <div><p className="eyebrow">Avant déplacement</p><h2>Envoyez une photo ou vidéo pour mieux qualifier.</h2></div>
        <div className="promise-cards">
          <article><b>Panne de froid</b><p>Précisez si le moteur tourne, si l’intérieur reste chaud ou si le froid est faible.</p></article>
          <article><b>Fuite ou givre</b><p>Indiquez l’endroit de la fuite ou envoyez une photo du givre constaté.</p></article>
          <article><b>Bruit anormal</b><p>Une courte vidéo peut aider à comprendre le bruit avant intervention.</p></article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Zones d’intervention</p>
        <h2>Réparation frigo à Dakar et quartiers proches.</h2>
        <div className="areas">{displayAreas.map((a) => <span key={a}>{a}</span>)}<span>Autres quartiers à Dakar</span></div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour un frigo.</h2>
        <FaqAccordion />
      </section>

      <section className="final-cta">
        <h2>Besoin d’un dépannage frigo à Dakar ?</h2>
        <p>Envoyez le quartier, la marque et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(simpleFrigoMessage)} data-conversion="whatsapp-frigo-final">Contacter FIX</a>
      </section>

      <footer className="footer upgraded-footer">
        <div><b>FIX Dépannage Dakar</b><p>Réparation frigo, machine à laver et électroménager à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div>
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="call-frigo-footer">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link><Link className="footer-legal" href="/mentions-legales">Mentions légales</Link><Link className="footer-legal" href="/confidentialite">Confidentialité</Link></div>
      </footer>
    </main>
  );
}
