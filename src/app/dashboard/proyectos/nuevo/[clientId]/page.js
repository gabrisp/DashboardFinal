import ProjectForm from "@/components/Projects/ProjectForm";


// Componente de la página de creación de proyectos
export default function NewProjectPage() {
    return (
        <div className="flex flex-col gap-4 h-[90%] w-full justify-center items-center">
            <div className="flex flex-col gap-4 w-full justify-center items-center">
                 <ProjectForm />
            </div>
        </div>
    )
}