'use client'

//Nice Version: 1.0.0

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './styles/SingleProductGalleryResponsive.module.css';

// Define your local placeholder image path
const LOCAL_PLACEHOLDER_IMAGE = "/images/dobbi-empty-pic.jpg"; 

export default function SingleProductGalleryResponsive({project}) {
    const [isMobile, setIsMobile] = useState(false);
    const imageParallaxRefs = useRef([]); // Refs for the parallaxWrapper divs
    
    const largeImage = project?.largeProjectImages?.[0]; // Corresponds to the large image in the bottom left
    const smallImages = project?.smallProjectImages || []; // smallImages[0] & smallImages[1] for top right small images
    let mediumImages = project?.mediumProjectImages || []; // mediumImages[0] (top left), mediumImages[1] (top right main), mediumImages[2] (middle right)
    const stats = project?.stats;

    // Handle medium images validation
    if (mediumImages.length === 0 || mediumImages.length < 3) {
        mediumImages = Array.from([0,1,2]).map((number, index) =>
            mediumImages?.[index]?.url ? mediumImages[index] : ({ url: LOCAL_PLACEHOLDER_IMAGE, alt: `Placeholder Medium Image ${index + 1}` })
        );
    }
    // Ensure smallImages[0] and smallImages[1] exist, add placeholders if needed.
    while (smallImages.length < 2) {
        smallImages.push({ url: LOCAL_PLACEHOLDER_IMAGE, alt: `Placeholder Small Image ${smallImages.length + 1}` });
    }

    // Prepare images for mobile second carousel
    const mobileSecondCarouselImages = [
        smallImages[0],
        smallImages[1],
        mediumImages[2]
    ].filter(img => img?.asset?.url || img?.url); // Filter out null/undefined, but allow placeholder .url

    // Add placeholders if we still don't have enough images for the second mobile carousel
    while (mobileSecondCarouselImages.length < 3) {
        mobileSecondCarouselImages.push({ url: LOCAL_PLACEHOLDER_IMAGE, alt: "Mobile Placeholder" });
    }


    // Check for mobile view
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 575);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Parallax effect setup
    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            imageParallaxRefs.current.forEach((parallaxDiv, index) => {
                if (parallaxDiv) {
                    const parentContainer = parallaxDiv.parentElement; 
                    if (!parentContainer) return;

                    const parentRect = parentContainer.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // Calculate the scroll progress of the *parent* container
                    const scrollProgress = (windowHeight - parentRect.top) / (windowHeight + parentRect.height);
                    
                    // The total vertical space the image can move within its taller wrapper (e.g., 20% of container height)
                    const parallaxRange = parentRect.height * 0.2; // 20% of the container's height

                    // Map scrollProgress (0 to 1) to a translateY value from -parallaxRange/2 to +parallaxRange/2
                    let translateY = (scrollProgress - 0.5) * parallaxRange;

                    // Ensure the translateY stays within the actual bounds of the taller image
                    translateY = Math.max(-parallaxRange / 2, Math.min(parallaxRange / 2, translateY));

                    parallaxDiv.style.transform = `translateY(${translateY}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    if (isMobile) {
        // Mobile view with Swiper galleries (remains largely the same)
        const firstCarouselImages = mediumImages.slice(0, 3);
        const finalSecondCarouselImages = mobileSecondCarouselImages.slice(0,3);

        return (
            <section className={styles.mobileContainer}>
                <div className={styles.mobileHeader}>
                    <h1>{project.name}</h1>
                    <p>
                        {project.clientName}
                        {project.projectYear ? `, ${project.projectYear}` : ""}
                    </p>
                </div>

                {/* First Swiper Gallery */}
                <div className={styles.mobileSwiperContainer}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ 
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<li class="${className} ${styles.mobileDot}" role="button" aria-label="Go to slide ${index + 1}"></li>`;
                            },
                        }}
                        loop={true}
                        className={styles.mobileSwiper}
                    >
                        {firstCarouselImages.map((img, index) => (
                            <SwiperSlide key={`first-slide-${index}`}> 
                                <div className={styles.mobileImageWrapper}>
                                    <Image
                                        src={img.asset?.url || img.url}
                                        alt={img.alt || `Gallery image ${index + 1}`}
                                        fill
                                        sizes="100vw"
                                        className={styles.mobileImage}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* About Sections */}
                <div className={styles.mobileAboutContainer}>
                    <div className={styles.mobileAboutSection}>
                        <h3>{project.aboutProject1}</h3>
                        <p dangerouslySetInnerHTML={{ __html: project.aboutProjectText1 }} />
                    </div>
                    <div className={styles.mobileAboutSection}>
                        <h3>{project.aboutProject2}</h3>
                        <p dangerouslySetInnerHTML={{ __html: project.aboutProjectText2 }} />
                    </div>
                </div>

                {/* Second Swiper Gallery */}
                <div className={styles.mobileSwiperContainer}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ 
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<li class="${className} ${styles.mobileDot}" role="button" aria-label="Go to slide ${index + 1}"></li>`;
                            },
                        }}
                        loop={true}
                        className={styles.mobileSwiper}
                    >
                        {finalSecondCarouselImages.map((img, index) => (
                            <SwiperSlide key={`second-slide-${index}`}> {/* KEY IS ALREADY FIXED HERE */}
                                <div className={styles.mobileImageWrapper}>
                                    <Image
                                        src={img.asset?.url || img.url}
                                        alt={img.alt || `Gallery image ${index + 1}`}
                                        fill
                                        sizes="100vw"
                                        className={styles.mobileImage}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Stats Section */}
                {stats?.length > 0 && (
                    <div className={styles.mobileStatsSection}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.mobileStatContainer}>
                                <h3>{stat.statTitle}</h3>
                                <p>{stat.statDescription}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* FPO */}
                <div className={styles.mobileFPO}>
                    <p>{project.projectFPO}</p>
                </div>
            </section>
        );
    }

    // Desktop view with parallax
    return (
        <section className={styles.Container}>
            <div className={styles.HeaderSection}>
                <h1>{project.name}</h1>
                <p>
                    {project.clientName}
                    {project.projectYear ? `, ${project.projectYear}` : ""}
                </p>
            </div>

            <div className={styles.DesktopGrid}> {/* Changed to DesktopGrid */}
                {/* Left Column Content */}
                <div className={styles.DesktopGridLeftCol}>
                    {/* Top Left Image (mediumImages[0]) */}
                    <div className={`${styles.ImageBlock} ${styles.topLeftImage}`}>
                        <div
                            ref={el => imageParallaxRefs.current[0] = el}
                            className={styles.parallaxWrapper}
                        >
                            {/* Use Next.js Image component for consistency if possible, or fallback to <img> */}
                            <img src={mediumImages[0]?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} alt="Top Left Main" />
                        </div>
                    </div>

                    {/* About Sections - Challenge & Result */}
                    <div className={styles.AboutSectionChallenge}>
                        <h3>{project.aboutProject1}</h3>
                        <p dangerouslySetInnerHTML={{ __html: project.aboutProjectText1 }} />
                    </div>
                    <div className={styles.AboutSectionResult}>
                        <h3>{project.aboutProject2}</h3>
                        <p dangerouslySetInnerHTML={{ __html: project.aboutProjectText2 }} />
                    </div>

                    {/* Bottom Left Large Image (largeImage) */}
                    <div className={`${styles.ImageBlock} ${styles.bottomLeftImage}`}>
                        <div
                            ref={el => imageParallaxRefs.current[1] = el}
                            className={styles.parallaxWrapper}
                        >
                            <Image
                                src={largeImage?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} // Use local placeholder here too
                                alt={largeImage?.alt || "Bottom Left Project Image"}
                                fill
                                sizes="(max-width: 1440px) 50vw, 720px" /* Optimized sizes for this column */
                                className={styles.projectImage}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column Content */}
                <div className={styles.DesktopGridRightCol}>
                    {/* Top Right Images Grid */}
                    <div className={styles.TopRightImagesGrid}>
                        {/* Top Right Main Image (mediumImages[1]) */}
                        <div className={`${styles.ImageBlock} ${styles.topRightMainImage}`}>
                            <div
                                ref={el => imageParallaxRefs.current[2] = el}
                                className={styles.parallaxWrapper}
                            >
                                <img src={mediumImages[1]?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} alt="Top Right Main" />
                            </div>
                        </div>
                        {/* Top Right Small Images (smallImages[0] & smallImages[1]) */}
                        <div className={styles.TopRightSmallImagesStack}>
                            <div className={`${styles.ImageBlock} ${styles.topRightSmallImage1}`}>
                                <div
                                    ref={el => imageParallaxRefs.current[3] = el}
                                    className={styles.parallaxWrapper}
                                >
                                    <img src={smallImages[0]?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} alt="Top Right Small 1" />
                                </div>
                            </div>
                            <div className={`${styles.ImageBlock} ${styles.topRightSmallImage2}`}>
                                <div
                                    ref={el => imageParallaxRefs.current[4] = el}
                                    className={styles.parallaxWrapper}
                                >
                                    <img src={smallImages[1]?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} alt="Top Right Small 2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Right Image (mediumImages[2]) */}
                    <div className={`${styles.ImageBlock} ${styles.middleRightImage}`}>
                        <div
                            ref={el => imageParallaxRefs.current[5] = el}
                            className={styles.parallaxWrapper}
                        >
                            <img src={mediumImages[2]?.asset?.url || LOCAL_PLACEHOLDER_IMAGE} alt="Middle Right" />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className={styles.StatsSection}>
                        {project.stats?.map((stat, index) => {
                            return (
                                <div key={index} className={styles.StatContainer}>
                                    <h3>{stat.statTitle}</h3>
                                    <p>{stat.statDescription}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.FPO}>
                <p>{project.projectFPO}</p>
            </div>
        </section>
    );
}