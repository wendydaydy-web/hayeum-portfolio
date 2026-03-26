import Link from 'next/link';

/**
 * Project footer navigation — Previous / Back to Top / Next.
 *
 * @param {Object}   props
 * @param {Object}   [props.prevProject] - { name: string, href: string }
 * @param {Object}   [props.nextProject] - { name: string, href: string }
 */
export default function ProjectFooter({ prevProject, nextProject }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-nav">
      {prevProject ? (
        <Link href={prevProject.href}>← {prevProject.name}</Link>
      ) : (
        <span />
      )}
      <a href="#" onClick={scrollToTop}>
        Back to Top ↑
      </a>
      {nextProject ? (
        <Link href={nextProject.href}>{nextProject.name} →</Link>
      ) : (
        <span />
      )}

      <style jsx>{`
        .footer-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px clamp(24px, 5vw, 80px);
          border-top: 1px solid var(--fg-10);
        }
        .footer-nav :global(a),
        .footer-nav a {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 1px;
          color: var(--fg-50);
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-nav :global(a:hover),
        .footer-nav a:hover {
          color: var(--fg);
        }
        @media (max-width: 640px) {
          .footer-nav { flex-direction: column; gap: 16px; }
        }
      `}</style>
    </footer>
  );
}
