'use client';

// import { PortableText } from "next-sanity"; //test with the next-sanity
import { PortableText } from "@portabletext/react";
// import { getHomePage } from "../../../sanity/schemas/sanity-utils";
import H2Animation from "../components/H2Animator";
import HomeVideo from "../components/HomeVideo";
import LocationsAndEmailAnimator from "../components/LocationsAndEmailAnimator";
import DivsAnimator from "../components/DivsAnimator";
import { useAppContext } from "../components/AppContext";
import BackgroundImage from "../components/BackgroundImage";
import HeroBanner from "../components/HeroBanner";
import TwoLinks50s from "../components/sections/TwoLinks50s";
import HomeBandOneThird from "../components/sections/HomeBandOneThird";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import HomeSolutionGrid from "../components/sections/HomeSolutionGrid";
import HomeBand50Contact from "../components/sections/HomeBand50Contact";

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
      <HeroBanner title={homePageData?.slogan} projects={homePageData}/>
      <HomeBandOneThird 
        title={homePageData.whatTitle} 
        description={homePageData.whatDescription} 
      />
      <FeaturedProjects
        beforeText={homePageData.homeBeforeProjectDescription}
        projects={homePageData.featuredProjects || []}
        afterText={homePageData.homeAfterProjectDescription}
      />
      <TwoLinks50s
        leftLink={{
          title: "Explore Our Services", 
          slug: "/services"
        }}
        rightLink={{
          title: "See Our Work", 
          slug: "/work"
        }}
      />
      <HomeSolutionGrid 
        title={homePageData.homeGroupTitle}
        solutions={homePageData.solutions || []}
      />
      <HomeBand50Contact 
        title={homePageData.connectTitle}
        name={homePageData.connectName}
        email={homePageData.connectEmail}
      />
    </div>
  );
}
