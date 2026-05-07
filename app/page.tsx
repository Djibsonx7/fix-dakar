const phone = '221777989238';

function whatsappLink(problem = 'machine a laver') {
  const text = `Bonjour FIX Dakar, j'ai besoin d'une intervention pour ma ${problem}. Je suis a Dakar.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

const pains = ['Ne demarre plus', 'Fuite d eau', 'Probleme de vidange', 'Tambour bloque', 'Bruit anormal', 'Essorage impossible'];
const areas = ['Ouakam', 'Almadies', 'Yoff', 'Hann', 'Maristes', 'Sacré-Coeur', 'Grand Yoff', 'Point E'];

export default function HomePage() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <div className="brand"><span>FIX</span><small>Dakar</small></div>
        <a className="nav-cta" href={whatsappLink()}>WhatsApp</a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Service urbain de depannage premium</p>
          <h1>Réparation machine à laver à Dakar.</h1>
          <p className="lead">Diagnostic clair, intervention rapide et assistance WhatsApp pour vos pannes de lave-linge et appareils électroménagers.</p>
          <div className="actions">
            <a className="primary" href={whatsappLink()}>Décrire mon problème</a>
            <a className="secondary" href="tel:+221777989238">Appeler maintenant</a>
          </div>
          <div className="trust-row"><span>5.0 avis Google</span><span>Techniciens fiables</span><span>Dakar</span></div>
        </div>
        <div className="hero-card">
          <div className="machine">
            <div className="screen"></div><div className="door"></div><div className="shine"></div>
          </div>
          <div className="status-card"><b>Intervention FIX</b><span>Machine qui ne vidange plus • WhatsApp reçu</span></div>
        </div>
      </section>

      <section className="section grid-two">
        <div><p className="eyebrow">Pannes frequentes</p><h2>On règle les problèmes qui bloquent votre journée.</h2></div>
        <div className="chips">{pains.map((p) => <a href={whatsappLink(p)} key={p}>{p}</a>)}</div>
      </section>

      <section className="section cards">
        <article><h3>01. Message WhatsApp</h3><p>Envoyez le quartier, la marque et le symptôme. Le message est pré-rempli pour aller vite.</p></article>
        <article><h3>02. Diagnostic clair</h3><p>On qualifie la panne avant intervention pour éviter les déplacements inutiles.</p></article>
        <article><h3>03. Technicien fiable</h3><p>Un professionnel disponible intervient selon votre zone à Dakar.</p></article>
      </section>

      <section className="section form-zone">
        <div><p className="eyebrow">WhatsApp intelligent</p><h2>Un contact plus précis qu’un simple bouton.</h2><p>Choisissez une panne et démarrez une conversation déjà claire avec FIX.</p></div>
        <div className="quick-list">{pains.slice(0,4).map((p) => <a className="quick" href={whatsappLink(p)} key={p}>Ma machine : {p}</a>)}</div>
      </section>

      <section className="section"><p className="eyebrow">Zones d'intervention</p><h2>Dakar et quartiers proches.</h2><div className="areas">{areas.map((a) => <span key={a}>{a}</span>)}</div></section>

      <section className="final-cta"><h2>Besoin d’un dépannage machine à laver ?</h2><p>FIX Dakar vous répond rapidement sur WhatsApp.</p><a className="primary" href={whatsappLink()}>Contacter FIX</a></section>
    </main>
  );
}
