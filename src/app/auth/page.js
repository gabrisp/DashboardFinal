"use client";

import LoginForm from "@/components/Authentication/LoginForm";
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";

// Componente de la página de autenticación (Login)
const AuthPage = () => {
    const router = useRouter(); // Router para redirigir a la página de dashboard si el usuario ya está autenticado
    const token = LocalStorageManager.getToken(); // Token para verificar si el usuario ya está autenticado
    if (token){ // Si el token existe, redirigir a la página de dashboard
        router.push("/dashboard");
    } else { // Si el token no existe, mostrar el componente de login
        return <LoginForm />;
    }
}

export default AuthPage;