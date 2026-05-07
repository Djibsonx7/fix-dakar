export default function HomePage() {
  return (
    <main style={{background:'#0b1020',color:'white',minHeight:'100vh',padding:'40px',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'56px',fontWeight:'bold',maxWidth:'700px'}}>
        Réparation Machine à Laver à Dakar
      </h1>

      <p style={{fontSize:'20px',opacity:0.8,maxWidth:'600px',marginTop:'20px'}}>
        Intervention rapide • Diagnostic clair • Assistance WhatsApp immédiate.
      </p>

      <div style={{display:'flex',gap:'16px',marginTop:'32px'}}>
        <a href='https://wa.me/221777989238' style={{background:'#22c55e',padding:'16px 24px',borderRadius:'14px',color:'white',textDecoration:'none',fontWeight:'bold'}}>
          WhatsApp
        </a>

        <a href='tel:+221777989238' style={{border:'1px solid rgba(255,255,255,0.2)',padding:'16px 24px',borderRadius:'14px',color:'white',textDecoration:'none'}}>
          Appeler
        </a>
      </div>
    </main>
  );
}
