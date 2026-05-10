import Head from 'next/head';
import Link from 'next/link';

export default function WorkCorpPage() {
  return (
    <>
      <Head>
        <title>WORK (CORP.) — 공간하음 GONGGAN HA-UMM</title>
        <meta name="description" content="Corporate work — coming soon." />
      </Head>

      <main className="wc">
        <Link href="/" className="wc-logo" aria-label="Back to home">夏陰</Link>
        <div className="wc-center">
          <p className="wc-label">WORK (CORP.)</p>
          <h1 className="wc-title">Coming soon</h1>
          <Link href="/" className="wc-back">← Back to home</Link>
        </div>

        <style jsx>{`
          .wc {
            min-height: 100vh;
            background: #0f0e0e;
            color: #fff;
            display: flex;
            flex-direction: column;
            padding: 40px;
            font-family: 'Inter', 'Noto Sans KR', sans-serif;
          }
          .wc-logo {
            font-size: 28px;
            letter-spacing: 0.05em;
            color: #fff;
            text-decoration: none;
            align-self: flex-start;
          }
          .wc-center {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 16px;
          }
          .wc-label {
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
          }
          .wc-title {
            font-size: 48px;
            font-weight: 300;
            letter-spacing: 0.02em;
          }
          .wc-back {
            margin-top: 32px;
            font-size: 12px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: color 0.2s;
          }
          .wc-back:hover {
            color: #fff;
          }
          @media (max-width: 600px) {
            .wc { padding: 20px; }
            .wc-logo { font-size: 22px; }
            .wc-title { font-size: 32px; }
          }
        `}</style>
      </main>
    </>
  );
}
