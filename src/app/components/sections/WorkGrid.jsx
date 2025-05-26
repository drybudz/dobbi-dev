'use client';
import styles from './styles/WorkGrid.module.css';

export default function WorkGrid({ featuredProjects }) {
  return (
    <section>
      <div className="workProject">
      {featuredProjects?.map((project) => {
        if (!project) return null;

        // Get all images grouped by size for this project
        const images = [
          ...project.largeProjectImages?.slice(0, 3) || [],
          ...project.mediumProjectImages?.slice(0, 6) || [],
          ...project.smallProjectImages?.slice(0, 2) || []
        ];

        return (
          <div key={project._id} className={styles.workProject}>
            {/* Project Info Link */}
            <div className={styles.projectInfoLink}>
              <div className={styles.projectInfoText}>
                <h3>{project.clientName}, <span>{project.projectYear}</span></h3>
              </div>
              <a href={`/work/${project.slug.current}`} className={styles.viewLink}>
                View
              </a>
            </div>

            {/* Grid Container */}
            <div className={styles.gridContainer}>
              {images.map((image, index) => (
                <div key={index} className={`${styles.gridCell} ${styles[`image${index + 1}`]}`}>
                  <img src={image.asset.url} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}