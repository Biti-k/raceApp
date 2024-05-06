

import { Icon } from "@iconify/react/dist/iconify.js";
export const Button = ({handleClick})=> {
    return (
        <button
            className="block select-none rounded-lg w-full bg-blue1 py-3.5 px-2 text-center align-middle text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg hover:shadow-blue1/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16"
            type="button"
            data-ripple-light="true"
            onClick={handleClick}
            >
            Modificar <Icon icon="material-symbols:edit-document-rounded" className="inline text-2xl align-middle text-blue2"/>
        </button>
    );
}
