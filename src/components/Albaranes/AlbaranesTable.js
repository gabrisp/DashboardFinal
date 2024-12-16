"use client"

import { useAlbaranes } from "@/utils/contexts/useAlbaranes";
import Link from "next/link";
import Loader from "@/components/UI/Loader";

// Componente de fila de albaranes
const AlbaranesTableRow = ({element, index}) => {
    return (
        <tr>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{index + 1}.</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-b border-neutral-200">{element.projectId.name}</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200  border-b border-neutral-200">{element.description}</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{element.workdate}</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200"><Link href={`/dashboard/albaranes/${element._id}`} className="bg-neutral-800 text-white px-4 py-2 rounded-md hover:bg-neutral-600 transition-all duration-300">Ver</Link></td>
        </tr>
    )
}

// Componente de encabezado de tabla de albaranes
const AlbaranesTableHeader = () => {
    return (
        <tr className="bg-neutral-200">
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Num.</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Proyecto</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Descripción</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Fecha</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-r-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Link</th>
        </tr>
    )
}

// Componente de tabla de albaranes
const AlbaranesTable = ({albaranes, loading = false}) => {
    if (loading) return  <div className="flex justify-center items-center h-full"><Loader /></div>;
    if (albaranes)return (
       <>
       {albaranes.length === 0 && (<p className="text-center text-neutral-500">No hay nada :(</p>)}
       {albaranes.length > 0 && (
         <table className="table-auto w-full rounded-lg mt-4"> 
         <thead>    
                <AlbaranesTableHeader />
         </thead>
         <tbody>
             {albaranes.map((element, index) => <AlbaranesTableRow key={element._id} element={element} index={index} />)}
         </tbody>
     </table>
       )}
       </>
    )
}

export default AlbaranesTable;