import Loader from "@/components/UI/Loader";
import Link from "next/link";

// Componente de tarjeta de proyecto de cliente
const ClientProjectCard = ({project, index}) => {
    console.log(project);
    return  <tr>
        <td className="px-2 py-2 sm:px-4 sm:py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{index + 1}.</td>
        <td className="px-2 py-2 sm:px-4 sm:py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{project.name}</td>
        <td className="px-2 py-2 sm:px-4 sm:py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{project.code}</td>
        <td className="px-2 py-2 sm:px-4 sm:py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">
            <span className={`px-2 py-1 text-xs font-light rounded-md border ${project.active ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>
            {project.active ? "Activo" : "Inactivo"}
            </span>
        </td>
        <td className="px-2 py-2 sm:px-4 sm:py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">
            <Link href={`/dashboard/proyectos/${project._id}`} className="bg-neutral-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-neutral-600 transition-all duration-300">Ver</Link>
        </td>
    </tr>
}

// Componente de proyectos de cliente
const ClientProjects = ({projects}) => {
    return <div className="flex flex-col gap-4">
        {!projects && (<div className="flex justify-center items-center h-screen"><Loader /></div>)}
        {projects && projects.length === 0 && (<p className="text-center text-neutral-500">No hay proyectos :(</p>)}
        {projects && projects.length > 0 && (
        <table className="table-auto w-full rounded-lg mt-4">
            <thead className="bg-neutral-200">
                <tr className="text-left rounded-t-lg">
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-neutral-500 font-light text-xs text-center border-neutral-200 border-r border-t border-l border-neutral-50">Num.</th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-neutral-500 font-light text-xs text-center border-r border-t border-neutral-50">Nombre</th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-neutral-500 font-light text-xs text-center border-r border-t border-neutral-50">Codigo</th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-neutral-500 font-light text-xs text-center border-neutral-200 border-r border-t">Estado</th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-neutral-500 font-light text-xs text-center border-neutral-200 border-r border-t">Link</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, index) => <ClientProjectCard key={project._id} project={project} index={index} />)}
            </tbody>
        </table>)}
    </div>;
}

export default ClientProjects;