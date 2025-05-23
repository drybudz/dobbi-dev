import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const InfiniteSlider = ({ images, direction = "ltr", speed = 50, delay = 0 }) => {
    const trackRef = useRef(null);

    const imageWidth = 52; // px
    const gap = 150;       // px (space between images)
    const totalWidthWithGap = imageWidth + gap;

    useEffect(() => {
        const track = trackRef.current;
        if (!track || images.length === 0) return;

        // Triple the images for seamless looping
        const duplicatedImages = [...images, ...images, ...images];

        // Render images inside track
        track.innerHTML = duplicatedImages
            .map(
                (src, i) =>
                    `<img src="${src}" alt="slide-${i}" width="${imageWidth}" height="92" style="object-fit: cover; margin-right: ${gap}px; position: relative; z-index: ${i % 2 === 0 ? 0 : -1}; opacity: ${i % 2 === 0 ? 1 : 0.5}" />`
            )
            .join("");

        track.style.width = `${duplicatedImages.length * totalWidthWithGap}px`;
        track.style.display = "flex";
        track.style.alignItems = "center";
        track.style.zIndex = 0;
        track.style.position = "inherit";
        // Distance to move = width of one original image set
        const distanceToMove = images.length * totalWidthWithGap;

        // Calculate duration based on speed (pixels per second)
        // duration = distance / speed
        const duration = distanceToMove / speed;

        // Determine animation start and end based on direction
        const fromX = direction === "rtl" ? -distanceToMove : 0;
        const toX = direction === "rtl" ? 0 : -distanceToMove;

        const tl = gsap.timeline({ repeat: -1, ease: "linear", delay });

        tl.fromTo(
            track,
            { x: fromX },
            {
                x: toX,
                duration,
                ease: "linear",
                modifiers: {
                    x: gsap.utils.unitize((x) => {
                        const val = parseFloat(x);
                        // Wrap the value to create infinite loop effect
                        if (direction === "rtl") {
                            return val % distanceToMove;
                        } else {
                            return val % -distanceToMove;
                        }
                    }),
                },
            }
        );

        return () => {
            tl.kill();
        };
    }, [images, totalWidthWithGap, direction, speed, delay]);

    return (
        <div
            style={{
                overflow: "hidden",
                width: "100%",
                height: 92,
                position: "relative",
            }}
        >
            <div ref={trackRef} />
        </div>
    );
};

export default InfiniteSlider;
