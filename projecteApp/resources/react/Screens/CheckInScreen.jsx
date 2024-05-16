import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';

export const CheckInScreen = () =>
{

    const { id } = useParams();

    const [inscrits, setInscrits] = useState([]);
    const [filteredinscrits, setFilteredInscrits] = useState([]);
    const [showInscrits, setShowInscrits] = useState([]);
    const [filter, setFilter] = useState('');
    const [load, setLoad] = useState(false);
    
    const getInscripcions = async ()=>{
    
        const response = await axios.get(get_all_inscripcions, {params: {cur_id : id}});
        let ins = response.data.inscripcions;
				setInscrits(ins);
				setList(ins);
				setLoad(true);
    }

    const loadPage = ()=>{
			getInscripcions();
    }


    useEffect(()=>{
      loadPage()
    },[id]);

    // const getSelects = async()=>{
		// 	const response = await axios.get(get_all_esports);
			
		// 	let select = []

		// 	response.data.esports.forEach((ele)=>{
		// 			select.push({title: ele.esp_nom, value: ele.esp_id});
		// 	});
			
		// 	setEsports(select);
    // }

		// const handleDeleteCircuit = (index)=>{
		// 	let data = circuits;
		// 	data.splice(index, 1);
		// 	data = data.map((ele, i) =>{
		// 		ele.cir_num = i+1;
		// 		return ele;
		// 	});
		// 	setCircuits([...data]);
		// }

    const handleChange = (evt)=>{
			const { name, value } = evt.target;
			
			let ins_filter = inscrits
			
			if(value.trim().length != 0){
				ins_filter = ins_filter.filter( element => {
					return (
						(element.ins_dorsal+'').toLowerCase().includes(value.toLowerCase()) ||
						(element.participant.par_nom+'').toLowerCase().includes(value.toLowerCase()) ||
						(element.participant.par_cognoms+'').toLowerCase().includes(value.toLowerCase()) ||
						(element.participant.par_telefon+'').toLowerCase().includes(value.toLowerCase()) ||
						(element.participant.par_nif+'').toLowerCase().includes(value.toLowerCase())
					)
				});
			}
			
			setFilter(value);
			setList(ins_filter)

    }

		const handleParticipa = async (ins_id)=>{
			const response = await axios.get(state_inscripcio, {params: {state : 'participa', inscripcio: ins_id}});
			let insc = inscrits;
			let inscripcio_nova = response.data.inscripcio;
			let index = insc.findIndex((ins)=>{ return inscripcio_nova.ins_id == ins.ins_id});
			insc[index] = inscripcio_nova;
			setInscrits([...insc]);
			setList(insc);
		}

		const handleRetirat = async (ins_id)=>{
			const response = await axios.get(state_inscripcio, {params: {state : 'retirat', inscripcio: ins_id}});
			let insc = inscrits;
			let inscripcio_nova = response.data.inscripcio;
			let index = insc.findIndex((ins)=>{ return inscripcio_nova.ins_id == ins.ins_id});
			insc[index] = inscripcio_nova;
			setInscrits([...insc]);
			setList(insc);
		}


		const [maxPages, setMaxPages] = useState(0); 
    const [page, setPage] = useState(0);
    const numberPage = 10;
    

    const setList = (start_inscrits)=>{
			setPage(0);
			setMaxPages(Math.ceil(start_inscrits.length/numberPage));
			let inscr = start_inscrits.slice(numberPage*page,(numberPage*page) + numberPage);
			
			setShowInscrits([...start_inscrits]);

			setFilteredInscrits([...inscr]);
    }
    
    const handleNext = (evt)=>{
        evt.preventDefault();

        let new_page = page + 1;
        if(new_page < maxPages){
            setPage(new_page);
            let inscr = showInscrits.slice(numberPage*new_page,(numberPage*new_page) + numberPage);
            setFilteredInscrits([...inscr]);
        }
    }
    const handlePrevious = (evt)=>{
        evt.preventDefault();

        let new_page = page - 1;
        if(new_page >= 0){
            setPage(new_page);
            let inscr = showInscrits.slice(numberPage*new_page,(numberPage*new_page) + numberPage);
            setFilteredInscrits([...inscr]);
        }
    }


		

    return(
			<>
				<div className='min-w-full text-white bg-grey'>
					<div className='flex flex-col items-center min-w-full'>
						<div className='flex justify-center min-w-full'>
							<div className='relative my-6 mx-6 flex-col items-center w-[100%]'>
								<div className="relative flex w-full max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
										
									<h1 className='mt-4 text-2xl text-center text-blue1'>Recollida de dorsal</h1>
									<div className=' flex items-center flex-col w-[100%]'>
										<div className='m-5 w-[95%] flex justify-end'>
												<input onChange={handleChange} type='text' id='filter' className='border rounded-xl p-1 text-black' placeholder='Buscar...'/>	
										</div>
										{!load ?
                        <div className='flex justify-center'><Icon icon="line-md:loading-twotone-loop" className='w-[100px] h-[100px] text-blue1'/></div>
                      :
											<>
											<table className='m-5 w-[95%] table-inscrits'>
												<thead>
													<tr>
														<th className=' text-start'>Dorsal</th>
														<th className=' text-start'>NIF</th>
														<th className=' text-start'>Nom</th>
														<th className=' text-start'>Cognom</th>
														<th className=' text-start'>Telf.</th>
														<th className=' text-start'>Actions</th>
													</tr>
												</thead>
												<tbody>
													{filteredinscrits.map((ins, index)=>
														<tr key={ins.ins_id} >
															<td className='p-2'>{ins.ins_dorsal}</td>
															<td>{ins.participant.par_nif}</td>
															<td>{ins.participant.par_nom}</td>
															<td>{ins.participant.par_cognoms}</td>
															<td>{ins.participant.par_telefon}</td>
															<td className='flex'>
															{ ins.ins_retirat == 1 ? 'Retirat' : 
																ins.ins_bea_id != null ? ins.ins_bea_id+'' : 
																<>
																	<div onClick={()=>handleParticipa(ins.ins_id)} className='cursor-pointer w-[50%] text-center bg-blue1 p-1 m-1 rounded-xl text-white hover:bg-cyan-600 active:bg-cyan-800'>Participa</div>
																	<div onClick={()=>handleRetirat(ins.ins_id)} className='cursor-pointer w-[50%] text-center bg-red-500 p-1 m-1 rounded-xl text-white hover:bg-red-600 active:bg-red-800'>Retirat</div>
																</>
															}
															</td>
														</tr>
													)}
												</tbody>
											</table>
											<div className='w-[95%]'>
												<div className='flex justify-between w-[100%]'>
														<span>Page: {page+1}</span>
														<span>Pages: {maxPages}</span>
												</div>
												<div className='flex justify-evenly w-full'>
														<button onClick={handlePrevious} className=' w-[100px] rounded-xl bg-blue1 text-white px-2 py-1 m-2 hover:bg-cyan-600 active:bg-cyan-700'>Previous </button>
														<button onClick={handleNext} className='w-[100px] rounded-xl bg-blue1 text-white px-2 py-1 m-2 hover:bg-cyan-600 active:bg-cyan-700'>Next</button>
												</div>
											</div>
										</>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
    )
}