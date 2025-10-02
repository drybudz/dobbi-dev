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
  const animationsRef = useRef([]); // Store animation references for cleanup

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
    // Clear previous animations
    animationsRef.current.forEach(anim => {
      if (anim && anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      } else if (anim && typeof anim.kill === 'function') {
        anim.kill();
      }
    });
    animationsRef.current = [];

    // Parallax effect for the entire solutions section
    if (solutionsRef.current) {
      const parallaxAnim = gsap.fromTo(
        solutionsRef.current,
        { y: -100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'solutions-parallax'
          }
        }
      );
      animationsRef.current.push(parallaxAnim);
    }

    // Staggered animation for solutionItems
    const items = gridRefs.current.filter(item => item);
    if (items.length) {
      const staggerAnim = ScrollTrigger.create({
        trigger: solutionsRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
        id: 'solutions-stagger',
        onUpdate: (self) => {
          const progress = self.progress;
          items.forEach((item, index) => {
            const delay = index * 0.2; // Stagger delay
            const textA = item.querySelector(`.${styles.solutionTextA}`);
            const textB = item.querySelector(`.${styles.solutionTextB}`);

            if (textA) {
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
      animationsRef.current.push(staggerAnim);
    }

    // Mobile scroll and desktop hover behavior
    solutions.slice(0, 5).forEach((solution, index) => {
      const item = gridRefs.current[index];
      if (!item) return;

      const textA = item.querySelector(`.${styles.solutionTextA}`);
      const textB = item.querySelector(`.${styles.solutionTextB}`);

      if (!textA) return;

      gsap.set(textA, { color: '#8D8D8D', fontWeight: 500 });
      if (textB) gsap.set(textB, { color: '#8D8D8D', fontWeight: 500 });

      if (isMobile) {
        const mobileAnim = ScrollTrigger.create({
          trigger: item,
          start: 'bottom bottom-=100px',
          end: 'top top+=50px',
          id: `solutions-mobile-${index}`,
          onEnter: () => {
            gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeave: () => {
            gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          }
        });
        animationsRef.current.push(mobileAnim);
      } else {
        const handleMouseEnter = () => {
          gsap.to(textA, { color: '#FFFFFF', fontWeight: 700, duration: 0.3 });
        };
        const handleMouseLeave = () => {
          gsap.to(textA, { color: '#8D8D8D', fontWeight: 500, duration: 0.3 });
        };
        
        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);
        
        // Store cleanup functions
        animationsRef.current.push({
          kill: () => {
            item.removeEventListener('mouseenter', handleMouseEnter);
            item.removeEventListener('mouseleave', handleMouseLeave);
          }
        });
      }
    });

    return () => {
      // Clean up only our own animations
      animationsRef.current.forEach(anim => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        } else if (anim && typeof anim.kill === 'function') {
          anim.kill();
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
              <p className={styles.solutionTextB}>
                <span className={styles.afterArrow}></span>
                <span className={styles.solutionTextBContent}>{solution.solutionTextB}</span>
              </p>
            )}
          </div>
        ))}

        <div className={styles.emptyColumn}></div>
      </div>
    </section>
  );
}