'use client';
// components/Footer.js
import styles from './styles/Footer.module.css';
import { useAppContext } from './AppContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {

const { allData } = useAppContext();
const FooterData = allData?.pageFooter || []; // Access the 'pages' array
const FooterLogo = allData?.homePage || [];
// console.log ("Footer Data @ Footer:", FooterData)

  return (
    <footer className={styles.footer}>
      {/* Left side container */}
      <div className={styles.leftContainer}>
        {/* Top group (brand name + text and social links) */}
        <div className={styles.leftTopGroup}>
          <div className={styles.leftCopyRight}>
            <span>{FooterData.copyrightBrandName}</span> {FooterData.copyrightText}
          </div>
          <div className={styles.leftSocialMedia}>
            {FooterData.connectLinks?.map((link, index) => (
              <a 
                href={link.linkUrl} 
                key={index}
                target={link.openNewTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {link.linkTitle}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom-aligned copyright year */}
        <div className={styles.leftCopyrightYear}>
          ©{FooterData.copyrightYear} {FooterData.copyrightBrandName}
        </div>
      </div>

      {/* Right side: Logo */}
      <div className={styles.right}>
        {/* <img src="https://placehold.co/110x30 " alt="Logo" className={styles.logo} /> */}
        
        {/* //Weird issue with Link @ Footer, I think it was the relative it had */}
        <Link href="/" className={styles.logoLink}>
        <Image
            src={FooterLogo?.companyLogoWhite?.asset?.url || "/dobbiLogo330x90.png"}
            alt={FooterLogo?.companyLogoWhite.alt || "Dobbi Logo"} 
            width={110}
            height={30}
            className={styles.logo}
        />
        </Link> 
      </div>
    </footer>
  );
}