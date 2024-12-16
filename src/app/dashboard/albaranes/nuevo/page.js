"use client";
import { useEffect } from "react";
import { useAlbaranes } from "@/utils/contexts/useAlbaranes";
import AlbaranForm from "@/components/Albaranes/AlbaranForm";

// Componente de la página de creación de albaranes
export default function NewAlbaranPage() {
    const {setCurrentAlbaran} = useAlbaranes(); // Obtener el albarán actual y el estado de carga
    useEffect(() => {
        setCurrentAlbaran(null); // Establecer el albarán actual a null (nuevo albarán)
    }, []);
    return (
       <div className="flex flex-col gap-4 h-[90%] items-center justify-center">
         <AlbaranForm />
       </div>
    )
}