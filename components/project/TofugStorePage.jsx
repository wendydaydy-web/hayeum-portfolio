import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ProjectNav from './ProjectNav';
import ProjectFooter from './ProjectFooter';

/**
 * TOFU·G 개별 매장 상세 페이지 (2·3·4호점 공용 템플릿, 가벼운 버전).
 * 구성: 헤더+히어로 → 한 줄 소개 → 사진 갤러리 → 지점별 변주(선택) → 크레딧/전체보기 → prev/next.
 * 데이터 단일 소스: data/tofug-stores.js (getStorePage).
 * 사진 없는 슬롯은 검정 placeholder + "준비 중".
 *
 * 주의: styled-jsx 스코프 해시가 next/link <Link> 앵커에 안 붙으므로
 *       ts-* 스타일은 <style jsx global> 로 작성(클래스가 ts- 프리픽스라 충돌 없음).
 */
const I = (name) => `/images/tofug/${name}`;

function Reveal({ children, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`ts-reveal ${className}`} style={style}>{children}</div>;
}

export default function TofugStorePage({ store, prev, next }) {
  if (!store) return null;
  const noEn = `Store ${String(store.no).padStart(2, '0')}`;
  const isFlagship = store.no === 4;
  const gallery = Array.isArray(store.gallery) ? store.gallery : [];
  const hasHero = Boolean(store.mainImage);
  const hasGallery = gallery.length > 0;
  const hasVariation = Boolean(store.variationKo || store.variationEn);

  return (
    <>
      <Head>
        <title>{`${store.name} — TOFU·G — Gonggan Ha-umm`}</title>
      </Head>

      <ProjectNav sections={[]} accentColor="#b5341f" />

      {/* ── 헤더 + 히어로(대표컷) ── */}
      <section className="ts-hero">
        {hasHero ? (
          <div className="ts-hero-bg">
            <img src={I(store.mainImage)} alt={`${store.name} cover`} />
          </div>
        ) : (
          <div className="ts-hero-bg ts-hero-ph">
            <span className="ts-ph-cap"><span data-ko>사진 준비 중</span><span data-en>Photos coming soon</span></span>
          </div>
        )}
        <div className="ts-hero-inner">
          <p className="ts-label">
            {noEn} · INITIA
            {isFlagship && <em className="ts-flag" data-ko> · 플래그십</em>}
            {isFlagship && <em className="ts-flag" data-en> · Flagship</em>}
          </p>
          <h1 className="ts-title">{store.name}</h1>
          {store.descKo && <p className="ts-sub" data-ko>{store.descKo}</p>}
          {store.descEn && <p className="ts-sub" data-en>{store.descEn}</p>}
          <div className="ts-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-k">Address</span>
              <span className="ts-meta-v">{store.address || '-'}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-k">Type</span>
              <span className="ts-meta-v" data-ko>{store.buildingKo || '-'}</span>
              <span className="ts-meta-v" data-en>{store.buildingEn || store.buildingKo || '-'}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-k">Year</span>
              <span className="ts-meta-v">{store.openDate || '-'}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-k">Credit</span>
              <span className="ts-meta-v">INITIA · Spatial Branding Designer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 사진 갤러리 ── */}
      <section className="ts-gallery-sec">
        <div className="ts-inner">
          <p className="ts-sec-label"><span data-ko>공간</span><span data-en>Space</span></p>
          {hasGallery ? (
            <div className="ts-grid">
              {gallery.map((img, i) => (
                <Reveal key={img} className="ts-grid-item">
                  <img src={I(img)} alt={`${store.name} ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="ts-ph-box" role="img" aria-label="사진 준비 중">
              <span className="ts-ph-cap"><span data-ko>사진 준비 중</span><span data-en>Photos coming soon</span></span>
            </div>
          )}
        </div>
      </section>

      {/* ── 지점별 변주(선택, 비면 생략) ── */}
      {hasVariation && (
        <section className="ts-var-sec">
          <div className="ts-inner">
            {store.variationKo && <p className="ts-var" data-ko>{store.variationKo}</p>}
            {store.variationEn && <p className="ts-var" data-en>{store.variationEn}</p>}
          </div>
        </section>
      )}

      {/* ── 하단: 크레딧 + 전체 보기 ── */}
      <section className="ts-credit-sec">
        <div className="ts-inner">
          <p className="ts-credit">INITIA · Spatial Branding Designer</p>
          <p className="ts-credit-sub">
            <span data-ko>공간하음 1호점(만다린 갤러리)과 별개로, 이니시아(Initia Group) 소속으로 진행한 프로젝트입니다.</span>
            <span data-en>An Initia Group project — separate from Gonggan Ha-umm&apos;s first store (Mandarin Gallery).</span>
          </p>
          <Link href="/projects/tofug" className="ts-all-link">
            ← <span data-ko>TOFU·G 전체 보기</span><span data-en>View all TOFU·G</span>
          </Link>
        </div>
      </section>

      <ProjectFooter prevProject={prev} nextProject={next} />

      <style jsx global>{`
        .ts-hero {
          position: relative; min-height: 82vh;
          display: flex; align-items: flex-end;
          padding: 120px 40px 64px; overflow: hidden;
        }
        .ts-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .ts-hero-bg img { width: 100%; height: 100%; object-fit: cover; }
        .ts-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 28%, rgba(0,0,0,0.64) 100%); }
        .ts-hero-ph { background: #141210; display: flex; align-items: center; justify-content: center; }
        .ts-hero-ph::after { display: none; }
        .ts-hero-inner { position: relative; z-index: 1; max-width: 1200px; width: 100%; margin: 0 auto; color: #fff; }
        .ts-label { font-family: 'Barlow Condensed','Inter',sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.82); margin-bottom: 14px; }
        .ts-flag { font-style: normal; font-weight: 700; color: #ff7a5c; }
        .ts-title { font-family: 'Cormorant Garamond','Noto Serif KR',Georgia,serif; font-size: clamp(40px, 7vw, 92px); line-height: 1.02; font-weight: 700; letter-spacing: -0.01em; }
        .ts-sub { font-size: clamp(14px,1.4vw,16px); line-height: 1.75; color: rgba(255,255,255,0.82); margin-top: 20px; max-width: 620px; font-weight: 300; word-break: keep-all; }
        .ts-meta { display: flex; flex-wrap: wrap; gap: 40px; margin-top: 40px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,0.18); }
        .ts-meta-item { font-size: 13px; }
        .ts-meta-k { display: block; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
        .ts-meta-v { color: #fff; font-weight: 400; }

        .ts-inner { max-width: 1200px; margin: 0 auto; }
        .ts-gallery-sec { padding: 90px 40px; background: var(--bg, #fff); }
        .ts-sec-label { font-family: 'Barlow Condensed',sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--fg-50, #888); margin-bottom: 30px; }
        .ts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .ts-grid-item { overflow: hidden; border-radius: 4px; }
        .ts-grid-item img { width: 100%; height: auto; display: block; transition: transform 0.6s ease; }
        .ts-grid-item:hover img { transform: scale(1.04); }
        .ts-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .ts-reveal.visible { opacity: 1; transform: none; }
        .ts-ph-box { aspect-ratio: 16 / 9; background: #141210; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
        .ts-ph-cap { color: rgba(255,255,255,0.5); font-size: 13px; letter-spacing: 0.1em; }

        .ts-var-sec { padding: 0 40px 20px; background: var(--bg, #fff); }
        .ts-var { font-size: 15px; line-height: 1.8; color: var(--fg-60, #666); max-width: 680px; margin: 0 auto; word-break: keep-all; }

        .ts-credit-sec { padding: 60px 40px 100px; border-top: 1px solid var(--fg-10, rgba(0,0,0,0.08)); background: var(--bg, #fff); }
        .ts-credit { font-family: 'Barlow Condensed',sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-70, #333); }
        .ts-credit-sub { font-size: 13px; line-height: 1.7; color: var(--fg-50, #888); margin-top: 8px; max-width: 640px; word-break: keep-all; }
        .ts-all-link { display: inline-block; margin-top: 22px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-70, #333); text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 2px; transition: color 0.2s; }
        .ts-all-link:hover { color: var(--fg, #111); }

        @media (max-width: 768px) {
          .ts-hero { padding: 100px 22px 48px; min-height: 70vh; }
          .ts-gallery-sec, .ts-credit-sec { padding-left: 22px; padding-right: 22px; }
          .ts-grid { grid-template-columns: 1fr; }
          .ts-meta { gap: 22px; }
        }
      `}</style>
    </>
  );
}
