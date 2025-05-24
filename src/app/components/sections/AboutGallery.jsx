import Image from 'next/image';
import styles from './styles/AboutGallery.module.css';

export default function AboutGallery({
  largeImage,
  mediumImage,
  smallImages = []
}) {
  return (
    <section className={styles.gallery}>
      {/* 1. Large Image */}
      <div className={styles.large}>
        {largeImage?.asset?.url && (
          <Image
            src={largeImage.asset.url}
            alt={largeImage.alt || "Large about image"}
            fill
            className={styles.image}
            sizes="521px"
          />
        )}
      </div>

      {/* 2. Small Image 1 */}
      <div className={styles.small1}>
        {smallImages[0]?.asset?.url && (
          <Image
            src={smallImages[0].asset.url}
            alt={smallImages[0]?.alt || "Small image 1"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 3. Small Image 2 */}
      <div className={styles.small2}>
        {smallImages[1]?.asset?.url && (
          <Image
            src={smallImages[1].asset.url}
            alt={smallImages[1]?.alt || "Small image 2"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 6. Medium Image */}
      <div className={styles.medium}>
        {mediumImage?.asset?.url && (
          <Image
            src={mediumImage.asset.url}
            alt={mediumImage.alt || "Medium about image"}
            fill
            className={styles.image}
            sizes="308px"
          />
        )}
      </div>

      {/* 4. Small Image 3 */}
      <div className={styles.small3}>
        {smallImages[2]?.asset?.url && (
          <Image
            src={smallImages[2].asset.url}
            alt={smallImages[2]?.alt || "Small image 3"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>

      {/* 5. Small Image 4 */}
      <div className={styles.small4}>
        {smallImages[3]?.asset?.url && (
          <Image
            src={smallImages[3].asset.url}
            alt={smallImages[3]?.alt || "Small image 4"}
            fill
            className={styles.image}
            sizes="260px"
          />
        )}
      </div>
    </section>
  );
}