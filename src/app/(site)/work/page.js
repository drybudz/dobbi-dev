'use client';
import { useAppContext } from "@/app/components/AppContext";
import TitleInfo from "@/app/components/sections/TitleInfo";


export default function Work() {

  const { allData } = useAppContext();
  const workPageData = allData?.workPage || null;
  console.log("@WK------Work Page Data:", workPageData);

  return (
    
      <div className="aboutPage">
        <TitleInfo 
          title={workPageData.workPageTitle}
          description={workPageData.workDescription}
        />
      </div>
    // 


  );
}

//.:('-') WIP

{/* <div className="HomePage">
      <h1>We make work that works.</h1>
      <span>Dobbi leads digital communications programs that help brands grow, adapt, and perform. We work across industries and markets with a commitment to thoughtful strategy and measurable results.</span>
      {console.log("projectsData", workPageData)}
      {projects.map((project)=>(
        <Link href={`/work/${project.slug}`} className="aProject" key={project._id}>
          {project.image && (
            <Image 
              src={project.image}
              alt={project.name}
              width={250}
              height={100}
              className="projectImage"
              />
          )}

          <h3 className="projectTitle">{project.name}</h3>
        </Link>
      ))
      }
    </div> */}