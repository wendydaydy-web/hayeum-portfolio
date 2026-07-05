import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';
import { journey, expansionCountryNames, hasPhotos, byMeCount, brandTotalCount, openStoreCount, soonStoreCount, countries, countryCount, timelapseStores, spaceGridStores, asOf } from '../../data/tofug-stores';
import { stats, placeRating } from '../../data/tofug-stats';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'Story' },
  { id: 'space', label: 'Space' },
  { id: 'expansion', label: 'Expansion' },
];

const I = (name) => `/images/tofug/${name}`;

/* 섹션 앵커로 스무스 스크롤 (상단 고정 nav 높이만큼 보정) */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = (document.querySelector('nav.nav')?.getBoundingClientRect().height) || 72;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────────────────────
 * 문의 폼 받는 곳 설정 — 나중에 여기 두 값만 채우면 바로 작동합니다.
 *
 *  ① Formspree(또는 유사 폼서비스) 사용 시:
 *     FORMSPREE_ENDPOINT 에 'https://formspree.io/f/xxxxxxxx' 를 넣으면
 *     보내기 → 해당 엔드포인트로 POST(폼 내용 전송)됩니다. (권장)
 *
 *  ② 폼서비스 없이 이메일로 받을 때:
 *     CONTACT_EMAIL 에 'project@haumm.studio' 처럼 주소를 넣으면
 *     보내기 → 메일 클라이언트가 열리며 내용이 채워집니다. (mailto)
 *
 *  둘 다 비어("") 있으면 → "문의 접수 준비 중" 안내만 표시(전송 비활성).
 *  우선순위: FORMSPREE_ENDPOINT 가 있으면 그걸 사용, 없으면 CONTACT_EMAIL.
 * ───────────────────────────────────────────────────────────── */
const CONTACT_EMAIL = '';        // 예: 'project@haumm.studio'
const FORMSPREE_ENDPOINT = '';   // 예: 'https://formspree.io/f/xxxxxxxx'

/* 사이트 언어 상태(EN/KR) 훅 — StudioNav 토글이 document.documentElement.lang 을 바꾸므로 그걸 관찰.
   placeholder 등 속성값처럼 CSS(data-ko/data-en)로 못 바꾸는 텍스트에 사용. */
function useSiteLang() {
  const [lang, setLang] = useState('ko');
  useEffect(() => {
    const read = () => setLang(document.documentElement.lang === 'en' ? 'en' : 'ko');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => obs.disconnect();
  }, []);
  return lang;
}

/* 매장 카드 (byMe / 확장 공용) — byMe·status에 따라 태그를 다르게 렌더 */
function StoreCard({ store }) {
  const isUpcoming = store.status === 'upcoming';
  return (
    <Reveal className={`st-card st-store-card${store.byMe ? ' is-mine' : ' is-expansion'}${isUpcoming ? ' is-upcoming' : ''}`}>
      <div className="st-store-tagrow">
        {store.byMe ? (
          <>
            <span className="st-store-tag mine" data-ko>설계 · 시공 by 공간하음</span>
            <span className="st-store-tag mine" data-en>Designed &amp; Built</span>
          </>
        ) : (
          <>
            <span className="st-store-tag expansion" data-ko>브랜드 확장 · SI 적용</span>
            <span className="st-store-tag expansion" data-en>Brand Expansion · SI</span>
          </>
        )}
        {isUpcoming && (
          <>
            <span className="st-store-tag upcoming" data-ko>오픈 예정</span>
            <span className="st-store-tag upcoming" data-en>Coming soon</span>
          </>
        )}
      </div>
      <h4>{store.name}</h4>
      <p className="st-card-sub">{store.city} · {store.country} · {store.openDate}</p>
      {store.descKo && <p data-ko>{store.descKo}</p>}
      {store.descEn && <p data-en>{store.descEn}</p>}
    </Reveal>
  );
}

/* 구글 플레이스 정보 카드 — 사진 없는 브랜드 매장(soon/미래)용.
   구글 사진은 저작권 문제로 가져오지 않고, 이름·위치·상태 + (있으면) 평점/리뷰만 표시. */
function PlaceInfoCard({ store }) {
  const isSoon = store.status === 'upcoming';
  const r = placeRating(store.placeId);   // { rating, reviews } | null (Places API 동기화 시 채워짐)
  return (
    <Reveal className={`tg-place-card${isSoon ? ' is-soon' : ' is-open'}`}>
      <div className="tg-place-top">
        <span className="tg-place-name">{store.name}</span>
        <span className={`tg-place-badge ${isSoon ? 'soon' : 'open'}`}>
          <span data-ko>{isSoon ? '오픈 예정' : '운영 중'}</span>
          <span data-en>{isSoon ? 'Coming soon' : 'Open'}</span>
        </span>
      </div>
      <div className="tg-place-loc">{[store.city, store.country].filter(Boolean).join(' · ')}</div>
      {r ? (
        <div className="tg-place-rating">
          <span className="tg-place-star" aria-hidden="true">★</span>
          <span className="tg-place-score">{r.rating}</span>
          {r.reviews ? <span className="tg-place-reviews">({Number(r.reviews).toLocaleString()})</span> : null}
          <span className="tg-place-src">Google</span>
        </div>
      ) : (
        <div className="tg-place-rating muted">
          <span data-ko>{isSoon ? '오픈 후 평점 표시' : '평점 준비 중'}</span>
          <span data-en>{isSoon ? 'Rating after opening' : 'Rating pending'}</span>
        </div>
      )}
      {store.url ? (
        <a className="tg-place-link" href={store.url} target="_blank" rel="noopener noreferrer">
          <span data-ko>구글 지도 →</span><span data-en>Google Maps →</span>
        </a>
      ) : null}
    </Reveal>
  );
}

/* 공통 사진 placeholder — 사진 없는 모든 매장은 차콜 박스로 자리만 표시.
   나중에 mainImage/gallery 넣으면 그 자리에 사진이 자동으로 들어감. */
