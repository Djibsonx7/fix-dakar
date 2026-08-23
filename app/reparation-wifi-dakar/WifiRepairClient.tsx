'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const simpleWifiMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour mon wifi/réseau à Dakar.`;
const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Cœur', 'Grand Yoff', 'Point E', 'Autre quartier à Dakar'];
const displayAreas = areas.filter((area) => area !== 'Autre quartier à Dakar');
const connectionTypes = ['Orange/Sonatel', 'Starlink', 'Autre box', 'Je ne sais pas'];
const problems = ['Wifi faible / zone morte', 'Coupures fréquentes', 'Installation nouveau routeur', 'Extension de couverture (répéteur/mesh)', 'Sécurisation du réseau', 'Configuration Starlink', 'Autre'];
const wifiServices = [
  { title: 'Zones mortes', text: 'Wifi faible ou absent dans certaines pièces, extension de couverture nécessaire.' },
  { title: 'Nouveau routeur', text: 'Installation et configuration d’un routeur neuf ou de remplacement.' },
  { title: 'Starlink', text: 'Installation, configuration ou dépannage d’une connexion Starlink.' },
];
const faqs = [
  ['Réparez-vous le wifi à domicile à Dakar ?', 'Oui, FIX Dakar peut orienter votre demande vers un technicien disponible selon votre quartier et le type de problème constaté.'],
  ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez le quartier, le type de connexion (Orange/Sonatel, Starlink, autre box) et le problème exact : zone morte, coupures, installation ou configuration.'],
  ['Est-ce que vous touchez à mon abonnement internet ?', 'Non, on n\'intervient jamais sur votre abonnement ou votre ligne, uniquement sur l\'installation et la configuration de vos équipements (routeur, répéteurs, Starlink).'],
  ['Quel est le délai d\'intervention ?', 'Le délai dépend du quartier et de la disponibilité du technicien. Envoyez votre demande sur WhatsApp pour connaître rapidement un créneau possible.'],
  ['Prenez-vous en charge les installations Starlink ?', 'Oui, FIX Dakar peut orienter votre demande pour l\'installation, la configuration ou le dépannage d\'une connexion Starlink.'],
  ['Intervenez-vous pour une extension wifi avec répéteur ou mesh ?', 'Oui, la demande peut concerner l\'installation d\'un répéteur ou d\'un système mesh pour couvrir les zones mortes de votre logement.'],
];

function WifiVisual() {
  return (
    <div className="wifi-visual-wrap">
      <div className="signal-ring"></div>
      <div className="signal-ring signal-ring-two"></div>
      <div className="signal-ring signal-ring-three"></div>
      <div className="router">
        <div className="router-antenna antenna-left"></div>
        <div className="router-antenna antenna-right"></div>
        <div className="router-face">
          <div className="router-lights"><span></span><span></span><span></span></div>
          <div className="router-vent"></div>
          <div className="router-shine"></div>
        </div>
      </div>
      <div className="status-card wifi-status wifi-status-one"><b>Wifi faible</b><span>Zone morte détectée</span><small>Diagnostic • Dakar</small></div>
      <div className="status-card wifi-status wifi-status-two"><b>Demande reçue</b><span>Connexion + quartier</span><small>WhatsApp préparé</small></div>
      <div className="status-card wifi-status wifi-status-three"><b>Intervention</b><span>Technicien disponible</span><small>Selon la zone</small></div>
    </div>
  );
}

