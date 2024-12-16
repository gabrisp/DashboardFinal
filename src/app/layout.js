import "./globals.css";


export const metadata = {
  title: "Dashboard",
  description: "Dashboard de la aplicación",
};

// Componente de layout para la aplicación
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="min-h-screen bg-neutral-50" >{children}</body>
    </html>
  );
}
