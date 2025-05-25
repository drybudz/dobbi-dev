// components/sections/HomeSolutionGrid.jsx
import styles from './styles/HomeSolutionGrid.module.css';

export default function HomeSolutionGrid({ 
  title, 
  solutions = [] 
}) {
  return (
    <section className={styles.solutions}>
      <div className={styles.grid}>
        {/* Title Column (Left, spans 2 rows) */}
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Solution Items (5 items in 2 rows) */}
        {solutions.slice(0, 5).map((solution, index) => (
          <div 
            key={index} 
            className={styles.solutionItem}
            style={{
              gridColumn: index < 3 ? index + 2 : index - 1,
              gridRow: index < 3 ? 1 : 2
            }}
          >
            <h3 className={styles.solutionTitle}>{solution.solutionTitle}</h3>
            <p className={styles.solutionTextA}>{solution.solutionTextA}</p>
            {solution.solutionTextB && (
              <p className={styles.solutionTextB}>{solution.solutionTextB}</p>
            )}
          </div>
        ))}

        {/* Empty Subtitle Column (Bottom Right) */}
        <div className={styles.emptyColumn}></div>
      </div>
    </section>
  );
}