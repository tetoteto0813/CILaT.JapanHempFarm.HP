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
  { href: '/business', label: 'business' },
];

export default function Business() {
  const { t, i18n } = useTranslation('business');
  const router = useRouter();

  return (
    <div className="engineerPage businessPage">
      <Head>
        <title>{t('business') || 'Business'}</title>
      </Head>
      {/* ロゴ */}
      <div className="engineerHeader">
        <Link href="/" onClick={(e) => { if (typeof window !== 'undefined' && window.location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
          <img src="/result.PNG" alt="Logo" className="engineerLogo" />
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

            <ul>
              <li>
                <strong>{t('service_web_title')}</strong>
                <div className={styles.sub}>{t('service_web_desc')}</div>
              </li>
              <li>
                <strong>{t('service_app_title')}</strong>
                <div className={styles.sub}>{t('service_app_desc')}</div>
              </li>
              <li>
                <strong>{t('service_infra_title')}</strong>
                <div className={styles.sub}>{t('service_infra_desc')}</div>
              </li>
              <li>
                <strong>{t('service_agri_title')}</strong>
                <div className={styles.sub}>{t('service_agri_desc')}</div>
              </li>
            </ul>

            <div style={{ marginTop: 20 }}>
              <Link href="/contact" locale={i18n.language} className={styles.contactBtn} aria-label={t('service_cta')}>
                <img src="/contact-button.png" alt={t('service_cta')} />
                <span className={styles.btnText}>
                  {String(t('service_cta')).split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < String(t('service_cta')).split('\n').length - 1 ? <br /> : null}
                    </span>
                  ))}
                </span>
              </Link>
            </div>
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