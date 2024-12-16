"use client";
import Link from "next/link";
import { HomeIcon, UserIcon, FaceSmileIcon, BuildingOfficeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import LocalStorageManager from "@/utils/localStorage";
import { useEffect, useState } from "react";
import Button  from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// Array de elementos del menú lateral
const menuItems = [
    { href: "/dashboard", label: "Resumen", icon: <HomeIcon className="w-5 h-5 text-neutral-500 font-light" /> },
    { href: "/dashboard/clientes", label: "Clientes", icon: <UserIcon className="w-5 h-5 text-neutral-500 font-light" /> },

    { href: "/dashboard/proyectos", label: "Proyectos", icon: <BuildingOfficeIcon className="w-5 h-5 text-neutral-500 font-light" /> },
    { href: "/dashboard/albaranes", label: "Albaranes", icon: <DocumentTextIcon className="w-5 h-5 text-neutral-500 font-light" /> },

       /*

    { href: "/dashboard/proveedores", label: "Proveedores", icon: <BuildingOfficeIcon /> },
    { href: "/dashboard/configuracion", label: "Configuración", icon: <BuildingOfficeIcon /> },
   */
]

const MenuItem = ({ href, text, icon }) => (
    <li className="!mt-0">
        <Link className={`text-gray-900 flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-100 transition duration-200`} href={href}>
            <span className="w-5 h-5">{icon}</span>
            <span className="font-medium text-xs">{text}</span>
        </Link>
    </li>
)

const AsideHeader = () => {
                
    const [user, setUser] = useState(null); // Estado del usuario
                   
    useEffect(() => {
        const user = LocalStorageManager.getUser(); // Obtener el usuario
        setUser(user); // Establecer el usuario
    }, []);

    return (
        <div className="flex flex-row items-center justify-start gap-4">
           <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-center gap-2 bg-neutral-900 rounded-lg p-2">
                <FaceSmileIcon className="w-6 h-6 text-white" />
            </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h6 className="text-xs font-bold text-neutral-900">{user && user.name}</h6>
          <p className="text-[9px] text-neutral-400 font-light">{user && user.email}</p>
        </div>
      </div>
       
    )
}
const AsideMenu = () => {
    const router = useRouter(); // Obtener el router
    const handleLogout = () => {
        LocalStorageManager.logout(); // Cerrar sesión
        router.push("/"); // Redirigir a la página de login
    }
    return <aside className="lg:w-1/6 w-full h-1/6 lg:h-screen p-4 border-b lg:border-b-0 lg:border-r bg-neutral-50 border-neutral-200 sticky top-0">
        <AsideHeader />
        <ul className="space-y-2 mt-[20px] flex flex-row w-full lg:flex-col overflow-x-auto">
            {menuItems.map((item, index) => (
                <MenuItem key={index} href={item.href} text={item.label} icon={item.icon} />
            ))}
        </ul>
        <footer className="flex flex-row items-center justify-center gap-2 lg:absolute lg:bottom-0 lg:left-0 lg:w-full mb-[20px]">
            <Button onClick={handleLogout} className="bg-neutral-500 text-white transition-all duration-200 hover:bg-neutral-400 h-[30px] rounded-md text-[9px]">
                LOG OUT
            </Button>
        </footer>
    </aside>;
}

export default AsideMenu;