// components/sections/AboutBandQuarter.js
import styles from './styles/AboutBandQuarter.module.css';

export default function AboutBandQuarter({ title, text }) {
  return (
    <section className={styles.bandContainer}>
      <div className={styles.copyText}>
        <div className={styles.leftColumn}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.rightColumn}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </section>
  );
}