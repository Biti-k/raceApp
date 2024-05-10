import { Icon } from "@iconify/react/dist/iconify.js";
import axios from 'axios';
import { useState } from 'react';

export const ModalDelete = ({ isOpen, closeModal, object , id, url}) => {
    if (!isOpen) return null;
    
    const [ok, setOk] = useState(true);

    const handleDelete = async ()=>{
      try{

        const response = await axios.post(url, {id: object[id]});

        if(response.data.delete != 1){
          setOk(false);  
        }else{
          closeModal();
        }

      }catch (e){
        console.error(e);
        setOk(false);
      }
    }


    return (
      <>
       <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>&times;</span> */}
            <div className="flex flex-col justify-evenly w-[100%] h-[100%] ">
              <div className=" block px-8">
                <h1 className=' text-2xl text-blue1'>Eliminar</h1>
                <p>Estas segur que vols elimiar l'element ?</p>
                {!ok ? <p>Error en la eliminació</p> : null}
              </div>
              <div className="flex justify-evenly">
                <button
                className="block px-2 select-none rounded-lg w-[40%] bg-delete-red py-2 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg hover:shadow-red-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
                type="button"
                data-ripple-light="true"
                onClick={handleDelete}
                >
                  <p className="inline transition duration-500">Eliminar</p> <Icon icon="material-symbols:delete-forever-rounded" className="inline text-2xl align-middle transition duration-500 text-blue2 "/>    
                </button>
                <button
                className="block px-2 select-none rounded-lg w-[40%] bg-blue1 py-2 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
                type="button"
                data-ripple-light="true"
                onClick={closeModal}
                >
                  <p className="inline transition duration-500">Cancelar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ModalDelete;