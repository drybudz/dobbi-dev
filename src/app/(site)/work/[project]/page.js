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
  const stats = project?.stats;

  return (
    <section className={styles.Container}>
      <div className={styles.HeaderSection}>
        <h1>{project.name}</h1>
        <p>
          {project.clientName}
          {project.projectYear ? `, ${project.projectYear}` : ""}
        </p>
      </div>

      <div className={styles.ImageContentRow}>
        <div className={styles.Image}>
          <Image
            src={largeImage?.url}
            alt={largeImage?.alt}
            width={681}
            height={777}
          />
        </div>
        <div className={styles.StatsSection}>
          {stats.map((stat) => {
            return (
              <div className={styles.StatContainer}>
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
