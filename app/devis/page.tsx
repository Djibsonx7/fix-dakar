'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const phone = '221788208080';
const displayPhone = '+221 78 820 80 80';

const appliances = ['Machine à laver', 'Micro-ondes', 'Frigo', 'Congélateur', 'Chauffe-eau', 'Autre appareil'];
const services = ['Diagnostic', 'Réparation', 'Remplacement de pièce', 'Entretien', 'Autre service'];
const paymentStatus = ['À confirmer', 'En attente', 'Acompte reçu', 'Payé'];

function formatCurrency(value: string) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('fr-SN').format(Number.isFinite(amount) ? amount : 0) + ' FCFA';
}

function today() {
  return new Date().toLocaleDateString('fr-SN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function QuotePage() {
  const [client, setClient] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [area, setArea] = useState('');
  const [appliance, setAppliance] = useState('Machine à laver');
  const [brand, setBrand] = useState('');
  const [service, setService] = useState('Diagnostic');
  const [problem, setProblem] = useState('');
  const [diagnostic, setDiagnostic] = useState('0');
  const [labor, setLabor] = useState('0');
  const [parts, setParts] = useState('0');
  const [status, setStatus] = useState('À confirmer');
  const [notes, setNotes] = useState('');

  const quoteNumber = useMemo(() => {
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const time = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    return `FIX-${stamp}-${time}`;
  }, []);

  const total = useMemo(() => {
    const sum = Number(diagnostic || 0) + Number(labor || 0) + Number(parts || 0);
    return Math.max(0, Number.isFinite(sum) ? sum : 0);
  }, [diagnostic, labor, parts]);

  const whatsappText = `Bonjour, voici votre devis FIX Dakar ${quoteNumber} pour ${appliance}. Total estimé : ${formatCurrency(String(total))}. Merci de vérifier les détails avant confirmation.`;

  return (
    <main className="quote-page">
      <section className="quote-form-panel no-print">
        <div className="quote-form-header">
          <div className="brand brand-with-logo">
            <span className="logo-mark"><Image src="/assets/fix-logo.png" alt="FIX Dakar" width={56} height={56} priority /></span>
            <div className="brand-text"><strong>Devis digital FIX</strong><small>Générateur interne</small></div>
          </div>
          <button className="primary quote-download-button" type="button" onClick={() => window.print()}>Télécharger PDF</button>
        </div>

        <div className="quote-form-grid">
          <label>Client<input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nom du client" /></label>
          <label>Téléphone<input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Numéro client" /></label>
          <label>Quartier<input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ex : Yoff" /></label>
          <label>Appareil<select value={appliance} onChange={(e) => setAppliance(e.target.value)}>{appliances.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Marque<input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Samsung, LG..." /></label>
          <label>Service<select value={service} onChange={(e) => setService(e.target.value)}>{services.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="wide-field">Problème signalé<textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Décrire brièvement la panne" /></label>
          <label>Diagnostic<input type="number" value={diagnostic} onChange={(e) => setDiagnostic(e.target.value)} /></label>
          <label>Main-d’œuvre<input type="number" value={labor} onChange={(e) => setLabor(e.target.value)} /></label>
          <label>Pièce<input type="number" value={parts} onChange={(e) => setParts(e.target.value)} /></label>
          <label>Statut paiement<select value={status} onChange={(e) => setStatus(e.target.value)}>{paymentStatus.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="wide-field">Note<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex : montant final sous réserve de confirmation sur place" /></label>
        </div>

        <div className="quote-actions">
          <a className="secondary" href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`} target="_blank">Préparer message WhatsApp</a>
        </div>
      </section>

      <section className="quote-document" id="quote-document">
        <header className="quote-doc-header">
          <div className="quote-logo-row">
            <Image src="/assets/fix-logo.png" alt="FIX Dakar" width={72} height={72} priority />
            <div><h1>FIX Dépannage Dakar</h1><p>Devis d’intervention</p></div>
          </div>
          <div className="quote-meta"><b>{quoteNumber}</b><span>{today()}</span></div>
        </header>

        <div className="quote-info-grid">
          <article><span>Client</span><b>{client || '—'}</b><small>{clientPhone || 'Téléphone non renseigné'}</small></article>
          <article><span>Quartier</span><b>{area || '—'}</b><small>Dakar</small></article>
          <article><span>Appareil</span><b>{appliance}</b><small>{brand || 'Marque à confirmer'}</small></article>
          <article><span>Service</span><b>{service}</b><small>{status}</small></article>
        </div>

        <section className="quote-problem"><span>Problème signalé</span><p>{problem || 'À compléter selon les informations du client.'}</p></section>

        <table className="quote-table">
          <tbody>
            <tr><td>Diagnostic</td><td>{formatCurrency(diagnostic)}</td></tr>
            <tr><td>Main-d’œuvre réparation</td><td>{formatCurrency(labor)}</td></tr>
            <tr><td>Pièce éventuelle</td><td>{Number(parts || 0) > 0 ? formatCurrency(parts) : 'À confirmer'}</td></tr>
          </tbody>
        </table>

        <div className="quote-total"><span>Total estimé</span><b>{formatCurrency(String(total))}</b></div>

        <section className="quote-note"><b>Note</b><p>{notes || 'Ce devis est basé sur les informations fournies avant intervention. Le montant final peut varier si une pièce ou une panne supplémentaire est confirmée sur place. Toute réparation importante est validée avec le client avant exécution.'}</p></section>

        <footer className="quote-doc-footer"><span>{displayPhone}</span><span>contact@fenixfuz.com</span><span>Dakar • Intervention selon disponibilité</span></footer>
      </section>
    </main>
  );
}
