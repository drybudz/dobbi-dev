'use client'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import InfiniteSlider from "./InfiniteSlider";
import styles from './styles/HeroBanner.module.css'

const SliderWrapper = ({ containerHeight, projects }) => {
    // console.log("Projects @ Hero Banner:", projects.bannerProjects); 

const SnMImageUrls = projects.bannerProjects.flatMap(project => {
  const mediumUrls = project.mediumProjectImages?.map(img => img.asset?.url).filter(Boolean) || [];
  const smallUrls = project.smallProjectImages?.map(img => img.asset?.url).filter(Boolean) || [];
  
  // Combine and deduplicate immediately
  return [...new Set([...mediumUrls, ...smallUrls])];
})
.sort(() => Math.random() - 0.5); // Random shuffle

    // console.log("SnM Image URLs:", SnMImageUrls);

    let imageSrc = "https://dobbi-dev.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6agoqweu%2Fproduction%2F254359ec21724613bd10f47994dd785266d40af5-686x846.jpg&w=1080&q=75"
    const [sliderAmount, setSliderAmount] = useState(0)
    const smallImageUrls = [
        imageSrc,
        imageSrc,
        imageSrc,
        imageSrc,
        imageSrc,
        imageSrc,
        imageSrc,
        imageSrc,
    ];

    useLayoutEffect(() => {
        setSliderAmount(Math.ceil(containerHeight / 162))
    }, [containerHeight])

    useEffect(() => {console.log(imageSrc)}, [imageSrc])

    return (
        <>
            {sliderAmount > 1 && Array.from({ length: sliderAmount }).map((_, index) => {
                return (
                    <div key={index + (index + 1)} className={styles.HeroBannerWrapper}>
                        <InfiniteSlider
                            direction={index % 2 === 0 ? 'rtl' : 'ltr'}
                            images={[...SnMImageUrls, ...SnMImageUrls, ...SnMImageUrls]}
                            // why 3?
                        />
                    </div>
                )
            })}

        </>
    )
}

const HeroBanner = ({ title, projects }) => {
    const heroRef = useRef(null)
    const [offsetHeight, setOffsetHeight] = useState(0)

    useLayoutEffect(() => {
        if (heroRef.current) {
            setOffsetHeight(heroRef.current.offsetHeight);
        }
    }, []);

    const splitTitle = title.split(" ")

    return (
        <div className={styles.HeroBannerContainer} id="hero-banner" ref={heroRef}>
            <h2 className={styles.title}>{splitTitle.map((word, i) => {
                return (
                    <span style={{ position: 'relative', zIndex: i % 2 === 0 ? 0 : 2 }} key={word + i}>{word + " "}</span>
                )
            })}</h2>
            <SliderWrapper containerHeight={offsetHeight} projects={projects}></SliderWrapper>
        </div>
    )
}

export default HeroBanner