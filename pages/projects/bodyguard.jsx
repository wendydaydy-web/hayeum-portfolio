import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'space', label: 'Space' },
  { id: 'detail', label: 'Detail' },
  { id: 'layout', label: 'Layout' },
];

const I = (name) => `/images/bodyguard/${name}`;

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

export default function BodyGuard() {
  return (
    <>
      <Head>
        <title>BODYGUARD — Store Rebranding</title>
        <meta name="description" content="BODYGUARD — K-언더웨어 리브랜딩 공간·SI 디자인. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">BODYGUARD</h1>
          <p className="st-hero-positioning">
            <span data-ko>K-언더웨어의 새로운 비주얼과 시스템으로 소비자의 브랜드 경험까지 고려한 리브랜딩 프로젝트 — 공간 디자인 · SI 가이드.</span>
            <span data-en>A rebranding project reimagining K-underwear with a new visual system and consumer brand experience — spatial design &amp; SI guide.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>기술을 통해 답을 내놓는 보디가드의 아이덴티티를 모듈·규격화된 요소로 고도화하고, 남녀노소를 아우르는 살가운 디자인과 자유로운 감성의 소재로 매장을 완성했습니다. 한국 전통 건축의 선·격자·면 요소를 현대적으로 재해석했습니다.</span>
            <span data-en>Elevating BODYGUARD&apos;s technology-driven identity through modular, standardized elements — completing a store of warm, all-embracing design and free-spirited materials, reinterpreting the traditional Korean architectural elements of line, grid, and surface.</span>
          </p>
          <p className="st-hero-quote">“OPTIMIZE EVERYTHING”</p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>공간 디자인 · SI 가이드 · 리브랜딩</span>
              <span data-en>Space Design · SI Guide · Rebranding</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>리테일 매장 · K-언더웨어</span>
              <span data-en>Retail Store · K-Underwear</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | BODYGUARD</span>
              <span className="st-info-line">K-Underwear since 1995 · 2024</span>
            </p>
          </div>
        </section>

        {/* intro full-bleed */}
        <div className="st-full-img"><img src={I('bodyguard-main-poster.webp')} alt="BODYGUARD main poster" /></div>
        <div className="st-full-img"><img src={I('bodyguard-interior.webp')} alt="BODYGUARD interior" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title">Functional · Borderless · Ingenious</h2>
              <p className="st-section-desc" data-ko>기술을 통해 답을 내놓는 보디가드의 아이덴티티를 모듈·규격화된 요소로 고도화하였습니다. 남녀노소 전반을 아우르는 살가운 디자인 요소와 자유로운 감성의 소재·분위기를 더했습니다.</p>
              <p className="st-section-desc" data-en>Elevating BODYGUARD&apos;s identity through modular, standardized elements that embody their technology-driven approach — warm design elements that embrace all demographics, enriched with free-spirited materials and atmosphere.</p>
              <div className="st-keywords">
                <span className="st-keyword">Functional</span>
                <span className="st-keyword">Borderless</span>
                <span className="st-keyword">Ingenious</span>
              </div>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card">
                <h4>선 · Line</h4>
                <p data-ko>공간의 대들보 역할을 하는 선으로, 모든 각도를 고려해 삶에 와닿는 제품을 만드는 보디가드의 신념을 나타냅니다.</p>
                <p data-en>Lines serving as the backbone of the space — representing BODYGUARD&apos;s belief in products considered from every angle.</p>
              </Reveal>
              <Reveal className="st-card">
                <h4>격자 · Grid</h4>
                <p data-ko>규격화된 요소를 통해 보디가드의 사려깊게 고려된 기능과 섬세한 감성을 표현합니다.</p>
                <p data-en>Standardized elements expressing BODYGUARD&apos;s thoughtful functionality and delicate sensibility.</p>
              </Reveal>
              <Reveal className="st-card">
                <h4>면 · Surface</h4>
                <p data-ko>다양한 사이즈와 컬러의 다면 레이아웃으로 호기심을 불러일으키는 공간을 완성합니다.</p>
                <p data-en>Multi-faceted layouts of various sizes and colors completing a curiosity-inspiring space.</p>
              </Reveal>
            </div>
            <div className="st-render-hero" style={{ marginTop: 40 }}>
              <img src={I('page_04.webp')} alt="Design Strategy — Korean elements" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ── 02 CONCEPT ── */}
        <section className="st-section alt" id="concept">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Concept</p>
              <h2 className="st-section-title">Optimize Everything</h2>
              <p className="st-section-desc" data-ko>핵심 가치 OPTIMIZE EVERYTHING에서 영감을 받아 모든 기능을 고려한 최적화 공간을 설계했습니다. 시그니처 컬러·모듈형 디스플레이·대형 소재의 개방감과 투명성으로 고급스러우면서도 편안한 매장을 완성했습니다.</p>
              <p className="st-section-desc" data-en>Inspired by the core value &ldquo;OPTIMIZE EVERYTHING,&rdquo; the space is designed for optimal functionality — signature colors, modular displays, and large-scale materials creating an open, premium yet approachable store.</p>
            </Reveal>

            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3>ENTRANCE</h3>
                <p data-ko>01 브랜드 심볼 조명 사인 · 02 스톤 마감 외벽 · 03 디지털 사이니지 · 04 채널 레터 사인</p>
                <p data-en>01 Illuminated brand symbol · 02 Stone-finish exterior · 03 Digital signage · 04 Channel letter sign</p>
              </div>
              <div><img src={I('page_05.webp')} alt="Store entrance" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3>OPTIMIZE MODULE</h3>
                <p data-ko>01 지오메트릭 천장 디자인 · 02 브랜드 채널 사인 · 03 모듈형 디스플레이 캐비닛 · 04 마네킹 디스플레이 존</p>
                <p data-en>01 Geometric ceiling · 02 Brand channel sign · 03 Modular display cabinet · 04 Mannequin display zone</p>
              </div>
              <div><img src={I('page_06.webp')} alt="Optimize module" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3>DISPLAY LINE</h3>
                <p data-ko>01 그리드 선반 디스플레이 · 02 제품 진열 존 · 03 사이드 패널 · 04 행잉 디스플레이</p>
                <p data-en>01 Grid shelf display · 02 Product display zone · 03 Side panel · 04 Hanging display</p>
              </div>
              <div><img src={I('page_07.webp')} alt="Display line" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3>FITTING ROOM</h3>
                <p data-ko>사적이면서도 편안한 공간. 차분한 외부 인상과 시그니처 패턴으로 반전을 주고, 외부와 단절되면서도 브랜드와의 연결성을 유지합니다. 패브릭 패턴과 은은한 조명이 프라이버시를 보호하며 따뜻함을 더합니다.</p>
                <p data-en>A private yet comfortable space — the signature pattern contrasts the calm exterior, maintaining brand continuity while ensuring privacy through warm lighting and fabric patterns.</p>
              </div>
              <div><img src={I('page_33.webp')} alt="Fitting room concept" loading="lazy" /></div>
            </Reveal>
          </div>
        </section>

        {/* ── 03 SPACE ── */}
        <section className="st-section" id="space">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Space</p>
              <h2 className="st-section-title">Storefront &amp; Interior</h2>
              <p className="st-section-desc" data-ko>시그니처 올리브 컬러와 깔끔한 라인으로 브랜드의 첫인상을 결정하는 파사드, 그리고 매장 전면부·쇼룸 존·중앙 매대 등 다양한 앵글의 인테리어 뷰.</p>
              <p className="st-section-desc" data-en>A facade defining the first impression with signature olive tones and clean lines, plus interior views from multiple angles — storefront, showroom zones, and center display.</p>
            </Reveal>
            <div className="st-facade-image"><img src={I('page_10.webp')} alt="Facade view" loading="lazy" /></div>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('page_11.webp')} alt="Store front view" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_12.webp')} alt="Side view L" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_13.webp')} alt="Side view R" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_14.webp')} alt="Counter view" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_15.webp')} alt="Counter display detail" loading="lazy" /></div>
              <div className="st-item st-wide"><img src={I('page_23.webp')} alt="Center display wide view" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_16.webp')} alt="Showroom W" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_21.webp')} alt="Showroom M" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 DETAIL ── */}
        <section className="st-section alt" id="detail">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Detail</p>
              <h2 className="st-section-title">Display, Materials &amp; Color</h2>
            </Reveal>

            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3>Display Zone</h3>
                <p data-ko>라인 조명·프로스티드 글라스 선반·그리드 시스템으로 제품을 시각적으로 차별화해, 특별 기능 제품과 시즌 한정 아이템을 고급스럽게 연출합니다.</p>
                <p data-en>Line lighting, frosted glass shelving, and a clean grid system showcase products in a visually differentiated way — elevating special-function and seasonal items.</p>
                <h3 style={{ marginTop: 24 }}>Easy Wear Module</h3>
                <p data-ko>“OPTIMIZE YOUR BODY”, “K-UNDERWEAR SINCE 1995” 시그니처 메시지와 모듈형 행거·서랍 디테일로 정돈된 쇼핑 경험을 제공합니다.</p>
                <p data-en>Signature messages paired with modular hangers and drawer details for an organized shopping experience.</p>
              </div>
              <div><img src={I('page_26.webp')} alt="Display zone" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3>Fitting Room</h3>
                <p data-ko>보디가드 시그니처 패턴과 원형 미러로 반전의 인상을 주며, 브랜드 연결성을 유지합니다. 패브릭 패턴과 은은한 조명이 프라이버시를 보호하면서 따뜻한 분위기를 제공합니다.</p>
                <p data-en>The fitting room features the signature geometric pattern with circular mirrors, maintaining brand continuity while ensuring privacy through warm, diffused lighting and fabric curtains.</p>
              </div>
              <div><img src={I('page_33.webp')} alt="Fitting room detail" loading="lazy" /></div>
            </Reveal>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Material Board</p>
              <p className="st-section-desc" data-ko>자연스러운 우드, 테라조 타일, 메탈, 프로스티드 플라스틱 등 다양한 소재의 조합으로 기능적이면서도 따뜻한 매장 분위기를 연출했습니다.</p>
              <p className="st-section-desc" data-en>A harmonious combination of natural wood, terrazzo tile, metal, and frosted plastic creates a store atmosphere both functional and warm.</p>
            </Reveal>
            <Reveal className="st-materials-grid">
              <div className="st-material-list">
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'linear-gradient(135deg, #d4c8a0, #c4b890)' }}></div><div><div className="st-mat-name">Wood</div><div className="st-mat-desc" data-ko>자작나무 합판</div><div className="st-mat-desc" data-en>Birch plywood</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: '#6E6A29' }}></div><div><div className="st-mat-name">Paint (Olive)</div><div className="st-mat-desc" data-ko>올리브 그린 도장</div><div className="st-mat-desc" data-en>Olive green paint</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: '#C8C1EF' }}></div><div><div className="st-mat-name">Paint (Lavender)</div><div className="st-mat-desc" data-ko>라벤더 도장</div><div className="st-mat-desc" data-en>Lavender paint</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'linear-gradient(135deg, #e8c8c0, #dbb8b0)' }}></div><div><div className="st-mat-name">Paint (Pink)</div><div className="st-mat-desc" data-ko>핑크 도장</div><div className="st-mat-desc" data-en>Pink paint</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'linear-gradient(135deg, #e8e2d8, #d8d0c0)' }}></div><div><div className="st-mat-name">Stone</div><div className="st-mat-desc" data-ko>스톤 마감</div><div className="st-mat-desc" data-en>Natural stone</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'linear-gradient(135deg, #c0c0c0, #a0a8b8)' }}></div><div><div className="st-mat-name">Metal</div><div className="st-mat-desc" data-ko>메탈 실버/브론즈</div><div className="st-mat-desc" data-en>Silver &amp; bronze</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'rgba(220,220,230,0.6)', border: '1px solid #ccc' }}></div><div><div className="st-mat-name">Frosted Plastic</div><div className="st-mat-desc" data-ko>프로스티드 플라스틱</div><div className="st-mat-desc" data-en>Frosted acrylic</div></div></div>
                <div className="st-material-item"><div className="st-material-swatch" style={{ background: 'linear-gradient(135deg, #f0ece6, #e8e4de)', border: '1px solid #ddd' }}></div><div><div className="st-mat-name">Terrazzo Tile</div><div className="st-mat-desc" data-ko>테라조 타일</div><div className="st-mat-desc" data-en>Terrazzo tile</div></div></div>
              </div>
              <div><img src={I('page_35.webp')} alt="Material board" loading="lazy" /></div>
            </Reveal>
          </div>

          <div className="st-color-split">
            <div className="st-color-image"><img src={I('page_37.webp')} alt="Material spec with colors" loading="lazy" /></div>
            <div className="st-color-info">
              <h3>Signature Palette</h3>
              <p data-ko>시그니처 올리브 그린을 중심으로 라벤더·핑크 톤이 어우러져 남녀 모두에게 편안하고 세련된 브랜드 이미지를 전달합니다. 우드·테라조의 자연 톤이 공간에 따뜻함을 더합니다.</p>
              <p data-en>Centered on the signature olive green, soft lavender and pink tones create a refined yet comfortable brand image for all genders. Natural wood and terrazzo tones add warmth throughout.</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
                {['#6E6A29', '#C8C1EF', '#e8c8c0', '#c8c470', '#d4c8a0'].map((c) => (
                  <span key={c} style={{ width: 34, height: 34, borderRadius: 4, background: c, border: '1px solid rgba(255,255,255,0.4)' }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 LAYOUT ── */}
        <section className="st-section st-layout" id="layout">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Layout</p>
              <h2 className="st-section-title">Space Planning</h2>
              <p className="st-section-desc" data-ko>남녀 쇼룸존을 분리하면서도 중앙 매대로 시각적 연결을 유지하고, 피팅룸·스톡룸을 효율적으로 배치한 동선 계획.</p>
              <p className="st-section-desc" data-en>A floor plan separating men&apos;s and women&apos;s showroom zones while maintaining visual connection through the center display, with efficiently placed fitting and stock rooms.</p>
            </Reveal>
            <Reveal className="st-layout-image"><img src={I('page_09.webp')} alt="Floor layout" loading="lazy" /></Reveal>
            <div className="st-zone-list">
              <span className="st-zone-tag">Fitting Room</span>
              <span className="st-zone-tag">Easy Zone</span>
              <span className="st-zone-tag">Hanging Zone</span>
              <span className="st-zone-tag">Display Zone</span>
              <span className="st-zone-tag">Center Zone</span>
              <span className="st-zone-tag">Cashier&apos;s Desk</span>
              <span className="st-zone-tag">Showroom W</span>
              <span className="st-zone-tag">Showroom M</span>
              <span className="st-zone-tag">Stock</span>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Detail &amp; Spec</p>
            </Reveal>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('page_29.webp')} alt="Easy wear module detail" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_31.webp')} alt="Fitting room perspective" loading="lazy" /></div>
              <div className="st-item"><img src={I('page_34.webp')} alt="Fitting room pattern detail" loading="lazy" /></div>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #6E6A29;
          --secondary: #C8C1EF;
          --accent-ink: var(--accent);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f4f3ef;
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
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }
      `}</style>
    </>
  );
}
