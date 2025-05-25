// components/sections/HomeBandOneThird.js
import styles from './styles/HomeBandOneThird.module.css';

export default function HomeBandOneThird({ title, description }) {
  return (
    <section className={styles.bandContainer}>
      <div className={styles.leftColumn}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.rightColumn}>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}