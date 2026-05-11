import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'Space' },
  { id: 'detail', label: 'Detail' },
  { id: 'credit', label: 'Credit' },
];

const HERO_META = [
  { label: 'Project', value: 'SHABU SANGHA · 샤브식당 상하' },
  { label: 'Category', value: 'F&B / Deco' },
  { label: 'Year', value: '2025' },
  { label: 'Scope', value: 'Spatial Decoration · VMD · Brand Experience' },
  { label: 'Location', value: 'Cheongdam, Seoul' },
];

const I = (name) => `/images/shabusangha/${name}`;

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

export default function ShabuSangha() {
  return (
    <>
      <Head>
        <title>SHABU SANGHA — Spatial Deco · Cheongdam</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#7a8264" />

      <ProjectHero
        title={"SHABU\nSANGHA"}
        label="Spatial Deco · VMD · Brand Experience"
        image={I('DSCF0005.jpg')}
        subtitleKo="고창 상하농원의 진정성과 상생의 철학을 청담의 맥락으로 옮긴 샤브 식당. 농부의 부엌이라는 컨셉 아래 공간의 정갈한 디테일을 완성했습니다."
        subtitleEn="A shabu restaurant that translates the authenticity and coexistence philosophy of Sangha Farm into the context of Cheongdam — completing every spatial detail under the concept of a farmer's kitchen."
        meta={HERO_META}
      />

      {/* ── 01 BRAND STORY ── */}
      <section className="brand-story" id="story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Brand Story</p>
            <h2 className="section-title" data-ko>고창에서 청담까지,<br />상하농원의 철학을 담다</h2>
            <h2 className="section-title" data-en>From Gochang To Cheongdam,<br />Carrying Sangha&apos;s Philosophy</h2>
            <p className="section-desc" data-ko>샤브식당 상하는 단순한 식당이 아닙니다. 상하농원이 오랜 시간 지켜온 진정성과 상생의 철학을 도시의 식탁 위에 옮겨 놓은 공간입니다. 한 그릇의 샤브샤브 안에 농가의 이야기와 농부의 손길이 담겨 있도록, 메뉴부터 공간 디테일까지 정성스럽게 설계되었습니다.</p>
            <p className="section-desc" data-en>SHABU SANGHA is more than a restaurant — it is a space that carries the authenticity and the spirit of coexistence that Sangha Farm has nurtured for years, now placed onto the urban table. Every detail, from the menu to the spatial details, was crafted so that a single bowl of shabu could hold the story of the farm and the touch of the farmer.</p>
          </FadeIn>
          <div className="story-grid">
            <FadeIn className="story-text">
              <div className="story-keywords">
                <span className="keyword">Authentic</span>
                <span className="keyword">Farm-to-Table</span>
                <span className="keyword">Berkshire K</span>
              </div>
            </FadeIn>
            <FadeIn className="story-visual">
              <img src={I('DSCF0012.jpg')} alt="SHABU SANGHA Interior" loading="lazy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 CONCEPT ── */}
      <section id="concept">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Concept</p>
            <h2 className="section-title" data-ko>농부의 부엌</h2>
            <h2 className="section-title" data-en>The Farmer&apos;s Kitchen</h2>
            <p className="section-desc" data-ko>샤브식당 상하의 핵심 컨셉은 &lsquo;농부의 부엌&rsquo;입니다. 자극적인 저가형 뷔페식 샤브샤브와는 다른 길 — 간을 세게 하지 않고, 자연식·저염식에 가까운 건강한 한 그릇을 지향합니다. 그래서 디자인 또한 기교 없이 담백하게, 음식의 맛처럼 브랜드의 진심을 그대로 표현했습니다.</p>
            <p className="section-desc" data-en>The core concept of SHABU SANGHA is &ldquo;the farmer&apos;s kitchen.&rdquo; A different path from the loud, low-cost buffet-style shabu — a healthy bowl that leans toward natural, low-sodium cooking. The design follows the same principle: plain and honest, without ornament, expressing the brand&apos;s sincerity the way the food does.</p>
          </FadeIn>
          <div className="concept-grid">
            <FadeIn className="concept-card">
              <img src={I('DSCF0053.jpg')} alt="Material Detail" loading="lazy" />
              <span className="caption" data-ko>마테리얼</span>
              <span className="caption" data-en>Material</span>
            </FadeIn>
            <FadeIn className="concept-card">
              <img src={I('DSCF0067.jpg')} alt="Lighting Detail" loading="lazy" />
              <span className="caption" data-ko>조도</span>
              <span className="caption" data-en>Light</span>
            </FadeIn>
            <FadeIn className="concept-card">
              <img src={I('DSCF0093.jpg')} alt="Tableware Detail" loading="lazy" />
              <span className="caption" data-ko>집기</span>
              <span className="caption" data-en>Tableware</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 03 SPACE ── */}
      <section className="brand-story" id="space">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Space</p>
            <h2 className="section-title" data-ko>청담의 맥락,<br />농가의 무드</h2>
            <h2 className="section-title" data-en>Cheongdam Context,<br />Farmhouse Mood</h2>
          </FadeIn>

          {/* Concept block 1 */}
          <FadeIn className="concept-block">
            <div className="concept-text">
              <h3 data-ko>균형의 디자인</h3>
              <h3 data-en>Design Of Balance</h3>
              <p data-ko>상하농원의 무드를 고스란히 가져오면서도, 청담동이라는 도시적 맥락과 어울리는 균형이 가장 큰 과제였습니다. 자연 소재와 따뜻한 톤은 농가의 정서를 전하고, 정갈한 라인과 절제된 디테일은 청담의 감도를 충족합니다.</p>
              <p data-en>Bringing the mood of Sangha Farm while harmonizing with the urban context of Cheongdam was the biggest challenge. Natural materials and warm tones carry the sentiment of the farm, while clean lines and restrained details meet Cheongdam&apos;s sensibility.</p>
            </div>
            <div className="concept-img">
              <img src={I('DSCF0097.jpg')} alt="Balanced Interior" loading="lazy" />
            </div>
          </FadeIn>

          {/* Concept block 2 — reverse */}
          <FadeIn className="concept-block reverse" style={{ marginTop: 80 }}>
            <div className="concept-text">
              <h3 data-ko>버크셔K — 본질에 집중하다</h3>
              <h3 data-en>Berkshire K — Focused On Essence</h3>
              <p data-ko>지리산 청정 고원에서 키운 한국형 프리미엄 흑돼지 버크셔K. 시그니처 식재료의 정직함을 공간이 그대로 받아내도록, 화려한 장식 대신 자연 마감재와 따뜻한 조도가 식탁을 감쌉니다. 손님은 음식 본연의 맛에 먼저 집중하게 됩니다.</p>
              <p data-en>Berkshire K — a Korean premium black pork raised on the pristine highlands of Jirisan. To let the honesty of this signature ingredient resonate in the space, ornament gave way to natural finishes and warm lighting that wrap the table. Guests are invited to focus first on the essence of the food itself.</p>
            </div>
            <div className="concept-img">
              <img src={I('DSCF0105.jpg')} alt="Berkshire K Plating" loading="lazy" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 04 DETAIL ── */}
      <section id="detail">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Detail</p>
            <h2 className="section-title" data-ko>정갈한 디테일</h2>
            <h2 className="section-title" data-en>Quiet Details</h2>
            <p className="section-desc" data-ko>VMD부터 식기, 사이니지, 좌석 디테일까지 — 한 그릇의 샤브가 식탁에 닿기까지의 모든 흐름을 정갈한 디테일로 채웠습니다.</p>
            <p className="section-desc" data-en>From VMD to tableware, signage, and seating details — every flow that leads a bowl of shabu to the table was filled with quiet, considered details.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('DSCF0110.jpg')} alt="Detail 1" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('DSCF0115.jpg')} alt="Detail 2" loading="lazy" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('DSCF0146.jpg')} alt="Detail 3" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('DSCF0196.jpg')} alt="Detail 4" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('DSCF0244.jpg')} alt="Detail 5" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── 05 CREDIT ── */}
      <section className="credit" id="credit">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">05 — Credit</p>
            <h2 className="section-title" data-ko>크레딧</h2>
            <h2 className="section-title" data-en>Credit</h2>
          </FadeIn>
          <dl className="credit-grid">
            <div className="credit-item">
              <dt>Client</dt>
              <dd data-ko>매일유업 / 엠즈씨드 (상하농원)</dd>
              <dd data-en>Maeil Dairy / MZ Seed (Sangha Farm)</dd>
            </div>
            <div className="credit-item">
              <dt>Brand Experience</dt>
              <dd>SPREAD WORKS</dd>
            </div>
            <div className="credit-item">
              <dt>Role</dt>
              <dd data-ko>공간 데코<br />VMD<br />디테일 디렉션</dd>
              <dd data-en>Spatial Deco<br />VMD<br />Detail Direction</dd>
            </div>
            <div className="credit-item">
              <dt>Location</dt>
              <dd data-ko>서울 청담동</dd>
              <dd data-en>Cheongdam, Seoul</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <ProjectFooter
        prevProject={{ name: 'GAGGA', href: '/projects/gagga' }}
        nextProject={{ name: 'TOFU · G', href: '/projects/tofug' }}
      />

      <style jsx>{`
        /* ===== SHABU SANGHA THEME ===== */
        :global(:root) {
          --warm: #7a8264;
          --warm-dark: #5d6549;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f5f3ef;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
          --keyword-border: #1a1a1a;
          --keyword-color: #1a1a1a;
        }
        :global(html[data-theme='dark']) {
            --page-bg: #0c0c0c;
            --page-fg: #e8e8e8;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --gray: #999;
            --border-light: rgba(255,255,255,0.08);
            --border-subtle: rgba(255,255,255,0.05);
            --nav-scrolled-bg: rgba(12,12,12,0.9);
            --keyword-border: #e8e8e8;
            --keyword-color: #e8e8e8;
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
          aspect-ratio: 4/3;
        }
        .story-grid :global(.story-visual) img { width: 100%; height: 100%; object-fit: cover; }
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
        :global(.concept-card) {
          position: relative; overflow: hidden; border-radius: 4px;
          aspect-ratio: 1; background: var(--section-bg);
        }
        :global(.concept-card) img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        :global(.concept-card:hover) img { transform: scale(1.05); }
        :global(.concept-card) .caption {
          position: absolute; bottom: 20px; left: 20px; color: #fff;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 500; background: rgba(0,0,0,0.4); padding: 8px 16px;
          border-radius: 2px; backdrop-filter: blur(4px);
        }

        /* ===== CONCEPT BLOCK ===== */
        :global(.concept-block) {
          display: grid; grid-template-columns: 1fr 1.2fr;
          gap: 60px; align-items: center; margin-top: 60px;
        }
        :global(.concept-block.reverse) { grid-template-columns: 1.2fr 1fr; }
        :global(.concept-block.reverse) .concept-text { order: 1; }
        :global(.concept-block.reverse) .concept-img { order: 0; }
        .concept-img { border-radius: 4px; overflow: hidden; }
        .concept-img img { width: 100%; display: block; transition: transform 0.6s ease; }
        .concept-img:hover img { transform: scale(1.03); }
        .concept-text h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; letter-spacing: 3px; margin-bottom: 16px;
        }
        .concept-text p {
          font-size: 14px; line-height: 1.9; color: var(--text-mid); font-weight: 300;
        }

        /* ===== GALLERY ===== */
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .gallery-3col {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .gallery-item { overflow: hidden; border-radius: 4px; }
        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.6s ease;
          aspect-ratio: 4/3;
        }
        .gallery-item:hover img { transform: scale(1.04); }

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
          font-size: 14px; font-weight: 500; color: var(--page-fg);
          line-height: 1.6;
        }

        /* ===== FADE-IN ===== */
        :global(.fade-in) {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1; transform: translateY(0);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 32px; }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .concept-grid { grid-template-columns: 1fr; }
          :global(.concept-block),
          :global(.concept-block.reverse) {
            grid-template-columns: 1fr; gap: 32px;
          }
          :global(.concept-block.reverse) .concept-text,
          :global(.concept-block.reverse) .concept-img {
            order: initial;
          }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-3col { grid-template-columns: 1fr; }
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
