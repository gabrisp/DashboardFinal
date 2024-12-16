"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAlbaranes } from "@/utils/contexts/useAlbaranes";
import APIConnect from "@/utils/APIConnect";
import Loader from "@/components/UI/Loader";
import Button from "@/components/UI/Button";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

// Componente de la página de un albarán
export default function AlbaranPage() {
    const { id } = useParams(); // Obtener el id del albarán
    const { setCurrentAlbaran, currentAlbaran, loading, setLoading } = useAlbaranes(); // Obtener el albarán actual y el estado de carga
    useEffect(() => { // Efecto para obtener el albarán actual
       (async () => { 
        setLoading(true); // Establecer el estado de carga a true
        const albaran = await APIConnect.deliveryNote.getOne(id); // Obtener el albarán
        console.log(albaran);
        if (!albaran.errors) { // Si no hay errores
            setCurrentAlbaran(albaran); // Establecer el albarán actual
        }
        setLoading(false); // Establecer el estado de carga a false
    })();
        return () => {
            setCurrentAlbaran(null); // Establecer el albarán actual a null
        }
    }, [id]);
    if (loading) return ( // Si el estado de carga es true, mostrar el componente de carga
        <div className="flex flex-row items-center justify-center">
            <Loader/>
        </div>
    )
    if (!currentAlbaran) return ( // Si el albarán actual es null, mostrar el componente de albarán no encontrado
        <div className="flex flex-row items-center justify-center">
            <h4>ALBARAN NO ENCONTRADO</h4>
        </div>
    )
    if (currentAlbaran) return ( // Si el albarán actual existe, mostrar el componente de albarán
     <div className="flex flex-col w-full items-center justify-end p-10">
                    <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">ARCHIVO</h6>
           <Button className="mb-10 text-xs text-neutral-50 flex flex-row items-center justify-center gap-2 h-10 disabled:opacity-50 disabled:cursor-not-allowed" onClick={async (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del botón
            e.target.disabled = true; // Deshabilitar el botón
            await APIConnect.deliveryNote.download(id); // Descargar el albarán
            e.target.disabled = false; // Habilitar el botón
        }}>
            <ArrowDownIcon className="w-4 h-4"/>
            Descargar PDF
        </Button>
        
        <div className="flex flex-row items-center justify-center w-full">
            <div className="w-1/2">
           <div className="flex flex-col items-center justify-center">
            <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">INFORMACIÓN</h6>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Albaran: </span> {currentAlbaran._id}</p>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Descripcion: </span> {currentAlbaran.description}</p>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Fecha: </span> {currentAlbaran.date}</p>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Material: </span> {currentAlbaran.material}</p>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Cliente:</span>{currentAlbaran.client.name}</p>
            <p className="text-xs font-light text-neutral-500"> <span className="font-bold">Proyecto:</span> {currentAlbaran.projectName}</p>

        </div>
        </div>
        </div>

     </div>
    )
}