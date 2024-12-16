"use client"
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Componente de la página de inicio
export default function Home() {
  const router = useRouter();
  const token = LocalStorageManager.getToken();

  useEffect(() => {
    if (!token) {
      router.push("/auth");
    } else {
      router.push("/dashboard");
    }
  }, [token, router]);

  return null;
}
