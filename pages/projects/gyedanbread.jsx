import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'Space' },
  { id: 'credit', label: 'Credit' },
];

/* 스크롤 페이드인 */
function Reveal({ children, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`st-reveal ${className}`} style={style}>{children}</div>;
}

/* 이미지 준비 전 플레이스홀더 */
function Placeholder({ label, ratio = '16 / 10' }) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        background: 'var(--section-bg)',
        border: '1px solid var(--fg-10)',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray, #888)' }}>{label}</span>
    </div>
  );
}

export default function GyedanBread() {
  return (
    <>
      <Head>
        <title>계단빵 — Brand &amp; Spatial Design</title>
        <meta name="description" content="계단빵 — 브랜드 & 공간 디자인 (준비 중). 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">GYEDAN BREAD</h1>
          <p className="st-hero-positioning">
            <span data-ko>계단빵 · Brand &amp; Spatial Design — Coming Soon.</span>
            <span data-en>Gyedan Bread · Brand &amp; Spatial Design — Coming Soon.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>계단빵은 곧 공개됩니다. 브랜드 아이덴티티와 공간 디자인 전 과정을 담은 페이지로, 자료가 준비되는 대로 업데이트될 예정입니다.</span>
            <span data-en>Gyedan Bread is coming soon — a page documenting the full brand identity and spatial design process, to be updated as materials are ready.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“계단 위의 빵집.”</span>
            <span data-en>“The bakery on the stairs.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>브랜드 디자인 · 공간 디자인</span>
              <span data-en>Brand Design · Spatial Design</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>F&amp;B · 베이커리</span>
              <span data-en>F&amp;B · Bakery</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | TBD · 2025</span>
              <span className="st-info-line" data-ko>상태 | 준비 중</span>
              <span className="st-info-line" data-en>STATUS | Coming Soon</span>
            </p>
          </div>
        </section>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>계단 위의 빵집</h2>
              <h2 className="st-section-title" data-en>The Bakery On The Stairs</h2>
              <p className="st-section-desc" data-ko>계단빵의 브랜드 스토리가 여기에 들어갑니다. 공간의 구조적 특성과 브랜드 정체성이 어떻게 연결되는지, 일상의 계단이 어떻게 하나의 빵집 경험으로 번역되었는지를 설명하는 섹션입니다.</p>
              <p className="st-section-desc" data-en>This is where the brand story of Gyedan Bread will live — how the structural character of the space connects to brand identity, and how the everyday staircase became a bakery experience.</p>
              <div className="st-keywords">
                <span className="st-keyword">Bakery</span>
                <span className="st-keyword">Everyday</span>
                <span className="st-keyword">Craft</span>
              </div>
            </Reveal>
            <div className="st-render-hero" style={{ marginTop: 40 }}>
              <Placeholder label="Hero Visual" ratio="16 / 8" />
            </div>
          </div>
        </section>

        {/* ── 02 CONCEPT ── */}
        <section className="st-section alt" id="concept">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Concept</p>
              <h2 className="st-section-title" data-ko>디자인 컨셉</h2>
              <h2 className="st-section-title" data-en>Design Concept</h2>
              <p className="st-section-desc" data-ko>계단이라는 일상적 구조를 빵집의 공간 언어로 재해석한 컨셉이 담길 예정입니다. 공간의 층위·동선·마감재·조도까지 하나의 흐름으로 연결되는 브랜드 경험을 설계합니다.</p>
              <p className="st-section-desc" data-en>The concept — reinterpreting the everyday staircase into the spatial language of a bakery — will be documented here: layers, circulation, materials, and lighting woven into one connected experience.</p>
            </Reveal>
            <div className="st-insp-grid">
              <Reveal className="st-insp-card"><Placeholder label="Concept A" ratio="4 / 5" /></Reveal>
              <Reveal className="st-insp-card"><Placeholder label="Concept B" ratio="4 / 5" /></Reveal>
              <Reveal className="st-insp-card"><Placeholder label="Concept C" ratio="4 / 5" /></Reveal>
            </div>
          </div>
        </section>

        {/* ── 03 SPACE ── */}
        <section className="st-section" id="space">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Space</p>
              <h2 className="st-section-title" data-ko>공간 디자인</h2>
              <h2 className="st-section-title" data-en>Spatial Design</h2>
              <p className="st-section-desc" data-ko>계단빵의 공간 이미지와 주요 디테일이 이곳에 채워집니다. 현장 촬영 자료가 준비되는 대로 업데이트됩니다.</p>
              <p className="st-section-desc" data-en>Gallery images and key spatial details will be placed here, updated as on-site documentation becomes available.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><Placeholder label="Space 01" /></div>
              <div className="st-item"><Placeholder label="Space 02" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><Placeholder label="Detail 01" ratio="1 / 1" /></div>
              <div className="st-item"><Placeholder label="Detail 02" ratio="1 / 1" /></div>
              <div className="st-item"><Placeholder label="Detail 03" ratio="1 / 1" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 CREDIT ── */}
        <section className="st-section alt" id="credit">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Credit</p>
              <h2 className="st-section-title">Credit</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p>TBD</p></Reveal>
              <Reveal className="st-card"><h4>Project</h4><p data-ko>계단빵</p><p data-en>Gyedan Bread</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p data-ko>브랜드 디자인 · 공간 디자인</p><p data-en>Brand Design · Spatial Design</p></Reveal>
              <Reveal className="st-card"><h4>Status</h4><p data-ko>준비 중</p><p data-en>Coming Soon</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #d4a373;
          --secondary: #a67c52;
          --accent-ink: color-mix(in srgb, var(--accent) 58%, #000 42%);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f6f1ea;
          --text-mid: #555;
          --gray: #888;
          --keyword-border: #1a1a1a;
        }
        :global(html[data-theme='dark']) {
          --page-bg: #0c0c0c;
          --page-fg: #e8e8e8;
          --section-bg: #161616;
          --text-mid: #aaa;
          --gray: #999;
          --keyword-border: #e8e8e8;
          --accent-ink: var(--accent);
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }
      `}</style>
    </>
  );
}
