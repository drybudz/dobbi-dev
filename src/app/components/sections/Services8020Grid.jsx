// components/sections/Services8020Grid.js
import styles from './styles/Services8020Grid.module.css';

export default function Services8020Grid({
  servicesTitle,
  servicesDescription,
  servicesSideListTop,
  servicesSideTitle,
  servicesSideDescription,
  servicesSideList,
  servicesSideListBottom
}) {
  return (
    <section className={styles.gridContainer}>
      <div className={styles.leftColumn}>
        <h2 className={styles.title}>{servicesTitle}</h2>
        <p className={styles.description}>{servicesDescription}</p>
      </div>
      <div className={styles.rightColumn}>
        {/* Top List */}
        <div className={styles.sideSection}>
          {servicesSideListTop?.map((item, index) => (
            <p key={index} className={styles.topListItem}>{item}</p>
          ))}
        </div>

        {/* Middle Title */}
        <div className={styles.sideSection}>
          <h4 className={styles.sideTitle}>{servicesSideTitle}</h4>
        </div>

        {/* Middle Description */}
        <div className={styles.sideSection}>
          <p className={styles.sideDescription}>{servicesSideDescription}</p>
        </div>

        {/* Horizontal List */}
        <div className={styles.sideSection}>
          <div className={styles.horizontalList}>
            {servicesSideList?.map(({item}, index) => (
              <span key={index} className={styles.horizontalListItem}>
                {item}
                {index < servicesSideList.length - 1 && <span className={styles.dot}>•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom List */}
        <div className={styles.sideSection}>
          {servicesSideListBottom?.map((item, index) => (
            <p key={index} className={styles.bottomListItem}>{item}</p>
          ))}
        </div>
      </div>
    </section>
  );
}