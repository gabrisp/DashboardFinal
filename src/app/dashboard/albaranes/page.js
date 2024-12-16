"use client"
import AlbaranesTable from "@/components/Albaranes/AlbaranesTable";
import { useAlbaranes } from "@/utils/contexts/useAlbaranes";

export default function AlbaranesPage() {
    const { albaranes, loading } = useAlbaranes();
    return (
        <AlbaranesTable albaranes={albaranes} loading={loading} />
    )
}