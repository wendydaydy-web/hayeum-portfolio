import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'design', label: 'Design' },
  { id: 'built', label: 'Built' },
  { id: 'press', label: 'Press' },
];

const I = (name) => `/images/handonday/${name}`;

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

export default function HandonDay() {
  return (
    <>
      <Head>
        <title>선진 그릴링 마이스터링 스쿨 — 2024 한돈데이 Pop-Up</title>
        <meta name="description" content="선진포크한돈 2024 한돈데이 '마법학교' 컨셉 팝업 공간 디자인. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">HANDON DAY</h1>
          <p className="st-hero-positioning">
            <span data-ko>선진 그릴링 마이스터링 스쿨 · 2024 한돈데이 Pop-Up — 선진포크한돈의 브랜드 철학을 MZ세대 ‘마법학교’ 컨셉으로 번역한 참여형 팝업.</span>
            <span data-en>SEONJIN Grilling Meister School · 2024 Handon Day Pop-Up — translating SEONJIN PORK HANDON&apos;s philosophy into a Gen-MZ ‘magic school’ concept.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>2024년 10월 초 성수동에서 열린 선진포크한돈 팝업스토어. 공간 컨셉 기획부터 3D 시각화, 시공, 현장 감리까지 전 과정에 참여했습니다.</span>
            <span data-en>An October 2024 pop-up store in Seongsu, Seoul for SEONJIN PORK HANDON. We were involved from spatial concept through 3D visualization, construction, and on-site supervision.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“그릴링 잘한 한돈에선, 마법 같은 맛이 난다.” 🌈</span>
            <span data-en>“Well-grilled han-don tastes like magic.” 🌈</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>공간 컨셉 · 3D 시각화 · 시공 · 감리</span>
              <span data-en>Space Concept · 3D · Construction · Supervision</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>팝업 스토어 · F&amp;B</span>
              <span data-en>Pop-Up Store · F&amp;B</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line" data-ko>CLIENT | 선진 (선진포크한돈)</span>
              <span className="st-info-line" data-en>CLIENT | SEONJIN PORK HANDON</span>
              <span className="st-info-line">AGENCY | theCNM · Seongsu · 2024</span>
            </p>
          </div>
        </section>

        <div className="st-full-img"><img src={I('hero.jpg')} alt="HANDON DAY pop-up" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>그릴링이 만드는 마법 같은 맛</h2>
              <h2 className="st-section-title" data-en>The Magic Of Grilling</h2>
              <p className="st-section-desc" data-ko>축산식품 전문기업 선진은 식육문화연구원을 설립하고 한돈 굽기 자격 검정 ‘그릴링 마이스터’ 프로그램을 운영합니다. 2024 한돈데이를 맞아 선진포크한돈은 브랜드 철학을 MZ세대 언어로 번역한 팝업을 기획했습니다.</p>
              <p className="st-section-desc" data-en>SEONJIN, a Korean meat-industry leader, runs the ‘Grilling Meister’ certification — teaching the craft of preparing Korean pork. For 2024 Handon Day, SEONJIN PORK HANDON translated this philosophy into a language that resonates with Gen MZ.</p>
              <p className="st-section-desc" data-ko>“그릴링 잘한 선진포크 한돈에선 마법 같은 환상의 맛이 난다”는 메시지에서 출발해, 귀여운 ‘마법학교’ 컨셉이 탄생했습니다.</p>
              <p className="st-section-desc" data-en>Starting from a single line — “Well-grilled SEONJIN pork tastes like magic” — the concept grew into a trendy, iconic ‘magic school’ universe.</p>
              <div className="st-keywords">
                <span className="st-keyword">Magic School</span>
                <span className="st-keyword">MZ Target</span>
                <span className="st-keyword">Grilling Meister</span>
              </div>
            </Reveal>
            <div className="st-render-hero" style={{ marginTop: 40 }}>
              <img src={I('design-01.jpg')} alt="Magic School Concept" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ── 02 CONCEPT ── */}
        <section className="st-section alt" id="concept">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Concept</p>
              <h2 className="st-section-title" data-ko>렌더에서 현장까지</h2>
              <h2 className="st-section-title" data-en>From Render To Reality</h2>
              <p className="st-section-desc" data-ko>Enscape 3D 렌더링으로 마법학교 컨셉이 실제 공간에서 어떻게 작동할지 사전 시뮬레이션했습니다. 동선·조도·컬러 밸런스까지 렌더에서 설계한 디테일이 그대로 시공에 반영됐습니다.</p>
              <p className="st-section-desc" data-en>Using Enscape, we simulated how the magic school concept would work in space — circulation, lighting, color balance — all designed in render first, then faithfully reproduced in construction.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('render-01.jpg')} alt="Render 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-02.jpg')} alt="Render 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-03.jpg')} alt="Render 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-04.jpg')} alt="Render 4" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 03 DESIGN ── */}
        <section className="st-section" id="design">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Design</p>
              <h2 className="st-section-title" data-ko>디테일까지 한 땀 한 땀</h2>
              <h2 className="st-section-title" data-en>Every Detail Hand-Stitched</h2>
              <p className="st-section-desc" data-ko>바닥 시트지부터 보드판·포스터·학생증까지 — 마법학교 컨셉을 일관되게 녹여낸 모든 그래픽 디자인을 올인원으로 제작했습니다. 돋보이는 컬러 팔레트가 시선을 사로잡고 공간 전체에 일관된 브랜드 무드를 전달합니다.</p>
              <p className="st-section-desc" data-en>From floor vinyl to blackboards, posters, and student ID cards — we produced all graphics in-house, weaving the magic school universe into every surface with a distinctive palette and consistent brand mood.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('design-02.jpg')} alt="Design Output 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('design-03.jpg')} alt="Design Output 3" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 BUILT ── */}
        <section className="st-section alt" id="built">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Built</p>
              <h2 className="st-section-title" data-ko>성수동에서 마법이 시작되다</h2>
              <h2 className="st-section-title" data-en>Magic Begins In Seongsu</h2>
              <p className="st-section-desc" data-ko>완공된 팝업 공간. 방문객은 입장과 동시에 마법학교 학생이 되어 키오스크 문제 풀이, 그릴링 마이스터 자격증 체험, 학생증·키링 만들기 등 참여형 프로그램으로 브랜드 경험을 확장합니다.</p>
              <p className="st-section-desc" data-en>The completed pop-up. Visitors become students of the magic school — kiosk quizzes, a simulated Grilling Meister certification, and make-your-own ID &amp; keyring stations extend the brand experience.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('built-08.jpg')} alt="Built hero" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-01.jpg')} alt="Built 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-02.jpg')} alt="Built 2" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('built-03.jpg')} alt="Built 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-04.jpg')} alt="Built 4" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-05.jpg')} alt="Built 5" loading="lazy" /></div>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('built-06.jpg')} alt="Built 6" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-07.jpg')} alt="Built 7" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 05 PRESS ── */}
        <section className="st-section" id="press">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Press</p>
              <h2 className="st-section-title" data-ko>언론 반응</h2>
              <h2 className="st-section-title" data-en>Press Coverage</h2>
              <p className="st-section-desc" data-ko>성수동에서 가장 인기 많았던 팝업 중 하나로 꼽히며 다수 언론에 소개되었습니다 — Nate · AM News · Foodbank · Pig &amp; Pork.</p>
              <p className="st-section-desc" data-en>Recognized as one of the most popular pop-ups in Seongsu that season, featured across multiple outlets — Nate · AM News · Foodbank · Pig &amp; Pork.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('press-01.jpg')} alt="Nate · Oct 2024" loading="lazy" /></div>
              <div className="st-item"><img src={I('press-02.jpg')} alt="AM News · Oct 2024" loading="lazy" /></div>
              <div className="st-item"><img src={I('press-03.jpg')} alt="Foodbank · Oct 2024" loading="lazy" /></div>
              <div className="st-item"><img src={I('press-04.jpg')} alt="Pig & Pork · Oct 2024" loading="lazy" /></div>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Credit</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p data-ko>선진 (선진포크한돈)</p><p data-en>SEONJIN PORK HANDON</p></Reveal>
              <Reveal className="st-card"><h4>Agency</h4><p>theCNM (더씨앤엠)</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p data-ko>공간 컨셉 · 3D 시각화 · 시공 · 현장 감리</p><p data-en>Space Concept · 3D · Construction · Supervision</p></Reveal>
              <Reveal className="st-card"><h4>Location</h4><p data-ko>서울 성수동 · 2024년 10월</p><p data-en>Seongsu, Seoul · Oct 2024</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #ff7a9e;
          --secondary: #e85a7e;
          --accent-ink: color-mix(in srgb, var(--accent) 52%, #000 48%);
          --page-bg: #faf7f4;
          --page-fg: #1a1a1a;
          --section-bg: #f1ebe6;
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
