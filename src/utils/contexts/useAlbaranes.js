"use client"
import { createContext, useContext, useState, useEffect } from "react";
import APIConnect from "@/utils/APIConnect";

const AlbaranesContext = createContext();

export const AlbaranesProvider = ({children}) => {
    const [albaranes, setAlbaranes] = useState([]);
    const [currentAlbaran, setCurrentAlbaran] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      
        (async()=>{  
            setLoading(true);
            const response = await APIConnect.deliveryNote.get();
            console.log(response);
            setLoading(false)
            setAlbaranes(response);
        })();

    }, [reload]);
    return (
        <AlbaranesContext.Provider value={{albaranes, setAlbaranes, currentAlbaran, setCurrentAlbaran, reload, setReload, loading, setLoading}}>
            {children}
        </AlbaranesContext.Provider>
    )
}
export const useAlbaranes = () => {
    return useContext(AlbaranesContext);
}