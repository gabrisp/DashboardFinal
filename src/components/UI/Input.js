
import React from 'react';

// Componente de input
const Input = React.forwardRef(({ type, placeholder, value, onChange, className, label, error, id, labelClassName, wrapperClassName, ...props }, ref) => {
    return (
        <div className={`mb-4 ${wrapperClassName || ""}`}>
            {label && (
                <label htmlFor={id} className={`block text-sm font-medium text-neutral-500 ${labelClassName || ""}`}>
                    {label}
                </label>
            )}
            <input
                type={type}
                ref={ref}  // Forward the ref to the input element
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border text-xs font-light w-full box-border rounded-md p-2 focus:outline-none focus:border-neutral-900 ${error ? "border-red-500 bg-red-100 shake placeholder-red-500" : "bg-neutral-100  border-neutral-300  "} ${className || ""}`}
                {...props}
            />
        </div>
    );
});

export default Input;

 
//              {error && (<span className="text-red-500 text-sm">{error}</span>)}