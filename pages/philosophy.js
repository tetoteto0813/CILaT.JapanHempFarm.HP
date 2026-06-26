import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../components/TerminalFrame';
import styles from '../styles/Philosophy.module.css';
 
const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function Philosophy() {
  const { t, i18n } = useTranslation('philosophy');
  const router = useRouter();

  return (
    <div className="engineerPage philosophyPage">
      <Head>
        <title>{t('philosophy_title') || 'Philosophy'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      {/* ロゴ（中央上部・縦書き） */}
      <div className="engineerHeader">
        <Link href="/" onClick={(e) => { if (typeof window !== 'undefined' && window.location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
          <img src="/result.PNG" alt="Logo" className="engineerLogo" />
        </Link>
      </div>
      {/* ナビゲーション（中央寄せ） */}
      <nav className="engineerNav" aria-label="main navigation">
        {navLinks.map((link, idx) => (
          <Link
            key={link.href}
            href={link.href}
            locale={i18n.language}
            className={router.pathname === link.href ? 'active' : ''}
            style={{ animationDelay: `${0.12 * idx + 0.15}s` }}
          >
            {t(link.label)}
          </Link>
        ))}
      </nav>
      {/* 本文 */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('philosophy_heading') || 'Philosophy'}</h1>
          <div className={styles.body}>
            {t('philosophy_body').split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <div className={styles.silverRule} aria-hidden="true" />

          <div className={styles.signatureWrap}>
            <img src="/reitominaga-cilat.png" alt="Signature" className={styles.signature} />
          </div>
        </div>
      </div>
      {/* グローバルCSS */}
      <style jsx global>{`
@keyframes fadeInNav {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}</style>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['philosophy'])),
    },
  };
}