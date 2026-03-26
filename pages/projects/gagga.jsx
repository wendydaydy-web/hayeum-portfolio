import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'design', label: 'Design' },
  { id: 'store', label: 'Store' },
  { id: 'process', label: 'Process' },
  { id: 'locations', label: 'Locations' },
];

const HERO_META = [
  { label: 'Project', value: 'GAGGA · Pet Grocery Store' },
  { label: 'Category', value: 'Pet Retail / Spatial Branding' },
  { label: 'Year', value: '2024' },
  { label: 'Scope', value: 'Brand Planning / VI / Spatial Design' },
  { label: 'Location', value: 'Suwon · Wangsimni, Seoul' },
];

const I = (name) => `/images/gagga/${name}`;

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

export default function Gagga() {
  return (
    <>
      <Head>
        <title>GAGGA — Pet Grocery Store</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#2d5016" />

      <ProjectHero
        title="GAGGA"
        label="Brand Planning · VI · Spatial Design"
        image={I('hero.jpg')}
        subtitleKo="강형욱(개통령)이 설립한 한국 최초의 펫 그로서리 스토어. 한국 전통 약방 컨셉을 현대적으로 재해석한 공간 브랜딩 — 네이밍, 브랜드 아이덴티티, 공간 디자인까지."
        subtitleEn="Korea's first pet grocery store founded by Kang Hyung-wook. Spatial branding reinterpreting the traditional Korean apothecary — from naming and brand identity to spatial design."
        meta={HERO_META}
      />

      {/* ── 01 BRAND STORY ── */}
      <section className="brand-story" id="story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Brand Story</p>
            <h2 className="section-title" data-ko>강아지를 위한 약방</h2>
            <h2 className="section-title" data-en>The Apothecary for Dogs</h2>
            <p className="section-desc" data-ko>
              GAGGA(가까)는 한국 최초의 &ldquo;펫 그로서리 스토어&rdquo;입니다.<br /><br />
              한국 전통 약방(yakbang)의 컨셉에서 출발했습니다. 동네에서 신뢰할 수 있는 공간, 필요한 것을 정확히 찾을 수 있는 큐레이션된 환경. 기존 펫샵의 시각적 소음을 걷어내고, &ldquo;MUJI for dogs&rdquo;를 지향하는 차분하고 미니멀한 공간입니다.<br /><br />
              이름 &lsquo;가까&rsquo;는 강아지 짖는 소리이자 한국어 &lsquo;가까이(nearby)&rsquo;의 의미를 담고 있습니다. 네이밍에만 2.5개월이 소요되었습니다.<br /><br />
              시그니처 서비스인 &lsquo;개마카세(dog omakase)&rsquo;는 무료 시식 서비스로, 강아지 — 실제 소비자 — 를 중심에 놓는 역발상입니다. 한국 최고의 반려견 트레이너 강형욱(개통령)이 설립했습니다.
            </p>
            <p className="section-desc" data-en>
              GAGGA is Korea&apos;s first &ldquo;pet grocery store.&rdquo;<br /><br />
              It started from the concept of a traditional Korean apothecary (yakbang) — a trusted neighborhood space where you can find exactly what you need in a curated environment. Stripping away the visual noise of conventional pet shops, it aspires to be &ldquo;MUJI for dogs&rdquo; — calm and minimal.<br /><br />
              The name &lsquo;GAGGA&rsquo; sounds like a dog&apos;s bark while meaning &lsquo;nearby&rsquo; in Korean. The naming process alone took 2.5 months.<br /><br />
              The signature &lsquo;Dog Omakase&rsquo; is a free tasting service that puts the dog — the actual consumer — at the center. Founded by Kang Hyung-wook, Korea&apos;s most renowned dog trainer.
            </p>
          </FadeIn>
          <div className="story-grid">
            <FadeIn className="story-text">
              <div className="story-keywords">
                <span className="keyword">Pet Grocery</span>
                <span className="keyword">Dog Omakase</span>
                <span className="keyword">Apothecary</span>
              </div>
            </FadeIn>
            <FadeIn className="story-visual">
              <img src={I('cover.jpg')} alt="GAGGA Store" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 BRAND DESIGN PRINCIPLES ── */}
      <section id="design">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Principles</p>
            <h2 className="section-title" data-ko>공간 아이덴티티의 네 기둥</h2>
            <h2 className="section-title" data-en>Four Pillars of Spatial Identity</h2>
          </FadeIn>
          <div className="pillars-grid">
            <FadeIn className="pillar-card">
              <div className="pillar-num">01</div>
              <h3>Signature</h3>
              <p className="pillar-sub" data-ko>고유의</p>
              <p className="pillar-sub" data-en>Distinctive</p>
              <p data-ko>분명한 브랜드 이미지, 어느 지점이든 일관된 디자인</p>
              <p data-en>A clear brand image with consistent design across every location</p>
            </FadeIn>
            <FadeIn className="pillar-card">
              <div className="pillar-num">02</div>
              <h3>Intelligent</h3>
              <p className="pillar-sub" data-ko>영리한</p>
              <p className="pillar-sub" data-en>Smart</p>
              <p data-ko>필요한 곳에 필요한 것을, 한 눈에 볼 수 있도록 정리</p>
              <p data-en>Everything in its right place — organized for visibility at a glance</p>
            </FadeIn>
            <FadeIn className="pillar-card">
              <div className="pillar-num">03</div>
              <h3>Cozy &amp; Calm</h3>
              <p className="pillar-sub" data-ko>정감있는, 정돈된</p>
              <p className="pillar-sub" data-en>Warm &amp; Ordered</p>
              <p data-ko>심플한 우드톤, 반려동물과의 따뜻한 유대</p>
              <p data-en>Simple wood tones, a warm bond with companion animals</p>
            </FadeIn>
            <FadeIn className="pillar-card">
              <div className="pillar-num">04</div>
              <h3>Pet Friendly</h3>
              <p className="pillar-sub" data-ko>펫 친화적인</p>
              <p className="pillar-sub" data-en>Pet-Centered</p>
              <p data-ko>산책 동선 기반, 반려동물 중심 행동/동선 고려</p>
              <p data-en>Walk-based circulation, designed around pet behavior and movement</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 03 BRAND VALUE SYSTEM ── */}
      <section className="brand-story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Brand Value</p>
            <h2 className="section-title" data-ko>세 단계의 브랜드 가치</h2>
            <h2 className="section-title" data-en>Three Tiers of Brand Value</h2>
          </FadeIn>
          <div className="value-tiers">
            <FadeIn className="value-tier">
              <div className="tier-level">Basic Value</div>
              <h3>Communicate + Reasonable</h3>
              <p data-ko>소통, 신뢰 기반 큐레이션</p>
              <p data-en>Communication and trust-based curation</p>
            </FadeIn>
            <FadeIn className="value-tier">
              <div className="tier-level">Attractive Value</div>
              <h3>Arrange + Recognition</h3>
              <p data-ko>시인성 중심 제품 분류</p>
              <p data-en>Visibility-driven product categorization</p>
            </FadeIn>
            <FadeIn className="value-tier highlight">
              <div className="tier-level">Differentiating Value</div>
              <h3>With Pet + DX</h3>
              <p data-ko>반려동물 직접 체험, 방문 이유가 명확한 브랜드</p>
              <p data-en>Direct pet experience — a brand with a clear reason to visit</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04 LOGO & SYMBOL ── */}
      <section>
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Logo &amp; Symbol</p>
            <h2 className="section-title" data-ko>강아지와 사람 모두에게 통하는 G</h2>
            <h2 className="section-title" data-en>The G That Speaks to Dogs and Humans</h2>
            <p className="section-desc" data-ko>
              로고타입: 대문자 G에 꼬리 형상의 곡선. 두 &lsquo;a&rsquo;의 리듬을 다르게 처리하여 자연스럽게 &lsquo;가까?&rsquo;로 읽히도록 디자인했습니다.<br /><br />
              심볼 Type A 채택: G 네거티브 스페이스에 강아지 옆모습 실루엣을 넣었습니다.<br /><br />
              닥스훈트 캐릭터: 오픈 직전 테스트에서 펫샵 인식이 불가하다는 피드백을 받아, 시인성 보완을 위해 닥스훈트 캐릭터를 추가했습니다.
            </p>
            <p className="section-desc" data-en>
              Logotype: A capital G with a tail-shaped curve. The two &lsquo;a&rsquo;s are treated with different rhythms so the name naturally reads as &lsquo;gagga?&rsquo;<br /><br />
              Symbol Type A adopted: A dog silhouette in profile sits in the negative space of the G.<br /><br />
              Dachshund character: Pre-launch testing revealed that the store wasn&apos;t recognized as a pet shop — a dachshund character was added to improve visibility.
            </p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('branding.jpg')} alt="GAGGA Branding" /></div>
            <div className="gallery-item"><img src={I('render-00.png')} alt="GAGGA Logo" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('render-01.png')} alt="Symbol A" /></div>
            <div className="gallery-item"><img src={I('render-02.png')} alt="Symbol B" /></div>
            <div className="gallery-item"><img src={I('render-03.png')} alt="Character" /></div>
          </div>
        </div>
      </section>

      {/* ── 05 THE STORE ── */}
      <section className="gallery-section" id="store">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">05 — The Store</p>
            <h2 className="section-title" data-ko>약방이 현실이 되다</h2>
            <h2 className="section-title" data-en>Where the Apothecary Comes to Life</h2>
            <p className="section-desc" data-ko>왕십리 2호점 실제 완공 사진들</p>
            <p className="section-desc" data-en>Wangsimni 2nd store — completed interior photography</p>
          </FadeIn>
          <div className="gallery-grid">
            <div className="gallery-item wide"><img src={I('interior.jpg')} alt="GAGGA Interior" /></div>
            <div className="gallery-item"><img src={I('store-01.jpg')} alt="Store entrance" /></div>
            <div className="gallery-item"><img src={I('store-02.jpg')} alt="Store interior" /></div>
            <div className="gallery-item"><img src={I('tasting.jpg')} alt="Tasting zone" /></div>
            <div className="gallery-item"><img src={I('shelf.jpg')} alt="Shelf display" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-03.jpg')} alt="Detail 1" /></div>
            <div className="gallery-item"><img src={I('store-04.jpg')} alt="Detail 2" /></div>
            <div className="gallery-item"><img src={I('store-05.jpg')} alt="Detail 3" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-06.jpg')} alt="Store 6" /></div>
            <div className="gallery-item"><img src={I('store-07.jpg')} alt="Store 7" /></div>
            <div className="gallery-item"><img src={I('store-08.jpg')} alt="Store 8" /></div>
            <div className="gallery-item"><img src={I('store-09.jpg')} alt="Store 9" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-10.jpg')} alt="Store 10" /></div>
            <div className="gallery-item"><img src={I('store-11.jpg')} alt="Store 11" /></div>
            <div className="gallery-item"><img src={I('store-12.jpg')} alt="Store 12" /></div>
          </div>
        </div>
      </section>

      {/* ── 06 INTERIOR DESIGN PROCESS ── */}
      <section className="brand-story" id="process">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">06 — Design Process</p>
            <h2 className="section-title" data-ko>3D 렌더링에서 현실로</h2>
            <h2 className="section-title" data-en>From 3D Renderings to Reality</h2>
          </FadeIn>

          <FadeIn className="concept-block">
            <div className="concept-text">
              <h3 data-ko>A안 — 라이트 우드</h3>
              <h3 data-en>Option A — Light Wood</h3>
              <p data-ko>라이트 우드 + 그린 테라조 아일랜드 + 원목 바닥. 밝고 개방적인 느낌의 공간 제안.</p>
              <p data-en>Light wood + green terrazzo island + solid wood floor. A bright and open spatial proposal.</p>
            </div>
            <div className="concept-img">
              <img src={I('render-04.png')} alt="Option A rendering" />
            </div>
          </FadeIn>

          <FadeIn className="concept-block reverse" style={{ marginTop: 80 }}>
            <div className="concept-text">
              <h3 data-ko>B안 (채택) — 다크 우드</h3>
              <h3 data-en>Option B (Adopted) — Dark Wood</h3>
              <p data-ko>다크 우드 패널링 + 이미테이션 마블 테라조 + 그레이 타일 바닥. 약방의 정제된 분위기를 더욱 살린 최종안.</p>
              <p data-en>Dark wood paneling + imitation marble terrazzo + gray tile floor. The final design that best captured the refined apothecary atmosphere.</p>
            </div>
            <div className="concept-img">
              <img src={I('render-05.png')} alt="Option B rendering (adopted)" />
            </div>
          </FadeIn>

          {/* Material Palette */}
          <FadeIn style={{ marginTop: 80 }}>
            <h3 className="material-title">Material Palette</h3>
            <div className="material-grid">
              <div className="material-item"><span>Wood Sheet / LPM Board</span></div>
              <div className="material-item"><span>Paint</span></div>
              <div className="material-item"><span>Imitation Marble</span></div>
              <div className="material-item"><span>Green Tile</span></div>
              <div className="material-item"><span>Metal</span></div>
              <div className="material-item"><span>Gray Tile</span></div>
            </div>
          </FadeIn>

          <div className="gallery-grid" style={{ marginTop: 40 }}>
            <div className="gallery-item"><img src={I('render-06.png')} alt="Rendering detail 1" /></div>
            <div className="gallery-item"><img src={I('render-07.png')} alt="Rendering detail 2" /></div>
          </div>
        </div>
      </section>

      {/* ── 07 STORE EVOLUTION ── */}
      <section>
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">07 — Store Evolution</p>
            <h2 className="section-title" data-ko>수원에서 왕십리로: 강아지로부터 배우다</h2>
            <h2 className="section-title" data-en>From Suwon to Wangsimni: Learning from the Dog</h2>
          </FadeIn>
          <div className="evolution-grid">
            <FadeIn className="evolution-card">
              <div className="evo-num">01</div>
              <h4 data-ko>시식존</h4>
              <h4 data-en>Tasting Zone</h4>
              <p data-ko>주변부 → 중앙으로 이동. 오픈 쇼케이스, 라이브 샘플 준비.</p>
              <p data-en>Moved from periphery → center. Open showcase with live sample preparation.</p>
            </FadeIn>
            <FadeIn className="evolution-card">
              <div className="evo-num">02</div>
              <h4 data-ko>샘플 디스플레이</h4>
              <h4 data-en>Sample Display</h4>
              <p data-ko>비닐 소분 → 병입형 + 외부 노출 디스플레이로 전환.</p>
              <p data-en>From vinyl sachets → bottled format + outward-facing display.</p>
            </FadeIn>
            <FadeIn className="evolution-card">
              <div className="evo-num">03</div>
              <h4 data-ko>모듈 선반</h4>
              <h4 data-en>Modular Shelving</h4>
              <p data-ko>400+ SKU, 잦은 제품 변경 → 채널 모듈 가변형 수납 시스템 도입.</p>
              <p data-en>400+ SKUs with frequent product changes → channel-based modular shelving system.</p>
            </FadeIn>
          </div>
          <div className="gallery-3col" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('store-20.jpg')} alt="Tasting zone evolution" /></div>
            <div className="gallery-item"><img src={I('store-22.jpg')} alt="Sample display" /></div>
            <div className="gallery-item"><img src={I('store-24.jpg')} alt="Modular shelving" /></div>
          </div>
        </div>
      </section>

      {/* ── More Store Gallery ── */}
      <section className="brand-story">
        <div className="section-inner">
          <div className="gallery-grid">
            <div className="gallery-item"><img src={I('store-13.jpg')} alt="Store 13" /></div>
            <div className="gallery-item"><img src={I('store-14.jpg')} alt="Store 14" /></div>
            <div className="gallery-item"><img src={I('store-15.jpg')} alt="Store 15" /></div>
            <div className="gallery-item"><img src={I('store-16.jpg')} alt="Store 16" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-17.jpg')} alt="Store 17" /></div>
            <div className="gallery-item"><img src={I('store-18.jpg')} alt="Store 18" /></div>
            <div className="gallery-item"><img src={I('store-19.jpg')} alt="Store 19" /></div>
          </div>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-25.jpg')} alt="Store 25" /></div>
            <div className="gallery-item"><img src={I('store-26.jpg')} alt="Store 26" /></div>
            <div className="gallery-item"><img src={I('store-27.jpg')} alt="Store 27" /></div>
            <div className="gallery-item"><img src={I('store-28.jpg')} alt="Store 28" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('store-29.jpg')} alt="Store 29" /></div>
            <div className="gallery-item"><img src={I('store-30.jpg')} alt="Store 30" /></div>
            <div className="gallery-item"><img src={I('team.jpg')} alt="Team" /></div>
          </div>
        </div>
      </section>

      {/* ── 08 STORE LOCATIONS ── */}
      <section id="locations">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">08 — Locations</p>
            <h2 className="section-title" data-ko>하나의 철학, 두 개의 매장</h2>
            <h2 className="section-title" data-en>Two Stores, One Philosophy</h2>
          </FadeIn>
          <div className="locations-grid">
            <FadeIn className="location-card">
              <h4>수원 영통 1호점</h4>
              <p className="loc-sub">Sep 2024 · Korea&apos;s First Pet Grocery Store</p>
              <p data-ko>경기 수원시 영통구 권선로908번길 47, 드림타워 1층 103호<br />평일 13:00–21:00 / 주말 12:00–21:00 (월 휴무)</p>
              <p data-en>47 Gwonseon-ro 908beon-gil, Yeongtong-gu, Suwon<br />Weekdays 13:00–21:00 / Weekends 12:00–21:00 (Closed Mon)</p>
            </FadeIn>
            <FadeIn className="location-card active">
              <div className="now-open">Now Open</div>
              <h4>왕십리 2호점</h4>
              <p className="loc-sub">2025 · SpreadWorks Full Spatial Redesign</p>
              <p data-ko>서울특별시 성동구 왕십리<br />SpreadWorks 풀 공간 리디자인</p>
              <p data-en>Wangsimni, Seongdong-gu, Seoul<br />SpreadWorks full spatial redesign</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CREDIT ── */}
      <section className="brand-story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">Credit</p>
            <div className="credit-grid">
              <div><p className="credit-label">Client</p><p className="credit-value">Bodeum Company (강형욱 / Episode)</p></div>
              <div><p className="credit-label">Design Agency</p><p className="credit-value">SpreadWorks</p></div>
              <div><p className="credit-label">Role</p><p className="credit-value">Brand Planning / VI / Spatial Design</p></div>
              <div><p className="credit-label">Location</p><p className="credit-value">Suwon · Wangsimni, Seoul</p></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <ProjectFooter
        prevProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
        nextProject={{ name: 'SOLDAM MARKET', href: '/projects/soldam' }}
      />

      <style jsx>{`
        /* ===== GAGGA THEME OVERRIDES ===== */
        :global(:root) {
          --warm: #2d5016;
          --warm-dark: #1e3a0e;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f8f6f3;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
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
            --keyword-border: #f0efeb;
            --keyword-color: #f0efeb;
          }
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== SECTION COMMON ===== */
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
        }
        .story-grid :global(.story-visual) img { width: 100%; height: 100%; object-fit: cover; }
        .story-keywords { display: flex; gap: 16px; margin-top: 40px; flex-wrap: wrap; }
        .keyword {
          padding: 10px 24px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--keyword-color);
        }

        /* ===== PILLARS ===== */
        .pillars-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 60px;
        }
        :global(.pillar-card) {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 32px; transition: border-color 0.3s;
        }
        :global(.pillar-card:hover) { border-color: var(--warm); }
        .pillar-num {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--warm); letter-spacing: 2px; margin-bottom: 16px;
        }
        :global(.pillar-card) h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 2px; margin-bottom: 6px;
        }
        .pillar-sub {
          font-size: 12px; color: var(--gray); margin-bottom: 12px; font-weight: 300;
        }
        :global(.pillar-card) p {
          font-size: 13px; line-height: 1.7; color: var(--text-light); font-weight: 300;
        }

        /* ===== VALUE TIERS ===== */
        .value-tiers {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-top: 60px;
        }
        :global(.value-tier) {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 40px 32px; transition: border-color 0.3s;
        }
        :global(.value-tier:hover) { border-color: var(--warm); }
        :global(.value-tier.highlight) { border-color: var(--warm); background: rgba(45,80,22,0.05); }
        .tier-level {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--warm); margin-bottom: 16px;
        }
        :global(.value-tier) h3 {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px;
          letter-spacing: 2px; margin-bottom: 12px;
        }
        :global(.value-tier) p {
          font-size: 13px; line-height: 1.7; color: var(--text-light); font-weight: 300;
        }

        /* ===== CONCEPT BLOCKS ===== */
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

        /* ===== MATERIAL PALETTE ===== */
        .material-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 2px; margin-bottom: 24px;
        }
        .material-grid {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px;
        }
        .material-item {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 20px 16px; text-align: center;
          font-size: 11px; letter-spacing: 1px; color: var(--text-mid);
        }

        /* ===== EVOLUTION ===== */
        .evolution-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-top: 60px;
        }
        :global(.evolution-card) {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 40px 32px; transition: border-color 0.3s;
        }
        :global(.evolution-card:hover) { border-color: var(--warm); }
        .evo-num {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--warm); letter-spacing: 2px; margin-bottom: 16px;
        }
        :global(.evolution-card) h4 {
          font-size: 16px; font-weight: 500; margin-bottom: 12px;
        }
        :global(.evolution-card) p {
          font-size: 13px; line-height: 1.7; color: var(--text-light); font-weight: 300;
        }

        /* ===== GALLERY ===== */
        .gallery-section { background: var(--dark); color: #fff; }
        .gallery-section .section-label { color: var(--warm); }
        .gallery-section .section-title { color: #fff; }
        .gallery-section .section-desc { color: rgba(255,255,255,0.5); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 20px; margin-top: 60px;
        }
        .gallery-item { overflow: hidden; border-radius: 4px; }
        .gallery-item img {
          width: 100%; height: auto; display: block;
          transition: transform 0.6s ease;
        }
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item.wide { grid-column: span 2; }
        .gallery-3col {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 20px;
        }
        .gallery-3col .gallery-item { aspect-ratio: 1; }
        .gallery-3col .gallery-item img { height: 100%; object-fit: cover; }

        /* ===== LOCATIONS ===== */
        .locations-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 24px; margin-top: 60px;
        }
        :global(.location-card) {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 32px; transition: border-color 0.3s; position: relative;
        }
        :global(.location-card:hover) { border-color: var(--warm); }
        :global(.location-card.active) { border-color: var(--warm); }
        :global(.location-card) h4 {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 2px; margin-bottom: 6px;
        }
        .loc-sub {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--gray); letter-spacing: 1px; margin-bottom: 16px;
        }
        :global(.location-card) p {
          font-size: 13px; line-height: 1.7; color: var(--text-light); font-weight: 300;
        }
        .now-open {
          position: absolute; top: 16px; right: 16px;
          background: var(--warm); color: #fff; padding: 4px 12px;
          border-radius: 20px; font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 600;
        }

        /* ===== CREDIT ===== */
        .credit-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 32px;
        }
        .credit-label {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--gray); margin-bottom: 8px;
        }
        .credit-value { font-size: 14px; font-weight: 400; line-height: 1.5; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .story-grid,
          :global(.concept-block),
          :global(.concept-block.reverse) { grid-template-columns: 1fr; }
          :global(.concept-block.reverse) .concept-text { order: 0; }
          :global(.concept-block.reverse) .concept-img { order: 1; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item.wide { grid-column: span 1; aspect-ratio: 16/10; }
          .gallery-item.wide img { height: 100%; object-fit: cover; }
          .gallery-3col { grid-template-columns: 1fr 1fr; }
          .pillars-grid { grid-template-columns: 1fr 1fr; }
          .value-tiers { grid-template-columns: 1fr; }
          .evolution-grid { grid-template-columns: 1fr; }
          .locations-grid { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr 1fr; }
          .material-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .pillars-grid { grid-template-columns: 1fr; }
          .gallery-3col { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr; }
          .material-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}
