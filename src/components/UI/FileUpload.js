"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/UI/Loader";
import APIConnect from "@/utils/APIConnect";

// Componente de subida de logo
const UpdateClientLogo = ({ clientId, token, initialLogo, disabled = false }) => {

    const [previewUrl, setPreviewUrl] = useState(initialLogo || null); // Estado de la URL de la imagen
    const [dragging, setDragging] = useState(false); // Estado de la subida de la imagen
    const [isUploading, setIsUploading] = useState(false); // Estado de la subida de la imagen

    useEffect(() => {
        // Logo inicial
        if (initialLogo) {
            setPreviewUrl(initialLogo); // Setear la URL de la imagen
        }
    }, [initialLogo]);

    const handleFileUpload = async (file) => {
        if (!file || disabled) return; // Si no hay archivo o el cliente está deshabilitado, retornar
        setIsUploading(true); // Setear el estado de la subida de la imagen
        const response = await APIConnect.clients.uploadLogo(clientId, file);   
        setIsUploading(false); // Setear el estado de la subida de la imagen
    };

    // Manejar el cambio de la imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            handleFileUpload(file); // Subida automática
        }
    };

    const handleDrop = (e) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            handleFileUpload(file); // Subida automática
        }
    };

    // Manejar el arrastre sobre el area
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    // Manejar el leave sobre el area
    const handleDragLeave = () => {
        setDragging(false);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Drag-and-Drop area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`w-full h-auto flex flex-col items-center justify-center border-[1px] border-solid rounded-lg cursor-pointer transition relative z-0`}
            >
                {dragging && !disabled && <div className="absolute inset-0 bg-neutral-500 opacity-50 rounded-lg"></div>}
                {previewUrl ? (
                   <>
                   
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className={`${isUploading ? "opacity-50" : ""} w-full h-full object-cover rounded-lg`}
                        />
                        {isUploading && <div className="absolute inset-0 flex items-center justify-center">
                            <Loader />
                        </div>}
                    </>
                ) : (
                    <p className="text-sm text-gray-600">
                        Drag & Drop your file here or click to select
                    </p>
                )}
                <input
                    disabled={isUploading || disabled}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

           
        </div>
    );
};

export default UpdateClientLogo;
