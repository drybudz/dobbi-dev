// components/sections/TitleInfo.js
// import styles from './styles/TitleInfo.module.css';
import styles from './styles/TItleInfo.module.css';
import { useEffect } from 'react';


export default function TitleInfo({ title, description }) {

  useEffect(() => {
    const handleResize = () => {
      const titleElement = document.querySelector(`.${styles.title}`);
      if (titleElement) {
        if (window.innerWidth <= 575 && titleElement.textContent.includes('work')) {
          const newTitle = titleElement.textContent.replace('work', 'work<br/>');
          titleElement.innerHTML = newTitle;
        } else {
          // You may want to revert the change if the screen size changes back
          // to avoid multiple <br> tags.
          titleElement.innerHTML = title; // Revert to the original title prop
        }
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
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
}
