'use client'
// components/sections/AboutHorizontalStack.js
import styles from './styles/AboutHorizontalStack.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutHorizontalStack({
  image1Url,
  image1Alt,
  image2Url,
  image2Alt,
  text1,
  text2
}) {

  // console.log("@AB AHS Comp------About Page Data:", text1); //good
  // console.log("@AB AHS Imag------AHS Comp:", image1Url); //good

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <section className={styles.horizontalStack}>
      {/* Row 1 */}
      <div
        className={`${styles.row} ${hoveredRow === 0 ? styles.rowActive : ''}`}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.imageContainer}>
          {/* <img src="https://placehold.co/1010x339" alt="First image" /> */}
          <Image
            src={image1Url}
            alt={image1Alt || "About section image"}
            fill // Use fill to make image position absolute within parent
            sizes="(max-width: 768px) 100vw, 75vw" // Provide sizes for responsive images
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <p>{text1}</p>
        </div>
      </div>

      {/* Row 2 */}
      <div
        className={`${styles.row} ${hoveredRow === 1 ? styles.rowActive : ''}`}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.imageContainer}>
          {/* <img src="https://placehold.co/1010x339" alt="Second image" /> */}
          <Image
            src={image2Url}
            alt={image2Alt || "About section image"}
            fill // Use fill to make image position absolute within parent
            sizes="(max-width: 768px) 100vw, 75vw" // Provide sizes for responsive images
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <p>{text2}</p>
        </div>
      </div>
    </section>
  );
}