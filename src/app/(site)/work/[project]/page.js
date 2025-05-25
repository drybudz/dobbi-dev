'use client'

import { getProject } from "../../../../../sanity/schemas/sanity-utils";
import { PortableText } from "@portabletext/react";
// for this one above it looks like next-sanity also works instead of @portabletext/react, probably Sanity has created its own component
import Image from "next/image";
import styles from "./project.module.css";
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
  // Find project that matches this slug
  const project = allData?.workPage?.featuredProjects?.find(
    proj => proj.slug?.current === slug
  ) || null;
  // console.log("@PP------Project Page :", project);

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
