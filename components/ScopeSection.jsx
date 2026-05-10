import { useState } from 'react';

const PlusSVG = () => (
  <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const ITEMS = [
  {
    kanji: '空',
    label: '공간 공',
    eng: 'Concept Strategy',
    ko: { body: '비어 있는 공간은 브랜드 이야기를 담기 위해 존재합니다. 우리는 그 공간에 브랜드 컨셉을 입히고, 이야기가 흐르도록 만듭니다.', tasks: '업무 · 공간 컨셉 기획, 브랜드 스토리 설계' },
    en: { body: 'Empty spaces exist to hold brand stories. We dress spaces in brand concepts, letting narratives flow naturally.', tasks: 'Scope · Space concept planning, Brand story design' },
  },
  {
    kanji: '間',
    label: '사이 간',
    eng: 'Engage & Experience',
    ko: { body: '브랜드와 공간을 이어주는 건 그 안에서 흘러가는 시간과 경험입니다. 우리는 사람들이 머무는 모든 순간을 브랜드 경험으로 설계합니다.', tasks: '업무 · 경험 설계, 체험 프로그램 기획' },
    en: { body: 'What connects brand and space is the time and experience flowing within. We design every moment of presence as a brand experience.', tasks: 'Scope · Experience design, Program planning' },
  },
  {
    kanji: '夏',
    label: '여름 하',
    eng: 'Branding Design',
    ko: { body: '가장 뜨거운 계절, 여름은 브랜드가 가장 빛나는 순간입니다. 하음은 선명하게 기억되는 브랜드를 제안합니다.', tasks: '업무 · 그래픽 디자인 (로고, 패키지, 포스터 etc)' },
    en: { body: 'The hottest season — summer is when a brand shines brightest. Ha-umm proposes brands that are vividly remembered.', tasks: 'Scope · Graphic design (Logo, Package, Poster etc)' },
  },
  {
    kanji: '陰',
    label: '그늘 음',
    eng: 'Spatial Design',
    ko: { body: '뜨거운 여름 속 그늘, 사람들이 머물고 싶은 자리. 보이지 않는 그늘 속 시간과 디테일이 공간의 가치를 완성합니다.', tasks: '업무 · 공간 설계, 실시 설계, 감리' },
    en: { body: "Shade in the hot summer — a place where people want to stay. Invisible time and detail within the shade complete a space's value.", tasks: 'Scope · Spatial design, Construction documentation, Supervision' },
  },
];

export default function ScopeSection({ isKo = true, addRevealRef, className = '' }) {
  const [active, setActive] = useState(null);
  const toggle = (i) => setActive((prev) => (prev === i ? null : i));

  const cls = ['scope', className].filter(Boolean).join(' ');

  return (
    <section className={cls} ref={addRevealRef}>
      <h2 className="scope-title">
        CRAFTING<br/>
        <span className="scope-title-sub">FROM TIP TO TOE</span>
      </h2>

      {ITEMS.map((item, i) => {
        const copy = isKo ? item.ko : item.en;
        return (
          <div key={item.kanji} className={`scope-item${active === i ? ' active' : ''}`}>
            <div className="scope-header" onClick={() => toggle(i)}>
              <div className="scope-header-left">
                <span className="scope-kanji">{item.kanji}</span>
                <div>
                  <p className="scope-label">{item.label}</p>
                  <p className="scope-eng">{item.eng}</p>
                </div>
              </div>
              <div className="scope-toggle"><PlusSVG /></div>
            </div>
            <div className="scope-body">
              <div className="scope-body-content">
                <span>{copy.body}</span>
                <div className="tasks">{copy.tasks}</div>
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .scope {
          padding: 140px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .scope-title {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 80px;
        }
        .scope-title-sub {
          font-weight: 300;
          color: var(--fg-40);
        }
        .scope-item {
          border-top: 1px solid var(--fg-10);
          overflow: hidden;
        }
        .scope-item:last-of-type {
          border-bottom: 1px solid var(--fg-10);
        }
        .scope-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 0;
          cursor: pointer;
          transition: color 0.3s;
        }
        .scope-header:hover { color: var(--fg-70); }
        .scope-header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .scope-kanji {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          min-width: 60px;
        }
        .scope-label {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          color: var(--fg-50);
        }
        .scope-eng {
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 500;
        }
        .scope-toggle {
          width: 40px;
          height: 40px;
          border: 1px solid var(--fg-15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s;
        }
        .scope-item.active .scope-toggle {
          transform: rotate(45deg);
        }
        .scope-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease, padding 0.5s ease;
        }
        .scope-item.active .scope-body {
          max-height: 300px;
          padding-bottom: 32px;
        }
        .scope-body-content {
          padding-left: 84px;
          font-size: 15px;
          line-height: 1.8;
          font-weight: 300;
          color: var(--fg-60);
          word-break: keep-all;
        }
        .scope-body-content :global(.tasks) {
          margin-top: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: var(--fg-40);
          letter-spacing: 0.03em;
        }
        @media (max-width: 1199px) {
          .scope { padding: 100px 24px; }
        }
        @media (max-width: 809px) {
          .scope { padding: 80px 20px; }
          .scope-header-left { gap: 16px; }
          .scope-body-content { padding-left: 0; }
          .scope-kanji { min-width: 40px; }
        }
      `}</style>
    </section>
  );
}
