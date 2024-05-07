import { Icon } from "@iconify/react/dist/iconify.js";
import { InputSearch } from "./InputSearch";
import {useState} from "react";

export const Filter = ()=> {
    const [iconLugar,setIconLugar] = useState('material-symbols-light:arrow-drop-down');

    const mostrarFiltros = () => {
        if($("#filtros").is(":hidden")){
            $("#filtros").show();
            
        }else{
            $("#filtros").hide();
            
        }
        
    }

    const mostrarLugar = () => {
        if($("#buscar-lugar").is(":hidden")){
            $("#buscar-lugar").show(100);
            $("#icono-lugar").prop("icon")
            setIconLugar("material-symbols-light:arrow-drop-up")
        }else{
            $("#buscar-lugar").hide(100);
            setIconLugar("material-symbols-light:arrow-drop-down")
        }    
    }


    return (
        <>
        <div className="relative p-1 mx-auto mb-6 rounded-md shadow-lg select-none w-52 bg-blue1 border-grey">
            <p className="flex items-center justify-between text-2xl cursor-pointer text-blue2" id="filtrar" onClick={mostrarFiltros}>
                Filtrar <Icon icon="material-symbols-light:arrow-drop-down" className="inline-block text-2xl text-blue2"/>
            </p>
            <div className="hidden left-[50%] translate-x-[-50%] absolute top-[110%] min-h-[150px] bg-grey shadow-lg shadow-blue2 border-blue1/50 border-[3px] rounded w-72 z-10 text-blue2 p-2" id="filtros">
                <div className="flex justify-between mb-2">
                    Filtros
                    <div className="flex gap-3 text-blue2">
                        <p className="underline cursor-pointer">Aplicar</p>
                        <p className="underline cursor-pointer">Limpiar</p>
                    </div>
                </div>
                Buscar por nombre
                <div className="flex w-full">
                    <InputSearch placeholder={'Buscar... 🔎'}></InputSearch>
                </div>
                <hr className="my-2 shadow-sm border-darkmetal/50"></hr>
                <div>
                    <p className="cursor-pointer" onClick={mostrarLugar}>
                    Buscar por lugar <Icon icon={iconLugar} className="inline-block text-2xl text-blue2" id="icono-lugar" />
                    </p>
                    <div class="hidden" id="buscar-lugar">
                        <div className="flex w-full">
                            <InputSearch placeholder={'Buscar... 🔎'}></InputSearch>
                        </div>
                        <hr className="my-2 shadow-sm border-darkmetal/50"></hr>
                    </div>

                </div>

            </div>
        </div>
        </>
    );
}