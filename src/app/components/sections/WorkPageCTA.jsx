// components/sections/WorkPageCTA.js
import styles from './styles/WorkPageCTA.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function WorkPageCTA({ title, description, subtitle, ctaTitle, ctaButtons = [] }) {
  const descriptionRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const sectionRef = useRef(null);
  const parallaxRefs = useRef([]); // Store multiple animation references

  // Helper function to check if URL is internal
  const isInternalUrl = (url) => {
    if (!url) return false;
    return url.startsWith('/');
  };

  useEffect(() => {
    const handleResize = () => {
      const titleElement = document.querySelector(`.${styles.title}`);
      
      if (titleElement) {
        const specificTitle = "A Strategic Partner in Digital Communications";
        const isMobile = window.innerWidth <= 575;

        titleElement.innerHTML = title; 

        if (isMobile) {
          if (title.includes('work')) { 
            if (!titleElement.innerHTML.includes('work<br>')) {
              const newTitle = titleElement.innerHTML.replace('work', 'work<br>');
              titleElement.innerHTML = newTitle;
            }
          } else if (title === specificTitle) { 
            if (!titleElement.innerHTML.includes('Strategic<br>Partner')) {
              let currentHtml = titleElement.innerHTML;
              currentHtml = currentHtml.replace('Strategic', 'Strategic<br>');
              currentHtml = currentHtml.replace(/Digital(\s*)/, 'Digital<br>$1');
              titleElement.innerHTML = currentHtml;
            }
          }
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [title]);

  // Parallax effects
  useEffect(() => {
    const cleanupAnimations = () => {
      parallaxRefs.current.forEach(ref => {
        if (ref && ref.scrollTrigger) {
          ref.scrollTrigger.kill();
        }
      });
      parallaxRefs.current = [];
    };

    if (sectionRef.current) {
      // Parallax for description (existing)
      if (descriptionRef.current) {
        const descAnim = gsap.fromTo(
          descriptionRef.current,
          { y: 0 },
          {
            y: 70,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 15%',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
              id: 'WorkPageCTA-desc-parallax'
            },
          }
        );
        parallaxRefs.current.push(descAnim);
      }

      // Parallax for subtitle
      if (subtitleRef.current) {
        const subtitleAnim = gsap.to(subtitleRef.current, {
          y: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-subtitle-parallax'
          }
        });
        parallaxRefs.current.push(subtitleAnim);
      }

      // Parallax for ctaTitle
      if (ctaTitleRef.current) {
        const ctaTitleAnim = gsap.to(ctaTitleRef.current, {
          y: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: 0.3, // Keep smoother scrub
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-ctaTitle-parallax'
          }
        });
        parallaxRefs.current.push(ctaTitleAnim);
      }

      // Parallax for CTA buttons
      if (ctaButtonsRef.current) {
        const ctaButtonsAnim = gsap.to(ctaButtonsRef.current, {
          y: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-buttons-parallax'
          }
        });
        parallaxRefs.current.push(ctaButtonsAnim);
      }
    }

    return cleanupAnimations;
  }, [title, description, subtitle, ctaTitle, ctaButtons]);

  return (
    <section className={styles.WorkPageCTA} ref={sectionRef} id="WorkPageCTA">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} ref={descriptionRef}>{description}</p>
      {subtitle && (
        <p className={styles.subtitle} ref={subtitleRef}>{subtitle}</p>
      )}
      {ctaTitle && (
        <p className={styles.ctaTitle} ref={ctaTitleRef}>{ctaTitle}</p>
      )}
      {ctaButtons && ctaButtons.length > 0 && (
        <div className={styles.ctaButtonsContainer} ref={ctaButtonsRef}>
          {ctaButtons.map((button, index) => {
            const isInternal = isInternalUrl(button.ctaUrl);
            const buttonContent = (
              <>
                <span className={styles.arrow} aria-hidden="true" />
                <span className={styles.linkText}>{button.ctaText}</span>
              </>
            );

            if (isInternal) {
              return (
                <Link
                  key={index}
                  href={button.ctaUrl}
                  className={styles.link}
                >
                  {buttonContent}
                </Link>
              );
            } else {
              return (
                <a
                  key={index}
                  href={button.ctaUrl}
                  className={styles.link}
                  target={button.openInNewTab ? '_blank' : '_self'}
                  rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {buttonContent}
                </a>
              );
            }
          })}
        </div>
      )}
    </section>
  );
}