"use client";
import { useProjects } from "@/utils/contexts/useProjects";
import Loader from "@/components/UI/Loader";
import LocalStorageManager from "@/utils/localStorage";
import APIConnect from "@/utils/APIConnect";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProjectForm from "@/components/Projects/ProjectForm";
import Button from "@/components/UI/Button";
import ClientInfo from "@/components/Clients/ClientInfo";
import AlbaranesTable from "@/components/Albaranes/AlbaranesTable";
import { useState } from "react";

// Componente de estado de proyecto
const ProjectStatus = ({project}) => {
    const { setCurrentProject } = useProjects();
    return (
        <div className="flex flex-row gap-2">
            <Button onClick={async () => {
                const response =  await APIConnect.projects.activate(project._id, !project.active);
                console.log(response);
                setCurrentProject(prev => ({...prev, active: !prev.active}));
            }} className={`text-xs font-light border rounded-md px-2 py-1 flex items-center justify-center ${project.active ? "bg-red-50 text-red-500 border-red-500" : "!bg-green-50 text-green-500 border-green-500"}`}>{project.active ? "Desactivar" : "Activar"}</Button>
            <p className={`text-xs font-light border rounded-full px-4 py-1 flex items-center justify-center ${project.active ? "bg-green-50 text-green-500 border-green-500" : "bg-red-200 text-red-500 border-red-500"}`}>{project.active ? "Activo" : "Inactivo"}</p>
        </div>
    )
}

// Componente de la página de un proyecto
export default function ProyectPage() {
    const { id } = useParams(); // Obtener el id del proyecto
    const { currentProject, setCurrentProject } = useProjects(); // Obtener el proyecto actual y el estado de carga
    const [reloadCurrentProject, setReloadCurrentProject] = useState(false); // Estado para recargar el proyecto actual
    
    useEffect(() => {
        if (id && LocalStorageManager.getToken()) { // Si el id del proyecto y el token están presentes
            (async()=>{
                const project = await APIConnect.projects.getOne(id); // Obtener el proyecto
                const client = await APIConnect.clients.getOne(project.clientId); // Obtener el cliente
                const albaranes = await APIConnect.deliveryNote.getByProject(id); // Obtener los albaranes del proyecto
                const editedAlbaranes =  albaranes.map(albaran => {
                    albaran.projectId = {}; // Editar el albarán para que tenga el id del proyecto y poder usarlo en el componente AlbaranesTable
                    albaran.projectId.name = project.name; // Editar el albarán para que tenga el nombre del proyecto y poder usarlo en el componente AlbaranesTable
                    return albaran;
                });
                const newProject = {
                    ...project, // Crear el nuevo proyecto
                    client, // Añadir el cliente al proyecto
                    albaranes: editedAlbaranes // Añadir los albaranes al proyecto
                };
                console.log(newProject); // Log del nuevo proyecto
                setCurrentProject(newProject); // Establecer el proyecto actual
                setReloadCurrentProject(false); // Recargar el proyecto actual
            })();
        }
        return () => {
            setCurrentProject(undefined); // Establecer el proyecto actual a undefined cuando se desmonte el componente
        }
    }, [id, reloadCurrentProject]); // Dependencias del useEffect para que se ejecute cuando cambie el id del proyecto o se recargue el proyecto actual

    if (!currentProject) {
        return <div className="flex justify-center items-center h-screen"><Loader/></div> // Si el proyecto actual es undefined, mostrar el componente de carga
    }
    if (currentProject) return (
        <div className="flex flex-col gap-4 mt-[20px]">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-m font-bold text-neutral-800">{currentProject.name}</h1>
                <ProjectStatus project={currentProject}/>
            </div>
            <div className="flex flex-col md:flex-row gap-10 mb-10 md:gap-20">
                <div className="md:w-1/2 w-full flex flex-col gap-2 items-start justify-center md:h-[90%]">
                <ProjectForm className="w-full" setReloadCurrentProject={setReloadCurrentProject}/>
                </div>
                <div className="md:w-1/2 w-full flex flex-col gap-2 items-center justify-center md:h-[90%]">
                <ClientInfo client={currentProject.client} />
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h6 className="text-m font-bold text-neutral-800">Albaranes</h6>
                <AlbaranesTable albaranes={currentProject.albaranes}/>
            </div>
        </div>
    )
}