function SmartWifiLead() {
  const [area, setArea] = useState('Yoff');
  const [connectionType, setConnectionType] = useState('Orange/Sonatel');
  const [problem, setProblem] = useState('Wifi faible / zone morte');
  const [details, setDetails] = useState('');

  const message = useMemo(() => {
    const detailText = details.trim() ? `\nDétail : ${details.trim()}` : '';
    return `Bonjour FIX Dakar, j'ai besoin d'une intervention pour mon wifi/réseau.\nQuartier : ${area}\nType de connexion : ${connectionType}\nProblème : ${problem}${detailText}`;
  }, [area, connectionType, problem, details]);

  return (
    <>
      <div>
        <p className="eyebrow">WhatsApp intelligent</p>
        <h2>Décrivez votre problème wifi en quelques secondes.</h2>
        <p>Sélectionnez le quartier, le type de connexion et le problème. Le message WhatsApp est préparé automatiquement pour aider FIX Dakar à qualifier rapidement votre demande.</p>
        <div className="contact-visual wifi-contact-visual" aria-label="Aperçu du message WhatsApp wifi préparé">
          <div className="mini-router"><div className="mini-router-antenna left"></div><div className="mini-router-antenna right"></div><div className="mini-router-light"></div><div className="mini-shine"></div></div>
          <div className="message-bubble bubble-one"><b>Quartier</b><span>{area}</span></div>
          <div className="message-bubble bubble-two"><b>Connexion</b><span>{connectionType}</span></div>
          <div className="message-bubble bubble-three"><b>Problème</b><span>{problem}</span></div>
          <div className="message-bubble bubble-four"><b>Message</b><span>Prêt</span></div>
        </div>
      </div>
      <div className="smart-card">
        <div className="form-grid">
          <label>Quartier<select value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Type de connexion<select value={connectionType} onChange={(e) => setConnectionType(e.target.value)}>{connectionTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Problème<select value={problem} onChange={(e) => setProblem(e.target.value)}>{problems.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Précision<textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex : le wifi coupe surtout le soir dans la chambre" /></label>
        </div>
        <div className="message-preview"><span>Message préparé</span><p>{message}</p></div>
        <a className="primary wide" href={whatsappLink(message)} data-conversion="whatsapp-wifi-form">Envoyer ma demande sur WhatsApp</a>
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

export default function WifiRepairClient() {
  return (
    <main className="site-shell service-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Wifi • Réseau</small></div>
        </Link>
        <a className="nav-cta" href={whatsappLink(simpleWifiMessage)} data-conversion="whatsapp-wifi-header">WhatsApp</a>
      </nav>

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage wifi et réseau à Dakar</p>
          <h1>Réparation wifi à Dakar.</h1>
          <p className="lead">Wifi faible, coupures fréquentes, nouveau routeur ou configuration Starlink ? Envoyez les détails sur WhatsApp pour une première qualification rapide.</p>
          <div className="actions">
            <a className="primary" href="#whatsapp-wifi-intelligent" data-conversion="whatsapp-wifi-hero">Décrire mon problème wifi</a>
            <a className="secondary" href={`tel:+${phone}`} data-conversion="call-wifi-hero">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>Dakar</span><span>Diagnostic clair</span><span>Selon disponibilité</span></div>
        </div>
        <div className="hero-card service-card-visual wifi-hero-card">
          <WifiVisual />
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Problèmes fréquents</p><h2>Les problèmes de wifi à vérifier rapidement.</h2></div>
        <div className="chips">
          {problems.map((problem) => (
            <a className="quick-chip" href={whatsappLink(`${simpleWifiMessage}\nProblème : ${problem}.`)} key={problem} data-conversion="whatsapp-wifi-problem">
              <span>{problem}</span><small>WhatsApp</small><b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section cards">
        <article><h3>01. Envoyez le symptôme</h3><p>Expliquez si le wifi est faible, coupe souvent ou s’il s’agit d’une nouvelle installation.</p></article>
        <article><h3>02. Diagnostic clair</h3><p>On qualifie le problème avec le type de connexion, le quartier et les informations disponibles.</p></article>
        <article><h3>03. Intervention selon zone</h3><p>Un technicien peut être orienté selon disponibilité et type d’intervention.</p></article>
      </section>

      <section id="whatsapp-wifi-intelligent" className="section form-zone">
        <SmartWifiLead />
      </section>

      <section className="section cards service-type-cards">
        {wifiServices.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </section>

      <section className="section brand-section">
        <p className="eyebrow">Connexions prises en charge</p>
        <h2>Toutes les connexions internet réparées et configurées à Dakar.</h2>
        <div className="brand-grid">
          {['Orange/Sonatel', 'Starlink', 'Autre box'].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
        <div className="promise-cards" style={{ marginTop: '32px' }}>
          <article>
            <b>Orange/Sonatel</b>
            <p>Box la plus répandue à Dakar. Pannes fréquentes : zone morte, coupures, redémarrage nécessaire ou changement de routeur.</p>
          </article>
          <article>
            <b>Starlink</b>
            <p>Installation, orientation de l’antenne, configuration du routeur ou dépannage d’une connexion Starlink existante.</p>
          </article>
          <article>
            <b>Autre box</b>
            <p>Installation de nouveaux équipements, extension de couverture avec répéteur ou système mesh, sécurisation du réseau.</p>
          </article>
        </div>
      </section>

      <section className="section promise-section">
        <div><p className="eyebrow">Avant déplacement</p><h2>Envoyez une photo ou vidéo pour mieux qualifier.</h2></div>
        <div className="promise-cards">
          <article><b>Zone morte</b><p>Précisez les pièces concernées et la distance approximative avec le routeur.</p></article>
          <article><b>Coupures</b><p>Indiquez à quel moment les coupures surviennent et leur fréquence.</p></article>
          <article><b>Nouvelle installation</b><p>Envoyez une photo du routeur ou du kit Starlink à installer.</p></article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Zones d’intervention</p>
        <h2>Réparation wifi à Dakar et quartiers proches.</h2>
        <div className="areas">{displayAreas.map((a) => <span key={a}>{a}</span>)}<span>Autres quartiers à Dakar</span></div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour votre wifi.</h2>
        <FaqAccordion />
      </section>

      <section className="final-cta">
        <h2>Besoin d’un dépannage wifi à Dakar ?</h2>
        <p>Envoyez le quartier, le type de connexion et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(simpleWifiMessage)} data-conversion="whatsapp-wifi-final">Contacter FIX</a>
      </section>

      <footer className="footer upgraded-footer">
        <div><b>FIX Dépannage Dakar</b><p>Réparation wifi, réseau et électroménager à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div>
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="call-wifi-footer">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link><Link className="footer-legal" href="/mentions-legales">Mentions légales</Link><Link className="footer-legal" href="/confidentialite">Confidentialité</Link></div>
      </footer>
    </main>
  );
}
