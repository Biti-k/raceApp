import {useEffect, useState} from 'react';
import ModalNewCheckPoint from './ModalNewCheckPoint';
import { useFetcher } from 'react-router-dom';

export const CheckPointsList = ({cursa, circuit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [checkPoints, setCheckPoints] = useState(circuit.checkpoints); 
    const [checkPointsLocal, setCheckPointsLocal] = useState(circuit.checkpoints); 
    
    const [maxPages, setMaxPages] = useState(0); 
    const [page, setPage] = useState(0);
    const numberPage = 10;
    

    useEffect(()=>{

        let checks = checkPointsLocal.map((ele, i)=> { ele.chk_num = i +1 ; return ele});
        setCheckPointsLocal(checks);


        setMaxPages(Math.ceil(checkPointsLocal.length/numberPage));
        let check = checkPointsLocal.slice(numberPage*page,(numberPage*page) + numberPage);
        setCheckPoints([...check]);

    }, [])
    
    const handleNext = (evt)=>{
        evt.preventDefault();

        let new_page = page + 1;
        if(new_page < maxPages){
            setPage(new_page);
            let check = checkPointsLocal.slice(numberPage*new_page,(numberPage*new_page) + numberPage);
            setCheckPoints([...check]);
        }
    }
    const handlePrevious = (evt)=>{
        evt.preventDefault();

        let new_page = page - 1;
        if(new_page >= 0){
            setPage(new_page);
            let check = checkPointsLocal.slice(numberPage*new_page,(numberPage*new_page) + numberPage);
            setCheckPoints([...check]);
        }
    }

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
                            <td>{check.chk_num}</td>
                            <td>{check.chk_pk}</td>
                            {/* <td>edit, delete</td> */}
                        </tr>
                    )}
                </tbody>
            </table>

            <div className='w-full'>
                <div className='flex justify-between w-full'>
                    <span>Page: {page+1}</span>
                    <span>Pages: {maxPages}</span>
                </div>
                <div className='flex justify-evenly w-full'>
                    <button onClick={handlePrevious} className=' w-[100px] rounded-xl bg-blue1 text-white px-2 py-1 m-2 hover:bg-cyan-600 active:bg-cyan-700'>Previous </button>
                    <button onClick={handleNext} className='w-[100px] rounded-xl bg-blue1 text-white px-2 py-1 m-2 hover:bg-cyan-600 active:bg-cyan-700'>Next</button>
                </div>
            </div>

        </div>
    );
}

export default CheckPointsList;