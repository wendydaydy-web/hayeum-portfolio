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

const EXTRAS = [
  'extra-scoop.png',
  'extra-storefront-window.png',
  'extra-overhead-flatlay.png',
  'extra-puddle.png',
  'extra-birdseye.png',
  'extra-silhouette.png',
  'extra-hands.png',
  'extra-product-closeup.png',
  'extra-drizzle.png',
  'extra-skater-feet.png',
  'extra-skater-editorial.png',
  'extra-product-lifestyle.png',
  'extra-melt.png',
  'extra-cup-skateboard.png',
  'extra-product-flatlay.png',
  'extra-cups-arranged.png',
  'extra-product-detail.png',
  'extra-packaging.png',
  'extra-product-artful.png',
  'extra-product-multi.png',
  'extra-cup-concrete.png',
  'extra-poster-ice-cream.png',
  'extra-stilllife.png',
  'extra-product-stylized.png',
  'extra-urban-street.png',
];

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
      <section className="space" id="space">
        <div className="section-inner">
          <FadeIn><p className="section-label">01 &mdash; Space</p></FadeIn>
          <FadeIn><h2 className="section-title">Storefront &amp; Interior</h2></FadeIn>

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
      <section className="design-concept-section" id="concept">
        <div className="section-inner">
          <FadeIn><p className="section-label">04 &mdash; Design Concept</p></FadeIn>
          <FadeIn><h2 className="section-title">Outdoor Zone &rarr; Connect Inside</h2></FadeIn>
          <FadeIn>
            <p className="section-desc" data-ko>
              벤슨 아이스크림 샵은 폴딩도어와 전면 곡선으로 부드럽게 이어지는 파사드 구조물, 매장 전체를 관통하는 사이니지, 벤치-테이블로 이어지는 곡선형 메인 퍼니처를 이용해 내외부를 연결함으로써, 내부 뿐 아니라 외부에서도 벤슨 아이스크림을 즐길 수 있는 아웃도어 형태로 디자인하였습니다.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="section-desc" data-en>
              By connecting interior and exterior through folding doors, a gently curving facade, store-spanning signage, and a flowing bench-to-table main furniture piece, the Benson Ice Cream shop is designed as an outdoor-oriented space where guests can enjoy ice cream both inside and out.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="concept-detail-grid">
              <img src={I('interior-1.png')} alt="Design concept — outdoor connect" className="concept-detail-img" />
              <div className="concept-detail-list">
                <div className="concept-detail-item">
                  <span className="concept-num">1</span>
                  <div>
                    <span data-ko>내부와 이어지는 파사드 디자인</span>
                    <span data-en>Facade design flowing seamlessly into the interior</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">2</span>
                  <div>
                    <span data-ko>외부와 내부를 연결하는 천장 조형물</span>
                    <span data-en>Ceiling sculptural element connecting exterior and interior</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">3</span>
                  <div>
                    <span data-ko>외부와 내부를 연결하는 실내 취식 공간</span>
                    <span data-en>Indoor dining area bridging outdoor and indoor zones</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">4</span>
                  <div>
                    <span data-ko>아이스크림 카운터와 전면 창의 곡선이 어우러지는 디자인</span>
                    <span data-en>Ice cream counter harmonized with the curved front window</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">5</span>
                  <div>
                    <span data-ko>벤치에서 테이블로 이어지는 곡선형 메인 퍼니처</span>
                    <span data-en>Curved main furniture flowing from bench to table</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 05 DESIGN DETAILS ── */}
      <section className="design-details-section" id="details">
        <div className="section-inner">
          <FadeIn><p className="section-label">05 &mdash; Design Details</p></FadeIn>
          <FadeIn><h2 className="section-title">Shape &amp; Motif</h2></FadeIn>

          <FadeIn>
            <div className="concept-detail-grid">
              <img src={I('interior-3.png')} alt="Design detail — sub-culture motif" className="concept-detail-img" />
              <div className="concept-detail-list">
                <div className="concept-detail-item">
                  <span className="concept-num">9</span>
                  <div>
                    <span data-ko>벤슨 아이스크림의 플레이버를 설명하는 페그보드 VMD</span>
                    <span data-en>Pegboard VMD showcasing Benson&apos;s ice cream flavors</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">11</span>
                  <div>
                    <span data-ko>스트릿 무드를 표현한 바닥과 곡선 디자인</span>
                    <span data-en>Street-mood flooring and curved design</span>
                  </div>
                </div>
                <div className="concept-detail-item">
                  <span className="concept-num">10</span>
                  <div>
                    <span data-ko>보드 형태에서 모티브를 받은 스탠딩 테이블</span>
                    <span data-en>Standing tables inspired by skateboard forms</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 06 MATERIALS ── */}
      <section className="materials-section" id="materials">
        <div className="section-inner">
          <FadeIn><p className="section-label">06 &mdash; Materials</p></FadeIn>
          <FadeIn><h2 className="section-title">Raw Material</h2></FadeIn>
          <FadeIn>
            <p className="section-desc" data-ko>
              전체적으로 외부 트랙에서 사용하는 콘크리트와 같은 익스트림하고 로우한 소재를 활용해, 메탈소재로 현대적이고 세련된 이미지를, 콘크리트와 에폭시로 벤슨의 스트릿한 브랜드 무드를 표현하였습니다.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="section-desc" data-en>
              Raw, extreme materials like concrete &mdash; reminiscent of outdoor skate tracks &mdash; are paired with metal for a modern, refined image, while concrete and epoxy finishes convey Benson&apos;s street-inspired brand mood.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="materials-grid">
              <div>
                <div className="material-list">
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #c0c0c0, #a0a0a0)' }}></div>
                    <div>
                      <div className="mat-name">Metal</div>
                      <div className="mat-desc" data-ko>헤어라인 실버 메탈</div>
                      <div className="mat-desc" data-en>Hairline silver metal</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #808080, #606060)' }}></div>
                    <div>
                      <div className="mat-name">Concrete</div>
                      <div className="mat-desc" data-ko>시멘트 콘크리트</div>
                      <div className="mat-desc" data-en>Cement concrete</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)' }}></div>
                    <div>
                      <div className="mat-name">Epoxy (Matte)</div>
                      <div className="mat-desc" data-ko>에폭시 무광 코팅</div>
                      <div className="mat-desc" data-en>Matte-coated epoxy</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #f5efe0, #e8dcc8)' }}></div>
                    <div>
                      <div className="mat-name">Paint</div>
                      <div className="mat-desc" data-ko>도장 마감</div>
                      <div className="mat-desc" data-en>Painted finish</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #d4b896, #c4a87a)' }}></div>
                    <div>
                      <div className="mat-name">Birch Wood</div>
                      <div className="mat-desc" data-ko>자작목</div>
                      <div className="mat-desc" data-en>Natural birch plywood</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #e2d5c0, #d5c5a8)' }}></div>
                    <div>
                      <div className="mat-name">Engineered Stone</div>
                      <div className="mat-desc" data-ko>인조대리석</div>
                      <div className="mat-desc" data-en>Engineered marble</div>
                    </div>
                  </div>
                  <div className="material-item">
                    <div className="material-swatch" style={{ background: '#CC0000' }}></div>
                    <div>
                      <div className="mat-name">Red Tile</div>
                      <div className="mat-desc" data-ko>레드 포인트 타일</div>
                      <div className="mat-desc" data-en>Accent red tile</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={I('space-architectural.png')} alt="Material atmosphere" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 02 POSTER ── */}
      <section className="poster-section" id="poster">
        <div className="section-inner">
          <FadeIn><p className="section-label">02 &mdash; Poster</p></FadeIn>
          <FadeIn><h2 className="section-title">Visual Identity</h2></FadeIn>

          <FadeIn className="poster-main">
            <img src={I('poster.png')} alt="BENSON poster" />
          </FadeIn>
          <FadeIn className="poster-long">
            <img src={I('poster-long.png')} alt="BENSON poster long format" />
          </FadeIn>
        </div>
      </section>

      {/* ── 03 FILM ── */}
      <section className="film-section" id="film">
        <div className="section-inner">
          <FadeIn><p className="section-label">03 &mdash; Film</p></FadeIn>
          <FadeIn><h2 className="section-title">Brand Film</h2></FadeIn>

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
      <section className="extras-section" id="extras">
        <div className="section-inner">
          <FadeIn><p className="section-label">04 &mdash; Extras</p></FadeIn>
          <FadeIn><h2 className="section-title">Supplementary</h2></FadeIn>

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
          --nav-scrolled-bg: rgba(255,255,255,0.9);
          --nav-scrolled-border: rgba(0,0,0,0.05);
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
          --nav-scrolled-border: rgba(255,255,255,0.05);
          --keyword-border: #e8e8e8;
          --keyword-color: #e8e8e8;
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
        :global(html[lang="en"] div[data-en]) { display: block; }
        :global(html[lang="ko"] p[data-ko]),
        :global(html[lang="ko"] h2[data-ko]),
        :global(html[lang="ko"] div[data-ko]) { display: block; }
        :global(html[lang="ko"] p[data-en]),
        :global(html[lang="ko"] h2[data-en]),
        :global(html[lang="ko"] div[data-en]) { display: none; }

        :global(.fade-in) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--benson-red); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 56px); line-height: 1.1;
          margin-bottom: 48px; letter-spacing: 1px;
        }

        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300;
        }

        /* ===== SPACE ===== */
        .space { background: var(--page-bg); }
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
          border-radius: 4px;
          background: var(--section-bg);
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

        /* ===== DESIGN CONCEPT / DETAILS (shared) ===== */
        .design-concept-section { background: var(--section-bg); }
        .design-details-section { background: var(--section-bg); }
        .concept-detail-grid { margin-top: 60px; }
        .concept-detail-img { width: 100%; border-radius: 4px; }
        .concept-detail-list {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 20px 40px; margin-top: 32px; padding: 0 20px;
        }
        .concept-detail-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; line-height: 1.6; font-weight: 300;
          color: var(--text-mid);
        }
        .concept-num {
          flex-shrink: 0; width: 24px; height: 24px;
          background: var(--benson-red); color: #fff; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600;
        }

        /* ===== MATERIALS ===== */
        .materials-section { background: var(--section-bg); }
        .materials-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center; margin-top: 60px;
        }
        .material-list {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .material-item { display: flex; align-items: center; gap: 16px; }
        .material-swatch {
          width: 48px; height: 48px; border-radius: 4px; flex-shrink: 0;
        }
        .mat-name { font-size: 13px; font-weight: 500; }
        .mat-desc { font-size: 11px; color: var(--gray); margin-top: 2px; }
        .materials-grid img { width: 100%; border-radius: 4px; }

        /* ===== POSTER ===== */
        .poster-section { background: var(--section-bg); }
        :global(.poster-main) {
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 24px;
        }
        :global(.poster-main) img {
          width: 100%;
          display: block;
        }
        :global(.poster-long) {
          overflow: hidden;
          border-radius: 4px;
        }
        :global(.poster-long) img {
          width: 100%;
          display: block;
        }

        /* ===== FILM ===== */
        .film-section { background: var(--dark); color: #fff; }
        .film-section .section-label { color: var(--benson-red); }
        .film-section .section-title { color: #fff; }
        :global(.film-frame) {
          overflow: hidden;
          border-radius: 4px;
          background: #000;
        }
        :global(.film-frame) video {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ===== EXTRAS ===== */
        .extras-section { background: var(--page-bg); }
        .extras-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        :global(.extras-cell) {
          overflow: hidden;
          border-radius: 4px;
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
        :global(.extras-cell:hover) img { transform: scale(1.03); }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .space-row-2,
          .space-row-2-even { grid-template-columns: 1fr; }
          .space-row-3 { grid-template-columns: 1fr 1fr; }
          .extras-grid { grid-template-columns: repeat(2, 1fr); }
          .materials-grid { grid-template-columns: 1fr; }
          .concept-detail-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .space-row-3 { grid-template-columns: 1fr; }
          .extras-grid { grid-template-columns: 1fr; }
          .material-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
