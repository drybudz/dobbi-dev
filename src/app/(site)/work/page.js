'use client';
import { useAppContext } from "@/app/components/AppContext";
import TitleInfo from "@/app/components/sections/TitleInfo";
import Link from "next/link";
import WorkGrid from "@/app/components/sections/WorkGrid";
import WorkGrid4x4 from "@/app/components/sections/WorkGrid4x4";


export default function Work() {

  const { allData } = useAppContext();
  const workPageData = allData?.workPage || null;
  // console.log("@WK------Work Page Data:", workPageData.featuredProjects); //works

  return (
    
      <div className="aboutPage">
        <TitleInfo 
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        />

      {/* <WorkGrid featuredProjects={workPageData.featuredProjects} /> */}
      <WorkGrid4x4 featuredProjects={workPageData.featuredProjects} />

      </div>
    // 


  );
}