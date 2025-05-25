'use client';

import "./../globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MenuAnimation from './MenuAnimation';
import { useAppContext } from './AppContext';
import styles from './styles/HeaderNavigation.module.css'

export default function HeaderNavigation() { // Default empty array
    const pathname = usePathname();
    
    const [menuOpen, setMenuOpen] = useState(false);
    const { allData } = useAppContext();

    // console.log ("all Data @ Navigation:", allData)
    const homePage = allData?.homePage || []; // Access the 'pages' array
    const pages = allData?.pages || []; // Access the 'pages' array
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
            <div className={styles.linksContainer}>
                <Link 
                    href="/services" 
                    className={`${styles.navLink} ${pathname === "/services" ? styles.active : ""}`}
                >
                    Services
                </Link>
                <Link 
                    href="/work" 
                    className={`${styles.navLink} ${pathname === "/work" ? styles.active : ""}`}
                >
                    Work
                </Link>
                <Link 
                    href="/about" 
                    className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}
                >
                    About
                </Link>
                <Link 
                    href="#" 
                    className={`${styles.navLink} ${pathname === "#" ? styles.active : ""}`}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}