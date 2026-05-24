import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'space', label: 'Space' },
  { id: 'concept', label: 'Concept' },
  { id: 'details', label: 'Details' },
  { id: 'materials', label: 'Materials' },
  { id: 'poster', label: 'Poster' },
  { id: 'film', label: 'Film' },
  { id: 'extras', label: 'Extras' },
];

const HERO_META = [
  { label: 'Work Scope', value: 'Space, Branding, SI Design' },
  { label: 'Location', value: 'Hanwha Galleria Seoul' },
  { label: 'Year', value: '2024' },
];

const I = (name) => `/images/benson/${name}`;

const CONCEPT_ITEMS = [
  { n: '1', ko: '내부와 이어지는 파사드 디자인', en: 'Facade design flowing seamlessly into the interior' },
  { n: '2', ko: '외부와 내부를 연결하는 천장 조형물', en: 'Ceiling sculptural element connecting exterior and interior' },
  { n: '3', ko: '외부와 내부를 연결하는 실내 취식 공간', en: 'Indoor dining area bridging outdoor and indoor zones' },
  { n: '4', ko: '아이스크림 카운터와 전면 창의 곡선이 어우러지는 디자인', en: 'Ice cream counter harmonized with the curved front window' },
  { n: '5', ko: '벤치에서 테이블로 이어지는 곡선형 메인 퍼니처', en: 'Curved main furniture flowing from bench to table' },
];

const DETAIL_ITEMS = [
  { n: '9', ko: '벤슨 아이스크림의 플레이버를 설명하는 페그보드 VMD', en: "Pegboard VMD showcasing Benson's ice cream flavors" },
  { n: '11', ko: '스트릿 무드를 표현한 바닥과 곡선 디자인', en: 'Street-mood flooring and curved design' },
  { n: '10', ko: '보드 형태에서 모티브를 받은 스탠딩 테이블', en: 'Standing tables inspired by skateboard forms' },
];

