'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const phone = '221777989238';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function quickMessage(problem = 'machine a laver') {
  return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour ma ${problem}. Je suis a Dakar.`;
}

const pains = ['Ne demarre plus', 'Fuite d eau', 'Probleme de vidange', 'Tambour bloque', 'Bruit anormal', 'Essorage impossible'];
const brands = ['Samsung', 'LG', 'Beko', 'Whirlpool', 'Hisense', 'Roch', 'Autre'];
const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Coeur', 'Grand Yoff', 'Point E'];
const liveUpdates = [
  { status: 'Demande reçue', title: 'Machine qui ne vidange plus', meta: 'Yoff • WhatsApp' },
  { status: 'Panne qualifiée', title: 'Fuite d’eau signalée', meta: 'Ouakam • Diagnostic' },
  { status: 'Réponse envoyée', title: 'Technicien disponible', meta: 'Almadies • Assistance FIX' },
  { status: 'Besoin confirmé', title: 'Essorage impossible', meta: 'Grand Yoff • Suivi client' },
];
const faqs = [
  ['Combien coûte une réparation machine à laver à Dakar ?', 'Le prix dépend de la panne, de la marque et des pièces nécessaires. FIX privilégie un diagnostic clair avant toute réparation importante.'],
  ['Intervenez-vous à domicile ?', 'Oui, l’intervention peut se faire à domicile selon votre quartier et la disponibilité du technicien.'],
  ['Puis-je envoyer une photo ou une vidéo sur WhatsApp ?', 'Oui. C’est même recommandé pour comprendre rapidement le problème avant le déplacement.'],
  ['Réparez-vous Samsung, LG, Beko ou Whirlpool ?', 'Oui, FIX peut orienter vers un technicien pour les grandes marques de machines à laver et lave-linge.'],
  ['Quels quartiers de Dakar couvrez-vous ?', 'FIX intervient ou oriente vers un technicien dans plusieurs zones comme Yoff, Ouakam, Almadies, Hann, Maristes, Grand Yoff et quartiers proches.'],
];

function SmartWhatsAppForm() {
  const [area, setArea] = useState('Yoff');
  const [brand, setBrand] = useState('Samsung');
  const [problem, setProblem] = useState('Ne demarre plus');
  const [details, setDetails] = useState('');

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nDetail : ${details.trim()}` : '';
    return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour une machine a laver.\nQuartier : ${area}\nMarque : ${brand}\nProbleme : ${problem}${detailText}`;
  }, [area, brand, problem, details]);

  return (
    <div className="smart-card">
      <div className="form-grid">
        <label>Quartier<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Marque<select value={brand} onChange={(e) => setBrand(e.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Panne<select value={problem} onChange={(e) => setProblem(e.target.value)}>{pains.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Precision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : elle s'allume mais ne vidange pas" /></label>
      </div>
      <div className="message-preview"><span>Message prepare</span><p>{message}</p></div>
      <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp-form">Envoyer sur WhatsApp</a>
    </div>
  );
}

function LiveInterventionCard() {
  return (
    <div className="live-card-stack">
      {liveUpdates.map((item, index) => (
        <div className="status-card live-status-card" style={{ animationDelay: `${index * 3.2}s` }} key={item.status}>
          <b>{item.status}</b>
          <span>{item.title}</span>
          <small>{item.meta}</small>
        </div>
      ))}
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <div className="brand brand-with-logo">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Machine à laver • Électroménager</small></div>
        </div>
        <a className="nav-cta" href={whatsappLink(quickMessage())} data-conversion="whatsapp-header">WhatsApp</a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Service urbain de depannage premium</p>
          <h1>Réparation machine à laver à Dakar.</h1>
          <p className="lead">Diagnostic clair, intervention rapide et assistance WhatsApp pour vos pannes de lave-linge et appareils électroménagers.</p>
          <div className="actions">
            <a className="primary" href="#whatsapp-intelligent">Décrire mon problème</a>
            <a className="secondary" href="tel:+221777989238" data-conversion="call-hero">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>5,0 ★ Google</span><span>Techniciens fiables</span><span>Dakar</span></div>
        </div>
        <div className="hero-card">
          <div className="machine"><div className="screen"></div><div className="door"></div><div className="shine"></div></div>
          <LiveInterventionCard />
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes frequentes</p><h2>On règle les problèmes qui bloquent votre journée.</h2></div>
        <div className="chips">{pains.map((p) => <a href={whatsappLink(quickMessage(p))} key={p} data-conversion="whatsapp-pain">{p}</a>)}</div>
      </section>

      <section className="section cards">
        <article><h3>01. Message WhatsApp</h3><p>Envoyez le quartier, la marque et le symptôme. Le message est pré-rempli pour aller vite.</p></article>
        <article><h3>02. Diagnostic clair</h3><p>On qualifie la panne avant intervention pour éviter les déplacements inutiles.</p></article>
        <article><h3>03. Technicien fiable</h3><p>Un professionnel disponible intervient selon votre zone à Dakar.</p></article>
      </section>

      <section className="section brand-section">
        <p className="eyebrow">Marques reparees</p>
        <h2>Compatible avec les grandes marques de machine à laver.</h2>
        <div className="brand-grid">{brands.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="section promise-section">
        <div><p className="eyebrow">Diagnostic & prix clair</p><h2>Pas de mauvaise surprise avant intervention.</h2></div>
        <div className="promise-cards">
          <article><b>Diagnostic d'abord</b><p>On comprend la panne avec vous avant de lancer une intervention.</p></article>
          <article><b>Validation avant travaux</b><p>Le client est informé avant toute réparation importante.</p></article>
          <article><b>Priorité au besoin réel</b><p>Si la panne ne vaut pas une grosse réparation, on vous l'explique clairement.</p></article>
        </div>
      </section>

      <section id="whatsapp-intelligent" className="section form-zone">
        <div><p className="eyebrow">WhatsApp intelligent</p><h2>Un contact plus précis qu’un simple bouton.</h2><p>Préparez un message clair en quelques secondes. Le client arrive sur WhatsApp avec un besoin déjà qualifié.</p></div>
        <SmartWhatsAppForm />
      </section>

      <section className="section"><p className="eyebrow">Zones d'intervention</p><h2>Dakar et quartiers proches.</h2><div className="areas">{areas.map((a) => <span key={a}>{a}</span>)}</div></section>
      <section className="section faq-section"><p className="eyebrow">Questions frequentes</p><h2>Avant de contacter FIX.</h2><FaqAccordion /></section>
      <section className="final-cta"><h2>Besoin d’un dépannage machine à laver ?</h2><p>FIX Dakar vous répond rapidement sur WhatsApp.</p><a className="primary" href={whatsappLink(quickMessage())} data-conversion="whatsapp-final">Contacter FIX</a></section>
      <footer className="footer upgraded-footer"><div><b>FIX Dépannage Dakar</b><p>Réparation machine à laver et dépannage électroménager à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div><div className="footer-links"><a href="tel:+221777989238" data-conversion="call-footer">+221 77 798 92 38</a><a href="mailto:contact@fenixfuz.com">contact@fenixfuz.com</a><a href={whatsappLink(quickMessage())} data-conversion="whatsapp-footer">WhatsApp</a><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link></div></footer>
    </main>
  );
}
