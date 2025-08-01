// components/sections/TwoLinks50s.js
import Link from 'next/link';
import styles from './styles/TwoLinks50s.module.css';

export default function TwoLinks50s({
  leftLink = { title: '', slug: '' },
  rightLink = { title: '', slug: '' }
}) {
  return (
    <section className={styles.twoLinksSection}>
      <div className={styles.linksContainer}>
        {/* Left Link (50%) */}
        <Link
          href={leftLink.slug || '#'}
          className={`${styles.link} ${styles.leftLink}`}
        >
          <span className={styles.linkText}>{leftLink.title}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </Link>

        {/* Right Link (50%) */}
        <Link
          href={rightLink.slug || '#'}
          className={`${styles.link} ${styles.leftLink}`}
        >
          <span className={styles.linkText}>{rightLink.title}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}