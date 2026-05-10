import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function WorkCorpPage() {
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
        <title>WORK (CORP.) — 공간하음 GONGGAN HA-UMM</title>
        <meta name="description" content="Career history — PRADA Korea, DaeHye Architecture, Lotte GRS, INITIA." />
      </Head>

      <main className="wc">
        <nav className="wc-nav">
          <Link href="/" className="wc-logo" aria-label="Back to home">
            <span className="wc-logo-default">夏陰</span>
            <span className="wc-logo-hover">{isKo ? '여름 그늘' : 'summer shade'}</span>
          </Link>
          <div className="wc-nav-right">
            <Link href="/" className="wc-nav-link">HOME</Link>
            <span className="wc-lang" aria-label="Language toggle">
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >EN</button>
              <span className="wc-lang-sep">/</span>
              <button
                type="button"
                className={lang === 'ko' ? 'active' : ''}
                onClick={() => setLang('ko')}
              >KR</button>
            </span>
          </div>
        </nav>

        <section className="wc-hero">
          <p className="wc-eyebrow">WORK (CORP.)</p>
          <h1 className="wc-title">{isKo ? '경력' : 'Career'}</h1>
        </section>

        <section className="experience experience-career">
          <div className="exp-list">

            {/* PRADA Korea */}
            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-company">PRADA Korea</span>
                <span className="exp-period">2022.05 – 2022.12</span>
              </div>
              <span className="exp-role">Interior Tech</span>
              <ul className="exp-works">
                <li>{isKo ? 'TROPICO POP-UP (롯데 동탄 · 더현대 서울 · 갤러리아 압구정)' : 'TROPICO POP-UP (Lotte Dongtan · The Hyundai Seoul · Galleria Apgujeong)'}</li>
                <li>{isKo ? 'HOLIDAY POP-UP (신세계 강남 · 더현대 서울 · 롯데 동탄)' : 'HOLIDAY POP-UP (Shinsegae Gangnam · The Hyundai Seoul · Lotte Dongtan)'}</li>
                <li>{isKo ? '신세계 대전 오프닝' : 'SHINSEGAE DAEJEON OPENING'}</li>
              </ul>
            </div>

            {/* DaeHye Architecture */}
            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-company">{isKo ? '대혜 건축' : 'DaeHye Architecture'}</span>
                <span className="exp-period">2023.03 – 2024.03</span>
              </div>
              <span className="exp-role">Space Design</span>
              <ul className="exp-works">
                <li>{isKo ? '스타필드 부산 창원' : 'STARFIELD BUSAN CHANGWON'}</li>
                <li>{isKo ? '스타필드 빌리지 별내' : 'STARFIELD VILLAGE BYEOLLAE'}</li>
                <li>{isKo ? '현대자동차, 애틀랜타, 조지아 USA' : 'HYUNDAI MOTORS COMPANY, Atlanta, Georgia USA'}</li>
              </ul>
            </div>

            {/* Lotte GRS */}
            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-company">Lotte GRS</span>
                <span className="exp-period">2025.04 – 2025.09</span>
              </div>
              <span className="exp-role">Construction Cost Management</span>
              <ul className="exp-works">
                <li>{isKo ? '롯데리아 매장 시공비 표준화' : 'Construction cost standardization for Lotteria stores'}</li>
                <li>{isKo ? '입찰 서류 분석, 인력/비인력 비용 구조 분류' : 'Analyzed bid documents, categorized manual vs non-manual cost structures'}</li>
              </ul>
            </div>

            {/* INITIA */}
            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-company">INITIA</span>
                <span className="exp-period">2025 – Present</span>
              </div>
              <span className="exp-role">Spatial Branding Designer</span>
              <ul className="exp-works">
                <li>
                  <Link href="/projects/tofug" className="exp-link">
                    {isKo ? 'tofuG 브랜드 & 공간 디자인' : 'tofuG Brand & Spatial Design'}
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </section>

        <footer className="wc-footer">
          <Link href="/" className="wc-back">← {isKo ? '홈으로' : 'Back to home'}</Link>
        </footer>

        <style jsx>{`
          .wc {
            min-height: 100vh;
            background: #0f0e0e;
            color: #fff;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .wc-nav {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background: rgba(15,14,14,0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .wc-logo {
            position: relative;
            display: inline-flex;
            align-items: center;
            font-size: 28px;
            line-height: 1;
            letter-spacing: 0.05em;
            color: #fff;
            text-decoration: none;
          }
          .wc-logo-default,
          .wc-logo-hover {
            display: inline-block;
            font-size: inherit;
            line-height: 1;
            transition: opacity 0.45s ease;
          }
          .wc-logo-hover {
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
          .wc-logo:hover .wc-logo-default {
            opacity: 0;
          }
          .wc-logo:hover .wc-logo-hover {
            opacity: 1;
          }
          .wc-nav-right {
            display: flex;
            align-items: center;
            gap: 36px;
          }
          .wc-nav-link {
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            transition: opacity 0.2s;
          }
          .wc-nav-link:hover {
            opacity: 0.6;
          }
          .wc-lang {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          .wc-lang button {
            border: none;
            background: none;
            cursor: pointer;
            font: inherit;
            letter-spacing: inherit;
            text-transform: inherit;
            color: rgba(255,255,255,0.4);
            padding: 0;
            transition: color 0.3s, opacity 0.2s;
          }
          .wc-lang button.active {
            color: rgba(255,255,255,0.95);
            font-weight: 600;
          }
          .wc-lang button:hover {
            opacity: 0.7;
          }
          .wc-lang-sep {
            opacity: 0.4;
          }
          .wc-hero {
            max-width: 1200px;
            margin: 0 auto;
            padding: 120px 40px 40px;
          }
          .wc-eyebrow {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            margin-bottom: 16px;
          }
          .wc-title {
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 300;
            letter-spacing: 0.02em;
          }
          .wc-footer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 40px 80px;
          }
          .wc-back {
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: color 0.2s;
          }
          .wc-back:hover {
            color: #fff;
          }
          @media (max-width: 600px) {
            .wc-nav { padding: 14px 20px; }
            .wc-logo { font-size: 22px; }
            .wc-nav-right { gap: 14px; }
            .wc-nav-link, .wc-lang { font-size: 10px; letter-spacing: 0.08em; }
            .wc-lang { gap: 4px; }
            .wc-hero { padding: 80px 20px 32px; }
            .wc-footer { padding: 32px 20px 60px; }
          }
        `}</style>

        <style jsx>{`
          /* ── Career section (mirrors index page tokens) ── */
          .experience {
            padding: 0 40px 100px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .exp-list {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .exp-item {
            padding: 32px 0;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .exp-item:last-child {
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 6px;
          }
          .exp-company {
            font-size: clamp(15px, 1.4vw, 18px);
            font-weight: 600;
            letter-spacing: 0.02em;
            color: rgba(255,255,255,0.9);
          }
          .exp-period {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.08em;
            color: #aaa;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .exp-role {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            margin-bottom: 14px;
            display: block;
          }
          .exp-works {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .exp-works li {
            font-size: 14px;
            font-weight: 300;
            color: rgba(255,255,255,0.6);
            line-height: 1.6;
            padding-left: 16px;
            position: relative;
          }
          .exp-works li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: rgba(255,255,255,0.3);
            font-size: 12px;
          }
          .exp-link {
            color: rgba(255,255,255,0.5);
            text-decoration: underline;
            text-underline-offset: 3px;
            transition: color 0.2s;
          }
          .exp-link:hover {
            color: rgba(255,255,255,0.9);
          }
          @media (max-width: 600px) {
            .experience { padding: 0 20px 60px; }
            .exp-header { flex-wrap: wrap; gap: 4px; }
          }
        `}</style>
      </main>
    </>
  );
}
