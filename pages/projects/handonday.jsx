import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'design', label: 'Design' },
  { id: 'built', label: 'Built' },
  { id: 'press', label: 'Press' },
];

const HERO_META = [
  { label: 'Project', value: '선진 그릴링 마이스터링 스쿨' },
  { label: 'Category', value: 'Pop-Up Store / F&B' },
  { label: 'Year', value: '2024' },
  { label: 'Scope', value: 'Space Concept · 3D · Construction · Supervision' },
  { label: 'Location', value: 'Seongsu, Seoul' },
];

const I = (name) => `/images/handonday/${name}`;

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

export default function HandonDay() {
  return (
    <>
      <Head>
        <title>선진 그릴링 마이스터링 스쿨 — 2024 한돈데이 Pop-Up</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#ff7a9e" />

      <ProjectHero
        title={"HANDON\nDAY"}
        label="선진 그릴링 마이스터링 스쿨 · 2024 한돈데이 Pop-Up"
        image={I('hero.jpg')}
        subtitleKo="2024년 10월 초, 성수동에서 열린 선진포크한돈 팝업스토어. 축산식품 기업 선진의 그릴링 마이스터 프로그램을 MZ세대를 위한 '마법학교' 컨셉으로 번역한 참여형 팝업입니다. 공간 컨셉 기획부터 3D 시각화, 시공, 현장 감리까지 전 과정에 참여했습니다."
        subtitleEn="An October 2024 pop-up store in Seongsu, Seoul for SEONJIN PORK HANDON. We translated SEONJIN's Grilling Meister program — a professional certification for preparing Korean pork — into a 'magic school' concept designed for Gen MZ. Involved from spatial concept through 3D visualization, construction, and on-site supervision."
        meta={HERO_META}
      />

      {/* ── 01 BRAND STORY ── */}
      <section className="brand-story" id="story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Brand Story</p>
            <h2 className="section-title" data-ko>그릴링이 만드는<br /><em>마법 같은 맛</em></h2>
            <h2 className="section-title" data-en>The Magic<br /><em>Of Grilling</em></h2>
            <p className="section-desc" data-ko>축산식품 전문기업 <strong>선진</strong>은 식육문화연구원을 설립하고 한돈 굽기 자격 검정 &lsquo;<strong>그릴링 마이스터</strong>&rsquo; 프로그램을 운영 중입니다. 2024 한돈데이를 맞아 파트너사로 참여한 선진포크한돈은, 브랜드 철학을 MZ세대 언어로 번역한 팝업을 기획했습니다.</p>
            <p className="section-desc" data-en><strong>SEONJIN</strong>, a Korean meat-industry leader, runs the <strong>Grilling Meister</strong> certification — a program that documents and teaches the craft of preparing Korean pork (han-don). For 2024 Handon Day, SEONJIN PORK HANDON partnered with us to translate this brand philosophy into a language that resonates with Gen MZ.</p>
            <p className="section-desc" data-ko>트렌디하고 아이코닉한 컨셉을 찾던 끝에, &ldquo;그릴링 잘한 선진포크 한돈에선 마법 같은 환상의 맛이 난다&rdquo;는 메시지에서 출발한 귀여운 <strong>마법학교</strong> 컨셉이 탄생했습니다. 🌈</p>
            <p className="section-desc" data-en>The concept started from a single line — &ldquo;Well-grilled SEONJIN pork tastes like magic&rdquo; — which evolved into a trendy, iconic <strong>magic school</strong> universe. 🌈</p>
          </FadeIn>
          <div className="story-grid">
            <FadeIn className="story-text">
              <div className="story-keywords">
                <span className="keyword">Magic School</span>
                <span className="keyword">MZ Target</span>
                <span className="keyword">Grilling Meister</span>
              </div>
            </FadeIn>
            <FadeIn className="story-visual">
              <img src={I('design-01.jpg')} alt="Magic School Concept" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 DESIGN CONCEPT (3D RENDER) ── */}
      <section id="concept">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — 3D Visualization</p>
            <h2 className="section-title" data-ko>렌더에서<br /><em>현장까지</em></h2>
            <h2 className="section-title" data-en>From Render<br /><em>To Reality</em></h2>
            <p className="section-desc" data-ko>Enscape로 진행한 3D 렌더링을 통해 마법학교 컨셉이 실제 공간에서 어떻게 작동할지 사전 시뮬레이션했습니다. 동선, 조도, 컬러 밸런스까지 — 렌더에서 설계한 디테일이 그대로 시공에 반영됐습니다.</p>
            <p className="section-desc" data-en>Using Enscape for real-time 3D rendering, we simulated how the magic school concept would work in a physical space. Every detail — circulation, lighting, color balance — was designed in render first, then reproduced faithfully during construction.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('render-01.jpg')} alt="Render 1" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('render-02.jpg')} alt="Render 2" loading="lazy" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('render-03.jpg')} alt="Render 3" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('render-04.jpg')} alt="Render 4" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── 03 DESIGN OUTPUT ── */}
      <section className="alt-bg" id="design">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Design Output</p>
            <h2 className="section-title" data-ko>디테일까지<br /><em>한 땀 한 땀</em></h2>
            <h2 className="section-title" data-en>Every Detail<br /><em>Hand-Stitched</em></h2>
            <p className="section-desc" data-ko>바닥 시트지부터 보드판, 포스터, 학생증까지 — 마법학교 컨셉을 일관되게 녹여내는 모든 그래픽 디자인을 올인원으로 제작했습니다. 돋보이는 컬러 팔레트가 방문객의 시선을 사로잡고, 공간 전체에 일관된 브랜드 무드를 전달합니다.</p>
            <p className="section-desc" data-en>From floor vinyl to the blackboards, posters, and even student ID cards — we produced all graphic outputs in-house, weaving the magic school universe into every surface. The distinctive palette draws visitors in and carries a consistent brand mood across the entire space.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('design-02.jpg')} alt="Design Output 2" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('design-03.jpg')} alt="Design Output 3" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── 04 BUILT ── */}
      <section id="built">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — As Built</p>
            <h2 className="section-title" data-ko>성수동에서<br /><em>마법이 시작되다</em></h2>
            <h2 className="section-title" data-en>Magic Begins<br /><em>In Seongsu</em></h2>
            <p className="section-desc" data-ko>완공된 팝업 공간. 방문객들은 입장과 동시에 마법학교의 학생이 되어, 키오스크 문제 풀이, 그릴링 마이스터 자격증 체험, 학생증·키링 만들기 이벤트 등 참여형 프로그램을 통해 브랜드 경험을 확장합니다.</p>
            <p className="section-desc" data-en>The completed pop-up. Visitors become students of the magic school from the moment they enter — engaging in kiosk quizzes, a simulated Grilling Meister certification experience, and make-your-own ID &amp; keyring stations that extend the brand experience.</p>
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
              <img src={I('built-08.jpg')} alt="Built Hero" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 05 PRESS ── */}
      <section className="alt-bg" id="press">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">05 — Press</p>
            <h2 className="section-title" data-ko>언론<br /><em>반응</em></h2>
            <h2 className="section-title" data-en>Press<br /><em>Coverage</em></h2>
            <p className="section-desc" data-ko>성수동에서 가장 인기 많았던 팝업 중 하나로 꼽히며, 다수 언론에 소개되었습니다.</p>
            <p className="section-desc" data-en>Recognized as one of the most popular pop-ups in Seongsu that season, featured across multiple media outlets.</p>
          </FadeIn>
          <div className="press-strip">
            <div className="press-card">
              <p className="press-pub">Nate · Oct 2024</p>
              <img src={I('press-01.jpg')} alt="Nate" loading="lazy" />
            </div>
            <div className="press-card">
              <p className="press-pub">AM News · Oct 2024</p>
              <img src={I('press-02.jpg')} alt="AM News" loading="lazy" />
            </div>
            <div className="press-card">
              <p className="press-pub">Foodbank · Oct 2024</p>
              <img src={I('press-03.jpg')} alt="Foodbank" loading="lazy" />
            </div>
            <div className="press-card">
              <p className="press-pub">Pig &amp; Pork · Oct 2024</p>
              <img src={I('press-04.jpg')} alt="Pig & Pork" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 CREDIT ── */}
      <section className="credit">
        <div className="section-inner">
          <dl className="credit-grid">
            <div className="credit-item">
              <dt>Client</dt>
              <dd data-ko>선진 (선진포크한돈)</dd>
              <dd data-en>SEONJIN (SEONJIN PORK HANDON)</dd>
            </div>
            <div className="credit-item">
              <dt>Agency</dt>
              <dd>theCNM (더씨앤엠)</dd>
            </div>
            <div className="credit-item">
              <dt>Role</dt>
              <dd data-ko>공간 컨셉 · 3D 시각화<br />시공 · 현장 감리</dd>
              <dd data-en>Space Concept · 3D Visualization<br />Construction · Supervision</dd>
            </div>
            <div className="credit-item">
              <dt>Location</dt>
              <dd data-ko>서울 성수동 · 2024년 10월</dd>
              <dd data-en>Seongsu, Seoul · Oct 2024</dd>
            </div>
          </dl>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'SQUID GAME 2', href: '/projects/squidgame' }}
        nextProject={{ name: 'SOLDAM MARKET', href: '/projects/soldam' }}
      />

      <style jsx>{`
        :global(:root) {
          --warm: #ff7a9e;
          --warm-dark: #e85a7e;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #faf7f4;
          --page-fg: #1a1a1a;
          --section-bg: #f5eee7;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --nav-scrolled-bg: rgba(250,247,244,0.9);
          --keyword-border: #1a1a1a;
          --keyword-color: #1a1a1a;
        }
        @media (prefers-color-scheme: dark) {
          :global(:root) {
            --page-bg: #0f0e0e;
            --page-fg: #f0efeb;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --border-light: rgba(255,255,255,0.08);
            --nav-scrolled-bg: rgba(15,14,14,0.9);
            --keyword-border: #f0efeb;
            --keyword-color: #f0efeb;
          }
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }

        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .alt-bg { background: var(--section-bg); }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--warm); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 42px); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: 1px;
        }
        .section-title :global(em) {
          font-style: normal; color: var(--warm);
        }
        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300; margin-bottom: 14px;
        }
        .section-desc :global(strong) { color: var(--page-fg); font-weight: 500; }

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
          position: relative; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3;
        }
        .story-grid :global(.story-visual) img { width: 100%; height: 100%; object-fit: cover; }
        .story-keywords { display: flex; gap: 12px; margin-top: 40px; flex-wrap: wrap; }
        .keyword {
          padding: 10px 20px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--keyword-color);
        }

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

        /* ===== HERO FULL ROW ===== */
        .render-hero { border-radius: 4px; overflow: hidden; }
        .render-hero img {
          width: 100%; height: auto; display: block;
          transition: transform 0.6s ease;
        }
        .render-hero:hover img { transform: scale(1.02); }

        /* ===== PRESS STRIP ===== */
        .press-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 60px;
        }
        .press-card {
          border-radius: 4px; overflow: hidden; background: var(--page-bg);
          border: 1px solid var(--border-light);
        }
        .press-card img {
          width: 100%; height: 220px; object-fit: cover; display: block;
        }
        .press-pub {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--warm);
          padding: 16px 18px 0; margin-bottom: 12px;
        }

        /* ===== CREDIT ===== */
        .credit { background: var(--section-bg); }
        .credit-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 40px; max-width: 1000px;
        }
        .credit-item dt {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gray); margin-bottom: 8px;
        }
        .credit-item dd {
          font-size: 14px; font-weight: 500; color: var(--page-fg);
          line-height: 1.6;
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
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-3col { grid-template-columns: 1fr; }
          .press-strip { grid-template-columns: repeat(2, 1fr); }
          .credit-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          section { padding: 60px 20px; }
          .press-strip { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
