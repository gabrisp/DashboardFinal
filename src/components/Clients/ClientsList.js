"use client"

import Loader from "@/components/UI/Loader"
import ClientCard from "./ClientCard"
import { useClients } from "@/utils/contexts/useClients"

// Componente de lista de clientes
export default function ClientsList() {
    const { clients } = useClients();
    return (
        <div className="w-full h-[90%] overflow-y-auto flex flex-col gap-2 items-center mt-[40px]">
                {clients === null && ( 
                    <div className="flex flex-col items-center justify-center h-full">
                        <Loader />
                    </div>
                )}
                {clients && clients.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-sm font-light tracking-wide text-neutral-500">No hay clientes</h1>
                    </div>
                )}
                {clients && clients.length > 0 && clients.map((client) => (
                    <ClientCard client={client} key={client._id} />
                ))}
        </div>
    )
}