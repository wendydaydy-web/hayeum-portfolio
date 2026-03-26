/**
 * Project hero section — BENSON reference style.
 *
 * @param {Object}   props
 * @param {string}   props.title        - Large display title (e.g. "BENSON", "SOLDAM\nMARKET")
 * @param {string}   props.subtitleKo   - Korean subtitle
 * @param {string}   props.subtitleEn   - English subtitle
 * @param {string}   props.label        - Top label (e.g. "Brand Space Concept & Strategy")
 * @param {string}   props.image        - Hero background image path
 * @param {Array}    props.meta         - [{label: "Project", value: "BENSON"}, ...]
 * @param {string}   [props.accentColor]- Accent color for subtitle (optional)
 */
export default function ProjectHero({
  title,
  subtitleKo,
  subtitleEn,
  label,
  image,
  meta = [],
  accentColor,
}) {
  // Support line breaks in title via \n
  const titleParts = title.split('\n');

  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={image} alt={`${title} cover`} />
      </div>
      <div className="hero-content">
        <p className="hero-label">{label}</p>
        <h1 className="hero-title">
          {titleParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < titleParts.length - 1 && <br />}
            </span>
          ))}
        </h1>
        {subtitleKo && <p className="hero-subtitle" data-ko>{subtitleKo}</p>}
        {subtitleEn && <p className="hero-subtitle" data-en>{subtitleEn}</p>}
        {meta.length > 0 && (
          <div className="hero-meta">
            {meta.map(({ label: metaLabel, value }) => (
              <div className="hero-meta-item" key={metaLabel}>
                {metaLabel}
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: flex-end;
          padding: 80px 60px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 30%, rgba(0,0,0,0.6) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          width: 100%;
        }
        .hero-label {
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .hero-title {
          font-family: 'Bebas Neue', var(--font-display), sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: 0.9;
          color: #fff;
          letter-spacing: -2px;
        }
        .hero-subtitle {
          font-size: clamp(14px, 1.5vw, 18px);
          color: rgba(255,255,255,0.7);
          margin-top: 24px;
          font-weight: 300;
          max-width: 600px;
          line-height: 1.7;
          word-break: keep-all;
        }
        .hero-meta {
          display: flex;
          gap: 60px;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .hero-meta-item {
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .hero-meta-item span {
          display: block !important;
          color: #fff;
          font-size: 14px;
          letter-spacing: 0;
          text-transform: none;
          margin-top: 6px;
          font-weight: 400;
        }
        @media (max-width: 640px) {
          .hero { padding: 40px 24px; }
          .hero-meta { gap: 30px; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
