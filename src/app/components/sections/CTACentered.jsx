// components/sections/CTACentered.js
import styles from './styles/CTACentered.module.css';

export default function CTACentered({ text, name, email }) {
  return (
    <section className={styles.CTACentered}>
      <p className={styles.text}>{text}</p>
      <p className={styles.name}>{name}</p>
      <a href={`mailto:${email}`} className={styles.email}>{email}</a>
    </section>
  );
}