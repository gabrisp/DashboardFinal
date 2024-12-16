"use client";

import { useRouter } from "next/navigation";
import SignUp from "@/components/Authentication/SignUp/SignUp";
import LocalStorageManager from "../../../utils/localStorage";

// Componente de la página de registro
export default function SignUpPage() {
    const router = useRouter(); // Router para redirigir a la página de dashboard si el usuario ya está autenticado
    const token = LocalStorageManager.getToken(); // Token para verificar si el usuario ya está autenticado
    if (token){ // Si el token existe, redirigir a la página de dashboard
        router.push("/dashboard");
    }else{ // Si el token no existe, mostrar el componente de registro
        return <SignUp />;
    }
}