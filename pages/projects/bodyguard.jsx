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
  { label: 'Project', value: 'BODYGUARD Store Rebranding' },
  { label: 'Category', value: 'Retail / Underwear' },
  { label: 'Year', value: '2024' },
  { label: 'Scope', value: 'SI Guide / Space Design' },
];

const I = (name) => `/images/bodyguard/${name}`;

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

export default function BodyGuard() {
  return (
    <>
      <Head>
        <title>BODYGUARD — Store Rebranding</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#888636" />

      <ProjectHero
        title="BODYGUARD"
        label="Brand Concept Interior · System Guidelines"
        image={I('page_01.png')}
        subtitleKo="K-언더웨어의 새로운 비주얼과 시스템으로 소비자의 브랜드 경험까지 고려한 리브랜딩 프로젝트"
        subtitleEn="A rebranding project that reimagines K-underwear with a new visual system and consumer brand experience."
        meta={HERO_META}
      />

      {/* ── 01 DESIGN STRATEGY ── */}
      <section className="strategy" id="concept">
        <div className="section-inner">
          <div className="strategy-grid">
            <FadeIn>
              <p className="section-label">01 — Design Strategy</p>
              <h2 className="section-title">Functional &middot; Borderless<br />&middot; Ingenious</h2>
              <p className="section-desc" data-ko>
                기술을 통해 답을 내놓는 보디가드의 아이덴티티를 모듈, 규격화된 요소로 브랜드 아이덴티티를 고도화하였습니다. 남녀노소 전반을 아우르는 살가운 디자인 요소들과 자유로운 감성의 소재와 분위기를 더했습니다.
              </p>
              <p className="section-desc" data-en>
                Elevating BODYGUARD&apos;s identity through modular, standardized elements that embody their technology-driven approach. Warm design elements embrace all demographics, enriched with free-spirited materials and atmosphere.
              </p>
              <p className="section-desc" style={{ marginTop: 16 }} data-ko>
                한국 전통 건축의 선, 격자, 면의 요소를 현대적으로 재해석하여 공간의 대들보 역할을 하는 선과 규격화된 요소를 통해 보디가드의 섬세한 감성을 표현하였습니다.
              </p>
              <p className="section-desc" style={{ marginTop: 16 }} data-en>
                Reinterpreting the traditional Korean architectural elements of line, grid, and surface in a modern way, expressing BODYGUARD&apos;s delicate sensibility through structured lines and standardized components.
              </p>
              <div className="strategy-keywords">
                <span className="keyword">Functional</span>
                <span className="keyword">Borderless</span>
                <span className="keyword">Ingenious</span>
              </div>
              <div className="strategy-elements">
                <div className="strategy-element">
                  <h4 data-ko>선 <span>Line</span></h4>
                  <p data-ko>공간의 대들보 역할을 하는 선을 사용하여 모든 각도의 충분한 고려와 마음으로 우리의 삶에 와닿는 제품을 만드는 보디가드의 신념을 나타냅니다.</p>
                  <h4 data-en>Line</h4>
                  <p data-en>Using lines that serve as the backbone of the space, representing BODYGUARD&apos;s belief in creating products that resonate with our lives through careful consideration from every angle.</p>
                </div>
                <div className="strategy-element">
                  <h4 data-ko>격자 <span>Grid</span></h4>
                  <p data-ko>규격화된 요소를 통해 보디가드의 사려깊게 고려된 기능과 섬세한 감성을 표현합니다.</p>
                  <h4 data-en>Grid</h4>
                  <p data-en>Expressing BODYGUARD&apos;s thoughtfully considered functionality and delicate sensibility through standardized elements.</p>
                </div>
                <div className="strategy-element">
                  <h4 data-ko>면 <span>Surface</span></h4>
                  <p data-ko>다양한 사이즈와 컬러의 다면 레이아웃을 통해 호기심을 불러 일으키는 공간을 완성합니다.</p>
                  <h4 data-en>Surface</h4>
                  <p data-en>Completing a curiosity-inspiring space through multi-faceted layouts of various sizes and colors.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn className="strategy-visual">
              <img src={I('page_04.png')} alt="Design Strategy - Korean elements" />
              <div className="strategy-visual-content">
                <p className="strategy-visual-title">BODYGUARD</p>
                <div className="strategy-circles">
                  <div className="strategy-circle">
                    <span className="circle-char">선</span>
                    <span className="circle-label">LINE</span>
                  </div>
                  <div className="strategy-circle">
                    <span className="circle-char">격자</span>
                    <span className="circle-label">GRID</span>
                  </div>
                  <div className="strategy-circle">
                    <span className="circle-char">면</span>
                    <span className="circle-label">SURFACE</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 DESIGN CONCEPT ── */}
      <section>
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Concept</p>
            <h2 className="section-title">Optimize Everything</h2>
            <p className="section-desc" data-ko>
              보디가드의 핵심 가치인 OPTIMIZE EVERYTHING에서 영감을 받아, 모든 기능을 고려한 최적화된 공간을 설계하였습니다. 브랜드의 시그니처 컬러와 모듈형 디스플레이, 대형 소재를 활용한 개방감과 투명성으로 고급스러우면서도 고객이 편하게 경험할 수 있는 매장을 완성하였습니다.
            </p>
            <p className="section-desc" data-en>
              Inspired by BODYGUARD&apos;s core value &ldquo;OPTIMIZE EVERYTHING,&rdquo; the space is designed for optimal functionality. The brand&apos;s signature colors, modular displays, and large-scale materials create an open, transparent store that feels premium yet approachable.
            </p>
          </FadeIn>
          <FadeIn className="concept-grid">
            <div className="concept-card-with-text">
              <img src={I('page_05.png')} alt="ENT - Store entrance" />
              <div className="concept-card-text">
                <h3>ENTRANCE</h3>
                <p data-ko>
                  <strong>01</strong> 브랜드 심볼 조명 사인 &middot;{' '}
                  <strong>02</strong> 스톤 마감 외벽 &middot;{' '}
                  <strong>03</strong> 디지털 사이니지 &middot;{' '}
                  <strong>04</strong> 채널 레터 사인
                </p>
                <p data-en>
                  <strong>01</strong> Illuminated brand symbol &middot;{' '}
                  <strong>02</strong> Stone-finish exterior &middot;{' '}
                  <strong>03</strong> Digital signage &middot;{' '}
                  <strong>04</strong> Channel letter sign
                </p>
              </div>
            </div>
            <div className="concept-card-with-text">
              <img src={I('page_06.png')} alt="Optimize Module" />
              <div className="concept-card-text">
                <h3>OPTIMIZE MODULE</h3>
                <p data-ko>
                  <strong>01</strong> 지오메트릭 천장 디자인 &middot;{' '}
                  <strong>02</strong> 브랜드 채널 사인 &middot;{' '}
                  <strong>03</strong> 모듈형 디스플레이 캐비닛 &middot;{' '}
                  <strong>04</strong> 마네킹 디스플레이 존
                </p>
                <p data-en>
                  <strong>01</strong> Geometric ceiling design &middot;{' '}
                  <strong>02</strong> Brand channel sign &middot;{' '}
                  <strong>03</strong> Modular display cabinet &middot;{' '}
                  <strong>04</strong> Mannequin display zone
                </p>
              </div>
            </div>
            <div className="concept-card-with-text">
              <img src={I('page_07.png')} alt="Display Line" />
              <div className="concept-card-text">
                <h3>DISPLAY LINE</h3>
                <p data-ko>
                  <strong>01</strong> 그리드 선반 디스플레이 &middot;{' '}
                  <strong>02</strong> 제품 진열 존 &middot;{' '}
                  <strong>03</strong> 사이드 패널 &middot;{' '}
                  <strong>04</strong> 행잉 디스플레이
                </p>
                <p data-en>
                  <strong>01</strong> Grid shelf display &middot;{' '}
                  <strong>02</strong> Product display zone &middot;{' '}
                  <strong>03</strong> Side panel &middot;{' '}
                  <strong>04</strong> Hanging display
                </p>
              </div>
            </div>
            <div className="concept-card-with-text">
              <img src={I('page_33.png')} alt="Fitting Room concept" />
              <div className="concept-card-text">
                <h3>FITTING ROOM</h3>
                <p data-ko>사적인 공간이면서도 편안함과 안락함을 느낄 수 있는 곳입니다. 외부에서 보이는 차분한 인상과 시그니처 패턴으로 반전의 인상을 주었으며, 외부와 단절되어 있으면서도 보디가드 브랜드와의 연결성을 유지합니다. 패브릭 패턴과 은은한 조명은 고객의 프라이버시를 보호하면서도 따뜻한 분위기를 제공합니다.</p>
                <p data-en>A private yet comfortable space. The signature pattern creates a striking contrast with the calm exterior, maintaining brand continuity while ensuring privacy through warm, diffused lighting and fabric patterns.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 03 FACADE ── */}
      <section id="facade">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Facade</p>
            <h2 className="section-title">Storefront Design</h2>
            <p className="section-desc" data-ko>
              파사드는 보디가드의 시그니처 올리브 컬러와 깔끔한 라인으로 브랜드의 첫인상을 결정합니다. 개방적인 전면 유리와 조명 로고가 어우러져 고객에게 자연스러운 동선을 유도합니다.
            </p>
            <p className="section-desc" data-en>
              The facade defines BODYGUARD&apos;s first impression with signature olive tones and clean lines. Open glass frontage and illuminated signage naturally guide customers inside.
            </p>
          </FadeIn>
          <FadeIn className="facade-grid">
            <div className="facade-item">
              <img src={I('page_10.png')} alt="Facade view" />
              <div className="caption" data-ko>파사드</div>
              <div className="caption" data-en>Facade View</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 04 PERSPECTIVES ── */}
      <section className="perspectives">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Perspectives</p>
            <h2 className="section-title">Interior Views</h2>
            <p className="section-desc" data-ko>
              매장 전면부, 쇼룸 존, 중앙 매대, 디스플레이 존 등 다양한 앵글에서 바라본 인테리어 뷰
            </p>
            <p className="section-desc" data-en>
              Interior views from multiple angles — storefront, showroom zones, center display, and special feature areas
            </p>
          </FadeIn>
          <div className="gallery-grid">
            <FadeIn className="gallery-item wide">
              <img src={I('page_11.png')} alt="Store front view" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_12.png')} alt="Side view L" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_13.png')} alt="Side view R" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_14.png')} alt="Counter view" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_15.png')} alt="Counter display detail" />
            </FadeIn>
            <FadeIn className="gallery-item wide">
              <img src={I('page_23.png')} alt="Center display wide view" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_16.png')} alt="Showroom W - detail" />
            </FadeIn>
            <FadeIn className="gallery-item">
              <img src={I('page_21.png')} alt="Showroom M" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 05 DESIGN DETAILS ── */}
      <section className="design-details-section" id="details">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">05 — Design Details</p>
            <h2 className="section-title">Display &amp; Fitting Room</h2>
          </FadeIn>

          <FadeIn className="detail-block">
            <div className="detail-block-text">
              <div className="detail-card">
                <h3>Display Zone</h3>
                <p data-ko>디스플레이존에서는 제품을 돋보이게 하는 라인 조명과 디지털 콜로론, 프로스티드 글라스를 활용하여 제품을 시각적으로 차별화된 방식으로 보여줍니다. 특별 기능 제품과 시즌 한정 아이템을 고급스럽게 연출합니다.</p>
                <p data-en>The display zone uses line lighting, frosted glass shelving, and a clean grid system to showcase products in a visually differentiated way, elevating special function and seasonal items.</p>
              </div>
              <div className="detail-card">
                <h3>Easy Wear Module</h3>
                <p data-ko>&ldquo;OPTIMIZE YOUR BODY&rdquo;, &ldquo;K-UNDERWEAR SINCE 1995&rdquo; 시그니처 메시지와 모듈형 행거, 서랍 디테일로 정돈된 쇼핑 경험을 제공합니다.</p>
                <p data-en>Signature messages &ldquo;OPTIMIZE YOUR BODY&rdquo; and &ldquo;K-UNDERWEAR SINCE 1995&rdquo; are paired with modular hangers and drawer details for an organized shopping experience.</p>
              </div>
            </div>
            <img src={I('page_26.png')} alt="Display zone - special products" className="detail-block-img" />
          </FadeIn>

          <FadeIn className="detail-block reverse">
            <div className="detail-block-text">
              <div className="detail-card">
                <h3>Fitting Room</h3>
                <p data-ko>피팅룸은 보디가드 시그니처 패턴으로 반원의 인상을 주었으며, 외부에 단절감이 없으면서도 브랜드의 연결성을 유지합니다. 패브릭 패턴의 은은한 조명은 고객의 프라이버시를 보호하면서도 따뜻한 분위기를 제공합니다.</p>
                <p data-en>The fitting room features BODYGUARD&apos;s signature geometric pattern with circular mirrors, maintaining brand continuity while ensuring privacy through warm, diffused lighting and fabric curtains.</p>
              </div>
            </div>
            <img src={I('page_33.png')} alt="Fitting room detail" className="detail-block-img" />
          </FadeIn>
        </div>
      </section>

      {/* ── 06 MATERIALS ── */}
      <section className="materials" id="materials">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">06 — Materials</p>
            <h2 className="section-title">Material Board</h2>
            <p className="section-desc" data-ko>
              자연스러운 우드, 테라조 타일, 메탈, 프로스티드 플라스틱 등 다양한 소재의 조합으로 기능적이면서도 따뜻한 매장 분위기를 연출하였습니다.
            </p>
            <p className="section-desc" data-en>
              A harmonious combination of natural wood, terrazzo tile, metal, and frosted plastic creates a store atmosphere that is both functional and warm.
            </p>
          </FadeIn>
          <FadeIn className="materials-grid">
            <div>
              <div className="material-list">
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #d4c8a0, #c4b890)' }}></div>
                  <div>
                    <div className="mat-name">Wood</div>
                    <div className="mat-desc" data-ko>자작나무 합판</div>
                    <div className="mat-desc" data-en>Birch plywood sheet</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: '#888636' }}></div>
                  <div>
                    <div className="mat-name">Paint (Olive)</div>
                    <div className="mat-desc" data-ko>올리브 그린 도장</div>
                    <div className="mat-desc" data-en>Olive green paint</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: '#c5c0d5' }}></div>
                  <div>
                    <div className="mat-name">Paint (Lavender)</div>
                    <div className="mat-desc" data-ko>라벤더 도장</div>
                    <div className="mat-desc" data-en>Lavender paint</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #e8c8c0, #dbb8b0)' }}></div>
                  <div>
                    <div className="mat-name">Paint (Pink)</div>
                    <div className="mat-desc" data-ko>핑크 도장</div>
                    <div className="mat-desc" data-en>Pink paint</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #e8e2d8, #d8d0c0)' }}></div>
                  <div>
                    <div className="mat-name">Stone</div>
                    <div className="mat-desc" data-ko>스톤 마감</div>
                    <div className="mat-desc" data-en>Natural stone finish</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #c0c0c0, #a0a8b8)' }}></div>
                  <div>
                    <div className="mat-name">Metal</div>
                    <div className="mat-desc" data-ko>메탈 실버/브론즈</div>
                    <div className="mat-desc" data-en>Silver &amp; bronze metal</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'rgba(220,220,230,0.6)', border: '1px solid #ccc' }}></div>
                  <div>
                    <div className="mat-name">Frosted Plastic</div>
                    <div className="mat-desc" data-ko>프로스티드 플라스틱</div>
                    <div className="mat-desc" data-en>Frosted acrylic panel</div>
                  </div>
                </div>
                <div className="material-item">
                  <div className="material-swatch" style={{ background: 'linear-gradient(135deg, #f0ece6, #e8e4de)', border: '1px solid #ddd' }}></div>
                  <div>
                    <div className="mat-name">Terrazzo Tile</div>
                    <div className="mat-desc" data-ko>테라조 타일</div>
                    <div className="mat-desc" data-en>Terrazzo floor tile</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={I('page_35.png')} alt="Material board" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 07 COLOR ── */}
      <section className="color-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">07 — Color</p>
            <h2 className="section-title">Brand Colors</h2>
          </FadeIn>
        </div>
        <FadeIn className="color-split">
          <div className="color-image">
            <img src={I('page_37.png')} alt="Material spec with colors" />
          </div>
          <div className="color-info">
            <h3>Signature Palette</h3>
            <p data-ko>
              보디가드의 시그니처 올리브 그린을 중심으로, 라벤더와 핑크 톤의 부드러운 컬러가 어우러져 남녀 모두에게 편안하면서도 세련된 브랜드 이미지를 전달합니다. 우드와 테라조의 자연스러운 톤이 전체 공간에 따뜻함을 더합니다.
            </p>
            <p data-en>
              Centered on BODYGUARD&apos;s signature olive green, soft lavender and pink tones create a refined yet comfortable brand image for all genders. Natural tones of wood and terrazzo add warmth throughout the space.
            </p>
            <div className="color-chips">
              <div className="color-chip" style={{ background: '#888636' }}></div>
              <div className="color-chip" style={{ background: '#c5c0d5' }}></div>
              <div className="color-chip" style={{ background: '#e8c8c0' }}></div>
              <div className="color-chip" style={{ background: '#c8c470' }}></div>
              <div className="color-chip" style={{ background: '#d4c8a0' }}></div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 08 LAYOUT ── */}
      <section className="layout-section" id="layout">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">08 — Layout</p>
            <h2 className="section-title">Space Planning</h2>
            <p className="section-desc" data-ko>
              남녀 쇼룸존을 분리하면서도 중앙 매대로 시각적 연결을 유지하고,<br />피팅룸과 스톡룸을 효율적으로 배치한 동선 계획
            </p>
            <p className="section-desc" data-en>
              A floor plan that separates men&apos;s and women&apos;s showroom zones while maintaining visual connection through the center display, with efficiently placed fitting and stock rooms.
            </p>
          </FadeIn>
          <FadeIn className="layout-image">
            <img src={I('page_09.png')} alt="Floor layout" />
          </FadeIn>
          <FadeIn className="zone-list">
            <span className="zone-tag">Fitting Room</span>
            <span className="zone-tag">Easy Zone</span>
            <span className="zone-tag">Hanging Zone</span>
            <span className="zone-tag">Display Zone</span>
            <span className="zone-tag">Center Zone</span>
            <span className="zone-tag">Cashier&apos;s Desk</span>
            <span className="zone-tag">Showroom W</span>
            <span className="zone-tag">Showroom M</span>
            <span className="zone-tag">Stock</span>
          </FadeIn>
        </div>
      </section>

      {/* ── 09 TECHNICAL ── */}
      <section className="technical">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">09 — Technical</p>
            <h2 className="section-title">Detail &amp; Spec</h2>
          </FadeIn>
          <FadeIn className="tech-images">
            <div><img src={I('page_29.png')} alt="Easy wear module detail" /></div>
            <div><img src={I('page_31.png')} alt="Fitting room perspective" /></div>
            <div><img src={I('page_34.png')} alt="Fitting room pattern detail" /></div>
          </FadeIn>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'BENSON', href: '/projects/benson' }}
        nextProject={{ name: 'SOLDAM MARKET', href: '/projects/soldam' }}
      />

      <style jsx>{`
        /* ===== BODYGUARD THEME ===== */
        :global(:root) {
          --olive: #888636;
          --olive-dark: #6b6a2a;
          --lavender: #c5c0d5;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f4f3ef;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
          --keyword-border: #1a1a1a;
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
            --keyword-border: #f0efeb;
          }
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== FADE IN ===== */
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
          color: var(--olive); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', var(--font-display), sans-serif;
          font-size: clamp(36px, 5vw, 56px); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: 1px;
        }
        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300;
        }

        /* ===== STRATEGY ===== */
        .strategy { background: var(--section-bg); }
        .strategy-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center; margin-top: 60px;
        }
        .strategy-keywords { display: flex; gap: 20px; margin-top: 40px; }
        .keyword {
          padding: 12px 28px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 13px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
        }
        .strategy-elements { display: flex; gap: 32px; margin-top: 48px; }
        .strategy-element { flex: 1; }
        .strategy-element h4 {
          font-size: 20px; font-weight: 700; margin-bottom: 8px; color: var(--olive);
        }
        .strategy-element h4 span {
          font-size: 13px; font-weight: 400; letter-spacing: 2px;
          text-transform: uppercase; color: var(--text-mid); margin-left: 8px;
        }
        .strategy-element p {
          font-size: 14px; line-height: 1.7; color: var(--text-mid);
        }

        /* Strategy visual card */
        :global(.strategy-visual) {
          position: relative; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3;
        }
        :global(.strategy-visual) img {
          width: 100%; height: 100%; object-fit: cover;
        }
        :global(.strategy-visual)::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(26, 26, 26, 0.88); z-index: 1;
        }
        .strategy-visual-content {
          position: absolute; inset: 0; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 40px; text-align: center; color: #fff;
        }
        .strategy-visual-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 3vw, 42px); letter-spacing: 6px; margin-bottom: 6px;
        }
        .strategy-circles { display: flex; gap: 0; margin-bottom: 32px; }
        .strategy-circle {
          width: clamp(90px, 8vw, 120px); height: clamp(90px, 8vw, 120px);
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.35);
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; margin: 0 -8px;
        }
        .strategy-circle .circle-char {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: clamp(18px, 2vw, 24px); font-weight: 500; margin-bottom: 4px;
        }
        .strategy-circle .circle-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* ===== CONCEPT ===== */
        :global(.concept-grid) {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 30px; margin-top: 60px;
        }
        .concept-card-with-text {
          grid-column: span 2; display: grid;
          grid-template-columns: 1.4fr 1fr; border-radius: 4px;
          overflow: hidden; background: var(--section-bg);
        }
        .concept-card-with-text img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .concept-card-with-text:hover img { transform: scale(1.03); }
        .concept-card-text {
          padding: 50px 40px; display: flex; flex-direction: column;
          justify-content: center; gap: 16px;
        }
        .concept-card-text h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px;
        }
        .concept-card-text p {
          font-size: 14px; line-height: 1.9; color: var(--text-mid); font-weight: 300;
        }

        /* ===== FACADE ===== */
        :global(.facade-grid) { margin-top: 60px; }
        .facade-item {
          position: relative; overflow: hidden; border-radius: 4px;
        }
        .facade-item img {
          width: 100%; display: block; transition: transform 0.6s ease;
        }
        .facade-item:hover img { transform: scale(1.03); }
        .facade-item .caption {
          position: absolute; bottom: 20px; left: 20px; color: #fff;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 500; background: rgba(0,0,0,0.4); padding: 8px 16px;
          border-radius: 2px; backdrop-filter: blur(4px);
        }

        /* ===== PERSPECTIVES ===== */
        .perspectives { background: var(--dark); color: #fff; }
        .perspectives .section-label { color: var(--olive); }
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
        :global(.gallery-item.wide) { grid-column: span 2; aspect-ratio: 21/9; }

        /* ===== DESIGN DETAILS ===== */
        .design-details-section { background: var(--section-bg); }
        :global(.detail-block) {
          display: grid; grid-template-columns: 1fr 1.5fr;
          gap: 50px; align-items: center; margin-top: 60px;
        }
        :global(.detail-block.reverse) { grid-template-columns: 1.5fr 1fr; margin-top: 80px; }
        :global(.detail-block.reverse) .detail-block-text { order: 1; }
        :global(.detail-block.reverse) .detail-block-img { order: 0; }
        .detail-block-img { width: 100%; border-radius: 4px; }
        .detail-block-text {
          display: flex; flex-direction: column; gap: 40px;
        }
        .detail-card { border-top: 2px solid var(--olive); padding-top: 24px; }
        .detail-card h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 24px;
          letter-spacing: 2px; margin-bottom: 12px;
        }
        .detail-card p {
          font-size: 14px; line-height: 1.8; color: var(--text-light); font-weight: 300;
        }

        /* ===== MATERIALS ===== */
        .materials { background: var(--section-bg); }
        :global(.materials-grid) {
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
        :global(.materials-grid) img { width: 100%; border-radius: 4px; }

        /* ===== COLOR ===== */
        .color-section { position: relative; overflow: hidden; }
        :global(.color-split) {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 60px;
        }
        .color-image { overflow: hidden; }
        .color-image img { width: 100%; height: 100%; object-fit: cover; }
        .color-info {
          background: var(--olive); color: #fff;
          padding: 80px 60px; display: flex; flex-direction: column; justify-content: center;
        }
        .color-info h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 48px;
          letter-spacing: 3px; margin-bottom: 20px;
        }
        .color-info p { font-size: 14px; line-height: 1.9; opacity: 0.8; font-weight: 300; }
        .color-chips { display: flex; gap: 12px; margin-top: 30px; }
        .color-chip {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
        }

        /* ===== LAYOUT ===== */
        .layout-section { text-align: center; }
        .layout-section .section-desc { margin: 0 auto 60px; text-align: center; }
        :global(.layout-image) { max-width: 1000px; margin: 0 auto; }
        :global(.layout-image) img { width: 100%; border-radius: 4px; }
        :global(.zone-list) {
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
        .technical .section-label { color: var(--olive); }
        :global(.tech-images) {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 60px;
        }
        :global(.tech-images) img {
          width: 100%; height: 100%; object-fit: cover;
          border-radius: 4px; opacity: 0.9; transition: opacity 0.3s;
        }
        :global(.tech-images) > div {
          aspect-ratio: 16/10; overflow: hidden; border-radius: 4px;
        }
        :global(.tech-images) img:hover { opacity: 1; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .strategy-grid,
          :global(.concept-grid),
          :global(.materials-grid),
          :global(.color-split) { grid-template-columns: 1fr; }
          .concept-card-with-text { grid-column: span 1; grid-template-columns: 1fr; }
          :global(.detail-block),
          :global(.detail-block.reverse) { grid-template-columns: 1fr; }
          :global(.detail-block.reverse) .detail-block-text { order: 0; }
          :global(.detail-block.reverse) .detail-block-img { order: 1; }
          .gallery-grid { grid-template-columns: 1fr; }
          :global(.gallery-item.wide) { grid-column: span 1; }
          :global(.tech-images) { grid-template-columns: 1fr 1fr; }
          .strategy-elements { flex-direction: column; gap: 24px; }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .strategy-keywords { flex-wrap: wrap; }
          .material-list { grid-template-columns: 1fr; }
          .detail-block-text { order: 0 !important; }
          :global(.tech-images) { grid-template-columns: 1fr; }
          .color-info { padding: 40px 24px; }
          :global(.gallery-item) { aspect-ratio: auto; }
          :global(.gallery-item.wide) { aspect-ratio: auto; }
        }
      `}</style>
    </>
  );
}
