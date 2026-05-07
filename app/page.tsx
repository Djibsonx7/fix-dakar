'use client';

import Image from 'next/image';
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
      <a className="primary wide" href={whatsappLink(message)}>Envoyer sur WhatsApp</a>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <div className="brand brand-with-logo">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={64} height={64} priority /></span>
          <div className="brand-text"><strong>FIX</strong><small>Dépannage Dakar</small></div>
        </div>
        <a className="nav-cta" href={whatsappLink(quickMessage())}>WhatsApp</a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Service urbain de depannage premium</p>
          <h1>Réparation machine à laver à Dakar.</h1>
          <p className="lead">Diagnostic clair, intervention rapide et assistance WhatsApp pour vos pannes de lave-linge et appareils électroménagers.</p>
          <div className="actions">
            <a className="primary" href="#whatsapp-intelligent">Décrire mon problème</a>
            <a className="secondary" href="tel:+221777989238">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>5.0 avis Google</span><span>Techniciens fiables</span><span>Dakar</span></div>
        </div>
        <div className="hero-card">
          <div className="machine"><div className="screen"></div><div className="door"></div><div className="shine"></div></div>
          <div className="status-card"><b>Intervention FIX</b><span>Machine qui ne vidange plus • WhatsApp reçu</span></div>
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes frequentes</p><h2>On règle les problèmes qui bloquent votre journée.</h2></div>
        <div className="chips">{pains.map((p) => <a href={whatsappLink(quickMessage(p))} key={p}>{p}</a>)}</div>
      </section>

      <section className="section cards">
        <article><h3>01. Message WhatsApp</h3><p>Envoyez le quartier, la marque et le symptôme. Le message est pré-rempli pour aller vite.</p></article>
        <article><h3>02. Diagnostic clair</h3><p>On qualifie la panne avant intervention pour éviter les déplacements inutiles.</p></article>
        <article><h3>03. Technicien fiable</h3><p>Un professionnel disponible intervient selon votre zone à Dakar.</p></article>
      </section>

      <section id="whatsapp-intelligent" className="section form-zone">
        <div><p className="eyebrow">WhatsApp intelligent</p><h2>Un contact plus précis qu’un simple bouton.</h2><p>Préparez un message clair en quelques secondes. Le client arrive sur WhatsApp avec un besoin déjà qualifié.</p></div>
        <SmartWhatsAppForm />
      </section>

      <section className="section"><p className="eyebrow">Zones d'intervention</p><h2>Dakar et quartiers proches.</h2><div className="areas">{areas.map((a) => <span key={a}>{a}</span>)}</div></section>
      <section className="final-cta"><h2>Besoin d’un dépannage machine à laver ?</h2><p>FIX Dakar vous répond rapidement sur WhatsApp.</p><a className="primary" href={whatsappLink(quickMessage())}>Contacter FIX</a></section>
    </main>
  );
}
