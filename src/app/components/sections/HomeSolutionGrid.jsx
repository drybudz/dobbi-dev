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
  const solutionsRef = useRef(null); // Ref for the entire solutions section
  const [isMobile, setIsMobile] = useState(false);

  const setGridRef = useCallback((el, index) => {
    gridRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 574);
      console.log('Resize detected, isMobile:', window.innerWidth <= 574); // Debug resize
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    console.log('All ScrollTriggers killed'); // Debug cleanup

    // Parallax effect for the entire solutions section
    if (solutionsRef.current) {
      console.log('Setting up parallax for solutionsRef:', solutionsRef.current);
      gsap.fromTo(
        solutionsRef.current,
        { y: -100 },
        {
          y: 0, // Parallax movement range
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: 'top 80%', // Start when top is 80% in view
            end: 'bottom top', // End when bottom hits top of viewport
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => console.log('Parallax enter:', solutionsRef.current.style.transform),
            onUpdate: (self) => console.log('Parallax progress:', self.progress.toFixed(2), solutionsRef.current.style.transform),
            onLeave: () => console.log('Parallax leave:', solutionsRef.current.style.transform),
          }
        }
      );
    } else {
      console.error('solutionsRef is null');
    }

    // Staggered animation for solutionItems
    const items = gridRefs.current.filter(item => item);
    if (items.length) {
      console.log('Setting up staggered animation for', items.length, 'items');
      ScrollTrigger.create({
        trigger: solutionsRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log('Staggered animation progress:', progress.toFixed(2)); // Debug progress
          items.forEach((item, index) => {
            const delay = index * 0.2; // Stagger delay (0.2s per item)
            const textA = item.querySelector(`.${styles.solutionTextA}`);
            const textB = item.querySelector(`.${styles.solutionTextB}`);

            if (textA) {
              console.log(`Item ${index}, delay: ${delay}, progress: ${progress.toFixed(2)}`);
              if (progress > delay) {
                gsap.to(textA, {
                  color: '#FFFFFF',
                  fontWeight: 700,
                  duration: 0.5,
                  overwrite: true
                });
                if (textB) {
                  gsap.to(textB, {
                    color: '#FFFFFF',
                    fontWeight: 700,
                    duration: 0.5,
                    overwrite: true
                  });
                }
              } else {
                gsap.to(textA, {
                  color: '#8D8D8D',
                  fontWeight: 500,
                  duration: 0.5,
                  overwrite: true
                });
                if (textB) {
                  gsap.to(textB, {
                    color: '#8D8D8D',
                    fontWeight: 500,
                    duration: 0.5,
                    overwrite: true
                  });
                }
              }
            }
          });
        }
      });
    } else {
      console.warn('No valid items found in gridRefs');
    }

    // Mobile scroll and desktop hover behavior
    solutions.slice(0, 5).forEach((solution, index) => {
      const item = gridRefs.current[index];
      if (!item) {
        console.warn(`Item ${index} not found in gridRefs`);
        return;
      }

      const textA = item.querySelector(`.${styles.solutionTextA}`);
      const textB = item.querySelector(`.${styles.solutionTextB}`);

      if (!textA) {
        console.error(`textA not found for item ${index}`);
        return;
      }

      gsap.set(textA, { color: '#8D8D8D', fontWeight: 500 });
      if (textB) gsap.set(textB, { color: '#8D8D8D', fontWeight: 500 });

      if (isMobile) {
        console.log(`Setting up mobile ScrollTrigger for item ${index}, start: bottom bottom-=100px, end: top top+=50px`);
        ScrollTrigger.create({
          trigger: item,
          start: 'bottom bottom-=100px',
          end: 'top top+=50px', // Moved up from +=100px to +=50px
          onEnter: () => {
            console.log(`Mobile enter for item ${index}`);
            gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeave: () => {
            console.log(`Mobile leave for item ${index}`);
            gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          },
          onEnterBack: () => {
            console.log(`Mobile enterBack for item ${index}`);
            gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeaveBack: () => {
            console.log(`Mobile leaveBack for item ${index}`);
            gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          }
        });
      } else {
        console.log(`Setting up desktop hover for item ${index}`);
        item.addEventListener('mouseenter', () => {
          console.log(`Desktop mouseenter for item ${index}`);
          gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
          console.log(`Desktop mouseleave for item ${index}`);
          gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.3 });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      console.log('Cleanup: All ScrollTriggers killed');
      gridRefs.current.forEach(item => {
        if (item) {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, [solutions, isMobile]);

  return (
    <section className={styles.solutions} ref={solutionsRef}>
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