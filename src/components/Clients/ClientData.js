// Componente de datos de cliente
const ClientData = ({client}) => {
    return (
        <div className="flex flex-col mb-4">
            <p className="text-xs font-light text-neutral-900">{client.name}</p>
            <p className="text-xs font-light text-neutral-900">{client.email}</p>
            <p className="text-xs font-light text-neutral-900">{client.address.street} {client.address.number}</p>
            <p className="text-xs font-light text-neutral-900">{client.address.postal}, {client.address.city}, {client.address.state}</p>
        </div>
    )
}

export default ClientData;