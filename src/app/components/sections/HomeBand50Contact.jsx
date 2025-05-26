// components/sections/HomeBand50Contact.js
import styles from './styles/HomeBand50Contact.module.css';

export default function HomeBand50Contact({ title, name, email }) {
  return (
    <section id="contact" className={styles.bandContainer}>
      <div className={styles.leftColumn}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.contactInfo}>
          <h4 className={styles.name}>{name}</h4>
            <p className={styles.email}>
                <a href={`mailto:${email}`} className={styles.emailLink}>
                {email}
                </a>
            </p>
        </div>
      </div>
    </section>
  );
}