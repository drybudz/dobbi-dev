'use client';

import { useAppContext } from "../components/AppContext";
import HeroBannerFloating from "../components/HeroBannerFloating";
import HomeServices8020Grid from "../components/sections/HomeServices8020Grid";
import HomeBand8020Contact from "../components/sections/HomeBand8020Contact";

// export const revalidate = 300; // Revalidate every 5 minutes

export default function Home() {
  // const homePageData = await getHomePage()
  const { allData } = useAppContext();
  const homePageData = allData?.homePage || null;
  // console.log("@H------Home Page Data:", homePageData); //is working
  // console.log("Array:", homePageData); //is working
  console.log("@H------Home Page Data:", homePageData.featuredProjects); //checkign for featuredProjects

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
