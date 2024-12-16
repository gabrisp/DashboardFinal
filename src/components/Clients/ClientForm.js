"use client";
import Input from "../UI/Input";

// Componente de formulario de cliente, solo incluye inputs el formulario de cliente se maneja en otro lado
const ClientForm = ({ formik }) => {

    return (
        <>
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
        </>
    );
}

export default ClientForm;