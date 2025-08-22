'use client';

// components/sections/HomeBand50Contact.js
import styles from './styles/HomeBand50Contact.module.css';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeBand50Contact({ title, name, email }) {
  const rightColumnRef = useRef(null);

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
    } else {
      console.warn('rightColumnRef is null');
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
        <div className={styles.contactInfo}>
          <h4 className={styles.name}>{name}</h4>
          <p className={styles.email}>
            <a href={`mailto:${email}`} className={styles.emailLink}>
              {email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}