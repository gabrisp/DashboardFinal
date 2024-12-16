"use client";

import AsideMenu from "@/components/AsideMenu";
import { ClientsProvider } from "@/utils/contexts/useClients";
import { ProjectsProvider } from "@/utils/contexts/useProjects";
import { useRouter } from "next/navigation";
import LocalStorageManager from "@/utils/localStorage";

// Componente de layout para la página de dashboard
export default function DashboardLayout({ children }) {
    const user = LocalStorageManager.getUser(); // Obtener el usuario
    const router = useRouter(); // Obtener el router
    if (!user) {
        router.push("/"); // Si el usuario no está autenticado, redirigir a la página de login
    }
    return  (
    <>
    <div className="flex flex-col lg:flex-row min-h-screen">
        <AsideMenu />
        <div className="lg:w-5/6 w-full flex flex-row">
        <ClientsProvider>
            <ProjectsProvider>  
                {children}
            </ProjectsProvider>
        </ClientsProvider>
        </div>
    </div>
    </>)
}