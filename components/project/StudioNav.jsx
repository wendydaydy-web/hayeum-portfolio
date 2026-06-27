import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollProgress from './ScrollProgress';
import SectionNav from './SectionNav';

/**
 * 공용 상단바 (BENSON SiteNav를 참고 기준으로 복제한 재사용 컴포넌트).
 * BENSON 페이지 자체는 수정하지 않으며, 신규 프로젝트 페이지들만 이 컴포넌트를 사용한다.
 *
 * 구성
 *  - 최상단 스크롤 진행 막대(ScrollProgress, #1A1A18 / 3px) — 항상 고정.
 *  - 글로벌 메뉴(로고 + WORK·WORK(CORP.)·INFO·INSTA·EN/KR) ↔ 섹션 메뉴(SectionNav)
 *    를 같은 자리에서 크로스페이드 교체. 스크롤 SWAP_AT 이상 → 섹션 메뉴, 위로 → 글로벌.
 *  - 섹션 메뉴: 현재 섹션만 검정 강조 / 나머지 연회색(ScrollSpy), 클릭 스무스 스크롤,
 *    모바일은 현재 라벨 탭 → 드롭다운 (SectionNav가 담당).
 *
 * @param {Array} props.sections - [{ id, label }] — 존재하는 섹션만 전달(없는 항목 생략)
 */
const SWAP_AT = 60;
const NAV_OFFSET = 80;

export default function StudioNav({ sections = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [lang, setLang] = useState('ko');

  const hasSections = sections.length > 0;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 80);
      setSwapped(hasSections && window.scrollY > SWAP_AT);
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
  }, [hasSections]);

  useEffect(() => {
    const saved = localStorage.getItem('site-lang');
    const initial = saved === 'ko' || saved === 'en' ? saved : 'ko';
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLangPersist = (l) => {
    setLang(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-lang', l);
      document.documentElement.lang = l;
    }
  };

  return (
    <>
      <ScrollProgress />
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-text">
              <span className="logo-default">夏陰</span>
              <span className="logo-hover">{lang === 'ko' ? '여름 그늘' : 'summer shade'}</span>
            </span>
          </Link>
        </div>
        <div className="nav-right">
          <div className="nav-swap" data-mode={swapped ? 'section' : 'global'}>
            <ul className="nav-menu" aria-hidden={swapped}>
              <li><Link href="/#project">WORK</Link></li>
              <li><Link href="/work-corp">WORK(CORP.)</Link></li>
              <li><Link href="/info">INFO</Link></li>
              <li>
                <a href="https://www.instagram.com/id_haumm/" target="_blank" rel="noopener noreferrer">INSTA</a>
              </li>
            </ul>
            <div className="nav-section" aria-hidden={!swapped}>
              <SectionNav sections={sections} offset={NAV_OFFSET} />
            </div>
          </div>
          {/* EN/KR 토글 — 글로벌/섹션 어느 모드에서도 항상 표시 (LAYOUT 옆 고정) */}
          <div className="nav-lang" aria-label="Language toggle">
            <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLangPersist('en')}>EN</button>
            <span className="nav-lang-sep">/</span>
            <button type="button" className={lang === 'ko' ? 'active' : ''} onClick={() => setLangPersist('ko')}>KR</button>
          </div>
        </div>

        <style jsx>{`
          .nav {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            padding: 20px 40px;
            padding-bottom: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            transition: background 0.4s, padding 0.4s, color 0.3s;
            color: #1a1a1a;
          }
          .nav-swap {
            display: grid;
          }
          .nav-swap > :global(*) {
            grid-area: 1 / 1;
            justify-self: end;
            align-self: center;
          }
          .nav-swap .nav-section {
            display: flex;
            align-items: center;
            line-height: 1;
          }
          .nav-swap .nav-menu,
          .nav-swap .nav-section {
            transition: opacity 0.45s ease;
          }
          .nav-swap[data-mode='global'] .nav-section {
            opacity: 0;
            pointer-events: none;
          }
          .nav-swap[data-mode='section'] .nav-menu {
            opacity: 0;
            pointer-events: none;
          }
          .nav.scrolled {
            padding-bottom: 20px;
            background: #ffffff;
          }
          .nav-left {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .nav-logo {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          .nav-logo-text {
            position: relative;
            display: inline-flex;
            align-items: center;
            font-size: 28px;
            line-height: 1;
            font-weight: 400;
            letter-spacing: 0.05em;
            color: #1a1a1a;
            transition: color 0.3s;
          }
          .logo-default,
          .logo-hover {
            display: inline-block;
            font-size: inherit;
            line-height: 1;
            transition: opacity 0.45s ease;
          }
          .logo-hover {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-family: 'Cormorant Garamond', 'Noto Serif KR', serif;
            font-weight: 500;
            font-style: italic;
            letter-spacing: 0.02em;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
          }
          .nav-logo:hover .logo-default {
            opacity: 0;
          }
          .nav-logo:hover .logo-hover {
            opacity: 1;
          }
          .nav-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 36px;
          }
          .nav-menu {
            display: flex;
            align-items: center;
            gap: 36px;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .nav-menu li {
            display: inline-flex;
            align-items: center;
            line-height: 1;
          }
          .nav-menu :global(a) {
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-decoration: none;
            color: #1a1a1a;
            line-height: 1;
            transition: color 0.3s, opacity 0.2s;
          }
          .nav-menu :global(a):hover {
            opacity: 0.6;
          }
          .nav-lang {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #1a1a1a;
            line-height: 1;
          }
          .nav-lang button {
            font: inherit;
            line-height: 1;
            letter-spacing: inherit;
            text-transform: inherit;
            color: rgba(26,26,26,0.4);
            transition: color 0.3s, opacity 0.2s;
            padding: 0;
            margin: 0;
            background: none;
            border: none;
            cursor: pointer;
          }
          .nav-lang button.active {
            color: #1a1a1a;
            font-weight: 600;
          }
          .nav-lang button:hover {
            opacity: 0.7;
          }
          .nav-lang-sep {
            color: inherit;
            opacity: 0.4;
          }
          @media (max-width: 1199px) {
            .nav { padding: 16px 24px; }
          }
          @media (max-width: 809px) {
            .nav { padding: 14px 20px; }
            .nav-right { gap: 14px; }
            .nav-menu { gap: 14px; }
            .nav-menu :global(a),
            .nav-lang { font-size: 10px; letter-spacing: 0.08em; }
            .nav-lang { gap: 4px; }
            .nav-logo-text { font-size: 22px; }
          }
        `}</style>
      </nav>
    </>
  );
}
