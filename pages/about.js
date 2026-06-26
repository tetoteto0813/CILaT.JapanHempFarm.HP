import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/news', label: 'news' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function About() {
  const { t, i18n } = useTranslation('about');
  const router = useRouter();

  return (
    <div className="engineerPage">
      <Head>
        <title>{t('about')}</title>
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
      {/* 農場概要 */}
      <div className="engineerCard aboutFarmCard">
        <img src="/IMG_0811.png" alt={t('about')} className="aboutFarmImage" />
        <p className="aboutLocationNotice">{t('location_notice')}</p>
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
.aboutFarmCard { max-width: 920px; text-align: center; }
.aboutFarmImage { display: block; width: min(100%, 760px); height: auto; margin: 0 auto; border-radius: 12px; box-shadow: 0 18px 54px rgba(75,54,33,0.14); }
.aboutLocationNotice { width: min(100%, 760px); margin: 18px auto 0; color: var(--text-secondary); font-family: 'Playfair Display', Georgia, serif; font-size: 0.98rem; line-height: 1.8; text-align: left; }
@media (max-width: 720px) {
  .aboutFarmCard { margin: 0 16px 28px; padding: 24px 18px; }
  .aboutFarmImage { border-radius: 10px; }
  .aboutLocationNotice { font-size: 0.92rem; line-height: 1.7; }
}
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