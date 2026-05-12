import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ScopeSection from '../components/ScopeSection';
import projects from '../data/projects';

// Dynamic project data from sync script
let allProjects = [];
try { allProjects = require('../data/projects-generated'); } catch (e) { /* not synced yet */ }

// Hardcoded slugs that have dedicated pages
const HARDCODED_SLUGS = new Set(['tofug', 'benson', 'bodyguard', 'gagga', 'soldam', 'squidgame', 'handonday', 'shabusangha', 'gyedanbread']);

// Category filter config
const CATEGORIES = [
  { key: 'all', label_ko: '전체', label_en: 'All' },
  { key: 'new', label_ko: '신규매장', label_en: 'New Store' },
  { key: 'popup', label_ko: '팝업', label_en: 'Pop-up' },
  { key: 'deco', label_ko: '데코', label_en: 'Deco' },
];

export default function HomePage() {
  const [lang, setLangState] = useState('ko');
  const [scrolled, setScrolled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileHeroOpen, setMobileHeroOpen] = useState(false);
  const revealRefs = useRef([]);
  const navRef = useRef(null);

  // Language toggle with localStorage persistence
  const setLang = useCallback((l) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-lang', l);
    }
  }, []);

  // Restore saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem('site-lang');
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  // Scroll handler for nav
  useEffect(() => {
    const handleScroll = () => {
      if (!overlayOpen) {
        setScrolled(window.scrollY > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [overlayOpen]);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const currentRefs = revealRefs.current;
    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const toggleOverlay = () => {
    setOverlayOpen((prev) => !prev);
    if (!overlayOpen) {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 80);
    }
  };

  // SVG for project expand button
  const ExpandSVG = () => (
    <svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="23" height="23" x=".5" y="1.47" stroke="#fff" rx="11.5"/>
      <path fill="#fff" d="M11.024 16.762v-3.184H8v-1.423h3.024V8.97h1.568v3.184h3.024v1.425h-3.024v3.183h-1.568z"/>
    </svg>
  );

  // SVG for grid card arrow
  const ArrowSVG = () => (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L10 2M10 2H3M10 2v7" stroke="#0f0e0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const isKo = lang === 'ko';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>공간하음 | Gonggan Ha-umm</title>
        <meta name="description" content="공간하음(空間夏陰) - A place where people naturally gather, like summer shade." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400&family=DM+Mono:wght@400&family=IBM+Plex+Mono:wght@400;500&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </Head>

      {/* ── Navigation ── */}
      <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}${overlayOpen ? ' overlay-mode' : ''}`}>
        <div className="nav-left">
          <a
            href="#"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              if (overlayOpen) setOverlayOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="nav-logo-text">
              <span className="logo-default">夏陰</span>
              <span className="logo-hover">{isKo ? '여름 그늘' : 'summer shade'}</span>
            </span>
          </a>
        </div>
        <div className="nav-right">
          <ul className="nav-menu">
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); toggleOverlay(); }}
              >WORK</a>
            </li>
            <li>
              <Link href="/work-corp">WORK(CORP.)</Link>
            </li>
            <li>
              <Link href="/info">INFO</Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/id_haumm/"
                target="_blank"
                rel="noopener noreferrer"
              >INSTA</a>
            </li>
            <li className="nav-lang" aria-label="Language toggle">
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >EN</button>
              <span className="nav-lang-sep">/</span>
              <button
                type="button"
                className={lang === 'ko' ? 'active' : ''}
                onClick={() => setLang('ko')}
              >KR</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="https://framerusercontent.com/assets/MoR4uHvfn9l6Y2vXWgZEumlT0.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-fade-bottom"></div>
        <div className="hero-content hero-desktop">
          <div className="hero-left">
            <h1 className="hero-en">Where the shade<br/>gathers</h1>
            <p className="hero-cn">夏陰</p>
            <p className="hero-kr">여름 : 하&nbsp;&nbsp;그늘 : 음</p>
          </div>
          <div className="hero-right">
            <p className="hero-headline">A place where people naturally gather,<br/>like summer shade.</p>
            <p className="hero-body">Ha-umm creates spaces that,<br/>like summer shade, naturally draw people in.<br/>Inspired by such moments, we design spaces<br/>where brand and place seamlessly become one.</p>
          </div>
        </div>

        {/* ── Mobile Only ── */}
        <div className="hero-mobile">
          <p className="hero-mobile-cn">夏陰</p>
          <button
            className="hero-mobile-toggle"
            onClick={() => setMobileHeroOpen((prev) => !prev)}
            aria-label={mobileHeroOpen ? '본문 닫기' : '본문 열기'}
          >
            <span className="hero-mobile-en">where shade gathers</span>
            <span className={`hero-mobile-arrow${mobileHeroOpen ? ' open' : ''}`}>▾</span>
          </button>
          <div className={`hero-mobile-body-wrapper${mobileHeroOpen ? ' open' : ''}`}>
            <p className="hero-mobile-body">
              Ha-umm creates spaces that,<br/>
              like summer shade, naturally draw people in.<br/>
              Inspired by such moments, we design spaces<br/>
              where brand and place seamlessly become one.
            </p>
          </div>
        </div>
      </section>

      {/* ── Project Grid ── */}
      <section className="pg-section">
        <div className="pg-grid">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="pg-card">
              <div className="pg-poster">
                <img src={project.poster} alt={project.name} loading="lazy" className="poster-img" />
              </div>
              <div className="pg-space">
                <picture>
                  <source media="(max-width: 768px)" srcSet={project.spaceMobile} />
                  <img src={project.spaceDesktop} alt={`${project.name} 공간`} loading="lazy" />
                </picture>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Studio ── */}
      <section className="experience reveal" ref={addRevealRef}>
        <p className="about-label">Studio</p>
        <div className="exp-list">
          <div className="exp-item exp-featured">
            <div className="exp-header">
              <span className="exp-company exp-company-studio">
                {isKo ? '공간하음' : 'Gonggan Ha-umm'}
              </span>
              <span className="exp-period">2024 – Present</span>
            </div>
            <span className="exp-role exp-role-gold">Founder · Spatial Branding Designer</span>
            <p className="exp-scope">
              {isKo
                ? 'Concept — Branding — Spatial Design — Construction — Supervision'
                : 'Concept — Branding — Spatial Design — Construction — Supervision'}
            </p>
            <p className="exp-scope-sub">
              {isKo ? '컨셉 기획부터 시공 감리까지' : 'From concept planning to construction supervision'}
            </p>
            <ul className="exp-works">
              <li>{isKo ? '20+ 프로젝트 총괄 (F&B · Retail · Pop-Up · Deco)' : '20+ projects directed (F&B · Retail · Pop-Up · Deco)'}</li>
              <li>{isKo ? '4개국 프로젝트 수행 (Korea · Singapore · Malaysia · USA)' : 'Projects across 4 countries (Korea · Singapore · Malaysia · USA)'}</li>
              <li>{isKo ? '브랜드 공간 컨셉 기획 · SI 가이드북 · 실시설계 · 현장 감리' : 'Brand spatial concept · SI guidebook · Working drawings · On-site supervision'}</li>
              <li>
                {isKo
                  ? '현재 INIA GROUP 소속으로 tofuG 멀티매장 디자인 총괄 중'
                  : 'Currently directing multi-location tofuG design under INIA GROUP'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Projects Header ── */}
      <div className="section-header reveal" ref={addRevealRef}>
        <h2 className="section-title">
          SELECTED
          <span className="section-title-line">PROJECTS</span>
        </h2>
      </div>

      {/* ── Projects ── */}
      <section className="projects" id="project">
        {/* Project 1: TOFUG */}
        <Link href="/projects/tofug" className="project-card reveal" ref={addRevealRef}>
          <img src="/images/main/tofug-default.jpg" alt="TOFUG" className="project-img-default" />
          <img src="/images/main/tofug-hover.jpg" alt="TOFUG hover" className="project-img-hover" />
          <div className="project-info">
            <div>
              <p className="project-name">TOFUG</p>
              <span className="project-tag">Singapore &middot; Malaysia</span>
            </div>
            <div className="project-expand"><ExpandSVG /></div>
          </div>
        </Link>

        {/* Project 2: BENSON */}
        <Link href="/projects/benson" className="project-card reveal" ref={addRevealRef}>
          <img src="/images/main/benson-default.png" alt="BENSON" className="project-img-default" />
          <img src="/images/main/benson-hover.png" alt="BENSON hover" className="project-img-hover" />
          <div className="project-info">
            <div>
              <p className="project-name">BENSON</p>
              <span className="project-tag">Branding &amp; Spatial Design</span>
            </div>
            <div className="project-expand"><ExpandSVG /></div>
          </div>
        </Link>

        {/* Project 3: BODY GUARD */}
        <Link href="/projects/bodyguard" className="project-card reveal" ref={addRevealRef}>
          <img src="/images/main/bodyguard-default.png" alt="BODY GUARD" className="project-img-default" />
          <img src="/images/main/bodyguard-hover.png" alt="BODY GUARD hover" className="project-img-hover" />
          <div className="project-info">
            <div>
              <p className="project-name">BODY GUARD</p>
              <span className="project-tag">Rebranding</span>
            </div>
            <div className="project-expand"><ExpandSVG /></div>
          </div>
        </Link>

        {/* Project 4: GAGGA */}
        <Link href="/projects/gagga" className="project-card reveal" ref={addRevealRef}>
          <img src="/images/gagga/hero.jpg" alt="GAGGA" className="project-img-default" />
          <img src="/images/main/gagga-grid.jpg" alt="GAGGA hover" className="project-img-hover" />
          <div className="project-info">
            <div>
              <p className="project-name">GAGGA</p>
              <span className="project-tag">Brand &amp; Spatial Design</span>
            </div>
            <div className="project-expand"><ExpandSVG /></div>
          </div>
        </Link>

        {/* Project 5: SOLDAM MARKET */}
        <Link href="/projects/soldam" className="project-card reveal" ref={addRevealRef}>
          <img src="/images/main/soldam-default.png" alt="SOLDAM MARKET" className="project-img-default" />
          <img src="/images/main/soldam-hover.png" alt="SOLDAM MARKET hover" className="project-img-hover" />
          <div className="project-info">
            <div>
              <p className="project-name">SOLDAM MARKET</p>
              <span className="project-tag">Brand &amp; Spatial Design</span>
            </div>
            <div className="project-expand"><ExpandSVG /></div>
          </div>
        </Link>
      </section>

      {/* ── Scope ── */}
      <ScopeSection isKo={isKo} addRevealRef={addRevealRef} className="reveal" />

      {/* ── Footer ── */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div>
            <p className="footer-label">Contact</p>
            {isKo ? (
              <p className="footer-text">
                프로젝트 문의 및 협업 제안은<br/>
                아래 이메일로 연락해 주세요.
              </p>
            ) : (
              <p className="footer-text">
                For project inquiries and collaboration,<br/>
                please reach out via email below.
              </p>
            )}
          </div>
          <div>
            <p className="footer-label">Site</p>
            <p className="footer-text">
              공간하음 (空間夏陰)<br/>
              Gonggan Ha-umm
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2025 Gonggan Ha-umm. All rights reserved.</p>
          <p className="footer-copy">CRAFTING FROM TIP TO TOE</p>
        </div>
      </footer>

      {/* ── Projects Grid Overlay ── */}
      <div className={`projects-overlay${overlayOpen ? ' open' : ''}`}>
        <div className="projects-grid">
          {allProjects.map((p) => {
            const hasSections = p.sections && p.sections.length > 0;
            const hasPage = HARDCODED_SLUGS.has(p.slug) || hasSections;
            const imgFile = p.grid_image || p.cover_image;
            const imgDir = imgFile && imgFile.startsWith(p.slug) ? 'main' : p.slug;
            const thumb = imgFile ? `/images/${imgDir}/${imgFile}` : null;

            const inner = (
              <>
                {thumb && <img src={thumb} alt={p.name} />}
                {thumb && <div className="grid-card-overlay"></div>}
                <div className="grid-card-info">
                  <span className="grid-card-name">{p.name}</span>
                  <div className="grid-card-arrow"><ArrowSVG /></div>
                </div>
              </>
            );

            const className = `grid-card${thumb ? '' : ' no-image'}`;

            return hasPage ? (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={className}
                onClick={() => setOverlayOpen(false)}
              >
                {inner}
              </Link>
            ) : (
              <div key={p.slug} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        /* ── Theme Variables ── */
        :root {
            --bg: #ffffff;
            --fg: #1a1a1a;
            --fg-90: rgba(26,26,26,0.9);
            --fg-75: rgba(26,26,26,0.75);
            --fg-70: rgba(26,26,26,0.7);
            --fg-60: rgba(26,26,26,0.6);
            --fg-50: rgba(26,26,26,0.5);
            --fg-40: rgba(26,26,26,0.4);
            --fg-30: rgba(26,26,26,0.3);
            --fg-25: rgba(26,26,26,0.25);
            --fg-15: rgba(26,26,26,0.15);
            --fg-10: rgba(26,26,26,0.1);
            --fg-08: rgba(26,26,26,0.08);
            --fg-06: rgba(26,26,26,0.06);
            --nav-grad-start: rgba(255,255,255,0.7);
            --nav-grad-mid: rgba(255,255,255,0.3);
            --nav-scrolled: rgba(255,255,255,0.9);
            --card-bg: #f0f0f0;
            --overlay-bg: #0c0c0c;
            --overlay-fg: #ffffff;
            --hero-title-invert: 1;
        }
        html[data-theme='dark'] {
            --bg: #0c0c0c;
            --fg: #ffffff;
            --fg-90: rgba(255,255,255,0.9);
            --fg-75: rgba(255,255,255,0.75);
            --fg-70: rgba(255,255,255,0.7);
            --fg-60: rgba(255,255,255,0.6);
            --fg-50: rgba(255,255,255,0.5);
            --fg-40: rgba(255,255,255,0.4);
            --fg-30: rgba(255,255,255,0.3);
            --fg-25: rgba(255,255,255,0.25);
            --fg-15: rgba(255,255,255,0.15);
            --fg-10: rgba(255,255,255,0.1);
            --fg-08: rgba(255,255,255,0.08);
            --fg-06: rgba(255,255,255,0.06);
            --nav-grad-start: rgba(12,12,12,0.7);
            --nav-grad-mid: rgba(12,12,12,0.3);
            --nav-scrolled: rgba(12,12,12,0.85);
            --card-bg: #1a1a1a;
            --overlay-bg: #ffffff;
            --overlay-fg: #1a1a1a;
            --hero-title-invert: 0;
        }

        /* ── Reset ── */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg);
            color: var(--fg);
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }
        button { border: none; background: none; cursor: pointer; font-family: inherit; color: inherit; }
        img { display: block; max-width: 100%; }

        /* ── Navigation ── */
        .nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            padding: 20px 40px;
            padding-bottom: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
            transition: background 0.4s, padding 0.4s, color 0.3s;
            color: #fff;
        }
        .nav.scrolled {
            padding-bottom: 20px;
            background: var(--nav-scrolled);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: var(--fg);
        }
        .nav.overlay-mode {
            background: var(--overlay-bg);
            color: var(--overlay-fg);
        }
        .nav.overlay-mode .nav-logo-text,
        .nav.overlay-mode .nav-menu a {
            color: var(--overlay-fg);
        }
        .nav-left {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .nav-logo {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
        }
        .nav-logo-text {
            position: relative;
            display: inline-flex;
            align-items: center;
            font-size: 28px;
            line-height: 1;
            font-weight: 400;
            letter-spacing: 0.05em;
            color: #fff;
            transition: color 0.3s;
        }
        .nav.scrolled .nav-logo-text {
            color: var(--fg);
        }
        .logo-default,
        .logo-hover {
            display: inline-block;
            font-size: inherit;
            line-height: 1;
            transition: opacity 0.45s ease;
        }
        .logo-hover {
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
        .nav-logo:hover .logo-default {
            opacity: 0;
        }
        .nav-logo:hover .logo-hover {
            opacity: 1;
        }
        .nav-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .nav-menu {
            display: flex;
            align-items: center;
            gap: 36px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .nav-menu a {
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-decoration: none;
            color: rgba(255,255,255,0.85);
            transition: color 0.3s, opacity 0.2s;
        }
        .nav.scrolled .nav-menu a {
            color: var(--fg);
        }
        .nav-menu a:hover {
            opacity: 0.6;
        }
        .nav-lang {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.85);
        }
        .nav.scrolled .nav-lang {
            color: var(--fg);
        }
        .nav.overlay-mode .nav-lang {
            color: var(--overlay-fg);
        }
        .nav-lang button {
            font: inherit;
            letter-spacing: inherit;
            text-transform: inherit;
            color: rgba(255,255,255,0.4);
            transition: color 0.3s, opacity 0.2s;
            padding: 0;
        }
        .nav.scrolled .nav-lang button {
            color: var(--fg-40);
        }
        .nav.overlay-mode .nav-lang button {
            color: rgba(15,14,14,0.35);
        }
        .nav-lang button.active {
            color: rgba(255,255,255,0.95);
            font-weight: 600;
        }
        .nav.scrolled .nav-lang button.active {
            color: var(--fg);
        }
        .nav.overlay-mode .nav-lang button.active {
            color: var(--overlay-fg);
        }
        .nav-lang button:hover {
            opacity: 0.7;
        }
        .nav-lang-sep {
            color: inherit;
            opacity: 0.4;
        }

        /* ── Hero Section ── */
        .hero {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 600px;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .hero-video {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }
        .hero-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.15);
            z-index: 1;
        }
        .hero-fade-bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 50%;
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0) 30%,
                rgba(255,255,255,0.3) 60%,
                rgba(255,255,255,0.82) 85%,
                rgba(255,255,255,1) 100%
            );
            z-index: 5;
            pointer-events: none;
        }
        .hero-content {
            position: absolute;
            inset: 0;
            z-index: 10;
            color: #fff;
            padding: 0 6vw;
            box-sizing: border-box;
        }
        .hero-left {
            position: absolute;
            left: 5.2vw;
            top: 50%;
            transform: translateY(calc(-50% + 5vh));
            display: flex;
            flex-direction: column;
            gap: 0.3em;
            padding-left: 2vw;
        }
        .hero-en {
            font-family: var(--font-gowun-batang), serif;
            font-size: clamp(70px, 6.5vw, 130px);
            font-weight: 400;
            font-style: normal;
            line-height: 1.05;
            letter-spacing: -0.01em;
            color: #fff;
            margin: 0;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 1s ease-out 0.4s forwards;
        }
        .hero-cn {
            font-family: var(--font-noto-serif-kr), serif;
            font-size: clamp(120px, 10.5vw, 200px);
            font-weight: 300;
            font-style: normal;
            letter-spacing: 0.04em;
            line-height: 1.0;
            color: #fff;
            margin: 0;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 0.7s forwards;
        }
        .hero-kr {
            font-family: var(--font-noto-serif-kr), serif;
            font-size: clamp(32px, 2.7vw, 52px);
            font-weight: 400;
            font-style: normal;
            letter-spacing: 0.02em;
            color: #fff;
            opacity: 0;
            margin: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 0.95s forwards;
        }
        .hero-right {
            position: absolute;
            right: 3vw;
            top: 0;
            height: 60%;
            width: 48vw;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            text-align: right;
            padding-top: 10vh;
            padding-bottom: 10vh;
            padding-right: 2vw;
            box-sizing: border-box;
            overflow: visible;
        }
        .hero-headline {
            font-family: var(--font-gowun-batang), serif;
            font-size: clamp(30px, 2.8vw, 54px);
            font-weight: 400;
            font-style: normal !important;
            white-space: normal;
            line-height: 1.3;
            letter-spacing: 0.01em;
            color: #fff;
            margin: 0;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 0.6s forwards;
        }
        .hero-body {
            font-family: var(--font-gowun-batang), serif;
            font-size: clamp(14px, 1.25vw, 24px);
            font-weight: 400;
            font-style: normal !important;
            line-height: 1.6;
            letter-spacing: 0.015em;
            max-width: 36vw;
            color: rgba(255,255,255,0.95);
            margin: 0;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 1s forwards;
        }
        .hero-mobile { display: none; }

        /* ── Project Grid ── */
        .pg-section {
            width: 100%;
            background: #fff;
            position: relative;
            overflow: hidden;
        }
        .pg-section::before {
            content: '';
            position: absolute;
            inset: -10%;
            width: 120%;
            height: 120%;
            background-image: url('/textures/shadow-overlay.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            mix-blend-mode: multiply;
            opacity: 0.22;
            filter: blur(4px);
            pointer-events: none;
            z-index: 5;
            animation: shadowDance 12s ease-in-out infinite;
        }
        @keyframes shadowDance {
            0%,  100% { transform: translate(0px,   0px)  scale(1)    rotate(0deg);   opacity: 0.22; }
            20%        { transform: translate(-25px, 15px) scale(1.05) rotate(0.5deg); opacity: 0.28; }
            40%        { transform: translate(20px, -10px) scale(1.02) rotate(-0.3deg);opacity: 0.18; }
            60%        { transform: translate(-15px, 20px) scale(1.04) rotate(0.4deg); opacity: 0.25; }
            80%        { transform: translate(10px, -15px) scale(1)    rotate(-0.2deg);opacity: 0.2;  }
        }
        @keyframes shadowDanceMobile {
            0%,  100% { transform: translate(0px,    0px) scale(1);    }
            50%        { transform: translate(-15px, 10px) scale(1.03); }
        }
        .pg-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
            align-items: end;
            position: relative;
            z-index: 1;
        }
        .pg-card {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: inherit;
            position: relative;
            z-index: 1;
        }
        .pg-card:hover { z-index: 2; }
        .pg-poster {
            width: 100%;
            overflow: hidden;
        }
        .pg-poster .poster-img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.6s ease;
        }
        .pg-space {
            width: 100%;
            aspect-ratio: 16/10;
            overflow: hidden;
            position: relative;
            flex-shrink: 0;
        }
        .pg-space img {
            position: absolute;
            inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 0.6s ease;
        }
        .pg-card:hover .pg-poster img,
        .pg-card:hover .pg-space img { transform: scale(1.03); }

        @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero Scroll Indicator ── */
        .hero-scroll {
            position: absolute;
            bottom: 36px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 2;
            opacity: 0;
            animation: fadeUp 1s ease-out 1.6s forwards;
        }
        .hero-scroll span {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 3px;
            color: rgba(255,255,255,0.3);
            text-transform: uppercase;
        }
        .hero-scroll-line {
            width: 1px;
            height: 36px;
            background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
            animation: scrollPulse 2.5s infinite;
        }
        @keyframes scrollPulse {
            0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
            50% { opacity: 1; transform: scaleY(1); }
        }

        /* ── About Section (kept for label/text reuse) ── */
        .about {
            padding: 140px 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .about-label {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.1em;
            color: #aaa;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
        .about-text-ko {
            font-size: 17px;
            line-height: 1.8;
            font-weight: 300;
            color: var(--fg-90);
            word-break: keep-all;
        }
        .about-text-en {
            font-size: 15px;
            line-height: 1.8;
            font-weight: 300;
            color: var(--fg-50);
        }

        /* ── Experience Section ── */
        .experience {
            padding: 0 40px 100px;
            padding-top: 160px;
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
            border-top: 1px solid var(--fg-10);
        }
        .exp-item:last-child {
            border-bottom: 1px solid var(--fg-10);
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
            color: var(--fg-90);
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
            color: var(--fg-50);
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
            color: var(--fg-60, var(--fg-50));
            line-height: 1.6;
            padding-left: 16px;
            position: relative;
        }
        .exp-works li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: var(--fg-30, var(--fg-40));
            font-size: 12px;
        }
        .exp-featured {
            border-top: 2px solid var(--fg-30);
            padding-bottom: 40px;
            margin-bottom: 8px;
        }
        .exp-company-featured {
            font-size: clamp(18px, 1.8vw, 24px) !important;
            letter-spacing: 0.04em;
        }
        .exp-company-studio {
            font-size: clamp(22px, 2.2vw, 30px) !important;
            letter-spacing: 0.04em;
        }
        .exp-role-gold {
            color: #999 !important;
        }
        .experience-career {
            padding-top: 80px;
        }

        .exp-scope {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.06em;
            color: #aaa;
            margin-bottom: 4px;
        }
        .exp-scope-sub {
            font-size: 13px;
            font-weight: 300;
            color: var(--fg-40);
            margin-bottom: 16px;
        }
        .exp-link {
            color: var(--fg-50);
            text-decoration: underline;
            text-underline-offset: 3px;
            transition: color 0.2s;
        }
        .exp-link:hover {
            color: var(--fg-90);
        }

        /* ── Section Title ── */
        .section-header {
            padding: 100px 40px 60px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .section-title {
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 700;
            letter-spacing: 0.04em;
        }
        .section-title-line {
            display: block;
            font-weight: 300;
            color: var(--fg-40);
        }

        /* ── Projects Section ── */
        .projects {
            padding: 0 40px 140px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .project-card {
            display: block;
            position: relative;
            margin-bottom: 40px;
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            aspect-ratio: 16/9;
            background: var(--card-bg);
        }
        .project-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.5s ease, transform 0.8s ease;
        }
        .project-card .project-img-hover {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .project-card:hover .project-img-hover {
            opacity: 1;
        }
        .project-card:hover .project-img-default {
            transform: scale(1.02);
        }
        .project-info {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 40px;
            background: linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .project-name {
            font-size: clamp(20px, 3vw, 32px);
            font-weight: 600;
            letter-spacing: 0.02em;
            margin-bottom: 10px;
        }
        .project-tag {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            padding: 6px 14px;
            border: 1px solid var(--fg-30);
            border-radius: 50px;
            letter-spacing: 0.05em;
        }
        .project-expand {
            width: 48px;
            height: 48px;
            border: 1px solid var(--fg-30);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s, border-color 0.3s;
            flex-shrink: 0;
        }
        .project-card:hover .project-expand {
            background: #fff;
            border-color: #fff;
        }
        .project-card:hover .project-expand svg path,
        .project-card:hover .project-expand svg rect {
            stroke: #0f0e0e;
            fill: #0f0e0e;
        }

        /* ── Video Feature Section ── */
        .video-feature {
            position: relative;
            width: 100%;
            height: 80vh;
            min-height: 500px;
            overflow: hidden;
        }
        .video-feature video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .video-feature-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .video-feature-text {
            font-size: clamp(32px, 6vw, 72px);
            font-weight: 300;
            letter-spacing: 0.15em;
            text-align: center;
        }

        /* ── Footer / Contact ── */
        .footer {
            padding: 100px 40px;
            border-top: 1px solid var(--fg-08);
            max-width: 1200px;
            margin: 0 auto;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
        }
        .footer-label {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.1em;
            color: var(--fg-30);
            text-transform: uppercase;
            margin-bottom: 16px;
        }
        .footer-text {
            font-size: 14px;
            line-height: 1.8;
            font-weight: 300;
            color: var(--fg-60);
        }
        .footer-bottom {
            margin-top: 80px;
            padding-top: 30px;
            border-top: 1px solid var(--fg-06);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .footer-copy {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            color: var(--fg-25);
            letter-spacing: 0.05em;
        }

        /* ── Scroll Reveal ── */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* ── Background Image Section ── */
        .bg-image-section {
            width: 100%;
            height: 60vh;
            min-height: 400px;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
        }
        .bg-image-section::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.2);
        }

        /* ── Projects Grid Overlay ── */
        .projects-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            z-index: 90;
            background: var(--overlay-bg);
            overflow-y: auto;
            transform: translateY(-100%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .projects-overlay.open {
            transform: translateY(0);
        }
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4px;
            padding: 80px 0 0 0;
            min-height: 100vh;
        }
        .grid-card {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            cursor: pointer;
            background: #e8e6e1;
        }
        .grid-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
            transform: scale(1.1);
        }
        .grid-card:hover img {
            transform: scale(1.15);
        }
        .grid-card-info {
            position: absolute;
            top: 0; left: 0; right: 0;
            padding: 16px 18px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            z-index: 2;
        }
        .grid-card-name {
            font-size: 13px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.03em;
            text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .grid-card-arrow {
            width: 28px;
            height: 28px;
            background: rgba(255,255,255,0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .grid-card-arrow svg {
            width: 12px;
            height: 12px;
        }
        .grid-card-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0,0,0,0.25) 0%, transparent 40%);
        }
        .grid-card.no-image {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--card-bg);
        }
        .grid-card.no-image .grid-card-name {
            color: rgba(255,255,255,0.8);
        }

        /* ── Project Cards Grid ── */
        .project-cards-section {
            padding: 120px 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .project-cards-heading {
            font-family: 'Inter', sans-serif;
            font-size: clamp(14px, 1.2vw, 16px);
            font-weight: 500;
            letter-spacing: 0.08em;
            color: #aaa;
            text-transform: uppercase;
            margin-bottom: 48px;
        }
        .project-cards-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
        }
        .pc-card {
            display: block;
            border-radius: 12px;
            overflow: hidden;
            background: var(--card-bg);
            transition: transform 0.35s ease, box-shadow 0.35s ease;
            text-decoration: none;
            color: inherit;
        }
        .pc-card:hover {
            transform: scale(1.03);
            box-shadow: 0 16px 48px rgba(0,0,0,0.35);
        }
        .pc-card-img-wrap {
            width: 100%;
            aspect-ratio: 16/10;
            overflow: hidden;
        }
        .pc-card-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .pc-card:hover .pc-card-img-wrap img {
            transform: scale(1.06);
        }
        .pc-card-body {
            padding: 20px 24px;
        }
        .pc-card-name {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.04em;
            margin-bottom: 8px;
        }
        .pc-card-tag {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.06em;
            color: var(--fg-50);
            padding: 4px 10px;
            border: 1px solid var(--fg-15);
            border-radius: 20px;
            display: inline-block;
        }

        /* ── Browse Count ── */
        .browse-count {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            color: var(--fg-40);
            letter-spacing: 1px;
            margin-bottom: 36px;
        }

        /* ── Filter Pills ── */
        .filter-pills {
            display: flex;
            gap: 8px;
            margin-bottom: 44px;
            flex-wrap: wrap;
        }
        .filter-pill {
            padding: 8px 20px;
            border-radius: 20px;
            border: 1px solid var(--fg-15);
            background: transparent;
            color: var(--fg-50);
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 0.02em;
            cursor: pointer;
            transition: all 0.3s;
        }
        .filter-pill:hover {
            border-color: var(--fg-30);
            color: var(--fg-70);
        }
        .filter-pill.active {
            background: var(--fg);
            border-color: var(--fg);
            color: var(--bg);
            font-weight: 500;
        }
        .filter-pill-count {
            opacity: 0.5;
            margin-left: 2px;
        }

        /* ── Project List Header ── */
        .project-list-header {
            display: grid;
            grid-template-columns: 70px 1fr 110px 200px 40px;
            align-items: center;
            gap: 16px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(196,168,130,0.12);
            margin-bottom: 4px;
        }
        .project-list-header span {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--fg-30);
            font-weight: 500;
        }

        /* ── Project List ── */
        .project-list {
            margin-bottom: 20px;
        }
        .project-list-link {
            display: block;
            text-decoration: none;
            color: inherit;
            border-top: 1px solid var(--fg-08);
            transition: background 0.2s;
        }
        .project-list-link:last-child {
            border-bottom: 1px solid var(--fg-08);
        }
        .project-list-link:hover:not(.no-link) {
            background: var(--fg-06);
        }
        .project-list-link.no-link {
            cursor: default;
        }
        .project-list-row {
            display: grid;
            grid-template-columns: 70px 1fr 110px 200px 40px;
            align-items: center;
            padding: 18px 0;
            gap: 16px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-list-row.disabled {
            opacity: 0.4;
        }
        .project-list-row.linked:hover {
            background: rgba(196,168,130,0.05);
            padding-left: 12px;
        }
        .project-list-row.linked:hover .pl-arrow {
            color: var(--fg);
            transform: translateX(4px);
        }
        .project-list-row.dim-row {
            opacity: 0.45;
            cursor: default;
        }
        .project-list-row.dim-row:hover {
            background: none;
            padding-left: 0;
        }
        .pl-year {
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            color: #aaa;
            letter-spacing: 0.05em;
        }
        .pl-name {
            font-size: 18px;
            font-weight: 500;
            color: var(--fg-90);
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .new-badge {
            display: inline-block;
            font-family: 'DM Mono', monospace;
            font-size: 7px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--bg);
            background: var(--fg);
            padding: 2px 8px;
            border-radius: 8px;
            font-weight: 500;
            flex-shrink: 0;
        }
        .coming-badge {
            display: inline-block;
            font-family: 'DM Mono', monospace;
            font-size: 7px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--fg-70);
            border: 1px solid var(--fg-30);
            padding: 2px 8px;
            border-radius: 8px;
            font-weight: 500;
            flex-shrink: 0;
        }
        .pl-category {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--fg-30);
        }
        .pl-desc {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            color: var(--fg-50);
            letter-spacing: 0.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .pl-arrow {
            font-size: 16px;
            color: var(--fg-30);
            text-align: right;
            transition: all 0.3s;
        }

        /* ── Disabled Card ── */
        .pc-card-disabled {
            opacity: 0.4;
            pointer-events: none;
        }

        /* ── Bottom Visual Grid ── */
        .btm-grid-wrap {
            padding: 80px 0 60px;
            border-top: 1px solid rgba(196,168,130,0.06);
            margin-top: 60px;
        }
        .btm-tag {
            text-align: center;
            margin-bottom: 40px;
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 6px;
            color: var(--fg-40);
            text-transform: uppercase;
        }
        .btm-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 10px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .btm-card {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 3px;
            background: #1c1c1c;
            border: 1px solid rgba(196,168,130,0.06);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btm-card:hover {
            transform: scale(1.03);
        }
        .btm-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btm-card:hover img {
            transform: scale(1.06);
        }
        .btm-card-ph {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: rgba(196,168,130,0.06);
        }
        .btm-card-label {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 14px;
            background: linear-gradient(to top, rgba(12,12,12,0.85), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .btm-card:hover .btm-card-label {
            opacity: 1;
        }
        .btm-card-label span {
            font-size: 12px;
            font-weight: 500;
            color: #aaa;
            letter-spacing: 0.5px;
        }
        .btm-card-label small {
            display: block;
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            color: #777;
            margin-top: 2px;
            letter-spacing: 1px;
        }

        /* ── Browse Grid (unified) ── */
        .browse-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 12px;
        }
        .browse-card-link {
            display: block;
            text-decoration: none;
            color: inherit;
        }
        .browse-card-nolink {
            cursor: default;
        }
        .browse-card {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 4px;
            background: #1a1a1a;
            border: 1px solid var(--fg-06);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browse-card:hover {
            transform: scale(1.03);
        }
        .browse-card-dim {
            opacity: 0.55;
        }
        .browse-card-dim:hover {
            opacity: 0.75;
        }
        .browse-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browse-card:hover img {
            transform: scale(1.06);
        }
        .browse-card-ph {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: 200;
            color: var(--fg-08);
        }
        .browse-card-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 3;
            font-family: 'DM Mono', monospace;
            font-size: 7px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--bg);
            background: var(--fg);
            padding: 2px 8px;
            border-radius: 8px;
            font-weight: 500;
        }
        .browse-card-overlay {
            position: absolute;
            inset: 0;
            z-index: 2;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 40%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 16px 18px;
            opacity: 0;
            transition: opacity 0.35s;
        }
        .browse-card:hover .browse-card-overlay {
            opacity: 1;
        }
        .browse-card-name {
            font-size: 15px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.5px;
        }
        .browse-card-meta {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: rgba(255,255,255,0.6);
            letter-spacing: 1px;
            margin-top: 4px;
        }
        .browse-card-year {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: rgba(255,255,255,0.4);
            letter-spacing: 1px;
            margin-top: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 1199px) {
            .nav { padding: 16px 24px; }
            .about { padding: 100px 24px; }
            .experience { padding: 0 24px 80px; }
            .projects { padding: 0 24px 100px; }
            .footer { padding: 80px 24px; }
            .projects-grid { grid-template-columns: repeat(3, 1fr); }
            .project-cards-grid { grid-template-columns: repeat(2, 1fr); }
            .project-cards-section { padding: 100px 24px; }
        }

        @media (max-width: 809px) {
            .nav { padding: 14px 20px; }
            .nav-menu { gap: 14px; }
            .nav-menu a,
            .nav-lang { font-size: 10px; letter-spacing: 0.08em; }
            .nav-lang { gap: 4px; }
            .nav-logo-text { font-size: 22px; }
            .about { padding: 80px 20px; }
            .hero { height: 100vh; min-height: 600px; }
            .hero-desktop { display: none !important; }
            .pg-grid { grid-template-columns: 1fr; }
            .pg-space { aspect-ratio: 4/5; }
            .pg-section::before { animation: shadowDanceMobile 15s ease-in-out infinite; opacity: 0.18; }
            .hero-mobile {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
            .hero-mobile-cn {
                font-family: var(--font-noto-serif-kr), serif;
                font-weight: 300;
                font-style: normal;
                font-size: clamp(80px, 18vw, 140px);
                line-height: 1.0;
                color: #fff;
                margin: 0;
                letter-spacing: 0.05em;
            }
            .hero-mobile-toggle {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: none;
                border: none;
                padding: 6px 0;
                cursor: pointer;
                color: #fff;
                margin-top: 20px;
                transition: opacity 0.3s ease;
            }
            .hero-mobile-toggle:hover { opacity: 0.85; }
            .hero-mobile-toggle:focus { outline: none; }
            .hero-mobile-en {
                font-family: var(--font-gowun-batang), serif;
                font-weight: 400;
                font-style: italic;
                font-size: clamp(12px, 3vw, 16px);
                letter-spacing: 0.02em;
                color: #fff;
                opacity: 0.95;
            }
            .hero-mobile-arrow {
                font-size: 18px;
                color: #fff;
                opacity: 0.8;
                display: inline-block;
                line-height: 1;
                text-shadow: 0 0 8px rgba(255,255,255,0.4);
                animation: gentleBounce 2s ease-in-out infinite;
            }
            .hero-mobile-arrow.open {
                animation: none;
                transform: rotate(180deg);
            }
            @keyframes gentleBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(4px); }
            }
            .hero-mobile-body-wrapper {
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                transition: max-height 0.5s ease, opacity 0.5s ease, margin-top 0.5s ease;
                margin-top: 0;
            }
            .hero-mobile-body-wrapper.open {
                max-height: 400px;
                opacity: 1;
                margin-top: 40px;
            }
            .hero-mobile-body {
                font-family: var(--font-gowun-batang), serif;
                font-weight: 400;
                font-style: normal;
                font-size: clamp(11px, 2.8vw, 14px);
                line-height: 1.7;
                color: #fff;
                opacity: 0.95;
                text-align: center;
                margin: 0;
                padding: 0 8vw;
            }
            .experience { padding: 0 20px 60px; }
            .exp-header { flex-wrap: wrap; gap: 4px; }
            .section-header { padding: 80px 20px 40px; }
            .projects { padding: 0 20px 80px; }
            .project-info { padding: 24px; }
            .project-card { aspect-ratio: 4/3; }
            .footer { padding: 60px 20px; }
            .footer-grid { grid-template-columns: 1fr; gap: 40px; }
            .footer-bottom { flex-direction: column; gap: 16px; }
            .bg-image-section { background-attachment: scroll; }
            .projects-grid { grid-template-columns: repeat(2, 1fr); }
            .project-cards-grid { grid-template-columns: 1fr; gap: 24px; }
            .project-cards-section { padding: 80px 20px; }
            .project-list-header { display: none; }
            .project-list-row {
                grid-template-columns: 50px 1fr 36px;
            }
            .pl-category, .pl-desc { display: none; }
            .filter-pills { gap: 8px; }
            .filter-pill { padding: 6px 14px; font-size: 12px; }
            .btm-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; }
            .btm-grid-wrap { padding: 60px 0 40px; }
            .browse-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .browse-card-overlay { opacity: 1; }
        }
      `}</style>
    </>
  );
}
