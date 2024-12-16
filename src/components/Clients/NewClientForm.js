"use client";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIConnect from "@/utils/APIConnect";
import { useClients } from "@/utils/contexts/useClients";
import Loader from "../UI/Loader";

// Componente de formulario de cliente
const NewClientForm = () => {
    // Image Logic
    const [image, setImage] = useState(null); // Estado de el logo
    const [previewUrl, setPreviewUrl] = useState(null); // Estado de la URL de el logo
    const [isUploading, setIsUploading] = useState(false); // Estado de la subida de el logo
    const [dragging, setDragging] = useState(false); // Estado de la subida de el logo

    const { setReload } = useClients();
    const formik = useFormik({
        initialValues: {
            name:  '',
            cif: '',
            street:  '',
            number:  '',
            city:  '',
            state:  '',
            postalCode: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            postalCode: Yup.string().required(),
            cif: Yup.string(),
        }),
        onSubmit: async (values) => {
            const newClientData = {
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
                const newClient = await APIConnect.clients.create(newClientData, null); // Crear cliente    
                console.log("New client created:", newClient);
                if (image) { // Si hay una imagen
                    await handleFileUpload(image, newClient._id); // Subir logo
                }
                setReload(true); // Recargar la lista de clientes
                formik.resetForm(); // Resetear el formulario
                setImage(null); // Resetear el estado de la imagen
                setPreviewUrl(null); // Resetear el estado de la URL de la imagen
                setIsUploading(false); // Resetear el estado de la subida de la imagen
            } catch (error) {
                console.error("Error creating client or uploading logo:", error);
            }
        },
    });


    // Manejar la subida de la imagen
    const handleFileUpload = async (file, id) => {
        if (!file) return;
        setIsUploading(true);
        const response = await APIConnect.clients.uploadLogo(id, file);   // Subir logo a la base de datos  
        setIsUploading(false);
    };

    // Manejar el cambio de la imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setImage(file);
        }
    };

    // Manejar el drop sobre el area
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file)); // Crear URL de la imagen
            setImage(file); // Setear la imagen
        }
    };

    // Manejar el arrastre sobre el area
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    // Manejar el leave sobre el area
    const handleDragLeave = () => {
        setDragging(false);
    };



    return (
        <form 
            onSubmit={formik.handleSubmit}
        >
            <Input
                placeholder="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name && formik.touched.name ? formik.errors.name : null}
            />
            <Input
                placeholder="CIF"
                name="cif"
                value={formik.values.cif}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.cif && formik.touched.cif ? formik.errors.cif : null}
            />
           <div className="flex gap-2 w-full">
           <Input
                wrapperClassName="w-5/6 grow"
                placeholder="Calle"
                name="street"
                value={formik.values.street}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                
            />
            <Input
                wrapperClassName="w-1/6 grow"
                placeholder="Número"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.number && formik.touched.number ? formik.errors.number : null}
            />
           </div>
          <div className="flex gap-2 w-full">
          <Input
                placeholder="Ciudad"
                wrapperClassName="w-2/5 grow"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.errors.city && formik.touched.city ? formik.errors.city : null}
            />
            <Input
                placeholder="Provincia"
                wrapperClassName="w-2/5 grow"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.errors.state && formik.touched.state ? formik.errors.state : null}
            />
               <Input
                wrapperClassName="w-1/5 grow"
                placeholder="Código postal"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.postalCode && formik.touched.postalCode ? formik.errors.postalCode : null}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            {/* Drag-and-Drop area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`w-full h-auto flex flex-col items-center justify-center border-[1px] border-solid rounded-lg cursor-pointer transition relative z-0 min-h-[100px] mb-[20px]`}
            >
                {dragging && <div className="absolute inset-0 bg-neutral-500 opacity-50 rounded-lg"></div>}
                {previewUrl ? (
                   <>
                   
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className={`${isUploading ? "opacity-50" : ""} w-full h-full object-cover rounded-lg`}
                        />
                        {isUploading && <div className="absolute inset-0 flex items-center justify-center">
                            <Loader />
                        </div>}
                    </>
                ) : (
                    <p className="text-sm text-gray-600">
                        Drag & Drop your file here or click to select
                    </p>
                )}
                <input
                    disabled={isUploading}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

        </div>

             <div className="flex flex-row gap-2 w-full">
             <Button className="w-full text-xs font-light text-neutral-100" type="submit" variant="primary">
                    Crear Cliente
                </Button>
                <Button 
                    className="w-full text-xs font-light text-neutral-100 !bg-neutral-500"
                    type="reset" 
                    onClick={() => formik.resetForm()}
                >
                    Resetear
                </Button>
             </div>
        </form>
        
    );
}

export default NewClientForm;