function PhotoPlaceholder({ label }) {
  return (
    <div className="tg-ph-box" role="img" aria-label={`${label || '매장'} 사진 준비 중`}>
      <span className="tg-ph-cap"><span data-ko>사진 준비 중</span><span data-en>Photos coming soon</span></span>
      {label ? <span className="tg-ph-name">{label}</span> : null}
    </div>
  );
}

/* 곧 오픈 · 사진 없는 매장 — compact 정보 칩 */
function PlaceChip({ store }) {
  const isSoon = store.status === 'upcoming';
  return (
    <span className="tg-place-chip">
      <span className="tg-chip-name">{store.name}</span>
      <span className="tg-chip-loc">{store.city || '-'}</span>
      <span className="tg-chip-badge">
        <span data-ko>{isSoon ? '오픈 예정' : '운영'}</span>
        <span data-en>{isSoon ? 'Soon' : 'Open'}</span>
      </span>
    </span>
  );
}

/* EXPANSION 브랜드 여정 — 나라별: 대표 이미지(없으면 placeholder) + 매장 수 + 예정/추가 칩.
   대표에 여러 사진(gallery)이 있으면 클릭 시 라이트박스. 전부 시트에서 자동. */
function JourneyStep({ g, idx }) {
  const openLabelKo = g.openCount > 0 ? `${g.openCount}개 매장${g.openDate ? ` · ${g.openDate}` : ''}` : '오픈 예정';
  const openLabelEn = g.openCount > 0 ? `${g.openCount} store${g.openCount > 1 ? 's' : ''}${g.openDate ? ` · ${g.openDate}` : ''}` : 'Coming soon';
  return (
    <Reveal className="tg-journey-step">
      <div className="tg-journey-media">
        {g.repImage ? <img src={I(g.repImage)} alt={g.country} loading="lazy" /> : <PhotoPlaceholder label={g.country} />}
      </div>
      <div className="tg-journey-body">
        <span className="tg-journey-idx" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
        <h3 className="tg-journey-country">{g.country}</h3>
        <p className="tg-journey-count">
          {g.mine ? (
            <a href="#space" onClick={(e) => { e.preventDefault(); scrollToSection('space'); }}>
              <span data-ko>{g.byMeCount}개 매장 · Space에서 보기 →</span>
              <span data-en>{g.byMeCount} stores · see Space →</span>
            </a>
          ) : (
            <><span data-ko>{openLabelKo}</span><span data-en>{openLabelEn}</span></>
          )}
        </p>
        {g.chips.length > 0 && (
          <div className="tg-chip-row">
            {g.chips.map((s) => <PlaceChip key={s.no} store={s} />)}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ── 로고 커서 (B방식) : 로고가 마우스를 부드럽게 따라오며 멧돌처럼 천천히 회전.
   클릭 시 휙 한 바퀴, 클릭 가능한 요소 위에선 살짝 확대+빨라짐.
   데스크톱(hover·fine 포인터)에서만. 터치/reduced-motion → 기본 커서 유지.
   입력창 위에선 로고 숨기고 텍스트 커서 유지. */
function LogoCursor() {
  const outerRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;   // 비활성 → 기본 커서 유지

    const outer = outerRef.current;
    const img = imgRef.current;
    if (!outer || !img) return;
    document.body.classList.add('tg-cursor-on');

    const CLICKABLE = 'a,button,[role="button"],label,select,summary,.tg-cta,.tg-store-card.is-clickable,.tg-exp-card.is-clickable,.tg-livecard,.tg-icesticker,.tg-journey-count a';
    const TEXTSEL = 'input,textarea,[contenteditable="true"]';

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx;
    let y = my;
    let angle = 0;         // 연속 회전(멧돌)
    let spinCur = 0;       // 클릭 스핀(누적)
    let spinTarget = 0;
    let scale = 0.6;
    let scaleTarget = 1;
    let baseVel = 0.036;   // deg/ms (≈10초/바퀴)
    let shown = false;
    let last = performance.now();
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; }
      const t = e.target;
      const overText = t.closest ? t.closest(TEXTSEL) : null;
      const overClick = t.closest ? t.closest(CLICKABLE) : null;
      outer.style.opacity = overText ? '0' : '1';
      baseVel = overClick ? 0.09 : 0.036;   // 클릭 가능 요소 위 → 약간 빨라짐
      scaleTarget = overClick ? 1.28 : 1;
    };
    const onDown = () => { spinTarget += 360; };            // 클릭 → 한 바퀴
    const onLeave = () => { outer.style.opacity = '0'; };
    const onEnter = () => { outer.style.opacity = '1'; };

    const tick = (now) => {
      const dt = Math.min(48, now - last); last = now;
      const followE = 1 - Math.exp(-dt / 60);
      const spinE = 1 - Math.exp(-dt / 110);   // 클릭 스핀 ≈0.5초
      const scaleE = 1 - Math.exp(-dt / 90);
      x += (mx - x) * followE;
      y += (my - y) * followE;
      angle += baseVel * dt;
      spinCur += (spinTarget - spinCur) * spinE;
      scale += (scaleTarget - scale) * scaleE;
      outer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      img.style.transform = `translate(-50%, -50%) rotate(${angle + spinCur}deg) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('tg-cursor-on');
    };
  }, []);
  return (
    <div ref={outerRef} className="tg-cursor" aria-hidden="true" style={{ opacity: 0 }}>
      <img ref={imgRef} className="tg-cursor-logo" src={I('logo-cursor.webp')} alt="" draggable="false" />
    </div>
  );
}

/* ── [D] 떠다니는 라이브 매장 카드 (브랜드 굿즈 감성) ──
   크림 종이 + 검정 잉크 + 빈티지 세리프. 화면 왼쪽 아래 고정.
   히어로를 지나면 나타나 이후 계속 표시. 클릭 시 Expansion 섹션으로 스무스 스크롤.
   숫자·국가는 전부 data/tofug-stores.js에서 자동. */
function FloatingStoreCard() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const sentinel = document.querySelector('.st-statband');
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = sentinel ? sentinel.getBoundingClientRect() : null;
      setShow(rect ? rect.bottom < 40 : window.scrollY > 360);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const toExpansion = () => {
    const el = document.getElementById('expansion');
    if (!el) return;
    const navH = (document.querySelector('nav.nav')?.getBoundingClientRect().height) || 72;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const mine = countries.filter((c) => c.mine);   // 검정 원점 그룹 (byMe:true, 싱가폴)
  const exp = countries.filter((c) => !c.mine);   // 확장 가지 그룹 (byMe:false)

  return (
    <button
      type="button"
      className={`tg-livecard${show ? ' show' : ''}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={toExpansion}
      aria-label="브랜드 매장 현황 — Expansion 섹션으로 이동"
    >
      {/* 두부틀 프레임 안쪽 크림 '두부' 패널에 내용을 얹음 (상단 헤더 줄 제거됨) */}
      <span className="tg-lc-inner">
      {/* 검정 원점 블록 — 내 실적(byMe:true, 싱가폴) */}
      <span className="tg-lc-origin">
        <span className="tg-lc-origin-label" data-ko>Designed · 1~{byMeCount}호점</span>
        <span className="tg-lc-origin-label" data-en>Designed · Stores 1–{byMeCount}</span>
        {mine.map((c) => (
          <span key={c.country} className="tg-lc-origin-main">
            <span className="tg-lc-origin-country">{c.country}</span>
            <span className="tg-lc-origin-val">{c.byMe}</span>
          </span>
        ))}
      </span>

      {/* 점선 가지 — 브랜드 확장(byMe:false) */}
      <span className="tg-lc-branch">
        <span className="tg-lc-branch-label"><span className="tg-lc-branch-arrow" aria-hidden="true">→</span> Brand Expansion</span>
        {exp.map((c) => (
          <span key={c.country} className="tg-lc-exp-row">
            <span className="tg-lc-exp-country">{c.country}</span>
            <span className="tg-lc-exp-val">{c.open > 0 ? c.open : <em className="tg-lc-soon">soon</em>}</span>
          </span>
        ))}
      </span>
      </span>{/* /.tg-lc-inner */}
    </button>
  );
}

/* 숫자 count-up (뷰포트 진입 시 0→value, 과하지 않게 한 번) */
function CountUp({ value, duration = 850 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{n}</span>;
}

/* ── [3] Expansion 라이브 카운터 (국가별, byMe 색 구분, count-up) ── */
function CountryCounter() {
  return (
    <Reveal className="tg-counter">
      <div className="tg-counter-head">
        <span className="tg-counter-title" data-ko>브랜드 현황 · 라이브</span>
        <span className="tg-counter-title" data-en>Brand Footprint · Live</span>
        <span className="tg-counter-asof">
          {asOf ? `As of ${asOf} · ` : ''}<span data-ko>확장 중</span><span data-en>&amp; growing</span>
        </span>
      </div>
      <div className="tg-counter-grid">
        {countries.map((c) => (
          <div key={c.country} className={`tg-counter-cell${c.mine ? ' mine' : ' exp'}`}>
            <div className="tg-counter-num">
              {c.open > 0 ? <CountUp value={c.open} /> : <span className="tg-soon">soon</span>}
            </div>
            <div className="tg-counter-country">{c.country}</div>
            <div className="tg-counter-role">
              {c.mine
                ? (<><span data-ko>내 작업</span><span data-en>My work</span></>)
                : (<><span data-ko>브랜드 확장{c.open === 0 && c.upcoming > 0 ? ' · 예정' : ''}</span><span data-en>Brand expansion{c.open === 0 && c.upcoming > 0 ? ' · soon' : ''}</span></>)}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── OVERVIEW 성과 지표 (데이터 자동) — 국가·평점·리뷰·언론 ── */
function OverviewStats() {
  return (
    <div className="tg-overview-metrics">
      <Reveal className="tg-metric">
        <div className="tg-metric-num">{brandTotalCount}</div>
        <div className="tg-metric-label" data-ko>매장</div>
        <div className="tg-metric-label" data-en>Stores</div>
        <div className="tg-metric-sub" data-ko>{countryCount}개국 · {openStoreCount} 운영 · {soonStoreCount} 예정</div>
        <div className="tg-metric-sub" data-en>{countryCount} countries · {openStoreCount} open · {soonStoreCount} soon</div>
      </Reveal>
      <Reveal className="tg-metric">
        <div className="tg-metric-num">{stats.googleRating}</div>
        <div className="tg-metric-label">Google Rating</div>
        <div className="tg-metric-sub" aria-hidden="true">★★★★★</div>
      </Reveal>
      <Reveal className="tg-metric">
        <div className="tg-metric-num">{stats.reviewLabel}</div>
        <div className="tg-metric-label" data-ko>구글 리뷰</div>
        <div className="tg-metric-label" data-en>Google Reviews</div>
        <div className="tg-metric-sub">as of {stats.asOf}</div>
      </Reveal>
      <Reveal className="tg-metric">
        <div className="tg-metric-num">1ST</div>
        <div className="tg-metric-label" data-ko>싱가포르 최초</div>
        <div className="tg-metric-label" data-en>Singapore&apos;s First</div>
        <div className="tg-metric-sub">Singapore&apos;s First Tofu Gelato</div>
      </Reveal>
    </div>
  );
}

/* ── 타임랩스 자리: video 있으면 재생, 없으면 검정 placeholder(16:9) ── */
function TimelapseSlot({ store }) {
  return (
    <div className="tg-timelapse">
      {store.video ? (
        <video src={store.video} autoPlay muted loop playsInline />
      ) : (
        <div className="tg-timelapse-ph" role="img" aria-label={`${store.no}호점 타임랩스 준비 중`}>
          <span className="tg-tl-play" aria-hidden="true"></span>
        </div>
      )}
      {/* 매장 라벨: 영상/placeholder 공통으로 항상 하단에 표시 */}
      <div className="tg-tl-caption">
        <span className="tg-tl-label" data-ko>{store.no}호점 타임랩스{store.video ? '' : <em> (준비 중)</em>}</span>
        <span className="tg-tl-label" data-en>Store {store.no} Timelapse{store.video ? '' : <em> (coming soon)</em>}</span>
      </div>
    </div>
  );
}

/* ── 매장 라이트박스 (팝업 갤러리): 좌우 넘김 + X/ESC/바깥클릭 닫힘 ── */
function StoreLightbox({ store, onClose }) {
  const gallery = store.gallery || [];
  const [idx, setIdx] = useState(0);
  const prev = (e) => { if (e) e.stopPropagation(); setIdx((i) => (i - 1 + gallery.length) % gallery.length); };
  const next = (e) => { if (e) e.stopPropagation(); setIdx((i) => (i + 1) % gallery.length); };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + gallery.length) % gallery.length);
      else if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [gallery.length, onClose]);
  if (!gallery.length) return null;
  return (
    <div className="tg-lb-backdrop" onClick={onClose}>
      <button type="button" className="tg-lb-close" onClick={onClose} aria-label="닫기">×</button>
      <div className="tg-lb-stage" onClick={(e) => e.stopPropagation()}>
        <img className="tg-lb-img" src={I(gallery[idx])} alt={`${store.name} ${idx + 1}`} />
        <div className="tg-lb-caption">
          <span className="tg-lb-store">{store.no}호점 · {store.name}</span>
          <span className="tg-lb-count">{idx + 1} / {gallery.length}</span>
        </div>
      </div>
      {gallery.length > 1 && (
        <>
          <button type="button" className="tg-lb-nav prev" onClick={prev} aria-label="이전">‹</button>
          <button type="button" className="tg-lb-nav next" onClick={next} aria-label="다음">›</button>
        </>
      )}
    </div>
  );
}

/* ── SPACE 매장 그리드 (2~4호점): 메인 컷 클릭 → 라이트박스 (gallery 비면 비활성) ── */
function SpaceStoreGrid({ stores }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="tg-store-grid">
        {stores.map((s) => {
          const hasGallery = (s.gallery || []).length > 0;
          const clickable = hasGallery ? { role: 'button', tabIndex: 0, onClick: () => setOpen(s),
            onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(s); } },
            'aria-label': `${s.no}호점 ${s.name} 갤러리 열기` } : {};
          return (
            <div key={s.no} className={`tg-store-card${hasGallery ? ' is-clickable' : ''}`} {...clickable}>
              <div className="tg-store-thumb">
                {s.mainImage
                  ? <img src={I(s.mainImage)} alt={`${s.name} main`} loading="lazy" />
                  : <PhotoPlaceholder label={`${s.no}호점 · ${s.name}`} />}
                {hasGallery && <span className="tg-store-count" aria-hidden="true">＋{s.gallery.length}</span>}
              </div>
              <div className="tg-store-meta">
                <span className="tg-store-no">{s.no}호점</span>
                <span className="tg-store-name">{s.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      {open && <StoreLightbox store={open} onClose={() => setOpen(null)} />}
    </>
  );
}

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

/* ── 문의 위젯: 아이스크림 스티커(왼쪽 아래) + 문의 폼 모달 ── */
function InquiryWidget() {
  const [open, setOpen] = useState(false);
  const lang = useSiteLang();
  const stickerRef = useRef(null);

  /* 툴팁 auto-peek : 호버 없이도 주기적으로 슬며시 노출.
     데스크톱=은은한 loop / 터치=처음 한 번만 / reduced-motion=끔. 호버는 기존대로 유지(CSS). */
  useEffect(() => {
    const el = stickerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const peek = () => el.classList.add('is-peek');
    const unpeek = () => el.classList.remove('is-peek');
    const timers = [];

    if (coarse) {
      // 터치: 처음 한 번만 살짝 노출 (반복 X)
      timers.push(setTimeout(peek, 1400));
      timers.push(setTimeout(unpeek, 1400 + 2400));
    } else {
      // 데스크톱: 약 5.5초 주기(보임 2초 + 숨김 3.5초)로 은은하게 반복
      let alive = true;
      const cycle = () => {
        if (!alive) return;
        peek();
        timers.push(setTimeout(() => {
          unpeek();
          timers.push(setTimeout(cycle, 3500));
        }, 2000));
      };
      timers.push(setTimeout(cycle, 3000));   // 첫 노출 3초 뒤
      return () => { alive = false; timers.forEach(clearTimeout); unpeek(); };
    }
    return () => { timers.forEach(clearTimeout); unpeek(); };
  }, []);

  return (
    <>
      <button
        ref={stickerRef}
        type="button"
        className="tg-icesticker"
        onClick={() => setOpen(true)}
        aria-label={lang === 'en' ? 'Open inquiry form' : '프로젝트 문의 열기'}
      >
        <span className="tg-icesticker-inner">
          <img className="tg-icesticker-img" src={I('icecream-sticker.webp')} alt="" aria-hidden="true" />
          <span className="tg-icesticker-drip" aria-hidden="true"></span>
        </span>
        <span className="tg-icesticker-tip" aria-hidden="true">
          <span data-ko>프로젝트 문의 →</span>
          <span data-en>Get in touch →</span>
        </span>
      </button>
      {open && <InquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}

function InquiryModal({ onClose }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const firstRef = useRef(null);
  const lang = useSiteLang();
  const t = (ko, en) => (lang === 'en' ? en : ko);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';       // 모달 열릴 때 배경 스크롤 잠금
    firstRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: (fd.get('name') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      message: (fd.get('message') || '').toString().trim(),
    };

    // 받는 곳 미설정(임시 B): 실제 전송은 안 되지만 접수 메시지 표시.
    // ★ 나중에 위 FORMSPREE_ENDPOINT 또는 CONTACT_EMAIL 을 채우면 아래 실제 전송 로직으로 자동 대체됨.
    if (!FORMSPREE_ENDPOINT && !CONTACT_EMAIL) { setStatus('sent'); return; }

    // ① Formspree 등 폼서비스 연동 지점
    if (FORMSPREE_ENDPOINT) {
      try {
        setStatus('sending');
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch { setStatus('error'); }
      return;
    }

    // ② mailto 폴백 (CONTACT_EMAIL 만 채운 경우)
    const subject = encodeURIComponent(`[TOFU·G] 프로젝트 문의 — ${data.name}`);
    const body = encodeURIComponent(`이름: ${data.name}\n이메일: ${data.email}\n\n${data.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <div className="tg-modal-backdrop" onClick={onClose}>
      <div className="tg-modal" role="dialog" aria-modal="true" aria-label={t('프로젝트 문의', 'Get in touch')} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="tg-modal-close" onClick={onClose} aria-label={t('닫기', 'Close')}>×</button>
        <p className="tg-modal-eyebrow">TOFU·G</p>
        <h3 className="tg-modal-title">{t('프로젝트 문의', 'Get in touch')}</h3>
        <p className="tg-modal-sub">{t('공간·브랜드 프로젝트를 함께 만들고 싶으시면 남겨주세요.', 'Tell us about your spatial or brand project.')}</p>
        {status === 'sent' ? (
          <p className="tg-modal-done">{t('문의가 접수되었습니다. 감사합니다! 🍦', 'Thanks — your message has been received! 🍦')}</p>
        ) : (
          <form className="tg-modal-form" onSubmit={handleSubmit}>
            <input ref={firstRef} name="name" required placeholder={t('이름', 'Name')} autoComplete="name" />
            <input name="email" type="email" required placeholder={t('이메일', 'Email')} autoComplete="email" />
            <textarea name="message" required rows={4} placeholder={t('프로젝트 내용', 'Project details')} />
            <button type="submit" className="tg-modal-send" disabled={status === 'sending'}>
              {status === 'sending' ? t('보내는 중…', 'Sending…') : t('보내기 →', 'Send →')}
            </button>
            {status === 'error' && <p className="tg-modal-note err">{t('전송 오류가 발생했습니다. 다시 시도해 주세요.', 'Something went wrong. Please try again.')}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default function TofuG() {
  return (
    <>
      <Head>
        <title>TOFU · G — Spatial Design</title>
        <meta name="description" content="TOFU G — 한국 전통 두부 제조의 정성을 담은 프리미엄 젤라또 브랜드 공간 디자인. 공간하음." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <StudioNav sections={SECTIONS} />
      <LogoCursor />
      <FloatingStoreCard />
      <InquiryWidget />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">TOFU · G</h1>
          <p className="st-hero-positioning">
            <span data-ko>9개월 만에 {countryCount}개국으로 확장한 글로벌 F&amp;B 브랜드 TOFU · G. 1~{byMeCount}호점 공간 디자인과 SI 시스템을 구축했습니다.</span>
            <span data-en>TOFU · G, a global F&amp;B brand that scaled to {countryCount} countries in just 9 months. I built the spatial design and SI system for stores 1–{byMeCount}.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>한국 전통 두부 제조의 정성을 담은 프리미엄 젤라또 브랜드 TOFU · G. 맷돌과 한국 전통 주방에서 영감받은 공간 디자인·브랜딩으로, 싱가포르 오차드 로드에서 시작해 말레이시아·인도네시아로 확장 중입니다.</span>
            <span data-en>TOFU · G is a premium gelato brand capturing the devotion of traditional Korean tofu-making — with spatial design and branding inspired by the Maetdol (millstone) and heritage Korean kitchen, it began on Orchard Road in Singapore and is now expanding across Malaysia and Indonesia.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>TOFU·G의 공간은 하루의 온기가 피어나던 한국의 전통 주방에서 시작됩니다. 콩을 고르고 맷돌로 천천히 갈아, 정성으로 기다려 굳혀내던 두부처럼 그 고요한 시간을 공간의 소재와 디테일에 담았습니다. 전통적 터치와 현대적 감각이 공존하는 이곳에서, 고객은 브랜드의 철학을 시각과 미각으로 동시에 경험합니다. 매일 매장에서 직접 만드는 신선한 두부 젤라또 한 스쿱은, 단순한 디저트를 넘어 하나의 작품이 됩니다.</span>
            <span data-en>TOFU·G&apos;s space begins in the traditional Korean kitchen, where the warmth of each day once rose. Like tofu — beans selected, slowly ground on the millstone, and patiently left to set — that quiet, unhurried time is woven into the materials and details of the space. Where tradition meets contemporary sensibility, guests experience the brand&apos;s philosophy through both sight and taste — and each scoop of tofu gelato, freshly made in-store every day, becomes not just a dessert but a work of art.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“두부 한 모에 담긴 정성을, 한 입의 젤라또에 담다.”</span>
            <span data-en>“The devotion held in a single block of tofu, poured into a single spoonful of gelato.”</span>
          </p>
        </section>

        {/* ── STAT BAND (시스템 설계자 포지션) ── */}
        <section className="st-statband" aria-label="Key metrics">
          <div className="st-statband-line">
            <span className="st-statband-item"><span className="st-statband-num">9</span><span className="st-statband-unit">Months</span></span>
            <span className="st-statband-dot" aria-hidden="true">·</span>
            <span className="st-statband-item"><span className="st-statband-num">{byMeCount}</span><span className="st-statband-unit">Stores</span></span>
            <span className="st-statband-dot" aria-hidden="true">·</span>
            <span className="st-statband-item"><span className="st-statband-num">1</span><span className="st-statband-unit">Spatial System</span></span>
          </div>
          <p className="st-statband-note" data-ko>싱가폴 {byMeCount}개 매장. 하나의 공간 시스템, 지금 브랜드가 국경을 넘어 확장 중.</p>
          <p className="st-statband-note" data-en>{byMeCount} stores in Singapore. One spatial system, now scaling the brand across borders.</p>
        </section>

        {/* ── PROJECT INFO ── */}
        <section className="st-project-info">
          <div>
            <p className="st-info-label">Work Scope</p>
            <p className="st-info-value">
              <span data-ko>공간 디자인 · 브랜딩 · 시공 · 브랜드 공간 가이드</span>
              <span data-en>Spatial Design · Branding · Construction · Spatial Guide</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Project Type</p>
            <p className="st-info-value">
              <span data-ko>F&amp;B 젤라또 브랜드 · 멀티 스토어</span>
              <span data-en>F&amp;B Gelato Brand · Multi-store</span>
            </p>
          </div>
          <div>
            <p className="st-info-label">Partner</p>
            <p className="st-info-value">
              <span className="st-info-line">CLIENT | INITIA GROUP SG</span>
            </p>
          </div>
        </section>

        {/* 포스터 (두부설과 · 최종) */}
        <div className="st-poster">
          <img src={I('tofug-poster.webp')} alt="TOFU·G 두부설과 포스터" loading="lazy" />
        </div>

        {/* ── OVERVIEW (성과: 검증된 결과 먼저) ── */}
        <section className="st-section" id="overview">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Overview</p>
              <h2 className="st-section-title" data-ko>검증된 성과</h2>
              <h2 className="st-section-title" data-en>Proven Results</h2>
              <p className="st-section-desc" data-ko>2024년 7월 첫 오픈 이후 9개월 만에 싱가폴 {byMeCount}개 매장과 브랜드 공간 가이드라인(SI)을 구축했고, 그 시스템으로 브랜드는 {countryCount}개국 {brandTotalCount}개 매장으로 확장 중입니다.</p>
              <p className="st-section-desc" data-en>Since its first opening in July 2024, I built {byMeCount} Singapore stores and the brand&apos;s spatial guideline (SI) in just 9 months; on that system the brand is now scaling to {brandTotalCount} stores across {countryCount} countries.</p>
              <p className="st-section-desc" data-ko>싱가포르 1호점의 공간 브랜드 컨셉 기획과 공간 디자인을 통해 브랜드의 시각적 아이덴티티를 정립했으며, 추후 이니시아(Initia Group) 소속으로 2호점부터 4호점 플래그십 매장까지의 프로젝트를 연속성 있게 진행했습니다. 이 과정에서 지속적인 매장 확장이 가능하도록 표준화된 공간 디자인 시스템(SI 가이드라인)을 완벽히 구축했습니다.</p>
              <p className="st-section-desc" data-en>I established the brand&apos;s visual identity through the spatial concept planning and interior design of the first store in Singapore. Subsequently, as part of Initia Group, I seamlessly executed consecutive projects from the 2nd to the 4th flagship locations. Through this trajectory, I built a standardized Spatial Identity (SI) guideline to support sustainable, scalable brand expansion.</p>
            </Reveal>
            <OverviewStats />

            {/* Media Coverage — 성과의 일부(평점·리뷰와 함께) · 기사별 링크 */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Press · As Seen In</p>
              <h2 className="st-section-title">Media Coverage</h2>
            </Reveal>
            <div className="st-press">
              {stats.press.map((p, i) => {
                const body = (
                  <>
                    <p className="st-press-pub">{p.outlet} · {p.date}</p>
                    <h4 className="st-press-headline">{p.title}</h4>
                    <p className="st-press-snippet">{p.excerpt}</p>
                  </>
                );
                return p.url ? (
                  <a key={i} className="st-press-card is-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    {body}<span className="st-press-arrow" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div key={i} className="st-press-card">{body}</div>
                );
              })}
            </div>

            {/* The SI System (시스템 설명) */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 90 }}>The SI System</p>
              <h2 className="st-section-title" data-ko>확장의 비결 — SI 시스템</h2>
              <h2 className="st-section-title" data-en>The Key to Scale — the SI System</h2>
              <p className="st-section-desc" data-ko>1호점의 공간을 기준으로 재료·디테일·조닝·사이니지를 표준화한 브랜드 공간 가이드라인(SI)을 구축했습니다. 덕분에 2~4호점, 그리고 해외 확장까지 일관된 브랜드 경험을 빠르고 정확하게 재현할 수 있었습니다.</p>
              <p className="st-section-desc" data-en>Based on the flagship, I standardized materials, details, zoning and signage into a brand spatial guideline (SI) — letting stores 2–4, and later overseas expansion, reproduce a consistent brand experience quickly and precisely.</p>
            </Reveal>

            {/* Store 1–3 Timelapse (video 있으면 재생, 없으면 검정 placeholder) */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }} data-ko>1~3호점 타임랩스</p>
              <p className="st-section-label" style={{ marginTop: 80 }} data-en>Store 1–3 Timelapse</p>
            </Reveal>
            <div className="tg-timelapse-row">
              {timelapseStores.map((s) => <TimelapseSlot key={s.no} store={s} />)}
            </div>
            <Reveal className="tg-cta-row">
              <a href="#space" className="tg-cta" onClick={(e) => { e.preventDefault(); scrollToSection('space'); }}>
                <span data-ko>공간 디자인 자세히 보기 →</span>
                <span data-en>See the full SI design →</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── STORY (비결: 스토리 + SI 시스템 + 1~3호점 타임랩스) ── */}
        <section className="st-section alt" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Story</p>
              <h2 className="st-section-title" data-ko>따뜻한 정성을 한 입의 젤라또에</h2>
              <h2 className="st-section-title" data-en>Warmth In Every Scoop</h2>
              <p className="st-section-desc" data-ko>TOFU G는 따뜻한 집밥처럼, 한 입의 젤라또에 정성을 담습니다. 한국의 전통 주방은 하루의 온기가 시작되는 공간이었고, 두부는 그 안에서 시간과 정성을 들여 천천히 만들어졌습니다. 콩을 고르고, 불리고, 갈고, 끓이고, 고요하게 기다려 굳혀내는 모든 과정 속엔 음식을 향한 마음과 손끝의 애정이 담겨 있습니다.</p>
              <p className="st-section-desc" data-en>TOFU G brings home-cooked warmth to every scoop. The traditional Korean kitchen was where the warmth of each day began, and tofu was made there slowly — selecting beans, soaking, grinding, boiling, and waiting in stillness until they set. Every step carried a deep affection for food, expressed through hands and heart.</p>
            </Reveal>
            {/* 브랜드 영상 (OVERVIEW 상단 → STORY 글 아래로 이동) */}
            <div className="st-video">
              <video src="https://framerusercontent.com/assets/Mrpr4s2lB7Aaio6hkDjjOi1ZU.mp4" autoPlay muted loop playsInline />
            </div>
            {/* 두부 라이브 처닝 영상 (SPACE에서 이동) */}
            <div className="st-render-hero" style={{ marginTop: 40 }}>
              <video src="https://framerusercontent.com/assets/wyZ1uDexYFoC0GcYvhAq84wp4s.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: 4, display: 'block' }} />
            </div>
            <Reveal className="st-concept-grid no-image">
              <div className="st-keywords">
                <span className="st-keyword">Tofu-Based</span>
                <span className="st-keyword">Live Churning</span>
                <span className="st-keyword">Vegan-Friendly</span>
              </div>
            </Reveal>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Heritage Elements</p>
              <p className="st-section-desc" data-ko>한국 전통 두부 제조 과정의 세 가지 핵심 요소에서 공간과 브랜딩의 모티프를 도출했습니다.</p>
              <p className="st-section-desc" data-en>Three core elements of traditional Korean tofu-making inspired the spatial and branding motifs.</p>
            </Reveal>
            <div className="st-insp-grid">
              <Reveal className="st-insp-card">
                <img src={I('inspiration-kitchenware.webp')} alt="Traditional kitchenware" />
                <span className="st-caption" data-ko>전통 집기</span>
                <span className="st-caption" data-en>Traditional Kitchenware</span>
              </Reveal>
              <Reveal className="st-insp-card">
                <img src={I('inspiration-cotton.webp')} alt="Unbleached cotton" />
                <span className="st-caption" data-ko>헝겊</span>
                <span className="st-caption" data-en>Unbleached Cotton</span>
              </Reveal>
              <Reveal className="st-insp-card">
                <img src={I('inspiration-millstone.jpg')} alt="Millstone" />
                <span className="st-caption" data-ko>멧돌</span>
                <span className="st-caption" data-en>Millstone</span>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ── SPACE (공간 디자인 상세) ── */}
        <section className="st-section" id="space">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Space</p>
              <h2 className="st-section-title">Korean Atelier</h2>
              <p className="st-section-desc" data-ko>린넨, 무표백 면, 원목 마감재로 오차드 로드의 럭셔리 리테일 환경 속에 고요한 한국의 주방을 구현했습니다.</p>
              <p className="st-section-desc" data-en>With linen, unbleached cotton, and wood finishes, a serene Korean kitchen was brought to life within Orchard Road&apos;s luxury retail environment.</p>
            </Reveal>

            {/* 1. 1호점(만다린 갤러리) 플래그십 — 크게 */}
            <Reveal style={{ marginTop: 20 }}>
              <p className="st-section-label" data-ko>1호점 · 플래그십</p>
              <p className="st-section-label" data-en>Store 1 · Flagship</p>
              <h2 className="st-section-title">Mandarin Gallery</h2>
              <p className="st-section-desc" data-ko>싱가포르 오차드 로드 만다린 갤러리 #03-30, 싱가포르 최초의 프레시 처닝 프리미엄 두부 젤라또. 멧돌·전통 주방·Test Zone·VMD의 공간 언어가 처음으로 하나의 공간에 완성된 1호점입니다.</p>
              <p className="st-section-desc" data-en>333A Orchard Rd, #03-30 Mandarin Gallery — Singapore&apos;s first fresh-churned premium tofu gelato, where the spatial language of millstone, kitchen, Test Zone and VMD first came together as one space.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item st-wide"><img src={I('c75c6d_484e34ff6c744b8f9fbc8c867893796e~mv2.webp')} alt="Mandarin Gallery Interior" loading="lazy" /></div>
              <div className="st-item"><img src={I('c75c6d_957f8cd6bd774dffa90e87d1492e389b~mv2.webp')} alt="Store Overview" loading="lazy" /></div>
              <div className="st-item"><img src={I('c75c6d_08e8c91f01c5464b8308cd9f45f2c13c~mv2.webp')} alt="Gelato Display" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('mandarin-soybeans.jpg')} alt="Soybeans" loading="lazy" /></div>
              <div className="st-item"><img src={I('mandarin-teapot.jpg')} alt="Korean teapot" loading="lazy" /></div>
              <div className="st-item"><img src={I('mandarin-menu.jpg')} alt="Menu board" loading="lazy" /></div>
            </div>

            <Reveal style={{ marginTop: 60 }}>
              <p className="st-section-label">Design Process</p>
              <p className="st-section-desc" data-ko>컨셉 스케치부터 3D 모델링, 마감재 선정, 최종 시공까지 — 1호점을 실제 공간으로 완성한 과정.</p>
              <p className="st-section-desc" data-en>From concept sketches to 3D modeling, material selection, and final construction — how the flagship became a real space.</p>
            </Reveal>

            {/* Floor Plan · Elevation (도면) */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Floor Plan · Elevation</p>
              <p className="st-section-desc" data-ko>1호점 공간을 기준으로 작성한 평면도와 입면도 — 이후 전 매장에 적용된 브랜드 공간 가이드의 기준이 되었습니다.</p>
              <p className="st-section-desc" data-en>Floor plan and elevation based on the flagship — the reference for the brand spatial guide later applied across all stores.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('drawing-floorplan.jpg')} alt="Floor Plan" loading="lazy" /></div>
              <div className="st-item"><img src={I('drawing-elevation.jpg')} alt="Elevation" loading="lazy" /></div>
            </div>

            {/* 2. 싱가폴 2~4호점 — 대표 컷 + 클릭 시 라이트박스 갤러리 */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 90 }} data-ko>싱가폴 2~4호점</p>
              <p className="st-section-label" style={{ marginTop: 90 }} data-en>Singapore Stores 2–4</p>
              <p className="st-section-desc" data-ko>1호점에서 완성한 공간 언어를 이어받은 매장들. 대표 컷을 클릭하면 매장 공간 사진을 팝업으로 볼 수 있습니다.</p>
              <p className="st-section-desc" data-en>Stores carrying forward the spatial language established at the flagship. Click a store to open its space photos.</p>
            </Reveal>
            <SpaceStoreGrid stores={spaceGridStores} />

            {/* 3. 1~4호점 공통 디자인 디테일 · 재료 · 멧돌 · VMD — 섹션 마무리 */}
            <Reveal>
              <p className="st-section-label" style={{ marginTop: 96 }} data-ko>공통 디자인 디테일 · 1~4호점</p>
              <p className="st-section-label" style={{ marginTop: 96 }} data-en>Design Language · Stores 1–4</p>
              <p className="st-section-desc" data-ko>린넨·무표백 면·원목 마감과 멧돌 모티프 — 1호점에서 정립해 전 매장에 공통으로 흐르는 공간 언어입니다.</p>
              <p className="st-section-desc" data-en>Linen, unbleached cotton, wood finishes and the millstone motif — the spatial language defined at the flagship and shared across every store.</p>
            </Reveal>

            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3 data-ko>전통 주방에서 영감받은 공간</h3>
                <h3 data-en>Traditional Kitchen-Inspired Space</h3>
                <p data-ko>전통 음식은 그 나라의 문화를 닮습니다. 그 음식이 만들어지는 주방은, 한중일 전통 가옥 중에서도 문화의 결이 가장 선명하게 배어나는 공간입니다.</p>
                <p data-en>Traditional food mirrors its country&apos;s culture, and the kitchen where it is made is where cultural texture is most vividly felt — even among the traditional houses of Korea, China, and Japan.</p>
              </div>
              <div><img src={I('concept-interior.webp')} alt="TOFU G Interior" loading="lazy" /></div>
            </Reveal>

            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3 data-ko>멧돌 — 디자인 모티프</h3>
                <h3 data-en>Millstone — Design Motif</h3>
                <p data-ko>콩을 갈아 두부를 만들던 멧돌의 형상을 공간과 브랜딩의 핵심 모티프로 활용했습니다. 로고, 조명, 컵 디자인까지 멧돌의 원형 패턴이 일관되게 적용됩니다.</p>
                <p data-en>The millstone — once used to grind soybeans into tofu — is the core motif across space and branding. From logo and lighting to cup design, the circular pattern is applied consistently.</p>
              </div>
              <div><img src={I('concept-millstone-soybeans.jpg')} alt="Millstone with soybeans" loading="lazy" /></div>
            </Reveal>

            <Reveal className="st-concept-block">
              <div className="st-concept-text">
                <h3 data-ko>체험존 — Test Zone</h3>
                <h3 data-en>Experience Zone — Test Zone</h3>
                <p data-ko>인절미, 쑥, 말차 가루를 직접 체험할 수 있는 Test Zone을 제안했습니다. 외국인에게 생소할 수 있는 한국의 전통 향을 간접적으로 알리는 감각적 체험 공간입니다.</p>
                <p data-en>A Test Zone where visitors experience injeolmi, mugwort, and matcha powders firsthand — a sensory space introducing traditional Korean aromas that may be unfamiliar to international visitors.</p>
              </div>
              <div><img src={I('IMG_3399_jpg-1-scaled.jpg')} alt="Test Zone" loading="lazy" /></div>
            </Reveal>

            <Reveal className="st-concept-block reverse">
              <div className="st-concept-text">
                <h3 data-ko>VMD — 천과 멧돌의 재해석</h3>
                <h3 data-en>VMD — Reinterpreting Cloth &amp; Millstone</h3>
                <p data-ko>맷돌에서 콩이 갈리는 모습을 얇은 천으로 표현한 VMD 디자인을 제안하고, 전통 맷돌을 현대적 디스플레이 테이블로 재해석해 공간의 핵심 오브제로 구현했습니다.</p>
                <p data-en>A VMD design expressing soybeans grinding through delicate fabric draping — reinterpreting the millstone as a modern display table as the central spatial object.</p>
              </div>
              <div><img src={I('tofu-g-10.jpg')} alt="VMD Display" loading="lazy" /></div>
            </Reveal>
          </div>
        </section>

        {/* ── EXPANSION (내 SI 시스템 → 말레이시아·인도네시아) ── */}
        <section className="st-section alt" id="expansion">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Expansion</p>
              <h2 className="st-section-title" data-ko>브랜드 여정 — 시스템이 국경을 넘다</h2>
              <h2 className="st-section-title" data-en>The Journey — a System Crossing Borders</h2>
              {/* 크레딧 한 줄 (내 작업 vs 브랜드 확장 구분) */}
              <p className="st-section-desc st-credit" data-ko>싱가폴 {byMeCount}개 매장은 직접 설계·시공했고, {expansionCountryNames.join(' · ')}는 그 SI 가이드라인으로 브랜드가 확장한 사례입니다.</p>
              <p className="st-section-desc st-credit" data-en>The {byMeCount} Singapore stores were designed and built directly; {expansionCountryNames.join(' · ')} are brand expansions built on that SI guideline.</p>
            </Reveal>

            {/* 라이브 카운터 — 국가별 현황(데이터 자동, count-up) */}
            <CountryCounter />

            {/* 나라별 여정: 싱가폴 → 말레이시아 → 인도네시아 (등장 순서, 시트 자동) */}
            <div className="tg-journey">
              {journey.map((g, i) => <JourneyStep key={g.country} g={g} idx={i} />)}
            </div>
          </div>
        </section>

      </main>

      <StudioFooter arrowSrc="/images/tofug/arrow-top.png" showList={false} />

      <style jsx>{`
        :global(:root) {
          --accent: #8E8E8E;
          --secondary: #FFFFFF;
          --accent-ink: color-mix(in srgb, var(--accent) 48%, #000 52%);
          --page-bg: #ffffff;
          --page-fg: #1a1a1a;
          --section-bg: #f8f6f3;
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
          --accent-ink: var(--accent);
        }
        :global(body) { background: var(--page-bg); color: var(--page-fg); }
      `}</style>
    </>
  );
}
