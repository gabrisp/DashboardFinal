"use client"

import Link from "next/link";
import Loader from "@/components/UI/Loader";

// Componente de fila de tabla
const TableRow = ({element, index}) => {
    return (
        <tr>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">{index + 1}.</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-b border-neutral-200 flex flex-row items-center justify-center">
               <Link href={`/dashboard/clientes/${element.clientId}`} className="flex flex-row items-center justify-center gap-2 hover:underline">
               <img src={element.client.logo} alt={element.client.name} className="w-10 h-10 rounded-full border border-neutral-200 object-cover p-1" />
               <p className="text-xs font-light">{element.client.name}</p>
               </Link>
            </td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-b border-neutral-200">{element.name}</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200  border-b border-neutral-200">{element.code}</td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200">
                <span className={`px-2 py-1 text-xs font-light rounded-md border ${element.active ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>{element.active ? "Activo" : "Inactivo"}</span>
            </td>
            <td className="px-4 py-4 text-neutral-500 font-light text-xs text-center border-r border-neutral-200 border-l border-b border-neutral-200"><Link href={`/dashboard/proyectos/${element._id}`} className="bg-neutral-800 text-white px-4 py-2 rounded-md hover:bg-neutral-600 transition-all duration-300">Ver</Link></td>
        </tr>
    )
}

// Componente de encabezado de tabla
const TableHeader = () => {
    return (
        <tr className="bg-neutral-200">
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Num.</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Cliente</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Nombre</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Codigo</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-l-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Estado</th>
            <th className="px-4 py-2 text-neutral-500 font-light text-xs text-center border-r-neutral-200 border-r border-t-neutral-200 border-neutral-50  border-l ">Link</th>
        </tr>
    )
}
// Componente de tabla
const Table = ({tableElements}) => {
    if (!tableElements) return  <div className="flex justify-center items-center h-full"><Loader /></div>;
    if (tableElements)return (
       <>
       {tableElements.length === 0 && (<p className="text-center text-neutral-500">No hay nada :(</p>)}
       {tableElements.length > 0 && (
         <table className="table-auto w-full rounded-lg mt-4"> 
         <thead>
             <TableHeader />
         </thead>
         <tbody>
             {tableElements.map((element, index) => <TableRow key={element._id} element={element} index={index} />)}
         </tbody>
     </table>
       )}
       </>
    )
}

export default Table;