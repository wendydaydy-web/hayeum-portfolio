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

const I  = (name) => `/images/benson/${name}`;
const ST = (name) => `/images/benson/sticker/${name}`;

const CONCEPT_ITEMS = [
  { n: '01', ko: '내부와 이어지는 파사드 디자인', en: 'Facade design flowing seamlessly into the interior' },
  { n: '02', ko: '외부와 내부를 연결하는 천장 조형물', en: 'Ceiling sculptural element connecting exterior and interior' },
  { n: '03', ko: '외부와 내부를 연결하는 실내 취식 공간', en: 'Indoor dining area bridging outdoor and indoor zones' },
  { n: '04', ko: '아이스크림 카운터와 전면 창의 곡선이 어우러지는 디자인', en: 'Ice cream counter harmonized with the curved front window' },
  { n: '05', ko: '벤치에서 테이블로 이어지는 곡선형 메인 퍼니처', en: 'Curved main furniture flowing from bench to table' },
];

const DETAIL_ITEMS = [
  { n: '09', ko: '벤슨 아이스크림의 플레이버를 설명하는 페그보드 VMD', en: "Pegboard VMD showcasing Benson's ice cream flavors" },
  { n: '11', ko: '스트릿 무드를 표현한 바닥과 곡선 디자인', en: 'Street-mood flooring and curved design' },
  { n: '10', ko: '보드 형태에서 모티브를 받은 스탠딩 테이블', en: 'Standing tables inspired by skateboard forms' },
];

