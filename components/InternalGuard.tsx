'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function InternalGuard({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAuth(localStorage.getItem('fix_internal_auth') === 'true');
  }, []);

  useEffect(() => {
    if (auth === false) inputRef.current?.focus();
  }, [auth]);

  if (auth === null) return null;
  if (auth) return <>{children}</>;

  function submit() {
    if (password === process.env.NEXT_PUBLIC_INTERNAL_PASSWORD) {
      localStorage.setItem('fix_internal_auth', 'true');
      setAuth(true);
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <div style={{
      background: 'radial-gradient(circle at top, #10182f 0%, #050816 50%, #02030a 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,.05)',
        border: '1px solid rgba(255,255,255,.08)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
        <span className="logo-mark">
          <Image src="/assets/fix-logo.png" alt="FIX" width={56} height={56} priority />
        </span>
        <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', textAlign: 'center', margin: 0 }}>
          Accès interne FIX
        </p>
        <p style={{ fontSize: '14px', opacity: 0.6, color: '#fff', textAlign: 'center', margin: 0 }}>
          Réservé aux techniciens FIX Dakar
        </p>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Mot de passe"
          style={{
            background: 'rgba(255,255,255,.04)',
            border: `1px solid ${error ? '#f87171' : 'rgba(255,255,255,.08)'}`,
            borderRadius: '16px',
            padding: '15px',
            color: '#fff',
            fontSize: '15px',
            width: '100%',
            outline: 'none',
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = 'rgba(96,165,250,.45)';
              e.target.style.boxShadow = '0 0 0 4px rgba(96,165,250,.08)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#f87171' : 'rgba(255,255,255,.08)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {error && (
          <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center', margin: 0 }}>
            Mot de passe incorrect
          </p>
        )}
        <button
          type="button"
          className="primary"
          style={{ width: '100%', marginTop: '8px' }}
          onClick={submit}
        >
          Accéder
        </button>
      </div>
    </div>
  );
}
