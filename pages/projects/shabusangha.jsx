import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'Space' },
  { id: 'detail', label: 'Detail' },
  { id: 'credit', label: 'Credit' },
];

const I = (name) => `/images/shabusangha/${name}`;

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

export default function ShabuSangha() {
  return (
    <>
      <Head>
        <title>SHABU SANGHA — Spatial Deco · Cheongdam</title>
        <meta name="description" content="샤브식당 상하 — 상하농원 철학을 청담으로 옮긴 농부의 부엌. 공간 데코·VMD. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">SHABU SANGHA</h1>
          <p className="st-hero-positioning">
            <span data-ko>고창 상하농원의 진정성과 상생의 철학을 청담의 맥락으로 옮긴 샤브 식당 — 공간 데코 · VMD · 브랜드 경험.</span>
            <span data-en>A shabu restaurant translating Sangha Farm&apos;s authenticity and coexistence philosophy into the context of Cheongdam — spatial deco · VMD · brand experience.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>‘농부의 부엌’이라는 컨셉 아래 공간의 정갈한 디테일을 완성했습니다. 한 그릇의 샤브 안에 농가의 이야기와 농부의 손길이 담기도록 메뉴부터 공간까지 정성스럽게 설계했습니다.</span>
            <span data-en>Under the concept of “the farmer&apos;s kitchen,” we completed every quiet spatial detail — crafting menu and space so a single bowl of shabu could hold the story of the farm and the touch of the farmer.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“농부의 부엌 — 본질에 집중하다.”</span>
            <span data-en>“The farmer&apos;s kitchen — focused on essence.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>공간 데코 · VMD · 브랜드 경험 · 디테일 디렉션</span>
              <span data-en>Spatial Deco · VMD · Brand Experience</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>F&amp;B · 데코</span>
              <span data-en>F&amp;B · Deco</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line" data-ko>CLIENT | 매일유업 / 엠즈씨드 (상하농원)</span>
              <span className="st-info-line" data-en>CLIENT | Maeil Dairy / MZ Seed (Sangha Farm)</span>
              <span className="st-info-line">BX | SPREAD WORKS · Cheongdam · 2025</span>
            </p>
          </div>
        </section>

        <div className="st-full-img"><img src={I('DSCF0005.jpg')} alt="SHABU SANGHA" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>고창에서 청담까지, 상하농원의 철학을 담다</h2>
              <h2 className="st-section-title" data-en>From Gochang To Cheongdam</h2>
              <p className="st-section-desc" data-ko>샤브식당 상하는 단순한 식당이 아닙니다. 상하농원이 오랜 시간 지켜온 진정성과 상생의 철학을 도시의 식탁 위에 옮겨 놓은 공간입니다. 한 그릇의 샤브샤브 안에 농가의 이야기와 농부의 손길이 담기도록, 메뉴부터 공간 디테일까지 정성스럽게 설계했습니다.</p>
              <p className="st-section-desc" data-en>SHABU SANGHA is more than a restaurant — a space carrying the authenticity and spirit of coexistence Sangha Farm has nurtured for years, now placed onto the urban table. Every detail, from menu to space, was crafted so a single bowl could hold the story of the farm and the touch of the farmer.</p>
              <div className="st-keywords">
                <span className="st-keyword">Authentic</span>
                <span className="st-keyword">Farm-to-Table</span>
                <span className="st-keyword">Berkshire K</span>
              </div>
            </Reveal>
            <div className="st-render-hero" style={{ marginTop: 40 }}>
              <img src={I('DSCF0012.jpg')} alt="SHABU SANGHA Interior" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ── 02 CONCEPT ── */}
        <section className="st-section alt" id="concept">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Concept</p>
              <h2 className="st-section-title" data-ko>농부의 부엌</h2>
              <h2 className="st-section-title" data-en>The Farmer&apos;s Kitchen</h2>
              <p className="st-section-desc" data-ko>핵심 컨셉은 ‘농부의 부엌’입니다. 자극적인 저가형 뷔페식 샤브와는 다른 길 — 간을 세게 하지 않고 자연식·저염식에 가까운 건강한 한 그릇을 지향합니다. 디자인 또한 기교 없이 담백하게, 음식의 맛처럼 브랜드의 진심을 그대로 표현했습니다.</p>
              <p className="st-section-desc" data-en>The core concept is “the farmer&apos;s kitchen” — a different path from loud, low-cost buffet shabu, a healthy bowl leaning toward natural, low-sodium cooking. The design follows the same principle: plain and honest, without ornament.</p>
            </Reveal>
            <div className="st-insp-grid">
              <Reveal className="st-insp-card"><img src={I('DSCF0053.jpg')} alt="Material" loading="lazy" /><span className="st-caption" data-ko>마테리얼</span><span className="st-caption" data-en>Material</span></Reveal>
              <Reveal className="st-insp-card"><img src={I('DSCF0067.jpg')} alt="Light" loading="lazy" /><span className="st-caption" data-ko>조도</span><span className="st-caption" data-en>Light</span></Reveal>
              <Reveal className="st-insp-card"><img src={I('DSCF0093.jpg')} alt="Tableware" loading="lazy" /><span className="st-caption" data-ko>집기</span><span className="st-caption" data-en>Tableware</span></Reveal>
            </div>
          </div>
        </section>

        {/* ── 03 SPACE ── */}
        <section className="st-section" id="space">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Space</p>
              <h2 className="st-section-title" data-ko>청담의 맥락, 농가의 무드</h2>
              <h2 className="st-section-title" data-en>Cheongdam Context, Farmhouse Mood</h2>
            </Reveal>
            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3 data-ko>균형의 디자인</h3>
                <h3 data-en>Design Of Balance</h3>
                <p data-ko>상하농원의 무드를 고스란히 가져오면서도 청담동의 도시적 맥락과 어울리는 균형이 가장 큰 과제였습니다. 자연 소재와 따뜻한 톤이 농가의 정서를, 정갈한 라인과 절제된 디테일이 청담의 감도를 충족합니다.</p>
                <p data-en>Bringing Sangha Farm&apos;s mood while harmonizing with Cheongdam&apos;s urban context was the biggest challenge — natural materials and warm tones carry the farm&apos;s sentiment, while clean lines and restraint meet Cheongdam&apos;s sensibility.</p>
              </div>
              <div><img src={I('DSCF0097.jpg')} alt="Balanced Interior" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3 data-ko>버크셔K — 본질에 집중하다</h3>
                <h3 data-en>Berkshire K — Focused On Essence</h3>
                <p data-ko>지리산 청정 고원에서 키운 한국형 프리미엄 흑돼지 버크셔K. 시그니처 식재료의 정직함을 공간이 받아내도록, 화려한 장식 대신 자연 마감재와 따뜻한 조도가 식탁을 감쌉니다.</p>
                <p data-en>Berkshire K — Korean premium black pork raised on Jirisan&apos;s pristine highlands. To let its honesty resonate, ornament gave way to natural finishes and warm lighting wrapping the table.</p>
              </div>
              <div><img src={I('DSCF0105.jpg')} alt="Berkshire K Plating" loading="lazy" /></div>
            </Reveal>
          </div>
        </section>

        {/* ── 04 DETAIL ── */}
        <section className="st-section alt" id="detail">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Detail</p>
              <h2 className="st-section-title" data-ko>정갈한 디테일</h2>
              <h2 className="st-section-title" data-en>Quiet Details</h2>
              <p className="st-section-desc" data-ko>VMD부터 식기·사이니지·좌석 디테일까지 — 한 그릇의 샤브가 식탁에 닿기까지의 모든 흐름을 정갈한 디테일로 채웠습니다.</p>
              <p className="st-section-desc" data-en>From VMD to tableware, signage, and seating — every flow leading a bowl of shabu to the table was filled with quiet, considered details.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('DSCF0110.jpg')} alt="Detail 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('DSCF0115.jpg')} alt="Detail 2" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('DSCF0146.jpg')} alt="Detail 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('DSCF0196.jpg')} alt="Detail 4" loading="lazy" /></div>
              <div className="st-item"><img src={I('DSCF0244.jpg')} alt="Detail 5" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 05 CREDIT ── */}
        <section className="st-section" id="credit">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Credit</p>
              <h2 className="st-section-title">Credit</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p data-ko>매일유업 / 엠즈씨드 (상하농원)</p><p data-en>Maeil Dairy / MZ Seed (Sangha Farm)</p></Reveal>
              <Reveal className="st-card"><h4>Brand Experience</h4><p>SPREAD WORKS</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p data-ko>공간 데코 · VMD · 디테일 디렉션</p><p data-en>Spatial Deco · VMD · Detail Direction</p></Reveal>
              <Reveal className="st-card"><h4>Location</h4><p data-ko>서울 청담동 · 2025</p><p data-en>Cheongdam, Seoul · 2025</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #7a8264;
          --secondary: #5d6549;
          --accent-ink: color-mix(in srgb, var(--accent) 72%, #000 28%);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f3f4ee;
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
