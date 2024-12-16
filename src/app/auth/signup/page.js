"use client";

import { useRouter } from "next/navigation";
import SignUp from "@/components/Authentication/SignUp/SignUp";
import LocalStorageManager from "../../../utils/localStorage";

// Componente de la página de registro
export default function SignUpPage() {
    const router = useRouter(); // Router para redirigir a la página de dashboard si el usuario ya está autenticado
    const token = LocalStorageManager.getToken(); // Token para verificar si el usuario ya está autenticado
    if (!token){
        return <SignUp />;
    }
}