import { useEffect, useRef } from 'react';

/**
 * Reusable section wrapper with number label, title, and scroll reveal.
 *
 * @param {Object}   props
 * @param {string}   props.id       - Section anchor id
 * @param {string}   props.num      - Section number label (e.g. "01")
 * @param {string}   props.title    - Section title (supports HTML via dangerouslySetInnerHTML if needed)
 * @param {string}   [props.className] - Additional class names
 * @param {React.ReactNode} props.children
 */
export default function ProjectSection({ id, num, title, className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`project-section reveal ${className}`} ref={ref}>
      <div className="section-inner">
        {num && <p className="section-num">{num}</p>}
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>

      <style jsx>{`
        .project-section {
          padding: clamp(60px, 10vw, 140px) clamp(24px, 5vw, 80px);
        }
        .section-inner {
          max-width: 1400px;
          margin: 0 auto;
        }
        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--fg-40);
          margin-bottom: 12px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 40px;
        }
      `}</style>
    </section>
  );
}
