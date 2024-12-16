
// Componente de layout para las páginas de autenticación
export default function AuthLayout({ children }) {
    return (
        <div className="flex justify-center items-center h-screen flex-row ">
        <div className="w-1/2 bg-neutral-900 h-full">
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-white text-4xl font-bold">Gabrisp</h1>
            </div>
        </div>
        <div className="w-1/2 bg-neutral-50 h-full">
                {children}
            </div>
        </div>
    )
}