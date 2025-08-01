// components/sections/TitleInfo.js
// import styles from './styles/TitleInfo.module.css';
import styles from './styles/TItleInfo.module.css';
import { useEffect } from 'react';


export default function TitleInfo({ title, description }) {

  useEffect(() => {
    const handleResize = () => {
      const titleElement = document.querySelector(`.${styles.title}`);
      
      // For debugging, keep these logs to see what's happening:
      // console.log('Original title prop (from prop):', JSON.stringify(title));
      // if (titleElement) {
      //   console.log('Current DOM textContent (before any changes in this run):', JSON.stringify(titleElement.textContent));
      // }

      if (titleElement) {
        const specificTitle = "A Strategic Partner in Digital Communications";
        const isMobile = window.innerWidth <= 575;

        // --- CRITICAL FIX FOR THE GLITCH ---
        // ALWAYS reset to the original 'title' prop content at the beginning of this function.
        // This provides a clean slate for every re-evaluation, preventing old modifications
        // from interfering with new checks and ensuring consistent behavior.
        titleElement.innerHTML = title; 

        if (isMobile) {
          // --- Scenario 1: Handle 'work' title ---
          // Condition based on the ORIGINAL 'title' prop
          if (title.includes('work')) { 
            // Only apply the break if it's not already present in the *current* innerHTML (which is now reset to original)
            if (!titleElement.innerHTML.includes('work<br>')) { // Use <br> as it was shown to work for you
              const newTitle = titleElement.innerHTML.replace('work', 'work<br>');
              titleElement.innerHTML = newTitle;
              // console.log('Applied "work" break:', JSON.stringify(titleElement.innerHTML));
            }
          } 
          // --- Scenario 2: Handle "A Strategic Partner in Digital Communications" title ---
          // Condition based on an EXACT match with the ORIGINAL 'title' prop.
          else if (title === specificTitle) { 
            // Only apply the breaks if they are not already present in the *current* innerHTML (which is now reset)
            if (!titleElement.innerHTML.includes('Strategic<br>Partner')) {
              let currentHtml = titleElement.innerHTML; // Start with the clean original title

              // 1. Insert <br> after "Strategic"
              currentHtml = currentHtml.replace('Strategic', 'Strategic<br>');
              
              // 2. Insert <br> after "Digital"
              // Use regex to robustly handle any whitespace (including non-breaking spaces)
              currentHtml = currentHtml.replace(/Digital(\s*)/, 'Digital<br>$1');
              
              titleElement.innerHTML = currentHtml;
              // console.log('Applied specific title breaks:', JSON.stringify(titleElement.innerHTML));
            }
          }
          // If it's mobile but doesn't match either of the above specific cases,
          // the title remains as its original 'title' prop value (due to the reset at the top).
        } 
        // If the screen is NOT mobile (window.innerWidth > 575px),
        // the title automatically reverts to its original form because
        // `titleElement.innerHTML = title;` is called at the very beginning of `handleResize()`.
      }
    };

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [title]); // Rerun effect if the title prop changes

  return (
    <section className={styles.titleInfo}>
      <h2 className={styles.title}>{title}</h2> {/* Initial render uses the original title prop */}
      <p className={styles.description}>{description}</p>
    </section>
  );
}