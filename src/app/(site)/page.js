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

// export const revalidate = 300; // Revalidate every 5 minutes

export default function Home() {
  // const homePageData = await getHomePage()
  const { allData } = useAppContext();
  const homePageData = allData?.homePage || null;
  // console.log("@H------Home Page Data:", homePageData); //is working

  if (!homePageData) {
    return <div>Home Page Not Found</div>;
  }

  return (
    <div className="homePage">
      <HeroBanner title={homePageData?.slogan} imageSrc={homePageData?.heroBannerBackground.asset.url}/>
    </div>
  );
}
