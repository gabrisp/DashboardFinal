import RowLoader from "../RowLoader";
import { useState } from "react";

// Componente de select
const Select = (props) => {
	const {label, options, loading, setSelectedOption, selectedOption, disabled, field, error} = props; // Obtener las props
	const [showOption, setShowOption] = useState(false); // Estado de la lista de opciones
	
	function isSelected(option){
		return selectedOption === option; // Verificar si la opción está seleccionada
	}
	
	function selectOption(option){
		setSelectedOption(field, option); // Seleccionar la opción
		setShowOption(false); // Ocultar la lista de opciones
	}
	
	return (
		<div className=" flex flex-col gap-2 relative w-full" disabled={disabled}>
			<div 
				className={`flex justify-center items-center border rounded-md font-light  ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${error ? "bg-red-50 border-red-500 text-red-500" : "border-neutral-300 bg-neutral-100 text-neutral-400"} p-2 `}
				onClick={()=>{ if(disabled) return;setShowOption(!showOption)}}
				disabled={disabled}
			>
				{!disabled && loading && <div className="flex justify-center items-center text-xs pt-2">
               <RowLoader />
            </div>}
				
				{(!loading && <span className={`${selectedOption ? "text-neutral-800" : "text-neutral-400"} text-xs`}>{disabled ? "Selecciona un cliente primero" : selectedOption ? selectedOption.name : label}</span>)}
			</div>
            
			{!loading && showOption && (
				<div className=" flex flex-col gap-0 absolute z-10 top-10 left-0 w-full rounded-md shadow-md  border border-neutral-300 overflow-hidden">
					{options.map(option => (
						<div 
							className={"flex justify-between cursor-pointer items-center border-neutral-300 border-b last:border-b-0 p-2 " + (isSelected(option) ? "bg-neutral-800 text-neutral-100" : "bg-neutral-100 text-neutral-800")}
							onClick={()=>selectOption(option)}
							disabled={disabled}
							key={option._id}
						>
							<span className="font-light text-xs"> {option.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default Select;