'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './styles/HomeSolutionGrid.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeSolutionGrid({
  title,
  solutions = []
}) {
  const gridRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const setGridRef = useCallback((el, index) => {
    gridRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 574);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    solutions.slice(0, 5).forEach((solution, index) => {
      const item = gridRefs.current[index];
      if (!item) return;

      const textA = item.querySelector(`.${styles.solutionTextA}`);
      const textB = item.querySelector(`.${styles.solutionTextB}`);

      // Set initial states
      gsap.set(textA, { color: '#8D8D8D', fontWeight: 500 });
      if (textB) gsap.set(textB, { color: '#8D8D8D', fontWeight: 500 });

      if (isMobile) {
        // Mobile scroll behavior (only for solutionTextA)
        ScrollTrigger.create({
          trigger: item,
          start: 'bottom bottom-=100px',
          end: 'top top+=100px',
          onEnter: () => gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 }),
          onLeave: () => gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 }),
          onEnterBack: () => gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 }),
          onLeaveBack: () => gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 })
        });
      } else {
        // Desktop hover behavior (only for solutionTextA)
        item.addEventListener('mouseenter', () => {
          gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.3 });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Clean up event listeners
      gridRefs.current.forEach(item => {
        if (item) {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, [solutions, isMobile]);

  return (
    <section className={styles.solutions}>
      <div className={styles.grid}>
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {solutions.slice(0, 5).map((solution, index) => (
          <div
            key={index}
            className={styles.solutionItem}
            ref={el => setGridRef(el, index)}
            style={{
              gridColumn: index < 3 ? index + 2 : index - 1,
              gridRow: index < 3 ? 1 : 2
            }}
          >
            <h3 className={styles.solutionTitle}>{solution.solutionTitle}</h3>
            <p className={styles.solutionTextA}>{solution.solutionTextA}</p>
            {solution.solutionTextB && (
              <p className={styles.solutionTextB}>{solution.solutionTextB}</p>
            )}
          </div>
        ))}

        <div className={styles.emptyColumn}></div>
      </div>
    </section>
  );
}