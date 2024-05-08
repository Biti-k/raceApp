import { Icon } from "@iconify/react/dist/iconify.js";
import { ButtonDelete } from "./ButtonDelete";
import { Button } from "./Button";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ModalDelete from "./ModalDelete";

import '../css/main.css';

export const Card = ({cursa})=> {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const [img , setImg] = useState();
    const [mod , setMod] = useState();
    

    useEffect(()=>{
        if(cursa.cur_foto != null && cursa.cur_foto != '' ){
            setImg(window.location.origin+'/api/img/'+cursa.cur_foto);
        }
        setMod('/curses/cursa/'+cursa.cur_id);
    }, [])

    return (
        <>
            <div className="relative flex w-full max-w-[32%] max-h-[700px] flex-col justify-between rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                <div className="relative mx-4 mt-4 overflow-hidden shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border text-darkmetal shadow-blue-gray-500/40">
                        <img className="w-[100%] h-[500px] object-cover object-center" src={img} alt={cursa.cur_foto}></img>
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
                    </div>
                </div>
                <div className="p-6" >
                    <div className="flex items-center justify-between mb-3">
                    <h5 className="block text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                        {cursa.cur_nom}
                    </h5>

                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <p className="flex items-center gap-1.5  text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                        <Icon icon="fluent:people-queue-20-filled" className="text-2xl text-blue1"/>
                            ?/{cursa.cur_limit_inscr}
                        </p>
                        <p>
                            <Icon icon="ion:location-sharp" className="inline-block text-2xl text-blue1" />
                            {cursa.cur_lloc}
                        </p>
                        <p>
                            <Icon icon="mdi:web" className="inline-block text-2xl text-blue1" />
                            <a href={cursa.cur_web} target="_blank" className="underline transition duration-150 hover:text-blue1">Sitio web</a>
                        </p>

                    </div>
                    <p className="block text-base antialiased font-light leading-relaxed text-gray-700 min-h-[180px]">
                    {
                        cursa.cur_desc.length >= 300 ? cursa.cur_desc.substring(0,300) + "..." : cursa.cur_desc
                    }
                    </p>
                <div className="gap-1 p-6 pt-3 columns-2" id="botones">
                    <NavLink to={mod}>
                        <Button contenido={'Modificar'} icono={<Icon icon="material-symbols:edit-document-rounded" className="inline text-2xl align-middle text-blue2"/>}></Button>
                    </NavLink>
                    <ButtonDelete  handleClick={openModal} ></ButtonDelete>
                    <ModalDelete isOpen={isModalOpen} closeModal={closeModal} object={cursa} id="cur_id" url={delete_cursa}/>                    
                </div>
                </div>
            </div>
        </>
    );
}

export default Card;
