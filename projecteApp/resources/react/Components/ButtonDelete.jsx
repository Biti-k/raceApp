

import { Icon } from "@iconify/react/dist/iconify.js";
export const ButtonDelete = ({handleClick})=> {
    return (
        <>
            <button
            className="block px-2 select-none rounded-lg w-full bg-blue1 py-3.5 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg hover:shadow-red-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
            type="button"
            data-ripple-light="true"
            onClick={handleClick}
            >
            <p className="inline transition duration-500">Eliminar</p> <Icon icon="material-symbols:delete-forever-rounded" className="inline text-2xl align-middle transition duration-500 text-blue2 group-hover:text-red-500"/>    
            </button>
        </>
    );
}
