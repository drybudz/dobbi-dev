'use client';

import Image from 'next/image';
import StickySidebar from '@/app/components/StickySidebar';
// import { getAboutPage } from "../../../../sanity/schemas/sanity-utils";
import { useAppContext } from '@/app/components/AppContext';
import AboutAnimations from '@/app/components/AboutAnimations';
import AboutInitAnimation from '@/app/components/AboutInitAnimation';
// import TypeAnimation from '@/app/components/TypeAnimation';

// Elements within AboutAnimations and with the attribute data-animate will get animated

// export const revalidate = 300; // Revalidate every 5 minutes

export default function About() {
    // const aboutPageData = await getAboutPage()
    const { allData } = useAppContext();
    const aboutPageData = allData?.aboutPage || null;
    // console.log("@AB------About Page Data:", aboutPageData);

    if (!aboutPageData) {
        return <div>About Page Not Found</div>
    }
    return (
        
        <div className="aboutPage">
            <h2 className="aboutTitle">{aboutPageData.aboutTitle}</h2>
            <p className="aboutText">{aboutPageData.aboutDescription}</p>
        </div>
        
    );
}