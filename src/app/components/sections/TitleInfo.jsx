// components/sections/TitleInfo.js
// import styles from './styles/TitleInfo.module.css';
import styles from './styles/TItleInfo.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function TitleInfo({ title, description }) {
  const descriptionRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const titleElement = document.querySelector(`.${styles.title}`);
      
      if (titleElement) {
        const specificTitle = "A Strategic Partner in Digital Communications";
        const isMobile = window.innerWidth <= 575;

        // Reset to original title content
        titleElement.innerHTML = title; 

        if (isMobile) {
          // Handle 'work' title
          if (title.includes('work')) { 
            if (!titleElement.innerHTML.includes('work<br>')) {
              const newTitle = titleElement.innerHTML.replace('work', 'work<br>');
              titleElement.innerHTML = newTitle;
            }
          } 
          // Handle specific title
          else if (title === specificTitle) { 
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

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [title]);

  // Parallax effect for description
  useEffect(() => {
    if (descriptionRef.current && sectionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { y: 0 },
        {
          y: 70, // Move description down on scroll
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.titleInfo} ref={sectionRef} id="titleInfo">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} ref={descriptionRef}>{description}</p>
    </section>
  );
}
