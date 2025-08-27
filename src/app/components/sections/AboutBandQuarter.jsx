// components/sections/AboutBandQuarter.js
'use client';
import { useRef, useEffect } from 'react';
import styles from './styles/AboutBandQuarter.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutBandQuarter({ title, text }) {
  const copyTextRef = useRef(null);
  const bandContainerRef = useRef(null);
  const parallaxRef = useRef(null); // Store the animation reference

  // Parallax effect for copyText
  useEffect(() => {
    if (copyTextRef.current && bandContainerRef.current) {
      parallaxRef.current = gsap.fromTo(
        copyTextRef.current,
        { y: -10 },
        {
          y: 50,
          scrollTrigger: {
            trigger: bandContainerRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'aboutBandQuarter-parallax' // Add unique ID
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
    <section className={styles.bandContainer} ref={bandContainerRef}>
      <div className={styles.copyText} ref={copyTextRef}>
        <div className={styles.leftColumn}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.rightColumn}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </section>
  );
}