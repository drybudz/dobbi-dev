// components/sections/AboutGallery.jsx
'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // For pagination dots

// Import required modules
import { Pagination } from 'swiper/modules';

import styles from './styles/AboutGallery.module.css';

export default function AboutGallery({
  largeImage,
  mediumImage,
  smallImages = []
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 575); // Still checking for 575px breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Consolidate all available images for the Swiper
  const allGalleryImages = [
    largeImage,
    mediumImage,
    ...smallImages
  ].filter(img => img?.asset?.url); // Filter out any undefined or null images

  // ADDED VALIDATION: Do not render the section if there are no images
  if (allGalleryImages.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <section className={styles.galleryMobile}>
        <Swiper
          modules={[Pagination]} // Enable Pagination module for dots
          spaceBetween={0} // No space between slides
          slidesPerView={1} // Show one slide at a time
          pagination={{ 
            clickable: true, // Dots are clickable for navigation
            // Custom render function for pagination dots (matching your desired styles)
            renderBullet: function (index, className) {
              // className is provided by Swiper (e.g., 'swiper-pagination-bullet', 'swiper-pagination-bullet-active')
              // We'll use our custom classes from AboutGallery.module.css for styling
              return `<li class="${className} ${index === this.realIndex ? styles.dotSelected : styles.dot}" role="button" aria-label="Go to slide ${index + 1}"></li>`;
            },
          }}
          loop={true} // Infinite loop
          className={styles.mySwiper} // Apply a class for custom Swiper styling
        >
          {allGalleryImages.map((img, index) => (
            <SwiperSlide key={img.asset.url + index}>
              <div className={styles.swiperImageWrapper}>
                <Image
                  src={img.asset.url}
                  alt={img.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 575px) 100vw" // Take full width on mobile
                  className={styles.imageMobile}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  // Desktop layout (your existing code, unchanged)
  return (
    <section className={styles.gallery}>
      {/* 1. Large Image */}
      <div className={styles.large}>
        {largeImage?.asset?.url && (
          <Image
            src={largeImage.asset.url}
            alt={largeImage.alt || "Large about image"}
            fill
            className={styles.image}
            sizes="521px"
          />
        )}
      </div>

      {/* 2. Small Image 1 */}
      <div className={styles.small1}>
        {smallImages[0]?.asset?.url && (
          <Image
            src={smallImages[0].asset.url}
            alt={smallImages[0]?.alt || "Small image 1"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 3. Small Image 2 */}
      <div className={styles.small2}>
        {smallImages[1]?.asset?.url && (
          <Image
            src={smallImages[1].asset.url}
            alt={smallImages[1]?.alt || "Small image 2"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 6. Medium Image */}
      <div className={styles.medium}>
        {mediumImage?.asset?.url && (
          <Image
            src={mediumImage.asset.url}
            alt={mediumImage.alt || "Medium about image"}
            fill
            className={styles.image}
            sizes="308px"
          />
        )}
      </div>

      {/* 4. Small Image 3 */}
      <div className={styles.small3}>
        {smallImages[2]?.asset?.url && (
          <Image
            src={smallImages[2].asset.url}
            alt={smallImages[2]?.alt || "Small image 3"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 5. Small Image 4 */}
      <div className={styles.small4}>
        {smallImages[3]?.asset?.url && (
          <Image
            src={smallImages[3].asset.url}
            alt={smallImages[3]?.alt || "Small image 4"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>
    </section>
  );
}