'use client';
// components/sections/Services8020Grid.js
import { useState } from 'react';
import styles from './styles/Services8020Grid.module.css';

export default function Services8020Grid({
  servicesTitle,
  servicesDescription,
  servicesList
}) {

  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredServiceIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredServiceIndex(null); // Reset to null when no service is hovered
  };

  return (
    <section className={styles.gridContainer}>
      <div className={styles.leftColumn}>
        <h2 className={styles.title}>{servicesTitle}</h2>
        <p className={styles.description}>{servicesDescription}</p>
      </div>
      <div className={styles.rightColumn}>

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
    </section>
  );
}