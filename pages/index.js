import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const languages = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'pt', label: 'Português' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'fr', label: 'Français' },
];

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/philosophy', label: 'philosophy' },
  { href: '/contact', label: 'contact' },
  { href: '/news', label: 'news' },
  { href: '/business', label: 'business' },
  { href: '/participants', label: 'participants' },
];

export default function Home() {
  const { t, i18n } = useTranslation('home');
  const router = useRouter();
  const [langIndex, setLangIndex] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const idx = languages.findIndex((language) => language.code === i18n.language);
    if (idx !== -1) {
      setLangIndex(idx);
    }
  }, [i18n.language]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }

    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangMenu]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setReducedMotion(motionQuery.matches);
    const handleScroll = () => setParallaxY(window.scrollY);

    syncMotionPreference();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', syncMotionPreference);
    } else {
      motionQuery.addListener(syncMotionPreference);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', syncMotionPreference);
      } else {
        motionQuery.removeListener(syncMotionPreference);
      }
    };
  }, []);

  const handleLangButtonClick = () => {
    setShowLangMenu((prev) => !prev);
  };

  const handleLangSelect = (idx) => {
    setShowLangMenu(false);
    router.push(router.asPath, undefined, { locale: languages[idx].code });
  };

  const backdropOffset = reducedMotion ? 0 : Math.min(parallaxY * 0.18, 72);
  const noiseOffset = reducedMotion ? 0 : Math.min(parallaxY * 0.1, 36);
  const statementOffset = reducedMotion ? 0 : Math.min(parallaxY * 0.12, 28);
  const heroOffset = reducedMotion ? 0 : Math.min(parallaxY * 0.08, 24);
  const statementOpacity = reducedMotion ? 0.92 : Math.max(0.28, 1 - parallaxY / 580);
  const heroOpacity = reducedMotion ? 1 : Math.max(0.72, 1 - parallaxY / 1400);
  const cueOpacity = reducedMotion ? 0.82 : Math.max(0, 0.88 - parallaxY / 240);

  return (
    <div key={i18n.language}>

      <div className={styles.container}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/top-japanhempfarm.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className={styles.heroBackdrop}
          style={{ transform: `translate3d(0, ${backdropOffset}px, 0) scale(1.08)` }}
        />
        <div
          aria-hidden
          className={styles.noiseLayer}
          style={{ transform: `translate3d(0, ${noiseOffset}px, 0)` }}
        />
        <div aria-hidden className={styles.heroGlow} />

        <div className={styles.leftNav}>
          {navLinks.map((link, idx) => (
            <span
              key={link.href}
              className={styles.navItem}
              onClick={() => router.push(link.href, undefined, { locale: i18n.language })}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  router.push(link.href, undefined, { locale: i18n.language });
                }
              }}
              style={{ animationDelay: `${0.15 * idx + 0.2}s` }}
            >
              {t(link.label)}
            </span>
          ))}
        </div>

        <div
          className={styles.statementBand}
          style={{ transform: `translate3d(0, ${statementOffset}px, 0)`, opacity: statementOpacity }}
        >
          <div className={styles.statementTrack}>
            <span className={styles.statementSymbol}>{t('company_statement_kyo')}</span>
            <span className={styles.statementSymbol}>{t('company_statement_zon')}</span>
            <span className={styles.statementVertical}>{t('company statement')}</span>
            <span className={styles.statementSymbol}>{t('company_statement_kyo')}</span>
            <span className={styles.statementSymbol}>{t('company_statement_ei')}</span>
          </div>
        </div>

        <div
          className={styles.heroContent}
          style={{ transform: `translate3d(0, ${heroOffset}px, 0)`, opacity: heroOpacity }}
        >
        </div>

        <div className={styles.scrollCue} style={{ opacity: cueOpacity }}>
          <div className={styles.scrollCueLine} />
        </div>
      </div>

      <div className={styles.languageMenuWrap} ref={langMenuRef}>
        <button className={styles.languageButton} onClick={handleLangButtonClick}>
          {languages[langIndex].label} &#9776;
        </button>
        {showLangMenu && (
          <ul className={styles.languageMenu}>
            {languages.map((lang, idx) => (
              <li key={lang.code}>
                <button
                  className={idx === langIndex ? `${styles.languageMenuItem} ${styles.languageMenuItemActive}` : styles.languageMenuItem}
                  onClick={() => handleLangSelect(idx)}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
    },
  };
}