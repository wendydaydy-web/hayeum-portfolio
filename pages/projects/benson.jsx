import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'space', label: 'Space' },
  { id: 'poster', label: 'Poster' },
  { id: 'film', label: 'Film' },
  { id: 'extras', label: 'Extras' },
];

const HERO_META = [
  { label: 'Work Scope', value: 'Space, Branding, SI Design' },
  { label: 'Location', value: 'Hanwha Galleria Seoul' },
  { label: 'Year', value: '2024' },
];

const I = (name) => `/images/benson/${name}`;

const EXTRAS = [
  'extra-scoop.png',
  'extra-storefront-window.png',
  'extra-overhead-flatlay.png',
  'extra-puddle.png',
  'extra-birdseye.png',
  'extra-silhouette.png',
  'extra-hands.png',
  'extra-product-closeup.png',
  'extra-drizzle.png',
  'extra-skater-feet.png',
  'extra-skater-editorial.png',
  'extra-product-lifestyle.png',
  'extra-melt.png',
  'extra-cup-skateboard.png',
  'extra-product-flatlay.png',
  'extra-cups-arranged.png',
  'extra-product-detail.png',
  'extra-packaging.png',
  'extra-product-artful.png',
  'extra-product-multi.png',
  'extra-cup-concrete.png',
  'extra-poster-ice-cream.png',
  'extra-stilllife.png',
  'extra-product-stylized.png',
  'extra-urban-street.png',
];

function FadeIn({ children, className = '', style }) {
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
  return <div ref={ref} className={`fade-in ${className}`} style={style}>{children}</div>;
}

