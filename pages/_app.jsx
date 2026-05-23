import { useEffect } from 'react';
import { Cormorant_Garamond, Noto_Serif_KR } from 'next/font/google';
import '../styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const notoSerifKR = Noto_Serif_KR({
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
  preload: false,
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const saved = localStorage.getItem('site-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleKey = (e) => {
      if (e.shiftKey && e.key === 'D') {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('site-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('site-theme', 'dark');
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`${cormorant.variable} ${notoSerifKR.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
