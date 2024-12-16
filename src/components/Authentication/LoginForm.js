"use client";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import APIConnect from "@/utils/APIConnect";
import LocalStorageManager from "@/utils/localStorage";

// Componente de formulario de login
export default function Login() {

    const validationSchema = Yup.object({ // Validación del formulario
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(APIConnect);
            console.log(values);
            const loginToken = await APIConnect.user.login(values.email, values.password);
            console.log(loginToken);
            const user = await APIConnect.user.get(loginToken.token);
            LocalStorageManager.setUser(user);
        },
    });

    return (
       <>
        <div className="flex justify-center items-center h-screen flex-col">
            <div className="w-2/3 p-4 rounded-md" >
                <form onSubmit={formik.handleSubmit}>
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
                    <Button type="submit" className="w-full text-white">Iniciar sesión</Button>
                    <p className="text-sm text-gray-500 mt-4">No tienes una cuenta? <Link href="/auth/signup" className="text-blue-500 ">Registrarse</Link></p>
                </form>
            </div>
        </div>
       </>
    )
};


