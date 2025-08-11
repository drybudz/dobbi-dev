// components/sections/AboutBand100.js
import styles from './styles/AboutBand100.module.css';

export default function AboutBand100({ text }) {
  return (
    <section className={styles.bandContainer}>
     <div className={styles.rightColumn}>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}