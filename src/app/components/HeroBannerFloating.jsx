'use client';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './styles/HeroBannerFloating.module.css';

// Component to handle individual floating images
const FloatingImage = ({ src, alt, index, imageWidth, imageHeight }) => {
    const imgRef = useRef(null);
    // State to hold random values that will cause hydration mismatch if not handled client-side
    const [animationProps, setAnimationProps] = useState({
        delay: 0,
        duration: 0,
        yoyoAmount: 0,
        zIndex: 0,
        opacity: 1,
    });

    useEffect(() => {
        // This effect runs only on the client after initial mount/hydration
        setAnimationProps({
            delay: Math.random() * 2, // 0-2 seconds delay
            duration: 2 + Math.random() * 2, // 2-4 seconds animation duration
            yoyoAmount: 10 + Math.random() * 10, // 10-20px vertical movement
            zIndex: Math.floor(Math.random() * 2) === 0 ? 0 : 2, // 0 or 2
            opacity: Math.random() > 0.5 ? 1 : 0.5, // 50% chance for full or half opacity
        });
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        const { delay, duration, yoyoAmount } = animationProps;

        if (imgRef.current && duration > 0) { // Ensure duration is set (meaning animationProps are ready)
            gsap.to(imgRef.current, {
                y: -yoyoAmount, // Move up
                duration: duration,
                ease: "sine.inOut",
                repeat: -1, // Infinite repeat
                yoyo: true, // Go back down
                delay: delay, // Staggered start
                overwrite: "auto", // Handle potential overlapping animations
            });
        }
    }, [animationProps]); // Re-run animation if animationProps change

    return (
        <div
            className={styles.floatingImageWrapper}
            style={{ zIndex: animationProps.zIndex }}
        >
            <Image
                ref={imgRef}
                src={src}
                alt={alt || `Floating image ${index}`}
                width={imageWidth} // Set fixed width
                height={imageHeight} // Set fixed height
                quality={75}
                className={styles.floatingImage}
                style={{
                    objectFit: 'cover', // Changed to cover as per specific size. Adjust if 'contain' is better for your assets
                    opacity: animationProps.opacity, // Apply opacity randomly
                }}
            />
        </div>
    );
};

// Main HeroBannerFloating Component
const HeroBannerFloating = ({ title, projects }) => {
    const heroRef = useRef(null);
    const [offsetHeight, setOffsetHeight] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);

    // Desired grid dimensions
    const desktopCols = 7;
    const desktopRows = 6;
    const mobileCols = 5;
    const mobileRows = 5; // Assuming 5x5 for mobile for symmetry if not specified

    // Image dimensions and gaps
    const imageW = 52;
    const imageH = 92;

    // Calculate total number of images needed for the grid
    const totalImagesNeeded = desktopCols * desktopRows;

    // State to hold the shuffled image URLs, initialized empty for SSR
    const [finalImageUrls, setFinalImageUrls] = useState([]);

    useEffect(() => {
        // This runs only on the client after initial hydration
        const rawImageUrls = projects.bannerProjects.flatMap(project => {
            const mediumUrls = project.mediumProjectImages?.map(img => img.asset?.url).filter(Boolean) || [];
            const smallUrls = project.smallProjectImages?.map(img => img.asset?.url).filter(Boolean) || [];
            return [...new Set([...mediumUrls, ...smallUrls])];
        });

        let shuffledImageUrls = [...rawImageUrls].sort(() => Math.random() - 0.5); // Shuffle here
        
        // Repeat images if not enough
        let tempFinalImageUrls = [];
        if (shuffledImageUrls.length > 0) {
            for (let i = 0; i < totalImagesNeeded; i++) {
                tempFinalImageUrls.push(shuffledImageUrls[i % shuffledImageUrls.length]);
            }
        } else {
            // Fallback if no images are provided
            for (let i = 0; i < totalImagesNeeded; i++) {
                tempFinalImageUrls.push("https://via.placeholder.com/52x92?text=No+Image");
            }
        }
        setFinalImageUrls(tempFinalImageUrls);
    }, [projects, totalImagesNeeded]); // Re-run if projects or totalImagesNeeded change (though totalImagesNeeded is static)


    useLayoutEffect(() => {
        if (heroRef.current) {
            setOffsetHeight(heroRef.current.offsetHeight);
            setOffsetWidth(heroRef.current.offsetWidth);
        }
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                setOffsetHeight(entries[0].contentRect.height);
                setOffsetWidth(entries[0].contentRect.width);
            }
        });
        if (heroRef.current) {
            resizeObserver.observe(heroRef.current);
        }
        return () => {
            if (heroRef.current) {
                resizeObserver.unobserve(heroRef.current);
            }
        };
    }, []);

    const splitTitle = title.split(" ");

    return (
        <div className={styles.HeroBannerContainer} id="hero-banner-floating" ref={heroRef}>
            <h2 className={styles.title}>
                {splitTitle.map((word, i) => (
                    <span
                        // Z-index for title words should always be higher than max image Z-index
                        style={{ position: 'relative', zIndex: 6 }}
                        key={word + i}
                    >
                        {word + " "}
                    </span>
                ))}
            </h2>

            <div className={styles.floatingImagesGrid}>
                {/* Render images only after finalImageUrls has been populated on the client */}
                {finalImageUrls.map((url, index) => (
                    <FloatingImage
                        key={url + index} // Key includes index to handle repeating URLs properly
                        src={url}
                        alt={`Floating Image ${index}`}
                        index={index}
                        imageWidth={imageW}
                        imageHeight={imageH}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBannerFloating;