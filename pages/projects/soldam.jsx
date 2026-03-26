import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'spatial', label: 'Spatial' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'results', label: 'Impact' },
];

const HERO_META = [
  { label: 'Project', value: 'SOLDAM MARKET — SOLUM HQ' },
  { label: 'Category', value: 'Retail / Smart Showroom' },
  { label: 'Year', value: '2024 — 2025' },
  { label: 'Scope', value: 'Brand Strategy · Space Design · Supervision' },
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function SoldamMarket() {
  return (
    <>
      <Head>
        <title>SOLDAM MARKET — Spatial Branding for Smart Retail</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#0038FF" />

      <ProjectHero
        title={"SOLDAM\nMARKET"}
        label="Spatial Branding &amp; Design Strategy"
        image="/images/soldam/hero.jpg"
        subtitleKo="삼성전기에서 분사한 글로벌 리테일 테크 기업 솔루엠 — B2B 전자부품 제조사를 소비자 접점의 라이프스타일 브랜드로 전환하기 위한 공간 브랜딩 기획. 공간 컨셉 수립, 동선 전략, 3D 디자인 제안까지."
        subtitleEn="Spatial branding concept for SOLUM — a global retail tech company spun off from Samsung Electro-Mechanics — transforming a B2B electronics manufacturer into a consumer-facing lifestyle brand. Space concept, circulation strategy, and 3D design proposal."
        meta={HERO_META}
      />

      {/* ── 01 OVERVIEW ── */}
      <section className="overview" id="overview">
        <Reveal>
          <p className="section-num">01 — Overview</p>
          <h2 className="section-title">테크 기업의 기술력을<br /><em>공간으로 번역하다</em></h2>
        </Reveal>
        <div className="overview-grid">
          <Reveal className="overview-text">
            <p>삼성전기에서 분사한 글로벌 리테일 테크 기업 <strong>솔루엠(SOLUM)</strong>이 용인 신사옥으로 본사를 이전하면서, 1층에 자사 핵심 기술인 ESL(전자가격표시기), AI 카메라, BLE 센서, 디지털 사이니지를 실제 리테일 환경에서 체험할 수 있는 <strong>스마트 리테일 쇼룸</strong>을 구축했습니다.</p>
            <p>단순한 편의점이 아닌, B2B 고객에게는 솔루엠의 <strong>SSP(SOLUM Store Platform)</strong> 기술력을 실증하는 쇼룸이자, B2C 고객에게는 미래형 소비 경험을 제공하는 이중 목적의 공간. 브랜드 네이밍부터 공간 전략, 디자인 제안, 현장 감리까지 전 과정에 참여했습니다.</p>
          </Reveal>
          <Reveal className="overview-stats">
            <div className="stat-card">
              <div className="stat-value">ESL</div>
              <div className="stat-label">전자가격표시기 실시간 재고 연동 시스템 적용</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">AI</div>
              <div className="stat-label">Vision AI 카메라 기반 고객 동선 분석</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">GS</div>
              <div className="stat-label">GS리테일 DX Lab 무인결제 게이트 연계</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">B2B+C</div>
              <div className="stat-label">쇼룸 + 리테일 이중 목적 공간 설계</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 CHALLENGE ── */}
      <section className="challenge" id="challenge">
        <Reveal>
          <p className="section-num">02 — Challenge</p>
          <h2 className="section-title">설계의 <em>핵심 과제</em></h2>
        </Reveal>
        <div className="challenge-content">
          <ul className="challenge-list">
            <Reveal className="challenge-item">
              <span className="challenge-num">01</span>
              <div>
                <h3>동선 = 데이터</h3>
                <p>AI 카메라와 BLE 센서가 고객 동선을 실시간으로 추적하는 공간에서, 동선 설계 자체가 곧 데이터 수집 효율을 결정합니다. 일반 편의점과 달리, 기술이 읽을 수 있는 동선을 설계해야 했습니다.</p>
              </div>
            </Reveal>
            <Reveal className="challenge-item">
              <span className="challenge-num">02</span>
              <div>
                <h3>쇼룸 × 매장의 공존</h3>
                <p>해외 바이어에게는 SSP 플랫폼 데모 공간으로, 지역 주민에게는 일상적 편의점으로 동시에 작동해야 합니다. 체험 동선과 구매 동선이 충돌하지 않는 레이아웃이 필요했습니다.</p>
              </div>
            </Reveal>
            <Reveal className="challenge-item">
              <span className="challenge-num">03</span>
              <div>
                <h3>전자부품 기업의 브랜드 감성 전환</h3>
                <p>B2B 하드웨어 제조사 이미지를 소비자 친화적 라이프스타일 브랜드로 전환하면서도, 기술 기업으로서의 정체성을 유지하는 균형이 필요했습니다.</p>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* ── 03 BRAND STRATEGY ── */}
      <section className="brand-strategy" id="strategy">
        <Reveal>
          <p className="section-num">03 — Brand Naming Strategy</p>
          <h2 className="section-title">세 가지 브랜드 방향,<br /><em>하나의 솔루엠</em></h2>
          <p style={{ maxWidth: 680, fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)', wordBreak: 'keep-all' }}>
            솔루엠의 기술 정체성을 소비자 언어로 번역하기 위해, 타겟 퍼소나와 공간 무드가 서로 다른 세 가지 브랜드 네이밍 안을 제안했습니다.
          </p>
        </Reveal>
        <div className="brand-options">
          {/* Option A */}
          <Reveal className="brand-card">
            <div className="brand-card-visual opt-a">
              <div className="brand-logo-text opt-a-text">
                Pick!<br />
                <span className="sub-brand" style={{ color: 'var(--white)', fontWeight: 700, fontSize: 16 }}>SOLDAM</span>
              </div>
            </div>
            <div className="brand-card-body">
              <p className="brand-card-label">Option A</p>
              <h3 className="brand-card-name">Pick! SOLDAM</h3>
              <p className="brand-card-desc">&ldquo;그냥, 집어봐!&rdquo; — 새로운 CVS, 새로운 소비방법의 즐겁고 아이코닉한 시작. MZ세대 타겟의 캐주얼한 무드.</p>
            </div>
          </Reveal>
          {/* Option B */}
          <Reveal className="brand-card">
            <div className="brand-card-visual opt-b">
              <div className="brand-logo-text opt-b-text">
                LiFELAB<br />
                <span className="sub-brand blue-badge">SOLDAM</span>
              </div>
            </div>
            <div className="brand-card-body">
              <p className="brand-card-label">Option B</p>
              <h3 className="brand-card-name">LiFELAB SOLDAM</h3>
              <p className="brand-card-desc">&ldquo;생활소비를 연구하는 실험실&rdquo; — 편의점도 편집샵도 아닌, 소비 패턴을 학습하는 공간이라는 기술 지향적 포지셔닝.</p>
            </div>
          </Reveal>
          {/* Option C */}
          <Reveal className="brand-card">
            <div className="brand-card-visual opt-c">
              <div className="brand-logo-text opt-c-text">
                STORAGE<br />SOLDAM
              </div>
            </div>
            <div className="brand-card-body">
              <p className="brand-card-label">Option C</p>
              <h3 className="brand-card-name">STORAGE SOLDAM</h3>
              <p className="brand-card-desc">&ldquo;기술과 소비, 생활, 지역, 그 모두를 모았다&rdquo; — AI의 스토리지 같은 창고형 보관소. 힙한 무드와 기억하기 쉬운 단어.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 SPATIAL STRATEGY ── */}
      <section className="spatial" id="spatial">
        <Reveal>
          <p className="section-num">04 — Spatial Strategy</p>
          <h2 className="section-title">데이터가 흐르는<br /><em>동선을 설계하다</em></h2>
        </Reveal>
        <div className="spatial-flow">
          <div className="flow-step">
            <div className="flow-icon">🚪</div>
            <h4>ENTRANCE</h4>
            <p>충전부스/가입부스<br />GS DX Lab 게이트</p>
          </div>
          <div className="flow-step">
            <div className="flow-icon">🛒</div>
            <h4>POP-UP ZONE</h4>
            <p>메인 팝업 매대<br />브랜드 협업 존</p>
          </div>
          <div className="flow-step">
            <div className="flow-icon">📦</div>
            <h4>GS 상품 매대</h4>
            <p>카테고리별 벽면 매대<br />ESL 연동 선반</p>
          </div>
          <div className="flow-step">
            <div className="flow-icon">☕</div>
            <h4>LOUNGE</h4>
            <p>고객 라운지<br />86&quot; 커넥트 월</p>
          </div>
          <div className="flow-step">
            <div className="flow-icon">💳</div>
            <h4>SELF CHECKOUT</h4>
            <p>이미지 인식 셀프 카운터<br />무인결제 시스템</p>
          </div>
        </div>
        <Reveal className="spatial-insight">
          <p>스마트 리테일에서 고객 동선은 곧 데이터 파이프라인입니다.<br />AI 카메라가 추적할 수 있는 명확한 경로, BLE 센서가 체류시간을 측정할 수 있는 구분된 존, ESL이 가시성을 확보할 수 있는 선반 각도 — 모든 공간 결정이 기술 인프라와 동기화되어야 했습니다.</p>
          <span className="insight-author">— Design Strategy Note</span>
        </Reveal>
      </section>

      {/* ── 05 DESIGN PROPOSAL ── */}
      <section className="gallery-section proposal" id="proposal">
        <Reveal>
          <p className="section-num">05 — Design Proposal</p>
          <h2 className="section-title">공간 디자인 <em>제안</em></h2>
        </Reveal>
        <p className="gallery-caption">CONCEPT RENDERINGS — ENSCAPE 3D VISUALIZATION</p>
        <div className="gallery-scroll">
          <img src="/images/soldam/proposal-01-interior-front.jpg" alt="Interior Front View" />
          <img src="/images/soldam/proposal-02-popup-display.jpg" alt="Pop-up & Display" />
          <img src="/images/soldam/proposal-03-lounge-area.jpg" alt="Lounge Area" />
          <img src="/images/soldam/proposal-04-dx-lab-gate.jpg" alt="GS DX Lab Gate" />
          <img src="/images/soldam/proposal-05-full-interior.jpg" alt="Full Interior" />
        </div>
        <div className="gallery-grid-2" style={{ marginTop: 4, padding: '0 clamp(24px, 5vw, 80px)' }}>
          <img src="/images/soldam/proposal-06-soldam-entrance.jpg" alt="Storage SOLDAM Entrance" />
          <img src="/images/soldam/proposal-07-lifelab-entrance.jpg" alt="LiFELAB SOLDAM Entrance" />
        </div>
        <p className="gallery-caption">블루 테라조 · 유리벽돌 파티션 · 스테인리스 — 기술 기업의 차가운 정밀함과 리테일의 접근성을 동시에 구현하는 마테리얼 전략</p>
      </section>

      {/* ── 06 AS BUILT ── */}
      <section className="gallery-section built">
        <Reveal>
          <p className="section-num">06 — As Built</p>
          <h2 className="section-title">완공 <em>현장</em></h2>
        </Reveal>
        <Reveal className="built-note">
          <span className="dot"></span>
          시공 단계에서 GS DX Lab 연계 요구사항 반영 및 파사드 디자인 변경이 진행되었습니다. 2025.08.01 그랜드 오픈.
        </Reveal>
        <div className="gallery-full">
          <img src="/images/soldam/built-01-exterior-corner.jpg" alt="SOLDAM MARKET Exterior Corner" />
        </div>
        <div className="gallery-grid-2">
          <img src="/images/soldam/built-02-entrance.jpg" alt="SOLDAM MARKET Entrance" />
          <img src="/images/soldam/built-03-interior.jpg" alt="SOLDAM MARKET Interior" />
        </div>
        <div className="gallery-full" style={{ marginTop: 4 }}>
          <img src="/images/soldam/built-04-self-checkout.jpg" alt="Self Checkout Zone" />
        </div>
        <p className="gallery-caption">SOLDAM MARKET — SOLUM HQ 1F, Yongin, Grand Open 2025.08.01</p>
      </section>

      {/* ── 07 RESULTS ── */}
      <section className="results" id="results">
        <Reveal>
          <p className="section-num">07 — Impact</p>
          <h2 className="section-title">프로젝트가 <em>만든 가치</em></h2>
        </Reveal>
        <div className="results-grid">
          <Reveal className="result-card">
            <div className="result-icon">🏢</div>
            <h3>기업 쇼룸의 재정의</h3>
            <p>NRF 2026에서 솔루엠이 발표한 SSP 플랫폼의 실증 공간으로 활용. 글로벌 리테일러 대상 PoC 레퍼런스 사이트로 기능.</p>
          </Reveal>
          <Reveal className="result-card">
            <div className="result-icon">📐</div>
            <h3>데이터 기반 공간설계</h3>
            <p>AI 카메라와 BLE 센서가 작동하는 리테일 환경에서, 기술 인프라와 동기화된 공간 전략의 새로운 방법론을 제시.</p>
          </Reveal>
          <Reveal className="result-card">
            <div className="result-icon">🎨</div>
            <h3>브랜드 전환 프레임워크</h3>
            <p>B2B 전자부품 제조사를 소비자 접점의 라이프스타일 브랜드로 전환하는 네이밍-공간 통합 전략을 수립.</p>
          </Reveal>
        </div>
      </section>

      {/* ── CREDIT ── */}
      <section className="credit">
        <dl className="credit-grid">
          <div className="credit-item">
            <dt>Client</dt>
            <dd>SOLUM (솔루엠)</dd>
          </div>
          <div className="credit-item">
            <dt>Design Studio</dt>
            <dd>WCAMP</dd>
          </div>
          <div className="credit-item">
            <dt>Role</dt>
            <dd>Brand Strategy<br />Spatial Design<br />3D Visualization</dd>
          </div>
          <div className="credit-item">
            <dt>Location</dt>
            <dd>SOLUM HQ 1F<br />Yongin, Gyeonggi-do</dd>
          </div>
        </dl>
      </section>

      <ProjectFooter
        prevProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
        nextProject={{ name: 'PAUL BASSETT', href: '/projects/paulbassett' }}
      />

      <style jsx>{`
        /* ===== SECTION COMMON ===== */
        section {
          padding: clamp(60px, 10vw, 140px) clamp(24px, 5vw, 80px);
        }
        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--fg-40);
          margin-bottom: 12px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 40px;
        }
        .section-title :global(em) {
          font-style: normal;
          color: #0038FF;
        }

        /* ===== OVERVIEW ===== */
        .overview { background: var(--bg); }
        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1200px;
        }
        .overview-grid :global(.overview-text p) {
          font-size: 15px;
          line-height: 1.85;
          color: var(--fg-75);
          margin-bottom: 20px;
          word-break: keep-all;
        }
        .overview-grid :global(.overview-text p strong) {
          color: var(--fg);
          font-weight: 500;
        }
        .overview-grid :global(.overview-stats) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-content: start;
          padding-top: 8px;
        }
        .stat-card {
          background: var(--fg-06);
          border-radius: 12px;
          padding: 28px 24px;
          transition: transform 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-card .stat-value {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: #0038FF;
          margin-bottom: 8px;
        }
        .stat-card .stat-label {
          font-size: 12px;
          color: var(--fg-50);
          line-height: 1.5;
          word-break: keep-all;
        }

        /* ===== CHALLENGE ===== */
        .challenge { background: #0f0e0e; color: #fff; }
        .challenge .section-num { color: rgba(255,255,255,0.4); }
        .challenge .section-title { color: #fff; }
        .challenge-content { max-width: 900px; }
        .challenge-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .challenge-list :global(.challenge-item) {
          padding: 32px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 20px;
          align-items: start;
        }
        .challenge-list :global(.challenge-item:first-child) {
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .challenge-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #0038FF;
          padding-top: 4px;
        }
        .challenge-list :global(.challenge-item) h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .challenge-list :global(.challenge-item) p {
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255,255,255,0.6);
          word-break: keep-all;
        }

        /* ===== BRAND STRATEGY ===== */
        .brand-strategy { background: var(--fg-06); }
        .brand-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        .brand-options :global(.brand-card) {
          background: var(--card-bg);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .brand-options :global(.brand-card:hover) {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .brand-card-visual {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .brand-card-visual.opt-a { background: #0038FF; }
        .brand-card-visual.opt-b { background: var(--bg); border-bottom: 1px solid var(--fg-08); }
        .brand-card-visual.opt-c { background: var(--fg-06); border-bottom: 1px solid var(--fg-08); }
        .brand-logo-text {
          font-family: var(--font-display);
          font-weight: 800;
          text-align: center;
          line-height: 1.1;
        }
        .brand-logo-text.opt-a-text { color: #fff; font-size: 42px; }
        .brand-logo-text.opt-b-text { color: var(--fg); font-size: 28px; letter-spacing: 0.05em; font-weight: 300; }
        .brand-logo-text.opt-c-text { color: var(--fg); font-size: 24px; letter-spacing: 0.08em; }
        .brand-logo-text :global(.sub-brand) {
          display: block;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }
        .brand-logo-text :global(.sub-brand.blue-badge) {
          background: #0038FF;
          color: #fff;
          display: inline-block;
          padding: 4px 16px;
          border-radius: 20px;
          font-size: 11px;
          margin-top: 10px;
        }
        .brand-card-body { padding: 28px 24px; }
        .brand-card-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: #0038FF;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .brand-card-name {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .brand-card-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--fg-50);
          word-break: keep-all;
        }

        /* ===== SPATIAL STRATEGY ===== */
        .spatial { background: var(--bg); }
        .spatial-flow {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          margin: 48px 0;
          background: var(--fg-10);
          border-radius: 12px;
          overflow: hidden;
        }
        .flow-step {
          background: var(--bg);
          padding: 32px 20px;
          text-align: center;
          position: relative;
        }
        .flow-step::after {
          content: '→';
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: #0038FF;
          z-index: 1;
        }
        .flow-step:last-child::after { display: none; }
        .flow-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 56, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 20px;
        }
        .flow-step h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .flow-step p {
          font-size: 11px;
          color: var(--fg-50);
          line-height: 1.5;
          word-break: keep-all;
        }
        .spatial-flow + :global(.spatial-insight) {
          margin-top: 0;
        }
        :global(.spatial-insight) {
          background: linear-gradient(135deg, #001A80, #0038FF);
          color: #fff;
          border-radius: 16px;
          padding: 48px;
          margin-top: 48px;
          position: relative;
          overflow: hidden;
        }
        :global(.spatial-insight)::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 24px;
          font-family: var(--font-display);
          font-size: 200px;
          font-weight: 800;
          color: rgba(255,255,255,0.08);
          line-height: 1;
        }
        :global(.spatial-insight) p {
          font-size: 18px;
          line-height: 1.8;
          font-weight: 300;
          position: relative;
          z-index: 1;
          word-break: keep-all;
        }
        .insight-author {
          display: block;
          margin-top: 24px;
          font-size: 12px;
          opacity: 0.6;
          font-family: var(--font-mono);
        }

        /* ===== GALLERY ===== */
        .gallery-section { padding: clamp(60px, 10vw, 140px) 0; }
        .gallery-section .section-num,
        .gallery-section .section-title {
          padding: 0 clamp(24px, 5vw, 80px);
        }
        .gallery-full { margin-top: 48px; }
        .gallery-full img { width: 100%; height: auto; display: block; }
        .gallery-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-top: 4px;
        }
        .gallery-grid-2 img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gallery-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 48px clamp(24px, 5vw, 80px) 24px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .gallery-scroll::-webkit-scrollbar { height: 2px; }
        .gallery-scroll::-webkit-scrollbar-track { background: var(--fg-08); }
        .gallery-scroll::-webkit-scrollbar-thumb { background: #0038FF; }
        .gallery-scroll img {
          flex: 0 0 auto;
          width: min(80vw, 900px);
          height: auto;
          border-radius: 8px;
          scroll-snap-align: start;
        }
        .gallery-caption {
          padding: 16px clamp(24px, 5vw, 80px) 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fg-40);
          letter-spacing: 1px;
        }

        /* ===== PROPOSAL / BUILT ===== */
        .proposal { background: var(--fg-06); }
        .built { background: var(--bg); }
        :global(.built-note) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 56, 255, 0.08);
          border: 1px solid rgba(0, 56, 255, 0.2);
          border-radius: 8px;
          padding: 12px 20px;
          margin: 0 clamp(24px, 5vw, 80px) 40px;
          font-size: 13px;
          color: #0038FF;
          word-break: keep-all;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0038FF;
          flex-shrink: 0;
        }

        /* ===== RESULTS ===== */
        .results { background: #0f0e0e; color: #fff; }
        .results .section-num { color: rgba(255,255,255,0.4); }
        .results .section-title { color: #fff; }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
        }
        :global(.result-card) {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 40px 28px;
          transition: border-color 0.3s ease;
        }
        :global(.result-card:hover) { border-color: #0038FF; }
        .result-icon { font-size: 28px; margin-bottom: 20px; }
        :global(.result-card) h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        :global(.result-card) p {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          word-break: keep-all;
        }

        /* ===== CREDIT ===== */
        .credit {
          background: var(--fg-06);
          padding: 80px clamp(24px, 5vw, 80px);
        }
        .credit-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          max-width: 1000px;
        }
        .credit-grid :global(.credit-item) dt {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fg-40);
          margin-bottom: 8px;
        }
        .credit-grid :global(.credit-item) dd {
          font-size: 14px;
          font-weight: 500;
          color: var(--fg);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .overview-grid { grid-template-columns: 1fr; gap: 48px; }
          .brand-options { grid-template-columns: 1fr; max-width: 480px; }
          .spatial-flow { grid-template-columns: 1fr; }
          .flow-step::after { display: none; }
          .results-grid { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .overview-grid :global(.overview-stats) { grid-template-columns: 1fr; }
          .gallery-grid-2 { grid-template-columns: 1fr; }
          .credit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
