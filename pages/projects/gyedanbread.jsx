import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'Space' },
  { id: 'credit', label: 'Credit' },
];

const HERO_META = [
  { label: 'Project', value: '계단빵 · Gyedan Bread' },
  { label: 'Category', value: 'F&B / Bakery' },
  { label: 'Year', value: '2025' },
  { label: 'Scope', value: 'Brand & Spatial Design' },
  { label: 'Location', value: 'TBD' },
];

const I = (name) => `/images/gyedanbread/${name}`;

function FadeIn({ children, className = '', style }) {
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
  return <div ref={ref} className={`fade-in ${className}`} style={style}>{children}</div>;
}

/* Placeholder swatch used instead of missing images */
function Placeholder({ label, ratio = '16 / 10' }) {
  return (
    <div className="placeholder" style={{ aspectRatio: ratio }}>
      <span className="placeholder-label">{label}</span>
    </div>
  );
}

export default function GyedanBread() {
  return (
    <>
      <Head>
        <title>계단빵 — Brand &amp; Spatial Design</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#d4a373" />

      <div className="hero-placeholder-wrap">
        <ProjectHero
          title={"GYEDAN\nBREAD"}
          label="Brand & Spatial Design · Coming Soon"
          image="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%231a1a1a'/%3E%3C/svg%3E"
          subtitleKo="계단빵은 곧 공개됩니다. 브랜드 아이덴티티와 공간 디자인 전 과정을 담은 페이지입니다. 자료가 준비되는 대로 업데이트될 예정입니다."
          subtitleEn="Gyedan Bread — coming soon. A page documenting the full brand identity and spatial design process. Content will be updated as materials are ready."
          meta={HERO_META}
        />
      </div>

      {/* ── 01 BRAND STORY ── */}
      <section className="brand-story" id="story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Brand Story</p>
            <h2 className="section-title" data-ko>계단 위의 빵집</h2>
            <h2 className="section-title" data-en>The Bakery On The Stairs</h2>
            <p className="section-desc" data-ko>계단빵의 브랜드 스토리가 여기에 들어갑니다. 공간의 구조적 특성과 브랜드의 정체성이 어떻게 연결되는지, 그리고 일상의 계단이 어떻게 하나의 빵집 경험으로 번역되었는지를 설명하는 섹션입니다.</p>
            <p className="section-desc" data-en>This is where the brand story of Gyedan Bread will live. A section that explains how the structural character of the space connects to the brand&apos;s identity, and how the everyday staircase was translated into a bakery experience.</p>
          </FadeIn>
          <div className="story-grid">
            <FadeIn className="story-text">
              <div className="story-keywords">
                <span className="keyword">Bakery</span>
                <span className="keyword">Everyday</span>
                <span className="keyword">Craft</span>
              </div>
            </FadeIn>
            <FadeIn className="story-visual">
              <Placeholder label="Hero Visual" ratio="4 / 3" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 DESIGN CONCEPT ── */}
      <section id="concept">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Concept</p>
            <h2 className="section-title" data-ko>디자인 컨셉</h2>
            <h2 className="section-title" data-en>Design Concept</h2>
            <p className="section-desc" data-ko>계단이라는 일상적 구조를 빵집의 공간 언어로 재해석한 컨셉이 이곳에 담길 예정입니다. 공간의 층위, 동선, 마감재와 조도까지 — 하나의 흐름으로 연결되는 브랜드 경험을 설계합니다.</p>
            <p className="section-desc" data-en>The concept — reinterpreting the everyday structure of a staircase into the spatial language of a bakery — will be documented here. Layers, circulation, materials, and lighting, all woven into a connected brand experience.</p>
          </FadeIn>
          <div className="concept-grid">
            <FadeIn className="concept-card"><Placeholder label="Concept A" ratio="1 / 1" /></FadeIn>
            <FadeIn className="concept-card"><Placeholder label="Concept B" ratio="1 / 1" /></FadeIn>
            <FadeIn className="concept-card"><Placeholder label="Concept C" ratio="1 / 1" /></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 03 SPACE ── */}
      <section className="brand-story" id="space">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Space</p>
            <h2 className="section-title" data-ko>공간 디자인</h2>
            <h2 className="section-title" data-en>Spatial Design</h2>
            <p className="section-desc" data-ko>계단빵의 공간 이미지와 주요 디테일이 이곳에 채워집니다. 현장 촬영 자료가 준비되는 대로 업데이트됩니다.</p>
            <p className="section-desc" data-en>Gallery images and key spatial details of Gyedan Bread will be placed here, updated as on-site documentation becomes available.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <Placeholder label="Space 01" />
            <Placeholder label="Space 02" />
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <Placeholder label="Detail 01" ratio="1 / 1" />
            <Placeholder label="Detail 02" ratio="1 / 1" />
            <Placeholder label="Detail 03" ratio="1 / 1" />
          </div>
        </div>
      </section>

      {/* ── 04 CREDIT ── */}
      <section className="credit" id="credit">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Credit</p>
            <h2 className="section-title" data-ko>크레딧</h2>
            <h2 className="section-title" data-en>Credit</h2>
          </FadeIn>
          <dl className="credit-grid">
            <div className="credit-item">
              <dt>Client</dt>
              <dd>TBD</dd>
            </div>
            <div className="credit-item">
              <dt>Project</dt>
              <dd data-ko>계단빵</dd>
              <dd data-en>Gyedan Bread</dd>
            </div>
            <div className="credit-item">
              <dt>Role</dt>
              <dd data-ko>브랜드 디자인<br />공간 디자인</dd>
              <dd data-en>Brand Design<br />Spatial Design</dd>
            </div>
            <div className="credit-item">
              <dt>Status</dt>
              <dd data-ko>준비 중</dd>
              <dd data-en>Coming Soon</dd>
            </div>
          </dl>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'SHABU SANGHA', href: '/projects/shabusangha' }}
        nextProject={{ name: 'TOFU · G', href: '/projects/tofug' }}
      />

      <style jsx>{`
        :global(:root) {
          --warm: #d4a373;
          --warm-dark: #a67c52;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #faf8f5;
          --page-fg: #1a1a1a;
          --section-bg: #f0ebe4;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --nav-scrolled-bg: rgba(250,248,245,0.9);
          --keyword-border: #1a1a1a;
          --keyword-color: #1a1a1a;
        }
        @media (prefers-color-scheme: dark) {
          :global(:root) {
            --page-bg: #0f0e0e;
            --page-fg: #e8e8e8;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --border-light: rgba(255,255,255,0.08);
            --nav-scrolled-bg: rgba(15,14,14,0.9);
            --keyword-border: #e8e8e8;
            --keyword-color: #e8e8e8;
          }
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }

        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--warm); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 42px); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: 1px;
        }
        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300;
        }

        /* ===== PLACEHOLDER ===== */
        :global(.placeholder) {
          width: 100%;
          background: repeating-linear-gradient(
            135deg,
            rgba(212,163,115,0.10),
            rgba(212,163,115,0.10) 12px,
            rgba(212,163,115,0.04) 12px,
            rgba(212,163,115,0.04) 24px
          );
          border: 1px dashed rgba(212,163,115,0.4);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          color: var(--warm);
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
        }

        /* ===== BRAND STORY ===== */
        .brand-story { background: var(--section-bg); }
        .story-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: stretch; margin-top: 60px;
        }
        .story-grid :global(.story-text) {
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .story-grid :global(.story-visual) {
          position: relative; border-radius: 4px; overflow: hidden;
        }
        .story-keywords { display: flex; gap: 16px; margin-top: 40px; flex-wrap: wrap; }
        .keyword {
          padding: 10px 24px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--keyword-color);
        }

        /* ===== CONCEPT GRID ===== */
        .concept-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 60px;
        }
        :global(.concept-card) { border-radius: 4px; }

        /* ===== GALLERY ===== */
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .gallery-3col {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }

        /* ===== CREDIT ===== */
        .credit { background: var(--section-bg); }
        .credit-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 40px; margin-top: 48px; max-width: 1000px;
        }
        .credit-item dt {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gray); margin-bottom: 8px;
        }
        .credit-item dd {
          font-size: 14px; font-weight: 500; color: var(--page-fg); line-height: 1.6;
        }

        /* ===== FADE-IN ===== */
        :global(.fade-in) {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) { opacity: 1; transform: translateY(0); }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 32px; }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .concept-grid { grid-template-columns: 1fr; }
          .gallery-grid, .gallery-3col { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          section { padding: 60px 20px; }
          .credit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
