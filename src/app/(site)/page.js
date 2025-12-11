'use client';

import { useAppContext } from "../components/AppContext";
import HeroBannerFloating from "../components/HeroBannerFloating";
import HomeServices8020Grid from "../components/sections/HomeServices8020Grid";
import HomeBand8020Contact from "../components/sections/HomeBand8020Contact";
import { useEffect } from 'react';
import { gsap } from 'gsap';

// export const revalidate = 300; // Revalidate every 5 minutes

export default function Home() {
  // const homePageData = await getHomePage()
  const { allData } = useAppContext();
  const homePageData = allData?.homePage || null;
  // console.log("@H------Home Page Data:", homePageData); //is working
  // console.log("Array:", homePageData); //is working
  console.log("@H------Home Page Data:", homePageData.featuredProjects); //checkign for featuredProjects

  // Handle hash scrolling on page load with smooth GSAP animation from top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // First scroll to top of page
      window.scrollTo(0, 0);
      
      // Wait for page to fully render, then scroll from top to target
      setTimeout(() => {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          // Calculate element position relative to top
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          
          // Use GSAP for smoother scroll animation from top
          gsap.to({ scroll: 0 }, {
            scroll: elementTop,
            duration: 1.5,
            ease: "power3.out",
            onUpdate: function() {
              window.scrollTo(0, this.targets()[0].scroll);
            }
          });
        }
      }, 150);
    }
  }, []);

  if (!homePageData) {
    return <div>Home Page Not Found</div>;
  }

  return (
    <div className="homePage">
      {/* <HeroBanner title={homePageData?.slogan} imageSrc={homePageData?.heroBannerBackground.asset.url}/> */}
      {/* <HeroBanner title={homePageData?.slogan} projects={homePageData}/> */}
      <HeroBannerFloating
        title={homePageData?.slogan}
        projects={homePageData}
        imageDisplayOption={homePageData?.imageDisplayOption} />
      <HomeServices8020Grid
        servicesTitle={homePageData.homeServicesTitle}
        servicesDescription={homePageData.homeServicesDescription}
        servicesList={homePageData.homeServicesList || []}
      />
      <HomeBand8020Contact
        title={homePageData.connectTitle}
        ctaLinks={homePageData.connectCTALinks || []}
      />
    </div>
  );
}
