import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'concept', label: 'Concept' },
  { id: 'facade', label: 'Facade' },
  { id: 'details', label: 'Details' },
  { id: 'materials', label: 'Materials' },
  { id: 'layout', label: 'Layout' },
];

const HERO_META = [
  { label: 'Project', value: 'Benson Ice Cream Flagship Store' },
  { label: 'Category', value: 'F&B / Retail Interior' },
  { label: 'Year', value: '2024' },
  { label: 'Scope', value: 'SI Guide / Space Design' },
];

const I = (name) => `/images/benson/${name}`;

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
        image={I('page_01.png')}
        subtitleKo={'미국 스트릿 디저트의 다이내믹한 에너지를 담은\n벤슨 아이스크림 플래그십 스토어'}
        subtitleEn={'A flagship ice cream store capturing the dynamic energy\nof authentic American street dessert culture.'}
        meta={HERO_META}
      />

      {/* ── 01 CONCEPT ── */}
      <section className="concept" id="concept">
        <div className="section-inner">
          <div className="concept-grid">
            <FadeIn>
              <p className="section-label">01 &mdash; Design Strategy</p>
              <h2 className="section-title">Authentic American<br />Street Dessert</h2>
              <p className="section-desc" data-ko>
                벤슨 아이스크림 샵은 벤슨이 전개하는 미국스타일 아이스크림의 다이내믹한 플레이버, 볼드한 토핑, 풍부한 유지방이 만들어내는 부드러움을 미국의 서브컬쳐를 모티브로 풀어낸 공간입니다.
              </p>
              <p className="section-desc" data-en>
                The Benson Ice Cream shop is a space that channels the dynamic flavors, bold toppings, and rich creaminess of American-style ice cream through the lens of American subculture.
              </p>
              <div className="concept-keywords">
                <span className="keyword">Dynamic</span>
                <span className="keyword">Connect</span>
                <span className="keyword">Authentic</span>
              </div>
            </FadeIn>
            <FadeIn className="concept-image img-crop-en crop-04">
              <img src={I('page_04.png')} alt="Design Strategy" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 FACADE ── */}
      <section id="facade">
        <div className="section-inner">
          <FadeIn><p className="section-label">02 &mdash; Facade</p></FadeIn>
          <FadeIn><h2 className="section-title">Storefront Design</h2></FadeIn>
          <FadeIn>
            <p className="section-desc" data-ko>
              폴딩도어와 전면 곡선으로 부드럽게 이어지는 파사드 구조물로 내외부를 연결하여 접근성을 높이고, 스트릿 푸드가 가진 자유로움과 활기참을 표현하였습니다.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="section-desc" data-en>
              Folding doors and a gently curving facade structure seamlessly bridge the interior and exterior, enhancing accessibility while embodying the freedom and vibrancy of street food culture.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="facade-grid">
              <div className="facade-item">
                <img src={I('page_05.png')} alt="Facade Day" />
                <div className="caption">Day View</div>
              </div>
              <div className="facade-item">
                <img src={I('page_06.png')} alt="Facade Night" />
                <div className="caption">Night View</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 03 PERSPECTIVES ── */}
      <section className="perspectives" id="perspectives">
        <div className="section-inner">
          <FadeIn><p className="section-label">03 &mdash; Perspectives</p></FadeIn>
          <FadeIn><h2 className="section-title">Interior Views</h2></FadeIn>
          <FadeIn>
            <p className="section-desc" data-ko>
              곡선형 메인 퍼니처와 레드 포인트 컬러가 어우러진 역동적인 내부 공간
            </p>
          </FadeIn>
          <FadeIn>
            <p className="section-desc" data-en>
              A dynamic interior where curvilinear main furniture meets bold red accent colors
            </p>
          </FadeIn>
          <div className="gallery-grid">
            <FadeIn className="gallery-item wide">
              <img src={I('page_09.png')} alt="Interior wide view" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_07.png')} alt="Interior view - VMD zone" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_08.png')} alt="Interior view - counter" />
            </FadeIn>
            <FadeIn className="gallery-item wide">
              <img src={I('page_12.png')} alt="Interior view - counter area" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_10.png')} alt="Interior view - pegboard" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_11.png')} alt="Interior view - VMD display" />
            </FadeIn>
            <FadeIn className="gallery-item wide">
              <img src={I('page_13.png')} alt="Interior wide view - seating" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04 DESIGN CONCEPT ── */}
      <section id="details">
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
              <img src={I('page_14.png')} alt="Design concept - outdoor connect" className="concept-detail-img" />
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
      <section className="design-details-section">
        <div className="section-inner">
          <FadeIn><p className="section-label">05 &mdash; Design Details</p></FadeIn>
          <FadeIn><h2 className="section-title">Shape &amp; Motif</h2></FadeIn>

          <FadeIn>
            <div className="concept-detail-grid">
              <img src={I('page_16.png')} alt="Design detail - Sub-culture motif" className="concept-detail-img" />
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
      <section className="materials" id="materials">
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
                <img src={I('page_20.png')} alt="Material board" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 07 COLOR ── */}
      <section className="color-section">
        <div className="section-inner">
          <FadeIn><p className="section-label">07 &mdash; Color</p></FadeIn>
          <FadeIn><h2 className="section-title">Benson Red</h2></FadeIn>
        </div>
        <FadeIn>
          <div className="color-split">
            <div className="color-image img-crop-en crop-18">
              <img src={I('page_18.png')} alt="Color perspective" />
            </div>
            <div className="color-info">
              <h3>Color Point</h3>
              <p data-ko>
                벤슨 아이스크림의 다채로운 아이스크림 특성을 반영해, 레드 포인트 컬러를 활용하여 경쾌하고 밝은 느낌을 더해 공간에 활기와 생동감을 불어넣고자 하였습니다.
              </p>
              <p data-en>
                Reflecting the vibrant variety of Benson&apos;s ice cream lineup, a bold red accent color is used throughout the space to add a lively, upbeat energy and inject a sense of vitality into every corner.
              </p>
              <span className="pantone-tag">PANTONE 485C</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 08 LAYOUT ── */}
      <section className="layout-section" id="layout">
        <div className="section-inner">
          <FadeIn><p className="section-label">08 &mdash; Layout</p></FadeIn>
          <FadeIn><h2 className="section-title">Space Planning</h2></FadeIn>
          <FadeIn>
            <p className="section-desc" data-ko>
              아이스크림 제조 동선과 고객 체험 공간을 효율적으로 분리하면서도 시각적 연결을 유지한 레이아웃
            </p>
          </FadeIn>
          <FadeIn>
            <p className="section-desc" data-en>
              A layout that efficiently separates ice cream production flow from the customer experience zone while maintaining visual connectivity throughout.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="layout-image">
              <img src={I('page_19.png')} alt="Floor layout" />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="zone-list">
              <span className="zone-tag">Stock</span>
              <span className="zone-tag">Work Zone</span>
              <span className="zone-tag">Sanitary Zone</span>
              <span className="zone-tag">VMD Zone</span>
              <span className="zone-tag">Tasting Zone</span>
              <span className="zone-tag">Outdoor Zone</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 09 TECHNICAL ── */}
      <section className="technical">
        <div className="section-inner">
          <FadeIn><p className="section-label">09 &mdash; Technical</p></FadeIn>
          <FadeIn><h2 className="section-title">Detail &amp; VMD</h2></FadeIn>
          <FadeIn>
            <div className="tech-images">
              <div className="img-crop-en crop-17"><img src={I('page_17.png')} alt="Material rendering" /></div>
              <img src={I('page_26.png')} alt="Pegboard detail" />
              <img src={I('page_30.png')} alt="Menu board detail" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <ProjectFooter
        prevProject={{ name: 'TOFUG', href: '/projects/tofug' }}
        nextProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
      />

      <style jsx>{`
        /* ===== BENSON THEME OVERRIDES ===== */
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
        @media (prefers-color-scheme: dark) {
          :global(:root) {
            --page-bg: #0f0e0e;
            --page-fg: #f0efeb;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --gray: #999;
            --border-light: rgba(255,255,255,0.08);
            --border-subtle: rgba(255,255,255,0.05);
            --nav-scrolled-bg: rgba(15,14,14,0.9);
            --nav-scrolled-border: rgba(255,255,255,0.05);
            --keyword-border: #f0efeb;
            --keyword-color: #f0efeb;
          }
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
        :global(html[lang="en"] h3[data-en]),
        :global(html[lang="en"] div[data-en]) { display: block; }
        :global(html[lang="ko"] p[data-ko]),
        :global(html[lang="ko"] h2[data-ko]),
        :global(html[lang="ko"] h3[data-ko]),
        :global(html[lang="ko"] div[data-ko]) { display: block; }
        :global(html[lang="ko"] p[data-en]),
        :global(html[lang="ko"] h2[data-en]),
        :global(html[lang="ko"] h3[data-en]),
        :global(html[lang="ko"] div[data-en]) { display: none; }

        /* ===== EN image crop ===== */
        :global(html[lang="en"]) .img-crop-en { overflow: hidden; }
        :global(html[lang="en"]) .img-crop-en img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
        }
        :global(html[lang="en"]) .img-crop-en.crop-04 { aspect-ratio: 16 / 7; }
        :global(html[lang="en"]) .img-crop-en.crop-18 { aspect-ratio: 16 / 9; }
        :global(html[lang="en"]) .img-crop-en.crop-17 { aspect-ratio: 16 / 8; }

        /* ===== SCROLL ANIMATIONS ===== */
        :global(.fade-in) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== SECTION COMMON ===== */
        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--benson-red); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 56px); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: 1px;
        }
        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300;
        }

        /* ===== CONCEPT ===== */
        .concept { background: var(--section-bg); }
        .concept-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center; margin-top: 60px;
        }
        :global(.concept-image) img { width: 100%; border-radius: 4px; }
        .concept-keywords { display: flex; gap: 20px; margin-top: 40px; }
        .keyword {
          padding: 12px 28px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 13px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
        }

        /* ===== FACADE ===== */
        .facade-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 30px; margin-top: 60px;
        }
        .facade-item {
          position: relative; overflow: hidden; border-radius: 4px;
        }
        .facade-grid img {
          width: 100%; display: block; transition: transform 0.6s ease;
        }
        .facade-item:hover img { transform: scale(1.03); }
        .caption {
          position: absolute; bottom: 20px; left: 20px; color: #fff;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 500; background: rgba(0,0,0,0.4); padding: 8px 16px;
          border-radius: 2px; backdrop-filter: blur(4px);
        }

        /* ===== PERSPECTIVES ===== */
        .perspectives { background: var(--dark); color: #fff; }
        .perspectives .section-label { color: var(--benson-red); }
        .perspectives .section-desc { color: rgba(255,255,255,0.5); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 20px; margin-top: 60px;
        }
        :global(.gallery-item) {
          overflow: hidden; border-radius: 4px; aspect-ratio: 16/10;
        }
        :global(.gallery-item) img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        :global(.gallery-item:hover) img { transform: scale(1.05); }
        :global(.gallery-item.wide) {
          grid-column: span 2; aspect-ratio: 21/9;
        }

        /* ===== CONCEPT DETAIL ===== */
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

        /* ===== DESIGN DETAILS ===== */
        .design-details-section { background: var(--section-bg); }

        /* ===== MATERIALS ===== */
        .materials { background: var(--section-bg); }
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

        /* ===== COLOR ===== */
        .color-section { position: relative; overflow: hidden; }
        .color-split {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; margin-top: 60px;
        }
        .color-image { overflow: hidden; }
        .color-image img { width: 100%; height: 100%; object-fit: cover; }
        .color-info {
          background: var(--benson-red); color: #fff;
          padding: 80px 60px; display: flex; flex-direction: column;
          justify-content: center;
        }
        .color-info h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px; letter-spacing: 3px; margin-bottom: 20px;
        }
        .color-info p {
          font-size: 14px; line-height: 1.9; opacity: 0.8; font-weight: 300;
        }
        .pantone-tag {
          display: inline-block; margin-top: 30px; padding: 10px 24px;
          border: 1px solid rgba(255,255,255,0.4);
          font-size: 12px; letter-spacing: 3px; font-weight: 500;
        }

        /* ===== LAYOUT ===== */
        .layout-section { text-align: center; }
        .layout-section .section-desc { margin: 0 auto 60px; text-align: center; }
        .layout-image { max-width: 1000px; margin: 0 auto; }
        .layout-image img { width: 100%; border-radius: 4px; }
        .zone-list {
          display: flex; justify-content: center; flex-wrap: wrap;
          gap: 16px; margin-top: 40px;
        }
        .zone-tag {
          padding: 10px 24px; background: var(--section-bg);
          font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
          font-weight: 500; border-radius: 2px;
        }

        /* ===== TECHNICAL ===== */
        .technical { background: var(--dark); color: #fff; }
        .technical .section-label { color: var(--benson-red); }
        .tech-images {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 60px;
        }
        .tech-images img {
          width: 100%; border-radius: 4px; opacity: 0.9;
          transition: opacity 0.3s;
        }
        .tech-images img:hover { opacity: 1; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .concept-grid,
          .facade-grid,
          .materials-grid,
          .color-split { grid-template-columns: 1fr; }
          .concept-detail-list { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          :global(.gallery-item.wide) { grid-column: span 1; }
          .tech-images { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .concept-keywords { flex-wrap: wrap; }
          .material-list { grid-template-columns: 1fr; }
          .concept-detail-list { grid-template-columns: 1fr; }
          .tech-images { grid-template-columns: 1fr; }
          .color-info { padding: 40px 24px; }
        }
      `}</style>
    </>
  );
}
