'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './styles/WorkGrid4x4.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array]; // Create a shallow copy to avoid modifying original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- ProjectGridCell Component for Image Cycling ---
// This component will handle the image cycling for a single grid cell
const ProjectGridCell = ({ project, index, gridRefSetter }) => {
  const allImages = [
    ...(project.largeProjectImages?.slice(0, 3) || []),
    ...(project.mediumProjectImages?.slice(0, 3) || []),
    ...(project.smallProjectImages?.slice(0, 3) || []),
  ].filter(img => img && img.asset && img.asset.url); // Filter out invalid images

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgRef = useRef(null); // Ref for the image element itself

  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % allImages.length);
      }, 3700); // Change image every 3.7 seconds

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [allImages.length]);

  // Animate image fade on index change
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current,
        { opacity: 0.2 },
        { opacity: 1, duration: 3, ease: 'power1.out' }
      );
    }
  }, [currentImageIndex]);


  const currentImage = allImages[currentImageIndex];

  if (!currentImage) {
    return null; // Don't render if no valid images
  }

  return (
    <div
      key={project._id} // Key for the grid cell is the project ID
      className={styles.gridCell}
      ref={el => gridRefSetter(el, index)} // Set ref for parent GSAP
    >
      {/* Black overlay div */}
      <a href={`/work/${project.slug.current}`} className={styles.projectOverlayLink}>
        <div className={styles.projectOverlay}>
          <div className={styles.projectOverlayText}>
            <h3>{project.clientName}, <span>{project.projectYear}</span></h3>
          </div>
          <div className={styles.overlayArrow}></div> {/* Arrow */}
        </div>
      </a>
      {/* Image */}
      <img
        ref={imgRef} // Assign ref to the image for cycling animation
        src={currentImage.asset.url}
        alt={currentImage.alt || `Project image for ${project.clientName}`}
      />
    </div>
  );
};

// --- Main WorkGrid4x4 Component ---
export default function WorkGrid4x4({ featuredProjects }) {
  const [displayProjects, setDisplayProjects] = useState([]);
  const gridRefs = useRef([]); // To store refs for each grid item for GSAP

  // Helper to set refs dynamically
  const setGridRef = (el, index) => {
    gridRefs.current[index] = el;
  };

  useEffect(() => {
    if (featuredProjects) {
      // Shuffle the entire projects array and take the first 16
      // Unique *projects* for the grid spots
      const shuffledProjects = shuffleArray(featuredProjects).slice(0, 16);
      setDisplayProjects(shuffledProjects);
    }
  }, [featuredProjects]); // Recalculate if featuredProjects change

  useEffect(() => {
    // Clear existing ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // GSAP Mobile Portrait Scroll Effects
    if (window.innerWidth <= 574 && displayProjects.length > 0) { // Changed to <= 574px for consistency
      displayProjects.forEach((project, index) => {
        const item = gridRefs.current[index]; // Get the DOM element for this grid cell
        if (!item) return;

        const infoDiv = item.querySelector(`.${styles.projectOverlay}`);
        const imgElement = item.querySelector('img');

        gsap.set(infoDiv, { opacity: 0, y: -20 }); // Initially hidden and slightly up
        gsap.set(imgElement, { y: 0 }); // Initially at normal position

        ScrollTrigger.create({
          trigger: item,
          start: 'bottom bottom-=150px', // Overlay appears when element bottom is 150px from viewport bottom
          end: 'top top+=150px',         // Overlay disappears when element top is 150px from viewport top
          onEnter: () => { // Entering from bottom
            gsap.to(item, { marginBottom: 50, duration: 0.5, ease: 'power2.out' }); // Increase gap
            gsap.to(infoDiv, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }); // Fade in info
            gsap.to(imgElement, { y: 20, duration: 0.5, ease: 'power2.out' }); // Move image down slightly
          },
          onLeave: () => { // Leaving upwards
            gsap.to(item, { marginBottom: 10, duration: 0.5, ease: 'power2.out' }); // Reset gap
            gsap.to(infoDiv, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out' }); // Fade out info
            gsap.to(imgElement, { y: 0, duration: 0.5, ease: 'power2.out' }); // Reset image position
          },
          onEnterBack: () => { // Re-entering from top
            gsap.to(item, { marginBottom: 50, duration: 0.5, ease: 'power2.out' });
            gsap.to(infoDiv, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            gsap.to(imgElement, { y: 20, duration: 0.5, ease: 'power2.out' });
          },
          onLeaveBack: () => { // Re-leaving downwards
            gsap.to(item, { marginBottom: 10, duration: 0.5, ease: 'power2.out' });
            gsap.to(infoDiv, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out' });
            gsap.to(imgElement, { y: 0, duration: 0.5, ease: 'power2.out' });
          },
          // Important for mobile, allows GSAP to take over styles
          // and prevent conflicts with CSS transitions on desktop
          // and ensures the element's actual position is correct for trigger calculations
          // toggleActions: "play reverse play reverse" is good for simple enter/leave
        });
      });
    }

    // Cleanup ScrollTriggers on component unmount or if deps change
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [displayProjects]); // Re-run if displayProjects array changes (on project load/refresh)

  return (
    <section className={styles.workGridSection}>
      <div className={styles.gridContainer}>
        {displayProjects.map((project, index) => (
          // Render the new ProjectGridCell component for each chosen project
          <ProjectGridCell
            key={project._id} // Key remains project ID
            project={project}
            index={index}
            gridRefSetter={setGridRef}
          />
        ))}
      </div>
    </section>
  );
}