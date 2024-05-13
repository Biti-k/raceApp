import { Icon } from "@iconify/react/dist/iconify.js";
import axios from 'axios';
import { useState } from 'react';

export const ModalNewCheckPoint = ({ isOpen, closeModal, circuit, data}) => {
    if (!isOpen) return null;



    return (
      <>
       <div className="modal">
          <div className="modal-content-check modal-content">
            {/* <span className="close" onClick={closeModal}>&times;</span> */}
            <div className="flex flex-col justify-evenly w-[100%] h-[100%] ">
              <div className=" block px-8">
                <h1 className=' text-2xl text-blue1'>Check Point</h1>
                <p></p>

              </div>
              <div className="flex justify-evenly">
                <button
                className="block px-2 select-none rounded-lg w-[40%] bg-blue1 py-2 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
                type="button"
                data-ripple-light="true"
                >
                  <p className="inline transition duration-500">Añadir</p>    
                </button>
                <button
                className="block px-2 select-none rounded-lg w-[40%] bg-gray-500 py-2 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
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

export default ModalNewCheckPoint;