"use client";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import APIConnect from "@/utils/APIConnect";
import { useProjects } from "@/utils/contexts/useProjects";
import { useEffect } from "react";

// Componente de formulario de proyecto
const ProjectForm = ({className = "w-4/6", setReloadCurrentProject}) => {
    const { clientId } = useParams(); // Obtener el id del cliente
    const {setCurrentProject, currentProject, setReload} = useProjects(); // Obtener el proyecto actual y el estado de recarga
    const router = useRouter(); // Obtener el router
    useEffect(() => {
        if (currentProject) {
            formik.setValues({
                name: currentProject.name,
                email: currentProject.email,
                street: currentProject.address.street,
                number: currentProject.address.number,
                zipCode: currentProject.address.postal,
                city: currentProject.address.city,
                state: currentProject.address.province,
                internalCode: currentProject.code,
            });
        }
    }, [currentProject]);

    const formik = useFormik({
        initialValues: {
            name:  currentProject ? currentProject.name : "",
            email: currentProject ? currentProject.email : "",
            street: currentProject ? currentProject.address.street : "",
            number: currentProject ? currentProject.address.number : "",
            zipCode: currentProject ? currentProject.address.postal : "",
            city: currentProject ? currentProject.address.city : "",
            state: currentProject ? currentProject.address.province : "",
            internalCode: currentProject ? currentProject.internalCode : "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es requerido"),
            email: Yup.string().email("El email no es válido").required("El email es requerido"),
            street: Yup.string().required("La calle es requerida"),
            number: Yup.string().required("El número es requerido"),
            zipCode: Yup.string().required("El código postal es requerido"),
            city: Yup.string().required("La ciudad es requerida"),
            state: Yup.string().required("La provincia es requerida"),
            internalCode: Yup.string().required("El código interno es requerido"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const data = {
                name: values.name,
                projectCode: values.internalCode,
                email: values.email,
                address: {
                    street: values.street,
                    number: values.number,
                    postal: values.zipCode,
                    city: values.city,
                    province: values.state,
                   },
                code: values.internalCode,
                clientId: clientId,
            }
            let response;
            if (currentProject) {
                response = await APIConnect.projects.update(currentProject._id, data);
                setReloadCurrentProject(true);
            }else{
                response = await APIConnect.projects.create(data);
                if (response._id) {
                    setCurrentProject(response);
                    router.push(`/dashboard/proyectos`);
                }
            }
            setReload(true);
            formik.setTouched({}); // Unfocus all inputs
            console.log(response);
            
        }
    });

    return (<>
        <form onSubmit={formik.handleSubmit} className={`flex flex-col items-center justify-center ${className}`}>
            <Input wrapperClassName="w-full" placeholder="Nombre" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.name && formik.touched.name ? formik.errors.name : null}/>
            <Input wrapperClassName="w-full" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.email && formik.touched.email ? formik.errors.email : null}/>
        <div className="flex gap-2 w-full">
           <Input
                wrapperClassName="w-5/6 grow"
                placeholder="Calle"
                name="street"
                value={formik.values.street}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.errors.street && formik.touched.street ? formik.errors.street : null}
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
                onBlur={formik.handleBlur}
                error={formik.errors.city && formik.touched.city ? formik.errors.city : null}
            />
            <Input
                placeholder="Provincia"
                wrapperClassName="w-2/5 grow"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.state && formik.touched.state ? formik.errors.state : null}
            />
               <Input
                wrapperClassName="w-1/5 grow"
                placeholder="Código postal"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.zipCode && formik.touched.zipCode ? formik.errors.zipCode : null}
            />
          </div>
            <Input wrapperClassName="w-full" placeholder="Codigo Interno" name="internalCode" value={formik.values.internalCode} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.internalCode && formik.touched.internalCode ? formik.errors.internalCode : null}/>
            <Button className="w-full text-xs text-neutral-50 flex flex-row items-center justify-center gap-2 h-10 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">{currentProject ? "Editar" : "Crear"}</Button>
        </form>
    </>)
}

export default ProjectForm;