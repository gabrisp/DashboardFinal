"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import APIConnect from "@/utils/APIConnect";
import ClientForm from "@/components/Clients/ClientForm";
import LocalStorageManager from "@/utils/localStorage";
import UpdateClientLogo from "@/components/UI/FileUpload";
import Loader from "@/components/UI/Loader";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import { useClients } from "@/utils/contexts/useClients";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ClientProjects from "@/components/Clients/ClientProjects";

// Componente de la página de un cliente
export default function ClientPage() {
    const { id } = useParams(); // Obtener el id del cliente
    const router = useRouter(); // Router para redirigir a la página de dashboard si el usuario ya está autenticado
    const { setReload, setCurrentClient, currentClient, loading, setLoading } = useClients(); // Obtener el cliente actual y el estado de carga

    useEffect(() => {
        (async()=>{
            setLoading(true); // Establecer el estado de carga a true
            if (id && LocalStorageManager.getToken()) {
                const clientData = await APIConnect.clients.getOne(id);
                if (clientData.errors) {
                    setCurrentClient(null); // Establecer el cliente actual a null
                }else{  
                const projectsData = await APIConnect.projects.getByClient(id); // Obtener los proyectos del cliente
                setCurrentClient({...clientData, projects: projectsData}); // Establecer el cliente actual
                formik.setValues({
                    name: clientData.name || '',
                    cif: clientData.cif || '',
                    street: clientData.address.street || '',
                    number: clientData.address.number || '',
                    city: clientData.address.city || '',
                    state: clientData.address.province || '',
                        postalCode: clientData.address.postal || '',
                    });
                }
            }
            setLoading(false); // Establecer el estado de carga a false
        })();
        return () => {
            setCurrentClient(null); // Establecer el cliente actual a null cuando se desmonte el componente
        }
    }, [id]);

    const handleDeleteClient = async () => {
        if (id && LocalStorageManager.getToken()) {
            const response = await APIConnect.clients.delete(id); // Eliminar el cliente
            console.log(response);
            setReload(true);
            router.push("/dashboard/clientes");
        }
    }

    const formik = useFormik({
        initialValues: {
            name: currentClient && currentClient.name || '', // Obtener el nombre del cliente
            cif: currentClient && currentClient.cif || '', // Obtener el cif del cliente
            street: currentClient && currentClient.address.street || '', // Obtener la calle del cliente
            number: currentClient && currentClient.address.number || '', // Obtener el número del cliente
            city: currentClient && currentClient.address.city || '', // Obtener la ciudad del cliente
            state: currentClient && currentClient.address.province || '', // Obtener la provincia del cliente
            postalCode: currentClient && currentClient.address.postal || '', // Obtener el código postal del cliente
        },
        validationSchema: Yup.object({
            name: Yup.string().required(), // Validar el nombre del cliente
            street: Yup.string().required(), // Validar la calle del cliente
            number: Yup.string().required(), // Validar el número del cliente
            city: Yup.string().required(), // Validar la ciudad del cliente
            state: Yup.string().required(), // Validar la provincia del cliente
            postalCode: Yup.string().required(), // Validar el código postal del cliente
            cif: Yup.string(), // Validar el cif del cliente
        }),
        onSubmit: async (values) => {
            const newClientData = { // Crear el nuevo cliente en el formato necesario para el API
                name: values.name,
                ...(values.cif && { cif: values.cif }),
                address: {
                    street: values.street,
                    number: values.number,
                    postal: values.postalCode,
                    city: values.city,
                    province: values.state,
                },
            };

            try {
                const newClient = await APIConnect.clients.update(id, newClientData); // Actualizar el cliente
                console.log("New client created:", newClient); // Log del nuevo cliente
                setReload(true); // Recargar los clientes

            } catch (error) {
                console.error("Error creating client or uploading logo:", error); // Log del error
            }
        },
    });


    if (loading) return ( // Si el estado de carga es true, mostrar el componente de carga
        <div className="flex justify-center items-center min-h-screen">
            <Loader />
        </div>
    );
    if (!currentClient) return ( // Si el cliente actual es null, mostrar el componente de cliente no encontrado
        <div className="flex flex-row items-center justify-center">
            <h4>CLIENTE NO ENCONTRADO</h4>
        </div>
    )
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-row items-center justify-between w-full border-b border-neutral-200 pb-2 pt-4">
                <h1 className="text-xs font-light text-neutral-500 uppercase">{currentClient.name}</h1>
                <div className="flex flex-row items-center justify-between mb-0 sticky top-0 bg-neutral-50 z-10">
               <div className="flex flex-row items-center justify-center gap-2">
               <Button className="bg-neutral-500 text-white hover:bg-neutral-400 h-[30px] rounded-md text-[9px]" type="submit" >
                    <BookmarkIcon className="w-[15px] h-[15px]" />
                </Button>
                <Button className="bg-red-500 text-white hover:bg-red-600 h-[30px] rounded-md text-[9px]" onClick={handleDeleteClient}>
                    <TrashIcon className="w-[15px] h-[15px]" />
                </Button>
               </div>
            </div>
            </div>
            <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mt-[20px]">INFORMACIÓN</h6>
            <ClientForm formik={formik} />
           <div className="flex flex-row items-start justify-between mt-[20px] gap-4 align-top">
                <div className="w-1/2">
                    <h6 className="text-xs font-light text-neutral-500 uppercase mb-[10px] mb-[10px] ">LOGO</h6>
                    <UpdateClientLogo clientId={currentClient._id} token={LocalStorageManager.getToken()} initialLogo={currentClient.logo ? currentClient.logo : null} />
                </div>
                
          </div>
        <div className="flex flex-col mb-4">
        <div className="flex flex-row items-center justify-between w-full border-b border-neutral-200 pb-2 pt-4">
            <h6 className="text-xs font-light text-neutral-500 uppercase">PROYECTOS</h6>
            <Link href={`/dashboard/proyectos/nuevo/${currentClient._id}`} className="bg-neutral-900 text-white text-xs font-light px-2 py-1 rounded-md h-[30px] flex items-center justify-center">Nuevo</Link>
         </div>
            <ClientProjects projects={currentClient ? currentClient.projects : null} />
        </div>
         </form>
    )
}