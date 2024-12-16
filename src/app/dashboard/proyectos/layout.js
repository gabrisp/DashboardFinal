import { ProjectsProvider } from "@/utils/contexts/useProjects";
import Link from "next/link";
import LayoutContent from "@/components/UI/LayoutContent/LayoutContent";

// Componente de layout para las páginas de proyectos
export default function ProjectsLayout({ children }) {
    return (
        <LayoutContent title="Proyectos">
                {children}
        </LayoutContent>
    )
}