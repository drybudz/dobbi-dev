// components/sections/TitleInfoArrow.js
import styles from './styles/TitleInfoArrow.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function TitleInfoArrow({ title, description }) {
  const descriptionRef = useRef(null);
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const parallaxRef = useRef(null); // Store the animation reference

  const handleScroll = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection && nextSection.tagName === 'SECTION') {
      const rect = nextSection.getBoundingClientRect();
      window.scrollTo({
        top: window.pageYOffset + rect.top - 100,
        behavior: 'smooth'
      });
    }
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
            id: 'titleInfoArrow-parallax' // Add unique ID
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

  // Arrow animation
  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -10,
        duration: 3.5,
        yoyo: true,
        repeat: -1, // Changed to -1 for continuous bobbing
        ease: "power2.inOut",
      });
    }
  }, []);

  // Arrow fade out on scroll
  useEffect(() => {
    if (arrowRef.current && sectionRef.current) {
      gsap.to(arrowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom -10%",
          scrub: true,
          id: 'arrow-fade-out'
        }
      });
    }
  }, []);

  return (
    <section className={styles.titleInfo} ref={sectionRef} id="titleInfoArrow">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} ref={descriptionRef}>{description}</p>
      <Image
        ref={arrowRef}
        src="/scroll-down.png"
        alt="Scroll down"
        width={60}
        height={30}
        className={styles.scrollArrow}
        onClick={handleScroll}
      />
    </section>
  );
}