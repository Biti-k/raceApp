import { Icon } from "@iconify/react/dist/iconify.js";
import axios from 'axios';
import { useState } from 'react';

export const ModalShowRegistres = ({ isOpen, closeModal, inscripcio , participant}) => {    
    const [ok, setOk] = useState(true);
    return (
      <>
       <div className="hidden modal-registres" id={"modal" + inscripcio.ins_id}>
          <div className="modal-content-registres w-[85%]">
            {/* <span className="close" onClick={closeModal}>&times;</span> */}
            <div className="w-[100%] h-[100%] flex flex-col justify-between">
              <div className="block px-8 ">
                <table className='table-inscrits border-spacinplaceholder-gray-400 w-[100%]'>
                  <thead>
                    <tr>
                      <th>Checkpoint km</th>
                      <th>Temps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      inscripcio.registres.map(r => 
                        <tr key={r.reg_id}>
                          <td className='text-center'>{r.checkpoint.chk_pk}</td>
                          <td className='text-center'>{r.reg_temps}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <div className="flex justify-evenly">
                <button
                className="block px-2 select-none rounded-lg w-[40%] bg-blue1 py-2 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
                type="button"
                data-ripple-light="true"
                onClick={closeModal}
                >
                  <p className="inline transition duration-500">Cerrar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ModalShowRegistres;