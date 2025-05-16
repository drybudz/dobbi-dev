'use client';

import "./../globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MenuAnimation from './MenuAnimation';
import { useAppContext } from './AppContext';

export default function HeaderNavigation() { // Default empty array
    
    const pathname = usePathname();
    // console.log("Current PATH :", pathname); // To check the current page
    const isHomePage = pathname === '/';
    const headerClasses = `navBar ${isHomePage ? 'homeNavBar' : ''}`;
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { allData } = useAppContext();

    console.log ("all Data @ Navigation:", allData)
    const homePage = allData?.homePage || []; // Access the 'pages' array
    const pages = allData?.pages || []; // Access the 'pages' array
    // console.log("K------NAV WORKS Page Data:", pages); // Is working

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 575);
            const handleResize = () => setIsMobile(window.innerWidth <= 575);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Safely get logo data with fallbacks
    const logoData = (isHomePage 
        ? pages[0]?.pageCompanyLogoWhite 
        : pages[0]?.pageCompanyLogo) || {};

    return (
        <header className={headerClasses}>
            <Link href="/" className="homeNavLink">
                <Image
                    // src={companyLogo?.url || "/glove.svg"}
                    src={homePage?.companyLogoWhite.url || "/glove.svg"}
                    alt={logoData?.alt || "Dobbi Logo"} 
                    width={110}
                    height={30}
                    priority
                />
            </Link>
            <div className="homeNavLinksContainer">
                <Link 
                    href="/services" 
                    className={pathname === "/services" ? "active-nav" : ""}
                >
                    Services
                </Link>
                <Link 
                    href="/work" 
                    className={pathname === "/work" ? "active-nav" : ""}
                >
                    Work
                </Link>
                <Link 
                    href="/about" 
                    className={pathname === "/about" ? "active-nav" : ""}
                >
                    About
                </Link>
                <Link 
                    href="#" 
                    className={pathname === "#" ? "active-nav" : ""}
                >
                    Contact
                </Link>
            </div>
        </header>
    );
}