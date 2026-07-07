import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ScopeSection from '../components/ScopeSection';

export default function InfoPage() {
  const [lang, setLangState] = useState('ko');
  const isKo = lang === 'ko';

  const setLang = useCallback((l) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-lang', l);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('site-lang');
    if (saved === 'ko' || saved === 'en') setLangState(saved);
  }, []);

  return (
    <>
      <Head>
        <title>INFO — 공간하음 GONGGAN HA-UMM</title>
        <meta name="description" content="공간하음(空間夏陰) — 스튜디오 정보 및 작업 영역." />
      </Head>

      <main className="info">
        <nav className="info-nav">
          <Link href="/" className="info-logo" aria-label="Back to home">
            <span className="info-logo-default">夏陰</span>
            <span className="info-logo-hover">{isKo ? '여름 그늘' : 'summer shade'}</span>
          </Link>
          <div className="info-nav-right">
            <Link href="/#work" className="info-nav-link">WORK</Link>
            <Link href="/work-corp" className="info-nav-link">WORK(CORP.)</Link>
            <Link href="/info" className="info-nav-link" aria-current="page">INFO</Link>
            <a
              href="https://www.instagram.com/id_haumm/"
              target="_blank"
              rel="noopener noreferrer"
              className="info-nav-link"
            >INSTA</a>
            <span className="info-lang" aria-label="Language toggle">
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >EN</button>
              <span className="info-lang-sep">/</span>
              <button
                type="button"
                className={lang === 'ko' ? 'active' : ''}
                onClick={() => setLang('ko')}
              >KR</button>
            </span>
          </div>
        </nav>

        <section className="info-hero">
          <div className="info-hero-text">
            <p className="info-eyebrow">INFO</p>
            <h1 className="info-title">{isKo ? '스튜디오 안내' : 'Studio Information'}</h1>
            <p className="info-hero-sub">
              {isKo
                ? '空間夏陰 — 비어 있는 공간(空)과 사이(間)에, 여름(夏)의 빛과 그늘(陰)을 담습니다.'
                : '空間夏陰 — In the empty space (空) and the in-between (間), we hold summer’s light (夏) and its shade (陰).'}
            </p>
          </div>
          <figure className="info-hero-poster">
            <img
              src="https://framerusercontent.com/images/fAxkcUUwS7zfG3xlqZdz7s1FNM.jpg"
              alt={isKo ? '공간하음 空間夏陰 포스터' : 'Gonggan Ha-umm 空間夏陰 poster'}
              loading="lazy"
            />
          </figure>
        </section>

        <section className="info-grid">
          <div className="info-block">
            <p className="info-label">Studio</p>
            <p className="info-text">
              공간하음 (空間夏陰)<br/>
              Gonggan Ha-umm
            </p>
            <p className="info-text info-text-sub">
              {isKo
                ? '여름날의 그늘처럼, 자연스레 향하는 공간을 만듭니다.'
                : 'Crafting spaces that, like summer shade, naturally draw people in.'}
            </p>
          </div>

          <div className="info-block">
            <p className="info-label">Contact</p>
            {isKo ? (
              <p className="info-text">
                프로젝트 문의 및 협업 제안은<br/>
                아래 이메일로 연락해 주세요.
              </p>
            ) : (
              <p className="info-text">
                For project inquiries and collaboration,<br/>
                please reach out via email below.
              </p>
            )}
            <p className="info-text info-text-mono">
              <a href="mailto:wendydaydy@gmail.com">wendydaydy@gmail.com</a>
            </p>
            <p className="info-text info-text-mono">
              <a
                href="https://www.instagram.com/id_haumm/"
                target="_blank"
                rel="noopener noreferrer"
              >@id_haumm</a>
            </p>
          </div>

          <div className="info-block">
            <p className="info-label">{isKo ? '주요 영역' : 'Selected Scope'}</p>
            <ul className="info-list">
              <li>{isKo ? 'Concept · 컨셉 기획' : 'Concept Strategy'}</li>
              <li>{isKo ? 'Branding · 브랜드 디자인' : 'Branding Design'}</li>
              <li>{isKo ? 'Spatial · 공간 설계' : 'Spatial Design'}</li>
              <li>{isKo ? 'Construction · 시공 감리' : 'Construction Supervision'}</li>
            </ul>
          </div>
        </section>

        {/* CRAFTING FROM TIP TO TOE — reused component */}
        <ScopeSection isKo={isKo} />

        <footer className="info-footer">
          <Link href="/" className="info-back">← {isKo ? '홈으로' : 'Back to home'}</Link>
          <p className="info-copy">&copy; 2025 Gonggan Ha-umm. All rights reserved.</p>
        </footer>

        {/* next/link <Link> 앵커는 styled-jsx 스코프 해시를 못 받아 기본 파란 링크로 보임
            → nav 앵커는 .info-nav 조상 기준 전역 규칙으로 확실히 스타일(메인 nav와 동일 톤). */}
        <style jsx global>{`
          .info-nav a { color: var(--fg-75, #444); text-decoration: none; font-family: 'Inter', 'Noto Sans KR', sans-serif; }
          .info-nav .info-logo { font-size: 28px; line-height: 1; letter-spacing: 0.05em; color: var(--fg, #111); }
          .info-nav-right a { font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; transition: opacity 0.2s; }
          .info-nav-right a:hover { opacity: 0.6; }
          /* Back to home도 <Link>라 scoped 스타일이 안 먹음 → 전역으로 */
          .info-back { font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-60, #666); text-decoration: none; transition: color 0.2s; }
          .info-back:hover { color: var(--fg, #111); }
        `}</style>
        <style jsx>{`
          .info {
            min-height: 100vh;
            background: var(--bg);
            color: var(--fg);
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .info-nav {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background: var(--nav-scrolled);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .info-logo {
            position: relative;
            display: inline-flex;
            align-items: center;
            font-size: 28px;
            line-height: 1;
            letter-spacing: 0.05em;
            color: var(--fg);
            text-decoration: none;
          }
          .info-logo-default,
          .info-logo-hover {
            display: inline-block;
            font-size: inherit;
            line-height: 1;
            transition: opacity 0.45s ease;
          }
          .info-logo-hover {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Cormorant Garamond', 'Noto Serif KR', serif;
            font-weight: 500;
            font-style: italic;
            letter-spacing: 0.02em;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
          }
          .info-logo:hover .info-logo-default { opacity: 0; }
          .info-logo:hover .info-logo-hover { opacity: 1; }
          .info-nav-right {
            display: flex;
            align-items: center;
            gap: 36px;
          }
          .info-nav-link {
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--fg-75);
            text-decoration: none;
            transition: opacity 0.2s;
          }
          .info-nav-link:hover { opacity: 0.6; }
          .info-lang {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          .info-lang button {
            border: none;
            background: none;
            cursor: pointer;
            font: inherit;
            letter-spacing: inherit;
            text-transform: inherit;
            color: var(--fg-40);
            padding: 0;
            transition: color 0.3s, opacity 0.2s;
          }
          .info-lang button.active {
            color: var(--fg);
            font-weight: 600;
          }
          .info-lang button:hover { opacity: 0.7; }
          .info-lang-sep { opacity: 0.4; }

          .info-hero {
            max-width: 1200px;
            margin: 0 auto;
            padding: 120px 40px 40px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
            gap: 56px;
            align-items: center;
          }
          .info-hero-text {
            min-width: 0;
          }
          .info-eyebrow {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--fg-50);
            margin-bottom: 16px;
          }
          .info-title {
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 300;
            letter-spacing: 0.02em;
          }
          .info-hero-sub {
            margin-top: 20px;
            max-width: 540px;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 300;
            color: var(--fg-60);
            word-break: keep-all;
          }
          .info-hero-poster {
            margin: 0;
          }
          .info-hero-poster img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 4px;
            object-fit: cover;
          }

          .info-grid {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 40px 60px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 60px;
          }
          .info-block {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .info-label {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--fg-50);
            margin-bottom: 4px;
          }
          .info-text {
            font-size: 15px;
            line-height: 1.7;
            font-weight: 300;
            color: var(--fg-75);
          }
          .info-text-sub {
            color: var(--fg-50);
            font-size: 13px;
          }
          .info-text-mono {
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            color: var(--fg-60);
            letter-spacing: 0.02em;
          }
          .info-text-mono a {
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid var(--fg-15);
            transition: border-color 0.2s, color 0.2s;
          }
          .info-text-mono a:hover {
            color: var(--fg);
            border-bottom-color: var(--fg-50);
          }
          .info-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .info-list li {
            font-size: 14px;
            font-weight: 300;
            color: var(--fg-60);
            line-height: 1.6;
            padding-left: 16px;
            position: relative;
          }
          .info-list li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: var(--fg-30);
            font-size: 12px;
          }

          .info-footer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 40px 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }
          .info-back {
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--fg-60);
            text-decoration: none;
            transition: color 0.2s;
          }
          .info-back:hover { color: var(--fg); }
          .info-copy {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.05em;
            color: var(--fg-40);
          }

          @media (max-width: 1199px) {
            .info-nav { padding: 16px 24px; }
            .info-hero {
              padding: 100px 24px 32px;
              gap: 40px;
              grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
            }
            .info-grid {
              padding: 32px 24px 60px;
              gap: 40px;
            }
            .info-footer { padding: 32px 24px 60px; }
          }
          @media (max-width: 809px) {
            .info-nav { padding: 14px 20px; }
            .info-logo { font-size: 22px; }
            .info-nav-right { gap: 14px; }
            .info-nav-link, .info-lang { font-size: 10px; letter-spacing: 0.08em; }
            .info-lang { gap: 4px; }
            .info-hero {
              padding: 80px 20px 24px;
              grid-template-columns: 1fr;
              gap: 32px;
            }
            .info-hero-poster { max-width: 360px; }
            .info-grid {
              padding: 24px 20px 40px;
              grid-template-columns: 1fr;
              gap: 32px;
            }
            .info-footer {
              padding: 24px 20px 60px;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
          }
        `}</style>
      </main>
    </>
  );
}
