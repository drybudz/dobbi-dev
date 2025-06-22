'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from './AppContext';
import { gsap } from 'gsap';
import styles from './styles/HeaderNavigation.module.css';

export default function HeaderNavigation() {
    const pathname = usePathname();
    const { allData } = useAppContext();
    const homePage = allData?.homePage || [];
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 574);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Menu animation with GSAP
    useEffect(() => {
        if (!menuRef.current) return;

        const menuEl = menuRef.current;
        
        if (isMenuOpen && isMobile) {
            // Open animation
            gsap.fromTo(menuEl,
                { opacity: 0, y: -100 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5,
                    ease: "power2.out",
                    onStart: () => {
                        menuEl.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                }
            );
        } else if (!isMenuOpen && isMobile) {
            // Close animation
            gsap.to(menuEl, {
                opacity: 0,
                y: -100,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    menuEl.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }

        return () => {
            gsap.killTweensOf(menuEl);
        };
    }, [isMenuOpen, isMobile]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src={homePage?.companyLogoWhite?.url || "/dobbiLogo330x90.png"}
                    alt={homePage?.companyLogoWhite?.alt || "Dobbi Logo"}
                    width={110}
                    height={30}
                    priority
                    className={styles.logo}
                />
            </Link>

            <div className={styles.menuToggle} onClick={toggleMenu}>
                <Image
                    src={isMenuOpen ? "/eMenu.png" : "/hMenu.png"}
                    alt={isMenuOpen ? "Close Menu" : "Open Menu"}
                    width={24}
                    height={24}
                />
            </div>

            <div 
                ref={menuRef}
                className={styles.linksContainer}
            >
                <Link href="/services" className={`${styles.navLink} ${pathname === "/services" ? styles.active : ""}`}>
                    Services
                </Link>
                <Link href="/work" className={`${styles.navLink} ${pathname.includes("/work") ? styles.active : ""}`}>
                    Work
                </Link>
                <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}>
                    About
                </Link>
                <Link 
                    href={`mailto:${homePage?.connectEmail || "kawika@dobbiagency.com"}`} 
                    className={styles.navLink}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}