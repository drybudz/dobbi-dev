// components/sections/AboutBand50.js
import styles from './styles/AboutBand50.module.css';

export default function AboutBand50({ title, text }) {
  return (
    <section className={styles.bandContainer}>
      <div className={styles.leftColumn}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.rightColumn}>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}