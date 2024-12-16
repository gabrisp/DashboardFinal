"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import APIConnect from "@/utils/APIConnect";
const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [reload, setReload] = useState(false);
    const [currentProject, setCurrentProject] = useState(undefined);
    
    const getProjects = async () => {
        setLoading(true);
        const response = await APIConnect.projects.get();
        const newResponse = await Promise.all(response.map(async (project) => {
            const client = await APIConnect.clients.getOne(project.clientId);
            project.client = client;
            return project;
        }));
        console.log(newResponse);
        setProjects(newResponse);
        setLoading(false);
    }

    useEffect(() => {
        getProjects();
    }, [reload]);

    return <ProjectsContext.Provider value={{ projects, setProjects, loading, error, search, setSearch, reload, setReload, currentProject, setCurrentProject }}>{children}</ProjectsContext.Provider>;
}

export const useProjects = () => {
    return useContext(ProjectsContext);
}