import {useEffect, useState} from 'react';
import ModalNewCheckPoint from './ModalNewCheckPoint';

export const CheckPointsList = ({cursa, circuit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkPoints, setCheckPoints] = useState(circuit.checkpoints); 


    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className='flex flex-wrap justify-center w-[100%]'>
            <div className='w-full'>
                <h1 className='mb-3 text-2xl text-center text-blue1'>Check Points</h1>
                {/* <div onClick={openModal} className='flex mb-4 justify-center items-center p-5 w-fit h-[40px] rounded-xl cursor-pointer bg-blue1 hover:bg-cyan-600 active:bg-cyan-800 text-white select-none'>New Checkpoint</div>
                <ModalNewCheckPoint isOpen={isModalOpen} closeModal={closeModal} circuit={circuit} data={null} /> */}
            </div>
            <table className='check-table w-[100%]'>
                <thead>
                    <tr>
                        <td>Check num</td>
                        <td>Punt Km</td>
                        {/* <td>Actions</td> */}
                    </tr>
                </thead>
                <tbody>
                    {checkPoints.map((check , index) =>
                        <tr key={check.chk_id}>
                            <td>{index + 1}</td>
                            <td>{check.chk_pk}</td>
                            {/* <td>edit, delete</td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CheckPointsList;