"use client"

import Link from "next/link";
import { useState } from "react";

// Components
import SignUpForm from "./SignUpForm";
import VerificationForm from "./VerificationForm";
import APIConnect from "@/utils/APIConnect";
import LocalStorageManager from "@/utils/localStorage";

// Componente de registro
export default function SignUp() {
    
    const [verificationForm, setVerificationForm] = useState(false); // Estado del formulario de verificación
    const [token, setToken] = useState(null); // Token de verificación
    const [error, setError] = useState(null); // Error de verificación
    const [data, setData] = useState({}); // Datos del usuario

    const registerSubmit = async (values) => { // Función de registro
        const registerToken = await APIConnect.user.create(values.fName, values.lName, values.email, values.password);
        console.log(registerToken); 
        if (registerToken.errors) { // Si hay errores
            setError(registerToken.errors[0]); // Establecer el error
        } else {
            setVerificationForm(true); // Mostrar el formulario de verificación
            setToken(registerToken.token); // Establecer el token
            setError(null); // Limpiar el error
        }
    };

    const validateSubmit = async (values) => {
        try {
            // Concatenar los valores del token
            const code = values.token1 + values.token2 + values.token3 + values.token4 + values.token5 + values.token6;
    
            const validateTokenResponse = await APIConnect.user.validate(code, token, data); // Llamar a la función de validación y esperar la respuesta
            console.log("Validation successful:", validateTokenResponse);
            LocalStorageManager.setToken(validateTokenResponse.token); // Establecer el token en el localStorage
            return validateTokenResponse;
        } catch (error) {
            console.error("Error during validation:", error.message); // Log de errores
            setError({path: "token", msg: "Token incorrecto"}); // Establecer el error
        }
    };
    

    return (
       <>
        <div className="flex justify-center items-center h-screen flex-col">
            <div className="w-2/3" >
                {verificationForm ? (
                    <VerificationForm onSubmit={validateSubmit} error={error} />
                ) : (
                    <>
                        <SignUpForm onSubmit={registerSubmit} error={error} setData={setData} />
                        <p className="text-sm text-gray-500 mt-4">Ya tienes una cuenta? <Link href="/auth" className="text-blue-500 ">Iniciar sesión</Link></p>
                    </>
                )}
            </div>
        </div>
       </>
    )
};



