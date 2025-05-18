import { getProject } from "../../../../../sanity/schemas/sanity-utils";
import { PortableText } from "@portabletext/react";
// for this one above it looks like next-sanity also works instead of @portabletext/react, probably Sanity has created its own component
import Image from "next/image";
import styles from "./project.module.css";

// TODO: Update this to the context structure...
export const revalidate = 30; // Revalidate every 30 seconds

export default async function Project({ params }) {
  const { project: slug } = await params;
  const project = await getProject(slug);
  console.log(project, "fetch project");

  if (!project) {
    return <div>Project not found</div>; // Or a more user-friendly error message
  }

  const largeImage = project?.largeProjectImages?.[0];
  const smallImages = project?.smallProjectImages || [];
  let mediumImages = project?.mediumProjectImages || [];
  const stats = project?.stats;

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
            <img src={mediumImages[0]?.url} alt="Top Left" />
          </div>
          <div className={styles.Col}>
            <div className={styles.TopRightMainImage}>
              <img src={mediumImages[1]?.url} alt="Top Right Main" />
            </div>
            <div className={styles.TopRightSmallImages}>
              <div className={styles.SmallImage}>
                <img src={smallImages[0]?.url} alt="Top Right Small 1" />
              </div>
              <div className={styles.SmallImage}>
                <img src={smallImages[1]?.url} alt="Top Right Small 2" />
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
            <img src={mediumImages[2]?.url} alt="Bottom Right" />
          </div>
        </div>
      </div>

      <div className={styles.ImageContentRow}>
        <div className={styles.Image}>
          <Image
            src={largeImage?.url}
            alt={largeImage?.alt}
            fill
            sizes="100%"
          />
        </div>
        <div className={styles.StatsSection}>
          {stats?.map((stat, index) => {
            return (
              <div key={index} className={styles.StatContainer}>
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
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
