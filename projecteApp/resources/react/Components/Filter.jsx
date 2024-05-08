import { Icon } from "@iconify/react/dist/iconify.js";
import { InputSearch } from "./InputSearch";
import {useState, useEffect} from "react";

export const Filter = ({props_filtros, setFiltros})=> {
    const [iconLugar,setIconLugar] = useState('material-symbols-light:arrow-drop-down');
    const [iconFecha, setIconFecha] = useState("material-symbols-light:arrow-drop-down");
    

    useEffect(() => {
        console.log(props_filtros);
    }, [])

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

    const mostrarFecha = () => {
        if($("#buscar-fecha").is(":hidden")){
            $("#buscar-fecha").show(100);
            $("#icono-fecha").prop("icon")
            setIconFecha("material-symbols-light:arrow-drop-up")
        }else{
            $("#buscar-fecha").hide(100);
            setIconFecha("material-symbols-light:arrow-drop-down")
        }    
    }

    const aplicarFiltros = () => {
        
    }

    const handleInput = (value, name) => {
        let copiedObject = JSON.parse(JSON.stringify(props_filtros));
        copiedObject[name] = value;
        setFiltros(copiedObject);
    }

    const limpiarFiltros = () => {
        setFiltros({"cur_lloc" : '', "cur_nom" : ''});
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
                        <p className="underline cursor-pointer" onClick={limpiarFiltros}>Netejar</p>
                    </div>
                </div>
                Cercar per nom
                <div className="flex w-full">
                    <InputSearch placeholder={'Buscar... 🔎'} handleChange={handleInput} value={props_filtros.cur_nom} name="cur_nom" ></InputSearch>
                </div>
                <hr className="my-2 shadow-sm border-darkmetal/50"></hr>
                <div>
                    <p className="cursor-pointer" onClick={mostrarLugar}>
                    Cercar per lloc <Icon icon={iconLugar} className="inline-block text-2xl text-blue2" id="icono-lugar" />
                    </p>
                    <div className="hidden" id="buscar-lugar">
                        <div className="flex w-full">
                            <InputSearch placeholder={'Buscar... 🔎'} handleChange={handleInput} value={props_filtros.cur_lloc} name="cur_lloc"></InputSearch>
                        </div>
                    </div>

                </div>
                <hr className="my-2 shadow-sm border-darkmetal/50"></hr>
            </div>
        </div>
        </>
    );
}