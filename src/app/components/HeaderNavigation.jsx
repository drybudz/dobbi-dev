'use client';

import "./../globals.css";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MenuAnimation from './MenuAnimation';
import { useAppContext } from './AppContext';
import styles from './styles/HeaderNavigation.module.css'

export default function HeaderNavigation() { // Default empty array
    const pathname = usePathname();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const { allData } = useAppContext();

    // console.log ("all Data @ Navigation:", allData)
    const homePage = allData?.homePage || []; // Access the 'pages' array
    const pages = allData?.pages || []; // Access the 'pages' array
    // console.log("K------NAV WORKS Page Data:", pages); // Is working

    // Handle scroll to contact on route change
    useEffect(() => {
        // Only run on client side after component mounts
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash === '#contact') {
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        // Remove hash after scroll completes
                        setTimeout(() => {
                            window.history.replaceState(null, null, ' ');
                        }, 1000);
                    }
                }, 100);
            }
        }
    }, [pathname]); // Removed searchParams dependency

    const handleContactClick = (e) => {
        if (pathname === "/") {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    window.history.replaceState(null, null, ' ');
                }, 1000);
            }
        }
    };

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
                    href="/#contact"  // Changed to homepage with #contact fragment
                    className={`${styles.navLink} ${pathname === "/#contact" ? styles.active : ""}`}
                    scroll={false}  // Prevents default scroll behavior
                    onClick={(e) => {
                        if (pathname === "/") {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}