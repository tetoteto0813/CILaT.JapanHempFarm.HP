import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../components/TerminalFrame';
import styles from '../styles/Participants.module.css';

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

const companies = [
  'CILat Inc',
  'Japan Hemp Arts Co.,Ltd',
  'Asahi General Planning Co., Ltd.',
  'Japan Hemp workshop',
];

export default function Participants() {
  const { t, i18n } = useTranslation('participants');
  const router = useRouter();

  return (
    <div className="engineerPage participantsPage">
      <Head>
        <title>{t('participants')}</title>
      </Head>

      <div className="engineerHeader">
        <Link href="/">
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

      <div className={styles.container}>
        <TerminalFrame title={t('participants')}>
          <section className={styles.panel}>
            <h1 className={styles.title}>{t('participants')}</h1>
            <ul className={styles.companyList}>
              {companies.map((company) => (
                <li key={company}>{company}</li>
              ))}
            </ul>
          </section>
        </TerminalFrame>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['participants'])),
    },
  };
}
