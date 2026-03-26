import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  const [lang, setLangState] = useState('ko');
  const [scrolled, setScrolled] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeScope, setActiveScope] = useState(null);
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

  const toggleScope = (index) => {
    setActiveScope((prev) => (prev === index ? null : index));
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

  // Scope toggle SVG
  const PlusSVG = () => (
    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.2"/>
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
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=IBM+Plex+Mono:wght@400;500&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </Head>

      {/* ── Navigation ── */}
      <nav ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}${overlayOpen ? ' overlay-mode' : ''}`}>
        <div className="nav-left">
          <a href="#contact" className="availability" onClick={(e) => { if (overlayOpen) { e.preventDefault(); setOverlayOpen(false); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 400); } }}>
            <span className="availability-dot"></span>
            AVAILABLE FOR PROJECT
          </a>
        </div>
        <a href="#" className="nav-center" onClick={(e) => { e.preventDefault(); toggleOverlay(); }}>
          <span className="nav-logo-text">夏陰</span>
        </a>
        <div className="nav-right">
          <button className="menu-btn" aria-label="Menu" onClick={toggleOverlay}>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ── Language Toggle ── */}
      <div className={`lang-toggle${scrolled ? ' scrolled' : ''}${overlayOpen ? ' dark' : ''}`}>
        <button className={`lang-btn${lang === 'ko' ? ' active' : ''}`} onClick={() => setLang('ko')}>KR</button>
        <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
      </div>

      {/* ── Hero ── */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="https://framerusercontent.com/assets/MoR4uHvfn9l6Y2vXWgZEumlT0.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src="/images/main/hero-title.png" alt="空間夏陰" className="hero-title-img" />
          <p className="hero-subtitle">A place where people naturally gather, like summer shade.</p>
          <p className="hero-subtitle-ko">공 간 하 음</p>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about reveal" ref={addRevealRef}>
        <div>
          <p className="about-label">About</p>
          {isKo ? (
            <p className="about-text-ko">
              공간하음(空間夏陰)은 여름날의 그늘처럼,<br/>
              자연스레 향하는 공간을 만듭니다.<br/><br/>
              우리는 그 순간의 영감을 담아,<br/>
              브랜드와 공간이 어우러지는 경험을 디자인합니다.
            </p>
          ) : (
            <p className="about-text-en" style={{ color: 'var(--fg-90)' }}>
              Gonggan Ha-umm (空間夏陰) creates spaces that,<br/>
              like summer shade, naturally draw people in.<br/><br/>
              Inspired by such moments, we design spaces<br/>
              where brand and place seamlessly become one.
            </p>
          )}
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

        {/* Project 4: SOLDAM MARKET */}
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
      <section className="scope reveal" ref={addRevealRef}>
        <h2 className="scope-title">
          CRAFTING<br/>
          <span style={{ fontWeight: 300, color: 'var(--fg-40)' }}>FROM TIP TO TOE</span>
        </h2>

        {/* 空 */}
        <div className={`scope-item${activeScope === 0 ? ' active' : ''}`}>
          <div className="scope-header" onClick={() => toggleScope(0)}>
            <div className="scope-header-left">
              <span className="scope-kanji">空</span>
              <div>
                <p className="scope-label">공간 공</p>
                <p className="scope-eng">Concept Strategy</p>
              </div>
            </div>
            <div className="scope-toggle"><PlusSVG /></div>
          </div>
          <div className="scope-body">
            <div className="scope-body-content">
              {isKo ? (
                <>
                  <span>비어 있는 공간은 브랜드 이야기를 담기 위해 존재합니다.
                    우리는 그 공간에 브랜드 컨셉을 입히고, 이야기가 흐르도록 만듭니다.</span>
                  <div className="tasks">업무 · 공간 컨셉 기획, 브랜드 스토리 설계</div>
                </>
              ) : (
                <>
                  <span>Empty spaces exist to hold brand stories.
                    We dress spaces in brand concepts, letting narratives flow naturally.</span>
                  <div className="tasks">Scope · Space concept planning, Brand story design</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 間 */}
        <div className={`scope-item${activeScope === 1 ? ' active' : ''}`}>
          <div className="scope-header" onClick={() => toggleScope(1)}>
            <div className="scope-header-left">
              <span className="scope-kanji">間</span>
              <div>
                <p className="scope-label">사이 간</p>
                <p className="scope-eng">Engage &amp; Experience</p>
              </div>
            </div>
            <div className="scope-toggle"><PlusSVG /></div>
          </div>
          <div className="scope-body">
            <div className="scope-body-content">
              {isKo ? (
                <>
                  <span>브랜드와 공간을 이어주는 건 그 안에서 흘러가는 시간과 경험입니다.
                    우리는 사람들이 머무는 모든 순간을 브랜드 경험으로 설계합니다.</span>
                  <div className="tasks">업무 · 경험 설계, 체험 프로그램 기획</div>
                </>
              ) : (
                <>
                  <span>What connects brand and space is the time and experience flowing within.
                    We design every moment of presence as a brand experience.</span>
                  <div className="tasks">Scope · Experience design, Program planning</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 夏 */}
        <div className={`scope-item${activeScope === 2 ? ' active' : ''}`}>
          <div className="scope-header" onClick={() => toggleScope(2)}>
            <div className="scope-header-left">
              <span className="scope-kanji">夏</span>
              <div>
                <p className="scope-label">여름 하</p>
                <p className="scope-eng">Branding Design</p>
              </div>
            </div>
            <div className="scope-toggle"><PlusSVG /></div>
          </div>
          <div className="scope-body">
            <div className="scope-body-content">
              {isKo ? (
                <>
                  <span>가장 뜨거운 계절, 여름은 브랜드가 가장 빛나는 순간입니다.
                    하음은 선명하게 기억되는 브랜드를 제안합니다.</span>
                  <div className="tasks">업무 · 그래픽 디자인 (로고, 패키지, 포스터 etc)</div>
                </>
              ) : (
                <>
                  <span>The hottest season — summer is when a brand shines brightest.
                    Ha-umm proposes brands that are vividly remembered.</span>
                  <div className="tasks">Scope · Graphic design (Logo, Package, Poster etc)</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 陰 */}
        <div className={`scope-item${activeScope === 3 ? ' active' : ''}`}>
          <div className="scope-header" onClick={() => toggleScope(3)}>
            <div className="scope-header-left">
              <span className="scope-kanji">陰</span>
              <div>
                <p className="scope-label">그늘 음</p>
                <p className="scope-eng">Spatial Design</p>
              </div>
            </div>
            <div className="scope-toggle"><PlusSVG /></div>
          </div>
          <div className="scope-body">
            <div className="scope-body-content">
              {isKo ? (
                <>
                  <span>뜨거운 여름 속 그늘, 사람들이 머물고 싶은 자리.
                    보이지 않는 그늘 속 시간과 디테일이 공간의 가치를 완성합니다.</span>
                  <div className="tasks">업무 · 공간 설계, 실시 설계, 감리</div>
                </>
              ) : (
                <>
                  <span>Shade in the hot summer — a place where people want to stay.
                    Invisible time and detail within the shade complete a space&apos;s value.</span>
                  <div className="tasks">Scope · Spatial design, Construction documentation, Supervision</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Cards Grid ── */}
      <section className="project-cards-section reveal" ref={addRevealRef}>
        <h2 className="project-cards-heading">
          {isKo ? '프로젝트 둘러보기' : 'Explore Projects'}
        </h2>
        <div className="project-cards-grid">
          {[
            { name: 'tofuG', href: '/projects/tofug', tag: 'Brand & Spatial Design', thumb: 'https://framerusercontent.com/images/vForpcAJWD1kBVHipRHJhWa6eM.jpg' },
            { name: 'BENSON', href: '/projects/benson', tag: 'Brand & Spatial Design', thumb: '/images/benson/page_01.png' },
            { name: 'BODY GUARD', href: '/projects/bodyguard', tag: 'Brand & Spatial Design', thumb: '/images/bodyguard/page_01.png' },
            { name: 'GAGGA', href: '/projects/gagga', tag: 'Brand & Spatial Design', thumb: '/images/gagga/hero.jpg' },
            { name: 'SOLDAM MARKET', href: '/projects/soldam', tag: 'Brand & Spatial Design', thumb: '/images/soldam/hero.jpg' },
          ].map((p) => (
            <Link key={p.href} href={p.href} className="pc-card">
              <div className="pc-card-img-wrap">
                <img src={p.thumb} alt={p.name} />
              </div>
              <div className="pc-card-body">
                <p className="pc-card-name">{p.name}</p>
                <span className="pc-card-tag">{p.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
          {/* TOFUG */}
          <Link href="/projects/tofug" className="grid-card" onClick={() => setOverlayOpen(false)}>
            <img src="/images/main/tofug-default.jpg" alt="TOFUG" />
            <div className="grid-card-overlay"></div>
            <div className="grid-card-info">
              <span className="grid-card-name">TOFU&middot;G</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </Link>
          {/* BENSON */}
          <Link href="/projects/benson" className="grid-card" onClick={() => setOverlayOpen(false)}>
            <img src="/images/main/benson-default.png" alt="BENSON" />
            <div className="grid-card-overlay"></div>
            <div className="grid-card-info">
              <span className="grid-card-name">BENSON</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </Link>
          {/* BODY GUARD */}
          <Link href="/projects/bodyguard" className="grid-card" onClick={() => setOverlayOpen(false)}>
            <img src="/images/main/bodyguard-grid.png" alt="BODY GUARD" />
            <div className="grid-card-overlay"></div>
            <div className="grid-card-info">
              <span className="grid-card-name">BODY GUARD</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </Link>
          {/* GAGGA */}
          <Link href="/projects/gagga" className="grid-card">
            <img src="/images/main/gagga-grid.jpg" alt="GAGGA" />
            <div className="grid-card-overlay"></div>
            <div className="grid-card-info">
              <span className="grid-card-name">GAGGA</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </Link>
          {/* SQUID GAME 2 */}
          <div className="grid-card no-image">
            <div className="grid-card-info">
              <span className="grid-card-name">SQUID GAME 2</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </div>
          {/* NEW BALANCE */}
          <div className="grid-card no-image">
            <div className="grid-card-info">
              <span className="grid-card-name">NEW BALANCE</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </div>
          {/* SOLDAM MARKET */}
          <Link href="/projects/soldam" className="grid-card no-image" onClick={() => setOverlayOpen(false)}>
            <div className="grid-card-info">
              <span className="grid-card-name">SOLDAM MARKET</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </Link>
          {/* PAUL BASSETT */}
          <div className="grid-card no-image">
            <div className="grid-card-info">
              <span className="grid-card-name">PAUL BASSETT</span>
              <div className="grid-card-arrow"><ArrowSVG /></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Theme Variables ── */
        :root {
            --bg: #0f0e0e;
            --fg: #fff;
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
            --nav-grad-start: rgba(16,16,16,0.7);
            --nav-grad-mid: rgba(16,16,16,0.3);
            --nav-scrolled: rgba(16,16,16,0.85);
            --card-bg: #1a1a1a;
            --overlay-bg: #f5f4f0;
            --overlay-fg: #0f0e0e;
            --hero-title-invert: 0;
        }
        @media (prefers-color-scheme: light) {
            :root {
                --bg: #f5f4f0;
                --fg: #0f0e0e;
                --fg-90: rgba(15,14,14,0.9);
                --fg-75: rgba(15,14,14,0.75);
                --fg-70: rgba(15,14,14,0.7);
                --fg-60: rgba(15,14,14,0.6);
                --fg-50: rgba(15,14,14,0.5);
                --fg-40: rgba(15,14,14,0.4);
                --fg-30: rgba(15,14,14,0.3);
                --fg-25: rgba(15,14,14,0.25);
                --fg-15: rgba(15,14,14,0.15);
                --fg-10: rgba(15,14,14,0.1);
                --fg-08: rgba(15,14,14,0.08);
                --fg-06: rgba(15,14,14,0.06);
                --nav-grad-start: rgba(245,244,240,0.7);
                --nav-grad-mid: rgba(245,244,240,0.3);
                --nav-scrolled: rgba(245,244,240,0.9);
                --card-bg: #e8e6e1;
                --overlay-bg: #0f0e0e;
                --overlay-fg: #fff;
                --hero-title-invert: 1;
            }
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

        /* ── Language Toggle ── */
        .lang-toggle {
            position: fixed;
            top: 20px;
            right: 100px;
            z-index: 200;
            display: flex;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(12px);
            transition: border-color 0.3s;
        }
        .lang-toggle.dark {
            border-color: rgba(0,0,0,0.15);
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
        .lang-toggle.scrolled {
            border-color: var(--fg-30);
        }
        .lang-toggle.scrolled .lang-btn {
            color: var(--fg-50);
        }
        .lang-toggle.scrolled .lang-btn.active {
            background: var(--fg);
            color: var(--bg);
        }
        .lang-toggle.dark .lang-btn {
            color: rgba(0,0,0,0.4);
        }
        .lang-toggle.dark .lang-btn.active {
            background: #0f0e0e;
            color: #fff;
        }

        /* ── Navigation ── */
        .nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            padding: 20px 40px;
            padding-bottom: 40px;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            background: linear-gradient(rgba(16,16,16,0.7) 0%, rgba(16,16,16,0.3) 50%, transparent 100%);
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
        .nav.scrolled .menu-btn span {
            background: var(--fg);
        }
        .nav.scrolled .availability {
            border-color: var(--fg-15);
        }
        .nav.overlay-mode {
            background: var(--overlay-bg);
            color: var(--overlay-fg);
        }
        .nav.overlay-mode .nav-logo-text {
            color: var(--overlay-fg);
        }
        .nav.overlay-mode .menu-btn span {
            background: var(--overlay-fg);
        }
        .nav.overlay-mode .availability {
            color: var(--overlay-fg);
            border-color: rgba(15,14,14,0.15);
        }
        .nav-left {
            display: flex;
            align-items: center;
        }
        .nav-center {
            display: flex;
            justify-content: center;
        }
        .nav-logo-text {
            font-size: 28px;
            font-weight: 400;
            letter-spacing: 0.05em;
        }
        .nav-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .availability {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 50px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.02em;
        }
        .availability-dot {
            width: 8px;
            height: 8px;
            background: #37ff33;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(55,255,51,0.4); }
            50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(55,255,51,0); }
        }
        .menu-btn {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 8px;
        }
        .menu-btn span {
            display: block;
            width: 22px;
            height: 1.5px;
            background: #fff;
            transition: 0.3s;
        }

        /* ── Hero Section ── */
        .hero {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 600px;
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
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            padding: 0 20px;
            color: #fff;
        }
        .hero-title-img {
            width: clamp(240px, 40vw, 560px);
            margin: 0 auto 28px;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeUp 1s ease-out 0.5s forwards;
            filter: none;
        }
        .hero-subtitle {
            font-size: clamp(13px, 1.2vw, 16px);
            font-weight: 300;
            letter-spacing: 0.06em;
            color: rgba(255,255,255,0.7);
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 0.9s forwards;
        }
        .hero-subtitle-ko {
            font-size: clamp(12px, 1.1vw, 15px);
            font-weight: 300;
            letter-spacing: 0.45em;
            color: rgba(255,255,255,0.5);
            margin-top: 10px;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease-out 1.1s forwards;
        }
        @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
        }

        /* ── About Section ── */
        .about {
            padding: 140px 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .about-label {
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.1em;
            color: var(--fg-50);
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

        /* ── Scope Section ── */
        .scope {
            padding: 140px 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .scope-title {
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 700;
            letter-spacing: 0.04em;
            margin-bottom: 80px;
        }
        .scope-item {
            border-top: 1px solid var(--fg-10);
            overflow: hidden;
        }
        .scope-item:last-child {
            border-bottom: 1px solid var(--fg-10);
        }
        .scope-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 32px 0;
            cursor: pointer;
            transition: color 0.3s;
        }
        .scope-header:hover { color: var(--fg-70); }
        .scope-header-left {
            display: flex;
            align-items: center;
            gap: 24px;
        }
        .scope-kanji {
            font-size: clamp(24px, 3vw, 36px);
            font-weight: 300;
            min-width: 60px;
        }
        .scope-label {
            font-family: 'DM Mono', monospace;
            font-size: 13px;
            letter-spacing: 0.05em;
            color: var(--fg-50);
        }
        .scope-eng {
            font-size: clamp(16px, 2vw, 22px);
            font-weight: 500;
        }
        .scope-toggle {
            width: 40px;
            height: 40px;
            border: 1px solid var(--fg-15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s;
        }
        .scope-item.active .scope-toggle {
            transform: rotate(45deg);
        }
        .scope-body {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease, padding 0.5s ease;
        }
        .scope-item.active .scope-body {
            max-height: 300px;
            padding-bottom: 32px;
        }
        .scope-body-content {
            padding-left: 84px;
            font-size: 15px;
            line-height: 1.8;
            font-weight: 300;
            color: var(--fg-60);
            word-break: keep-all;
        }
        .scope-body-content .tasks {
            margin-top: 12px;
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            color: var(--fg-40);
            letter-spacing: 0.03em;
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
            color: var(--fg-60);
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

        /* ── Responsive ── */
        @media (max-width: 1199px) {
            .nav { padding: 16px 24px; }
            .about { padding: 100px 24px; }
            .projects { padding: 0 24px 100px; }
            .scope { padding: 100px 24px; }
            .footer { padding: 80px 24px; }
            .projects-grid { grid-template-columns: repeat(3, 1fr); }
            .project-cards-grid { grid-template-columns: repeat(2, 1fr); }
            .project-cards-section { padding: 100px 24px; }
        }

        @media (max-width: 809px) {
            .nav { padding: 14px 20px; }
            .availability { display: none; }
            .lang-toggle { right: 60px; top: 16px; }
            .about { padding: 80px 20px; }
            .section-header { padding: 80px 20px 40px; }
            .projects { padding: 0 20px 80px; }
            .project-info { padding: 24px; }
            .project-card { aspect-ratio: 4/3; }
            .scope { padding: 80px 20px; }
            .scope-header-left { gap: 16px; }
            .scope-body-content { padding-left: 0; }
            .scope-kanji { min-width: 40px; }
            .footer { padding: 60px 20px; }
            .footer-grid { grid-template-columns: 1fr; gap: 40px; }
            .footer-bottom { flex-direction: column; gap: 16px; }
            .bg-image-section { background-attachment: scroll; }
            .projects-grid { grid-template-columns: repeat(2, 1fr); }
            .project-cards-grid { grid-template-columns: 1fr; gap: 24px; }
            .project-cards-section { padding: 80px 20px; }
        }
      `}</style>
    </>
  );
}
