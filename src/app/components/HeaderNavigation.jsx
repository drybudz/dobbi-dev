'use client';

import "./../globals.css";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import styles from './styles/HeaderNavigation.module.css';

export default function HeaderNavigation() {
    const pathname = usePathname();
    const { allData } = useAppContext();
    const homePage = allData?.homePage || [];

    // State to manage mobile menu open/close
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State to track if we're on mobile view (useful for initial render and resizing)
    const [isMobile, setIsMobile] = useState(false);

    // Function to toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when navigating to a new page
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Effect to detect screen size for initial mobile state and resize
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 574);
        };

        // Set initial state
        checkIsMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIsMobile);

        // Clean up event listener
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    // Effect to prevent body scrolling when mobile menu is open
    useEffect(() => {
      if (isMenuOpen && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      // Cleanup on component unmount
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isMenuOpen, isMobile]);

    // console.log ("CURRENT PATH:", pathname)
    // console.log ("all Data @ Navigation:", allData)
    // const pages = allData?.pages || []; // Access the 'pages' array
    // console.log("K------NAV WORKS Page Data:", pages); // Is working

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src={homePage?.companyLogoWhite?.url || "/dobbiLogo330x90.png"}
                    alt={homePage?.companyLogoWhite.alt || "Dobbi Logo"}
                    width={110}
                    height={30}
                    priority
                    className={styles.logo}
                />
            </Link>

            {/* Hamburger/Exit Menu Icon for Mobile */}
            <div className={styles.menuToggle} onClick={toggleMenu}>
                <Image
                    src={isMenuOpen ? "/eMenu.png" : "/hMenu.png"}
                    alt={isMenuOpen ? "Close Menu" : "Open Menu"}
                    width={24} // Adjust size as needed
                    height={24} // Adjust size as needed
                />
            </div>

            {/* Navigation Links Container */}
            <div className={`${styles.linksContainer} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <Link
                    href="/services"
                    className={`${styles.navLink} ${pathname === "/services" ? styles.active : ""}`}
                    onClick={isMobile ? toggleMenu : undefined} // Close menu on link click in mobile
                >
                    Services
                </Link>
                <Link
                    href="/work"
                    className={`${styles.navLink} ${pathname.includes("/work") ? styles.active : ""}`}
                    onClick={isMobile ? toggleMenu : undefined}
                >
                    Work
                </Link>
                <Link
                    href="/about"
                    className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}
                    onClick={isMobile ? toggleMenu : undefined}
                >
                    About
                </Link>
                <Link
                    href={`mailto:${homePage?.connectEmail || "kawika@dobbiagency.com"}`}
                    className={styles.navLink}
                    onClick={isMobile ? toggleMenu : undefined}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}