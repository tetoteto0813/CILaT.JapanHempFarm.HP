import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../components/TerminalFrame';
import { fetchNewsList } from '../lib/microcms';
import styles from '../styles/News.module.css';

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/news', label: 'news' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function News({ newsList }) {
  const { t, i18n } = useTranslation('news');
  const router = useRouter();
  const list = newsList ?? [];

  return (
    <div className="engineerPage">
      {/* ロゴ */}
      <div className="engineerHeader">
        <Link href="/" locale={i18n.language}><img src="/result.png" alt="Logo" className="engineerLogo" /></Link>
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
      {/* ニュース一覧 */}
      <div className={styles.container}>
        <TerminalFrame title={t('news_title', 'News')}>
          <div className={styles.panel}>
            <h1 className="engineerTitle">{t('news_title', 'News')}</h1>
            {list.length === 0 ? (
              <p className={styles.empty}>{t('empty', 'ニュースはありません')}</p>
            ) : (
              <ul className={styles.newsGrid}>
                {list.map((news) => (
                  <li key={news.id}>
                    <Link href={`/news/${news.id}`} locale={i18n.language} className={styles.newsCard}>
                      <div className={styles.imageWrap}>
                        {news.image?.url ? (
                          <img src={news.image.url} alt={news.title} className={styles.image} />
                        ) : (
                          <div className={styles.imagePlaceholder}>{t('news_title', 'News')}</div>
                        )}
                      </div>
                      {news.publishedAt && <time className={styles.itemDate}>{news.publishedAt.slice(0, 10)}</time>}
                      <h2 className={styles.itemTitle}>{news.title}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  let newsList = [];

  try {
    newsList = await fetchNewsList();
  } catch (error) {
    newsList = [];
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['news'])),
      newsList,
    },
    revalidate: 300,
  };
}