import { getProject } from "../../../../../sanity/schemas/sanity-utils"
import { PortableText } from "@portabletext/react";
// for this one above it looks like next-sanity also works instead of @portabletext/react, probably Sanity has created its own component
import Image from 'next/image';

// TODO: Update this to the context structure... 
export const revalidate = 30; // Revalidate every 30 seconds


export default async function Project({ params }) {
//   const slug = params.project
//   const project = await getProject(slug)
    const { project : slug } = await params;
    const fetchedProject = await getProject(slug);

//   if (!project) {
//     return <div>Project not found</div> // Or a more user-friendly error message
//   }

//   return <div>{project.name}</div>
    if (!fetchedProject) {
        return <div>Project not found</div>; // Or a more user-friendly error message
    }

    return (
        <div className="projectContainer">
        <h1 className="bg-gradient-text">{fetchedProject.name}</h1>  
        {/* <header>
            
            <a href={fetchedProject.url} title="View Project" target="_blank" rel="noopener noreferrer">View Project</a>
        </header>
        
        
        <div className="projectContent"> 
            <PortableText value={fetchedProject.projectDescription}/>
        </div>

        
        <Image src={fetchedProject.image} alt={fetchedProject.name} width={250} height={100} className="singleProjectImage"/> */}

        </div>
    )  
}