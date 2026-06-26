import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TerminalFrame from '../../components/TerminalFrame';
import { fetchNewsDetail, fetchNewsList } from '../../lib/microcms';
import styles from '../../styles/News.module.css';

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/news', label: 'news' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function NewsDetail({ news }) {
  const { t, i18n } = useTranslation('news');
  const router = useRouter();

  if (router.isFallback) {
    return <div className="engineerPage" />;
  }

  return (
    <div className="engineerPage">
      <div className="engineerHeader">
        <Link href="/" locale={i18n.language}>
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
        <TerminalFrame title={news.title || t('news_title', 'News')}>
          <article className={`${styles.panel} ${styles.detailPanel}`}>
            {news.image?.url && (
              <img src={news.image.url} alt={news.title} className={styles.detailImage} />
            )}
            <div className={styles.meta}>{news.publishedAt ? news.publishedAt.slice(0, 10) : ''}</div>
            <h1 className={styles.detailTitle}>{news.title}</h1>
            <div className={styles.detailBody} dangerouslySetInnerHTML={{ __html: news.content }} />
            <div className={styles.backLinkWrap}>
              <Link href="/news" locale={i18n.language} className="cta secondary">
                {t('back_to_news', 'ニュース一覧へ戻る')}
              </Link>
            </div>
          </article>
        </TerminalFrame>
      </div>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  let contents = [];

  try {
    contents = await fetchNewsList();
  } catch (error) {
    contents = [];
  }

  const paths = contents.flatMap((news) => (
    locales || ['ja']
  ).map((locale) => ({
    params: { id: news.id },
    locale,
  })));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    const news = await fetchNewsDetail(params.id);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['news'])),
        news,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}
