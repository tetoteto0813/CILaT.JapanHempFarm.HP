import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TerminalFrame from '../components/TerminalFrame';

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/news', label: 'news' },
  { href: '/contact', label: 'contact' },
  { href: '/business', label: 'business' },
];

export default function News({ newsList }) {
  const { t, i18n } = useTranslation('news');
  const router = useRouter();
  const list = newsList ?? [];

  return (
    <div className="engineerPage">
      {/* ロゴ */}
      <div className="engineerHeader">
        <Link href="/" locale={i18n.language}><img src="/result.PNG" alt="Logo" className="engineerLogo" /></Link>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', marginTop: 24 }}>
        <TerminalFrame title={t('news_title', 'News')}>
          <div className="engineerCard">
          <div className="termHeader"><span className="dot t1"/><span className="dot t2"/><span className="dot t3"/></div>
          <h1 className="engineerTitle">{t('news_title', 'News')}</h1>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {list.length === 0 ? (
              <li style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '1.2rem', padding: '2rem 0' }}>
                {t('empty', 'ニュースはありません')}
              </li>
            ) : (
              list.map(news => (
                <li
                  key={news.id}
                  style={{ marginBottom: '2.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--border)55', display: 'flex', alignItems: 'flex-start', gap: 24, transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseOver={e => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(75,54,33,0.12)';
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(75,54,33,0.08)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {news.img?.url && (
                    <img
                      src={news.img.url}
                      alt={news.title}
                      style={{ width: 240, height: 240, objectFit: 'cover', borderRadius: 12, marginRight: 0, boxShadow: '0 2px 12px rgba(75,54,33,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                      onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(75,54,33,0.12)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(75,54,33,0.08)';
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '1.18rem', marginBottom: 6, color: 'var(--text)' }}>{news.title}</div>
                    <div style={{ fontSize: '0.98rem', color: 'var(--muted)', marginBottom: 8 }}>{news.publishedAt ? news.publishedAt.slice(0, 10) : ''}</div>
                    <div style={{ fontSize: '1.02rem', color: 'var(--text)', background: 'var(--surface)', borderRadius: 6, padding: '12px 16px' }} dangerouslySetInnerHTML={{ __html: news.body }} />
                  </div>
                </li>
              ))
            )}
          </ul>
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Link href="/" locale={i18n.language}>
                  <span
                    className="cta"
                    style={{
                      background: 'var(--secondary)',
                      color: 'var(--text)',
                      fontWeight: '700',
                      fontSize: '1.02rem',
                      padding: '12px 32px',
                      borderRadius: 10,
                      display: 'inline-block',
                      cursor: 'pointer',
                      boxShadow: '0 8px 28px rgba(47,58,67,0.06)'
                    }}
                  >
                    {t('back_home', 'ホームへ戻る')}
                  </span>
                </Link>
              </div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}

// 言語情報をSSRで渡す
export async function getStaticProps() {
  return {
    notFound: true,
  };
}