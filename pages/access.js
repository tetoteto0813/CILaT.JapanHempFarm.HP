import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TerminalFrame from '../components/TerminalFrame';


const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
];

export default function Access() {
  const { t, i18n } = useTranslation('access');
  const router = useRouter();

  return (
    <div className="engineerPage">
      <Head>
        <title>{t('access') || 'Access'}</title>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', marginTop: 24 }}>
        <TerminalFrame title={t('access') || 'Access'}>
          <div className="engineerCard">
          <div className="termHeader"><span className="dot t1"/><span className="dot t2"/><span className="dot t3"/></div>
          <h1 className="engineerTitle">{t('access') || 'Access'}</h1>
          <p className="engineerSub">{t('access_message', 'Our facility is located in Mie Prefecture, Area A. Due to strict entry restrictions, detailed access information cannot be disclosed.')}</p>
            <Link href="/" locale={i18n.language} className="cta secondary" style={{ marginTop: 20, display: 'inline-block' }}>{t('back_home', 'Back to Home')}</Link>
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    notFound: true,
  };
}