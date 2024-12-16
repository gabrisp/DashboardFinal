"use client"
import Table from "@/components/UI/Table";
import { useProjects } from "@/utils/contexts/useProjects";

// Componente de la página de proyectos
export default function ProjectsPage() {
    const { projects } = useProjects();
    return (
        <Table tableElements={projects} />
    )
}