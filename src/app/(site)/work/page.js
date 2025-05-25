'use client';
import { useAppContext } from "@/app/components/AppContext";
import TitleInfo from "@/app/components/sections/TitleInfo";
import Link from "next/link";


export default function Work() {

  const { allData } = useAppContext();
  const workPageData = allData?.workPage || null;
  // console.log("@WK------Work Page Data:", workPageData.featuredProjects);

  return (
    
      <div className="aboutPage">
        <TitleInfo 
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        />



        {workPageData.featuredProjects.map((project) => (
        <Link 
          href={`/work/${project.slug.current}`} 
          className="project-card"
          key={project._id}
        >
          {project.image && (
            <div className="image-wrapper">
              <Image
                src={project.image}
                alt={project.name}
                width={250}
                height={100}
                className="project-image"
              />
            </div>
          )}
          <h3 className="project-title">{project.name}</h3>
        </Link>
      ))}

      </div>
    // 


  );
}

//.:('-') WIP

{/* <div className="HomePage">
      <h1>We make work that works.</h1>
      <span>Dobbi leads digital communications programs that help brands grow, adapt, and perform. We work across industries and markets with a commitment to thoughtful strategy and measurable results.</span>
      {console.log("projectsData", workPageData)}
      
    </div> */}