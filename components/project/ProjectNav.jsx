import { useState, useEffect } from 'react';
import Link from 'next/link';
import LangToggle from './LangToggle';

/**
 * Project detail page navigation — tofuG reference style.
 *
 * @param {Object}   props
 * @param {Array}    props.sections      - [{id: "overview", label: "Overview"}, ...]
 * @param {string}   [props.accentColor] - Hover color for nav links (default: var(--fg))
 */
export default function ProjectNav({ sections = [], accentColor }) {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('ko');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setLang(localStorage.getItem('site-lang') || 'ko');
    sync();
    window.addEventListener('storage', sync);
    const id = window.setInterval(sync, 400);
    return () => {
      window.removeEventListener('storage', sync);
      window.clearInterval(id);
    };
  }, []);

  const isKo = lang === 'ko';

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link href="/" className="logo">
        <span className="logo-default">夏陰</span>
        <span className="logo-hover">{isKo ? '여름 그늘' : 'summer shade'}</span>
      </Link>
      <div className="nav-right">
        <ul className="nav-links">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
        <LangToggle />
      </div>

      <style jsx>{`
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 40px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(
            rgba(16,16,16,0.7) 0%,
            rgba(16,16,16,0.3) 50%,
            transparent 100%
          );
          transition: background 0.4s, padding 0.4s, backdrop-filter 0.3s;
        }
        nav.scrolled {
          padding-bottom: 20px;
          background: var(--nav-scrolled);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        nav :global(.logo) {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 28px;
          line-height: 1;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #fff;
          transition: color 0.3s;
          text-decoration: none;
          white-space: nowrap;
        }
        nav.scrolled :global(.logo) {
          color: var(--fg);
        }
        nav :global(.logo .logo-default),
        nav :global(.logo .logo-hover) {
          display: inline-block;
          font-size: inherit;
          line-height: 1;
          transition: opacity 0.45s ease;
        }
        nav :global(.logo .logo-hover) {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', 'Noto Serif KR', serif;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.02em;
          opacity: 0;
          pointer-events: none;
        }
        nav :global(.logo:hover .logo-default) {
          opacity: 0;
        }
        nav :global(.logo:hover .logo-hover) {
          opacity: 1;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .nav-links {
          display: flex;
          gap: 30px;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
          font-weight: 500;
        }
        nav.scrolled .nav-links a {
          color: var(--fg-50);
        }
        .nav-links a:hover {
          color: ${accentColor || 'var(--fg)'};
        }
        @media (max-width: 600px) {
          .nav-links { display: none; }
          nav { padding: 14px 20px; }
        }
      `}</style>
    </nav>
  );
}
