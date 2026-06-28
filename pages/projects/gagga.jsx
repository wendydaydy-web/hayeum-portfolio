import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'design', label: 'Design' },
  { id: 'store', label: 'Store' },
  { id: 'process', label: 'Process' },
  { id: 'locations', label: 'Locations' },
];

const I = (name) => `/images/gagga/${name}`;

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

export default function Gagga() {
  return (
    <>
      <Head>
        <title>GAGGA — Pet Grocery Store</title>
        <meta name="description" content="GAGGA — 한국 최초 펫 그로서리 스토어. 전통 약방 컨셉의 공간 브랜딩. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">GAGGA</h1>
          <p className="st-hero-positioning">
            <span data-ko>강형욱(개통령)이 설립한 한국 최초의 펫 그로서리 스토어 — 전통 약방 컨셉을 현대적으로 재해석한 공간 브랜딩(네이밍 · VI · 공간 디자인).</span>
            <span data-en>Korea&apos;s first pet grocery store founded by Kang Hyung-wook — spatial branding reinterpreting the traditional Korean apothecary (naming · VI · spatial design).</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>기존 펫샵의 시각적 소음을 걷어내고 동네에서 신뢰할 수 있는 큐레이션 공간을 지향했습니다. 차분하고 미니멀한 “강아지를 위한 약방” — 네이밍부터 브랜드 아이덴티티, 공간 디자인까지 전 과정을 담당했습니다.</span>
            <span data-en>Stripping away the visual noise of conventional pet shops, GAGGA aspires to be a trusted, curated neighborhood space — a calm, minimal “apothecary for dogs.” We led the full journey from naming and brand identity to spatial design.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“MUJI for dogs — 강아지를 위한 약방.”</span>
            <span data-en>“MUJI for dogs — the apothecary for dogs.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>브랜드 기획 · VI · 공간 디자인</span>
              <span data-en>Brand Planning · VI · Spatial Design</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>펫 그로서리 스토어 · 리테일</span>
              <span data-en>Pet Grocery Store · Retail</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | Bodeum Company (강형욱)</span>
              <span className="st-info-line">AGENCY | SpreadWorks · Suwon · Wangsimni</span>
            </p>
          </div>
        </section>

        <div className="st-full-img"><img src={I('cover.jpg')} alt="GAGGA store" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>강아지를 위한 약방</h2>
              <h2 className="st-section-title" data-en>The Apothecary for Dogs</h2>
              <p className="st-section-desc" data-ko>GAGGA(가까)는 한국 최초의 “펫 그로서리 스토어”입니다. 한국 전통 약방(yakbang)의 컨셉에서 출발해, 동네에서 신뢰할 수 있는 공간이자 필요한 것을 정확히 찾을 수 있는 큐레이션 환경을 지향합니다. 기존 펫샵의 시각적 소음을 걷어낸, “MUJI for dogs”의 차분하고 미니멀한 공간입니다.</p>
              <p className="st-section-desc" data-en>GAGGA is Korea&apos;s first “pet grocery store.” Starting from the traditional Korean apothecary (yakbang), it aspires to be a trusted neighborhood space with a curated environment — calm and minimal, “MUJI for dogs.”</p>
              <p className="st-section-desc" data-ko>이름 ‘가까’는 강아지 짖는 소리이자 한국어 ‘가까이(nearby)’를 담고 있습니다. 시그니처 ‘개마카세(dog omakase)’ 무료 시식은 강아지 — 실제 소비자 — 를 중심에 놓는 역발상입니다. 한국 최고의 반려견 트레이너 강형욱(개통령)이 설립했습니다.</p>
              <p className="st-section-desc" data-en>The name ‘GAGGA’ sounds like a dog&apos;s bark while meaning ‘nearby’ in Korean. The signature ‘Dog Omakase’ free tasting puts the dog — the actual consumer — at the center. Founded by Kang Hyung-wook, Korea&apos;s most renowned dog trainer.</p>
              <div className="st-keywords">
                <span className="st-keyword">Pet Grocery</span>
                <span className="st-keyword">Dog Omakase</span>
                <span className="st-keyword">Apothecary</span>
              </div>
            </Reveal>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Brand Value — Three Tiers</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card">
                <h4>Communicate + Reasonable</h4>
                <p className="st-card-sub">Basic Value</p>
                <p data-ko>소통과 신뢰 기반의 큐레이션.</p>
                <p data-en>Communication and trust-based curation.</p>
              </Reveal>
              <Reveal className="st-card">
                <h4>Arrange + Recognition</h4>
                <p className="st-card-sub">Attractive Value</p>
                <p data-ko>시인성 중심의 제품 분류.</p>
                <p data-en>Visibility-driven product categorization.</p>
              </Reveal>
              <Reveal className="st-card">
                <h4>With Pet + DX</h4>
                <p className="st-card-sub">Differentiating Value</p>
                <p data-ko>반려동물 직접 체험, 방문 이유가 명확한 브랜드.</p>
                <p data-en>Direct pet experience — a brand with a clear reason to visit.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 DESIGN ── */}
        <section className="st-section alt" id="design">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Design</p>
              <h2 className="st-section-title" data-ko>공간 아이덴티티의 네 기둥</h2>
              <h2 className="st-section-title" data-en>Four Pillars of Spatial Identity</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Signature</h4><p className="st-card-sub" data-ko>고유의</p><p className="st-card-sub" data-en>Distinctive</p><p data-ko>분명한 브랜드 이미지, 어느 지점이든 일관된 디자인.</p><p data-en>A clear brand image with consistent design across every location.</p></Reveal>
              <Reveal className="st-card"><h4>Intelligent</h4><p className="st-card-sub" data-ko>영리한</p><p className="st-card-sub" data-en>Smart</p><p data-ko>필요한 곳에 필요한 것을, 한 눈에 볼 수 있도록 정리.</p><p data-en>Everything in its right place — organized for visibility at a glance.</p></Reveal>
              <Reveal className="st-card"><h4>Cozy &amp; Calm</h4><p className="st-card-sub" data-ko>정감있는, 정돈된</p><p className="st-card-sub" data-en>Warm &amp; Ordered</p><p data-ko>심플한 우드톤, 반려동물과의 따뜻한 유대.</p><p data-en>Simple wood tones, a warm bond with companion animals.</p></Reveal>
              <Reveal className="st-card"><h4>Pet Friendly</h4><p className="st-card-sub" data-ko>펫 친화적인</p><p className="st-card-sub" data-en>Pet-Centered</p><p data-ko>산책 동선 기반, 반려동물 중심 행동·동선 고려.</p><p data-en>Walk-based circulation, designed around pet behavior.</p></Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Logo &amp; Symbol</p>
              <h2 className="st-section-title" data-ko>강아지와 사람 모두에게 통하는 G</h2>
              <h2 className="st-section-title" data-en>The G That Speaks to Dogs and Humans</h2>
              <p className="st-section-desc" data-ko>대문자 G에 꼬리 형상의 곡선, 두 ‘a’의 리듬을 달리해 자연스럽게 ‘가까?’로 읽히도록 했습니다. G 네거티브 스페이스에 강아지 옆모습 실루엣을 넣고, 시인성 보완을 위해 닥스훈트 캐릭터를 더했습니다.</p>
              <p className="st-section-desc" data-en>A capital G with a tail-shaped curve; the two ‘a’s carry different rhythms so the name reads as ‘gagga?’. A dog silhouette sits in the G&apos;s negative space, with a dachshund character added for recognizability.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('branding.jpg')} alt="GAGGA Branding" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-00.webp')} alt="GAGGA Logo" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('render-01.webp')} alt="Symbol A" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-02.webp')} alt="Symbol B" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-03.webp')} alt="Character" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 03 STORE ── */}
        <section className="st-section" id="store">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Store</p>
              <h2 className="st-section-title" data-ko>약방이 현실이 되다</h2>
              <h2 className="st-section-title" data-en>Where the Apothecary Comes to Life</h2>
              <p className="st-section-desc" data-ko>왕십리 2호점 실제 완공 사진.</p>
              <p className="st-section-desc" data-en>Wangsimni 2nd store — completed interior photography.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('interior.jpg')} alt="GAGGA Interior" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-01.jpg')} alt="Store entrance" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-02.jpg')} alt="Store interior" loading="lazy" /></div>
              <div className="st-item"><img src={I('tasting.jpg')} alt="Tasting zone" loading="lazy" /></div>
              <div className="st-item"><img src={I('shelf.jpg')} alt="Shelf display" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('store-03.jpg')} alt="Detail 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-04.jpg')} alt="Detail 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-05.jpg')} alt="Detail 3" loading="lazy" /></div>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('store-06.jpg')} alt="Store 6" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-07.jpg')} alt="Store 7" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-08.jpg')} alt="Store 8" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-09.jpg')} alt="Store 9" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('store-13.jpg')} alt="Store 13" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-14.jpg')} alt="Store 14" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-15.jpg')} alt="Store 15" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 PROCESS ── */}
        <section className="st-section alt" id="process">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Process</p>
              <h2 className="st-section-title" data-ko>3D 렌더링에서 현실로</h2>
              <h2 className="st-section-title" data-en>From 3D Renderings to Reality</h2>
            </Reveal>

            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3 data-ko>A안 — 라이트 우드</h3>
                <h3 data-en>Option A — Light Wood</h3>
                <p data-ko>라이트 우드 + 그린 테라조 아일랜드 + 원목 바닥. 밝고 개방적인 공간 제안.</p>
                <p data-en>Light wood + green terrazzo island + solid wood floor. A bright, open spatial proposal.</p>
              </div>
              <div><img src={I('render-04.webp')} alt="Option A rendering" loading="lazy" /></div>
            </Reveal>
            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3 data-ko>B안 (채택) — 다크 우드</h3>
                <h3 data-en>Option B (Adopted) — Dark Wood</h3>
                <p data-ko>다크 우드 패널링 + 이미테이션 마블 테라조 + 그레이 타일 바닥. 약방의 정제된 분위기를 살린 최종안.</p>
                <p data-en>Dark wood paneling + imitation marble terrazzo + gray tile floor. The final design capturing the refined apothecary atmosphere.</p>
              </div>
              <div><img src={I('render-05.webp')} alt="Option B rendering (adopted)" loading="lazy" /></div>
            </Reveal>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 60 }}>Material Palette</p>
            </Reveal>
            <div className="st-keywords">
              <span className="st-keyword">Wood / LPM Board</span>
              <span className="st-keyword">Paint</span>
              <span className="st-keyword">Imitation Marble</span>
              <span className="st-keyword">Green Tile</span>
              <span className="st-keyword">Metal</span>
              <span className="st-keyword">Gray Tile</span>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('render-06.webp')} alt="Rendering detail 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('render-07.webp')} alt="Rendering detail 2" loading="lazy" /></div>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Store Evolution</p>
              <h2 className="st-section-title" data-ko>수원에서 왕십리로: 강아지로부터 배우다</h2>
              <h2 className="st-section-title" data-en>From Suwon to Wangsimni: Learning from the Dog</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Tasting Zone</h4><p className="st-card-sub">01</p><p data-ko>주변부 → 중앙으로 이동. 오픈 쇼케이스, 라이브 샘플 준비.</p><p data-en>Moved from periphery → center. Open showcase with live sample prep.</p></Reveal>
              <Reveal className="st-card"><h4>Sample Display</h4><p className="st-card-sub">02</p><p data-ko>비닐 소분 → 병입형 + 외부 노출 디스플레이로 전환.</p><p data-en>From vinyl sachets → bottled format + outward-facing display.</p></Reveal>
              <Reveal className="st-card"><h4>Modular Shelving</h4><p className="st-card-sub">03</p><p data-ko>400+ SKU, 잦은 변경 → 채널 모듈 가변형 수납 시스템.</p><p data-en>400+ SKUs with frequent changes → channel-based modular shelving.</p></Reveal>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('store-20.jpg')} alt="Tasting zone evolution" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-22.jpg')} alt="Sample display" loading="lazy" /></div>
              <div className="st-item"><img src={I('store-24.jpg')} alt="Modular shelving" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 05 LOCATIONS ── */}
        <section className="st-section" id="locations">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Locations</p>
              <h2 className="st-section-title" data-ko>하나의 철학, 두 개의 매장</h2>
              <h2 className="st-section-title" data-en>Two Stores, One Philosophy</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card">
                <h4>수원 영통 1호점</h4>
                <p className="st-card-sub">Sep 2024 · Korea&apos;s First Pet Grocery Store</p>
                <p data-ko>경기 수원시 영통구 권선로908번길 47, 드림타워 1층 103호 — 평일 13:00–21:00 / 주말 12:00–21:00 (월 휴무)</p>
                <p data-en>47 Gwonseon-ro 908beon-gil, Yeongtong-gu, Suwon — Weekdays 13:00–21:00 / Weekends 12:00–21:00 (Closed Mon)</p>
              </Reveal>
              <Reveal className="st-card">
                <h4>왕십리 2호점 · Now Open</h4>
                <p className="st-card-sub">2025 · SpreadWorks Full Spatial Redesign</p>
                <p data-ko>서울특별시 성동구 왕십리 — SpreadWorks 풀 공간 리디자인</p>
                <p data-en>Wangsimni, Seongdong-gu, Seoul — SpreadWorks full spatial redesign</p>
              </Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Credit</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p>Bodeum Company (강형욱 / Episode)</p></Reveal>
              <Reveal className="st-card"><h4>Design Agency</h4><p>SpreadWorks</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p>Brand Planning / VI / Spatial Design</p></Reveal>
              <Reveal className="st-card"><h4>Location</h4><p>Suwon · Wangsimni, Seoul</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #4A2E20;
          --secondary: #D4C6AB;
          --accent-ink: var(--accent);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f6f2ec;
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
