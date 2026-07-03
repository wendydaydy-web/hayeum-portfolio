import Link from 'next/link';

/**
 * 공용 하단 고정 UI (BENSON 참고: 좌하단 LIST + 우하단 "맨 위로" 버튼).
 * BENSON 페이지는 자체 인라인 버전을 그대로 사용하며, 신규 프로젝트만 이 컴포넌트를 쓴다.
 *
 * @param {string} [props.arrowSrc]  - 우하단 버튼에 쓸 커스텀 화살표 이미지 경로.
 *                                     지정 시 그 이미지를 버튼으로 사용(예: tofuG 손그림 화살표).
 *                                     미지정 시 BENSON식 검정 폴리곤 버튼 + ↑ 글리프.
 * @param {string} [props.listHref]  - LIST 링크 목적지 (기본 '/#project' — WORK 목록).
 * @param {boolean} [props.showList]  - 좌하단 LIST 표시 여부 (기본 true). false면 숨김.
 */
export default function StudioFooter({ arrowSrc, listHref = '/#project', showList = true }) {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {showList && <div className="list-bar"><Link href={listHref}>LIST</Link></div>}
      <button
        type="button"
        className={`top-btn${arrowSrc ? ' has-img' : ''}`}
        onClick={toTop}
        aria-label="Back to top"
      >
        {arrowSrc ? <img src={arrowSrc} alt="" /> : <span aria-hidden="true">&#8593;</span>}
      </button>

      <style jsx>{`
        .list-bar {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 600;
        }
        .list-bar :global(a) {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: underline;
          color: var(--page-fg, #1a1a18);
        }
        .top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 600;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* 기본: 중립 원형 버튼 + 화살표 (BENSON 폴리곤은 BENSON 전용이므로 사용 안 함) */
        .top-btn:not(.has-img) {
          width: 48px;
          height: 48px;
          background: #1a1a18;
          color: #fff;
          font-size: 18px;
          border-radius: 50%;
        }
        .top-btn:not(.has-img):hover {
          opacity: 0.85;
        }
        /* 커스텀 이미지 화살표 (tofuG 손그림 등) */
        .top-btn.has-img {
          width: 66px;
          height: 66px;
          background: none;
        }
        .top-btn.has-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        @media (max-width: 600px) {
          .top-btn.has-img { width: 56px; height: 56px; }
        }
      `}</style>
    </>
  );
}
