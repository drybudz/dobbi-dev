'use client'

import { useAppContext } from "@/app/components/AppContext";
import { usePathname } from 'next/navigation';
import SingleProductGallery from "@/app/components/sections/SingleProductGallery";
import TwoLinks50s from "@/app/components/sections/TwoLinks50s";

// TODO: Update this to the context structure...
// export const revalidate = 30; // Revalidate every 30 seconds

export default function Project({ params }) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { allData } = useAppContext();
  // console.log("@PP------All Data :", allData);

  // Find project that matches this slug in Home or Work Featured Projects from Context
  const project =
  allData?.workPage?.featuredProjects?.find(
    (proj) => proj.slug?.current === slug
  ) || // Try to find in workPage.featuredProjects first
  allData?.homePage?.featuredProjects?.find(
    (proj) => proj.slug?.current === slug
  ) || // If not found, try homePage.featuredProjects
  null; // If still not found, set to null
  //  console.log("@PP------Project Page :", project);

  if (!project) {
    return <div>Project not found</div>; // Or a more user-friendly error message
  }

  return (
    <div className="projectPage">
      <SingleProductGallery 
      project={project}
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
    </div>

    
  );
}
