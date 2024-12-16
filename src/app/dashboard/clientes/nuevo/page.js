import NewClientForm from "@/components/Clients/NewClientForm";

// Componente de la página de creación de clientes
export default function NewClientPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[90%]">
            <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">NUEVO CLIENTE</h6>
            <NewClientForm />
        </div>
    );

}