const MATERIALS = [
  { name: 'METAL', hex: '#A8A8A8', bg: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)', text: '#1a1a1a', ko: '헤어라인 실버 메탈', en: 'Hairline silver metal' },
  { name: 'CONCRETE', hex: '#707070', bg: 'linear-gradient(135deg, #808080, #606060)', text: '#fff', ko: '시멘트 콘크리트', en: 'Cement concrete' },
  { name: 'EPOXY (MATTE)', hex: '#1F1F1F', bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', text: '#fff', ko: '에폭시 무광 코팅', en: 'Matte-coated epoxy' },
  { name: 'PAINT', hex: '#EFE6D4', bg: 'linear-gradient(135deg, #f5efe0, #e8dcc8)', text: '#1a1a1a', ko: '도장 마감', en: 'Painted finish' },
  { name: 'BIRCH WOOD', hex: '#CCA888', bg: 'linear-gradient(135deg, #d4b896, #c4a87a)', text: '#1a1a1a', ko: '자작목', en: 'Natural birch plywood' },
  { name: 'ENGINEERED STONE', hex: '#DCCEB4', bg: 'linear-gradient(135deg, #e2d5c0, #d5c5a8)', text: '#1a1a1a', ko: '인조대리석', en: 'Engineered marble' },
  { name: 'RED TILE', hex: '#CC0000', bg: '#CC0000', text: '#fff', ko: '레드 포인트 타일', en: 'Accent red tile' },
];

const EXTRAS = [
  'extra-scoop.png', 'extra-storefront-window.png', 'extra-overhead-flatlay.png',
  'extra-puddle.png', 'extra-birdseye.png', 'extra-silhouette.png',
  'extra-hands.png', 'extra-product-closeup.png', 'extra-drizzle.png',
  'extra-skater-feet.png', 'extra-skater-editorial.png', 'extra-product-lifestyle.png',
  'extra-melt.png', 'extra-cup-skateboard.png', 'extra-product-flatlay.png',
  'extra-cups-arranged.png', 'extra-product-detail.png', 'extra-packaging.png',
  'extra-product-artful.png', 'extra-product-multi.png', 'extra-cup-concrete.png',
  'extra-poster-ice-cream.png', 'extra-stilllife.png', 'extra-product-stylized.png',
  'extra-urban-street.png',
];

const Star = ({ className = '' }) => (
  <svg className={`star ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 1 L13.5 9.5 L22 8 L15.5 13.5 L20 22 L12 17 L4 22 L8.5 13.5 L2 8 L10.5 9.5 Z"
      fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

function CornerTags({ left = 'BENSON', right = '2024' }) {
  return (
    <div className="corner-tags" aria-hidden="true">
      <span className="corner-tag corner-tag-left"><Star /> {left}</span>
      <span className="corner-tag corner-tag-right">{right} <Star /></span>
    </div>
  );
}

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

export default function Benson() {
  return (
    <>
      <Head>
        <title>BENSON Ice Cream — Flagship Store</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#CC0000" />

      <ProjectHero
        title="BENSON"
        label="Brand Space Concept &amp; Strategy"
        image={I('facade.png')}
        subtitleKo={'미국 스트릿 디저트의 다이내믹한 에너지를 담은\n벤슨 아이스크림 플래그십 스토어'}
        subtitleEn={'A flagship ice cream store capturing the dynamic energy\nof authentic American street dessert culture.'}
        meta={HERO_META}
      />

      {/* ── 01 SPACE ── */}
      <section className="bsec bsec-space" id="space">
        <CornerTags left="BENSON" right="STOREFRONT" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 01 / Space</p>
            <h2 className="display-title">STOREFRONT<br/>&amp; INTERIOR</h2>
            <div className="display-tagline">
              <span className="hash">#facade</span>
              <span className="hash">#interior</span>
              <span className="hash">#flagship</span>
            </div>
          </FadeIn>

          {/* 2-col: large hero interior + architectural detail */}
          <div className="space-row space-row-2">
            <FadeIn className="space-cell space-cell-wide">
              <img src={I('interior-1.png')} alt="Interior — main view" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('space-architectural.png')} alt="Architectural detail" />
            </FadeIn>
          </div>

          {/* 3-col interior series */}
          <div className="space-row space-row-3">
            <FadeIn className="space-cell">
              <img src={I('interior-2.png')} alt="Interior — counter" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('interior-3.png')} alt="Interior — seating" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('interior-4.png')} alt="Interior — display" />
            </FadeIn>
          </div>

          {/* 2-col: facade + secondary detail */}
          <div className="space-row space-row-2 space-row-2-even">
            <FadeIn className="space-cell">
              <img src={I('facade.png')} alt="Facade" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('space-detail.jpg')} alt="Space detail" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04 DESIGN CONCEPT ── */}
      <section className="bsec bsec-concept bsec-red" id="concept">
        <CornerTags left="04 / CONCEPT" right="OUTDOOR → INSIDE" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label display-label-on-red"><Star /> 04 / Design Concept</p>
            <h2 className="display-title display-title-on-red">
              OUTDOOR ZONE<br/>
              <span className="display-arrow">→</span>&nbsp;CONNECT INSIDE
            </h2>
          </FadeIn>

          <FadeIn>
            <p className="lead lead-on-red" data-ko>
              벤슨 아이스크림 샵은 폴딩도어와 전면 곡선으로 부드럽게 이어지는 파사드 구조물, 매장 전체를 관통하는 사이니지, 벤치-테이블로 이어지는 곡선형 메인 퍼니처를 이용해 내외부를 연결함으로써, 내부 뿐 아니라 외부에서도 벤슨 아이스크림을 즐길 수 있는 아웃도어 형태로 디자인하였습니다.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="lead lead-on-red" data-en>
              By connecting interior and exterior through folding doors, a gently curving facade, store-spanning signage, and a flowing bench-to-table main furniture piece, the Benson Ice Cream shop is designed as an outdoor-oriented space where guests can enjoy ice cream both inside and out.
            </p>
          </FadeIn>

          <FadeIn className="concept-feature">
            <img src={I('interior-1.png')} alt="Design concept — outdoor connect" />
          </FadeIn>

          <div className="value-grid">
            {CONCEPT_ITEMS.map(({ n, ko, en }) => (
              <FadeIn className="value-card" key={n}>
                <div className="value-num">{n}</div>
                <div className="value-body">
                  <span className="value-text" data-ko>{ko}</span>
                  <span className="value-text" data-en>{en}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 DESIGN DETAILS ── */}
      <section className="bsec bsec-details" id="details">
        <CornerTags left="05 / DETAILS" right="SHAPE & MOTIF" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 05 / Design Details</p>
            <h2 className="display-title">SHAPE<br/>&amp; MOTIF</h2>
          </FadeIn>

          <div className="details-split">
            <FadeIn className="details-image">
              <img src={I('interior-3.png')} alt="Design detail — sub-culture motif" />
            </FadeIn>
            <div className="details-list">
              {DETAIL_ITEMS.map(({ n, ko, en }) => (
                <FadeIn className="detail-card" key={n}>
                  <div className="detail-num">{n}</div>
                  <div className="detail-body">
                    <span className="detail-text" data-ko>{ko}</span>
                    <span className="detail-text" data-en>{en}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 MATERIALS ── */}
      <section className="bsec bsec-materials" id="materials">
        <CornerTags left="06 / MATERIALS" right="RAW MATERIAL" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 06 / Materials</p>
            <h2 className="display-title">RAW<br/>MATERIAL</h2>
          </FadeIn>

          <div className="materials-intro">
            <FadeIn>
              <p className="lead" data-ko>
                전체적으로 외부 트랙에서 사용하는 콘크리트와 같은 익스트림하고 로우한 소재를 활용해, 메탈소재로 현대적이고 세련된 이미지를, 콘크리트와 에폭시로 벤슨의 스트릿한 브랜드 무드를 표현하였습니다.
              </p>
            </FadeIn>
            <FadeIn>
              <p className="lead" data-en>
                Raw, extreme materials like concrete &mdash; reminiscent of outdoor skate tracks &mdash; are paired with metal for a modern, refined image, while concrete and epoxy finishes convey Benson&apos;s street-inspired brand mood.
              </p>
            </FadeIn>
            <FadeIn className="materials-feature">
              <img src={I('space-architectural.png')} alt="Material atmosphere" />
            </FadeIn>
          </div>

          <div className="material-blocks">
            {MATERIALS.map((m, idx) => (
              <FadeIn className="mat-block" key={m.name} style={{ background: m.bg, color: m.text }}>
                <div className="mat-block-head">
                  <span className="mat-idx">M.0{idx + 1}</span>
                  <Star className="mat-star" />
                </div>
                <div className="mat-block-name">{m.name}</div>
                <div className="mat-block-hex">{m.hex}</div>
                <div className="mat-block-desc">
                  <span data-ko>{m.ko}</span>
                  <span data-en>{m.en}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 POSTER ── */}
      <section className="bsec bsec-poster bsec-red" id="poster">
        <CornerTags left="02 / POSTER" right="VISUAL IDENTITY" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label display-label-on-red"><Star /> 02 / Poster</p>
            <h2 className="display-title display-title-on-red">VISUAL<br/>IDENTITY</h2>
          </FadeIn>

          <FadeIn className="poster-frame">
            <img src={I('poster.png')} alt="BENSON poster" />
          </FadeIn>
        </div>
      </section>

      {/* ── 03 FILM ── */}
      <section className="bsec bsec-film" id="film">
        <CornerTags left="03 / FILM" right="BRAND FILM" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label display-label-on-dark"><Star /> 03 / Film</p>
            <h2 className="display-title display-title-on-dark">BRAND<br/>FILM</h2>
          </FadeIn>

          <FadeIn className="film-frame">
            <video
              src={I('video.mp4')}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 04 EXTRAS ── */}
      <section className="bsec bsec-extras" id="extras">
        <CornerTags left="04 / EXTRAS" right="SUPPLEMENTARY" />
        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 04 / Extras</p>
            <h2 className="display-title">SUPPLE-<br/>MENTARY</h2>
          </FadeIn>

          <div className="extras-grid">
            {EXTRAS.map((name) => (
              <FadeIn key={name} className="extras-cell">
                <img src={I(name)} alt={name.replace(/^extra-/, '').replace(/\.[a-z]+$/, '').replace(/-/g, ' ')} loading="lazy" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'TOFUG', href: '/projects/tofug' }}
        nextProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
      />

      <style jsx>{`
        :global(:root) {
          --benson-red: #CC0000;
          --dark: #1a1a1a;
          --light: #f5f2ed;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f5f2ed;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
        }
        :global(html[data-theme='dark']) {
          --page-bg: #0c0c0c;
          --page-fg: #e8e8e8;
          --section-bg: #1a1a1a;
          --text-mid: #aaa;
          --text-light: #999;
          --gray: #999;
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== I18N ===== */
        :global([data-en]) { display: none; }
        :global(html[lang="en"] [data-ko]) { display: none; }
        :global(html[lang="en"] [data-en]) { display: inline; }
        :global(html[lang="en"] p[data-en]),
        :global(html[lang="en"] h2[data-en]),
        :global(html[lang="en"] div[data-en]),
        :global(html[lang="en"] span[data-en]) { display: block; }
        :global(html[lang="ko"] p[data-ko]),
        :global(html[lang="ko"] h2[data-ko]),
        :global(html[lang="ko"] div[data-ko]),
        :global(html[lang="ko"] span[data-ko]) { display: block; }
        :global(html[lang="ko"] p[data-en]),
        :global(html[lang="ko"] h2[data-en]),
        :global(html[lang="ko"] div[data-en]),
        :global(html[lang="ko"] span[data-en]) { display: none; }

        :global(.fade-in) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== Star (red asterisk accent) ===== */
        :global(.star) {
          width: 1em;
          height: 1em;
          display: inline-block;
          color: var(--benson-red);
          vertical-align: -0.15em;
          flex-shrink: 0;
        }

        /* ===== Section shell + corner tags ===== */
        .bsec {
          position: relative;
          padding: 140px 60px 120px;
          background: var(--page-bg);
          color: var(--page-fg);
          overflow: hidden;
        }
        .bsec-inner { max-width: var(--max-width); margin: 0 auto; position: relative; }
        :global(.corner-tags) {
          position: absolute;
          top: 32px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 60px;
          pointer-events: none;
          z-index: 2;
        }
        :global(.corner-tag) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--page-fg);
        }
        .bsec-red :global(.corner-tag),
        .bsec-film :global(.corner-tag) { color: rgba(255,255,255,0.85); }
        .bsec-film :global(.corner-tag .star) { color: var(--benson-red); }

        /* ===== Display title block ===== */
        :global(.display-block) {
          margin-bottom: 80px;
        }
        .display-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--benson-red);
          margin-bottom: 24px;
          font-weight: 600;
        }
        .display-label-on-red { color: #fff; }
        .display-label-on-red :global(.star) { color: #fff; }
        .display-label-on-dark { color: var(--benson-red); }

        .display-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 11vw, 180px);
          line-height: 0.88;
          letter-spacing: -2px;
          margin: 0;
        }
        .display-title-on-red { color: #fff; }
        .display-title-on-dark { color: #fff; }
        .display-arrow {
          color: var(--benson-red);
          background: #fff;
          padding: 0 0.15em;
          display: inline-block;
          line-height: 1;
        }

        .display-tagline {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .hash {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 3px;
          color: var(--text-mid);
          padding: 6px 14px;
          border: 1px solid var(--border-light);
          border-radius: 999px;
        }

        .lead {
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.9;
          color: var(--text-mid);
          max-width: 760px;
          font-weight: 300;
          margin: 0 0 24px;
          word-break: keep-all;
        }
        .lead-on-red {
          color: rgba(255,255,255,0.92);
          max-width: 880px;
        }

        /* ===== Section variants ===== */
        .bsec-space { background: var(--page-bg); }
        .bsec-concept.bsec-red,
        .bsec-poster.bsec-red {
          background: var(--benson-red);
          color: #fff;
        }
        .bsec-details { background: var(--section-bg); }
        .bsec-materials { background: var(--page-bg); }
        .bsec-film { background: var(--dark); color: #fff; }
        .bsec-extras { background: var(--page-bg); }

        /* ===== Space grid ===== */
        .space-row {
          display: grid;
          gap: 20px;
          margin-bottom: 20px;
        }
        .space-row-2 { grid-template-columns: 1.6fr 1fr; }
        .space-row-2-even { grid-template-columns: 1fr 1fr; }
        .space-row-3 { grid-template-columns: repeat(3, 1fr); }
        :global(.space-cell) {
          overflow: hidden;
          border-radius: 2px;
          background: var(--section-bg);
          position: relative;
        }
        :global(.space-cell) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          display: block;
          transition: transform 0.6s ease;
        }
        :global(.space-cell:hover) img { transform: scale(1.02); }
        :global(.space-cell-wide) img { aspect-ratio: 16 / 10; }

        /* ===== Concept (red bg) ===== */
        :global(.concept-feature) {
          margin: 64px 0 80px;
          overflow: hidden;
          border-radius: 2px;
          border: 4px solid #fff;
          background: #fff;
        }
        :global(.concept-feature) img {
          width: 100%;
          display: block;
        }
        .value-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          background: rgba(255,255,255,0.18);
          padding: 4px;
        }
        :global(.value-card) {
          background: var(--benson-red);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 240px;
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
        }
        .value-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 64px;
          line-height: 1;
          letter-spacing: -2px;
          color: #fff;
        }
        .value-body {
          margin-top: auto;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 300;
          color: rgba(255,255,255,0.92);
          word-break: keep-all;
        }
        .value-text { display: block; }

        /* ===== Details (beige bg) ===== */
        .details-split {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: stretch;
        }
        :global(.details-image) {
          overflow: hidden;
          border-radius: 2px;
        }
        :global(.details-image) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          display: block;
        }
        .details-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }
        :global(.detail-card) {
          background: var(--page-bg);
          padding: 28px 28px;
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 24px;
          align-items: center;
          border-left: 4px solid var(--benson-red);
        }
        .detail-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 56px;
          line-height: 1;
          letter-spacing: -1px;
          color: var(--benson-red);
        }
        .detail-body {
          font-size: 14px;
          line-height: 1.7;
          font-weight: 300;
          color: var(--text-mid);
          word-break: keep-all;
        }
        .detail-text { display: block; }

        /* ===== Materials (3-col flat blocks per Pattern C) ===== */
        .materials-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 60px;
        }
        :global(.materials-feature) {
          overflow: hidden;
          border-radius: 2px;
        }
        :global(.materials-feature) img {
          width: 100%;
          display: block;
        }
        .material-blocks {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        :global(.mat-block) {
          padding: 24px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          border-radius: 2px;
          transition: transform 0.35s ease;
        }
        :global(.mat-block:hover) { transform: translateY(-4px); }
        .mat-block-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          opacity: 0.8;
        }
        :global(.mat-block) .mat-star { color: currentColor; opacity: 0.8; }
        .mat-block-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 1.8vw, 28px);
          letter-spacing: 1px;
          margin-top: 32px;
          line-height: 1;
        }
        .mat-block-hex {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          opacity: 0.7;
          margin-top: 6px;
        }
        .mat-block-desc {
          margin-top: auto;
          font-size: 13px;
          line-height: 1.5;
          font-weight: 300;
          opacity: 0.92;
          word-break: keep-all;
        }
        .mat-block-desc span { display: block; }

        /* ===== Poster ===== */
        :global(.poster-frame) {
          overflow: hidden;
          border-radius: 2px;
          background: #fff;
          padding: 12px;
        }
        :global(.poster-frame) img {
          width: 100%;
          display: block;
        }

        /* ===== Film ===== */
        :global(.film-frame) {
          overflow: hidden;
          border-radius: 2px;
          background: #000;
          border: 4px solid var(--benson-red);
        }
        :global(.film-frame) video {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ===== Extras ===== */
        .extras-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        :global(.extras-cell) {
          overflow: hidden;
          border-radius: 2px;
          background: var(--section-bg);
        }
        :global(.extras-cell) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1 / 1;
          display: block;
          transition: transform 0.6s ease;
        }
        :global(.extras-cell:hover) img { transform: scale(1.04); }

        /* ===== Responsive ===== */
        @media (max-width: 1100px) {
          .bsec { padding: 100px 40px 80px; }
          :global(.corner-tags) { padding: 0 40px; top: 24px; }
          .value-grid { grid-template-columns: repeat(2, 1fr); }
          .material-blocks { grid-template-columns: repeat(2, 1fr); }
          .details-split { grid-template-columns: 1fr; }
          .materials-intro { grid-template-columns: 1fr; }
          .extras-grid { grid-template-columns: repeat(3, 1fr); }
          .space-row-2,
          .space-row-2-even { grid-template-columns: 1fr; }
          .space-row-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .bsec { padding: 80px 24px 60px; }
          :global(.corner-tags) { padding: 0 24px; top: 18px; font-size: 10px; }
          :global(.corner-tag) { font-size: 10px; letter-spacing: 2px; }
          .value-grid { grid-template-columns: 1fr; }
          .material-blocks { grid-template-columns: 1fr; }
          .extras-grid { grid-template-columns: repeat(2, 1fr); }
          .space-row-3 { grid-template-columns: 1fr; }
          :global(.detail-card) { grid-template-columns: 60px 1fr; padding: 20px; }
          .detail-num { font-size: 40px; }
        }
      `}</style>
    </>
  );
}
