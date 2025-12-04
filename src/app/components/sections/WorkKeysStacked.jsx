'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './styles/WorkKeysStacked.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorkKeysStacked({ 
  title, 
  items = [] 
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const titleColumnRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect for title column (moves down on scroll) - Desktop only
  useEffect(() => {
    if (isMobile) return; // Skip parallax on mobile
    
    if (titleColumnRef.current && sectionRef.current) {
      const parallaxAnim = gsap.to(titleColumnRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 15%',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          id: 'workKeysStacked-title-parallax'
        }
      });

      return () => {
        if (parallaxAnim && parallaxAnim.scrollTrigger) {
          parallaxAnim.scrollTrigger.kill();
        }
      };
    }
  }, [isMobile]);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setExpandedIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setExpandedIndex(null);
    }
  };

  const handleClick = (index) => {
    if (isMobile) {
      // If clicking the same item, close it. Otherwise, open the clicked item
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section className={styles.workKeysStacked} ref={sectionRef}>
      <div className={styles.gridContainer}>
        <div className={styles.titleColumn} ref={titleColumnRef}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.itemsColumn}>
          {items.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isLast = index === items.length - 1;

            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`${styles.keyItem} ${isExpanded ? styles.expanded : ''} ${isLast ? styles.lastItem : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
              >
                <h3 className={styles.keyTitle}>{item.keyTitle}</h3>
                {isExpanded && (
                  <p className={styles.keyDescription}>{item.keyDescription}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

