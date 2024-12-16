"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';

// Components
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import RowLoader from '@/components/UI/RowLoader';


// Componente de formulario de verificación
export default function VerificationForm({ onSubmit, error }) {
    const formik = useFormik({
        initialValues: {
            token1: '',
            token2: '',
            token3: '',
            token4: '',
            token5: '',
            token6: '',
        },
        validationSchema: Yup.object({
            token1: Yup.number().required('Token is required'),
            token2: Yup.number().required('Token is required'),
            token3: Yup.number().required('Token is required'),
            token4: Yup.number().required('Token is required'),
            token5: Yup.number().required('Token is required'),
            token6: Yup.number().required('Token is required'),
        }),
        onSubmit: async (values) => {
            await onSubmit(values);
        },
    });

    // Create refs for each input field
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // Handler to move focus to the next input when a character is entered
    const handleChange = (e, index) => {
        formik.handleChange(e);
        // Move to the next input if the current one is filled
        if (e.target.value.length === 1 && inputRefs[index + 1]) {
            inputRefs[index + 1].current.focus();
        }
    };

    // Handler to move focus to the previous input when backspace is pressed
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !formik.values[`token${index + 1}`] && inputRefs[index - 1]) {
            inputRefs[index - 1].current.focus();
        }
    };

    // Auto-focus the first empty input when the wrapper is clicked
    const handleWrapperClick = () => {
        const firstEmptyInputIndex = Object.keys(formik.values).findIndex(
            (key) => formik.values[key] === ''
        );
        if (firstEmptyInputIndex !== -1) {
            inputRefs[firstEmptyInputIndex].current.focus();
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>

            <h2 className="text-lg font-bold mb-2">Verifica tu cuenta</h2>
            <p className="text-sm text-gray-500 mb-6">Te hemos enviado un código de verificación a tu correo electrónico. Por favor, ingresa el código a continuación para verificar tu cuenta.</p>
            <div
                className="flex flex-row justify-between gap-4"
                onClick={handleWrapperClick} 
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <Input
                        key={index}
                        type="text"
                        maxLength="1"
                        placeholder=""
                        label=""
                        id={`token${index + 1}`}
                        error={error !== null ? error : null}
                        name={`token${index + 1}`}
                        className="w-1/6 h-12 text-center"
                        value={formik.values[`token${index + 1}`]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)} 
                        ref={inputRefs[index]} 
                    />
                ))}
            </div>
            <Button type="submit" className="w-full flex justify-center items-center relative h-[40px] text-white">{formik.isSubmitting ? <RowLoader /> : 'Verificar'}</Button>
            {error && <p className="text-red-500 text-sm mt-2">{`${error.path}: ${error.msg}`}</p>}
        </form>
    );
}
