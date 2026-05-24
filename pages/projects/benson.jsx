import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/* image map — sources copied from 공간 / 포스터 / 스티커 folders */
const IMG = {
  facade: '/images/benson/hg-facade.jpg',
  storefront: '/images/benson/hg-storefront.jpg',
  exterior: '/images/benson/hg-exterior.jpg',
  seating: '/images/benson/hg-seating.jpg',
  counter: '/images/benson/hg-counter.jpg',
  pegboard: '/images/benson/hg-pegboard.jpg',
  scoop: '/images/benson/hg-scoop.jpg',
  wordmark: '/images/benson/hg-wordmark.png',
  poster: '/images/benson/hg-poster.jpg',
  film: '/images/benson/hg-film.mp4',
};
const STK = (n) => `/images/benson/stickers/${n}`;

/* ── Top navigation — pages/index.jsx 네비바 100% 재현 ── */
function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('ko');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('site-lang');
    if (saved === 'ko' || saved === 'en') setLang(saved);
  }, []);

  const setLangPersist = (l) => {
    setLang(l);
    if (typeof window !== 'undefined') localStorage.setItem('site-lang', l);
  };

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-left">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-text">
            <span className="logo-default">夏陰</span>
            <span className="logo-hover">{lang === 'ko' ? '여름 그늘' : 'summer shade'}</span>
          </span>
        </Link>
      </div>
      <div className="nav-right">
        <ul className="nav-menu">
          <li><Link href="/#project">WORK</Link></li>
          <li><Link href="/work-corp">WORK(CORP.)</Link></li>
          <li><Link href="/info">INFO</Link></li>
          <li>
            <a href="https://www.instagram.com/id_haumm/" target="_blank" rel="noopener noreferrer">INSTA</a>
          </li>
          <li className="nav-lang" aria-label="Language toggle">
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLangPersist('en')}>EN</button>
            <span className="nav-lang-sep">/</span>
            <button type="button" className={lang === 'ko' ? 'active' : ''} onClick={() => setLangPersist('ko')}>KR</button>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 20px 40px 40px;
          display: flex; justify-content: space-between; align-items: center;
          background: transparent;
          transition: background 0.4s, padding 0.4s, color 0.3s, box-shadow 0.3s;
          color: #0d0d0d;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
        }
        .nav.scrolled {
          padding-bottom: 20px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06);
          color: #0d0d0d;
        }
        .nav-left { display: flex; align-items: center; }
        .nav-logo { display: inline-flex; align-items: center; text-decoration: none; color: inherit; }
        .nav-logo-text {
          position: relative; display: inline-flex; align-items: center;
          font-size: 28px; line-height: 1; font-weight: 400; letter-spacing: 0.05em;
          color: inherit; transition: color 0.3s;
        }
        .logo-default, .logo-hover { display: inline-block; font-size: inherit; line-height: 1; transition: opacity 0.45s ease; }
        .logo-hover {
          position: absolute; top: 50%; left: 0; transform: translateY(-50%);
          font-family: 'Cormorant Garamond', 'Noto Serif KR', serif; font-weight: 500; font-style: italic;
          letter-spacing: 0.02em; white-space: nowrap; opacity: 0; pointer-events: none;
        }
        .nav-logo:hover .logo-default { opacity: 0; }
        .nav-logo:hover .logo-hover { opacity: 1; }
        .nav-right { display: flex; align-items: center; justify-content: flex-end; }
        .nav-menu { display: flex; align-items: center; gap: 36px; list-style: none; margin: 0; padding: 0; }
        .nav-menu a {
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; color: inherit; transition: opacity 0.2s;
        }
        .nav-menu a:hover { opacity: 0.55; }
        .nav-lang {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          color: inherit;
        }
        .nav-lang button {
          font: inherit; letter-spacing: inherit; text-transform: inherit;
          color: rgba(13,13,13,0.4); background: none; border: none; padding: 0; cursor: pointer;
          transition: color 0.3s, opacity 0.2s;
        }
        .nav-lang button.active { color: #0d0d0d; font-weight: 600; }
        .nav-lang button:hover { opacity: 0.7; }
        .nav-lang-sep { color: inherit; opacity: 0.4; }
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-menu { gap: 16px; }
          .nav-menu a, .nav-lang { font-size: 10px; letter-spacing: 0.08em; }
          .nav-logo-text { font-size: 22px; }
        }
      `}</style>
    </nav>
  );
}

export default function Benson() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Head>
        <title>BENSON _ Hanwha Galleria — 공간하음 GONGGAN HA-UMM</title>
        <meta name="description" content="BENSON — 미국 서브컬처와 스트릿 무드를 담은 한화 갤러리아 벤슨 아이스크림 플래그십. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Bowlby+One&family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SiteNav />

      <main className="benson-page">

        {/* ── HERO ── */}
        <section className="hero">
          <h1 className="hero-title">BENSON_<span className="hero-client">Hanwha Galleria</span></h1>
          <p className="hero-desc">볼드한 토핑과 풍부한 유지방의 깊은 맛이 감각을 깨우는 곳. 벤슨(BENSON)은 단순히 아이스크림을 즐기는 공간을 넘어, 미국의 서브컬처와 스트릿 무드가 교차하며 만들어내는 역동적인 순간을 담았다. 공간을 가로지르는 대담한 곡선은 스케이트 파크의 에너지에서 시작되었다. 거칠면서도 정제된 콘크리트 질감 위로, 벤슨의 시그니처 레드가 맥박처럼 흐르며 공간에 강렬한 생동감을 불어넣는다. 파사드에서 내부로 부드럽게 이어지는 곡선형 퍼니처와 천장 조형물은 경계를 허물고 당신을 이 자유로운 아웃도어 무드 속으로 자연스럽게 이끈다. 이곳에서 아이스크림 한 스쿱은 단순한 디저트가 아니다. 페그보드 위에 펼쳐진 다채로운 플레이버의 향연 그리고 그 속에 스며든 스트릿 무드의 자유로움이 당신의 오감을 자극한다. 부드러운 텍스처와 청키한 토핑이 입안에서 리듬을 만들 때, 당신은 비로소 이 역동적인 세계의 일부가 된다.</p>
          <p className="hero-quote">“당신이 마주하는 이 모든 역동성이 곧 벤슨의 맛이다.”</p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="project-info">
          <div><p className="info-label">Work Scope</p><p className="info-value">SPACE, BRANDING</p></div>
          <div><p className="info-label">Site Address</p><p className="info-value">SEOUL, REPUBLIC OF KOREA</p></div>
          <div><p className="info-label">Partner</p><p className="info-value">CLIENT | Hanwha Galleria<br />BRANDING | BENSON</p></div>
          <div><p className="info-label">Area</p><p className="info-value">— PY (— m²)</p></div>
        </section>

        <div className="full-img"><img src={IMG.facade} alt="BENSON Facade" /></div>

        {/* ── BENSON POSTER ── */}
        <section className="benson-poster">
          <img className="pstk pstk-oval" src={STK('oval.png')} alt="" aria-hidden="true" />
          <img className="pstk pstk-board" src={STK('board.png')} alt="" aria-hidden="true" />
          <img className="pstk pstk-spoon" src={STK('spoon.png')} alt="" aria-hidden="true" />
          <img className="pstk pstk-circle" src={STK('circle.png')} alt="" aria-hidden="true" />

          <div className="poster-top-nav">
            <span className="active">STREET MOOD</span>
            <span>SCOOP UP YOUR TASTE</span>
            <span className="active">SPATIAL CONCEPT</span>
          </div>

          <div className="poster-title-block">
            <img className="poster-main-title" src={IMG.wordmark} alt="BENSON" />
            <span className="poster-sub-title">WHERE STREET MEETS SWEET</span>
          </div>

          <div className="poster-keywords">
            <p>CONCRETE, STREET, FLAVOR, CURVE</p>
            <p>BOLD, RAW, RED, RHYTHM</p>
            <p>SCOOP, SUBCULTURE</p>
            <p>SKATE, TASTE</p>
          </div>

          <div className="poster-bottom-text">
            <p>BOLD TOPPINGS, COLD CONCRETE, VIVID RED.</p>
            <p className="ko">볼드한 토핑과 차가운 콘크리트가 만들어내는 공간</p>
            <p className="ko">붉은 아이스크림 한 입의 역동성이 만드는 미감</p>
            <p>DYNAMIC NARRATIVE — ALL THIS DYNAMISM IS THE TASTE OF BENSON.</p>
            <p className="ko">한 스쿱의 자유로움. FROM THE STREET TO YOUR SENSES.</p>
          </div>
        </section>

        <div className="two-col">
          <img src={IMG.counter} alt="" />
          <img src={IMG.seating} alt="" />
        </div>

        <div className="video-section">
          <div className="video-wrapper portrait">
            <video autoPlay muted loop playsInline>
              <source src={IMG.film} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="full-img"><img src={IMG.pegboard} alt="" /></div>

        {/* ── FLAVOR LINE ── */}
        <section className="flavor-feature">
          <p className="flavor-text-top">벤슨의 플레이버 라인은 공간의 서사적 중심이 되는 작품으로, 스틸 타공 보드를 지하철 노선도의 형식으로 재해석하여 각 정거장에는 플레이버를, 각 라인에는 맛의 카테고리를 부여한다. 미국 서브컬처의 자유로운 언어와 스케이트 파크의 열린 기하학에서 출발한 이 거대한 페그보드는, 만지고 읽고 발견하게 만드는 인터랙티브한 그래픽 월이다. 역동적인 노선들은 단순한 메뉴 선택을 하나의 탐험으로 바꾸어 놓으며, 설명 없이도 브랜드의 캐릭터를 말하는 벽으로 자리한다.</p>

          <div className="flavor-stage">
            <p className="flavor-label-top">SIGNATURE ELEMENT</p>
            <h2 className="flavor-title">FLAVOR LINE</h2>
            <div className="flavor-image">
              <img src={IMG.pegboard} alt="BENSON's Flavor Line pegboard" />
            </div>
            <p className="flavor-tagline">A SUBWAY MAP OF TASTE</p>
          </div>

          <p className="flavor-text-bottom">Benson&apos;s Flavor Line is the narrative centerpiece of the space — a pegboard wall reinterpreted as a subway map, where each station is a flavor and each line is a family of taste. Inspired by the freewheeling language of American sub-culture and the open geometry of skate parks, the perforated metal field invites touch, reading, and discovery. Its dynamic pathways turn ordering ice cream into an act of exploration — a wall that explains the brand without ever asking to be read.</p>
        </section>

        <div className="full-img"><img src={IMG.scoop} alt="" /></div>
        <div className="full-img"><img src={IMG.counter} alt="" /></div>

        <div className="video-section"><div className="video-wrapper"></div></div>

        <div className="three-col">
          <img src={IMG.seating} alt="" />
          <img src={IMG.scoop} alt="" />
          <img src={IMG.pegboard} alt="" />
        </div>

        <div className="two-col">
          <img src={IMG.facade} alt="" />
          <img src={IMG.counter} alt="" />
        </div>

        <div className="video-section"><div className="video-wrapper"></div></div>

        {/* real BENSON poster (포스터 폴더) */}
        <div className="poster-showcase"><img src={IMG.poster} alt="BENSON poster — where street meets sweet" /></div>

        <div className="video-section"><div className="video-wrapper"></div></div>

        <div className="full-img"><img src={IMG.pegboard} alt="" /></div>
        <div className="full-img"><img src={IMG.scoop} alt="BENSON Design Boards" /></div>

        <section className="outside-section">
          <p className="outside-label">OUTDOOR</p>
          <p className="outside-time">12:00:11</p>
        </section>

        <div className="video-section"><div className="video-wrapper"></div></div>

        <section className="arch-section">
          <h3 className="arch-headline">FROM CONCRETE CURVES TO SOFT-SERVE TEXTURES,<br />BENSON IS WHERE STREET BECOMES SWEETNESS.</h3>
          <p className="arch-sub">콘크리트의 곡선이 부드러운 아이스크림의 텍스처와 만나는 곳, 거리의 무드가 한 스쿱의 달콤함이 되는 공간.</p>
          <div className="arch-img"><img src={IMG.counter} alt="FLAGSHIP01" /></div>
          <p className="room-label">FLAGSHIP<sup>01</sup></p>
        </section>

        <div className="three-col three-col-dark">
          <img src={IMG.counter} alt="" />
          <img src={IMG.scoop} alt="" />
          <img src={IMG.storefront} alt="" />
        </div>

        <div className="video-section"><div className="video-wrapper"></div></div>

        {/* ── RELATED ── */}
        <section className="related-section">
          <div className="related-grid">
            <a href="#" className="related-item" onClick={(e) => e.preventDefault()}>
              <img src={IMG.storefront} alt="" />
              <div className="related-overlay">
                <p className="related-title">BENSON</p>
                <p className="related-sub">Hanwha Galleria x 공간하음</p>
              </div>
            </a>
            <a href="#" className="related-item" onClick={(e) => e.preventDefault()}>
              <img src={IMG.scoop} alt="" />
              <div className="related-overlay">
                <p className="related-title">CONCEPT STORY</p>
                <p className="related-sub">CHAPTER 01</p>
              </div>
            </a>
            <div className="related-item related-item-dark">
              <div className="furniture-panel">
                <p className="furniture-title">FURNITURE</p>
                <p className="furniture-sub">ARCHIVE</p>
              </div>
              <div className="furniture-grid">
                <img src={IMG.counter} alt="" />
                <img src={IMG.scoop} alt="" />
                <img src={IMG.storefront} alt="" />
                <img src={IMG.pegboard} alt="" />
              </div>
            </div>
            <a href="#" className="related-item" onClick={(e) => e.preventDefault()}>
              <img src={IMG.exterior} alt="" style={{ height: '380px', width: '100%', objectFit: 'cover' }} />
              <div className="related-overlay">
                <p className="related-title">BLOG</p>
                <p className="related-sub">PROCESS</p>
              </div>
            </a>
          </div>
        </section>

        <div className="list-bar"><a href="#" onClick={(e) => { e.preventDefault(); toTop(); }}>LIST</a></div>
        <button className="top-btn" onClick={toTop} aria-label="Back to top">&#8593;</button>
      </main>

      <style jsx global>{`
        /* all rules are .benson-page-scoped so nothing leaks to other pages (e.g. index.jsx) */
        .benson-page *, .benson-page *::before, .benson-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .benson-page {
          background: #fff;
          font-family: 'Helvetica Neue', Helvetica, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
          color: #000;
          overflow-x: hidden;
        }
        .benson-page a { text-decoration: none; color: inherit; }
        .benson-page img { display: block; max-width: 100%; height: auto; }
      `}</style>

      <style jsx>{`
        /* ── HERO ── */
        .hero { padding: 130px 60px 60px; max-width: 1600px; margin: 0 auto; }
        .hero-title { font-size: 36px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 36px; line-height: 1.3; }
        .hero-client { font-weight: 700; color: #000; }
        .hero-desc { font-size: 15px; line-height: 1.85; color: #333; max-width: 1100px; word-break: keep-all; margin-bottom: 28px; text-align: justify; }
        .hero-quote { font-size: 15px; color: #111; }

        /* ── PROJECT INFO ── */
        .project-info {
          padding: 50px 60px 60px; max-width: 1600px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 20px;
          border-top: 1px solid #e0e0e0;
        }
        .info-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
        .info-value { font-size: 13px; line-height: 1.7; color: #444; }

        .full-img { width: 100%; line-height: 0; }
        .full-img img { width: 100%; object-fit: cover; }

        .two-col { display: grid; grid-template-columns: 1fr 1fr; line-height: 0; }
        .two-col img { width: 100%; height: 460px; object-fit: cover; }
        .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; line-height: 0; }
        .three-col img { width: 100%; height: 320px; object-fit: cover; }
        .three-col-dark { background: #0d0d0d; }

        .video-section { background: #000; padding: 60px; display: flex; justify-content: center; }
        .video-wrapper { width: 100%; max-width: 900px; aspect-ratio: 16/9; background: #0a0a0a; }
        .video-wrapper.portrait { max-width: 420px; aspect-ratio: 4/5; }
        .video-wrapper video { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── BENSON POSTER ── */
        .benson-poster {
          width: 100%;
          min-height: 92vh;
          background:
            radial-gradient(ellipse at 15% 60%, rgba(200,0,0,0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 25%, rgba(240,40,0,0.35) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 90%, rgba(120,0,0,0.4) 0%, transparent 50%),
            linear-gradient(155deg, #1a0000 0%, #7a0000 25%, #cc0000 50%, #900000 70%, #0d0000 100%);
          position: relative;
          overflow: hidden;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: rgba(0,0,0,0.55);
        }
        .benson-poster::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px);
          pointer-events: none; z-index: 1;
        }
        .benson-poster::after {
          content: '';
          position: absolute; inset: 0;
          background:
            linear-gradient(110deg, transparent 22%, rgba(0,0,0,0.08) 22.05%, rgba(0,0,0,0.08) 22.15%, transparent 22.2%),
            linear-gradient(110deg, transparent 38%, rgba(0,0,0,0.05) 38.04%, rgba(0,0,0,0.05) 38.1%, transparent 38.14%),
            linear-gradient(110deg, transparent 71%, rgba(0,0,0,0.07) 71.05%, rgba(0,0,0,0.07) 71.18%, transparent 71.22%);
          pointer-events: none; z-index: 2;
        }
        .poster-top-nav { display: flex; justify-content: space-between; position: relative; z-index: 10; }
        .poster-top-nav span {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(0,0,0,0.5);
        }
        .poster-top-nav span.active { color: rgba(0,0,0,0.7); }
        .poster-title-block { text-align: center; position: relative; z-index: 10; margin: 30px 0 20px; }
        .poster-main-title {
          display: block; width: clamp(280px, 60vw, 900px); height: auto; margin: 0 auto;
          filter: drop-shadow(0 0 30px rgba(0,0,0,0.18)); opacity: 0.82;
        }
        .poster-sub-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(16px, 2.4vw, 32px); font-weight: 700; letter-spacing: 0.28em;
          color: rgba(0,0,0,0.48); text-transform: uppercase; margin-top: 14px; display: block;
        }
        .poster-keywords { text-align: center; position: relative; z-index: 10; }
        .poster-keywords p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(13px, 1.5vw, 20px); font-weight: 400; letter-spacing: 0.2em;
          color: rgba(0,0,0,0.4); text-transform: uppercase; line-height: 1.85;
        }
        .poster-bottom-text { text-align: center; position: relative; z-index: 10; margin-top: 12px; }
        .poster-bottom-text p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(13px, 1.1vw, 15px); font-weight: 600; letter-spacing: 0.12em;
          color: rgba(0,0,0,0.55); text-transform: uppercase; line-height: 2.05;
        }
        .poster-bottom-text .ko {
          font-family: 'Barlow Condensed', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
          font-weight: 400; color: rgba(0,0,0,0.42); letter-spacing: 0.04em; text-transform: none;
        }
        /* stickers (스티커 폴더) */
        .pstk { position: absolute; z-index: 6; height: auto; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.3)); pointer-events: none; }
        .pstk-oval { top: 9%; right: 6%; width: clamp(110px, 13vw, 200px); transform: rotate(-8deg); }
        .pstk-board { bottom: 10%; right: 8%; width: clamp(70px, 8vw, 120px); transform: rotate(10deg); }
        .pstk-spoon { top: 12%; left: 5%; width: clamp(120px, 16vw, 240px); transform: rotate(-18deg); }
        .pstk-circle { bottom: 9%; left: 6%; width: clamp(80px, 9vw, 140px); transform: rotate(7deg); }

        /* real poster showcase (포스터 폴더) */
        .poster-showcase { background: #000; padding: 60px 20px; display: flex; justify-content: center; }
        .poster-showcase img { width: auto; max-width: 100%; max-height: 92vh; }

        /* ── FLAVOR LINE ── */
        .flavor-feature { background: #000; padding: 100px 40px 120px; overflow: hidden; }
        .flavor-text-top, .flavor-text-bottom { color: #c8111a; max-width: 1500px; margin: 0 auto; word-break: keep-all; text-align: justify; }
        .flavor-text-top { font-size: clamp(20px, 1.7vw, 30px); font-weight: 700; line-height: 1.55; letter-spacing: -0.005em; }
        .flavor-text-bottom {
          font-family: 'Playfair Display', serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(20px, 1.7vw, 30px); line-height: 1.35; letter-spacing: 0.01em;
        }
        .flavor-stage { position: relative; text-align: center; margin: 70px auto; max-width: 1500px; }
        .flavor-label-top {
          color: #c8111a; font-size: clamp(13px, 1vw, 17px); letter-spacing: 0.55em;
          text-transform: uppercase; font-weight: 400; margin-bottom: 0; position: relative; z-index: 3;
        }
        .flavor-title {
          font-family: 'Playfair Display', serif; font-weight: 900; color: #c8111a;
          font-size: clamp(90px, 17vw, 260px); line-height: 0.95; letter-spacing: -0.025em;
          margin: 8px 0 -90px 0; position: relative; z-index: 3;
        }
        .flavor-image { margin: 0 auto; max-width: 60%; position: relative; z-index: 1; line-height: 0; }
        .flavor-image img {
          width: 100%; display: block;
          filter: grayscale(1) brightness(0.55) contrast(1.5) sepia(1) hue-rotate(-25deg) saturate(7) brightness(0.95);
        }
        .flavor-tagline {
          color: #c8111a; font-size: clamp(13px, 1vw, 17px); letter-spacing: 0.55em;
          text-transform: uppercase; font-weight: 400; margin-top: -50px; position: relative; z-index: 3;
        }

        .outside-section {
          min-height: 480px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative;
          background-image: url('/images/benson/hg-facade.jpg');
          background-size: cover; background-position: center;
        }
        .outside-section::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.72); }
        .outside-label, .outside-time { position: relative; z-index: 1; color: #c8111a; letter-spacing: 0.2em; text-transform: uppercase; }
        .outside-label { font-size: 11px; margin-bottom: 8px; }
        .outside-time { font-size: 20px; }

        .arch-section { background: #0d0d0d; padding: 80px 60px; text-align: center; }
        .arch-headline { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.5; margin-bottom: 10px; }
        .arch-sub { font-size: 14px; color: #888; margin-bottom: 40px; }
        .arch-img { max-width: 820px; margin: 0 auto; line-height: 0; }
        .arch-img img { width: 100%; }
        .room-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #555; margin-top: 10px; }

        .related-section { background: #000; }
        .related-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .related-item { position: relative; overflow: hidden; display: block; }
        .related-item > img { width: 100%; height: 380px; object-fit: cover; transition: transform 0.4s; }
        .related-item:hover > img { transform: scale(1.04); }
        .related-item-dark { background: #000; cursor: pointer; }
        .related-overlay { position: absolute; top: 0; left: 0; right: 0; padding: 24px 20px; background: rgba(0,0,0,0.35); color: #fff; }
        .related-title { font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .related-sub { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #ccc; margin-top: 4px; }
        .furniture-panel { background: #000; padding: 20px 16px 0; text-align: center; }
        .furniture-title { color: #fff; font-size: 18px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .furniture-sub { color: #888; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 4px; margin-bottom: 14px; }
        .furniture-grid { display: grid; grid-template-columns: 1fr 1fr; line-height: 0; }
        .furniture-grid img { width: 100%; }

        .list-bar { position: fixed; bottom: 24px; left: 24px; z-index: 600; }
        .list-bar a { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: underline; color: #000; }
        .top-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 600; width: 48px; height: 48px;
          background: #000; color: #fff; font-size: 18px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }

        @media (max-width: 768px) {
          .hero { padding: 100px 20px 40px; }
          .project-info { padding: 40px 20px; grid-template-columns: 1fr 1fr; }
          .two-col { grid-template-columns: 1fr; }
          .two-col img { height: 280px; }
          .three-col { grid-template-columns: 1fr; }
          .three-col img { height: 280px; }
          .video-section { padding: 30px 16px; }
          .arch-section { padding: 50px 20px; }
          .flavor-feature { padding: 60px 20px 80px; }
          .flavor-image { max-width: 88%; }
          .flavor-title { margin-bottom: -50px; }
          .flavor-label-top, .flavor-tagline { letter-spacing: 0.3em; }
          .related-grid { grid-template-columns: 1fr; }
          .pstk-spoon, .pstk-circle { width: 90px; }
        }
      `}</style>
    </>
  );
}
