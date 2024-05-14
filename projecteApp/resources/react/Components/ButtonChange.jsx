import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
export const ButtonChange = ({handleClick,agregarContent,quitarContent,id,agregado}) => {
    const [isAgregado, setIsAgregado] = useState(agregado);

    const handleButtonClick = () => {
        setIsAgregado(!isAgregado); // Cambia el estado interno cuando se hace clic en el botón
        handleClick(id); // Llama a la función de manejo del botón en el componente padre
    };

    return (
        <input 
            type="button" 
            value={isAgregado ? quitarContent : agregarContent} 
            className={`p-1 text-white cursor-pointer rounded-xl bg-blue1 hover:${isAgregado ? 'bg-red-700' : 'bg-cyan-600'} active:${isAgregado ? 'bg-red-500' : 'bg-cyan-800'} w-[50%] mx-auto my-1 mb-2`} 
            onClick={handleButtonClick} 
            id={id}
        />
    );
}
