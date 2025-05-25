// components/sections/FeaturedProjects.jsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/FeaturedProjects.module.css';
import { useState, useEffect } from 'react'; // Import useState and useEffect

export default function FeaturedProjects({
  beforeText,
  projects = [],
  afterText
}) {
    // State to hold the selected featured project
    const [featuredProject, setFeaturedProject] = useState(null);

    useEffect(() => {
        // This code only runs on the client-side after initial render
        if (projects.length > 0) {
            const randomIndex = Math.floor(Math.random() * projects.length);
            setFeaturedProject(projects[randomIndex]);
        }
    }, [projects]); // Re-run if projects array changes

    // Optional: Render nothing or a loading state if no project is selected yet
    if (!featuredProject) {
        return null; // Or a skeleton loader
    }

    return (
    <section className={styles.container}>
      {/* Full-width top text */}
      {beforeText && (
        <p className={styles.fullWidthText}>{beforeText}</p>
      )}

      {/* 50/50 columns */}
      {featuredProject && ( // Now featuredProject is guaranteed to be set if not null
        <div className={styles.projectContainer}>
          {/* Left column (image) */}
          <div className={styles.imageColumn}>
            {featuredProject.largeProjectImages?.[0]?.asset?.url && (
              <Image
                src={featuredProject.largeProjectImages[0].asset.url}
                alt={featuredProject.largeProjectImages[0].alt || featuredProject.name}
                fill
                className={styles.projectImage}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Right column (text) */}
          <div className={styles.textColumn}>
            <div className={styles.textContent}>
              
              {/* Project Name */}
              <h3 className={styles.projectName}>
                <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
                  {featuredProject.name}
                </Link>
              </h3>
            </div>
            {/* Client Name & Year */}
              <div className={styles.projectMeta}>
                {featuredProject.clientName && (
                  <span>{featuredProject.clientName},</span>
                )}
                {featuredProject.projectYear && (
                  <span>{featuredProject.projectYear}</span>
                )}
              </div>
          </div>
        </div>
      )}

      {/* Full-width bottom text */}
      {afterText && (
        <p className={styles.fullWidthText}>{afterText}</p>
      )}
    </section>
  );
}