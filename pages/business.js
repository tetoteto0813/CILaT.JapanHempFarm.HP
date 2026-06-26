import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../components/TerminalFrame';
import styles from '../styles/Business.module.css';


const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/news', label: 'news' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function Business() {
  const { t, i18n } = useTranslation('business');
  const router = useRouter();
  const businessItems = t('business_items', { returnObjects: true }) || [];

  return (
    <div className="engineerPage businessPage">
      <Head>
        <title>{t('business') || 'Business'}</title>
      </Head>
      {/* ロゴ */}
      <div className="engineerHeader">
        <Link href="/" onClick={(e) => { if (typeof window !== 'undefined' && window.location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
          <img src="/result.png" alt="Logo" className="engineerLogo" />
        </Link>
      </div>
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
        <div className={styles.panel}>
          <TerminalFrame title={t('business') || 'Business'}>
            <h1 className={styles.title}>{t('business') || 'Business'}</h1>
            <p className={styles.sub}>{t('business_intro')}</p>

            <ul className={styles.businessList}>
              {businessItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TerminalFrame>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['business'])),
    },
  };
}