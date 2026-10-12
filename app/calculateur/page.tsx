'use client';

import { useState } from 'react';
import Link from 'next/link';
import InternalGuard from '@/components/InternalGuard';

const FIX_RATE = 0.30;
const TECH_RATE = 0.70;
const ROUNDING_STEP = 500;
const money = new Intl.NumberFormat('fr-SN', { maximumFractionDigits: 0 });

function amount(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}
function fcfa(value: number): string {
  return `${money.format(Math.round(value))} FCFA`;
}
function roundedClientPrice(technicianAmount: number): number {
  if (technicianAmount <= 0) return 0;
  return Math.ceil(technicianAmount / TECH_RATE / ROUNDING_STEP) * ROUNDING_STEP;
}

export default function CalculateurFixPage() {
  const [technicianInput, setTechnicianInput] = useState('14000');
  const [negotiationEnabled, setNegotiationEnabled] = useState(false);
  const [counterOfferInput, setCounterOfferInput] = useState('');
  const [technicianApproved, setTechnicianApproved] = useState(false);
  const [copied, setCopied] = useState(false);

  const desiredNet = amount(technicianInput);
  const initialPrice = roundedClientPrice(desiredNet);
  const counterOffer = amount(counterOfferInput);
  const hasOffer = negotiationEnabled && counterOfferInput.trim() !== '' && counterOffer > 0;
  const price = hasOffer ? counterOffer : initialPrice;
  const fixShare = Math.round(price * FIX_RATE);
  const technicianShare = price - fixShare;
  const shortfall = Math.max(0, desiredNet - technicianShare);
  const requiresAgreement = hasOffer && shortfall > 0;
  const accepted = price > 0 && (!requiresAgreement || technicianApproved);
  const proposedDiscount = hasOffer ? initialPrice - price : 0;

  function reset() {
    setTechnicianInput('14000');
    setNegotiationEnabled(false);
    setCounterOfferInput('');
    setTechnicianApproved(false);
    setCopied(false);
  }

  async function copySummary() {
    const lines = [
      'FIX — Simulation interne de main-d’œuvre',
      `Rémunération demandée par le technicien : ${fcfa(desiredNet)}`,
      `Prix initial conseillé : ${fcfa(initialPrice)}`,
      hasOffer ? `Contre-proposition du client : ${fcfa(price)}` : null,
      `Prix retenu pour la simulation : ${fcfa(price)}`,
      `Part FIX (30 %) : ${fcfa(fixShare)}`,
      `Part technicien (70 %) : ${fcfa(technicianShare)}`,
      requiresAgreement
        ? technicianApproved ? 'Accord du technicien : déclaré obtenu' : 'Attention : accord du technicien requis'
        : 'La part du technicien couvre sa demande initiale',
      'Hors pièces et frais de diagnostic/déplacement.',
    ].filter(Boolean).join('\n');
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <InternalGuard>
      <main className="fix-calc">
        <style>{`
          .fix-calc { min-height:100vh; padding:36px 18px 72px; background:radial-gradient(circle at 50% 0%,#17294e 0%,#090f20 48%,#030711 100%); color:#eef4ff; }
          .fix-calc * { box-sizing:border-box; }
          .fix-calc-wrap { max-width:1000px; margin:0 auto; }
          .fix-calc-top { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:22px; flex-wrap:wrap; }
          .fix-calc-brand { display:flex; align-items:center; gap:12px; font-weight:800; letter-spacing:.04em; }
          .fix-calc-brandmark { display:grid; place-items:center; width:44px; height:44px; border-radius:13px; background:linear-gradient(145deg,#45a2f5,#164dc0); box-shadow:0 12px 28px #0005; }
          .fix-calc-link { display:inline-flex; align-items:center; justify-content:center; border:1px solid #ffffff35; border-radius:12px; padding:10px 14px; text-decoration:none; color:#eaf1ff; font-size:14px; font-weight:650; background:#ffffff09; }
          .fix-calc-link:hover { border-color:#7bacee; background:#ffffff15; }
          .fix-calc-intro { margin-bottom:28px; }
          .fix-calc-intro h1 { font-size:clamp(26px,4vw,40px); line-height:1.15; margin:8px 0 10px; letter-spacing:-.03em; }
          .fix-calc-intro p { color:#b4c3dd; line-height:1.6; margin:0; max-width:670px; }
          .fix-calc-eyebrow { text-transform:uppercase; letter-spacing:.17em; color:#89c4ff; font-size:12px; font-weight:800; }
          .fix-calc-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:20px; align-items:start; }
          .fix-calc-card { background:#111d34; border:1px solid #334767; border-radius:22px; padding:26px; box-shadow:0 20px 55px #0002; }
          .fix-calc-card h2 { margin:0 0 18px; font-size:18px; letter-spacing:-.01em; }
          .fix-calc-label { display:block; margin:0 0 9px; font-size:13px; font-weight:700; color:#d8e4fa; }
          .fix-calc-input { display:block; width:100%; min-width:0; background:#070e1c; border:1px solid #577096; border-radius:13px; color:#fff; padding:14px 15px; font-size:20px; font-weight:750; outline:0; }
          .fix-calc-input:focus { border-color:#7fbaff; box-shadow:0 0 0 3px #5291e22e; }
          .fix-calc-help { color:#98aac7; font-size:12px; line-height:1.55; margin:8px 0 0; }
          .fix-calc-result { background:linear-gradient(115deg,#1a3c67,#102e50); border:1px solid #3d6b99; border-radius:17px; padding:20px; margin-top:22px; }
          .fix-calc-result small { display:block; font-size:12px; font-weight:700; color:#c3d9f6; }
          .fix-calc-result strong { display:block; margin-top:7px; font-size:clamp(25px,3.6vw,34px); letter-spacing:-.03em; overflow-wrap:anywhere; }
          .fix-calc-rule { border:0; border-top:1px solid #364963; margin:22px 0; }
          .fix-calc-toggle { display:flex; align-items:flex-start; gap:12px; cursor:pointer; font-weight:750; line-height:1.35; }
          .fix-calc-toggle input { margin-top:2px; width:19px; height:19px; accent-color:#60a5fa; flex-shrink:0; }
          .fix-calc-muted { color:#aebfdb; font-size:13px; line-height:1.55; }
          .fix-calc-money { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:17px 0; }
          .fix-calc-money > div { border-radius:14px; background:#081427; border:1px solid #385074; padding:17px 14px; min-width:0; }
          .fix-calc-money span { font-size:12px; color:#b6c8e2; font-weight:650; display:block; }
          .fix-calc-money strong { font-size:clamp(18px,2.6vw,25px); display:block; margin-top:8px; overflow-wrap:anywhere; }
          .fix-calc-money .fix-calc-green { color:#7fe0b4; }
          .fix-calc-status { border-radius:13px; padding:13px 15px; margin-top:14px; font-size:13px; line-height:1.55; }
          .fix-calc-status.warn { background:#382d1d; border:1px solid #bd8c3f; color:#ffdfa1; }
          .fix-calc-status.ok { background:#102f2a; border:1px solid #2f9176; color:#a8ebd7; }
          .fix-calc-status.info { background:#13273e; border:1px solid #3c6690; color:#c1dbff; }
          .fix-calc-button { display:inline-flex; align-items:center; justify-content:center; width:100%; border:0; border-radius:12px; padding:13px 18px; background:#3286eb; color:#fff; font-weight:800; font-size:14px; cursor:pointer; margin-top:18px; }
          .fix-calc-button:disabled { opacity:.45; cursor:not-allowed; }
          .fix-calc-button:hover:not(:disabled) { background:#2675d3; }
          .fix-calc-minor { border:1px solid #435a78; color:#dbe7ff; border-radius:12px; background:transparent; padding:10px 14px; font-weight:700; cursor:pointer; }
          .fix-calc-foot { margin-top:23px; padding:19px 22px; border:1px solid #2a405c; border-radius:17px; background:#0c1729; color:#aabbd7; font-size:13px; line-height:1.65; }
          .fix-calc-shortcuts { display:flex; flex-wrap:wrap; gap:10px; margin-top:15px; }
          @media(max-width:760px){ .fix-calc { padding:23px 13px 55px; } .fix-calc-grid { grid-template-columns:1fr; } .fix-calc-card { padding:20px; } .fix-calc-money strong { font-size:21px; } }
          @media(max-width:380px){ .fix-calc-money { grid-template-columns:1fr; } }
        `}</style>

        <div className="fix-calc-wrap">
          <header className="fix-calc-top">
            <div className="fix-calc-brand"><span className="fix-calc-brandmark">FIX</span><span>DÉPANNAGE DAKAR</span></div>
            <button type="button" onClick={reset} className="fix-calc-minor">Réinitialiser</button>
          </header>

          <div className="fix-calc-intro">
            <div className="fix-calc-eyebrow">Outil interne · Tarification</div>
            <h1>Calculateur de prix et négociation</h1>
            <p>Déterminez le prix client à partir de la rémunération souhaitée par le technicien, puis simulez un marchandage sans faire de calcul manuel.</p>
          </div>

          <div className="fix-calc-grid">
            <section className="fix-calc-card" aria-label="Prix de départ">
              <h2>1. Calcul du prix initial</h2>
              <label className="fix-calc-label" htmlFor="fix-calc-technician">Rémunération souhaitée par le technicien (FCFA)</label>
              <input id="fix-calc-technician" className="fix-calc-input" type="number" inputMode="numeric" min="0" step="500" value={technicianInput}
                onChange={(event) => { setTechnicianInput(event.target.value); setTechnicianApproved(false); setCopied(false); }} />
              <p className="fix-calc-help">Saisir la somme que le technicien souhaite recevoir, hors pièces et diagnostic.</p>
              <div className="fix-calc-result">
                <small>Prix initial à proposer au client</small>
                <strong>{fcfa(initialPrice)}</strong>
                <p className="fix-calc-help" style={{color:'#c3d9f6'}}>Calcul : rémunération ÷ 0,70, arrondi aux 500 FCFA supérieurs.</p>
              </div>

              <hr className="fix-calc-rule" />
              <label className="fix-calc-toggle">
                <input type="checkbox" checked={negotiationEnabled} onChange={(event) => { setNegotiationEnabled(event.target.checked); setTechnicianApproved(false); setCopied(false); }} />
                <span>Le client souhaite négocier le prix</span>
              </label>
              {negotiationEnabled && (
                <div style={{marginTop:18}}>
                  <label className="fix-calc-label" htmlFor="fix-calc-offer">Contre-proposition du client (FCFA)</label>
                  <input id="fix-calc-offer" className="fix-calc-input" type="number" inputMode="numeric" min="0" step="500"
                    placeholder="Ex. 18000" value={counterOfferInput}
                    onChange={(event) => { setCounterOfferInput(event.target.value); setTechnicianApproved(false); setCopied(false); }} />
                  {hasOffer && (
                    <p className="fix-calc-help">
                      {proposedDiscount > 0 ? `Réduction demandée : ${fcfa(proposedDiscount)}`
                        : proposedDiscount < 0 ? `Prix supérieur au prix initial de ${fcfa(-proposedDiscount)}`
                        : 'La proposition est égale au prix initial.'}
                    </p>
                  )}
                </div>
              )}
            </section>

            <section className="fix-calc-card" aria-label="Répartition du prix">
              <h2>2. Simulation de la répartition</h2>
              <div className="fix-calc-result" style={{marginTop:0}}>
                <small>Prix client simulé (main-d’œuvre uniquement)</small>
                <strong>{fcfa(price)}</strong>
              </div>

              <div className="fix-calc-money">
                <div><span>FIX · 30 %</span><strong className="fix-calc-green">{fcfa(fixShare)}</strong></div>
                <div><span>Technicien · 70 %</span><strong>{fcfa(technicianShare)}</strong></div>
              </div>

              {!desiredNet ? (
                <div className="fix-calc-status info">Renseignez la rémunération souhaitée par le technicien.</div>
              ) : negotiationEnabled && !hasOffer ? (
                <div className="fix-calc-status info">Entrez la proposition du client pour afficher la nouvelle répartition.</div>
              ) : requiresAgreement ? (
                <>
                  <div className="fix-calc-status warn">
                    <strong>Accord du technicien nécessaire.</strong>
                    <div>Il recevrait {fcfa(shortfall)} de moins que sa demande initiale ({fcfa(desiredNet)}).</div>
                  </div>
                  <label className="fix-calc-toggle" style={{marginTop:18}}>
                    <input type="checkbox" checked={technicianApproved} onChange={(event) => { setTechnicianApproved(event.target.checked); setCopied(false); }} />
                    <span>Le technicien a accepté cette nouvelle rémunération</span>
                  </label>
                </>
              ) : (
                <div className="fix-calc-status ok">La part du technicien couvre sa rémunération souhaitée.</div>
              )}

              <div className="fix-calc-status info" style={{marginTop:16}}>
                {accepted ? 'Prix utilisable après validation commerciale de FIX et accord du client.' : 'Simulation uniquement : ne validez pas ce tarif sans les accords nécessaires.'}
              </div>

              <button className="fix-calc-button" type="button" disabled={!price} onClick={copySummary}>
                {copied ? 'Récapitulatif copié ✓' : 'Copier le récapitulatif interne'}
              </button>
              <p className="fix-calc-help">Le calcul ne modifie aucun devis ni aucune facture.</p>
            </section>
          </div>

          <div className="fix-calc-foot">
            <strong>À retenir :</strong> les 30 % de FIX portent uniquement sur la main-d’œuvre. Les pièces détachées et les frais de déplacement/diagnostic se traitent séparément. Ce simulateur n’enregistre ni paiement ni rémunération.
            <div className="fix-calc-shortcuts">
              <Link className="fix-calc-link" href="/devis">Ouvrir les devis ↗</Link>
              <Link className="fix-calc-link" href="/facture">Ouvrir les factures ↗</Link>
            </div>
            <p style={{margin:'10px 0 0'}}>Aucun montant n’est transféré automatiquement : recopiez le prix retenu dans le document voulu.</p>
          </div>
        </div>
      </main>
    </InternalGuard>
  );
}
