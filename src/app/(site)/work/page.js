import { getProjects } from '../../../../sanity/schemas/sanity-utils';
import { getWorkPage } from '../../../../sanity/schemas/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';



export default async function Work() {

  const projects = await getProjects() //use the one bellow to render data of work, this one is rendering each project, works but not what I need rn
  const workPageData = await getWorkPage()

  return (
    <div className="HomePage">
      <h1>We make work that works.</h1>
      <span>Dobbi leads digital communications programs that help brands grow, adapt, and perform. We work across industries and markets with a commitment to thoughtful strategy and measurable results.</span>
      {console.log("projectsData", workPageData)}
      {projects.map((project)=>(
        <Link href={`/projects/${project.slug}`} className="aProject" key={project._id}>

          {/* ADD IMAGE */}
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
    </div>
  );
}

//.:('-') WIP