import LayoutBase from "@/components/UI/LayoutBase";
import ClientsList from "@/components/Clients/ClientsList";
import { ClientsProvider } from "@/utils/contexts/useClients";
import Link from "next/link";

// Componente de layout para las páginas de clientes
export default function ClientLayout({ children }) {
    return (
            <LayoutBase title={
                <div className="flex flex-row items-center justify-between w-full border-b border-neutral-200 pb-2">
                    <h6 className="text-xs font-light text-neutral-500 uppercase">CLIENTES</h6>
                    <Link href="/dashboard/clientes/nuevo" className="bg-neutral-900 text-white text-xs font-light px-2 py-1 rounded-md h-[30px] flex items-center justify-center">Nuevo</Link>
                </div>
            } list={<ClientsList />}>
                {children}
            </LayoutBase>
    )
}
