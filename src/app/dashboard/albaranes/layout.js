import LayoutContent from "@/components/UI/LayoutContent/LayoutContent";
import { AlbaranesProvider } from "@/utils/contexts/useAlbaranes";

// Componente de layout para las páginas de albaranes
export default function AlbaranesLayout({ children }) {
    return (
        <LayoutContent title="Albaranes">
            <AlbaranesProvider> {/* Proveedor de albaranes */}
                {children}
            </AlbaranesProvider>
        </LayoutContent>
    )
}