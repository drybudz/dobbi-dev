// components/sections/WorkPageCTA.js
import styles from './styles/WorkPageCTA.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function WorkPageCTA({ title, description, text, name, email }) {
  const descriptionRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const sectionRef = useRef(null);
  const parallaxRefs = useRef([]); // Store multiple animation references

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

      // Parallax for text (100px more down than base)
      if (textRef.current) {
        const textAnim = gsap.to(textRef.current, {
          y: 170,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-text-parallax'
          }
        });
        parallaxRefs.current.push(textAnim);
      }

      // Parallax for name (100px more down, no font size change)
      if (nameRef.current) {
        const nameAnim = gsap.to(nameRef.current, {
          y: 170,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: 0.3, // Keep smoother scrub
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-name-parallax'
          }
        });
        parallaxRefs.current.push(nameAnim);
      }

      // Parallax for email (100px more down)
      if (emailRef.current) {
        const emailAnim = gsap.to(emailRef.current, {
          y: 170,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'WorkPageCTA-email-parallax'
          }
        });
        parallaxRefs.current.push(emailAnim);
      }
    }

    return cleanupAnimations;
  }, [title, description, text, name, email]);

  return (
    <section className={styles.WorkPageCTA} ref={sectionRef} id="WorkPageCTA">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description} ref={descriptionRef}>{description}</p>
      <p className={styles.text} ref={textRef}>{text}</p>
      <p className={styles.name} ref={nameRef}>{name}</p>
      <a href={`mailto:${email}`} className={styles.email} ref={emailRef}>{email}</a>
    </section>
  );
}