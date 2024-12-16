"use client"
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";

// Componente de la página de inicio
export default function Home() {
  const router = useRouter();
  const token = LocalStorageManager.getToken();

  if (!token) router.push("/auth");
  if (token) router.push("/dashboard");
  return  null;
}
