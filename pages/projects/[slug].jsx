import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

let allProjects = [];
try { allProjects = require('../../data/projects-generated'); } catch (e) {}

// Hardcoded slugs — these have dedicated pages, so [slug] should 404 for them
const HARDCODED_SLUGS = new Set(['tofug', 'benson', 'bodyguard', 'gagga', 'soldam']);

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

export async function getStaticPaths() {
  const paths = allProjects
    .filter((p) => !HARDCODED_SLUGS.has(p.slug) && p.sections && p.sections.length > 0)
    .map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project || HARDCODED_SLUGS.has(params.slug)) {
    return { notFound: true };
  }

  // Find prev/next projects (among all projects with pages)
  const navigable = allProjects.filter(
    (p) => HARDCODED_SLUGS.has(p.slug) || (p.sections && p.sections.length > 0)
  );
  const idx = navigable.findIndex((p) => p.slug === params.slug);
  const prev = idx > 0 ? { name: navigable[idx - 1].name, href: `/projects/${navigable[idx - 1].slug}` } : null;
  const next = idx < navigable.length - 1 ? { name: navigable[idx + 1].name, href: `/projects/${navigable[idx + 1].slug}` } : null;

  return { props: { project, prev, next } };
}

export default function DynamicProjectPage({ project, prev, next }) {
  const router = useRouter();
  if (router.isFallback || !project) return null;

  const p = project;
  const I = (name) => `/images/${p.slug}/${name}`;
  const accentColor = '#c4a882';

  // Build sections for nav
  const navSections = (p.sections || []).map((s) => ({
    id: `section-${s.number}`,
    label: s.title_en || s.title_kr || `Section ${s.number}`,
  }));

  // Build hero meta
  const heroMeta = [
    { label: 'Project', value: p.project_en || p.project_kr || p.name },
    { label: 'Category', value: p.category_label_en || p.category_label_kr || '' },
    { label: 'Year', value: p.year || '' },
    { label: 'Scope', value: p.scope_en || p.scope_kr || '' },
  ];
  if (p.location_en || p.location_kr) {
    heroMeta.push({ label: 'Location', value: p.location_en || p.location_kr });
  }

  return (
    <>
      <Head>
        <title>{p.name} — Gonggan Ha-umm</title>
      </Head>

      <ProjectNav sections={navSections} accentColor={accentColor} />

      <ProjectHero
        title={p.name}
        label={p.scope_en || p.scope_kr || ''}
        image={p.hero_image ? I(p.hero_image) : (p.cover_image ? I(p.cover_image) : '')}
        subtitleKo={p.tagline_kr || p.sub_kr || ''}
        subtitleEn={p.tagline_en || p.sub_en || ''}
        meta={heroMeta}
      />

      {/* ── Sections ── */}
      {(p.sections || []).map((section) => (
        <section key={section.number} id={`section-${section.number}`} className="content-section">
          <div className="section-inner">
            <FadeIn>
              <p className="section-label">{section.number} — {section.title_en || section.title_kr}</p>
              {section.title_kr && <h2 className="section-title" data-ko>{section.title_kr}</h2>}
              {section.title_en && <h2 className="section-title" data-en>{section.title_en}</h2>}
              {section.subtitle_kr && <p className="section-subtitle" data-ko>{section.subtitle_kr}</p>}
              {section.subtitle_en && <p className="section-subtitle" data-en>{section.subtitle_en}</p>}
              {section.body_kr && <p className="section-desc" data-ko>{section.body_kr}</p>}
              {section.body_en && <p className="section-desc" data-en>{section.body_en}</p>}
            </FadeIn>

            {section.images && section.images.length > 0 && (
              <div className={`gallery-grid${section.images.length === 1 ? ' single' : ''}`}>
                {section.images.map((img, i) => (
                  <FadeIn key={i} className={`gallery-item${section.images.length === 1 ? ' wide' : ''}`}>
                    <img src={I(img)} alt={`${p.name} ${section.number}-${i + 1}`} loading="lazy" />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <ProjectFooter prevProject={prev} nextProject={next} />

      <style jsx>{`
        /* ===== THEME ===== */
        :global(:root) {
          --warm: ${accentColor};
          --warm-dark: #a08660;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f8f6f3;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
        }
        @media (prefers-color-scheme: dark) {
          :global(:root) {
            --page-bg: #0f0e0e;
            --page-fg: #f0efeb;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --gray: #999;
            --border-light: rgba(255,255,255,0.08);
            --border-subtle: rgba(255,255,255,0.05);
            --nav-scrolled-bg: rgba(15,14,14,0.9);
          }
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== SECTION COMMON ===== */
        .content-section {
          padding: 120px 60px;
        }
        .content-section:nth-child(even) {
          background: var(--section-bg);
        }
        .section-inner {
          max-width: var(--max-width);
          margin: 0 auto;
        }
        .section-label {
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--warm);
          margin-bottom: 16px;
          font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }
        .section-subtitle {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .section-desc {
          font-size: 15px;
          line-height: 1.9;
          color: var(--text-mid);
          max-width: 680px;
          font-weight: 300;
          word-break: keep-all;
        }

        /* ===== FADE IN ===== */
        :global(.fade-in) {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        :global(.fade-in.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== GALLERY ===== */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 60px;
        }
        .gallery-grid.single {
          grid-template-columns: 1fr;
        }
        :global(.gallery-item) {
          overflow: hidden;
          border-radius: 4px;
        }
        :global(.gallery-item) img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }
        :global(.gallery-item:hover) img {
          transform: scale(1.05);
        }
        :global(.gallery-item.wide) {
          grid-column: span 2;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .content-section { padding: 80px 40px; }
          .gallery-grid { grid-template-columns: 1fr; }
          :global(.gallery-item.wide) { grid-column: span 1; }
        }
        @media (max-width: 600px) {
          .content-section { padding: 60px 24px; }
        }
      `}</style>
    </>
  );
}
