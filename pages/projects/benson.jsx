import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ProjectFooter } from '../../components/project';

/* asset helpers */
const I = (n) => `/images/benson/${n}`;
const S = (n) => `/images/benson/stickers/${n}`;

/* ── Project meta (참고 1.png 헤더) ── */
const META = [
  { label: 'Work Scope', lines: ['SPACE, BRANDING'] },
  { label: 'Site Address', lines: ['SEOUL, REPUBLIC OF KOREA'] },
  { label: 'Partner', lines: ['CLIENT | Hanwha Galleria', 'BRANDING | BENSON'] },
  { label: 'Area', lines: ['— PY (— m²)'] },
];

/* 무드 키워드 (참고 1.png) */
const KEYWORDS = [
  ['CONCRETE', 'STREET', 'FLAVOR', 'CURVE'],
  ['BOLD', 'RAW', 'RED', 'RHYTHM'],
  ['SCOOP', 'SUBCULTURE'],
  ['SKATE', 'TASTE'],
];

/* ── Scroll-reveal wrapper ── */
function FadeIn({ children, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fade-in ${className}`} style={style}>{children}</div>;
}

/* ── Top navigation — 메인 페이지(pages/index.jsx) 네비바 재현 ── */
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
    const saved = localStorage.getItem('site-lang') || 'ko';
    setLang(saved);
    document.documentElement.lang = saved;
  }, []);

  const switchLang = (next) => {
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem('site-lang', next);
  };

  const isKo = lang === 'ko';

  return (
    <nav className={`bnav${scrolled ? ' scrolled' : ''}`}>
      <div className="bnav-left">
        <Link href="/" className="bnav-logo">
          <span className="bnav-logo-text">
            <span className="logo-default">夏陰</span>
            <span className="logo-hover">{isKo ? '여름 그늘' : 'summer shade'}</span>
          </span>
        </Link>
      </div>
      <div className="bnav-right">
        <ul className="bnav-menu">
          <li><Link href="/#project">WORK</Link></li>
          <li><Link href="/work-corp">WORK(CORP.)</Link></li>
          <li><Link href="/info">INFO</Link></li>
          <li>
            <a href="https://www.instagram.com/id_haumm/" target="_blank" rel="noopener noreferrer">INSTA</a>
          </li>
          <li className="bnav-lang" aria-label="Language toggle">
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>EN</button>
            <span className="bnav-lang-sep">/</span>
            <button type="button" className={lang === 'ko' ? 'active' : ''} onClick={() => switchLang('ko')}>KR</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function Benson() {
  return (
    <>
      <Head>
        <title>BENSON _ Hanwha Galleria — 공간하음</title>
        <meta name="description" content="BENSON — 미국 스트릿 컬처와 스케이트 무드를 담은 한화 갤러리아 벤슨 아이스크림 플래그십." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SiteNav />

      <main className="bpage">

        {/* ══ 01 · HEADER ══════════════════════════════════════ */}
        <section className="bhead">
          <FadeIn>
            <h1 className="bhead-title">BENSON<span className="bhead-title-thin">_Hanwha Galleria</span></h1>
          </FadeIn>

          <FadeIn>
            <p className="bhead-intro" data-ko>
              볼드한 토핑과 풍부한 유지방의 깊은 맛이 감각을 깨우는 곳. 벤슨(BENSON)은 단순히 아이스크림을 즐기는 공간을 넘어, 미국의 서브컬처와 스트릿 무드가 교차하며 만들어내는 역동적인 순간을 담았다. 공간을 가로지르는 대담한 곡선은 스케이트 파크의 에너지에서 시작되었다. 거칠면서도 정제된 콘크리트 질감 위로, 벤슨의 시그니처 레드가 맥박처럼 흐르며 공간에 강렬한 생동감을 불어넣는다. 파사드에서 내부로 부드럽게 이어지는 곡선형 퍼니처와 천장 조형물은 경계를 허물고 당신을 이 자유로운 아웃도어 무드 속으로 자연스럽게 이끈다. 이곳에서 아이스크림 한 스쿱은 단순한 디저트가 아니다. 페그보드 위에 펼쳐진 다채로운 플레이버의 향연 그리고 그 속에 스며든 스트릿 무드의 자유로움이 당신의 오감을 자극한다. 부드러운 텍스처와 청키한 토핑이 입안에서 리듬을 만들 때, 당신은 비로소 이 역동적인 세계의 일부가 된다.
            </p>
            <p className="bhead-intro" data-en>
              A place where bold toppings and the deep richness of high-butterfat ice cream awaken the senses. BENSON is more than a place to enjoy ice cream — it captures the dynamic moments born where American subculture meets street mood. The bold curves cutting across the space begin in the energy of the skate park. Over raw yet refined concrete textures, Benson&apos;s signature red flows like a pulse, breathing intense vitality into the space. Curved furniture and a ceiling sculpture flowing gently from the facade into the interior dissolve boundaries and draw you naturally into this free, outdoor mood. Here, a single scoop is more than dessert. A feast of vivid flavors spread across the pegboard — and the freedom of street mood steeped within it — stimulate every sense. When soft textures and chunky toppings build a rhythm in your mouth, you finally become part of this dynamic world.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="bhead-quote" data-ko>&ldquo;당신이 마주하는 이 모든 역동성이 곧 벤슨의 맛이다.&rdquo;</p>
            <p className="bhead-quote" data-en>&ldquo;All this dynamism you encounter is the taste of Benson.&rdquo;</p>
          </FadeIn>

          <FadeIn className="bhead-meta">
            {META.map((m) => (
              <div className="bmeta-col" key={m.label}>
                <span className="bmeta-label">{m.label}</span>
                {m.lines.map((l) => <span className="bmeta-val" key={l}>{l}</span>)}
              </div>
            ))}
          </FadeIn>
        </section>

        {/* ══ 02 · BRAND HERO (gradient + wordmark + stickers) ══ */}
        <section className="bhero">
          <img className="stk stk-oval" src={S('oval.png')} alt="BENSON ICECREAM sticker" />
          <div className="bhero-inner">
            <p className="bhero-eyebrow"><span className="b-star">✺</span> STREET MOOD · SCOOP UP YOUR TASTE</p>
            <div className="bhero-wordmark" role="img" aria-label="BENSON" />
            <p className="bhero-sub">WHERE STREET MEETS SWEET</p>
            <p className="bhero-spatial">SPATIAL CONCEPT</p>
          </div>
          <img className="stk stk-board" src={S('board.png')} alt="BENSON skateboard sticker" />
        </section>

        {/* ══ 03 · STREET EDITORIAL (red statement + skate bands) ══ */}
        <section className="bstreet">
          <FadeIn className="bstreet-head">
            <p className="b-section-tag"><span className="b-star">✺</span> DYNAMIC NARRATIVE</p>
            <p className="bstreet-statement">
              BOLD TOPPINGS, COLD CONCRETE, VIVID RED.<br />
              ALL THIS DYNAMISM IS THE TASTE OF BENSON.<br />
              FROM THE STREET TO YOUR SENSES.
            </p>
            <p className="bstreet-ksub" data-ko>볼드한 토핑과 차가운 콘크리트가 만들어내는 공간 — 붉은 아이스크림 한 입의 역동성이 만드는 미감.</p>
            <p className="bstreet-ksub" data-en>A space shaped by bold toppings and cold concrete — the aesthetic born of one vivid red bite. 한 스쿱의 자유로움.</p>

            <div className="bkeywords">
              {KEYWORDS.map((row, i) => (
                <div className="bkw-row" key={i}>
                  {row.map((k) => <span className="bkw" key={k}>{k}</span>)}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* skate park photo band — stickers overlaid */}
          <div className="bband bband-skate">
            <img className="bband-img" src={I('skate-hero.png')} alt="Skate park — street culture" />
            <img className="stk stk-skater" src={S('skater.png')} alt="BENSON skater sticker" />
            <img className="stk stk-boardice" src={S('board-icecream.png')} alt="BENSON ice-cream skateboard sticker" />
          </div>

          {/* concrete bowl band — spoon sticker */}
          <div className="bband bband-bowl">
            <img className="bband-img" src={I('skate-bowl.png')} alt="Concrete skate bowl" />
            <img className="stk stk-spoon" src={S('spoon.png')} alt="BENSON wooden spoon sticker" />
          </div>

          {/* graffiti / skaters band — rect + circle stickers */}
          <div className="bband bband-graf">
            <img className="bband-img" src={I('skate-graffiti.png')} alt="Skaters and BENSON graffiti" />
            <img className="stk stk-rect" src={S('rect.png')} alt="BENSON ICECREAM sticker" />
            <img className="stk stk-circle" src={S('circle.png')} alt="BENSON badge sticker" />
          </div>
        </section>

        {/* ══ 04 · SPACE — STOREFRONT & INTERIOR ══════════════ */}
        <section className="bspace">
          <FadeIn className="bspace-head">
            <p className="bspace-num">1 <span className="bspace-num-label">SPACE</span></p>
            <h2 className="bspace-title">STOREFRONT<br />&amp; INTERIOR</h2>
          </FadeIn>

          <FadeIn className="bspace-hero">
            <img src={I('storefront.jpg')} alt="BENSON storefront — Hanwha Galleria" />
          </FadeIn>

          <div className="bspace-grid">
            <FadeIn className="bcell bcell-wide">
              <img src={I('interior-counter.jpg')} alt="Interior — order counter & menu board" />
            </FadeIn>
            <FadeIn className="bcell">
              <img src={I('interior-bench.jpg')} alt="Interior — curved bench seating" />
            </FadeIn>
            <FadeIn className="bcell">
              <img src={I('interior-flavor.jpg')} alt="Interior — flavor posters" />
            </FadeIn>
          </div>
        </section>

        {/* ══ 05 · SIGNATURE ELEMENT — FLAVOR LINE ════════════ */}
        <section className="bflavor">
          <FadeIn className="bflavor-head">
            <p className="b-section-tag b-tag-light"><span className="b-star">✺</span> SIGNATURE ELEMENT · CONCEPT STORY · CHAPTER 01</p>
            <h2 className="bflavor-title">FLAVOR LINE</h2>
            <p className="bflavor-kicker">A SUBWAY MAP OF TASTE</p>
          </FadeIn>

          <FadeIn className="bflavor-photo">
            <img src={I('flavorline.jpg')} alt="BENSON's Flavor Line — pegboard subway map" />
          </FadeIn>

          <div className="bflavor-text">
            <FadeIn>
              <p className="b-body" data-ko>
                벤슨의 플레이버 라인은 공간의 서사적 중심이 되는 작품으로, 스틸 타공 보드를 지하철 노선도의 형식으로 재해석하여 각 정거장에는 플레이버를, 각 라인에는 맛의 카테고리를 부여한다. 미국 서브컬처의 자유로운 언어와 스케이트 파크의 열린 기하학에서 출발한 이 거대한 페그보드는, 만지고 읽고 발견하게 만드는 인터랙티브한 그래픽 월이다. 역동적인 노선들은 단순한 메뉴 선택을 하나의 탐험으로 바꾸어 놓으며, 설명 없이도 브랜드의 캐릭터를 말하는 벽으로 자리한다.
              </p>
              <p className="b-body" data-en>
                Benson&apos;s Flavor Line is the narrative centerpiece of the space — a pegboard wall reinterpreted as a subway map, where each station is a flavor and each line is a family of taste. Inspired by the freewheeling language of American sub-culture and the open geometry of skate parks, the perforated metal field invites touch, reading, and discovery. Its dynamic pathways turn ordering ice cream into an act of exploration — a wall that explains the brand without ever asking to be read.
              </p>
            </FadeIn>
          </div>

          <FadeIn className="bflagship">
            <span className="bflagship-tag">FLAGSHIP 01</span>
            <span className="bflagship-name">BENSON</span>
            <span className="bflagship-by">Hanwha Galleria × 공간하음</span>
          </FadeIn>
        </section>

        {/* ══ 06 · BRAND FILM ═════════════════════════════════ */}
        <section className="bfilm">
          <div className="bfilm-meta">
            <span>OUTDOOR</span>
            <span>12:00:11</span>
          </div>
          <FadeIn className="bfilm-frame">
            <video src={I('video.mp4')} autoPlay muted loop playsInline controls />
          </FadeIn>
        </section>

        {/* ══ 07 · CLOSING ════════════════════════════════════ */}
        <section className="bclose">
          <FadeIn>
            <p className="bclose-en">
              FROM CONCRETE CURVES TO SOFT-SERVE TEXTURES,<br />
              BENSON IS WHERE STREET BECOMES SWEETNESS.
            </p>
            <p className="bclose-ko" data-ko>콘크리트의 곡선이 부드러운 아이스크림의 텍스처와 만나는 곳, 거리의 무드가 한 스쿱의 달콤함이 되는 공간.</p>
            <p className="bclose-ko" data-en>Where concrete curves meet soft-serve textures — a place where the mood of the street becomes the sweetness of a single scoop.</p>
          </FadeIn>
          <div className="bclose-index">
            <span>CONCEPT STORY</span>
            <span>FURNITURE</span>
            <span>ARCHIVE</span>
            <span>BLOG</span>
            <span>PROCESS</span>
            <span>LIST</span>
          </div>
        </section>

      </main>

      <ProjectFooter
        prevProject={{ name: 'TOFUG', href: '/projects/tofug' }}
        nextProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
      />

      <style jsx global>{`
        /* page-scoped i18n (html[lang] driven) */
        .bpage [data-en] { display: none; }
        html[lang='en'] .bpage [data-ko] { display: none; }
        html[lang='en'] .bpage [data-en] { display: block; }
        html[lang='ko'] .bpage [data-ko] { display: block; }
        html[lang='ko'] .bpage [data-en] { display: none; }
      `}</style>

      <style jsx>{`
        :global(:root) { --b-red: #e5241b; --b-ink: #141414; }

        .bpage {
          background: #fff;
          color: var(--b-ink);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }
        :global(.fade-in) {
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) { opacity: 1; transform: translateY(0); }
        .b-star { color: var(--b-red); margin-right: 8px; }

        /* ── NAV (메인 페이지 재현) ── */
        .bnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 22px 40px; color: var(--b-ink);
          background: transparent; transition: background 0.4s, padding 0.4s, box-shadow 0.3s;
        }
        .bnav.scrolled {
          padding: 14px 40px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06);
        }
        .bnav-logo { display: inline-flex; align-items: center; text-decoration: none; color: inherit; }
        .bnav-logo-text { position: relative; display: inline-flex; align-items: center; font-size: 28px; line-height: 1; font-weight: 400; letter-spacing: 0.05em; }
        .logo-default, .logo-hover { display: inline-block; font-size: inherit; line-height: 1; transition: opacity 0.45s ease; }
        .logo-hover {
          position: absolute; top: 50%; left: 0; transform: translateY(-50%);
          font-family: 'Cormorant Garamond', 'Noto Serif KR', serif; font-weight: 500; font-style: italic;
          letter-spacing: 0.02em; white-space: nowrap; opacity: 0; pointer-events: none;
        }
        .bnav-logo:hover .logo-default { opacity: 0; }
        .bnav-logo:hover .logo-hover { opacity: 1; }
        .bnav-menu { display: flex; align-items: center; gap: 34px; list-style: none; margin: 0; padding: 0; }
        .bnav-menu a {
          font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; color: var(--b-ink); transition: opacity 0.2s;
        }
        .bnav-menu a:hover { opacity: 0.55; }
        .bnav-lang { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; }
        .bnav-lang button { font: inherit; letter-spacing: inherit; color: rgba(20,20,20,0.4); padding: 0; background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .bnav-lang button.active { color: var(--b-ink); font-weight: 700; }
        .bnav-lang-sep { opacity: 0.4; }

        /* ── HEADER ── */
        .bhead { max-width: 1180px; margin: 0 auto; padding: 150px 40px 90px; }
        .bhead-title { font-family: 'Archivo', sans-serif; font-weight: 800; font-size: clamp(34px, 5vw, 70px); letter-spacing: -0.02em; line-height: 1; margin: 0 0 40px; }
        .bhead-title-thin { font-weight: 500; color: rgba(20,20,20,0.55); }
        .bhead-intro { font-size: clamp(14px, 1.1vw, 16px); line-height: 2; font-weight: 300; color: #333; max-width: 900px; word-break: keep-all; margin: 0 0 28px; }
        .bhead-quote { font-family: 'Archivo', sans-serif; font-size: clamp(16px, 1.6vw, 22px); font-weight: 600; font-style: italic; color: var(--b-red); margin: 0 0 56px; }
        .bhead-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; padding-top: 34px; border-top: 1px solid rgba(20,20,20,0.12); }
        .bmeta-col { display: flex; flex-direction: column; gap: 7px; }
        .bmeta-label { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--b-red); margin-bottom: 4px; }
        .bmeta-val { font-size: 12px; letter-spacing: 0.06em; color: #444; }

        /* ── BRAND HERO ── */
        .bhero {
          position: relative; overflow: hidden;
          padding: 90px 40px 120px;
          background: linear-gradient(180deg, #ffffff 0%, #fde7e1 62%, #f7b9ab 100%);
        }
        .bhero-inner { max-width: 1180px; margin: 0 auto; text-align: center; position: relative; z-index: 2; }
        .bhero-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--b-red); margin: 0 0 36px; }
        .bhero-wordmark {
          width: min(78vw, 880px); aspect-ratio: 959 / 270; margin: 0 auto;
          background: var(--b-red);
          -webkit-mask: url(/images/benson/wordmark.png) center / contain no-repeat;
          mask: url(/images/benson/wordmark.png) center / contain no-repeat;
        }
        .bhero-sub { font-family: 'Archivo', sans-serif; font-weight: 800; font-size: clamp(18px, 2.6vw, 36px); letter-spacing: 0.04em; color: var(--b-red); margin: 18px 0 0; }
        .bhero-spatial { font-size: 11px; font-weight: 600; letter-spacing: 0.4em; color: rgba(20,20,20,0.45); margin: 24px 0 0; }

        /* stickers */
        .stk { position: absolute; z-index: 5; display: block; height: auto; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.22)); pointer-events: none; }
        .stk-oval { top: 92px; right: 5%; width: clamp(120px, 15vw, 220px); transform: rotate(-9deg); }
        .stk-board { bottom: 56px; right: 9%; width: clamp(80px, 9vw, 132px); transform: rotate(11deg); }

        /* ── STREET EDITORIAL ── */
        .bstreet { background: #fff; }
        .bstreet-head { max-width: 980px; margin: 0 auto; padding: 110px 40px 70px; text-align: center; }
        .b-section-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--b-red); margin: 0 0 28px; }
        .bstreet-statement { font-family: 'Archivo', sans-serif; font-weight: 800; font-size: clamp(18px, 2.4vw, 34px); line-height: 1.32; letter-spacing: 0.01em; color: var(--b-red); margin: 0 0 26px; }
        .bstreet-ksub { font-size: clamp(13px, 1.1vw, 15px); font-weight: 300; line-height: 1.9; color: #555; word-break: keep-all; margin: 0 auto 8px; max-width: 720px; }
        .bkeywords { display: flex; flex-direction: column; gap: 12px; align-items: center; margin-top: 44px; }
        .bkw-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .bkw { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #222; border: 1px solid rgba(20,20,20,0.2); border-radius: 999px; padding: 7px 16px; }

        /* photo bands */
        .bband { position: relative; width: 100%; overflow: hidden; line-height: 0; }
        .bband-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bband-skate { aspect-ratio: 1954 / 520; }
        .bband-bowl { aspect-ratio: 1954 / 470; }
        .bband-graf { aspect-ratio: 1954 / 545; }
        .stk-skater { bottom: 6%; left: 4%; width: clamp(110px, 14vw, 210px); transform: rotate(-4deg); }
        .stk-boardice { top: 8%; right: 5%; width: clamp(72px, 8.5vw, 128px); transform: rotate(8deg); }
        .stk-spoon { top: 38%; right: 7%; width: clamp(150px, 19vw, 290px); transform: rotate(-16deg); }
        .stk-rect { bottom: 9%; left: 4%; width: clamp(140px, 17vw, 250px); transform: rotate(-7deg); }
        .stk-circle { bottom: 8%; right: 5%; width: clamp(90px, 10vw, 150px); transform: rotate(6deg); }

        /* ── SPACE / STOREFRONT ── */
        .bspace { max-width: 1320px; margin: 0 auto; padding: 0 40px 40px; }
        .bspace-head { margin-bottom: 0; }
        .bspace-num { display: inline-flex; align-items: center; gap: 12px; font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 18px; color: #fff; background: var(--b-red); padding: 3px 10px; border-radius: 3px; margin: 0 0 22px; }
        .bspace-num-label { letter-spacing: 0.18em; font-size: 13px; }
        .bspace-title { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: clamp(48px, 9vw, 130px); line-height: 0.92; letter-spacing: -0.02em; margin: 0; }
        .bspace-hero { overflow: hidden; border-radius: 4px; margin-bottom: 14px; }
        .bspace-hero img { width: 100%; display: block; }
        .bspace-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; }
        .bcell { overflow: hidden; border-radius: 4px; background: #f0ede8; }
        .bcell img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4 / 3; display: block; transition: transform 0.7s ease; }
        .bcell:hover img { transform: scale(1.04); }
        .bcell-wide img { aspect-ratio: 16 / 11; }

        /* ── FLAVOR LINE ── */
        .bflavor { background: var(--b-ink); color: #fff; padding: 120px 40px; margin-top: 80px; }
        .bflavor-head { max-width: 1180px; margin: 0 auto 50px; }
        .b-tag-light { color: #ff6a5e; }
        .bflavor-title { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: clamp(48px, 9vw, 140px); line-height: 0.9; letter-spacing: -0.02em; margin: 0; }
        .bflavor-kicker { font-family: 'Archivo', sans-serif; font-weight: 600; font-size: clamp(16px, 2vw, 28px); letter-spacing: 0.06em; color: #ff6a5e; margin: 14px 0 0; }
        .bflavor-photo { max-width: 1180px; margin: 0 auto 48px; overflow: hidden; border-radius: 4px; border: 5px solid #fff; }
        .bflavor-photo img { width: 100%; display: block; }
        .bflavor-text { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .b-body { font-size: clamp(14px, 1.05vw, 15px); line-height: 2; font-weight: 300; color: rgba(255,255,255,0.82); word-break: keep-all; margin: 0; }
        .bflagship { max-width: 1180px; margin: 56px auto 0; display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.18); }
        .bflagship-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.22em; color: #ff6a5e; }
        .bflagship-name { font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 24px; letter-spacing: 0.04em; }
        .bflagship-by { font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 0.04em; }

        /* ── FILM ── */
        .bfilm { max-width: 1320px; margin: 0 auto; padding: 90px 40px; }
        .bfilm-meta { display: flex; justify-content: space-between; font-family: 'Archivo', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.24em; color: var(--b-red); margin-bottom: 18px; }
        .bfilm-frame { overflow: hidden; border-radius: 4px; border: 5px solid var(--b-red); background: #000; }
        .bfilm-frame video { width: 100%; height: auto; display: block; }

        /* ── CLOSING ── */
        .bclose { max-width: 1180px; margin: 0 auto; padding: 60px 40px 120px; text-align: center; }
        .bclose-en { font-family: 'Archivo', sans-serif; font-weight: 800; font-size: clamp(20px, 3vw, 46px); line-height: 1.25; letter-spacing: 0.01em; color: var(--b-ink); margin: 0 0 24px; }
        .bclose-ko { font-size: clamp(13px, 1.1vw, 16px); font-weight: 300; line-height: 1.9; color: #555; word-break: keep-all; margin: 0 auto; max-width: 760px; }
        .bclose-index { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; margin-top: 64px; }
        .bclose-index span { font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(20,20,20,0.35); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .bnav, .bnav.scrolled { padding-left: 22px; padding-right: 22px; }
          .bnav-menu { gap: 16px; }
          .bnav-menu a, .bnav-lang { font-size: 10px; letter-spacing: 0.08em; }
          .bnav-logo-text { font-size: 22px; }
          .bhead { padding: 120px 22px 70px; }
          .bhead-meta { grid-template-columns: 1fr 1fr; gap: 22px; }
          .bspace, .bfilm { padding-left: 22px; padding-right: 22px; }
          .bspace-grid { grid-template-columns: 1fr 1fr; }
          .bcell-wide { grid-column: 1 / -1; }
          .bflavor { padding: 90px 22px; }
          .bflavor-text { grid-template-columns: 1fr; gap: 8px; }
          .bstreet-head { padding: 80px 22px 50px; }
          .bband-skate, .bband-bowl, .bband-graf { aspect-ratio: 16 / 11; }
          .bclose { padding: 50px 22px 90px; }
        }
        @media (max-width: 560px) {
          .bnav-menu { gap: 11px; }
          .bhead-meta { grid-template-columns: 1fr; }
          .bspace-grid { grid-template-columns: 1fr; }
          .stk-spoon { width: 120px; }
        }
      `}</style>
    </>
  );
}
