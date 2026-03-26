import { useState, useEffect } from 'react';

/**
 * KR/EN language toggle — pill shape button.
 * Persists selection to localStorage('site-lang').
 * Toggles html[lang] and controls data-ko / data-en visibility via globals.css.
 */
export default function LangToggle() {
  const [lang, setLang] = useState('ko');

  useEffect(() => {
    const saved = localStorage.getItem('site-lang') || 'ko';
    setLang(saved);
    document.documentElement.lang = saved;
  }, []);

  const switchLang = (next) => {
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem('site-lang', next);
  };

  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn${lang === 'ko' ? ' active' : ''}`}
        onClick={() => switchLang('ko')}
      >
        KR
      </button>
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => switchLang('en')}
      >
        EN
      </button>

      <style jsx>{`
        .lang-toggle {
          display: flex;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.3);
          transition: border-color 0.3s;
        }
        :global(nav.scrolled) .lang-toggle {
          border-color: var(--fg-15);
        }
        .lang-btn {
          padding: 6px 14px;
          font-size: 11px;
          letter-spacing: 1px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          background: transparent;
          color: rgba(255,255,255,0.6);
          transition: all 0.3s;
          font-family: 'Inter', sans-serif;
        }
        .lang-btn.active {
          background: rgba(255,255,255,0.2);
          color: #fff;
        }
        :global(nav.scrolled) .lang-btn {
          color: var(--fg-50);
        }
        :global(nav.scrolled) .lang-btn.active {
          background: var(--fg);
          color: var(--bg);
        }
      `}</style>
    </div>
  );
}
