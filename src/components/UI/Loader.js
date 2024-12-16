import React from 'react';

// Componente de loader
const Loader = () => {
    return (
       <span className="loader h-12 w-12 before:h-12 before:w-12 before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-neutral-500 before:animate-animloader before:delay-500"></span>
    );
};

export default Loader;

