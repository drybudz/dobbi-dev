// components/sections/TitleInfo.js
// import styles from './styles/TitleInfo.module.css';
import styles from './styles/TItleInfo.module.css';

export default function TitleInfo({ title, description }) {
  return (
    <section className={styles.titleInfo}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
}
