'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/FeaturedProjects.module.css';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedProjects({
  beforeText,
  projects = [],
  afterText
}) {
  const [featuredProject, setFeaturedProject] = useState(null);
  const imageColumnRef = useRef(null); // Ref to the image column for position
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setFeaturedProject(projects[randomIndex]);
    }
  }, [projects]);

  useEffect(() => {
    const handleScroll = () => {
      if (imageColumnRef.current) {
        const imageColumnRect = imageColumnRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the element is visible
        const elementVisibleRatio = (windowHeight - imageColumnRect.top) / (windowHeight + imageColumnRect.height);

        // Adjust a multiplier for stronger/weaker effect.
        // We want movement to happen as the element scrolls from bottom to top of viewport.
        // Let's use a range for parallax movement, e.g., total 20% of imageColumn height.
        // If the image is 120% tall, 20% is the extra height.
        const totalParallaxRange = imageColumnRect.height * 0.2; // 20% of container height for movement

        // Map the scroll position to the parallax range
        // When element is at bottom of viewport, offset is 0 (or centered in its extra height)
        // When element is at top of viewport, offset is maxMovement
        // We want it to start with a slight negative offset and move to a positive one
        // A simple linear mapping:
        // When sectionTop is windowHeight, offset is -totalParallaxRange / 2 (start slightly up)
        // When sectionTop is -imageColumnRect.height, offset is +totalParallaxRange / 2 (end slightly down)
        const scrollProgress = (windowHeight - imageColumnRect.top) / (windowHeight + imageColumnRect.height);
        let offset = (scrollProgress - 0.5) * totalParallaxRange; // Center the movement around 0

        // Clamp offset to ensure it stays within the available extra height
        offset = Math.max(-totalParallaxRange / 2, Math.min(totalParallaxRange / 2, offset));

        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <div className={styles.imageColumn} ref={imageColumnRef}>
            {featuredProject.largeProjectImages?.[0]?.asset?.url && (
              <Link href={`/work/${featuredProject.slug?.current || '#'}`} className={styles.imageLink}>
                {/* NEW INNER DIV FOR PARALLAX EFFECT */}
                <div
                  className={styles.parallaxWrapper}
                  style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                  <Image
                    src={featuredProject.largeProjectImages[0].asset.url}
                    alt={featuredProject.largeProjectImages[0].alt || featuredProject.name}
                    fill // Image fills the new parallaxWrapper div
                    className={styles.projectImage}
                    style={{ objectFit: 'cover' }} // objectFit remains on Image
                  />
                </div>
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