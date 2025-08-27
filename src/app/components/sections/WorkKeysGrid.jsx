// components/sections/WorkKeysGrid.js
'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './styles/WorkKeysGrid.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkKeysGrid({ 
  title, 
  subtitle, 
  items = [] 
}) {
  const keyItemsRef = useRef([]);
  const workKeysRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationsRef = useRef([]); // Store all animation references

  const setKeyItemRef = useCallback((el, index) => {
    keyItemsRef.current[index] = el;
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

    // Parallax effect for the entire workKeys section
    if (workKeysRef.current) {
      const parallaxAnim = gsap.fromTo(
        workKeysRef.current,
        { y: 30 },
        {
          y: -70,
          scrollTrigger: {
            trigger: workKeysRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
            id: 'workKeys-parallax'
          }
        }
      );
      animationsRef.current.push(parallaxAnim);
    }

    // Staggered animation for keyItems
    const keyItems = keyItemsRef.current.filter(item => item);
    if (keyItems.length) {
      const staggerAnim = ScrollTrigger.create({
        trigger: workKeysRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
        id: 'workKeys-stagger',
        onUpdate: (self) => {
          const progress = self.progress;
          keyItems.forEach((item, index) => {
            const delay = index * 0.2;
            const keyTitle = item.querySelector(`.${styles.keyTitle}`);
            const keyDesc = item.querySelector(`.${styles.keyDescription}`);

            if (keyTitle && keyDesc) {
              if (progress > delay) {
                gsap.to(keyTitle, {
                  borderTopColor: '#FFFFFF',
                  borderWidth: '2px',
                  duration: 0.5,
                  overwrite: true
                });
                gsap.to(keyDesc, {
                  color: '#FFFFFF',
                  fontWeight: 700,
                  duration: 0.5,
                  overwrite: true
                });
              } else {
                gsap.to(keyTitle, {
                  borderTopColor: '#8D8D8D',
                  borderWidth: '1px',
                  duration: 0.5,
                  overwrite: true
                });
                gsap.to(keyDesc, {
                  color: '#8D8D8D',
                  fontWeight: 500,
                  duration: 0.5,
                  overwrite: true
                });
              }
            }
          });
        }
      });
      animationsRef.current.push(staggerAnim);
    }

    // Mobile scroll and desktop hover behavior
    items.slice(0, 5).forEach((item, index) => {
      const keyItem = keyItemsRef.current[index];
      if (!keyItem) return;

      const keyTitle = keyItem.querySelector(`.${styles.keyTitle}`);
      const keyDesc = keyItem.querySelector(`.${styles.keyDescription}`);

      if (!keyTitle || !keyDesc) return;

      gsap.set(keyTitle, { borderTopColor: '#8D8D8D', borderWidth: '1px' });
      gsap.set(keyDesc, { color: '#8D8D8D', fontWeight: 500 });

      if (isMobile) {
        const mobileAnim = ScrollTrigger.create({
          trigger: keyItem,
          start: 'bottom bottom-=100px',
          end: 'top top+=50px',
          id: `workKeys-mobile-${index}`,
          onEnter: () => {
            gsap.to(keyTitle, { borderTopColor: '#FFFFFF', borderWidth: '2px', duration: 0.5 });
            gsap.to(keyDesc, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeave: () => {
            gsap.to(keyTitle, { borderTopColor: '#8D8D8D', borderWidth: '1px', duration: 0.5 });
            gsap.to(keyDesc, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(keyTitle, { borderTopColor: '#FFFFFF', borderWidth: '2px', duration: 0.5 });
            gsap.to(keyDesc, { color: '#FFFFFF', fontWeight: 700, duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(keyTitle, { borderTopColor: '#8D8D8D', borderWidth: '1px', duration: 0.5 });
            gsap.to(keyDesc, { color: '#8D8D8D', fontWeight: 500, duration: 0.5 });
          }
        });
        animationsRef.current.push(mobileAnim);
      } else {
        const handleMouseEnter = () => {
          gsap.to(keyTitle, { borderTopColor: '#FFFFFF', borderWidth: '2px', duration: 0.3 });
          gsap.to(keyDesc, { color: '#FFFFFF', fontWeight: 700, duration: 0.3 });
        };
        const handleMouseLeave = () => {
          gsap.to(keyTitle, { borderTopColor: '#8D8D8D', borderWidth: '1px', duration: 0.3 });
          gsap.to(keyDesc, { color: '#8D8D8D', fontWeight: 500, duration: 0.3 });
        };
        
        keyItem.addEventListener('mouseenter', handleMouseEnter);
        keyItem.addEventListener('mouseleave', handleMouseLeave);
        
        // Store cleanup functions
        animationsRef.current.push({
          kill: () => {
            keyItem.removeEventListener('mouseenter', handleMouseEnter);
            keyItem.removeEventListener('mouseleave', handleMouseLeave);
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
  }, [items, isMobile]);

  return (
    <section className={styles.workKeys} ref={workKeysRef}>
      <div className={styles.grid}>
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {items.slice(0, 5).map((item, index) => (
          <div 
            key={index} 
            className={styles.keyItem}
            ref={(el) => setKeyItemRef(el, index)}
            style={{
              gridColumn: index < 3 ? index + 2 : index - 1,
              gridRow: index < 3 ? 1 : 2
            }}
          >
            <h3 className={styles.keyTitle}>{item.keyTitle}</h3>
            <p className={styles.keyDescription}>{item.keyDescription}</p>
          </div>
        ))}

        <div className={styles.subtitleColumn}>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}