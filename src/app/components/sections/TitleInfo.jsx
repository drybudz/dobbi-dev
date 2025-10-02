// components/sections/TitleInfo.js
import styles from './styles/TitleInfo.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function TitleInfo({ title, description }) {
  const descriptionRef = useRef(null);
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null); // Store the animation reference

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

  // Parallax effect for description
  useEffect(() => {
    if (descriptionRef.current && sectionRef.current) {
      parallaxRef.current = gsap.fromTo(
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
            id: 'titleInfo-parallax' // Add unique ID
          },
        }
      );
    }

    return () => {
      // Only kill our own ScrollTrigger, not all of them
      if (parallaxRef.current && parallaxRef.current.scrollTrigger) {
        parallaxRef.current.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className={styles.titleInfo} ref={sectionRef} id="titleInfo">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} ref={descriptionRef}>{description}</p>
    </section>
  );
}