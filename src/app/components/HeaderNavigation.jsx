// components/sections/HeaderNavigation.jsx
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
    const siteNavigation = allData?.siteNavigation || null;
    const navigationItems = siteNavigation?.navigationItems || [];
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Initialize isMobile to false for SSR, then set client-side.
    // This allows the server to render a consistent structure.
    const [isMobile, setIsMobile] = useState(false); 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Mobile detection and responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 574;
            setIsMobile(mobile);
            
            // When resizing to desktop, ensure menu is visible
            if (!mobile) {
                setIsMenuOpen(false);
                if (menuRef.current) {
                    // Reset all GSAP and inline styles
                    gsap.killTweensOf(menuRef.current);
                    menuRef.current.style.display = '';
                    menuRef.current.style.opacity = '';
                    menuRef.current.style.transform = '';
                    document.body.style.overflow = '';
                }
            }
        };
        
        // Initial check (only runs on client after hydration)
        // Ensure this effect runs after the initial render.
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this runs once after initial render on client

    // Menu animation with GSAP
    useEffect(() => {
        if (!menuRef.current) return;

        const menuEl = menuRef.current;
        
        // Only apply GSAP animations if actually on mobile and menu state changes
        if (isMobile) { // Only animate if we are in mobile view
            if (isMenuOpen) {
                // Open animation
                gsap.fromTo(menuEl,
                    { opacity: 0, y: -100, display: 'none' }, // Start from display: none
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5,
                        ease: "power2.out",
                        onStart: () => {
                            menuEl.style.display = 'flex'; // Make it visible before animating
                            document.body.style.overflow = 'hidden';
                        }
                    }
                );
            } else {
                // Close animation
                gsap.to(menuEl, {
                    opacity: 0,
                    y: -100,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        menuEl.style.display = 'none'; // Hide after animation
                        document.body.style.overflow = '';
                    }
                });
            }
        } else {
            // If not mobile, ensure menu is reset to desktop state immediately
            gsap.killTweensOf(menuEl); // Stop any ongoing animations
            menuEl.style.display = ''; // Reset display (usually flex from CSS)
            menuEl.style.opacity = ''; // Reset opacity
            menuEl.style.transform = ''; // Reset transform
            document.body.style.overflow = ''; // Reset body overflow
        }


        return () => {
            gsap.killTweensOf(menuEl);
        };
    }, [isMenuOpen, isMobile]); // Dependency on isMobile is important

    // Close menu on route change (for internal links only)
    const handleNavLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Handle external link clicks (close menu but don't prevent navigation)
    const handleExternalLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.nav}>
            <Link 
                href="/" 
                className={styles.logoLink}
                onClick={handleNavLinkClick}
            >
                <Image
                    src={homePage?.companyLogoWhite?.url || "/dobbiLogo330x90.png"}
                    alt={homePage?.companyLogoWhite?.alt || "Dobbi Logo"}
                    width={110}
                    height={30}
                    priority
                    className={styles.logo}
                />
            </Link>

            {/* ALWAYS render menuToggle. CSS will handle its display on desktop. */}
            <div className={styles.menuToggle} onClick={toggleMenu}>
                <Image
                    src={isMenuOpen ? "/eMenu.png" : "/hMenu.png"}
                    alt={isMenuOpen ? "Close Menu" : "Open Menu"}
                    width={24}
                    height={19}
                />
            </div>

            {/* Conditionally apply menuOpen class only when truly open AND on mobile */}
            <div 
                ref={menuRef}
                className={`${styles.linksContainer} ${isMenuOpen && isMobile ? styles.menuOpen : ''}`}
            >
                {navigationItems.length > 0 ? (
                    navigationItems.map((item, index) => {
                        const isInternal = item.slug?.startsWith('/');
                        const isActive = isInternal && (pathname === item.slug || (item.slug !== '/' && pathname.startsWith(item.slug)));
                        
                        if (isInternal) {
                            // Internal link - use Next.js Link
                            return (
                                <Link 
                                    key={index}
                                    href={item.slug} 
                                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                                    onClick={handleNavLinkClick}
                                >
                                    {item.title}
                                </Link>
                            );
                        } else {
                            // External link - use regular anchor tag
                            const shouldOpenInNewTab = item.openInNewTab !== false; // Default to true if undefined
                            return (
                                <a
                                    key={index}
                                    href={item.slug}
                                    className={styles.navLink}
                                    target={shouldOpenInNewTab ? '_blank' : '_self'}
                                    rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
                                    onClick={handleExternalLinkClick}
                                >
                                    {item.title}
                                </a>
                            );
                        }
                    })
                ) : (
                    // Fallback to hardcoded links if no navigation data
                    <>
                        <Link 
                            href="/services" 
                            className={`${styles.navLink} ${pathname === "/services" ? styles.active : ""}`}
                            onClick={handleNavLinkClick}
                        >
                            Services
                        </Link>
                        <Link 
                            href="/work" 
                            className={`${styles.navLink} ${pathname.includes("/work") ? styles.active : ""}`}
                            onClick={handleNavLinkClick}
                        >
                            Work
                        </Link>
                        <Link 
                            href="/about" 
                            className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}
                            onClick={handleNavLinkClick}
                        >
                            About
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`${styles.navLink} ${pathname === "/contact" ? styles.active : ""}`}
                            onClick={handleNavLinkClick}
                        >
                            Contact
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}