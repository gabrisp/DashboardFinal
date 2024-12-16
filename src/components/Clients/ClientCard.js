import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useClients } from "@/utils/contexts/useClients";

// Componente de tarjeta de cliente
export default function ClientCard({ client }) {
    const { currentClient } = useClients();
    return (
        <Link href={`/dashboard/clientes/${client._id}`} className="w-full">
            <div className={`flex flex-row items-center justify-between p-2  bg-neutral-50 rounded-lg w-full border border-neutral-200 ${currentClient === client._id ? "bg-neutral-100" : ""}`}>
                <div className="flex flex-row items-center justify-start gap-2">
                    {
                    client.logo ? (<img src={client.logo} alt="Client Logo" className="w-auto h-[50px] object-cover rounded-lg" />)
                    :
                    (<UserIcon className="w-[50px] h-[50px] text-neutral-50 bg-neutral-900 rounded-lg p-2" />)
                    }
                    <div className="flex flex-row items-center justify-center gap-2 rounded-lg p-2">
                        <h6 className="text-xs font-bold text-neutral-500">{client.name}</h6>
                    </div>
                </div>
            </div>
        </Link>
    );
}