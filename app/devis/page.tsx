'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import InternalGuard from '@/components/InternalGuard';

type QuoteLine = {
  designation: string;
  quantity: string;
  unitPrice: string;
};

function fmt(n: number) {
  return new Intl.NumberFormat('fr-SN').format(n);
}

function today() {
  return new Date().toLocaleDateString('fr-SN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DevisPage() {
  const [quoteNumber, setQuoteNumber] = useState('DEV-...');
  const [client, setClient] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [hasOrg, setHasOrg] = useState(false);
  const [org, setOrg] = useState('');
  const [area, setArea] = useState('');
  const [object, setObject] = useState('');
  const [validity, setValidity] = useState('15');
  const [deadline, setDeadline] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [conditions, setConditions] = useState(
    "Toute fourniture de pièces, remplacement de filtres, recharge de fluide ou prestation complémentaire non prévue dans le présent devis fera l’objet d’une validation préalable du client."
  );
  const [lines, setLines] = useState<QuoteLine[]>([
    { designation: '', quantity: '1', unitPrice: '0' },
  ]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const storedYear = parseInt(localStorage.getItem('fix_quote_year') || '0', 10);
    let counter = parseInt(localStorage.getItem('fix_quote_counter') || '0', 10);

    if (storedYear !== year) {
      counter = 1;
    } else {
      counter += 1;
    }

    localStorage.setItem('fix_quote_year', String(year));
    localStorage.setItem('fix_quote_counter', String(counter));
    setQuoteNumber(`DEV-${year}-${String(counter).padStart(4, '0')}`);
  }, []);

  function addLine() {
    if (lines.length < 12) {
      setLines((prev) => [...prev, { designation: '', quantity: '1', unitPrice: '0' }]);
    }
  }

  function removeLine(index: number) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLine(index: number, field: keyof QuoteLine, value: string) {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line))
    );
  }

  const normalizedLines = useMemo(
    () =>
      lines.map((line) => {
        const quantity = Math.max(0, Number(line.quantity) || 0);
        const unitPrice = Math.max(0, Number(line.unitPrice) || 0);
        return {
          ...line,
          quantity,
          unitPrice,
          total: quantity * unitPrice,
        };
      }),
    [lines]
  );

  const total = useMemo(
    () => normalizedLines.reduce((sum, line) => sum + line.total, 0),
    [normalizedLines]
  );

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
          .quote-print-root { font-size: 11px; }
          .quote-b2b-table td, .quote-b2b-table th { padding: 6px 8px !important; }
          .quote-b2b-total, .quote-b2b-badge, .quote-b2b-table thead tr {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .quote-b2b-total, .quote-b2b-table thead tr, .quote-b2b-badge {
            background: #0d1b3e !important;
            color: #fff !important;
          }
          .quote-b2b-table thead th { color: #fff !important; }
        }
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
      `}</style>

      <main className="quote-page">
        <section className="quote-form-panel no-print">
          <div className="quote-form-header">
            <div className="brand brand-with-logo">
              <span className="logo-mark">
                <Image src="/assets/fix-logo.png" alt="FIX" width={56} height={56} priority />
              </span>
              <div className="brand-text">
                <strong>Devis FIX</strong>
                <small>Générateur interne</small>
              </div>
            </div>
            <button
              className="primary quote-download-button"
              type="button"
              onClick={() => window.print()}
            >
              Télécharger PDF
            </button>
          </div>

          <div className="quote-form-grid">
            <label className="wide-field">
              Nom du client / contact
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Nom du client ou de la personne de contact"
              />
            </label>

            <label>
              Téléphone
              <input
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Ex : 77 000 00 00"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="contact@entreprise.com"
              />
            </label>

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
                <input
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Raison sociale / organisation"
                />
              )}
            </label>

            <label className="wide-field">
              Adresse
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex : Dakar Plateau"
              />
            </label>

            <label className="wide-field">
              Objet du devis
              <textarea
                value={object}
                onChange={(e) => setObject(e.target.value)}
                placeholder="Ex : Entretien et maintenance préventive de quatre (04) climatiseurs"
              />
            </label>

            <label>
              Validité du devis (jours)
              <input
                type="number"
                min="1"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
              />
            </label>

            <label>
              Délai d’intervention
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Ex : 48 h après validation"
              />
            </label>

            <div
              className="wide-field"
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.78)' }}>
                Prestations
              </span>
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{ display: 'grid', gridTemplateColumns: '2fr .6fr 1fr auto', gap: 8 }}
                >
                  <input
                    value={line.designation}
                    onChange={(e) => updateLine(i, 'designation', e.target.value)}
                    placeholder="Désignation"
                  />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={line.quantity}
                    onChange={(e) => updateLine(i, 'quantity', e.target.value)}
                    placeholder="Qté"
                  />
                  <input
                    type="number"
                    min="0"
                    value={line.unitPrice}
                    onChange={(e) => updateLine(i, 'unitPrice', e.target.value)}
                    placeholder="Prix unit."
                  />
                  {lines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLine(i)}
                      aria-label="Supprimer la ligne"
                      style={{
                        background: 'rgba(239,68,68,.15)',
                        color: '#f87171',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {lines.length < 12 && (
                <button
                  type="button"
                  onClick={addLine}
                  style={{
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: 12,
                    padding: '8px 14px',
                    color: 'rgba(255,255,255,.7)',
                    fontSize: 13,
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: 6,
                  }}
                >
                  + Ajouter une ligne
                </button>
              )}
            </div>

            <label className="wide-field">
              Modalités de paiement
              <textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="Ex : Paiement à réception de facture / virement bancaire"
              />
            </label>

            <label className="wide-field">
              Conditions / observations
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="Conditions particulières du devis"
              />
            </label>
          </div>
        </section>

        <section className="quote-document">
          <div className="quote-print-root" style={{ background: '#fff', color: '#111827' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 0,
                paddingBottom: 20,
                borderBottom: '2px solid #0d1b3e',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  minWidth: 160,
                }}
              >
                <Image
                  src="/assets/fix-logo.png"
                  alt="FIX"
                  width={120}
                  height={120}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div
                style={{
                  width: 1,
                  background: '#0d1b3e',
                  alignSelf: 'stretch',
                  margin: '0 24px',
                  opacity: 0.2,
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#0d1b3e',
                    marginBottom: 6,
                  }}
                >
                  FIX – DÉPANNAGE DAKAR
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6b7280',
                    fontStyle: 'italic',
                    marginBottom: 8,
                  }}
                >
                  Marque de Diakhate Corp SUARL
                </div>
                {[
                  'RCCM : SN.DKR.2022.B.10533',
                  'NINEA : 009292020',
                  'Adresse : Hann Mariste 2, N°21 X, Dakar – Sénégal',
                  'Téléphone : +221 78 820 80 80',
                  'Email : contact@fenixfuz.com',
                ].map((line) => (
                  <div
                    key={line}
                    style={{ fontSize: 11, color: '#374151', lineHeight: 1.7 }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', margin: '16px 0 12px' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '.15em',
                  color: '#0d1b3e',
                }}
              >
                DEVIS
              </div>
              <div
                style={{
                  width: 60,
                  height: 2,
                  background: '#0d1b3e',
                  margin: '6px auto 0',
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                margin: '20px 0',
              }}
            >
              <div
                style={{
                  background: '#f8fafc',
                  border: '0.5px solid #e2e8f0',
                  borderRadius: 8,
                  padding: 14,
                }}
              >
                <span
                  className="quote-b2b-badge"
                  style={{
                    display: 'inline-block',
                    background: '#0d1b3e',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 4,
                    marginBottom: 10,
                  }}
                >
                  CLIENT
                </span>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: '#1e293b' }}>
                  {hasOrg && org && <div style={{ fontWeight: 800 }}>{org}</div>}
                  <div style={{ fontWeight: hasOrg && org ? 500 : 700 }}>{client || '—'}</div>
                  {clientPhone.trim() && <div>Téléphone : {clientPhone}</div>}
                  {clientEmail.trim() && <div>Email : {clientEmail}</div>}
                  {area.trim() && <div>Adresse : {area}</div>}
                </div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '0.5px solid #e2e8f0',
                  borderRadius: 8,
                  padding: 14,
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: '#1e293b',
                }}
              >
                <div>
                  N° Devis :{' '}
                  <span style={{ fontWeight: 700, color: '#0d1b3e' }}>{quoteNumber}</span>
                </div>
                <div>Date : {today()}</div>
                <div>Validité : {validity || '15'} jours</div>
                {deadline.trim() && <div>Délai d’intervention : {deadline}</div>}
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '0.5px solid #e2e8f0',
                borderRadius: 8,
                padding: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0d1b3e',
                  marginBottom: 7,
                }}
              >
                OBJET DU DEVIS
              </div>
              <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.7 }}>
                {object || 'À compléter.'}
              </div>
            </div>

            <table
              className="quote-b2b-table"
              style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0' }}
            >
              <thead>
                <tr style={{ background: '#0d1b3e', color: '#fff' }}>
                  {['Désignation', 'Quantité', 'Montant unit. (FCFA)', 'Montant total (FCFA)'].map(
                    (heading, i) => (
                      <th
                        key={heading}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '.06em',
                          padding: '9px 12px',
                          textAlign: i === 0 ? 'left' : 'right',
                        }}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {normalizedLines.map((line, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: '11px 12px',
                        borderBottom: '0.5px solid #f1f5f9',
                        fontSize: 13,
                        color: '#374151',
                      }}
                    >
                      {line.designation || 'Prestation à préciser'}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        borderBottom: '0.5px solid #f1f5f9',
                        fontSize: 13,
                        color: '#374151',
                        textAlign: 'right',
                      }}
                    >
                      {line.quantity}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        borderBottom: '0.5px solid #f1f5f9',
                        fontSize: 13,
                        color: '#374151',
                        textAlign: 'right',
                        fontWeight: 600,
                      }}
                    >
                      {fmt(line.unitPrice)}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        borderBottom: '0.5px solid #f1f5f9',
                        fontSize: 13,
                        color: '#374151',
                        textAlign: 'right',
                        fontWeight: 600,
                      }}
                    >
                      {fmt(line.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                className="quote-b2b-total"
                style={{
                  background: '#0d1b3e',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  minWidth: 280,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.9 }}>
                  TOTAL DU DEVIS
                </span>
                <strong style={{ fontSize: 22, fontWeight: 800 }}>{fmt(total)} FCFA</strong>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginTop: 16,
              }}
            >
              <div
                style={{
                  background: '#f8fafc',
                  border: '0.5px solid #e2e8f0',
                  borderRadius: 8,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#0d1b3e',
                    marginBottom: 8,
                  }}
                >
                  MODALITÉS DE PAIEMENT
                </div>
                <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.7 }}>
                  {paymentTerms || 'À convenir avec le client.'}
                </div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '0.5px solid #e2e8f0',
                  borderRadius: 8,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#0d1b3e',
                    marginBottom: 8,
                  }}
                >
                  CONDITIONS / OBSERVATIONS
                </div>
                <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.7 }}>
                  {conditions || '—'}
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '0.5px solid #e2e8f0',
                borderRadius: 8,
                padding: 14,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 0,
                  alignItems: 'start',
                }}
              >
                <div style={{ paddingRight: 16, borderRight: '1.5px solid #cbd5e1' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    Pour le client — Bon pour accord
                  </div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 5 }}>
                    Nom / Fonction / Date
                  </div>
                  <div style={{ height: 48 }} />
                  <div style={{ borderBottom: '1.5px solid #94a3b8', margin: '0 12px' }} />
                  <div
                    style={{
                      fontSize: 10,
                      color: '#94a3b8',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Signature & Cachet
                  </div>
                </div>

                <div style={{ paddingLeft: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    FIX – Dépannage Dakar
                  </div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 5 }}>
                    Diakhate Corp SUARL
                  </div>
                  <div style={{ height: 48 }} />
                  <div style={{ borderBottom: '1.5px solid #94a3b8', margin: '0 12px' }} />
                  <div
                    style={{
                      fontSize: 10,
                      color: '#94a3b8',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Signature & Cachet
                  </div>
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 9,
                color: '#64748b',
                marginTop: 12,
                lineHeight: 1.5,
              }}
            >
              Le présent devis est valable {validity || '15'} jours à compter de sa date
              d’émission. Toute modification du périmètre de la prestation peut entraîner une
              révision du montant après accord du client.
            </p>

            <div
              style={{
                borderTop: '0.5px solid #e2e8f0',
                marginTop: 20,
                paddingTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 11, color: '#0d1b3e' }}>
                FIX – Dépannage Dakar
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>fix.fenixfuz.com</span>
              <span style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>
                Une expertise rapide, un service fiable.
              </span>
            </div>
          </div>
        </section>
      </main>
    </InternalGuard>
  );
}
