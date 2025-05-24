'use client'
// components/sections/AboutHorizontalStack.js
import styles from './styles/AboutHorizontalStack.module.css';
import Image from 'next/image';

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
  return (
    <section className={styles.horizontalStack}>
      {/* Row 1 */}
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          {/* <img src="https://placehold.co/1010x339" alt="First image" /> */}
          <Image
              src={image1Url}
              alt={image1Alt || "About section image"}
              width={1010}
              height={339}
              className={styles.image}
            />
        </div>
        <div className={styles.textContainer}>
          <p>{text1}</p>
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          {/* <img src="https://placehold.co/1010x339" alt="Second image" /> */}
          <Image
                src={image2Url}
                alt={image2Alt || "About section image"}
                width={1010}
                height={339}
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