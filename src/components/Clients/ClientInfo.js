"use client";
import ClientData from "@/components/Clients/ClientData";
import UpdateClientLogo from "@/components/UI/FileUpload";
import LocalStorageManager from "@/utils/localStorage";

// Componente de información de cliente incluye datos y logo
export default function ClientInfo({client}) {
    if (!client) return null;
    return (
        <div className="flex flex-row items-start justify-between gap-4 align-top">
        <div className="w-full">
        <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">INFORMACIÓN CLIENTE</h6>
            <ClientData client={client}/>
            <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">LOGO</h6>
            <UpdateClientLogo disabled={true} clientId={client._id} token={LocalStorageManager.getToken()} initialLogo={client.logo ? client.logo : null} />
        </div>
        </div>
    )
}