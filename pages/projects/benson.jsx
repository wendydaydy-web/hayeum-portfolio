import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/* image map — sources copied from 공간 / 포스터 / 스티커 folders */
const IMG = {
  facade: '/images/benson/hg-facade.jpg',
  seating: '/images/benson/hg-seating.jpg',
  counter: '/images/benson/hg-counter.jpg',
  pegboard: '/images/benson/hg-pegboard.jpg',
  redPoster: '/images/benson/benson-red-poster.webp',
};
const STK = (n) => `/images/benson/stickers/${n}`;

/* ── Top navigation — pages/index.jsx 네비바 100% 재현 ── */
function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('ko');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('site-lang');
    const initial = saved === 'ko' || saved === 'en' ? saved : 'ko';
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLangPersist = (l) => {
    setLang(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-lang', l);
      document.documentElement.lang = l;
    }
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
        /* index.jsx 네비바 기반 — 배경 투명(메인처럼), 라이트 페이지용 다크 텍스트 */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 40px;
          padding-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          transition: background 0.4s, padding 0.4s, color 0.3s;
          color: #1a1a1a;
        }
        .nav.scrolled {
          padding-bottom: 20px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
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
          color: #1a1a1a;
          transition: color 0.3s;
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
        .nav-menu li {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        /* :global(a) so it also reaches the <a> rendered by next/link (no underscore class) */
        .nav-menu :global(a) {
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #1a1a1a;
          line-height: 1;
          transition: color 0.3s, opacity 0.2s;
        }
        .nav-menu :global(a):hover {
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
          color: #1a1a1a;
          line-height: 1;
        }
        .nav-lang button {
          font: inherit;
          line-height: 1;
          letter-spacing: inherit;
          text-transform: inherit;
          color: rgba(26,26,26,0.4);
          transition: color 0.3s, opacity 0.2s;
          padding: 0;
          margin: 0;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-lang button.active {
          color: #1a1a1a;
          font-weight: 600;
        }
        .nav-lang button:hover {
          opacity: 0.7;
        }
        .nav-lang-sep {
          color: inherit;
          opacity: 0.4;
        }
        @media (max-width: 1199px) {
          .nav { padding: 16px 24px; }
        }
        @media (max-width: 809px) {
          .nav { padding: 14px 20px; }
          .nav-menu { gap: 14px; }
          .nav-menu :global(a),
          .nav-lang { font-size: 10px; letter-spacing: 0.08em; }
          .nav-lang { gap: 4px; }
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
          <p className="hero-positioning">
            <span data-ko>Fortune Global 500 기업 한화갤러리아의 신규 F&amp;B 브랜드 BENSON — 스프레드웍스의 의뢰로 공간·SI 디자인을 맡았습니다.</span>
            <span data-en>Space &amp; SI design for BENSON, a new F&amp;B brand for Hanwha Galleria (Fortune Global 500), commissioned by Spreadworks.</span>
          </p>
          <p className="hero-desc">
            <span data-ko>볼드한 토핑과 풍부한 유지방의 깊은 맛이 감각을 깨우는 곳. 벤슨(BENSON)은 단순히 아이스크림을 즐기는 공간을 넘어, 미국의 서브컬처와 스트릿 무드가 교차하며 만들어내는 역동적인 순간을 담았다. 공간을 가로지르는 대담한 곡선은 스케이트 파크의 에너지에서 시작되었다. 거칠면서도 정제된 콘크리트 질감 위로, 벤슨의 시그니처 레드가 맥박처럼 흐르며 공간에 강렬한 생동감을 불어넣는다. 파사드에서 내부로 부드럽게 이어지는 곡선형 퍼니처와 천장 조형물은 경계를 허물고 당신을 이 자유로운 아웃도어 무드 속으로 자연스럽게 이끈다. 이곳에서 아이스크림 한 스쿱은 단순한 디저트가 아니다. 페그보드 위에 펼쳐진 다채로운 플레이버의 향연 그리고 그 속에 스며든 스트릿 무드의 자유로움이 당신의 오감을 자극한다. 부드러운 텍스처와 청키한 토핑이 입안에서 리듬을 만들 때, 당신은 비로소 이 역동적인 세계의 일부가 된다.</span>
            <span data-en>A place where bold toppings and deeply rich, creamy ice cream awaken the senses. BENSON is more than an ice cream shop — it captures the dynamic energy born where American subculture meets the street. The bold curves sweeping through the space draw their energy from skate-park geometry. Across raw yet refined concrete, BENSON&apos;s signature red runs like a pulse, breathing vitality into every corner. Curvilinear furniture and ceiling sculptures flow gently from facade to interior, dissolving boundaries and drawing you into a free, open-air atmosphere. Here, a single scoop is more than dessert. The pegboard&apos;s vivid procession of flavors — charged with the freedom of the street — awakens every sense. When soft textures and chunky toppings build a rhythm on your tongue, you become part of this dynamic world.</span>
          </p>
          <p className="hero-quote">
            <span data-ko>“당신이 마주하는 이 모든 역동성이 곧 벤슨의 맛이다.”</span>
            <span data-en>“All this energy you encounter — that is the taste of BENSON.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="project-info">
          <div>
            <p className="info-label">Work Scope</p>
            <p className="info-value">
              <span data-ko>공간 디자인 · SI 가이드북 제작</span>
              <span data-en>Space Design · SI Guidebook</span>
            </p>
          </div>
          <div>
            <p className="info-label">Project Type</p>
            <p className="info-value">
              <span data-ko>신규 F&amp;B 브랜드 · 플래그십 컨셉</span>
              <span data-en>New F&amp;B Brand · Flagship Concept</span>
            </p>
          </div>
          <div className="info-partner">
            <p className="info-label">Partner</p>
            <p className="info-value">
              <span className="info-line">
                <span data-ko className="info-nowrap">CLIENT | 한화갤러리아 — 한화그룹 (Fortune Global 500)</span>
                <span data-en className="info-nowrap">CLIENT | Hanwha Galleria — Hanwha Group (Fortune Global 500)</span>
              </span>
              <span className="info-line">
                <span data-ko className="info-nowrap">AGENCY | 스프레드웍스</span>
                <span data-en className="info-nowrap">AGENCY | Spreadworks</span>
              </span>
            </p>
          </div>
        </section>

        {/* red poster (스케이트 사진) + 4 corner stickers in ㄹ-pattern, hover-shake */}
        <div className="full-img full-img-stickers">
          <img src={IMG.redPoster} alt="BENSON Red Poster" />
          <img className="skstk skstk-tl" src="/projects/benson/skate-sticker-tl.webp" alt="" aria-hidden="true" />
          <img className="skstk skstk-tr" src="/projects/benson/skate-sticker-tr.webp" alt="" aria-hidden="true" />
          <img className="skstk skstk-bl" src="/projects/benson/skate-sticker-bl.webp" alt="" aria-hidden="true" />
          <img className="skstk skstk-br" src="/projects/benson/skate-sticker-br.webp" alt="" aria-hidden="true" />
        </div>

        <div className="cup-feature">
          <img src="/images/benson/cup-drizzle-clean.png" alt="BENSON ice cream cup with chocolate and caramel drizzle" />
        </div>

        <div className="full-img"><img src={IMG.facade} alt="BENSON storefront facade" /></div>

        {/* ── BENSON POSTER ── */}
        <section className="benson-poster">
          <div className="benson-poster-overlay" aria-hidden="true"></div>
          <img className="pstk pstk-oval" src={STK('oval.png')} alt="" aria-hidden="true" />
          <img className="pstk pstk-board" src={STK('board.webp')} alt="" aria-hidden="true" />
          <img className="pstk pstk-spoon" src={STK('spoon.png')} alt="" aria-hidden="true" />
          <img className="pstk pstk-circle" src="/projects/benson/circle-sticker.webp" alt="" aria-hidden="true" />

          <div className="poster-top-nav">
            <span className="active">STREET MOOD</span>
            <span>SCOOP UP YOUR TASTE</span>
            <span className="active">SPATIAL CONCEPT</span>
          </div>

          <div className="poster-title-block">
            <span className="poster-main-title" role="img" aria-label="BENSON" />
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

        <div className="full-img"><img src={IMG.pegboard} alt="" /></div>

        {/* ── FLAVOR LINE ── */}
        <section className="flavor-feature">
          <div className="flavor-stage">
            <p className="flavor-label-top">SIGNATURE ELEMENT</p>
            <h2 className="flavor-title">FLAVOR LINE</h2>
            <div className="flavor-image">
              <img src={IMG.pegboard} alt="BENSON's Flavor Line pegboard" />
            </div>
            <p className="flavor-tagline">A SUBWAY MAP OF TASTE</p>
          </div>

          <p className="flavor-text-ko" data-ko>벤슨의 플레이버 라인은 공간의 서사적 중심이 되는 작품으로, 스틸 타공 보드를 지하철 노선도의 형식으로 재해석하여 각 정거장에는 플레이버를, 각 라인에는 맛의 카테고리를 부여한다. 미국 서브컬처의 자유로운 언어와 스케이트 파크의 열린 기하학에서 출발한 이 거대한 페그보드는, 만지고 읽고 발견하게 만드는 인터랙티브한 그래픽 월이다. 역동적인 노선들은 단순한 메뉴 선택을 하나의 탐험으로 바꾸어 놓으며, 설명 없이도 브랜드의 캐릭터를 말하는 벽으로 자리한다.</p>

          <p className="flavor-text-en" data-en>Benson&apos;s Flavor Line is the narrative centerpiece of the space — a pegboard wall reinterpreted as a subway map, where each station is a flavor and each line is a family of taste. Inspired by the freewheeling language of American sub-culture and the open geometry of skate parks, the perforated metal field invites touch, reading, and discovery. Its dynamic pathways turn ordering ice cream into an act of exploration — a wall that explains the brand without ever asking to be read.</p>
        </section>

        <div className="cup-feature">
          <img src="/images/benson/cup-stack.webp" alt="BENSON ice cream cup lineup — packaging across flavor range" />
        </div>

        {/* ── SI GUIDE — 9 SECTIONS PORTED FROM SOURCE INDEX.HTML ── */}
        <div className="si-sections">
          {/* 01 — Design Strategy */}
          <section className="si-section si-concept">
            <div className="si-section-inner">
              <div className="si-concept-grid">
                <div>
                  <p className="si-section-label">01 — Design Strategy</p>
                  <h2 className="si-section-title">Authentic American<br />Street Dessert</h2>
                  <p className="si-section-desc" data-ko>벤슨 아이스크림 샵은 벤슨이 전개하는 미국스타일 아이스크림의 다이내믹한 플레이버, 볼드한 토핑, 풍부한 유지방이 만들어내는 부드러움을 미국의 서브컬쳐를 모티브로 풀어낸 공간입니다.</p>
                  <p className="si-section-desc" data-en>The Benson Ice Cream shop is a space that channels the dynamic flavors, bold toppings, and rich creaminess of American-style ice cream through the lens of American subculture.</p>
                  <div className="si-concept-keywords">
                    <span className="si-keyword">Dynamic</span>
                    <span className="si-keyword">Connect</span>
                    <span className="si-keyword">Authentic</span>
                  </div>
                </div>
                <div className="si-concept-image">
                  <img src="/images/benson/siguide/strategy-lifestyle.png" alt="Design Strategy" />
                </div>
              </div>
            </div>
          </section>

          {/* 02 — Facade */}
          <section className="si-section" id="si-facade">
            <div className="si-section-inner">
              <p className="si-section-label">02 — Facade</p>
              <h2 className="si-section-title">Storefront Design</h2>
              <p className="si-section-desc" data-ko>폴딩도어와 전면 곡선으로 부드럽게 이어지는 파사드 구조물로 내외부를 연결하여 접근성을 높이고, 스트릿 푸드가 가진 자유로움과 활기참을 표현하였습니다.</p>
              <p className="si-section-desc" data-en>Folding doors and a gently curving facade structure seamlessly bridge the interior and exterior, enhancing accessibility while embodying the freedom and vibrancy of street food culture.</p>
              <div className="si-facade-image">
                <img src={IMG.facade} alt="Storefront facade" />
              </div>
            </div>
          </section>

          {/* 03 — Perspectives */}
          <section className="si-section si-perspectives">
            <div className="si-section-inner">
              <p className="si-section-label">03 — Perspectives</p>
              <h2 className="si-section-title">Interior Views</h2>
              <p className="si-section-desc" data-ko>곡선형 메인 퍼니처와 레드 포인트 컬러가 어우러진 역동적인 내부 공간</p>
              <p className="si-section-desc" data-en>A dynamic interior where curvilinear main furniture meets bold red accent colors</p>
              <div className="si-gallery-grid">
                <div className="si-gallery-item si-wide"><img src="/images/benson/siguide/page_09.png" alt="Interior wide view" /></div>
                <div className="si-gallery-item"><img src="/images/benson/siguide/page_07.png" alt="Interior view - VMD zone" /></div>
                <div className="si-gallery-item"><img src="/images/benson/siguide/page_08.png" alt="Interior view - counter" /></div>
                <div className="si-gallery-item si-wide"><img src="/images/benson/siguide/page_12.png" alt="Interior view - counter area" /></div>
                <div className="si-gallery-item"><img src="/images/benson/siguide/page_10.png" alt="Interior view - pegboard" /></div>
                <div className="si-gallery-item"><img src="/images/benson/siguide/page_11.png" alt="Interior view - VMD display" /></div>
                <div className="si-gallery-item si-wide"><img src="/images/benson/siguide/page_13.png" alt="Interior wide view - seating" /></div>
              </div>
            </div>
          </section>

          {/* 04 — Design Concept */}
          <section className="si-section" id="si-details">
            <div className="si-section-inner">
              <p className="si-section-label">04 — Design Concept</p>
              <h2 className="si-section-title">Outdoor Zone → Connect Inside</h2>
              <p className="si-section-desc" data-ko>벤슨 아이스크림 샵은 폴딩도어와 전면 곡선으로 부드럽게 이어지는 파사드 구조물, 매장 전체를 관통하는 사이니지, 벤치-테이블로 이어지는 곡선형 메인 퍼니처를 이용해 내외부를 연결함으로써, 내부 뿐 아니라 외부에서도 벤슨 아이스크림을 즐길 수 있는 아웃도어 형태로 디자인하였습니다.</p>
              <p className="si-section-desc" data-en>By connecting interior and exterior through folding doors, a gently curving facade, store-spanning signage, and a flowing bench-to-table main furniture piece, the Benson Ice Cream shop is designed as an outdoor-oriented space where guests can enjoy ice cream both inside and out.</p>
              <div className="si-concept-detail-grid">
                <div className="si-concept-detail-pair">
                  <img src="/images/benson/siguide/page_14-left.png" alt="Outdoor zone" className="si-concept-detail-img si-pair-left" />
                  <div className="si-concept-detail-img-wrap si-pair-right">
                    <img src="/images/benson/siguide/connect-inside-clean.png" alt="Connect inside" className="si-concept-detail-img" />
                    <span className="si-img-marker" style={{ top: '20%', left: '24%' }}>1</span>
                    <span className="si-img-marker" style={{ top: '34%', left: '50%' }}>2</span>
                    <span className="si-img-marker" style={{ top: '60%', left: '22%' }}>3</span>
                    <span className="si-img-marker" style={{ top: '58%', left: '72%' }}>4</span>
                  </div>
                </div>
                <div className="si-concept-detail-list">
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">1</span>
                    <div>
                      <span data-ko>내부와 이어지는 파사드 디자인</span>
                      <span data-en>Facade design flowing seamlessly into the interior</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">2</span>
                    <div>
                      <span data-ko>외부와 내부를 연결하는 천장 조형물</span>
                      <span data-en>Ceiling sculptural element connecting exterior and interior</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">3</span>
                    <div>
                      <span data-ko>외부와 내부를 연결하는 실내 취식 공간</span>
                      <span data-en>Indoor dining area bridging outdoor and indoor zones</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">4</span>
                    <div>
                      <span data-ko>아이스크림 카운터와 전면 창의 곡선이 어우러지는 디자인</span>
                      <span data-en>Ice cream counter harmonized with the curved front window</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">5</span>
                    <div>
                      <span data-ko>벤치에서 테이블로 이어지는 곡선형 메인 퍼니처</span>
                      <span data-en>Curved main furniture flowing from bench to table</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 05 — Design Details */}
          <section className="si-section si-design-details-section">
            <div className="si-section-inner">
              <p className="si-section-label">05 — Design Details</p>
              <h2 className="si-section-title">Shape &amp; Motif</h2>
              <div className="si-concept-detail-grid">
                <img src="/images/benson/siguide/page_16.png" alt="Design detail - Sub-culture motif" className="si-concept-detail-img" />
                <div className="si-concept-detail-list">
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">9</span>
                    <div>
                      <span data-ko>벤슨 아이스크림의 플레이버를 설명하는 페그보드 VMD</span>
                      <span data-en>Pegboard VMD showcasing Benson&apos;s ice cream flavors</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">11</span>
                    <div>
                      <span data-ko>스트릿 무드를 표현한 바닥과 곡선 디자인</span>
                      <span data-en>Street-mood flooring and curved design</span>
                    </div>
                  </div>
                  <div className="si-concept-detail-item">
                    <span className="si-concept-num">10</span>
                    <div>
                      <span data-ko>보드 형태에서 모티브를 받은 스탠딩 테이블</span>
                      <span data-en>Standing tables inspired by skateboard forms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 06 — Materials */}
          <section className="si-section si-materials" id="si-materials">
            <div className="si-section-inner">
              <p className="si-section-label">06 — Materials</p>
              <h2 className="si-section-title">Raw Material</h2>
              <p className="si-section-desc" data-ko>전체적으로 외부 트랙에서 사용하는 콘크리트와 같은 익스트림하고 로우한 소재를 활용해, 메탈소재로 현대적이고 세련된 이미지를, 콘크리트와 에폭시로 벤슨의 스트릿한 브랜드 무드를 표현하였습니다.</p>
              <p className="si-section-desc" data-en>Raw, extreme materials like concrete — reminiscent of outdoor skate tracks — are paired with metal for a modern, refined image, while concrete and epoxy finishes convey Benson&apos;s street-inspired brand mood.</p>
              <div className="si-materials-grid">
                <div>
                  <div className="si-material-list">
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)' }}></div>
                      <div>
                        <div className="si-mat-name">Metal</div>
                        <div className="si-mat-desc" data-ko>헤어라인 실버 메탈</div>
                        <div className="si-mat-desc" data-en>Hairline silver metal</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #808080, #606060)' }}></div>
                      <div>
                        <div className="si-mat-name">Concrete</div>
                        <div className="si-mat-desc" data-ko>시멘트 콘크리트</div>
                        <div className="si-mat-desc" data-en>Cement concrete</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)' }}></div>
                      <div>
                        <div className="si-mat-name">Epoxy (Matte)</div>
                        <div className="si-mat-desc" data-ko>에폭시 무광 코팅</div>
                        <div className="si-mat-desc" data-en>Matte-coated epoxy</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #f5efe0, #e8dcc8)' }}></div>
                      <div>
                        <div className="si-mat-name">Paint</div>
                        <div className="si-mat-desc" data-ko>도장 마감</div>
                        <div className="si-mat-desc" data-en>Painted finish</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #d4b896, #c4a87a)' }}></div>
                      <div>
                        <div className="si-mat-name">Birch Wood</div>
                        <div className="si-mat-desc" data-ko>자작목</div>
                        <div className="si-mat-desc" data-en>Natural birch plywood</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'linear-gradient(135deg, #e2d5c0, #d5c5a8)' }}></div>
                      <div>
                        <div className="si-mat-name">Engineered Stone</div>
                        <div className="si-mat-desc" data-ko>인조대리석</div>
                        <div className="si-mat-desc" data-en>Engineered marble</div>
                      </div>
                    </div>
                    <div className="si-material-item">
                      <div className="si-material-swatch" style={{ background: 'var(--si-benson-red)' }}></div>
                      <div>
                        <div className="si-mat-name">Red Tile</div>
                        <div className="si-mat-desc" data-ko>레드 포인트 타일</div>
                        <div className="si-mat-desc" data-en>Accent red tile</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <img src="/images/benson/siguide/page_20.png" alt="Material board" />
                </div>
              </div>
            </div>
          </section>

          {/* 07 — Color */}
          <section className="si-section si-color-section">
            <div className="si-section-inner">
              <p className="si-section-label">07 — Color</p>
              <h2 className="si-section-title">Benson Red</h2>
            </div>
            <div className="si-color-split">
              <div className="si-color-image si-img-crop-en si-crop-18">
                <img src="/images/benson/siguide/page_18.png" alt="Color perspective" />
              </div>
              <div className="si-color-info">
                <h3>Color Point</h3>
                <p data-ko>벤슨 아이스크림의 다채로운 아이스크림 특성을 반영해, 레드 포인트 컬러를 활용하여 경쾌하고 밝은 느낌을 더해 공간에 활기와 생동감을 불어넣고자 하였습니다.</p>
                <p data-en>Reflecting the vibrant variety of Benson&apos;s ice cream lineup, a bold red accent color is used throughout the space to add a lively, upbeat energy and inject a sense of vitality into every corner.</p>
                <span className="si-pantone-tag">PANTONE 485C</span>
              </div>
            </div>
          </section>

          {/* 08 — Layout */}
          <section className="si-section si-layout-section" id="si-layout">
            <div className="si-section-inner">
              <p className="si-section-label">08 — Layout</p>
              <h2 className="si-section-title">Space Planning</h2>
              <p className="si-section-desc" data-ko>아이스크림 제조 동선과 고객 체험 공간을 효율적으로 분리하면서도 시각적 연결을 유지한 레이아웃</p>
              <p className="si-section-desc" data-en>A layout that efficiently separates ice cream production flow from the customer experience zone while maintaining visual connectivity throughout.</p>
              <div className="si-layout-image">
                <img src="/images/benson/siguide/page_19.png" alt="Floor layout" />
              </div>
              <div className="si-zone-list">
                <span className="si-zone-tag">Stock</span>
                <span className="si-zone-tag">Work Zone</span>
                <span className="si-zone-tag">Sanitary Zone</span>
                <span className="si-zone-tag">VMD Zone</span>
                <span className="si-zone-tag">Tasting Zone</span>
                <span className="si-zone-tag">Outdoor Zone</span>
              </div>
            </div>
          </section>

          {/* 09 — Technical */}
          <section className="si-section si-technical">
            <div className="si-section-inner">
              <p className="si-section-label">09 — Technical</p>
              <h2 className="si-section-title">Detail &amp; VMD</h2>
              <div className="si-tech-images">
                <div className="si-img-crop-en si-crop-17"><img src="/images/benson/siguide/page_17.png" alt="Material rendering" /></div>
                <img src="/images/benson/siguide/page_26.png" alt="Pegboard detail" />
                <img src="/images/benson/siguide/page_30.png" alt="Menu board detail" />
              </div>
            </div>
          </section>
        </div>

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
        .hero-title { font-size: 36px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 18px; line-height: 1.3; }
        .hero-client { font-weight: 700; color: #000; }
        .hero-positioning { font-size: 13px; line-height: 1.7; color: #666; max-width: 1100px; word-break: keep-all; margin-bottom: 32px; font-weight: 400; letter-spacing: 0.01em; }
        .hero-desc { font-size: 15px; line-height: 1.85; color: #333; max-width: 1100px; word-break: keep-all; margin-bottom: 28px; text-align: justify; }
        .hero-quote { font-size: 15px; color: #111; }

        /* ── PROJECT INFO ── */
        .project-info {
          padding: 50px 60px 60px; max-width: 1600px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr 3fr; gap: 32px 20px;
          border-top: 1px solid #e0e0e0;
        }
        .info-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
        .info-value { font-size: 13px; line-height: 1.7; color: #444; }
        .info-value .info-line { display: block; }
        .info-value .info-nowrap { white-space: nowrap; }

        .full-img { width: 100%; line-height: 0; }
        .full-img img { width: 100%; object-fit: cover; }

        /* 컵 제품 컷 — 풀폭으로 깔기 (배경 베이지 톤으로 위 flavor-feature와 자연스럽게 이어짐) */
        .cup-feature { width: 100%; line-height: 0; }
        .cup-feature img { width: 100%; display: block; }

        /* ── 첫 이미지(스케이트 사진) 4-corner 스티커 (ㄹ-pattern) ── */
        .full-img-stickers { position: relative; }
        .full-img-stickers .skstk {
          position: absolute;
          width: clamp(60px, 8vw, 130px);
          height: auto;
          z-index: 5;
          pointer-events: none;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.32));
          transform: rotate(var(--rot, 0deg));
          transform-origin: center;
        }
        .full-img-stickers .skstk-tl { top: 3%;    left: 3%;  --rot: -8deg; }
        .full-img-stickers .skstk-tr { top: 3%;    right: 3%; --rot:  7deg; }
        .full-img-stickers .skstk-bl { bottom: 3%; left: 3%;  --rot:  5deg; }
        .full-img-stickers .skstk-br { bottom: 3%; right: 3%; --rot: -6deg; }

        /* hover 시 4 스티커가 각자의 베이스 회전 주위로 흔들림 */
        .full-img-stickers:hover .skstk { animation: skstk-shake 0.6s ease-in-out infinite; }
        @keyframes skstk-shake {
          0%, 100% { transform: rotate(var(--rot)); }
          25%      { transform: rotate(calc(var(--rot) - 5deg)); }
          50%      { transform: rotate(calc(var(--rot) + 3deg)); }
          75%      { transform: rotate(calc(var(--rot) + 5deg)); }
        }

        @media (max-width: 768px) {
          .full-img-stickers .skstk { width: clamp(40px, 10vw, 70px); }
        }

        .two-col { display: grid; grid-template-columns: 1fr 1fr; line-height: 0; }
        .two-col img { width: 100%; height: 460px; object-fit: cover; }

        /* ── BENSON POSTER ── */
        .benson-poster {
          width: 100%;
          min-height: 92vh;
          background: #FFF8E7;
          position: relative;
          overflow: hidden;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #000;
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
        .benson-poster-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: none;
          pointer-events: none;
          z-index: 3;
        }
        .poster-top-nav { display: flex; justify-content: space-between; position: relative; z-index: 10; }
        .poster-top-nav span {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: #000;
        }
        .poster-top-nav span.active { color: #000; }
        .poster-title-block { text-align: center; position: relative; z-index: 10; margin: 30px 0 20px; }
        /* BENSON wordmark — colored mask so PNG renders in exact brand red (#c8111a) */
        .poster-main-title {
          display: block;
          width: clamp(280px, 60vw, 900px);
          aspect-ratio: 959 / 270;
          margin: 0 auto;
          background-color: #c8111a;
          -webkit-mask: url('/images/benson/hg-wordmark.png') center / contain no-repeat;
                  mask: url('/images/benson/hg-wordmark.png') center / contain no-repeat;
        }
        .poster-sub-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(16px, 2.4vw, 32px); font-weight: 700; letter-spacing: 0.28em;
          color: #c8111a; text-transform: uppercase; margin-top: 14px; display: block;
        }
        .poster-keywords { text-align: center; position: relative; z-index: 10; }
        .poster-keywords p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(13px, 1.5vw, 20px); font-weight: 400; letter-spacing: 0.2em;
          color: #000; text-transform: uppercase; line-height: 1.85;
        }
        .poster-bottom-text { text-align: center; position: relative; z-index: 10; margin-top: 12px; }
        .poster-bottom-text p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(13px, 1.1vw, 15px); font-weight: 600; letter-spacing: 0.12em;
          color: #000; text-transform: uppercase; line-height: 2.05;
        }
        .poster-bottom-text .ko {
          font-family: 'Barlow Condensed', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
          font-weight: 400; color: #000; letter-spacing: 0.04em; text-transform: none;
        }
        /* stickers (스티커 폴더) */
        .pstk { position: absolute; z-index: 6; height: auto; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.3)); pointer-events: none; }
        .pstk-oval { top: 9%; right: 6%; width: clamp(110px, 13vw, 200px); transform: rotate(-8deg); }
        .pstk-board { bottom: 10%; right: 8%; width: clamp(70px, 8vw, 120px); transform: rotate(10deg); }
        .pstk-spoon { top: 12%; left: 5%; width: clamp(120px, 16vw, 240px); transform: rotate(-18deg); }
        .pstk-circle { bottom: 20%; left: 3%; width: clamp(75px, 7vw, 120px); transform: rotate(7deg); }
        @media (max-width: 1024px) {
          .pstk-circle { left: 2%; width: clamp(55px, 5.5vw, 80px); }
        }
        @media (max-width: 768px) {
          .pstk-circle { left: 1%; width: clamp(38px, 5vw, 55px); }
        }
        @media (max-width: 480px) {
          .pstk-circle { left: 1%; width: clamp(28px, 6vw, 40px); }
        }

        /* ── FLAVOR LINE ── */
        .flavor-feature { background: #FFF8E7; padding: 100px 40px 120px; overflow: hidden; }
        .flavor-text-ko, .flavor-text-en { max-width: 1500px; margin: 0 auto; word-break: keep-all; text-align: justify; }
        .flavor-text-ko { color: #c8111a; font-size: clamp(20px, 1.7vw, 30px); font-weight: 700; line-height: 1.55; letter-spacing: -0.005em; }
        .flavor-text-en {
          color: #c8111a;
          font-family: 'Playfair Display', serif; font-weight: 700; text-transform: uppercase;
          font-size: clamp(20px, 1.7vw, 30px); line-height: 1.35; letter-spacing: 0.01em;
        }
        .flavor-stage { position: relative; text-align: center; margin: 70px auto; max-width: 1500px; }
        .flavor-label-top {
          color: #000; font-size: clamp(13px, 1vw, 17px); letter-spacing: 0.55em;
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

        .list-bar { position: fixed; bottom: 24px; left: 24px; z-index: 600; }
        .list-bar a { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: underline; color: #000; }
        .top-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 600; width: 48px; height: 48px;
          background: #000; color: #fff; font-size: 18px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%);
        }

        @media (max-width: 768px) {
          .hero { padding: 100px 20px 40px; }
          .hero-title { line-height: 1.15; }
          .hero-positioning { line-height: 1.5; }
          .hero-desc { line-height: 1.55; }
          .hero-quote { line-height: 1.45; }
          .project-info { padding: 40px 20px; grid-template-columns: 1fr 1fr; }
          .project-info .info-partner { grid-column: 1 / -1; }
          .two-col { grid-template-columns: 1fr; }
          .two-col img { height: 280px; }
          .flavor-feature { padding: 60px 20px 80px; }
          .flavor-image { max-width: 88%; }
          .flavor-title { margin-bottom: -50px; }
          .flavor-label-top, .flavor-tagline { letter-spacing: 0.3em; }
          .pstk-spoon, .pstk-circle { width: 90px; }
        }

        /* ── SI GUIDE SECTIONS — ported from source index.html (class prefix: si-) ── */
        .si-sections {
          --si-benson-red: #CC0000;
          --si-dark: #1a1a1a;
          --si-light: #f5f2ed;
          --si-gray: #888;
          --si-max-width: 1400px;
          --si-page-bg: #fff;
          --si-page-fg: #1a1a1a;
          --si-section-bg: #f5f2ed;
          --si-text-mid: #555;
          --si-text-light: #666;
          --si-keyword-border: #1a1a1a;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          color: var(--si-page-fg);
          background: var(--si-page-bg);
        }
        .si-sections .si-section { padding: 120px 60px; }
        .si-sections .si-section-inner { max-width: var(--si-max-width); margin: 0 auto; }
        .si-sections .si-section-label { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--si-benson-red); margin-bottom: 16px; font-weight: 600; }
        .si-sections .si-section-title { font-family: 'Barlow Condensed', 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 56px); line-height: 1.1; margin-bottom: 24px; letter-spacing: 1px; font-weight: 700; }
        .si-sections .si-section-desc { font-size: 15px; line-height: 1.9; color: var(--si-text-mid); max-width: 680px; font-weight: 300; }

        /* KR/EN toggle — si-sections + project-info + hero (default: KR) */
        .si-sections [data-en],
        .project-info [data-en],
        .hero [data-en] { display: none; }
        :global(html[lang="en"]) .si-sections [data-ko],
        :global(html[lang="en"]) .project-info [data-ko],
        :global(html[lang="en"]) .hero [data-ko] { display: none; }
        :global(html[lang="en"]) .si-sections [data-en],
        :global(html[lang="en"]) .project-info [data-en],
        :global(html[lang="en"]) .hero [data-en] { display: revert; }

        /* 01 CONCEPT */
        .si-sections .si-concept-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-top: 60px; }
        .si-sections .si-concept-image img { width: 100%; border-radius: 4px; }
        .si-sections .si-concept-keywords { display: flex; gap: 20px; margin-top: 40px; }
        .si-sections .si-keyword { padding: 12px 28px; border: 1px solid var(--si-keyword-border); border-radius: 50px; font-size: 13px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }

        /* EN-mode image crops (translation removes Korean text strip at bottom of renders) */
        :global(html[lang="en"]) .si-sections .si-img-crop-en { overflow: hidden; }
        :global(html[lang="en"]) .si-sections .si-img-crop-en img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        :global(html[lang="en"]) .si-sections .si-img-crop-en.si-crop-04 { aspect-ratio: 16 / 7; }
        :global(html[lang="en"]) .si-sections .si-img-crop-en.si-crop-18 { aspect-ratio: 16 / 9; }
        :global(html[lang="en"]) .si-sections .si-img-crop-en.si-crop-17 { aspect-ratio: 16 / 8; }

        /* 02 FACADE */
        .si-sections .si-facade-image { margin-top: 60px; border-radius: 4px; overflow: hidden; }
        .si-sections .si-facade-image img { width: 100%; display: block; transition: transform 0.6s ease; }
        .si-sections .si-facade-image:hover img { transform: scale(1.03); }

        /* 03 PERSPECTIVES */
        .si-sections .si-perspectives .si-section-label { color: var(--si-benson-red); }
        .si-sections .si-gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 60px; }
        .si-sections .si-gallery-grid .si-gallery-item { overflow: hidden; border-radius: 4px; aspect-ratio: 16/10; }
        .si-sections .si-gallery-grid .si-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .si-sections .si-gallery-item:hover img { transform: scale(1.05); }
        .si-sections .si-gallery-grid .si-gallery-item.si-wide { grid-column: span 2; aspect-ratio: 21/9; }

        /* 04 / 05 CONCEPT DETAIL */
        .si-sections .si-concept-detail-grid { margin-top: 60px; }
        .si-sections .si-concept-detail-pair { display: grid; grid-template-columns: 755fr 1778fr; gap: 16px; align-items: stretch; }
        .si-sections .si-concept-detail-pair .si-pair-left { width: 100%; height: 100%; object-fit: cover; }
        .si-sections .si-concept-detail-img-wrap { position: relative; line-height: 0; }
        .si-sections .si-concept-detail-img { width: 100%; border-radius: 4px; }
        .si-sections .si-img-marker {
          position: absolute;
          width: clamp(38px, 4.4vw, 52px);
          height: clamp(38px, 4.4vw, 52px);
          background: var(--si-benson-red);
          color: #fff;
          clip-path: polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: clamp(16px, 1.9vw, 22px);
          font-weight: 700;
          line-height: 1;
          color: #fff;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 2;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.45));
        }
        @media (max-width: 1024px) {
          .si-sections .si-concept-detail-pair { grid-template-columns: 1fr; gap: 12px; }
        }
        @media (max-width: 768px) {
          .si-sections .si-img-marker {
            width: 36px; height: 36px; font-size: 17px;
          }
        }
        .si-sections .si-concept-detail-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; margin-top: 32px; padding: 0 20px; }
        .si-sections .si-concept-detail-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; line-height: 1.6; font-weight: 300; color: var(--si-text-mid); }
        .si-sections .si-concept-num { flex-shrink: 0; width: 28px; height: 28px; background: var(--si-benson-red); color: #fff; clip-path: polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; }

        /* 06 MATERIALS */
        .si-sections .si-materials-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 60px; }
        .si-sections .si-material-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .si-sections .si-material-item { display: flex; align-items: center; gap: 16px; }
        .si-sections .si-material-swatch { width: 48px; height: 48px; border-radius: 4px; flex-shrink: 0; }
        .si-sections .si-material-item .si-mat-name { font-size: 13px; font-weight: 500; }
        .si-sections .si-material-item .si-mat-desc { font-size: 11px; color: var(--si-gray); margin-top: 2px; }
        .si-sections .si-materials-grid img { width: 100%; border-radius: 4px; }

        /* 07 COLOR */
        .si-sections .si-color-section { position: relative; overflow: hidden; }
        .si-sections .si-color-split { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 60px; }
        .si-sections .si-color-image { overflow: hidden; }
        .si-sections .si-color-image img { width: 100%; height: 100%; object-fit: cover; }
        .si-sections .si-color-info { background: var(--si-benson-red); color: #fff; padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; }
        .si-sections .si-color-info h3 { font-family: 'Barlow Condensed', 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 3px; margin-bottom: 20px; font-weight: 700; }
        .si-sections .si-color-info p { font-size: 14px; line-height: 1.9; opacity: 0.8; font-weight: 300; }
        .si-sections .si-pantone-tag { display: inline-block; margin-top: 30px; padding: 10px 24px; border: 1px solid rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 3px; font-weight: 500; }

        /* 08 LAYOUT */
        .si-sections .si-layout-section { text-align: center; }
        .si-sections .si-layout-section .si-section-desc { margin: 0 auto 60px; text-align: center; }
        .si-sections .si-layout-image { max-width: 1000px; margin: 0 auto; }
        .si-sections .si-layout-image img { width: 100%; border-radius: 4px; }
        .si-sections .si-zone-list { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-top: 40px; }
        .si-sections .si-zone-tag { padding: 10px 24px; background: var(--si-section-bg); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; border-radius: 2px; }

        /* 09 TECHNICAL */
        .si-sections .si-technical { background: var(--si-dark); color: #fff; }
        .si-sections .si-technical .si-section-label { color: var(--si-benson-red); }
        .si-sections .si-tech-images { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 60px; }
        .si-sections .si-tech-images img { width: 100%; border-radius: 4px; opacity: 0.9; transition: opacity 0.3s; }
        .si-sections .si-tech-images img:hover { opacity: 1; }

        @media (max-width: 1024px) {
          .si-sections .si-section { padding: 80px 40px; }
          .si-sections .si-concept-grid,
          .si-sections .si-materials-grid,
          .si-sections .si-color-split { grid-template-columns: 1fr; }
          .si-sections .si-concept-detail-list { grid-template-columns: 1fr; }
          .si-sections .si-gallery-grid { grid-template-columns: 1fr; }
          .si-sections .si-gallery-grid .si-gallery-item.si-wide { grid-column: span 1; }
          .si-sections .si-tech-images { grid-template-columns: 1fr 1fr; }
          .si-sections .si-concept-detail-pair { margin-left: -40px; margin-right: -40px; }
          .si-sections .si-concept-detail-img { border-radius: 0; }
        }
        @media (max-width: 600px) {
          .si-sections .si-section { padding: 60px 24px; }
          .si-sections .si-concept-keywords { flex-wrap: wrap; }
          .si-sections .si-material-list { grid-template-columns: 1fr; }
          .si-sections .si-concept-detail-list { grid-template-columns: 1fr; }
          .si-sections .si-tech-images { grid-template-columns: 1fr; }
          .si-sections .si-color-info { padding: 40px 24px; }
          .si-sections .si-concept-detail-pair { margin-left: -24px; margin-right: -24px; }
        }
      `}</style>
    </>
  );
}
