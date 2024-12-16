"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import APIConnect from '@/utils/APIConnect';

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState(null);
    const [reload, setReload] = useState(false); 
    const [currentClient, setCurrentClient] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchClients = async () => {
        setLoading(true);
        const clientsFetch = await APIConnect.clients.get();
        setClients(clientsFetch);
        setReload(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchClients();
    }, [reload]); 
    return (
        <ClientsContext.Provider value={{ clients, setReload, currentClient, setCurrentClient, loading, setLoading }}>
            {children}
        </ClientsContext.Provider>
    );
};

export const useClients = () => {
    return useContext(ClientsContext);
};