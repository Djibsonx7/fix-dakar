export default function Confidentialite() {
  return (
    <main style={{padding:'60px 24px',maxWidth:'900px',margin:'0 auto',color:'#fff',fontFamily:'Inter, Arial, sans-serif'}}>
      <h1 style={{fontSize:'48px',marginBottom:'24px'}}>Politique de confidentialité</h1>

      <p style={{opacity:.82,lineHeight:1.8}}>
        Les informations transmises via WhatsApp ou via le site FIX Dakar servent uniquement à répondre aux demandes de dépannage et d’assistance.
      </p>

      <div style={{marginTop:'40px',display:'grid',gap:'18px'}}>
        <section>
          <h2>Données transmises</h2>
          <p>
            Selon votre message, certaines informations peuvent être partagées : quartier, numéro de téléphone, marque de machine, description de panne ou photo.
          </p>
        </section>

        <section>
          <h2>Utilisation</h2>
          <p>
            Ces informations servent uniquement à comprendre la panne et à organiser une intervention ou une assistance.
          </p>
        </section>

        <section>
          <h2>Mesure d’audience</h2>
          <p>
            Le site peut utiliser des outils comme Google Analytics ou Google Ads afin d’améliorer les performances et mesurer les conversions.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Email : contact@fenixfuz.com</p>
        </section>
      </div>
    </main>
  )
}
