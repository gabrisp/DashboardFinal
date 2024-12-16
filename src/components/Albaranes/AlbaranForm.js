"use client";


import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import APIConnect from "@/utils/APIConnect";
import { useClients } from "@/utils/contexts/useClients";
import { useProjects } from "@/utils/contexts/useProjects";
import Select from "@/components/UI/Select/Select";



// Componente de formulario de albaranes
const AlbaranForm = ({className = "w-4/6"}) => {

    const {projects, loading: projectsLoading} = useProjects(); // Obtener los proyectos
    const {clients, loading: clientsLoading} = useClients(); // Obtener los clientes
    

    
    const formik = useFormik({
        initialValues: {
            hours: "",
            format: "",
            description: "",
            clientId:  "",
            projectId:  "",
            date: "",
            material: "",
        },
        validationSchema: Yup.object({
            hours: Yup.number().required("Las horas son requeridas"),
            clientId: Yup.object().required("El cliente es requerido"),
            projectId: Yup.object().required("El proyecto es requerido"),
            format: Yup.object().required("El formato es requerido"),
            description: Yup.string().required("La descripción es requerida"),
            date: Yup.string().required("La fecha es requerida"),
            material: Yup.string().required("El material es requerido"),
        }),
        onSubmit: async (values ) => {
            console.log(values);
            const data = {
                hours: values.hours,
                format: values.format === "material" ? "material" : "hours",
                description: values.description,
                projectId: values.projectId._id,
                clientId: values.clientId._id,
                workdate: (() => {
                    const date = new Date(values.date);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
                    const year = String(date.getFullYear()).slice(-2); // Obtener los últimos 2 dígitos del año
                    return `${day}-${month}-${year}`;
                })(),
                material: values.material,
            }
            let response;
            response = await APIConnect.deliveryNote.create(data); // Crear el albarán
            if (response._id) {
                setReload(true);
            
                
                formik.resetForm(); // Reset
                formik.setTouched({}); // Unfocus 
            }
            console.log(response);
            
        }
    });

    return (<>
        <form onSubmit={formik.handleSubmit} className={`flex flex-col items-center justify-center ${className}`}>
            <div className="flex flex-row gap-2 w-full mb-4">
                <Select 
                    error={formik.errors.clientId && formik.touched.clientId ? formik.errors.clientId : null} 
                    label="Cliente" 
                    disabled={false}
                    options={clients ? clients : []} 
                    loading={clientsLoading} 
                    setSelectedOption={formik.setFieldValue} 
                    selectedOption={formik.values.clientId}
                    field="clientId"
                />
                <Select 
                    error={formik.errors.projectId && formik.touched.projectId ? formik.errors.projectId : null} 
                    label="Proyecto" 
                    disabled={!formik.values.clientId}
                    options={clients && projects ? projects.filter(project => project.clientId === formik.values.clientId._id) : []} 
                    loading={projectsLoading} 
                    setSelectedOption={formik.setFieldValue} 
                    selectedOption={formik.values.projectId}
                    field="projectId"
                />
            </div>
        <div className="flex flex-row gap-2 w-full">
            <Input wrapperClassName="w-full" placeholder="Hours" type="number" name="hours" value={formik.values.hours} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.hours && formik.touched.hours ? formik.errors.hours : null}/>
            <Select error={formik.errors.format && formik.touched.format ? formik.errors.format : null} label="Formato" options={[{_id: 0, name: "material"}, {_id: 1, name: "hora"}]} loading={false} disabled={false} setSelectedOption={formik.setFieldValue} selectedOption={formik.values.format} field="format"/>
        </div>
        <div className="flex flex-row gap-2 w-full">
        <Input
                wrapperClassName="w-full"
                placeholder="Fecha"
                name="date"
                type="date"
                value={formik.values.date}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date ? formik.errors.date : null}
            />
             <Input
                wrapperClassName="w-full"
                placeholder="Material"
                name="material"
                type="text"
                value={formik.values.material}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.errors.material && formik.touched.material ? formik.errors.material : null}
            />
        </div>
            <Input wrapperClassName="w-full" placeholder="Description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.description && formik.touched.description ? formik.errors.description : null}/>
            <Button className="w-full text-white text-xs" type="submit">{"Crear"}</Button>
        </form>
    </>)
}

export default AlbaranForm;