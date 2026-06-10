'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import InternalGuard from '@/components/InternalGuard';

const applianceOptions = ['Machine à laver', 'Frigo', 'Climatiseur', 'Chauffe-eau', 'Micro-ondes', 'Autre appareil'];
const paymentModes = ['Espèces', 'Wave', 'Orange Money', 'Virement', 'Autre'];

function fmt(n: number) {
  return new Intl.NumberFormat('fr-SN').format(n);
}

function fmtDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function today() {
  return new Date().toLocaleDateString('fr-SN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function FacturePage() {
  const [invoiceNumber, setInvoiceNumber] = useState('FIX-...');
  const [client, setClient] = useState('');
  const [hasOrg, setHasOrg] = useState(false);
  const [org, setOrg] = useState('');
  const [area, setArea] = useState('');
  const [appliance, setAppliance] = useState('Machine à laver');
  const [brand, setBrand] = useState('');
  const [problem, setProblem] = useState('');
  const [intervention, setIntervention] = useState('');
  const [diagnostic, setDiagnostic] = useState(0);
  const [labor, setLabor] = useState(0);
  const [parts, setParts] = useState(0);
  const [payStatus, setPayStatus] = useState('Payé');
  const [payMode, setPayMode] = useState('Espèces');
  const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const storedYear = parseInt(localStorage.getItem('fix_invoice_year') || '0', 10);
    let counter = parseInt(localStorage.getItem('fix_invoice_counter') || '0', 10);
    if (storedYear !== year) {
      counter = 1;
    } else {
      counter += 1;
    }
    localStorage.setItem('fix_invoice_year', String(year));
    localStorage.setItem('fix_invoice_counter', String(counter));
    setInvoiceNumber(`FIX-${year}-${String(counter).padStart(4, '0')}`);
  }, []);

  const total = diagnostic + labor + parts;

  const autoIntervention = `Diagnostic de l'appareil ${appliance}${brand ? ' ' + brand : ''}, réparation des éléments défectueux et remise en service après test de fonctionnement.`;
  const interventionText = intervention.trim() !== '' ? intervention : autoIntervention;

  const issueDate = today();

  const tableRows = (() => {
    const rows: { label: string; amount: number }[] = [];
    if (diagnostic > 0) rows.push({ label: 'Diagnostic', amount: diagnostic });
    if (labor > 0) rows.push({ label: "Main d'œuvre réparation", amount: labor });
    if (parts > 0) rows.push({ label: 'Pièces de rechange', amount: parts });
    if (rows.length === 0) rows.push({ label: 'Diagnostic', amount: 0 });
    return rows;
  })();

  const problemLines = problem.split('\n').filter((l) => l.trim() !== '');

  return (
    <InternalGuard>
      <style>{`
        @media print {
          body { background: #fff !important; }
          .no-print { display: none !important; }
          .quote-page { display: block; padding: 0; background: #fff; }
          .quote-document {
            box-shadow: none;
            border-radius: 0;
            max-width: 100%;
            padding: 16px 24px;
            width: 100%;
          }
          .invoice-print-root {
            font-size: 11px;
          }
          .inv-table td, .inv-table th {
            padding: 6px 8px !important;
          }
          .inv-total-box strong {
            font-size: 16px !important;
          }
          .inv-problem-content, .inv-intervention-content {
            max-height: none !important;
            overflow: visible !important;
            font-size: 10px;
          }
        }
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
      `}</style>

      <main className="quote-page">
        {/* ── FORM PANEL ── */}
        <section className="quote-form-panel no-print">
          <div className="quote-form-header">
            <div className="brand brand-with-logo">
              <span className="logo-mark">
                <Image src="/assets/fix-logo.png" alt="FIX" width={56} height={56} priority />
              </span>
              <div className="brand-text">
                <strong>Facture FIX</strong>
                <small>Générateur interne</small>
              </div>
            </div>
            <button className="primary quote-download-button" type="button" onClick={() => window.print()}>
              Télécharger PDF
            </button>
          </div>

          <div className="quote-form-grid">
            {/* 1 — Nom du client */}
            <label className="wide-field">
              Nom du client
              <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nom du client" />
            </label>

            {/* 2 — Organisation */}
            <label className="wide-field" style={{ gap: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={hasOrg}
                  onChange={(e) => setHasOrg(e.target.checked)}
                  style={{ width: 'auto', padding: 0 }}
                />
                Ajouter une organisation
              </span>
              {hasOrg && (
                <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Ex : Ambassade, Société..." />
              )}
            </label>

            {/* 3 — Quartier */}
            <label className="wide-field">
              Quartier / Adresse
              <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ex : Dakar Plateau" />
            </label>

            {/* 4 — Appareil */}
            <label>
              Appareil
              <select value={appliance} onChange={(e) => setAppliance(e.target.value)}>
                {applianceOptions.map((a) => <option key={a}>{a}</option>)}
              </select>
            </label>

            {/* 5 — Marque */}
            <label>
              Marque
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Samsung, LG..." />
            </label>

            {/* 6 — Problème */}
            <label className="wide-field">
              Problème signalé
              <textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Ex : Moteur non fonctionnel, dysfonctionnement No Frost..." />
            </label>

            {/* 7 — Intervention */}
            <label className="wide-field">
              Intervention réalisée
              <textarea value={intervention} onChange={(e) => setIntervention(e.target.value)} placeholder="Laisser vide = texte automatique selon l'appareil" />
            </label>

            {/* 8 — Diagnostic */}
            <label>
              Diagnostic (FCFA)
              <input type="number" value={diagnostic} onChange={(e) => setDiagnostic(Number(e.target.value) || 0)} />
            </label>

            {/* 9 — Main d'œuvre */}
            <label>
              Main d'œuvre (FCFA)
              <input type="number" value={labor} onChange={(e) => setLabor(Number(e.target.value) || 0)} />
            </label>

            {/* 10 — Pièces */}
            <label>
              Pièces (FCFA)
              <input type="number" value={parts} onChange={(e) => setParts(Number(e.target.value) || 0)} />
            </label>

            {/* 11 — Statut paiement */}
            <label>
              Statut paiement
              <select value={payStatus} onChange={(e) => setPayStatus(e.target.value)}>
                {['Payé', 'En attente', 'À confirmer'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>

            {/* 12 — Mode de paiement (visible si Payé) */}
            {payStatus === 'Payé' && (
              <label>
                Mode de paiement
                <select value={payMode} onChange={(e) => setPayMode(e.target.value)}>
                  {paymentModes.map((m) => <option key={m}>{m}</option>)}
                </select>
              </label>
            )}

            {/* 13 — Date de paiement (visible si Payé) */}
            {payStatus === 'Payé' && (
              <label>
                Date de paiement
                <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} />
              </label>
            )}
          </div>
        </section>

        {/* ── DOCUMENT ── */}
        <section className="quote-document">
          <div className="invoice-print-root" style={{ background: '#fff', color: '#111827' }}>

            {/* 1 — Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '20px', borderBottom: '2px solid #0d1b3e' }}>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <span className="logo-mark" style={{ background: '#fff' }}>
                  <Image src="/assets/fix-logo.png" alt="FIX" width={72} height={72} priority />
                </span>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0d1b3e' }}>FIX – DÉPANNAGE DAKAR</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>Marque de Diakhate Corp SUARL</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.8, marginTop: '2px' }}>
                    RCCM : SN.DKR.2022.B.10533<br />
                    NINEA : 009292020<br />
                    Adresse : Hann Mariste 2, N°21 X, Dakar – Sénégal<br />
                    Téléphone : +221 78 820 80 80<br />
                    Email : contact@fenixfuz.com
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0d1b3e' }}>{invoiceNumber}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{issueDate}</div>
              </div>
            </div>

            {/* 2 — Titre */}
            <div style={{ textAlign: 'center', margin: '16px 0 12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '.15em', color: '#0d1b3e' }}>FACTURE</div>
              <div style={{ width: '60px', height: '2px', background: '#0d1b3e', margin: '6px auto 0' }} />
            </div>

            {/* 3 — Bloc client */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0' }}>
              <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <span style={{ background: '#0d1b3e', color: '#fff', fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>CLIENT</span>
                <div style={{ fontSize: '13px', lineHeight: 1.8, color: '#1e293b' }}>
                  <div style={{ fontWeight: 700 }}>{client || '—'}</div>
                  {hasOrg && org && <div>Organisation : {org}</div>}
                  {area && <div>Adresse : {area}</div>}
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '13px', lineHeight: 1.8, color: '#1e293b' }}>
                <div>N° Facture : <span style={{ fontWeight: 700, color: '#0d1b3e' }}>{invoiceNumber}</span></div>
                <div>Date : {issueDate}</div>
              </div>
            </div>

            {/* 4 — Tableau */}
            <table className="inv-table" style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}>
              <thead>
                <tr style={{ background: '#0d1b3e', color: '#fff' }}>
                  {['Désignation', 'Quantité', 'Montant unit. (FCFA)', 'Montant total (FCFA)'].map((h, i) => (
                    <th key={h} style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', padding: '9px 12px', textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: '11px 12px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '11px 12px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#374151', textAlign: 'right' }}>1</td>
                    <td style={{ padding: '11px 12px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#374151', textAlign: 'right', fontWeight: 600 }}>{fmt(row.amount)}</td>
                    <td style={{ padding: '11px 12px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#374151', textAlign: 'right', fontWeight: 600 }}>{fmt(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 5 — Total */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className="inv-total-box" style={{ background: '#0d1b3e', color: '#fff', borderRadius: '8px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '24px', minWidth: '260px' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>TOTAL À PAYER</span>
                <strong style={{ fontSize: '22px', fontWeight: 800 }}>{fmt(total)} FCFA</strong>
              </div>
            </div>

            {/* 6 — Problème / Intervention */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#0d1b3e', marginBottom: '8px' }}>PROBLÈME SIGNALÉ</div>
                <div className="inv-problem-content" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8, maxHeight: '80px', overflow: 'hidden' }}>
                  {problemLines.length > 0
                    ? problemLines.map((line, i) => <div key={i}>• {line}</div>)
                    : '—'}
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#0d1b3e', marginBottom: '8px' }}>INTERVENTION RÉALISÉE</div>
                <div className="inv-intervention-content" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8, maxHeight: '80px', overflow: 'hidden' }}>
                  {interventionText}
                </div>
              </div>
            </div>

            {/* 7 — Paiement */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <div style={{ background: '#f0fdf4', border: '0.5px solid #bbf7d0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#166534', marginBottom: '8px' }}>PAIEMENT</div>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px',
                  background: payStatus === 'Payé' ? '#dcfce7' : payStatus === 'En attente' ? '#fef9c3' : '#e0f2fe',
                  color: payStatus === 'Payé' ? '#166534' : payStatus === 'En attente' ? '#854d0e' : '#0c4a6e',
                }}>
                  {payStatus}
                </span>
                {payStatus === 'Payé' && (
                  <div style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8, marginTop: '4px' }}>
                    <div>Date de paiement : {fmtDate(payDate)}</div>
                    <div>Mode de paiement : {payMode}</div>
                  </div>
                )}
              </div>
              <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>
                  <span>Client — Signature</span>
                  <span>FIX – Dépannage Dakar — Signature & Cachet</span>
                </div>
                <div style={{ border: '1.5px solid #0d1b3e', borderRadius: '6px', padding: '8px', fontSize: '10px', fontWeight: 700, color: '#0d1b3e', textAlign: 'center' }}>
                  FIX – DÉPANNAGE DAKAR<br />
                  Diakhate Corp SUARL<br />
                  RCCM : SN.DKR.2022.B.10533<br />
                  NINEA : 009292020<br />
                  Tél. : +221 78 820 80 80<br />
                  Hann Mariste 2, N°21 X, Dakar – Sénégal
                </div>
              </div>
            </div>

            {/* 8 — Mention légale */}
            <p style={{ fontSize: '10px', color: '#94a3b8', fontStyle: 'italic', marginTop: '12px' }}>
              Cette facture atteste la réalité des prestations effectuées. Merci pour votre confiance.
            </p>

            {/* 9 — Footer */}
            <div style={{ borderTop: '0.5px solid #e2e8f0', marginTop: '20px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '11px', color: '#0d1b3e' }}>FIX – Dépannage Dakar</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>Une expertise rapide, un service fiable.</span>
            </div>

          </div>
        </section>
      </main>
    </InternalGuard>
  );
}
