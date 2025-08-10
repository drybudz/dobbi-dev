'use client';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './styles/HeroBannerFloating.module.css';

// Component to handle individual floating images
const FloatingImage = ({ src, alt, index, imageWidth, imageHeight }) => {
    const imgRef = useRef(null);
    const [animationProps, setAnimationProps] = useState({
        delay: 0,
        duration: 0,
        yoyoAmount: 0,
        zIndex: 0,
        opacity: 1,
    });

    if (!src) {
        return null;
    }

    useEffect(() => {
        const zIndexChoice = Math.floor(Math.random() * 3);

        let newZIndex;
        let newOpacity;

        if (zIndexChoice === 2) {
            newZIndex = 6; 
            newOpacity = 1; 
        } else {
            newZIndex = 4;
            newOpacity = 0.5 + Math.random() * 0.2; 
        }

        setAnimationProps({
            delay: Math.random() * 2,
            duration: 2 + Math.random() * 2,
            yoyoAmount: 10 + Math.random() * 10,
            zIndex: newZIndex,
            opacity: newOpacity,
        });
    }, []);

    useEffect(() => {
        const { delay, duration, yoyoAmount } = animationProps;
        if (imgRef.current && duration > 0) {
            gsap.to(imgRef.current, {
                y: -yoyoAmount,
                duration: duration,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: delay,
                overwrite: "auto",
            });
        }
    }, [animationProps]);

    return (
        <Image
            ref={imgRef}
            src={src}
            alt={alt || `Floating image ${index}`}
            width={imageWidth}
            height={imageHeight}
            quality={75}
            className={styles.floatingImage}
            style={{
                objectFit: 'cover',
                opacity: animationProps.opacity,
                // Apply zIndex directly to the Image component
                zIndex: animationProps.zIndex, 
            }}
        />
    );
};

// Main HeroBannerFloating Component
const HeroBannerFloating = ({ title, projects, imageDisplayOption }) => {
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
        //Changes
        if (imageDisplayOption === 'noImages' || rawImageUrls.length === 0) {
            tempFinalImageUrls = Array(totalImagesNeeded).fill(null);
        } else if (imageDisplayOption === 'repeatFirst' && rawImageUrls.length > 0) {
            const firstImageUrl = rawImageUrls[0];
            tempFinalImageUrls = Array(totalImagesNeeded).fill(firstImageUrl);
        } else { // Handles 'useAll' and other fallbacks
            let shuffledImageUrls = [...rawImageUrls].sort(() => Math.random() - 0.5);
            for (let i = 0; i < totalImagesNeeded; i++) {
                tempFinalImageUrls.push(shuffledImageUrls[i % shuffledImageUrls.length]);
            }
        }

        setFinalImageUrls(tempFinalImageUrls);
    }, [projects, totalImagesNeeded, imageDisplayOption]); // Re-run if projects or totalImagesNeeded change (though totalImagesNeeded is static)


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
        <section>
            <div className={styles.HeroBannerContainer} id="hero-banner-floating" ref={heroRef}>
                <h2 className={styles.title}>
                    {splitTitle.map((word, i) => (
                        <span
                            key={word + i}
                        >
                            {word + " "}
                        </span>
                    ))}
                </h2>
                <div className={styles.floatingImagesGrid}>
                    {/* The FloatingImage component now handles the check internally */}
                    {finalImageUrls.map((url, index) => (
                        <FloatingImage
                            key={url + index}
                            src={url}
                            alt={`Floating Image ${index}`}
                            index={index}
                            imageWidth={imageW}
                            imageHeight={imageH}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroBannerFloating;