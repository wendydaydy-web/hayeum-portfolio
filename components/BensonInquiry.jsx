import { useEffect, useRef, useState } from 'react';

/**
 * BENSON 전용 — 떠다니는 문의 스티커(왼쪽 아래) + 문의 폼 모달.
 * tofuG 아이스크림 스티커와 동일한 동작:
 *  - 평소: 위아래 float(±4px) + 미세 흔들림(±2deg) 느린 loop.
 *  - 툴팁: 호버 없이도 주기적으로 슬며시 노출(≈5.5s 주기, 2s 표시). 호버 시 즉시 유지.
 *  - 클릭: 문의 폼 모달. 닫기(X)·바깥클릭·ESC 닫힘.
 *  - prefers-reduced-motion: 반복 노출·움직임 끔 / 터치(coarse): 축소 + 처음 한 번만.
 *
 * 받는 주소 미정 → CONTACT_EMAIL/FORMSPREE_ENDPOINT 비워둠.
 *  · FORMSPREE_ENDPOINT 채우면 → 해당 엔드포인트로 POST 전송.
 *  · CONTACT_EMAIL 만 채우면 → mailto 폴백.
 *  · 둘 다 비면 → "문의 접수 준비 중"(전송 없이 접수 메시지).
 */
const CONTACT_EMAIL = '';        // 예: 'project@haumm.studio'
const FORMSPREE_ENDPOINT = '';   // 예: 'https://formspree.io/f/xxxxxxxx'

/* 사이트 언어(EN/KR) — SiteNav 토글이 document.documentElement.lang 을 바꾸므로 관찰.
   placeholder 등 속성 텍스트에 사용(CSS data-ko/en 으로 못 바꾸는 것). */
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

export default function BensonInquiry() {
  const [open, setOpen] = useState(false);
  const lang = useSiteLang();
  const stickerRef = useRef(null);

  /* 툴팁 auto-peek */
  useEffect(() => {
    const el = stickerRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const peek = () => el.classList.add('is-peek');
    const unpeek = () => el.classList.remove('is-peek');
    const timers = [];

    if (coarse) {
      timers.push(setTimeout(peek, 1400));
      timers.push(setTimeout(unpeek, 3800));
      return () => { timers.forEach(clearTimeout); unpeek(); };
    }
    let alive = true;
    const cycle = () => {
      if (!alive) return;
      peek();
      timers.push(setTimeout(() => {
        unpeek();
        timers.push(setTimeout(cycle, 3500));
      }, 2000));
    };
    timers.push(setTimeout(cycle, 3000));
    return () => { alive = false; timers.forEach(clearTimeout); unpeek(); };
  }, []);

  return (
    <>
      <button
        ref={stickerRef}
        type="button"
        className="bn-sticker"
        onClick={() => setOpen(true)}
        aria-label={lang === 'en' ? 'Open inquiry form' : '프로젝트 문의 열기'}
      >
        <span className="bn-sticker-inner">
          <img className="bn-sticker-img" src="/images/benson/inquiry-sticker-web.png" alt="" aria-hidden="true" />
        </span>
        <span className="bn-tip" aria-hidden="true">
          <span data-ko>프로젝트 문의 →</span>
          <span data-en>Get in touch →</span>
        </span>
      </button>

      {open && <BensonInquiryModal onClose={() => setOpen(false)} />}

      <style jsx global>{`
        .bn-sticker {
          position: fixed;
          left: 24px;
          bottom: 28px;
          z-index: 600;
          width: clamp(73px, 9vw, 132px);
          height: auto;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .bn-sticker-inner {
          display: block;
          animation: bnfloat 4.6s ease-in-out infinite;
          transform-origin: 50% 90%;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.28));
          transition: transform 0.25s ease;
        }
        .bn-sticker-img {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
        }
        .bn-sticker:hover .bn-sticker-inner { transform: scale(1.06); }
        .bn-sticker:active .bn-sticker-inner { transform: scale(0.96); }

        @keyframes bnfloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-4px) rotate(2deg); }
        }

        /* 툴팁 — 스티커 위쪽 중앙에 빨간 알약 (tofuG와 동일 위치) */
        .bn-tip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 4px);
          transform: translateX(-50%) translateY(4px);
          white-space: nowrap;
          background: #E12E1C;
          color: #fff;
          font-family: 'Barlow Condensed', 'Noto Sans KR', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 5px 9px;
          border-radius: 4px;
          box-shadow: 0 6px 16px rgba(225,46,28,0.32);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .bn-tip::after {
          content: '';
          position: absolute;
          left: 50%; top: 100%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #E12E1C;
        }
        .bn-sticker:hover .bn-tip,
        .bn-sticker.is-peek .bn-tip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 640px) {
          .bn-tip { font-size: 11px; padding: 6px 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bn-sticker-inner { animation: none; }
        }
      `}</style>
    </>
  );
}

