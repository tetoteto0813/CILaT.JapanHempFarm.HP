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
];

export default function About() {
  const { t, i18n } = useTranslation('about');
  const router = useRouter();
  const history = t('history', { returnObjects: true }) || [];

  return (
    <div className="engineerPage">
      <Head>
        <title>{t('company_profile')}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      {/* ナビゲーション */}
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
      {/* 会社概要 */}
      <TerminalFrame title={t('company_profile') || 'Company'}>
        <div className="engineerCard">
        <div className="termHeader"><span className="dot t1"/><span className="dot t2"/><span className="dot t3"/></div>
        <h1 className="engineerTitle">{t('company_profile')}</h1>
        <table style={{
          width: '100%',
          marginBottom: 32,
          borderCollapse: 'separate',
          borderSpacing: '0 8px'
        }}>
          <tbody>
            <tr>
              <th style={{ textAlign: 'left', color: '#ffffff', width: '38%', fontWeight: 'bold', fontSize: '1.08rem', paddingRight: 12 }}>{t('company_name_label')}</th>
              <td style={{ fontSize: '1.08rem' }}>{t('company_name')}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'left', color: '#ffffff', width: '38%', fontWeight: 'bold', fontSize: '1.08rem', paddingRight: 12 }}>{t('address_label')}</th>
              <td style={{ fontSize: '1.08rem' }}>{t('address')}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'left', color: '#ffffff', width: '38%', fontWeight: 'bold', fontSize: '1.08rem', paddingRight: 12 }}>{t('established_label')}</th>
              <td style={{ fontSize: '1.08rem' }}>{t('established')}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'left', color: '#ffffff', width: '38%', fontWeight: 'bold', fontSize: '1.08rem', paddingRight: 12 }}>{t('representative_label')}</th>
              <td style={{ fontSize: '1.08rem' }}>{t('representative')}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'left', color: '#ffffff', width: '38%', fontWeight: 'bold', fontSize: '1.08rem', paddingRight: 12 }}>{t('capital_label')}</th>
              <td style={{ fontSize: '1.08rem' }}>{t('capital')}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginBottom: 32 }}>
        </div>
          <Link href="/" locale={i18n.language} className="cta secondary" style={{ marginTop: 20, display: 'inline-block' }}>{t('back_home')}</Link>
        </div>
      </TerminalFrame>
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
@keyframes fadeInHistory {
  from { opacity: 0; transform: translateX(-24px);} 
  to   { opacity: 1; transform: translateX(0);} 
}

/* Page-scoped palette adjusted to site theme (greens / browns) */
.engineerPage {
  --bg: #F7F1E4;
  --section-bg: #E9DCC6;
  --surface: #F4F1E9;
  --text: #4B3621;
  --text-secondary: #6B4B2A;
  --border: #CFC89A;
  --primary: #A9C94A; /* Leaf Green */
  --cta-text: #000000;
  font-family: 'Inter', system-ui, -apple-system, 'Noto Sans JP', 'Segoe UI', Roboto, Arial, sans-serif;
}
.engineerPage .engineerCard { background: linear-gradient(180deg, rgba(0,0,0,0.02), var(--surface)); border: 1px solid rgba(75,54,33,0.06); }
.engineerPage .engineerTitle { color: var(--text); letter-spacing: 0.02em; }
.engineerPage table th { color: var(--text-secondary); }
.engineerPage a.cta.secondary { background: transparent; border: 1px solid var(--primary); color: var(--primary); padding: 8px 14px; border-radius:6px; }
.engineerPage .engineerTitle, .engineerPage .engineerCard, .engineerPage table, .engineerPage th, .engineerPage td { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about'])),
    },
  };
}