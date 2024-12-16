import Link from "next/link";

// Componente de datos de proyecto
export default function ProjectData({project}){
    console.log(project);
    return (
        <div>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <Link className="text-xs text-neutral-500" href={`/dashboard/proyectos/${project._id}`}>Ver proyecto</Link>
        </div>
    )
}