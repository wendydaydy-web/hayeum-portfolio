import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { StudioNav, StudioFooter } from '../../components/project';
import { byMeStores, expansionStores, byMeCount, countries, asOf } from '../../data/tofug-stores';

/* ── 섹션 메뉴 (상단바 ScrollSpy) ── */
const SECTIONS = [
  { id: 'story', label: 'Brand Story' },
  { id: 'expansion', label: 'Expansion' },
  { id: 'space', label: 'Space' },
  { id: 'flagship', label: 'Flagship' },
  { id: 'layout', label: 'Layout' },
];

const I = (name) => `/images/tofug/${name}`;

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
  return (
    <>
      <button
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
      <FloatingStoreCard />
      <InquiryWidget />

      <main className="studio-page">
        {/* ── HERO ── */}
        <section className="st-hero">
          <h1 className="st-hero-title">TOFU · G</h1>
          <p className="st-hero-positioning">
            <span data-ko>한국 전통 두부 제조의 정성을 담은 프리미엄 젤라또 브랜드 — 멧돌과 한국 전통 주방에서 영감을 받은 공간 디자인 · 브랜딩.</span>
            <span data-en>A premium gelato brand carrying the devotion of traditional Korean tofu-making — spatial design &amp; branding drawn from the millstone and the Korean kitchen.</span>
          </p>
          <p className="st-hero-desc">
            <span data-ko>싱가포르 오차드 로드에서 시작한 프레시 처닝 두부 젤라또 브랜드. 저는 싱가폴 매장들의 공간 브랜드 컨셉 기획부터 디자인, 시공, 그리고 브랜드 공간 가이드라인(SI) 확립까지 전 과정을 담당했습니다. 이 가이드라인을 바탕으로 브랜드가 말레이시아 · 인도네시아로 확장하고 있습니다.</span>
            <span data-en>A fresh-churned tofu gelato brand born on Orchard Road, Singapore. I led the full journey for the Singapore stores — spatial brand concept, design, construction, and the brand&apos;s spatial guideline (SI). Building on that guideline, the brand is now expanding into Malaysia and Indonesia.</span>
          </p>
          <p className="st-hero-quote">
            <span data-ko>“두부 한 모에 담긴 정성을, 한 입의 젤라또에 담다.”</span>
            <span data-en>“The care once held in a block of tofu — now in every scoop.”</span>
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
          <p className="st-statband-note" data-en>Four stores in Singapore. One spatial system, now scaling the brand across borders.</p>
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
              <span className="st-info-line" data-ko>CLIENT | TOFU G</span>
              <span className="st-info-line" data-en>CLIENT | TOFU G</span>
              <span className="st-info-line">Singapore · Kuala Lumpur · 2025</span>
            </p>
          </div>
        </section>

        {/* brand video break */}
        <div className="st-video">
          <video src="https://framerusercontent.com/assets/Mrpr4s2lB7Aaio6hkDjjOi1ZU.mp4" autoPlay muted loop playsInline />
        </div>

        {/* ── 01 BRAND STORY ── */}
        <section className="st-section" id="story">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">01 — Brand Story</p>
              <h2 className="st-section-title" data-ko>따뜻한 정성을 한 입의 젤라또에</h2>
              <h2 className="st-section-title" data-en>Warmth In Every Scoop</h2>
              <p className="st-section-desc" data-ko>TOFU G는 따뜻한 집밥처럼, 한 입의 젤라또에 정성을 담습니다. 한국의 전통 주방은 하루의 온기가 시작되는 공간이었고, 두부는 그 안에서 시간과 정성을 들여 천천히 만들어졌습니다. 콩을 고르고, 불리고, 갈고, 끓이고, 고요하게 기다려 굳혀내는 모든 과정 속엔 음식을 향한 마음과 손끝의 애정이 담겨 있습니다.</p>
              <p className="st-section-desc" data-en>TOFU G brings home-cooked warmth to every scoop. The traditional Korean kitchen was where the warmth of each day began, and tofu was made there slowly — selecting beans, soaking, grinding, boiling, and waiting in stillness until they set. Every step carried a deep affection for food, expressed through hands and heart.</p>
              <p className="st-section-desc" data-ko>TOFU G는 그런 한국의 전통 주방에서 영감을 받아, 두부 한 모에 담긴 정성을 한 입의 젤라또에 담아 전합니다.</p>
              <p className="st-section-desc" data-en>Drawing inspiration from that traditional kitchen, TOFU G delivers the same care once found in a block of tofu — now in every scoop of gelato.</p>
            </Reveal>
            <Reveal className="st-concept-grid">
              <div className="st-concept-image"><img src={I('은서-수정-tofug.webp')} alt="TOFU G Gelato" /></div>
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

        {/* ── 02 EXPANSION ── */}
        <section className="st-section alt" id="expansion">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">02 — Expansion</p>
              <h2 className="st-section-title" data-ko>하나의 시스템, 확장되는 브랜드</h2>
              <h2 className="st-section-title" data-en>One System, an Expanding Brand</h2>
              <p className="st-section-desc" data-ko>싱가폴에서 {byMeCount}개 매장과 브랜드 공간 가이드라인(SI)을 직접 설계·구축했습니다. 이렇게 확립한 시스템을 바탕으로, 브랜드는 이후 말레이시아 · 인도네시아로 확장하고 있습니다. 아래는 “제가 직접 한 작업”과 “그 시스템으로 브랜드가 확장한 사례”를 명확히 구분한 것입니다.</p>
              <p className="st-section-desc" data-en>In Singapore, I directly designed and built {byMeCount} stores and the brand’s spatial guideline (SI). On that system, the brand has since expanded into Malaysia and Indonesia. Below, my own work and the brand’s guideline-based expansion are shown separately.</p>
            </Reveal>

            {/* [3] 라이브 카운터 — 국가별 현황(데이터 자동, count-up) */}
            <CountryCounter />

            {/* 내 실적 — 싱가폴 (byMe:true) */}
            <Reveal>
              <p className="st-group-label mine" style={{ marginTop: 56 }}>
                <span data-ko>내 실적 · 싱가폴 {byMeCount}개 매장</span>
                <span data-en>My Work · {byMeCount} Singapore Stores</span>
              </p>
            </Reveal>
            <div className="st-cards">
              {byMeStores.map((s) => <StoreCard key={s.no} store={s} />)}
            </div>

            <div className="st-stats">
              <Reveal><div className="st-stat-num">4.8</div><div className="st-stat-label">Google Rating</div></Reveal>
              <Reveal><div className="st-stat-num">1,400+</div><div className="st-stat-label">Reviews</div></Reveal>
              <Reveal><div className="st-stat-num">{byMeCount}</div><div className="st-stat-label" data-ko>싱가폴 매장 (직접)</div><div className="st-stat-label" data-en>Singapore Stores</div></Reveal>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Takashimaya · Singapore</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('c75c6d_d0bf8769185e4e7f87bb9545925c75aa~mv2.jpg')} alt="Takashimaya 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('c75c6d_2c0234f4b585438fbe1db11224446371~mv2.jpg')} alt="Takashimaya 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('c75c6d_b5a53dd11256403eabcf16fbd83d43ee~mv2.jpg')} alt="Takashimaya 3" loading="lazy" /></div>
              <div className="st-item"><img src={I('c75c6d_f6c8ce3c0dc64f8a93fdcf631be405b5~mv2.jpg')} alt="Takashimaya 4" loading="lazy" /></div>
            </div>

            {/* 브랜드 확장 — 말레이시아 · 인도네시아 (byMe:false) */}
            <Reveal>
              <p className="st-group-label expansion" style={{ marginTop: 80 }}>
                <span data-ko>브랜드 확장 · SI 가이드라인 적용 (직접 작업 아님)</span>
                <span data-en>Brand Expansion · Built on the SI Guideline (not my work)</span>
              </p>
              <p className="st-section-desc" data-ko>아래 매장들은 제가 직접 시공한 실적이 아니라, 싱가폴에서 확립한 SI 가이드라인을 바탕으로 브랜드가 해외로 확장한 사례입니다. 인도네시아는 아직 오픈 전(진행 중)입니다.</p>
              <p className="st-section-desc" data-en>These are not stores I built, but cases where the brand expanded overseas on the SI guideline established in Singapore. Indonesia is not yet open (in progress).</p>
            </Reveal>
            <div className="st-cards">
              {expansionStores.map((s) => <StoreCard key={s.no} store={s} />)}
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 60 }}>MODU TRX · Kuala Lumpur <span className="st-label-tag" data-ko>브랜드 확장</span><span className="st-label-tag" data-en>Brand Expansion</span></p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('tofuft.jpg')} alt="MODU TRX Storefront" loading="lazy" /></div>
              <div className="st-item"><img src={I('20251119_TOFUGtrx_IMG015.jpg')} alt="TOFU G TRX" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('tofu-g-1.jpg')} alt="TRX 1" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-2.jpg')} alt="TRX 2" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-3.jpg')} alt="TRX 3" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 03 SPACE ── */}
        <section className="st-section" id="space">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">03 — Space</p>
              <h2 className="st-section-title">Korean Atelier</h2>
              <p className="st-section-desc" data-ko>린넨, 무표백 면, 원목 마감재로 오차드 로드의 럭셔리 리테일 환경 속에 고요한 한국의 주방을 구현했습니다.</p>
              <p className="st-section-desc" data-en>With linen, unbleached cotton, and wood finishes, a serene Korean kitchen was brought to life within Orchard Road&apos;s luxury retail environment.</p>
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

            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('tofuggelato8.jpg')} alt="VMD Backdrop" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-6.jpg')} alt="Millstone Display Table" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('tofuggelato3.jpg')} alt="Millstone & Gelato" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-2.webp')} alt="Millstone Table" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofuggelato7.jpg')} alt="Fabric Lantern VMD" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ── 04 FLAGSHIP ── */}
        <section className="st-section alt" id="flagship">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">04 — Flagship</p>
              <h2 className="st-section-title">Mandarin Gallery</h2>
              <p className="st-section-desc" data-ko>싱가포르 오차드 로드 만다린 갤러리 #03-30. 싱가포르 최초의 프레시 처닝 프리미엄 두부 젤라또. 1호점의 공간 브랜드 컨셉 기획부터 디자인, 시공까지 전 과정을 담당했습니다.</p>
              <p className="st-section-desc" data-en>333A Orchard Rd, #03-30 Mandarin Gallery — Singapore&apos;s first fresh-churned premium tofu gelato. Led the entire process from spatial brand concept to design and construction.</p>
            </Reveal>
            <div className="st-render-hero" style={{ marginTop: 48 }}>
              <video src="https://framerusercontent.com/assets/wyZ1uDexYFoC0GcYvhAq84wp4s.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: 4, display: 'block' }} />
            </div>
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

            <Reveal className="st-concept-block" style={{ marginTop: 80 }}>
              <div className="st-concept-text">
                <h3>AiFOKATO — “A Single Perfect Moment”</h3>
                <p data-ko>도시의 빠른 리듬 속에서 한 잔의 아포가토로 잠시 멈추는 완벽한 순간을 제공하는 서브 브랜드. ONE CUP. ONE PERFECT MOMENT.</p>
                <p data-en>A sub-brand offering a moment of calm through a single cup of affogato. ONE CUP. ONE PERFECT MOMENT.</p>
              </div>
              <div><img src={I('c75c6d_1b7878e6e65c4282a03469eae2a24294~mv2.webp')} alt="AiFOKATO Facade" loading="lazy" /></div>
            </Reveal>

            <Reveal style={{ marginTop: 60 }}>
              <p className="st-section-label">Spatial Design Process</p>
              <p className="st-section-desc" data-ko>컨셉 스케치부터 3D 모델링, 마감재 선정, 최종 시공까지 — 브랜드 공간 가이드라인을 확립한 전체 과정.</p>
              <p className="st-section-desc" data-en>From concept sketches to 3D modeling, material selection, and final construction — the full process that established the brand&apos;s spatial guideline.</p>
            </Reveal>
            <div className="st-render-hero">
              <video src="https://framerusercontent.com/assets/aVYOmv4OpeHjgcDD1ZLrdcKk.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: 4, display: 'block' }} />
            </div>
            <div className="st-stats">
              <Reveal><div className="st-stat-num">10h+</div><div className="st-stat-label">Design Hours</div></Reveal>
              <Reveal><div className="st-stat-num">1st</div><div className="st-stat-label">Brand Spatial Guide</div></Reveal>
              <Reveal><div className="st-stat-num">{byMeCount}</div><div className="st-stat-label" data-ko>싱가폴 매장 (직접)</div><div className="st-stat-label" data-en>Singapore Stores</div></Reveal>
            </div>
          </div>
        </section>

        {/* ── 05 LAYOUT ── */}
        <section className="st-section" id="layout">
          <div className="st-section-inner">
            <Reveal>
              <p className="st-section-label">05 — Layout</p>
              <h2 className="st-section-title">Floor Plan · Elevation</h2>
              <p className="st-section-desc" data-ko>1호점 공간을 기준으로 작성한 평면도와 입면도 — 이후 전 매장에 적용된 브랜드 공간 가이드의 기준이 되었습니다.</p>
              <p className="st-section-desc" data-en>Floor plan and elevation based on the flagship — the reference for the brand spatial guide later applied across all stores.</p>
            </Reveal>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('drawing-floorplan.jpg')} alt="Floor Plan" loading="lazy" /></div>
              <div className="st-item"><img src={I('drawing-elevation.jpg')} alt="Elevation" loading="lazy" /></div>
            </div>

            <Reveal>
              <p className="st-section-label" style={{ marginTop: 80 }}>Press · As Seen In</p>
              <h2 className="st-section-title">Media Coverage</h2>
            </Reveal>
            <div className="st-press">
              <div className="st-press-card"><p className="st-press-pub">Time Out · Aug 2025</p><h4 className="st-press-headline">We Tried the Viral Korean Tofu Gelato</h4><p className="st-press-snippet">$8 per scoop — entirely worth it. Dairy-free without compromising creaminess.</p></div>
              <div className="st-press-card"><p className="st-press-pub">Eatbook · Jun 2025</p><h4 className="st-press-headline">Korean Tofu Gelato in Orchard</h4><p className="st-press-snippet">Dense, creamy goodness with earthy soy notes. Rustic wood &amp; Korean decor.</p></div>
              <div className="st-press-card"><p className="st-press-pub">DanielFood · Aug 2025</p><h4 className="st-press-headline">Singapore&apos;s First Tofu Gelato Shop</h4><p className="st-press-snippet">Constantly full on a weekday afternoon. Black sesame had roasted depth.</p></div>
              <div className="st-press-card"><p className="st-press-pub">Little Day Out · Mar 2026</p><h4 className="st-press-headline">How Good Can Tofu Gelato Be?</h4><p className="st-press-snippet">1,400+ Google reviews, 4.8 stars. As enjoyable as the most popular gelato shops.</p></div>
            </div>
            <div className="st-gallery-grid">
              <div className="st-item"><img src={I('tofu-g-gelato-storefront.jpg')} alt="Storefront" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-gelato-flavours.jpg')} alt="Flavours" loading="lazy" /></div>
            </div>
            <div className="st-gallery-3col">
              <div className="st-item"><img src={I('tofu-g-gelato-blacksesame.jpg')} alt="Black Sesame" loading="lazy" /></div>
              <div className="st-item"><img src={I('tofu-g-gelato-pistachio.jpg')} alt="Pistachio" loading="lazy" /></div>
              <div className="st-item"><img src={I('review-gelato-cup.jpg')} alt="Gelato Cup" loading="lazy" /></div>
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
