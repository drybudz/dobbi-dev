// components/sections/MiniGallery.js
import Image from 'next/image';
import styles from './styles/MiniGallery.module.css';

export default function MiniGallery({ images = [] }) {
  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        {images.slice(0, 12).map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            {image?.asset.url && (
              <Image
                src={image.asset.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                width={200}
                height={200}
                className={styles.image}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}