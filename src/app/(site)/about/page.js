'use client';

import TitleInfo from '@/app/components/sections/TitleInfo';
import AboutHorizontalStack from '@/app/components/sections/AboutHorizontalStack';
import AboutBand50 from '@/app/components/sections/AboutBand50';
import AboutGallery from '@/app/components/sections/AboutGallery';
import WorkKeysGrid from '@/app/components/sections/WorkKeysGrid';
import ChatLink from '@/app/components/sections/ChatLink';
import MiniGallery from '@/app/components/sections/MiniGallery';

import Image from 'next/image';
import StickySidebar from '@/app/components/StickySidebar';
// import { getAboutPage } from "../../../../sanity/schemas/sanity-utils";
import { useAppContext } from '@/app/components/AppContext';
// import TypeAnimation from '@/app/components/TypeAnimation';

// Elements within AboutAnimations and with the attribute data-animate will get animated

// export const revalidate = 300; // Revalidate every 5 minutes

export default function About() {
    // const aboutPageData = await getAboutPage()
    const { allData } = useAppContext();
    const aboutPageData = allData?.aboutPage || null;
    // console.log("@AB------About Page Data:", aboutPageData);
    console.log("@AB------About Page Data:", aboutPageData.aboutSmallImages);

    if (!aboutPageData) {
        return <div>About Page Not Found</div>
    }
    return (
        
        <div className="aboutPage">
      <TitleInfo 
        title={aboutPageData.aboutTitle}
        description={aboutPageData.aboutDescription}
      />
      <AboutHorizontalStack 
        image1Url={aboutPageData.horizontalImageTopImage?.asset?.url}
        image1Alt={aboutPageData.horizontalImageTopImage?.alt}
        image2Url={aboutPageData.horizontalImageBottomImage?.asset?.url}
        image2Alt={aboutPageData.horizontalImageBottomImage?.alt}
        text1={aboutPageData.horizontalImageTopText}
        text2={aboutPageData.horizontalImageBottomText}
      />
      <AboutBand50 
        title={aboutPageData.aboutBandTitle}
        text={aboutPageData.aboutBandText}
      />
      <AboutGallery
        largeImage={aboutPageData.aboutLargeImage}
        mediumImage={aboutPageData.aboutMediumImage}
        smallImages={aboutPageData.aboutSmallImages || []} 
      />
      <WorkKeysGrid
        title={aboutPageData.workKeysTitle}
        subtitle={aboutPageData.workKeysSubtitle}
        items={aboutPageData.workKeysList || []}
      />
      <ChatLink 
        title={aboutPageData.chatLinkTitle} 
        action={aboutPageData.chatLinkAction} 
      />
      <MiniGallery images={aboutPageData.miniGallery || []} />
    </div>
        
    );
}