function BensonInquiryModal({ onClose }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const firstRef = useRef(null);
  const lang = useSiteLang();
  const t = (ko, en) => (lang === 'en' ? en : ko);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
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

    if (!FORMSPREE_ENDPOINT && !CONTACT_EMAIL) { setStatus('sent'); return; }

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

    const subject = encodeURIComponent(`[BENSON] 프로젝트 문의 — ${data.name}`);
    const body = encodeURIComponent(`이름: ${data.name}\n이메일: ${data.email}\n\n${data.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <div className="bn-modal-backdrop" onClick={onClose}>
      <div className="bn-modal" role="dialog" aria-modal="true" aria-label={t('프로젝트 문의', 'Get in touch')} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="bn-modal-close" onClick={onClose} aria-label={t('닫기', 'Close')}>×</button>
        <p className="bn-modal-eyebrow">BENSON</p>
        <h3 className="bn-modal-title">{t('프로젝트 문의', 'Get in touch')}</h3>
        <p className="bn-modal-sub">{t('공간·브랜드 프로젝트를 함께 만들고 싶으시면 남겨주세요.', 'Tell us about your spatial or brand project.')}</p>
        {status === 'sent' ? (
          <p className="bn-modal-done">
            {(!FORMSPREE_ENDPOINT && !CONTACT_EMAIL)
              ? t('문의 접수 준비 중입니다. 곧 연결됩니다 — 감사합니다! 🍦', 'Inquiry intake is being set up — coming soon. Thanks! 🍦')
              : t('문의가 접수되었습니다. 감사합니다! 🍦', 'Thanks — your message has been received! 🍦')}
          </p>
        ) : (
          <form className="bn-modal-form" onSubmit={handleSubmit}>
            <input ref={firstRef} name="name" required placeholder={t('이름', 'Name')} autoComplete="name" />
            <input name="email" type="email" required placeholder={t('이메일', 'Email')} autoComplete="email" />
            <textarea name="message" required rows={4} placeholder={t('프로젝트 내용', 'Project details')} />
            <button type="submit" className="bn-modal-send" disabled={status === 'sending'}>
              {status === 'sending' ? t('보내는 중…', 'Sending…') : t('보내기 →', 'Send →')}
            </button>
            {status === 'error' && <p className="bn-modal-note err">{t('전송 오류가 발생했습니다. 다시 시도해 주세요.', 'Something went wrong. Please try again.')}</p>}
          </form>
        )}
      </div>

      <style jsx global>{`
        .bn-modal-backdrop {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(15,10,10,0.55);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: bnfade 0.2s ease;
        }
        @keyframes bnfade { from { opacity: 0; } to { opacity: 1; } }
        .bn-modal {
          position: relative;
          width: 100%; max-width: 440px;
          background: #fff;
          border-radius: 14px;
          padding: 40px 34px 34px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.35);
          border-top: 6px solid #E12E1C;
          animation: bnpop 0.28s cubic-bezier(0.2,0.9,0.3,1.2);
          font-family: 'Inter', 'Noto Sans KR', sans-serif;
        }
        @keyframes bnpop { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: none; } }
        .bn-modal-close {
          position: absolute; top: 14px; right: 16px;
          width: 34px; height: 34px;
          border: none; background: none; cursor: pointer;
          font-size: 24px; line-height: 1; color: #1a1a1a;
          transition: color 0.2s, transform 0.2s;
        }
        .bn-modal-close:hover { color: #E12E1C; transform: rotate(90deg); }
        .bn-modal-eyebrow {
          font-family: 'Archivo Black', 'Archivo', 'Inter', sans-serif;
          font-size: 12px; letter-spacing: 0.22em; color: #E12E1C; margin: 0 0 8px;
        }
        .bn-modal-title {
          font-family: 'Archivo Black', 'Barlow Condensed', 'Bebas Neue', sans-serif;
          font-weight: 900; font-size: 30px; line-height: 1.05; letter-spacing: -0.01em;
          color: #111; margin: 0 0 10px; text-transform: uppercase;
        }
        .bn-modal-sub { font-size: 13px; line-height: 1.6; color: #666; margin: 0 0 24px; word-break: keep-all; }
        .bn-modal-form { display: flex; flex-direction: column; gap: 12px; }
        .bn-modal-form input,
        .bn-modal-form textarea {
          width: 100%;
          font-family: inherit; font-size: 14px;
          padding: 13px 15px;
          border: 1.5px solid #e3e0dc;
          border-radius: 8px;
          background: #faf9f7;
          color: #1a1a1a;
          transition: border-color 0.2s, background 0.2s;
          resize: vertical;
        }
        .bn-modal-form input::placeholder,
        .bn-modal-form textarea::placeholder { color: #a5a09a; }
        .bn-modal-form input:focus,
        .bn-modal-form textarea:focus {
          outline: none; border-color: #E12E1C; background: #fff;
        }
        .bn-modal-send {
          margin-top: 6px;
          font-family: 'Archivo', 'Inter', sans-serif;
          font-weight: 800; font-size: 14px; letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #fff; background: #E12E1C;
          border: none; border-radius: 8px;
          padding: 14px 18px; cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .bn-modal-send:hover { background: #c8111a; }
        .bn-modal-send:active { transform: translateY(1px); }
        .bn-modal-send:disabled { opacity: 0.6; cursor: default; }
        .bn-modal-done { font-size: 15px; line-height: 1.7; color: #1a1a1a; padding: 8px 0 6px; word-break: keep-all; }
        .bn-modal-note { font-size: 12px; margin: 4px 0 0; }
        .bn-modal-note.err { color: #E12E1C; }
        @media (max-width: 480px) {
          .bn-modal { padding: 34px 22px 26px; }
          .bn-modal-title { font-size: 25px; }
        }
      `}</style>
    </div>
  );
}
