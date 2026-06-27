import { useState, useEffect } from 'react';

/**
 * 페이지 최상단 가장자리에 고정되는 스크롤 진행 막대.
 * - 가로 공간을 차지하지 않고(높이만 있는 fixed 바) 글로벌 헤더 위 끝에 깔림.
 * - 히어로/본문 구분 없이 항상 표시되며 모바일에서도 동일 동작.
 *
 * 색·두께는 CSS 변수로 교체 가능:
 *   --sp-fill   : 채움 색 (기본 #1A1A18)
 *   --sp-height : 막대 두께 (기본 3px)
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
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
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ width: `${pct}%` }} />
      <style jsx>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--sp-height, 3px);
          z-index: 300; /* 글로벌 nav(100)보다 위 — 맨 위 끝 가장자리 */
          background: transparent;
          pointer-events: none;
        }
        .scroll-progress-fill {
          height: 100%;
          background: var(--sp-fill, #1a1a18);
          transition: width 0.08s linear;
          will-change: width;
        }
      `}</style>
    </div>
  );
}
