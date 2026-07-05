import { useEffect, useRef } from 'react';

/**
 * BENSON 전용 커스텀 커서 — arrow(B) 로고.
 * 화살표 특성: [방향 추종] + [타깃 조준 확대] + [클릭 반동(발사)].
 *
 * - 데스크톱(fine pointer)만 활성. 터치/coarse·prefers-reduced-motion → 기본 커서.
 * - 텍스트 입력창 위에선 기본 text caret 유지(커서 숨김).
 * - 위치/각도/스케일은 requestAnimationFrame + lerp 보간으로 부드럽게.
 *
 * base 각도: 이미지의 "촉"이 위(↑)를 향한다고 가정.
 *   → 이동 벡터 (dx,dy) 방향으로 회전 = atan2(dy,dx)deg + 90.
 * (제공 이미지는 arrow가 아니라 B 로고라, 회전이 어색하면 ROTATE=false 로 끄면 됨)
 */
const CURSOR_SIZE = 32;     // px
const HALF = CURSOR_SIZE / 2;
const ROTATE = true;        // 방향 회전 on/off (B 로고라 어색하면 false)

export default function BensonCursor() {
  const elRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return undefined;

    const el = elRef.current;
    if (!el) return undefined;
    document.body.classList.add('benson-cursor-on');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2; // 목표(실제 마우스)
    let px = mx, py = my;         // 렌더 위치(보간)
    let angle = 0, targetAngle = 0;
    let scale = 1, targetScale = 1;
    let recoil = 0;               // 클릭 발사 오프셋(px)
    let moveAngle = 0;            // 마지막 이동 방향각
    let hoverEl = null;
    let visible = false;
    let raf = 0;

    const INTERACTIVE = 'a, button, [role="button"], input[type="submit"], input[type="button"], label[for], summary, [data-cursor="target"]';
    const TEXTY = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

    const onMove = (e) => {
      const nx = e.clientX, ny = e.clientY;
      const dx = nx - mx, dy = ny - my;
      mx = nx; my = ny;
      visible = true;
      if (Math.hypot(dx, dy) > 1.4) moveAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

      const t = e.target;
      const texty = t.closest ? t.closest(TEXTY) : null;
      if (texty) {
        document.body.classList.add('benson-cursor-text');
        hoverEl = null;
      } else {
        document.body.classList.remove('benson-cursor-text');
        hoverEl = t.closest ? t.closest(INTERACTIVE) : null;
      }
    };
    const onDown = () => { recoil = 4; };            // 발사 반동
    const onEnter = () => { visible = true; };
    const onLeave = () => { visible = false; };

    const tick = () => {
      px += (mx - px) * 0.24;
      py += (my - py) * 0.24;

      if (hoverEl) {
        // 타깃 조준: 요소 중심을 향해 각도 정렬 + 확대
        const r = hoverEl.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        targetAngle = (Math.atan2(cy - py, cx - px) * 180) / Math.PI + 90;
        targetScale = 1.28;
      } else {
        targetAngle = moveAngle;
        targetScale = 1;
      }

      // 최단 경로 각도 보간
      let da = ((targetAngle - angle + 540) % 360) - 180;
      angle += da * 0.2;
      scale += (targetScale - scale) * 0.18;
      recoil += (0 - recoil) * 0.28;   // 반동 감쇠 → 원위치

      // 반동: 촉이 가리키는 방향(angle-90)으로 순간 이동
      const rad = ((ROTATE ? angle : moveAngle) - 90) * Math.PI / 180;
      const ox = Math.cos(rad) * recoil;
      const oy = Math.sin(rad) * recoil;

      const rot = ROTATE ? angle : 0;
      el.style.transform =
        `translate3d(${px - HALF + ox}px, ${py - HALF + oy}px, 0) rotate(${rot}deg) scale(${scale})`;
      el.style.opacity = visible ? '1' : '0';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('benson-cursor-on', 'benson-cursor-text');
    };
  }, []);

  return (
    <>
      <div ref={elRef} className="benson-cursor" aria-hidden="true">
        <img src="/images/benson/benson-arrow-cursor.png" alt="" draggable="false" />
      </div>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body.benson-cursor-on,
          body.benson-cursor-on a,
          body.benson-cursor-on button,
          body.benson-cursor-on [role="button"],
          body.benson-cursor-on label { cursor: none; }
          body.benson-cursor-on input,
          body.benson-cursor-on textarea,
          body.benson-cursor-on.benson-cursor-text { cursor: text; }
        }
        .benson-cursor {
          position: fixed;
          top: 0; left: 0;
          width: ${CURSOR_SIZE}px;
          height: ${CURSOR_SIZE}px;
          pointer-events: none;
          z-index: 100000;
          opacity: 0;
          transform: translate3d(-120px, -120px, 0);
          will-change: transform, opacity;
          transition: opacity 0.18s ease;
        }
        .benson-cursor img {
          width: 100%;
          height: 100%;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          /* 흰 외곽선 + 옅은 그림자 → 크림/흰·어두운 배경 모두에서 가시성 확보 */
          filter:
            drop-shadow(0 0 1px rgba(255,255,255,0.9))
            drop-shadow(0 0 2px rgba(255,255,255,0.6))
            drop-shadow(0 1px 4px rgba(0,0,0,0.35));
        }
        /* 텍스트 입력 위에선 커스텀 커서 숨김(기본 caret) */
        body.benson-cursor-text .benson-cursor { opacity: 0 !important; }
        /* 터치/coarse·모션축소 → 완전 비활성 */
        @media (hover: none), (pointer: coarse) { .benson-cursor { display: none; } }
        @media (prefers-reduced-motion: reduce) { .benson-cursor { display: none; } }
      `}</style>
    </>
  );
}
