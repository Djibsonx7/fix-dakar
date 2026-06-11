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
const heaterTypes = [
  'Chauffe-eau électrique',
  'Chauffe-eau mural',
  'Chauffe-eau horizontal',
  'Ballon d’eau chaude',
  'Chauffe-eau à accumulation',
  'Chauffe-eau instantané',
];
const pains = ['Ne chauffe plus', 'Eau tiède', 'Disjoncte', 'Fuite d’eau', 'Résistance', 'Thermostat', 'Voyant allumé sans eau chaude'];
const heaterServices = [
  { title: 'Chauffe-eau électrique', text: 'Panne de résistance, thermostat ou problème de chauffe.' },
  { title: 'Ballon d’eau chaude', text: 'Eau tiède, arrêt soudain, fuite ou voyant anormal.' },
  { title: 'Sécurité électrique', text: 'Disjonction, court-circuit ou appareil à vérifier avant manipulation.' },
];

function HeaterVisual() {
  return (
    <div className="heater-visual-wrap">
      <div className="heat-glow glow-one"></div>
      <div className="heat-glow glow-two"></div>
      <div className="heater">
        <div className="heater-light"></div>
        <div className="heater-screen"></div>
        <div className="heater-panel"></div>
        <div className="heater-pipe pipe-left"></div>
        <div className="heater-pipe pipe-right"></div>
        <div className="heater-shine"></div>
      </div>
      <div className="status-card heater-status heater-status-one"><b>Eau chaude</b><span>Chauffe-eau qui ne chauffe plus</span><small>Diagnostic • Dakar</small></div>
      <div className="status-card heater-status heater-status-two"><b>Demande reçue</b><span>Type + quartier</span><small>WhatsApp préparé</small></div>
      <div className="status-card heater-status heater-status-three"><b>Sécurité</b><span>Fuite ou disjonction</span><small>À vérifier</small></div>
    </div>
  );
}

function MiniHeaterPreview({ area, heaterType, problem }: { area: string; heaterType: string; problem: string }) {
  return (
    <div className="contact-visual heater-contact-visual" aria-label="Aperçu du message WhatsApp chauffe-eau préparé">
      <div className="mini-heater"><div className="mini-heater-light"></div><div className="mini-heater-screen"></div><div className="mini-heater-panel"></div><div className="mini-shine"></div></div>
      <div className="message-bubble bubble-one"><b>Quartier</b><span>{area}</span></div>
      <div className="message-bubble bubble-two"><b>Type</b><span>{heaterType}</span></div>
      <div className="message-bubble bubble-three"><b>Panne</b><span>{problem}</span></div>
      <div className="message-bubble bubble-four"><b>Message</b><span>Prêt</span></div>
    </div>
  );
}

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
        <MiniHeaterPreview area={area} heaterType={heaterType} problem={problem} />
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
    ['Pourquoi mon chauffe-eau disjoncte ?', 'Cela peut venir de la résistance, du thermostat ou d\’un problème électrique nécessitant un diagnostic. Évitez de forcer l\’appareil si la coupure revient.'],
    ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez une photo du chauffe-eau, la marque, le quartier et le symptôme observé : eau froide, eau tiède, fuite ou disjonction.'],
    ['Combien coûte la réparation d\’un chauffe-eau à Dakar ?', 'Le prix dépend de la panne et des pièces nécessaires. Un remplacement de résistance ou de thermostat est généralement moins coûteux qu\’une fuite sur le ballon. FIX clarifie le coût avant toute intervention importante.'],
    ['Peut-on réparer un chauffe-eau qui ne chauffe plus du tout ?', 'Oui dans la majorité des cas. Eau froide = souvent résistance ou thermostat en panne, pièces remplaçables. Si le ballon lui-même est percé ou très rouillé, un remplacement peut être préférable.'],
    ['Intervenez-vous en urgence pour une fuite de chauffe-eau ?', 'En cas de fuite visible, coupez l\’alimentation électrique et l\’arrivée d\’eau avant tout. Envoyez une photo sur WhatsApp pour que FIX qualifie l\’urgence et oriente un technicien disponible rapidement.'],
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
    <main className="site-shell service-page heater-page">
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

        <div className="hero-card service-card-visual heater-hero-card">
          <HeaterVisual />
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

      <section className="section cards service-type-cards">
        {heaterServices.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </section>

      <section className="section brand-section">
        <p className="eyebrow">Marques prises en charge</p>
        <h2>Chauffe-eau des grandes marques réparés à Dakar.</h2>
        <div className="brand-grid">
          {['Ariston', 'Atlantic', 'Roch', 'Beko', 'Haier', 'Hisense'].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
        <div className="promise-cards" style={{ marginTop: '32px' }}>
          <article>
            <b>Ariston & Atlantic</b>
            <p>Marques européennes très répandues à Dakar. Pannes fréquentes : résistance calcifiée, thermostat défaillant ou fuite du groupe de sécurité.</p>
          </article>
          <article>
            <b>Roch & Beko</b>
            <p>Chauffe-eaux accessibles et courants au Sénégal. Résistance et thermostat remplaçables, pièces disponibles localement.</p>
          </article>
          <article>
            <b>Haier & Hisense</b>
            <p>Marques asiatiques en forte progression à Dakar. Diagnostic possible sur toutes pannes : chauffe insuffisante, fuite ou disjonction.</p>
          </article>
        </div>
      </section>

      <section className="section promise-section">
        <div><p className="eyebrow">Sécurité & diagnostic</p><h2>Avant de manipuler un chauffe-eau en panne.</h2></div>
        <div className="promise-cards">
          <article><b>Disjonction répétée</b><p>Évitez de réarmer plusieurs fois sans diagnostic si le chauffe-eau fait couper le courant.</p></article>
          <article><b>Fuite visible</b><p>Envoyez une photo de la zone concernée et évitez toute manipulation risquée.</p></article>
          <article><b>Eau froide ou tiède</b><p>La résistance, le thermostat ou l’alimentation peuvent être en cause.</p></article>
        </div>
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
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="phone_click">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link><Link className="footer-legal" href="/mentions-legales">Mentions légales</Link><Link className="footer-legal" href="/confidentialite">Confidentialité</Link></div>
      </footer>
    </main>
  );
}
