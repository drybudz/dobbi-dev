'use client'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import InfiniteSlider from "./InfiniteSlider";
import styles from './styles/HeroBanner.module.css'

const SliderWrapper = ({ containerHeight, imageSrc }) => {

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
                            images={[...smallImageUrls, ...smallImageUrls, ...smallImageUrls]}
                        />
                    </div>
                )
            })}

        </>
    )
}

const HeroBanner = ({ title, imageSrc }) => {
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
            <SliderWrapper containerHeight={offsetHeight} imageSrc={imageSrc}></SliderWrapper>
        </div>
    )
}

export default HeroBanner