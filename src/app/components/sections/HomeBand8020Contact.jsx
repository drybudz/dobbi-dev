'use client';

// components/sections/HomeBand8020Contact.js
import styles from './styles/HomeBand8020Contact.module.css';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeBand8020Contact({ title, ctaLinks = [] }) {
  const rightColumnRef = useRef(null);

  // Helper function to check if URL is internal
  const isInternalUrl = (url) => {
    if (!url) return false;
    return url.startsWith('/');
  };

  useEffect(() => {
    if (rightColumnRef.current) {
      gsap.fromTo(
        rightColumnRef.current,
        { y: 50 },
        {
          y: 0, // Parallax movement range
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: 'top 80%', // Start when top of rightColumn is 80% in view
            end: 'bottom top', // End when bottom of rightColumn hits top of viewport
            scrub: true, // Smooth scroll-based animation
            invalidateOnRefresh: true, // Recalculate on resize
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Cleanup
    };
  }, []);

  return (
    <section id="contact" className={styles.bandContainer}>
      <div className={styles.leftColumn}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.rightColumn} ref={rightColumnRef}>
        {ctaLinks && ctaLinks.length > 0 && (
          <div className={styles.ctaButtonsContainer}>
            {ctaLinks.map((link, index) => {
              const isInternal = isInternalUrl(link.ctaUrl);
              const linkContent = (
                <>
                  <span className={styles.arrow} aria-hidden="true" />
                  <span className={styles.linkText}>{link.ctaText}</span>
                </>
              );

              if (isInternal) {
                return (
                  <Link
                    key={index}
                    href={link.ctaUrl}
                    className={styles.link}
                  >
                    {linkContent}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={index}
                    href={link.ctaUrl}
                    className={styles.link}
                    target={link.openInNewTab ? '_blank' : '_self'}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {linkContent}
                  </a>
                );
              }
            })}
          </div>
        )}
      </div>
    </section>
  );
}

