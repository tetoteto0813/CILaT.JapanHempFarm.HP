import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../components/TerminalFrame';


const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function Contact() {
  const { t, i18n } = useTranslation('contact');
  const router = useRouter();

  return (
    <div className="engineerPage">
      <Head>
        <title>{t('contact') || 'Contact'}</title>
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
      {/* メールリンク */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 40 }}>
        <TerminalFrame title={t('contact') || 'Contact'}>
          <div className="engineerCard" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div className="termHeader"><span className="dot t1"/><span className="dot t2"/><span className="dot t3"/></div>
          <h1 className="engineerTitle">{t('contact')}</h1>
          <p className="engineerSub">{t('contact_message', 'For inquiries, please contact us by email.')}</p>
            <a href="mailto:cilat.20250905@gmail.com" className="cta mail" style={{ display: 'inline-block', marginTop: 14 }}>cilat.20250905@gmail.com</a>
          </div>
        </TerminalFrame>
      </div>
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
      ...(await serverSideTranslations(locale, ['contact'])),
    },
  };
}