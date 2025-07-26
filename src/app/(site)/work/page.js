'use client';
import { useAppContext } from "@/app/components/AppContext";
import TitleInfo from "@/app/components/sections/TitleInfo";
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
        <TitleInfo 
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        />

      {/* <WorkGrid featuredProjects={workPageData.featuredProjects} /> */}
      <WorkGrid4x4Swiper featuredProjects={workPageData.featuredProjects} />

      </div>
    // 


  );
}