// components/sections/HomeBandOneThird.js
import styles from './styles/HomeBandOneThird.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeBandOneThird({ title, description }) {
  const bandRef = useRef(null);
  const copyTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.add(() => {
      gsap.fromTo(
        copyTextRef.current,
        { y: 0 },
        {
          y: -100, // Parallax movement range
          scrollTrigger: {
            trigger: bandRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Removing Upard Slide & Stop
  
  return (
    <section className={styles.bandContainer} ref={bandRef}>
      <div className={styles.copyText} ref={copyTextRef}>
        <div className={styles.leftColumn}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.rightColumn}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}