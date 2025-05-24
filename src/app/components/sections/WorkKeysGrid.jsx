// components/sections/WorkKeysGrid.js
import styles from './styles/WorkKeysGrid.module.css';

export default function WorkKeysGrid({ 
  title, 
  subtitle, 
  items = [] 
}) {
  return (
    <section className={styles.workKeys}>
      <div className={styles.grid}>
        {/* Title Column (Left, spans 2 rows) */}
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Key Items (5 items in 2 rows) */}
        {items.slice(0, 5).map((item, index) => (
          <div 
            key={index} 
            className={styles.keyItem}
            style={{
              gridColumn: index < 3 ? index + 2 : index - 1,
              gridRow: index < 3 ? 1 : 2
            }}
          >
            <h3 className={styles.keyTitle}>{item.keyTitle}</h3>
            <p className={styles.keyDescription}>{item.keyDescription}</p>
          </div>
        ))}

        {/* Subtitle (Bottom Right) */}
        <div className={styles.subtitleColumn}>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}