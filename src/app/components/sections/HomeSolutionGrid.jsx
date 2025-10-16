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
  const solutionsRef = useRef(null);
  const titleRef = useRef(null); // New ref for title parallax
  const [isMobile, setIsMobile] = useState(false);
  const animationsRef = useRef([]);

  const setGridRef = useCallback((el, index) => {
    gridRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 574);
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh(); // Refresh triggers on resize
      }
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

    // Parallax effect for the entire solutions section (existing)
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

    // NEW: Parallax for title - moves down as we scroll down
    if (titleRef.current) {
      const titleAnim = gsap.to(titleRef.current, {
        y: 250, // Adjust value for more/less movement (positive = down)
        scrollTrigger: {
          trigger: solutionsRef.current,
          start: 'top 20%',
          end: 'bottom -20%', // Extended end for more room/movement
          scrub: 0.5, // Slight ease for smoother feel
          id: 'title-parallax'
        }
      });
      animationsRef.current.push(titleAnim);
    }

    // Staggered animation for solutionItems (existing - unchanged)
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
            const delay = index * 0.2;
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

    // Mobile scroll and desktop hover behavior (existing - unchanged)
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
        
        animationsRef.current.push({
          kill: () => {
            item.removeEventListener('mouseenter', handleMouseEnter);
            item.removeEventListener('mouseleave', handleMouseLeave);
          }
        });
      }
    });

    return () => {
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
          <h2 ref={titleRef} className={styles.title}>{title}</h2> {/* Added ref */}
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

        {/* REMOVED: <div className={styles.emptyColumn}></div> */}
      </div>
    </section>
  );
}