const MATERIALS = [
  { name: 'METAL', hex: '#A8A8A8', swatch: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)', ko: '헤어라인 실버 메탈', en: 'Hairline silver metal' },
  { name: 'CONCRETE', hex: '#707070', swatch: 'linear-gradient(135deg, #808080, #606060)', ko: '시멘트 콘크리트', en: 'Cement concrete' },
  { name: 'EPOXY (MATTE)', hex: '#1F1F1F', swatch: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', ko: '에폭시 무광 코팅', en: 'Matte-coated epoxy' },
  { name: 'PAINT', hex: '#EFE6D4', swatch: 'linear-gradient(135deg, #f5efe0, #e8dcc8)', ko: '도장 마감', en: 'Painted finish' },
  { name: 'BIRCH WOOD', hex: '#CCA888', swatch: 'linear-gradient(135deg, #d4b896, #c4a87a)', ko: '자작목', en: 'Natural birch plywood' },
  { name: 'ENGINEERED STONE', hex: '#DCCEB4', swatch: 'linear-gradient(135deg, #e2d5c0, #d5c5a8)', ko: '인조대리석', en: 'Engineered marble' },
  { name: 'RED TILE', hex: '#CC0000', swatch: '#CC0000', ko: '레드 포인트 타일', en: 'Accent red tile' },
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

/* ── Visual primitives ── */
const Star = ({ className = '' }) => (
  <svg className={`star ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 1 L13.5 9.5 L22 8 L15.5 13.5 L20 22 L12 17 L4 22 L8.5 13.5 L2 8 L10.5 9.5 Z"
      fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

/* Ice-cream bucket badge — red trapezoid (wider top, narrower bottom),
   white number inside. A subtle white stroke keeps the silhouette
   readable when the badge sits on the red panel background. */
const Bucket = ({ n, className = '' }) => (
  <svg className={`bucket ${className}`} viewBox="0 0 64 64" aria-hidden="true">
    <path
      d="M 7 8 L 57 8 L 51 58 L 13 58 Z"
      fill="#c8111a"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <text
      x="32" y="36"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="'Bebas Neue', sans-serif"
      fontSize="24"
      fontWeight="700"
      fill="#ffffff"
      letterSpacing="0.5"
    >{n}</text>
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

function Sticker({ src, top, left, right, bottom, w = '180px', rot = 0, z = 3, className = '' }) {
  const style = { width: w, transform: `rotate(${rot}deg)`, zIndex: z };
  if (top    !== undefined) style.top = top;
  if (left   !== undefined) style.left = left;
  if (right  !== undefined) style.right = right;
  if (bottom !== undefined) style.bottom = bottom;
  return <img src={src} alt="" className={`sticker ${className}`} style={style} aria-hidden="true" loading="lazy" />;
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

      {/* ── 01 SPACE — Best-Project overlap composition ── */}
      <section className="bsec bsec-space" id="space">
        <CornerTags left="BENSON" right="STOREFRONT" />
        <Sticker src={ST('accents.png')} top="120px"  right="40px"  w="180px" rot={9}  />
        <Sticker src={ST('icons.png')}   bottom="80px" left="-30px"  w="220px" rot={-12} />

        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 01 / Space</p>
            <h2 className="display-title">STOREFRONT<br/>&amp; INTERIOR</h2>
          </FadeIn>

          {/* overlap collage — 참고1 page 11 (Best Project) inspired */}
          <div className="space-collage">
            <FadeIn className="collage-photo collage-1">
              <img src={I('interior-1.png')} alt="Interior — main view" />
            </FadeIn>
            <FadeIn className="collage-photo collage-2">
              <img src={I('space-architectural.png')} alt="Architectural detail" />
            </FadeIn>
            <FadeIn className="collage-photo collage-3">
              <img src={I('space-detail.jpg')} alt="Space detail" />
            </FadeIn>
            <div className="collage-tag">
              <Star /> Flagship<br/>since 2024
            </div>
          </div>

          {/* 3-col strip */}
          <div className="strip-row strip-3">
            <FadeIn className="strip-cell">
              <img src={I('interior-2.png')} alt="Interior — counter" />
            </FadeIn>
            <FadeIn className="strip-cell">
              <img src={I('interior-3.png')} alt="Interior — seating" />
            </FadeIn>
            <FadeIn className="strip-cell">
              <img src={I('interior-4.png')} alt="Interior — display" />
            </FadeIn>
          </div>

          <div className="strip-row strip-2">
            <FadeIn className="strip-cell strip-wide">
              <img src={I('facade.png')} alt="Facade" />
            </FadeIn>
            <FadeIn className="strip-cell">
              <img src={I('space-detail.jpg')} alt="Space detail close" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04 DESIGN CONCEPT — red panel split, sticker corners ── */}
      <section className="bsec bsec-concept bsec-red" id="concept">
        <CornerTags left="04 / CONCEPT" right="OUTDOOR → INSIDE" />
        <Sticker src={ST('wordplay.png')} top="80px"   right="30px"  w="200px" rot={12}  />
        <Sticker src={ST('mascots-1.png')} bottom="40px" left="20px"  w="200px" rot={-9}  />

        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label display-label-on-red"><Star /> 04 / Design Concept</p>
            <h2 className="display-title display-title-on-red">
              OUTDOOR<br/>ZONE&nbsp;<span className="display-arrow">→</span><br/>CONNECT INSIDE
            </h2>
          </FadeIn>

          <div className="concept-split">
            <div className="concept-text">
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
            </div>
            <FadeIn className="concept-photo">
              <img src={I('interior-1.png')} alt="Design concept — outdoor connect" />
            </FadeIn>
          </div>

          {/* Bulleted list — 참고1 page 5 (Education) style */}
          <ul className="bullet-list bullet-list-on-red">
            {CONCEPT_ITEMS.map(({ n, ko, en }) => (
              <FadeIn key={n} className="bullet-row">
                <li>
                  <span className="bullet-num"><Bucket n={n} /></span>
                  <span className="bullet-text" data-ko>{ko}</span>
                  <span className="bullet-text" data-en>{en}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 05 DESIGN DETAILS — beige panel + photo right ── */}
      <section className="bsec bsec-details" id="details">
        <CornerTags left="05 / DETAILS" right="SHAPE & MOTIF" />
        <Sticker src={ST('patterns-1.png')} top="60px" right="-20px" w="200px" rot={6} />
        <Sticker src={ST('skate.png')}      bottom="60px" left="0px"  w="220px" rot={-8} />

        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 05 / Design Details</p>
            <h2 className="display-title">SHAPE<br/>&amp; MOTIF</h2>
          </FadeIn>

          <div className="details-split">
            <FadeIn className="details-photo">
              <img src={I('interior-3.png')} alt="Design detail — sub-culture motif" />
            </FadeIn>
            <ul className="bullet-list">
              {DETAIL_ITEMS.map(({ n, ko, en }) => (
                <FadeIn key={n} className="bullet-row">
                  <li>
                    <span className="bullet-num"><Bucket n={n} /></span>
                    <span className="bullet-text" data-ko>{ko}</span>
                    <span className="bullet-text" data-en>{en}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 06 MATERIALS — Personal-Skill (참고1 p6) editorial list ── */}
      <section className="bsec bsec-materials" id="materials">
        <CornerTags left="06 / MATERIALS" right="RAW MATERIAL" />
        <Sticker src={ST('ice-cream.png')} top="80px" left="-20px" w="180px" rot={-10} />
        <Sticker src={ST('brand.png')}     bottom="80px" right="-10px" w="220px" rot={11} />

        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label"><Star /> 06 / Materials</p>
            <h2 className="display-title">RAW<br/>MATERIAL</h2>
          </FadeIn>

          <div className="materials-split">
            <div className="materials-text">
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
            </div>
            <FadeIn className="materials-photo">
              <img src={I('space-architectural.png')} alt="Material atmosphere" />
            </FadeIn>
          </div>

          {/* Material list — bulleted editorial style with swatches */}
          <ul className="mat-list">
            {MATERIALS.map((m, idx) => (
              <FadeIn key={m.name} className="mat-row">
                <li>
                  <span className="mat-idx">M.{String(idx + 1).padStart(2, '0')}</span>
                  <span className="mat-swatch" style={{ background: m.swatch }} aria-hidden="true"></span>
                  <span className="mat-name">{m.name}</span>
                  <span className="mat-hex">{m.hex}</span>
                  <span className="mat-desc">
                    <span data-ko>{m.ko}</span>
                    <span data-en>{m.en}</span>
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 02 POSTER — red panel hero card ── */}
      <section className="bsec bsec-poster bsec-red" id="poster">
        <CornerTags left="02 / POSTER" right="VISUAL IDENTITY" />
        <Sticker src={ST('badges.png')}  top="60px" left="10px" w="200px" rot={-8} />
        <Sticker src={ST('special.png')} bottom="60px" right="20px" w="210px" rot={10} />

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

      {/* ── 03 FILM — dark panel ── */}
      <section className="bsec bsec-film" id="film">
        <CornerTags left="03 / FILM" right="BRAND FILM" />
        <Sticker src={ST('characters.png')} top="60px"   right="20px"  w="200px" rot={10}  />
        <Sticker src={ST('mascots-2.png')}  bottom="40px" left="20px"  w="200px" rot={-7}  />

        <div className="bsec-inner">
          <FadeIn className="display-block">
            <p className="display-label display-label-on-dark"><Star /> 03 / Film</p>
            <h2 className="display-title display-title-on-dark">BRAND<br/>FILM</h2>
          </FadeIn>

          <FadeIn className="film-frame">
            <video src={I('video.mp4')} autoPlay muted loop playsInline controls />
          </FadeIn>
        </div>
      </section>

      {/* ── 04 EXTRAS — Project-Portfolio collage ── */}
      <section className="bsec bsec-extras" id="extras">
        <CornerTags left="04 / EXTRAS" right="SUPPLEMENTARY" />
        <Sticker src={ST('typography.png')} top="80px"   left="-20px" w="200px" rot={-9} />
        <Sticker src={ST('patterns-2.png')} bottom="40px" right="-20px" w="210px" rot={8}  />

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
        }
        :global(html[data-theme='dark']) {
          --page-bg: #0c0c0c;
          --page-fg: #e8e8e8;
          --section-bg: #1a1a1a;
          --text-mid: #aaa;
          --text-light: #999;
          --gray: #999;
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }

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
        :global(.fade-in.visible) { opacity: 1; transform: translateY(0); }

        /* ===== Star (red asterisk) ===== */
        :global(.star) {
          width: 1em; height: 1em; display: inline-block;
          color: var(--benson-red); vertical-align: -0.15em; flex-shrink: 0;
        }

        /* ===== Stickers (decorative absolute, no interaction) ===== */
        :global(.sticker) {
          position: absolute;
          pointer-events: none;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.18));
          z-index: 3;
          max-width: 30vw;
        }

        /* ===== Section shell + corner tags ===== */
        .bsec {
          position: relative;
          padding: 140px 60px 120px;
          background: var(--page-bg);
          color: var(--page-fg);
          overflow: hidden;
        }
        .bsec-inner { max-width: var(--max-width); margin: 0 auto; position: relative; z-index: 2; }
        :global(.corner-tags) {
          position: absolute; top: 32px; left: 0; right: 0;
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 60px; pointer-events: none; z-index: 4;
        }
        :global(.corner-tag) {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--page-fg);
        }
        .bsec-red :global(.corner-tag),
        .bsec-film :global(.corner-tag) { color: rgba(255,255,255,0.85); }
        .bsec-red :global(.corner-tag .star),
        .bsec-film :global(.corner-tag .star) { color: #fff; }

        /* ===== Display block ===== */
        :global(.display-block) { margin-bottom: 64px; }
        .display-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--benson-red);
          margin-bottom: 24px; font-weight: 600;
        }
        .display-label-on-red { color: #fff; }
        .display-label-on-red :global(.star) { color: #fff; }
        .display-label-on-dark { color: var(--benson-red); }
        .display-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 11vw, 180px);
          line-height: 0.88; letter-spacing: -2px; margin: 0;
        }
        .display-title-on-red { color: #fff; }
        .display-title-on-dark { color: #fff; }
        .display-arrow {
          color: var(--benson-red); background: #fff;
          padding: 0 0.18em; display: inline-block; line-height: 1;
        }

        .lead {
          font-size: clamp(15px, 1.4vw, 18px); line-height: 1.9;
          color: var(--text-mid); max-width: 680px; font-weight: 300;
          margin: 0 0 24px; word-break: keep-all;
        }
        .lead-on-red { color: rgba(255,255,255,0.92); max-width: 720px; }

        /* ===== Variants ===== */
        .bsec-space { background: var(--page-bg); }
        .bsec-concept.bsec-red,
        .bsec-poster.bsec-red { background: var(--benson-red); color: #fff; }
        .bsec-details { background: var(--section-bg); }
        .bsec-materials { background: var(--page-bg); }
        .bsec-film { background: var(--dark); color: #fff; }
        .bsec-extras { background: var(--page-bg); }

        /* ===== Space collage (참고1 page 11 inspired) ===== */
        .space-collage {
          position: relative;
          margin: 0 -20px 80px;
          padding: 40px 20px;
          min-height: 540px;
        }
        :global(.collage-photo) {
          position: absolute;
          overflow: hidden;
          border: 6px solid #fff;
          background: #fff;
          box-shadow: 0 18px 40px rgba(0,0,0,0.18);
          transition: transform 0.5s ease;
        }
        :global(.collage-photo) img {
          width: 100%; height: 100%; display: block; object-fit: cover;
          transition: transform 0.7s ease;
        }
        :global(.collage-photo:hover) img { transform: scale(1.04); }
        :global(.collage-1) {
          top: 0; left: 4%; width: 56%; aspect-ratio: 16 / 10;
          transform: rotate(-2deg); z-index: 2;
        }
        :global(.collage-2) {
          top: 80px; right: 4%; width: 38%; aspect-ratio: 4 / 5;
          transform: rotate(3deg); z-index: 3;
        }
        :global(.collage-3) {
          bottom: 0; left: 18%; width: 44%; aspect-ratio: 16 / 11;
          transform: rotate(1deg); z-index: 1;
        }
        .collage-tag {
          position: absolute;
          right: 14%; bottom: 60px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 2px;
          color: var(--benson-red);
          background: #fff;
          padding: 14px 18px;
          border-radius: 999px;
          box-shadow: 0 10px 22px rgba(0,0,0,0.15);
          transform: rotate(-4deg);
          z-index: 5;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .strip-row { display: grid; gap: 16px; margin-bottom: 16px; }
        .strip-2 { grid-template-columns: 1.6fr 1fr; }
        .strip-3 { grid-template-columns: repeat(3, 1fr); }
        :global(.strip-cell) {
          overflow: hidden; border-radius: 2px; background: var(--section-bg);
          border: 3px solid #fff; box-shadow: 0 6px 18px rgba(0,0,0,0.10);
        }
        :global(.strip-cell) img {
          width: 100%; height: 100%; object-fit: cover;
          aspect-ratio: 4 / 3; display: block;
          transition: transform 0.6s ease;
        }
        :global(.strip-cell:hover) img { transform: scale(1.03); }
        :global(.strip-wide) img { aspect-ratio: 16 / 10; }

        /* ===== Concept (red panel) ===== */
        .concept-split {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          margin: 40px 0 60px;
          align-items: center;
        }
        .concept-text { display: flex; flex-direction: column; gap: 8px; }
        :global(.concept-photo) {
          overflow: hidden;
          border: 6px solid #fff;
          background: #fff;
          box-shadow: 0 16px 36px rgba(0,0,0,0.25);
          transform: rotate(2deg);
        }
        :global(.concept-photo) img {
          width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover;
        }

        /* ===== Bullet list (참고1 page 5 Education-style) ===== */
        .bullet-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 32px;
        }
        :global(.bullet-row) > li {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 16px;
          align-items: start;
          padding: 14px 0;
          border-top: 1px solid rgba(255,255,255,0.18);
        }
        .bsec-details :global(.bullet-row) > li {
          border-top: 1px solid var(--border-light);
        }
        .bullet-num {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          line-height: 1;
        }
        :global(.bucket) {
          width: 44px;
          height: 44px;
          display: block;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
          flex-shrink: 0;
        }
        .bullet-text {
          font-size: 14px;
          line-height: 1.6;
          font-weight: 300;
          color: rgba(255,255,255,0.92);
          word-break: keep-all;
          display: block;
        }
        .bsec-details .bullet-text { color: var(--text-mid); }
        .bullet-list-on-red {
          /* placeholder — already handled above */
        }

        /* ===== Details split ===== */
        .details-split {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
        }
        :global(.details-photo) {
          overflow: hidden;
          border: 6px solid #fff;
          background: #fff;
          box-shadow: 0 14px 32px rgba(0,0,0,0.15);
          transform: rotate(-2deg);
        }
        :global(.details-photo) img {
          width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover;
        }
        .details-split .bullet-list { grid-template-columns: 1fr; }

        /* ===== Materials — editorial list (참고1 page 6 Personal Skill) ===== */
        .materials-split {
          margin: 40px 0 64px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        :global(.materials-photo) {
          overflow: hidden;
          border: 6px solid #fff;
          background: #fff;
          box-shadow: 0 14px 32px rgba(0,0,0,0.15);
          transform: rotate(1deg);
        }
        :global(.materials-photo) img {
          width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover;
        }
        .mat-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 2px solid var(--benson-red);
        }
        :global(.mat-row) > li {
          display: grid;
          grid-template-columns: 60px 56px 240px 80px 1fr;
          gap: 20px;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .mat-idx {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: var(--benson-red);
        }
        .mat-swatch {
          width: 48px;
          height: 48px;
          border-radius: 2px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .mat-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.6vw, 24px);
          letter-spacing: 1px;
          color: var(--page-fg);
        }
        .mat-hex {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: var(--gray);
        }
        .mat-desc {
          font-size: 14px;
          line-height: 1.6;
          font-weight: 300;
          color: var(--text-mid);
          word-break: keep-all;
        }
        .mat-desc span { display: block; }

        /* ===== Poster ===== */
        :global(.poster-frame) {
          overflow: hidden;
          background: #fff;
          padding: 14px;
          border-radius: 2px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.25);
        }
        :global(.poster-frame) img { width: 100%; display: block; }

        /* ===== Film ===== */
        :global(.film-frame) {
          overflow: hidden;
          border-radius: 2px;
          background: #000;
          border: 6px solid var(--benson-red);
          box-shadow: 0 14px 30px rgba(0,0,0,0.4);
        }
        :global(.film-frame) video { width: 100%; height: auto; display: block; }

        /* ===== Extras ===== */
        .extras-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        :global(.extras-cell) {
          overflow: hidden;
          border-radius: 2px;
          background: var(--section-bg);
          border: 3px solid #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        :global(.extras-cell) img {
          width: 100%; height: 100%; object-fit: cover;
          aspect-ratio: 1 / 1; display: block;
          transition: transform 0.6s ease;
        }
        :global(.extras-cell:hover) img { transform: scale(1.04); }

        /* ===== Responsive ===== */
        @media (max-width: 1100px) {
          .bsec { padding: 120px 36px 80px; }
          :global(.corner-tags) { padding: 0 36px; top: 24px; }
          .space-collage { min-height: 460px; }
          :global(.collage-1) { width: 70%; }
          :global(.collage-2) { width: 46%; }
          :global(.collage-3) { width: 50%; }
          .concept-split,
          .details-split,
          .materials-split { grid-template-columns: 1fr; }
          .bullet-list { grid-template-columns: 1fr; }
          :global(.mat-row) > li {
            grid-template-columns: 56px 48px 1fr;
            grid-template-rows: auto auto;
            gap: 12px 16px;
          }
          .mat-desc { grid-column: 1 / -1; }
          .mat-hex { grid-column: 2 / -1; }
          .extras-grid { grid-template-columns: repeat(3, 1fr); }
          .strip-3 { grid-template-columns: 1fr 1fr; }
          .strip-2 { grid-template-columns: 1fr; }
          :global(.sticker) { max-width: 22vw; }
        }
        @media (max-width: 640px) {
          .bsec { padding: 90px 20px 60px; }
          :global(.corner-tags) { padding: 0 20px; top: 16px; }
          :global(.corner-tag) { font-size: 10px; letter-spacing: 2px; }
          .space-collage {
            min-height: auto;
            display: flex; flex-direction: column; gap: 16px;
            padding: 0;
          }
          :global(.collage-photo) {
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            transform: none !important;
            top: auto !important; bottom: auto !important; left: auto !important; right: auto !important;
          }
          .collage-tag {
            position: relative;
            right: auto; bottom: auto;
            transform: none;
            align-self: flex-start;
          }
          .strip-3 { grid-template-columns: 1fr; }
          .extras-grid { grid-template-columns: repeat(2, 1fr); }
          :global(.sticker) { max-width: 32vw; }
        }
      `}</style>
    </>
  );
}
