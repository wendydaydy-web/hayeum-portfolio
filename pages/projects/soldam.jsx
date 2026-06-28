import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'built', label: 'Built' },
  { id: 'impact', label: 'Impact' },
];

const I = (name) => `/images/soldam/${name}`;

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

export default function SoldamMarket() {
  return (
    <>
      <Head>
        <title>SOLDAM MARKET — Spatial Branding for Smart Retail</title>
        <meta name="description" content="SOLDAM MARKET — 솔루엠 스마트 리테일 쇼룸 공간 브랜딩. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">SOLDAM MARKET</h1>
          <p className="st-hero-positioning">
            <span data-ko>삼성전기에서 분사한 글로벌 리테일 테크 기업 솔루엠(SOLUM)의 스마트 리테일 쇼룸 — B2B 제조사를 소비자 라이프스타일 브랜드로 전환하는 공간 브랜딩.</span>
            <span data-en>A smart retail showroom for SOLUM — a global retail tech company spun off from Samsung Electro-Mechanics — transforming a B2B manufacturer into a consumer lifestyle brand.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>용인 신사옥 1층에 ESL·AI 카메라·BLE 센서·디지털 사이니지를 실제 리테일 환경에서 체험하는 쇼룸을 구축했습니다. B2B 데모이자 B2C 매장인 이중 목적 공간으로, 브랜드 네이밍부터 공간 전략·디자인 제안·현장 감리까지 전 과정에 참여했습니다.</span>
            <span data-en>On the ground floor of SOLUM&apos;s new Yongin HQ, a showroom lets visitors experience ESL, AI cameras, BLE sensors, and digital signage in a real retail setting — a dual-purpose B2B demo and B2C store. We led the full journey from naming to spatial strategy, design proposal, and supervision.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“B2B 기술을, 소비자 경험으로 번역하다.”</span>
            <span data-en>“Translating B2B technology into consumer experience.”</span>
          </p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>브랜드 전략 · 공간 디자인 · 3D 시각화 · 감리</span>
              <span data-en>Brand Strategy · Space Design · 3D Visualization</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>리테일 · 스마트 쇼룸</span>
              <span data-en>Retail · Smart Showroom</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | SOLUM (솔루엠)</span>
              <span className="st-info-line">STUDIO | WCAMP · SOLUM HQ, Yongin · 2024–2025</span>
            </p>
          </div>
        </section>

        <div className="st-full-img"><img src={I('hero.jpg')} alt="SOLDAM MARKET" /></div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>테크 기업의 기술력을 공간으로 번역하다</h2>
              <h2 className="st-section-title" data-en>Translating Tech DNA Into Space</h2>
              <p className="st-section-desc" data-ko>솔루엠이 용인 신사옥으로 이전하며 1층에 ESL·AI 카메라·BLE 센서·디지털 사이니지를 실제 리테일 환경에서 체험하는 스마트 리테일 쇼룸을 구축했습니다. B2B 고객에게는 SSP(SOLUM Store Platform) 실증 쇼룸, B2C 고객에게는 미래형 소비 경험을 제공하는 이중 목적 공간입니다.</p>
              <p className="st-section-desc" data-en>As SOLUM relocated to its new Yongin HQ, the ground floor became a smart retail showroom where ESL, AI cameras, BLE sensors, and digital signage are experienced in a real retail environment — a dual-purpose space: an SSP (SOLUM Store Platform) demo for B2B clients and a futuristic store for B2C customers.</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>ESL</h4><p data-ko>전자가격표시기 실시간 재고 연동 시스템.</p><p data-en>Real-time inventory sync via electronic shelf labels.</p></Reveal>
              <Reveal className="st-card"><h4>AI</h4><p data-ko>Vision AI 카메라 기반 고객 동선 분석.</p><p data-en>Customer flow analysis via Vision AI cameras.</p></Reveal>
              <Reveal className="st-card"><h4>GS</h4><p data-ko>GS리테일 DX Lab 무인결제 게이트 연계.</p><p data-en>GS Retail DX Lab unmanned checkout gate.</p></Reveal>
              <Reveal className="st-card"><h4>B2B + C</h4><p data-ko>쇼룸 + 리테일 이중 목적 공간 설계.</p><p data-en>Dual-purpose showroom + retail space design.</p></Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Core Design Challenges</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Circulation = Data</h4><p className="st-card-sub">01</p><p data-ko>AI 카메라·BLE 센서가 동선을 실시간 추적하는 공간에서, 동선 설계가 곧 데이터 수집 효율을 결정합니다. 기술이 읽을 수 있는 동선이 필요했습니다.</p><p data-en>Where AI cameras and BLE sensors track movement in real time, circulation design determines data efficiency — paths technology can read.</p></Reveal>
              <Reveal className="st-card"><h4>Showroom × Store</h4><p className="st-card-sub">02</p><p data-ko>해외 바이어에겐 SSP 데모, 지역 주민에겐 편의점으로 동시에 작동해야 합니다. 체험 동선과 구매 동선이 충돌하지 않는 레이아웃이 필요했습니다.</p><p data-en>It had to work as an SSP demo for buyers and an everyday store for locals at once — a layout where demo and purchase flows don&apos;t collide.</p></Reveal>
              <Reveal className="st-card"><h4>Brand Perception Shift</h4><p className="st-card-sub">03</p><p data-ko>B2B 하드웨어 제조사 이미지를 소비자 친화적 라이프스타일 브랜드로 전환하면서도 기술 기업의 정체성을 유지하는 균형.</p><p data-en>Shifting a B2B hardware maker&apos;s image into a consumer-friendly lifestyle brand while keeping its tech identity.</p></Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 STRATEGY ── */}
        <section className="st-section alt" id="strategy">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Strategy</p>
              <h2 className="st-section-title" data-ko>세 가지 브랜드 방향, 하나의 솔루엠</h2>
              <h2 className="st-section-title" data-en>Three Brand Directions, One SOLUM</h2>
              <p className="st-section-desc" data-ko>솔루엠의 기술 정체성을 소비자 언어로 번역하기 위해, 타겟 퍼소나와 공간 무드가 다른 세 가지 네이밍 안을 제안했습니다.</p>
              <p className="st-section-desc" data-en>To translate SOLUM&apos;s tech identity into consumer language, three naming proposals were developed — each with a distinct persona and spatial mood.</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Pick! SOLDAM</h4><p className="st-card-sub">Option A · Casual</p><p data-ko>“그냥, 집어봐!” — 새로운 CVS, 새로운 소비방법의 즐겁고 아이코닉한 시작. MZ세대 타겟.</p><p data-en>“Just pick it!” — a fun, iconic start to a new CVS. Casual mood targeting Gen MZ.</p></Reveal>
              <Reveal className="st-card"><h4>LiFELAB SOLDAM</h4><p className="st-card-sub">Option B · Tech</p><p data-ko>“생활소비를 연구하는 실험실” — 소비 패턴을 학습하는 공간이라는 기술 지향 포지셔닝.</p><p data-en>“A lab studying everyday consumption” — tech-forward positioning as a space that learns consumption patterns.</p></Reveal>
              <Reveal className="st-card"><h4>STORAGE SOLDAM</h4><p className="st-card-sub">Option C · Hip</p><p data-ko>“기술과 소비, 생활, 지역을 모두 모았다” — AI 스토리지 같은 창고형 보관소. 힙하고 기억하기 쉬운 단어.</p><p data-en>“Tech, consumption, life, community — all stored here” — a warehouse-style concept like AI storage.</p></Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Spatial Strategy — Where Data Flows</p>
              <h2 className="st-section-title" data-ko>데이터가 흐르는 동선을 설계하다</h2>
              <h2 className="st-section-title" data-en>Designing Circulation Where Data Flows</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Entrance</h4><p data-ko>충전부스 · 가입부스 · GS DX Lab 게이트</p><p data-en>Charging / sign-up booths · GS DX Lab gate</p></Reveal>
              <Reveal className="st-card"><h4>Pop-up Zone</h4><p data-ko>메인 팝업 매대 · 브랜드 협업 존</p><p data-en>Main pop-up display · brand collaboration zone</p></Reveal>
              <Reveal className="st-card"><h4>GS 상품 매대</h4><p data-ko>카테고리별 벽면 매대 · ESL 연동 선반</p><p data-en>Category wall displays · ESL-linked shelving</p></Reveal>
              <Reveal className="st-card"><h4>Lounge</h4><p data-ko>고객 라운지 · 86&quot; 커넥트 월</p><p data-en>Customer lounge · 86&quot; connect wall</p></Reveal>
              <Reveal className="st-card"><h4>Self Checkout</h4><p data-ko>이미지 인식 셀프 카운터 · 무인결제</p><p data-en>Image-recognition self counter · unmanned checkout</p></Reveal>
            </div>
            <Reveal>
              <p className="st-section-desc" style={{ marginTop: 40, fontStyle: 'italic' }} data-ko>“스마트 리테일에서 고객 동선은 곧 데이터 파이프라인입니다. AI 카메라가 추적할 경로, BLE 센서가 체류시간을 측정할 존, ESL이 가시성을 확보할 선반 각도 — 모든 공간 결정이 기술 인프라와 동기화되어야 했습니다.”</p>
              <p className="st-section-desc" style={{ marginTop: 40, fontStyle: 'italic' }} data-en>“In smart retail, customer circulation is a data pipeline. Paths for AI cameras to track, zones for BLE sensors to measure dwell time, shelf angles for ESL visibility — every spatial decision had to sync with the tech infrastructure.”</p>
            </Reveal>
          </div>
        </section>

        {/* ── 03 PROPOSAL ── */}
        <section className="st-section" id="proposal">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Proposal</p>
              <h2 className="st-section-title" data-ko>공간 디자인 제안</h2>
              <h2 className="st-section-title" data-en>Spatial Design Proposal</h2>
              <p className="st-section-desc" data-ko>블루 테라조 · 유리벽돌 파티션 · 스테인리스 — 기술 기업의 차가운 정밀함과 리테일의 접근성을 동시에 구현하는 마테리얼 전략. (Enscape 3D 시각화)</p>
              <p className="st-section-desc" data-en>Blue terrazzo · glass brick partition · stainless steel — a material strategy balancing tech precision with retail accessibility. (Enscape 3D visualization)</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('proposal-05-full-interior.jpg')} alt="Full Interior" loading="lazy" /></div>
              <div className="st-item"><img src={I('proposal-01-interior-front.jpg')} alt="Interior Front" loading="lazy" /></div>
              <div className="st-item"><img src={I('proposal-02-popup-display.jpg')} alt="Pop-up & Display" loading="lazy" /></div>
              <div className="st-item"><img src={I('proposal-03-lounge-area.jpg')} alt="Lounge Area" loading="lazy" /></div>
              <div className="st-item"><img src={I('proposal-04-dx-lab-gate.jpg')} alt="GS DX Lab Gate" loading="lazy" /></div>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('proposal-06-soldam-entrance.jpg')} alt="STORAGE SOLDAM Entrance" loading="lazy" /></div>
              <div className="st-item"><img src={I('proposal-07-lifelab-entrance.jpg')} alt="LiFELAB SOLDAM Entrance" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 BUILT ── */}
        <section className="st-section alt" id="built">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Built</p>
              <h2 className="st-section-title" data-ko>완공 현장</h2>
              <h2 className="st-section-title" data-en>As Built</h2>
              <p className="st-section-desc" data-ko>시공 단계에서 GS DX Lab 연계 요구사항 반영 및 파사드 디자인 변경이 진행되었습니다. SOLUM HQ 1F, 용인 — 2025.08.01 그랜드 오픈.</p>
              <p className="st-section-desc" data-en>GS DX Lab integration and façade changes were applied during construction. SOLUM HQ 1F, Yongin — grand opening 2025.08.01.</p>
            </Reveal>
            <div className="st-full-img" style={{ marginTop: 40 }}><img src={I('built-01-exterior-corner.jpg')} alt="Exterior Corner" loading="lazy" /></div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('built-02-entrance.jpg')} alt="Entrance" loading="lazy" /></div>
              <div className="st-item"><img src={I('built-03-interior.jpg')} alt="Interior" loading="lazy" /></div>
            </div>
            <div className="st-full-img" style={{ marginTop: 20 }}><img src={I('built-04-self-checkout.jpg')} alt="Self Checkout Zone" loading="lazy" /></div>
          </div>
        </section>

        {/* ── 05 IMPACT ── */}
        <section className="st-section" id="impact">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Impact</p>
              <h2 className="st-section-title" data-ko>프로젝트가 만든 가치</h2>
              <h2 className="st-section-title" data-en>Value Created</h2>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4 data-ko>기업 쇼룸의 재정의</h4><h4 data-en>Redefining Corporate Showrooms</h4><p data-ko>NRF 2026에서 발표한 SSP 플랫폼의 실증 공간으로 활용. 글로벌 리테일러 대상 PoC 레퍼런스 사이트.</p><p data-en>A proof-of-concept space for SOLUM&apos;s SSP platform at NRF 2026 — a PoC reference site for global retailers.</p></Reveal>
              <Reveal className="st-card"><h4 data-ko>데이터 기반 공간설계</h4><h4 data-en>Data-Driven Spatial Design</h4><p data-ko>AI 카메라·BLE 센서가 작동하는 환경에서 기술 인프라와 동기화된 공간 전략의 새 방법론.</p><p data-en>A new methodology for spatial strategy synced with tech infrastructure in an AI/BLE-powered environment.</p></Reveal>
              <Reveal className="st-card"><h4 data-ko>브랜드 전환 프레임워크</h4><h4 data-en>Brand Transition Framework</h4><p data-ko>B2B 제조사를 소비자 라이프스타일 브랜드로 전환하는 네이밍-공간 통합 전략.</p><p data-en>An integrated naming-spatial strategy turning a B2B maker into a consumer lifestyle brand.</p></Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Credit</p>
            </Reveal>
            <div className="st-cards">
              <Reveal className="st-card"><h4>Client</h4><p>SOLUM (솔루엠)</p></Reveal>
              <Reveal className="st-card"><h4>Design Studio</h4><p>WCAMP</p></Reveal>
              <Reveal className="st-card"><h4>Role</h4><p>Brand Strategy · Spatial Design · 3D Visualization</p></Reveal>
              <Reveal className="st-card"><h4>Location</h4><p>SOLUM HQ 1F, Yongin, Gyeonggi-do</p></Reveal>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      <style jsx>{`
        :global(:root) {
          --accent: #0038FF;
          --secondary: #001A80;
          --accent-ink: var(--accent);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f4f6fb;
          --text-mid: #555;
          --gray: #888;
          --keyword-border: #1a1a1a;
        }
        :global(html[data-theme='dark']) {
          --page-bg: #0c0c0c;
          --page-fg: #e8e8e8;
          --section-bg: #121420;
          --text-mid: #aaa;
          --gray: #999;
          --keyword-border: #e8e8e8;
          --accent-ink: #5b7cff;
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }
      `}</style>
    </>
  );
}
