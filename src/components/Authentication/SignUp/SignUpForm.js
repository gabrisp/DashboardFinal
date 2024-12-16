"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import RowLoader from '@/components/UI/RowLoader';

// Componente de formulario de registro
export default function SignUpForm({onSubmit, error, setData}) {
    const formik = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fName: Yup.string().required('First Name is required'),
            lName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            setData(values);
           await onSubmit(values);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-between gap-4">
            <Input wrapperClassName="grow" 
            type="text" placeholder="Nombre" 
            label="" 
            id="fName" 
            name="fName" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            value={formik.values.fName} 
            error={formik.errors.fName && formik.touched.fName ? formik.errors.fName : null}
            />
            <Input 
            wrapperClassName="grow" 
            type="text" 
            placeholder="Apellido" 
            label="" 
            id="lName" 
            name="lName" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            value={formik.values.lName} 
            error={formik.errors.lName && formik.touched.lName ? formik.errors.lName : null}
            />
        </div>
        <Input 
        type="email" 
        placeholder="Email" 
        label="" 
        id="email" 
        name="email" 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        value={formik.values.email} 
        error={formik.errors.email && formik.touched.email ? formik.errors.email : null}
        />
        <Input 
        type="password" 
        placeholder="Contraseña" 
        label="" 
        id="password" 
        name="password" 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        value={formik.values.password} 
        error={formik.errors.password && formik.touched.password ? formik.errors.password : null}
        />
        <Button type="submit" className="w-full flex text-white justify-center items-center relative h-[40px]">{formik.isSubmitting ? <RowLoader /> : 'Registrarse'}</Button>
        {error && <p className="text-red-500 text-sm mt-2">{`${error.path}: ${error.msg}`}</p>}
    </form>
    )
};