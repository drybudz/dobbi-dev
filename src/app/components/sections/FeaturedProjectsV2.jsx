'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/FeaturedProjectsV2.module.css';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjectsV2({
  beforeText,
  projects = [],
  afterText,
  leftLink = { title: '', slug: '' },
  rightLink = { title: '', slug: '' }
}) {
  const [featuredProject, setFeaturedProject] = useState(null);
  const imageColumnRef = useRef(null); // Ref to the image column for position

  useEffect(() => {
    // Select a random project on mount
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setFeaturedProject(projects[randomIndex]);
    }
  }, [projects]);

  useEffect(() => {
    // Parallax effect for the image column
    if (imageColumnRef.current) {
      gsap.fromTo(
        imageColumnRef.current,
        { y: 0 }, // Start at original position
        {
          y: -100, // Move up by 200px for parallax effect
          scrollTrigger: {
            trigger: imageColumnRef.current,
            start: 'top 80%', // Start when top of image column is 80% in view
            end: 'bottom 70%', // End when bottom of image column hits top of viewport
            scrub: true, // Smoothly tie to scroll
            invalidateOnRefresh: true, // Recalculate on resize
            onEnter: () => console.log('Parallax enter:', imageColumnRef.current.style.transform),
            onUpdate: (self) => console.log('Parallax progress:', self.progress.toFixed(2), imageColumnRef.current.style.transform),
            onLeave: () => console.log('Parallax leave:', imageColumnRef.current.style.transform),
          }
        }
      );
    } else {
      // console.warn('imageColumnRef is null');
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Cleanup ScrollTriggers
    };
  }, []);

  // if (!featuredProject) {
  //   return null;
  // }

  return (
    <section className={styles.container}>
      {/* Conditionally render the projectContainer only if a featuredProject exists. */}
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
                <div
                  className={styles.parallaxWrapper}
                  // Removed inline parallaxOffset since GSAP handles it
                >
                  <Image
                    src={featuredProject.largeProjectImages[0].asset.url}
                    alt={featuredProject.largeProjectImages[0].alt || featuredProject.name}
                    fill
                    className={styles.projectImage}
                    style={{ objectFit: 'cover' }}
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

      {(beforeText || afterText) && (
        <div className={styles.copyText}>
          <div className={styles.leftColumn}></div>
          <div className={styles.rightColumn}>
            {beforeText && (
              <p className={styles.fullWidthText}>{beforeText}</p>
            )}
            {afterText && (
              <div className={styles.afterSection}>
                <div className={styles.afterTextContainer}>
                  <span className={styles.afterArrow} aria-hidden="true" />
                  <p className={styles.afterText}>{afterText}</p>
                </div>
                <div className={styles.linksContainer}>
                  {/* Left Link */}
                  <Link
                    href={leftLink.slug || '#'}
                    className={`${styles.link} ${styles.leftLink}`}
                  >
                    <span className={styles.arrow} aria-hidden="true" />
                    <span className={styles.linkText}>{leftLink.title}</span>
                  </Link>

                  {/* Right Link */}
                  <Link
                    href={rightLink.slug || '#'}
                    className={`${styles.link} ${styles.rightLink}`}
                  >
                    <span className={styles.arrow} aria-hidden="true" />
                    <span className={styles.linkText}>{rightLink.title}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}