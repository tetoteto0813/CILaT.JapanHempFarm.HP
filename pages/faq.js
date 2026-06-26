import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from '../styles/Faq.module.css';
import TerminalFrame from '../components/TerminalFrame';

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/news', label: 'news' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

// 仮FAQリスト（必要に応じて翻訳ファイルで管理も可）
const faqList = [
  {
    q: 'faq_q1',
    a: 'faq_a1'
  },
  {
    q: 'faq_q2',
    a: 'faq_a2'
  }
];

export default function Faq() {
  const { t, i18n } = useTranslation('faq');
  const router = useRouter();

  return (
    <div className="engineerPage">
      <Head>
        <title>{t('faq') || 'FAQ'}</title>
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
      {/* FAQ本文 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', marginTop: 24 }}>
        <TerminalFrame title={t('faq') || 'FAQ'}>
          <div className={styles.faqCard}>
          <h1 className={styles.faqTitle}>{t('faq') || 'FAQ'}</h1>
          <div className={styles.faqRule} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {faqList.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '2.2rem', paddingBottom: '1.2rem', borderBottom: idx !== faqList.length - 1 ? `1px solid ${'var(--border)'}55` : 'none' }}>
                <div className={styles.faqQuestion}>Q. {t(item.q)}</div>
                <div className={styles.faqAnswer}>{t(item.a)}</div>
              </li>
            ))}
          </ul>
            <Link href="/" locale={i18n.language} className={styles.button}>
              {t('back_home', 'ホームへ戻る')}
            </Link>
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