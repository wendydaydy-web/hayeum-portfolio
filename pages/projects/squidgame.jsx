import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'concept', label: 'Concept' },
  { id: 'built', label: 'Built' },
  { id: 'credit', label: 'Credit' },
];

const HERO_META = [
  { label: 'Project', value: 'SQUID GAME 2 × GS25' },
  { label: 'Category', value: 'Pop-Up Store / Entertainment' },
  { label: 'Year', value: '2024' },
  { label: 'Scope', value: 'Space Design · 3D Visualization · Supervision' },
  { label: 'Location', value: 'Seongsu, Seoul' },
];

const I = (name) => `/images/squidgame/${name}`;

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

export default function SquidGame() {
  return (
    <>
      <Head>
        <title>SQUID GAME 2 × GS25 — Pop-Up Store</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#E8006F" />

      <ProjectHero
        title={"SQUID\nGAME 2"}
        label="Pop-Up Store · GS25 × Netflix"
        image={I('render-main.jpg')}
        subtitleKo="넷플릭스 오리지널 시리즈 오징어 게임 시즌 2 공개에 맞춰 GS25와 협업한 몰입형 팝업 스토어. 달고나, 얼음 땡 등 작품 속 게임을 실제로 체험할 수 있는 공간을 설계하고, 3D 시각화부터 현장 감리까지 전 과정에 참여했습니다."
        subtitleEn="An immersive pop-up store in collaboration with GS25, timed to the release of Netflix's Squid Game Season 2. Designed spaces where visitors could physically experience iconic games from the series — from dalgona to Red Light, Green Light. Involved from 3D visualization through on-site supervision."
        meta={HERO_META}
      />

      {/* ── 01 OVERVIEW ── */}
      <section id="overview">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Overview</p>
            <h2 className="section-title" data-ko>글로벌 IP를<br />공간으로 구현하다</h2>
            <h2 className="section-title" data-en>Bringing A Global IP<br />Into Physical Space</h2>
            <p className="section-desc" data-ko>2024년 12월, 넷플릭스 오징어 게임 시즌 2 공개와 동시에 성수동에 오픈한 GS25 × 오징어 게임 팝업 스토어. 작품 속 세계관을 실제 리테일 공간으로 옮기면서, 방문객이 직접 게임에 참여하는 몰입형 체험 동선을 설계했습니다. 달고나 만들기, 얼음 땡 챌린지 등 시그니처 게임 체험존과 한정판 굿즈 판매 공간을 하나의 흐름으로 연결했습니다.</p>
            <p className="section-desc" data-en>Opened in Seongsu, Seoul in December 2024, coinciding with the release of Netflix&apos;s Squid Game Season 2. This GS25 × Squid Game pop-up store translated the show&apos;s universe into a physical retail space, designing an immersive experience flow where visitors could participate in iconic games — dalgona making, Red Light Green Light challenge, and more — all connected seamlessly with a limited-edition merchandise zone.</p>
          </FadeIn>
          <div className="overview-stats">
            <FadeIn>
              <div className="stat-card"><div className="stat-value">Netflix</div><div className="stat-label" data-ko>글로벌 IP 협업</div><div className="stat-label" data-en>Global IP Collaboration</div></div>
            </FadeIn>
            <FadeIn>
              <div className="stat-card"><div className="stat-value">GS25</div><div className="stat-label" data-ko>리테일 파트너</div><div className="stat-label" data-en>Retail Partner</div></div>
            </FadeIn>
            <FadeIn>
              <div className="stat-card"><div className="stat-value">3D</div><div className="stat-label" data-ko>Enscape 3D 시각화</div><div className="stat-label" data-en>Enscape 3D Visualization</div></div>
            </FadeIn>
            <FadeIn>
              <div className="stat-card"><div className="stat-value">Pop-Up</div><div className="stat-label" data-ko>몰입형 체험 공간</div><div className="stat-label" data-en>Immersive Experience Space</div></div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 DESIGN CONCEPT ── */}
      <section className="alt-bg" id="concept">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Concept</p>
            <h2 className="section-title" data-ko>3D 시각화</h2>
            <h2 className="section-title" data-en>3D Visualization</h2>
            <p className="section-desc" data-ko>Enscape를 활용한 실시간 3D 렌더링으로, 작품 속 세계관이 실제 공간에 어떻게 구현되는지 시각화했습니다. 파사드 디자인부터 내부 체험 동선, 게임 존 배치까지 전 과정을 3D로 검증한 후 시공에 착수했습니다.</p>
            <p className="section-desc" data-en>Using Enscape for real-time 3D rendering, we visualized how the show&apos;s universe would translate into physical space. From façade design to interior experience flow and game zone placement — the entire process was verified in 3D before construction began.</p>
          </FadeIn>

          {/* Hero render */}
          <FadeIn>
            <div className="render-hero">
              <img src={I('render-facade.jpg')} alt="Facade Rendering" loading="lazy" />
            </div>
          </FadeIn>

          {/* Render grid */}
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('render-scene3.jpg')} alt="Scene 3" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('render-scene5.jpg')} alt="Scene 5" loading="lazy" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('render-inside1.jpg')} alt="Inside 1" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('render-inside2.jpg')} alt="Inside 2" loading="lazy" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('render-inside3.jpg')} alt="Inside 3" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('render-inside6.jpg')} alt="Inside 6" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── 03 COMPLETED SPACE ── */}
      <section id="built">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Completed Space</p>
            <h2 className="section-title" data-ko>완공된 공간</h2>
            <h2 className="section-title" data-en>As Built</h2>
            <p className="section-desc" data-ko>2024년 12월 성수동에서 오픈한 팝업 스토어 현장. 렌더링에서 구상한 공간이 실제로 어떻게 구현되었는지 확인할 수 있습니다.</p>
            <p className="section-desc" data-en>The pop-up store as completed in Seongsu, Seoul, December 2024. See how the spaces envisioned in renderings were brought to life.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('built-01.jpg')} alt="Built 1" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('built-02.jpg')} alt="Built 2" loading="lazy" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('built-03.jpg')} alt="Built 3" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('built-04.jpg')} alt="Built 4" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('built-05.jpg')} alt="Built 5" loading="lazy" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('built-06.jpg')} alt="Built 6" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('built-07.jpg')} alt="Built 7" loading="lazy" /></div>
          </div>
          <FadeIn>
            <div className="render-hero" style={{ marginTop: 20 }}>
              <img src={I('built-08.jpg')} alt="Built 8" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 04 CREDIT ── */}
      <section className="alt-bg" id="credit">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Credit</p>
          </FadeIn>
          <dl className="credit-grid">
            <div className="credit-item">
              <dt>Client</dt>
              <dd>GS25 × Netflix</dd>
            </div>
            <div className="credit-item">
              <dt>Project</dt>
              <dd data-ko>오징어 게임 2 팝업 스토어</dd>
              <dd data-en>Squid Game 2 Pop-Up Store</dd>
            </div>
            <div className="credit-item">
              <dt>Role</dt>
              <dd data-ko>공간 디자인<br />3D 시각화<br />현장 감리</dd>
              <dd data-en>Space Design<br />3D Visualization<br />On-site Supervision</dd>
            </div>
            <div className="credit-item">
              <dt>Location</dt>
              <dd data-ko>서울 성수동</dd>
              <dd data-en>Seongsu, Seoul</dd>
            </div>
          </dl>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'SOLDAM MARKET', href: '/projects/soldam' }}
        nextProject={{ name: 'BENSON', href: '/projects/benson' }}
      />

      <style jsx>{`
        :global(:root) {
          --warm: #E8006F;
          --warm-dark: #b5004f;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #0f0e0e;
          --page-fg: #f0efeb;
          --section-bg: #1a1a1a;
          --text-mid: #aaa;
          --text-light: #999;
          --border-light: rgba(255,255,255,0.08);
          --nav-scrolled-bg: rgba(15,14,14,0.9);
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

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
        .alt-bg { background: var(--section-bg); }

        /* ===== OVERVIEW STATS ===== */
        .overview-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 60px;
        }
        .stat-card {
          background: rgba(232, 0, 111, 0.06);
          border: 1px solid rgba(232, 0, 111, 0.15);
          border-radius: 12px; padding: 28px 24px;
          transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; font-weight: 700;
          color: var(--warm); margin-bottom: 8px; letter-spacing: 1px;
        }
        .stat-label {
          font-size: 12px; color: var(--text-mid); line-height: 1.5;
        }

        /* ===== RENDER HERO ===== */
        .render-hero {
          margin-top: 48px; border-radius: 8px; overflow: hidden;
        }
        .render-hero img {
          width: 100%; height: auto; display: block;
          transition: transform 0.6s ease;
        }
        .render-hero:hover img { transform: scale(1.02); }

        /* ===== GALLERY ===== */
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .gallery-3col {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .gallery-item { overflow: hidden; border-radius: 4px; }
        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          aspect-ratio: 16/10; transition: transform 0.6s ease;
        }
        .gallery-item:hover img { transform: scale(1.04); }

        /* ===== CREDIT ===== */
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
          .overview-stats { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-3col { grid-template-columns: 1fr; }
          :global(.concept-block) { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          section { padding: 60px 20px; }
          .overview-stats { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
