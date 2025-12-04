'use client';
import { useAppContext } from "@/app/components/AppContext";
// import TitleInfo from "@/app/components/sections/TitleInfo";
import TitleDisplay from "@/app/components/sections/TitleDisplay";
import CTACentered from "@/app/components/sections/CTACentered";
import WorkPageCTA from "@/app/components/sections/WorkPageCTA";
import Link from "next/link";
import WorkGrid from "@/app/components/sections/WorkGrid"; //v1
// import WorkGrid4x4 from "@/app/components/sections/WorkGrid4x4";//v2
import WorkGrid4x4Swiper from "@/app/components/sections/WorkGrid4x4Swiper";



export default function Work() {

  const { allData } = useAppContext();
  const workPageData = allData?.workPage || null;
  // console.log("@WK------Work Page Data:", workPageData.featuredProjects); //works

  return (
    
      <div className="workPage">
        {/* <TitleInfo 
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        /> */}
        
        {/* These 2 look better on the next component */}
        {/* <TitleDisplay
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        /> */}
        
        {/* <CTACentered
          text={workPageData.workPageCTAText}
          name={workPageData.workPageCTAName}
          email={workPageData.workPageCTAEmail}
        /> */}

        <WorkPageCTA
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
          text={workPageData.workPageCTAText}
          name={workPageData.workPageCTAName}
          email={workPageData.workPageCTAEmail}
        />


      
      {/* <WorkGrid featuredProjects={workPageData.featuredProjects} /> */}
      
      {/* Thins one below is validated for empty gallery in Sanity, but needs to hidden for the 100vh at global to work 
      .workPage section {
    height: 100vh; }
} */}
      {/* <WorkGrid4x4Swiper featuredProjects={workPageData.featuredProjects} /> */}

      </div>
    // 


  );
}