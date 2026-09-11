'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fix_pro_banner_dismissed';

export default function ProBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  function close() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setDismissed(true);
  }

  return (
    <div className="pro-banner" role="complementary" aria-label="FIX Pro">
      <span className="pro-banner-badge">Nouveau</span>
      <p className="pro-banner-text">
        FIX Pro : le dépannage pour les professionnels. Commerce, pressing, bureau, logement meublé.
      </p>
      <Link className="pro-banner-cta" href="/professionnels" data-conversion="banner-pro" data-ga-event="banner_pro_click">
        Découvrir →
      </Link>
      <button type="button" className="pro-banner-close" onClick={close} aria-label="Fermer la bannière FIX Pro">
        ×
      </button>
    </div>
  );
}
