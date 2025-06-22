'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/FeaturedProjects.module.css';
import { useState, useEffect } from 'react';

export default function FeaturedProjects({
  beforeText,
  projects = [],
  afterText
}) {
  const [featuredProject, setFeaturedProject] = useState(null);

  useEffect(() => {
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setFeaturedProject(projects[randomIndex]);
    }
  }, [projects]);

  if (!featuredProject) {
    return null;
  }

  return (
    <section className={styles.container}>
      {beforeText && (
        <p className={styles.fullWidthText}>{beforeText}</p>
      )}

      {featuredProject && (
        <div className={styles.projectContainer}>
          {/* Mobile-only project name (hidden on desktop) */}
          <h3 className={styles.mobileProjectName}>
            <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
              {featuredProject.name}
            </Link>
          </h3>

          {/* Left column (image) */}
          <div className={styles.imageColumn}>
            {featuredProject.largeProjectImages?.[0]?.asset?.url && (
              <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
                <Image
                  src={featuredProject.largeProjectImages[0].asset.url}
                  alt={featuredProject.largeProjectImages[0].alt || featuredProject.name}
                  fill
                  className={styles.projectImage}
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            )}
          </div>

          {/* Right column (text) */}
          <div className={styles.textColumn}>
            <h3 className={styles.projectName}>
              <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
                {featuredProject.name}
              </Link>
            </h3>

            <div className={styles.projectMeta}>
              {featuredProject.clientName && (
                <span>
                  <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
                    {featuredProject.clientName}
                  </Link>,
                </span>
              )}
              {featuredProject.projectYear && (
                <span>
                  <Link href={`/work/${featuredProject.slug?.current || '#'}`}>
                    {featuredProject.projectYear}
                    <span className={styles.arrow} aria-hidden="true" />
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {afterText && (
        <p className={styles.fullWidthText}>{afterText}</p>
      )}
    </section>
  );
}