'use client';
// components/sections/HomeServices8020Grid.js
import { useState, useRef, useEffect } from 'react';
import styles from './styles/HomeServices8020Grid.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HomeServices8020Grid({
  servicesTitle,
  servicesDescription,
  servicesList
}) {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(null);
  const rightColumnRef = useRef(null);
  const sectionRef = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredServiceIndex(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredServiceIndex(null);
  };

  // Parallax effect for right column
  useEffect(() => {
    if (rightColumnRef.current && sectionRef.current) {
      gsap.fromTo(
        rightColumnRef.current,
        { y: 0 },
        {
          y: 100, // Move right column down on scroll
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="services" className={styles.sectionWrapper} ref={sectionRef}>
      <div className={styles.gridContainer}>
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>{servicesTitle}</h2>
          <p className={styles.description}>{servicesDescription}</p>
        </div>
        <div className={styles.rightColumn} ref={rightColumnRef}>
          {/* Services List v2 */}
          <div className={styles.servicesList}>
            {servicesList?.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceItem} ${hoveredServiceIndex === index ? styles.active : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <h3 className={styles.serviceTitle}>
                  {service.serviceTitle}
                </h3>
                {/* Description and Options only show when hovered */}
                {hoveredServiceIndex === index && (
                  <>
                    <p className={styles.serviceDescription}>{service.serviceDescription}</p>

                    {/* Render Service Options */}
                    {service.serviceOptions && service.serviceOptions.length > 0 && (
                      <ul className={styles.serviceOptionsList}>
                        {service.serviceOptions.map((option, optionIndex) => (
                          <li key={optionIndex} className={styles.serviceOptionItem}>
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}