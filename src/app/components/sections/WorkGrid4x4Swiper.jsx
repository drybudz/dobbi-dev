'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles with custom overrides
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './styles/WorkGrid4x4Swiper.module.css';

export default function WorkGrid4x4Swiper({ featuredProjects }) {
  const [isMobile, setIsMobile] = useState(false);
  const [displayProjects, setDisplayProjects] = useState([]);
  const swiperRefs = useRef({});

  useEffect(() => {
    if (featuredProjects?.length) {
      const shuffled = [...featuredProjects].sort(() => 0.5 - Math.random());
      setDisplayProjects(shuffled.slice(0, 16));
    }
  }, [featuredProjects]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 575);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSwiperInit = (swiper, index) => {
    swiperRefs.current[index] = swiper;

    // Remove default controls
    const prev = swiper.el.querySelector('.swiper-button-prev');
    const next = swiper.el.querySelector('.swiper-button-next');
    const pagination = swiper.el.querySelector('.swiper-pagination');

    if (prev) prev.remove();
    if (next) next.remove();

    // Keep pagination (style it via CSS)
    pagination.classList.add(styles.customPagination);

    // Inject custom arrows
    const customPrev = document.createElement('div');
    const customNext = document.createElement('div');
    customPrev.className = `${styles.customArrow} ${styles.customPrev}`;
    customNext.className = `${styles.customArrow} ${styles.customNext}`;
    swiper.el.appendChild(customPrev);
    swiper.el.appendChild(customNext);

    // Initially hide left arrow
    customPrev.style.display = 'none';

    // Add click handlers
    customPrev.addEventListener('click', () => swiper.slidePrev());
    customNext.addEventListener('click', () => swiper.slideNext());

    // Handle logic for showing/hiding arrows
    swiper.on('slideChange', () => {
      const isFirst = swiper.realIndex === 0;
      customPrev.style.display = isFirst ? 'none' : 'block';
    });
  };

  return (
    <section className={styles.gridContainer}>
      {displayProjects.map((project, index) => (
        <div key={project._id} className={styles.gridCell}>
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            navigation
            loop={true}
            className={styles.swiperContainer}
            onSwiper={swiper => handleSwiperInit(swiper, index)}
          >
            {[...(project.largeProjectImages || []), ...(project.mediumProjectImages || []), ...(project.smallProjectImages || [])]
              .filter(img => img?.asset?.url)
              .map((img, i) => (
                <SwiperSlide key={img.asset.url + i}>
                  <div className={styles.imageWrapper}>
                    <a href={`/work/${project.slug.current}`}>
                      <Image
                        src={img.asset.url}
                        alt={img.alt || `Image ${i + 1}`}
                        fill
                        sizes="(max-width: 575px) 100vw, 25vw"
                        className={styles.image}
                      />
                    </a>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
}