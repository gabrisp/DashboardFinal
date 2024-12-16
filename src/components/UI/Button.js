

// Componente de botón 
export default function Button({ children, className = "text-white", ...props }) {
  return (
    <button
      className={`bg-neutral-900 rounded-lg px-4 py-2 transition-opacity hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 