import { useState, useEffect, useCallback } from 'react';

/**
 * 섹션 메뉴 (스크롤 교체형 상단바에서 글로벌 메뉴와 "같은 자리"를 차지) — 독립 컴포넌트.
 *
 * 책임
 *  - 섹션 링크 렌더(현재 섹션만 검정 강조, 나머지 연회색 — ScrollSpy 자동 갱신).
 *  - 클릭 시 해당 섹션으로 스무스 스크롤.
 *  - 모바일: 항목 나열 대신 "현재 섹션 라벨 탭 → 드롭다운".
 *  - 표시/숨김(글로벌 메뉴와의 크로스페이드)은 "부모"가 제어 → 이 컴포넌트는
 *    항상 자리만 채우며, 추후 세로 사이드 레일 등으로 교체하기 쉽게 분리해 둠.
 *
 * 색은 CSS 변수로 교체 가능:
 *   --sn-idle   : 비활성 회색 (기본 #C2BFB6)
 *   --sn-active : 활성 검정   (기본 #1A1A18)
 *
 * @param {Array}  props.sections - [{ id, label }] — 존재하는 섹션만 전달(없는 항목 생략)
 * @param {number} [props.offset] - ScrollSpy 기준선 + 스크롤 점프 오프셋(px). 기본 80
 */
export default function SectionNav({ sections = [], offset = 80 }) {
  const valid = sections.filter((s) => s && s.id && s.label);
  const ids = valid.map((s) => s.id).join(',');

  const [active, setActive] = useState(valid[0]?.id || null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!valid.length) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const threshold = offset + 4;
      let current = valid[0].id;
      for (const s of valid) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, offset]);

  const go = useCallback(
    (e, id) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setOpen(false);
    },
    [offset]
  );

  if (!valid.length) return null;

  const activeLabel = (valid.find((s) => s.id === active) || valid[0]).label;

  return (
    <div className="section-nav">
      {/* 데스크탑: 가로 줄 */}
      <ul className="section-nav-list">
        {valid.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'active' : ''}
              onClick={(e) => go(e, s.id)}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      {/* 모바일: 현재 라벨 탭 → 드롭다운 */}
      <div className="section-nav-mobile">
        <button
          type="button"
          className="section-nav-current"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span>{activeLabel}</span>
          <span className={`section-nav-caret${open ? ' open' : ''}`} aria-hidden="true">
            ▾
          </span>
        </button>
        {open && (
          <ul className="section-nav-dropdown">
            {valid.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === s.id ? 'active' : ''}
                  onClick={(e) => go(e, s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .section-nav {
          display: inline-flex;
          align-items: center;
        }
        /* 글로벌 메뉴와 동일한 타이포(같은 자리 교체이므로 크기/자간 맞춤) */
        .section-nav-list {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        /* 글로벌 메뉴 li와 동일하게 — line-box(normal) 비대칭 높이 제거 */
        .section-nav-list li {
          display: inline-flex;
          align-items: center;
          line-height: 1;
        }
        .section-nav-list a {
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          line-height: 1;
          white-space: nowrap;
          color: var(--sn-idle, #c2bfb6);
          transition: color 0.25s;
        }
        .section-nav-list a:hover {
          color: var(--sn-active, #1a1a18);
        }
        .section-nav-list a.active {
          color: var(--sn-active, #1a1a18);
        }

        /* 모바일 드롭다운 — 기본 숨김 */
        .section-nav-mobile {
          display: none;
          position: relative;
        }
        .section-nav-current {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          line-height: 1;
          color: var(--sn-active, #1a1a18);
          padding: 0;
        }
        .section-nav-caret {
          font-size: 9px;
          transition: transform 0.25s;
        }
        .section-nav-caret.open {
          transform: rotate(180deg);
        }
        .section-nav-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 150px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          list-style: none;
          margin: 0;
          padding: 6px 0;
          text-align: right;
        }
        .section-nav-dropdown a {
          display: block;
          padding: 10px 18px;
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          color: var(--sn-idle, #c2bfb6);
          white-space: nowrap;
        }
        .section-nav-dropdown a.active {
          color: var(--sn-active, #1a1a18);
          font-weight: 600;
        }

        /* 글로벌 메뉴 모바일 타이포와 정렬 */
        @media (max-width: 809px) {
          .section-nav-list {
            gap: 14px;
          }
          .section-nav-list a {
            font-size: 10px;
            letter-spacing: 0.08em;
          }
        }
        @media (max-width: 600px) {
          .section-nav-list {
            display: none;
          }
          .section-nav-mobile {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
