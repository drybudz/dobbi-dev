// components/sections/ChatLink.js
import Link from 'next/link';
import styles from './styles/ChatLink.module.css';

export default function ChatLink({ title, action }) {
  return (
    <section className={styles.chatLinkSection}>
      <div className={styles.chatLinkContainer}>
        <Link href={action || '#'} className={styles.chatLink}>
          <span className={styles.linkText}>{title}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}