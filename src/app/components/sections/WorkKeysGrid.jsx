// components/sections/WorkKeysGrid.js
'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './styles/WorkKeysGrid.module.css';

export default function WorkKeysGrid({ 
  title, 
  subtitle, 
  items = [] 
}) {
  const keyItemsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const keyTitle = entry.target.querySelector(`.${styles.keyTitle}`);
          const keyDesc = entry.target.querySelector(`.${styles.keyDescription}`);
          
          if (entry.isIntersecting) {
            // Item is in view
            keyTitle.style.borderTopColor = '#fff';
            keyTitle.style.borderWidth = '2px';
            keyDesc.style.color = '#fff';
            keyDesc.style.fontWeight = '700';
            // Animate in with 0.3s duration
            keyTitle.style.transition = 'border-top-color 0.3s ease, border-width 0.3s ease';
            keyDesc.style.transition = 'color 0.3s ease, font-weight 0.3s ease';
          } else {
            // Item is out of view
            keyTitle.style.borderTopColor = '#8D8D8D';
            keyTitle.style.borderWidth = '1px';
            keyDesc.style.color = '#8D8D8D';
            keyDesc.style.fontWeight = '500';
            // Animate out with 0.3s duration
            keyTitle.style.transition = 'border-top-color 0.3s ease, border-width 0.3s ease';
            keyDesc.style.transition = 'color 0.3s ease, font-weight 0.3s ease';
          }
        });
      },
      {
        threshold: 1, // Trigger when 50% of item is visible
        rootMargin: '0px 0px -280px 0px' // Adjust this to change when the effect triggers
      }
    );

    keyItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      keyItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [isMobile, items]);

  return (
    <section className={styles.workKeys}>
      <div className={styles.grid}>
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {items.slice(0, 5).map((item, index) => (
          <div 
            key={index} 
            className={styles.keyItem}
            ref={(el) => (keyItemsRef.current[index] = el)}
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