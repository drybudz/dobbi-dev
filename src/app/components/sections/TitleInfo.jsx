// components/sections/TitleInfo.js
// import styles from './styles/TitleInfo.module.css';
import styles from './styles/TItleInfo.module.css';
import { useEffect } from 'react';


export default function TitleInfo({ title, description }) {

  useEffect(() => {
const handleResize = () => {
  const titleElement = document.querySelector(`.${styles.title}`);
  if (titleElement) {
    if (window.innerWidth <= 575) {
      if (titleElement.textContent.includes('work')) {
        const newTitle = titleElement.textContent.replace('work', 'work<br/>');
        titleElement.innerHTML = newTitle;
      } else if (titleElement.textContent.includes('Strategic Partner')) {
        titleElement.innerHTML =
          'A Strategic<br>Partner in Digital<br>Communications';
      } else {
        titleElement.innerHTML = title; // Revert to original
      }
    } else {
      titleElement.innerHTML = title; // Revert for larger screens
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