export default function Benson() {
  return (
    <>
      <Head>
        <title>BENSON Ice Cream — Flagship Store</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#CC0000" />

      <ProjectHero
        title="BENSON"
        label="Brand Space Concept &amp; Strategy"
        image={I('facade.png')}
        subtitleKo={'미국 스트릿 디저트의 다이내믹한 에너지를 담은\n벤슨 아이스크림 플래그십 스토어'}
        subtitleEn={'A flagship ice cream store capturing the dynamic energy\nof authentic American street dessert culture.'}
        meta={HERO_META}
      />

      {/* ── 01 SPACE ── */}
      <section className="space" id="space">
        <div className="section-inner">
          <FadeIn><p className="section-label">01 &mdash; Space</p></FadeIn>
          <FadeIn><h2 className="section-title">Storefront &amp; Interior</h2></FadeIn>

          {/* 2-col: large hero interior + architectural detail */}
          <div className="space-row space-row-2">
            <FadeIn className="space-cell space-cell-wide">
              <img src={I('interior-1.png')} alt="Interior — main view" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('space-architectural.png')} alt="Architectural detail" />
            </FadeIn>
          </div>

          {/* 3-col interior series */}
          <div className="space-row space-row-3">
            <FadeIn className="space-cell">
              <img src={I('interior-2.png')} alt="Interior — counter" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('interior-3.png')} alt="Interior — seating" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('interior-4.png')} alt="Interior — display" />
            </FadeIn>
          </div>

          {/* 2-col: facade + secondary detail */}
          <div className="space-row space-row-2 space-row-2-even">
            <FadeIn className="space-cell">
              <img src={I('facade.png')} alt="Facade" />
            </FadeIn>
            <FadeIn className="space-cell">
              <img src={I('space-detail.jpg')} alt="Space detail" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 02 POSTER ── */}
      <section className="poster-section" id="poster">
        <div className="section-inner">
          <FadeIn><p className="section-label">02 &mdash; Poster</p></FadeIn>
          <FadeIn><h2 className="section-title">Visual Identity</h2></FadeIn>

          <FadeIn className="poster-main">
            <img src={I('poster.png')} alt="BENSON poster" />
          </FadeIn>
          <FadeIn className="poster-long">
            <img src={I('poster-long.png')} alt="BENSON poster long format" />
          </FadeIn>
        </div>
      </section>

      {/* ── 03 FILM ── */}
      <section className="film-section" id="film">
        <div className="section-inner">
          <FadeIn><p className="section-label">03 &mdash; Film</p></FadeIn>
          <FadeIn><h2 className="section-title">Brand Film</h2></FadeIn>

          <FadeIn className="film-frame">
            <video
              src={I('video.mp4')}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </FadeIn>
        </div>
      </section>

      {/* ── 04 EXTRAS ── */}
      <section className="extras-section" id="extras">
        <div className="section-inner">
          <FadeIn><p className="section-label">04 &mdash; Extras</p></FadeIn>
          <FadeIn><h2 className="section-title">Supplementary</h2></FadeIn>

          <div className="extras-grid">
            {EXTRAS.map((name) => (
              <FadeIn key={name} className="extras-cell">
                <img src={I(name)} alt={name.replace(/^extra-/, '').replace(/\.[a-z]+$/, '').replace(/-/g, ' ')} loading="lazy" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ProjectFooter
        prevProject={{ name: 'TOFUG', href: '/projects/tofug' }}
        nextProject={{ name: 'BODY GUARD', href: '/projects/bodyguard' }}
      />

      <style jsx>{`
        :global(:root) {
          --benson-red: #CC0000;
          --dark: #1a1a1a;
          --light: #f5f2ed;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f5f2ed;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
          --nav-scrolled-border: rgba(0,0,0,0.05);
          --keyword-border: #1a1a1a;
          --keyword-color: #1a1a1a;
        }
        :global(html[data-theme='dark']) {
          --page-bg: #0c0c0c;
          --page-fg: #e8e8e8;
          --section-bg: #1a1a1a;
          --text-mid: #aaa;
          --text-light: #999;
          --gray: #999;
          --border-light: rgba(255,255,255,0.08);
          --border-subtle: rgba(255,255,255,0.05);
          --nav-scrolled-bg: rgba(12,12,12,0.9);
          --nav-scrolled-border: rgba(255,255,255,0.05);
          --keyword-border: #e8e8e8;
          --keyword-color: #e8e8e8;
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== I18N ===== */
        :global([data-en]) { display: none; }
        :global(html[lang="en"] [data-ko]) { display: none; }
        :global(html[lang="en"] [data-en]) { display: inline; }
        :global(html[lang="en"] p[data-en]),
        :global(html[lang="en"] h2[data-en]),
        :global(html[lang="en"] div[data-en]) { display: block; }
        :global(html[lang="ko"] p[data-ko]),
        :global(html[lang="ko"] h2[data-ko]),
        :global(html[lang="ko"] div[data-ko]) { display: block; }
        :global(html[lang="ko"] p[data-en]),
        :global(html[lang="ko"] h2[data-en]),
        :global(html[lang="ko"] div[data-en]) { display: none; }

        :global(.fade-in) {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--benson-red); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5vw, 56px); line-height: 1.1;
          margin-bottom: 48px; letter-spacing: 1px;
        }

        /* ===== SPACE ===== */
        .space { background: var(--page-bg); }
        .space-row {
          display: grid;
          gap: 20px;
          margin-bottom: 20px;
        }
        .space-row-2 { grid-template-columns: 1.6fr 1fr; }
        .space-row-2-even { grid-template-columns: 1fr 1fr; }
        .space-row-3 { grid-template-columns: repeat(3, 1fr); }
        :global(.space-cell) {
          overflow: hidden;
          border-radius: 4px;
          background: var(--section-bg);
        }
        :global(.space-cell) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          display: block;
          transition: transform 0.6s ease;
        }
        :global(.space-cell:hover) img { transform: scale(1.02); }
        :global(.space-cell-wide) img { aspect-ratio: 16 / 10; }

        /* ===== POSTER ===== */
        .poster-section { background: var(--section-bg); }
        :global(.poster-main) {
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 24px;
        }
        :global(.poster-main) img {
          width: 100%;
          display: block;
        }
        :global(.poster-long) {
          overflow: hidden;
          border-radius: 4px;
        }
        :global(.poster-long) img {
          width: 100%;
          display: block;
        }

        /* ===== FILM ===== */
        .film-section { background: var(--dark); color: #fff; }
        .film-section .section-label { color: var(--benson-red); }
        .film-section .section-title { color: #fff; }
        :global(.film-frame) {
          overflow: hidden;
          border-radius: 4px;
          background: #000;
        }
        :global(.film-frame) video {
          width: 100%;
          height: auto;
          display: block;
        }

        /* ===== EXTRAS ===== */
        .extras-section { background: var(--page-bg); }
        .extras-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        :global(.extras-cell) {
          overflow: hidden;
          border-radius: 4px;
          background: var(--section-bg);
        }
        :global(.extras-cell) img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1 / 1;
          display: block;
          transition: transform 0.6s ease;
        }
        :global(.extras-cell:hover) img { transform: scale(1.03); }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .space-row-2,
          .space-row-2-even { grid-template-columns: 1fr; }
          .space-row-3 { grid-template-columns: 1fr 1fr; }
          .extras-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .space-row-3 { grid-template-columns: 1fr; }
          .extras-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
