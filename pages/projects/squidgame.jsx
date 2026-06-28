import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'built', label: 'Built' },
  { id: 'credit', label: 'Credit' },
];

const I = (name) => `/images/squidgame/${name}`;

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

export default function SquidGame() {
  return (
    <>
      <Head>
        <title>SQUID GAME 2 × GS25 — Pop-Up Store</title>
        <meta name="description" content="SQUID GAME 2 × GS25 성수 팝업 스토어 공간 디자인. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">SQUID GAME 2</h1>
          <p className="st-hero-positioning">
            <span data-ko>넷플릭스 오리지널 ‘오징어 게임’ 시즌 2 공개에 맞춰 GS25와 협업한 몰입형 팝업 스토어 — GS25 × Netflix.</span>
            <span data-en>An immersive pop-up store with GS25, timed to the release of Netflix&apos;s Squid Game Season 2 — GS25 × Netflix.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>달고나, 얼음 땡 등 작품 속 게임을 실제로 체험할 수 있는 공간을 설계하고, 3D 시각화부터 현장 감리까지 전 과정에 참여했습니다. 2024년 12월 성수동 그랜드 오픈.</span>
            <span data-en>We designed spaces where visitors physically experience iconic games — from dalgona to Red Light, Green Light — and were involved from 3D visualization through on-site supervision. Grand opening in Seongsu, December 2024.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“글로벌 IP의 세계관을, 실제 공간으로.”</span>
            <span data-en>“Bringing a global IP&apos;s universe into physical space.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>공간 디자인 · 3D 시각화 · 현장 감리</span>
              <span data-en>Space Design · 3D Visualization · Supervision</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>팝업 스토어 · 엔터테인먼트</span>
              <span data-en>Pop-Up Store · Entertainment</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | GS25 × Netflix</span>
              <span className="st-info-line">Seongsu, Seoul · 2024</span>
            </p>
          </div>
        </section>

        <div className="st-full-img"><img src={I('render-main.jpg')} alt="SQUID GAME 2 pop-up" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>글로벌 IP를 공간으로 구현하다</h2>
              <h2 className="st-section-title" data-en>Bringing A Global IP Into Physical Space</h2>
              <p className="st-section-desc" data-ko>2024년 12월, 넷플릭스 오징어 게임 시즌 2 공개와 동시에 성수동에 오픈한 GS25 × 오징어 게임 팝업 스토어. 작품 속 세계관을 실제 리테일 공간으로 옮기며, 방문객이 직접 게임에 참여하는 몰입형 체험 동선을 설계했습니다. 달고나 만들기, 얼음 땡 챌린지 등 시그니처 게임 체험존과 한정판 굿즈 공간을 하나의 흐름으로 연결했습니다.</p>
              <p className="st-section-desc" data-en>Opened in Seongsu in December 2024 alongside Squid Game Season 2, this GS25 × Squid Game pop-up translated the show&apos;s universe into a physical retail space — an immersive flow where visitors join iconic games (dalgona, Red Light Green Light) connected seamlessly with a limited-edition merch zone.</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Netflix</h4><p data-ko>글로벌 IP 협업</p><p data-en>Global IP collaboration</p></Reveal>
              <Reveal className="st-card"><h4>GS25</h4><p data-ko>리테일 파트너</p><p data-en>Retail partner</p></Reveal>
              <Reveal className="st-card"><h4>3D</h4><p data-ko>Enscape 3D 시각화</p><p data-en>Enscape 3D visualization</p></Reveal>
              <Reveal className="st-card"><h4>Pop-Up</h4><p data-ko>몰입형 체험 공간</p><p data-en>Immersive experience space</p></Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 CONCEPT ── */}
        <section className="st-section alt" id="concept">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Concept</p>
              <h2 className="st-section-title" data-ko>3D 시각화</h2>
              <h2 className="st-section-title" data-en>3D Visualization</h2>
              <p className="st-section-desc" data-ko>Enscape 실시간 3D 렌더링으로 작품 속 세계관이 실제 공간에 어떻게 구현되는지 시각화했습니다. 파사드부터 내부 체험 동선, 게임 존 배치까지 전 과정을 3D로 검증한 후 시공에 착수했습니다.</p>
              <p className="st-section-desc" data-en>Using Enscape real-time rendering, we visualized how the show&apos;s universe would translate into space — verifying façade, interior flow, and game-zone placement in 3D before construction.</p>
            </Reveal>
            <div className="st-render-hero"><img src={I('render-facade.jpg')} alt="Facade rendering" loading="lazy" /></div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('render-scene3.jpg')} alt="Scene 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-scene5.jpg')} alt="Scene 5" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-inside1.jpg')} alt="Inside 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-inside2.jpg')} alt="Inside 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-inside3.jpg')} alt="Inside 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-inside6.jpg')} alt="Inside 6" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 03 BUILT ── */}
        <section className="st-section" id="built">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Built</p>
              <h2 className="st-section-title" data-ko>완공된 공간</h2>
              <h2 className="st-section-title" data-en>As Built</h2>
              <p className="st-section-desc" data-ko>2024년 12월 성수동 오픈 현장. 렌더링에서 구상한 공간이 실제로 어떻게 구현되었는지 확인할 수 있습니다.</p>
              <p className="st-section-desc" data-en>The pop-up as completed in Seongsu, December 2024 — see how the spaces envisioned in renderings came to life.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('built-01.jpg')} alt="Built 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-02.jpg')} alt="Built 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-03.jpg')} alt="Built 3" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('built-04.jpg')} alt="Built 4" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-05.jpg')} alt="Built 5" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-06.jpg')} alt="Built 6" loading="lazy" /></div>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('built-07.jpg')} alt="Built 7" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-08.jpg')} alt="Built 8" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 CREDIT ── */}
        <section className="st-section alt" id="credit">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Credit</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p>GS25 × Netflix</p></Reveal>
              <Reveal className="st-card"><h4>Project</h4><p data-ko>오징어 게임 2 팝업 스토어</p><p data-en>Squid Game 2 Pop-Up Store</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p data-ko>공간 디자인 · 3D 시각화 · 현장 감리</p><p data-en>Space Design · 3D Visualization · Supervision</p></Reveal>
              <Reveal className="st-card"><h4>Location</h4><p data-ko>서울 성수동</p><p data-en>Seongsu, Seoul</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #E8006F;
          --secondary: #b5004f;
          --accent-ink: #ff3d92;
          --page-bg: #0f0e0e;
          --page-fg: #e8e8e8;
          --section-bg: #181617;
          --text-mid: #aaa;
          --gray: #999;
          --keyword-border: #e8e8e8;
          --fg-10: rgba(255,255,255,0.1);
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }
      `}</style>
    </>
  );
}
