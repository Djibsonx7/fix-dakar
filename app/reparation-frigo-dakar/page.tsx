import Image from 'next/image';
import Link from 'next/link';

const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const frigoMessage = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour un frigo à Dakar.\nQuartier :\nMarque :\nProblème : ne refroidit plus / fuite / bruit / congèle trop\nPrécision :`;

const pains = [
  'Ne refroidit plus',
  'Froid insuffisant',
  'Fuite d’eau',
  'Bruit anormal',
  'Congèle trop',
  'Ne démarre plus',
];

const faqs = [
  ['Réparez-vous les frigos à domicile à Dakar ?', 'Oui, FIX Dakar peut orienter votre demande vers un technicien disponible selon votre quartier et le type de panne constatée.'],
  ['Que dois-je envoyer sur WhatsApp ?', 'Envoyez le quartier, la marque, une photo ou vidéo si possible, et le symptôme exact : plus de froid, fuite, bruit, givre ou panne électrique.'],
  ['Le prix est-il fixé avant intervention ?', 'Le montant dépend de la panne et des pièces éventuelles. FIX privilégie un diagnostic clair avant toute réparation importante.'],
  ['Intervenez-vous sur réfrigérateur et congélateur ?', 'Oui, la demande peut concerner un frigo, un réfrigérateur, un combiné ou un congélateur selon disponibilité technique.'],
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

export const metadata = {
  title: 'Réparation frigo Dakar | Dépannage réfrigérateur - FIX Dakar',
  description:
    'Réparation frigo à Dakar : panne de froid, fuite, bruit anormal, congélateur ou réfrigérateur. Contact rapide WhatsApp avec FIX Dakar.',
  alternates: {
    canonical: '/reparation-frigo-dakar',
  },
};

export default function FrigoRepairPage() {
  return (
    <main className="site-shell service-page">
      <nav className="nav">
        <Link className="brand brand-with-logo" href="/">
          <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
          <div className="brand-text"><strong>Dépannage Dakar</strong><small>Frigo • Réfrigérateur</small></div>
        </Link>
        <a className="nav-cta" href={whatsappLink(frigoMessage)} data-conversion="whatsapp-frigo-header">WhatsApp</a>
      </nav>

      <section className="hero service-hero">
        <div className="hero-copy">
          <p className="eyebrow">Dépannage électroménager à Dakar</p>
          <h1>Réparation frigo à Dakar.</h1>
          <p className="lead">Frigo qui ne refroidit plus, fuite, bruit anormal ou congélateur en panne ? Envoyez les détails sur WhatsApp pour une première qualification rapide.</p>
          <div className="actions">
            <a className="primary" href={whatsappLink(frigoMessage)} data-conversion="whatsapp-frigo-hero">Décrire ma panne frigo</a>
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
            <a className="quick-chip" href={whatsappLink(`${frigoMessage}\nPanne sélectionnée : ${pain}`)} key={pain} data-conversion="whatsapp-frigo-pain">
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

      <section className="section promise-section">
        <div><p className="eyebrow">Avant déplacement</p><h2>Envoyez une photo ou vidéo pour mieux qualifier.</h2></div>
        <div className="promise-cards">
          <article><b>Panne de froid</b><p>Précisez si le moteur tourne, si l’intérieur reste chaud ou si le froid est faible.</p></article>
          <article><b>Fuite ou givre</b><p>Indiquez l’endroit de la fuite ou envoyez une photo du givre constaté.</p></article>
          <article><b>Bruit anormal</b><p>Une courte vidéo peut aider à comprendre le bruit avant intervention.</p></article>
        </div>
      </section>

      <section className="section faq-section">
        <p className="eyebrow">Questions fréquentes</p>
        <h2>Avant de contacter FIX pour un frigo.</h2>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <article className="faq-item open" key={question}>
              <button type="button"><span>{question}</span><strong>+</strong></button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h2>Besoin d’un dépannage frigo à Dakar ?</h2>
        <p>Envoyez le quartier, la marque et le problème constaté sur WhatsApp.</p>
        <a className="primary" href={whatsappLink(frigoMessage)} data-conversion="whatsapp-frigo-final">Contacter FIX</a>
      </section>

      <footer className="footer upgraded-footer">
        <div><b>FIX Dépannage Dakar</b><p>Réparation frigo, machine à laver et électroménager à Dakar.</p><span>Dakar • Intervention selon disponibilité</span></div>
        <div className="footer-links"><a className="footer-contact" href={`tel:+${phone}`} data-conversion="call-frigo-footer">{displayPhone}</a><Link className="footer-legal" href="/">Accueil</Link></div>
      </footer>
    </main>
  );
}
