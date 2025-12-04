'use client';

import TitleInfoArrow from '@/app/components/sections/TitleInfoArrow';
// import AboutHorizontalStack from '@/app/components/sections/AboutHorizontalStack';
import AboutBand50 from '@/app/components/sections/AboutBand50';
import AboutBand100 from '@/app/components/sections/AboutBand100';
import AboutBandQuarter from '@/app/components/sections/AboutBandQuarter';
import AboutGallery from '@/app/components/sections/AboutGallery';
import WorkKeysGrid from '@/app/components/sections/WorkKeysGrid';
import WorkKeysStacked from '@/app/components/sections/WorkKeysStacked';
import ChatLink from '@/app/components/sections/ChatLink';
import MiniGallery from '@/app/components/sections/MiniGallery';

import Home2080 from "@/app/components/sections/Home2080";
import FeaturedProjectsV2 from "@/app/components/sections/FeaturedProjectsV2";
import FeaturedProjects2080 from "@/app/components/sections/FeaturedProjects2080";

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
      const homePageData = allData?.homePage || null;


    // console.log("@AB------About Page Data:", aboutPageData);
    // console.log("@AB------About Page Data:", aboutPageData.aboutSmallImages);

    if (!aboutPageData) {
        return <div>About Page Not Found</div>
    }
    return (
        
        <div className="aboutPage">
      {/* <TitleInfo 
        title={aboutPageData.aboutTitle}
        description={aboutPageData.aboutDescription}
      /> */}
      <TitleInfoArrow
        title={aboutPageData.aboutTitle}
        description={aboutPageData.aboutDescription}
      />
      {/* Previous Design of the Stack */}
      {/* <AboutHorizontalStack 
        image1Url={aboutPageData.horizontalImageTopImage?.asset?.url}
        image1Alt={aboutPageData.horizontalImageTopImage?.alt}
        image2Url={aboutPageData.horizontalImageBottomImage?.asset?.url}
        image2Alt={aboutPageData.horizontalImageBottomImage?.alt}
        text1={aboutPageData.horizontalImageTopText}
        text2={aboutPageData.horizontalImageBottomText}
      /> */}
       {/* <AboutBand100 
        text={aboutPageData.horizontalImageTopText}
      />
      <AboutBandQuarter 
        title={aboutPageData.aboutBandTitle}
        text={aboutPageData.aboutBandText}
      />
      <AboutBand100 
        text={aboutPageData.horizontalImageBottomText}
      /> */}
      {/* <HomeBandOneThird
        title={aboutPageData.aboutBandTitle}
        description={aboutPageData.aboutBandText}
      /> */}
      <Home2080
        title={aboutPageData.aboutBandTitle}
        description={aboutPageData.aboutBandText}
      />
      {/* <FeaturedProjectsV2
        beforeText={aboutPageData.horizontalImageTopText}
        projects={homePageData.featuredProjects || []}
        afterText={aboutPageData.horizontalImageBottomText}
        leftLink={{
          title: "Explore Our Services",
          slug: "/services"
        }}
        rightLink={{
          title: "See Our Work",
          slug: "/work"
        }}
      /> */}
      <FeaturedProjects2080
        beforeText={aboutPageData.horizontalImageTopText}
        projects={homePageData.featuredProjects || []}
        afterText={aboutPageData.horizontalImageBottomText}
        ctaLinks={aboutPageData.aboutCTALinks || []}
      />
      <AboutGallery
        largeImage={aboutPageData.aboutLargeImage}
        mediumImage={aboutPageData.aboutMediumImage}
        smallImages={aboutPageData.aboutSmallImages || []} 
      />
      {/* <WorkKeysGrid
        title={aboutPageData.workKeysTitle}
        subtitle={aboutPageData.workKeysSubtitle}
        items={aboutPageData.workKeysList || []}
      /> */}
      <WorkKeysStacked
        title={aboutPageData.workKeysTitle}
        items={aboutPageData.workKeysList || []}
      />
      {/* <ChatLink 
        title={aboutPageData.chatLinkTitle} 
        action={aboutPageData.chatLinkAction} 
      /> */}
      {/* <MiniGallery images={aboutPageData.miniGallery || []} /> */}
    </div>
        
    );
}