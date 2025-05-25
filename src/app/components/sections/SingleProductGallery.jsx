'use client'

import Image from "next/image";
import styles from './styles/SingleProductGallery.module.css';

export default function SingleProductGallery({project}) {
    
    const largeImage = project?.largeProjectImages?.[0];
    const smallImages = project?.smallProjectImages || [];
    let mediumImages = project?.mediumProjectImages || [];
    const stats = project?.stats;
    // console.log("@PP------Project Page @ component :", project);

  // Mop esta validacion que es? Cuando le meti 4 imagenes a medium funciono jaja
  if (mediumImages.length === 0 || mediumImages.length < 3) {
    mediumImages = Array.from([0,1,2]).map((number, index) =>
      mediumImages?.[index]?.url ? mediumImages[index] : ({ url: "https://placehold.co/600" })
    );
  }
    
    return (
    <section className={styles.Container}>
      <div className={styles.HeaderSection}>
        <h1>{project.name}</h1>
        <p>
          {project.clientName}
          {project.projectYear ? `, ${project.projectYear}` : ""}
        </p>
      </div>

      <div className={styles.GridContainer}>
        <div className={styles.Row}>
          <div className={styles.Col}>
            <img src={mediumImages[0]?.asset?.url} alt="Top Left //M 683x444.:" />
          </div>
          <div className={styles.Col}>
            <div className={styles.TopRightMainImage}>
              <img src={mediumImages[1]?.asset?.url} alt="Top Right Main //M 668x446.:" />
            </div>
            <div className={styles.TopRightSmallImages}>
              <div className={styles.SmallImage}>
                <img src={smallImages[0]?.asset?.url} alt="Top Right Small //S 343x423" />
              </div>
              <div className={styles.SmallImage}>
                <img src={smallImages[1]?.asset?.url} alt="Top Right Small 2 //S 343x404" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.AboutContainer}>
            <div className={styles.AboutSection}>
              <h3>{project.aboutProject1}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: project.aboutProjectText1 }}
              />
            </div>
            <div className={styles.AboutSection}>
              <h3>{project.aboutProject2}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: project.aboutProjectText2 }}
              />
            </div>
          </div>
          <div className={styles.Col}>
            <img src={mediumImages[2]?.asset?.url} alt="Bottom Right //M 668x446" />
          </div>
        </div>
      </div>

      <div className={styles.ImageContentRow}>
        <div className={styles.Image}>
          <Image
            src={largeImage?.asset?.url}
            alt={largeImage?.alt + " //L 681x777"}
            fill
            sizes="100%"
          />
        </div>
        <div className={styles.StatsSection}>
          {project.stats?.map((stat, index) => {
            return (
              <div key={index} className={styles.StatContainer}>
                <h3>{stat.statTitle}</h3>
                <p>{stat.statDescription}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.FPO}>
        <p>{project.projectFPO}</p>
      </div>
    </section>
  );
}