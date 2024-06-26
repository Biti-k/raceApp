import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import CheckPointsList from '../../Components/CheckPointsList';
export const CursaUserScreen = () =>
{

    const { id } = useParams();

		const [load , setLoad] = useState(false);
		
    const cursaData = {
			cur_nom : '',
			cur_data_inici : '',
			cur_data_fi : '',
			cur_lloc : '',
			cur_esp_id : '',
			cur_est_id : '',
			cur_desc : '',
			cur_limit_inscr : '',
			cur_foto : '',
			cur_web : '',
			esport : {
				esp_nom : ''
			}
    }
    const circuitData = {
			cir_id : null,
			cir_num : '',
			cir_nom : '',
			cir_distancia : '',
			cir_temps_estimat : '',
			cir_preu : '',
			cir_categories : []
    }
	const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [cursa, setCursa] = useState(cursaData);
    const [circuits, setCircuits] = useState([]);
    const [esports, setEsports] = useState([]);
    const [img, setImg] = useState('');
    const [categories, setCategories] = useState([]);
    
    const inscripcio = () => {
			navigate("/inscripcio/" + cursa.cur_id);
	}

    const getCursa = async ()=>{
    
        const response = await axios.post(get_cursa, {id : id});
        let cur = response.data.cursa;
        cur.cur_data_inici = cur.cur_data_inici != null ? cur.cur_data_inici.substring(0,10): '';
        cur.cur_data_fi = cur.cur_data_fi != null ? cur.cur_data_fi.substring(0,10): '';
        
        if(cur.cur_foto != null && cur.cur_foto != ''){
            setImg(window.location.origin+'/api/img/'+cur.cur_foto);
        }
        
        cur.cur_foto = '';
        setCursa(cur);
        returnCircuits(cur);
				getCategoriesEsport(cur.cur_esp_id);
				
    }
    
    const returnCircuits = (cursa) => {
      let circuitsTemp = [];
      cursa.circuits.forEach((e,i) => {
        let obj = e;
        let cats = [];
        e.categories.forEach((c,ci) =>{
          let cat = {};
          cat.cat_id = c.ccc_cat_id;
          cat.cat_nom = c.categoria.cat_nom;
          cats.push(cat);
        });
        obj.cir_categories = cats;
        circuitsTemp.push(obj);
      })

      setCircuits([...circuitsTemp]);
    }

    const loadPage = ()=>{
			setCircuits([]);
			getSelects();
			getCursa()
			
    }


    useEffect(()=>{
        loadPage()
    },[id]);

    const getSelects = async()=>{
			const response = await axios.get(get_all_esports);
			
			let select = []

			response.data.esports.forEach((ele)=>{
					select.push({title: ele.esp_nom, value: ele.esp_id});
			});
			
			setEsports(select);
    }



    const handleCatCirChange = (evt, index) =>{
			const { name, value, checked } = evt.target;
			let data = circuits;
			if(checked){
				data[index].cir_categories.push({cat_nom: name, cat_id : value});
			}else{
				data[index].cir_categories = data[index].cir_categories.filter(ele => { return ele.cat_id != value});
			}
			setCircuits([...data]);
    }

    const getCategoriesEsport = async(cur_esp_id) => {
			if(cur_esp_id != -1){
				let response = await axios.post(get_cursa_form_categories, {esp_id : cur_esp_id});
				setCategories(response.data.categories);
				setLoad(true);
			}else{
				setCategories([]);
				setLoad(true);
			}
    }

	const handleDeleteCircuit = (index)=>{
		let data = circuits;
		data.splice(index, 1);
		data = data.map((ele, i) =>{
			ele.cir_num = i+1;
			return ele;
		});
		setCircuits([...data]);
	}
    


    return(
			<>
			{!load ?
      	<div className='flex justify-center'><Icon icon="line-md:loading-twotone-loop" className='w-[100px] h-[100px] text-white'/></div>
			:           
				<div className='min-w-full min-h-full text-white bg-grey'>
					<div className='flex items-center min-w-full'>
					<div className='flex flex-wrap justify-center w-full'>
						<div className='relative flex-col items-center lg:w-[50%] sm:w-[100%] p-0 py-4 sm:p-4'>
							<div className="relative flex w-full max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
									
								<div>
                  <div className='px-5 my-3'>
                    <p className='font-bold underline text-blue1'>Estado: <span className="font-normal text-darkmetal">{cursa.estat.est_nom}</span></p>
                    
                  </div>
                  <h1 className='mt-4 text-2xl text-center text-blue1'>Cursa</h1>
                </div>
								<div className=' flex w-[100%]'>
								
									<div className="mx-5 mb-5 w-[100%] flex flex-col gap-2">
                    <div>
                      <span className='font-bold w-[100%] text-blue1 text-xl' >{cursa.cur_nom} </span>
                    </div>
                    <div>
                      
										  <p className='text-black w-[100%]' >{cursa.cur_desc}</p>
                    </div>

                    <div>
                      <label className="text-lg font-bold text-blue1">Limit inscrits: </label>
                      <span className='text-black w-[100%]'>{cursa.cur_limit_inscr}</span>
                    </div>

                    <div>
                      <label className="text-lg font-bold text-blue1">Web: </label>
                      <span className='text-black w-[100%]'>{cursa.cur_web}</span>
                    </div>

                    <div>
                      <label className='text-lg font-bold text-blue1'>Esport: </label>
                      <span className='text-black w-[100%]'>{cursa.esport.esp_nom}</span>
                    </div>


                    <div className='flex flex-col w-full gap-2 md:justify-between md:flex-row'>
                      <div className='flex items-center'>
                        <Icon icon="f7:placemark" className='inline-block text-3xl text-blue1' />
                        <span className='text-black w-[100%]'>{cursa.cur_lloc}</span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <Icon icon="material-symbols:date-range" className='text-2xl text-blue1' />
                        <div className='flex flex-col'>
                          <span className='text-black w-[100%]'>{moment(new Date(cursa.cur_data_inici.substring(0,10))).format("DD/MM/YYYY")}</span>
                        </div>
                        -
                        <div className='flex flex-col'>
                          <span className='text-black w-[100%]'>{moment(new Date(cursa.cur_data_fi.substring(0,10))).format("DD/MM/YYYY")}</span>
                        </div>
                      </div>
                    </div>
									</div>

										
								</div>

							</div>
							
							<div className="relative mt-6 flex w-[100%] max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
					
								<h1 className='mt-4 text-2xl text-center text-blue1'>Circuits</h1> 
								
								<div className=' flex w-[100%] h-fit p-5'>
									<div className="mx-5 w-[100%] flex">    
										{ circuits.map((cir, index) =>
										<div key={cir.cir_num} className='flex flex-col lg:flex-row w-[100%] sm:gap-5 lg:gap-15'>
											<div className='flex sm:w-[100%] lg:w-[50%]'>
                        <div className=''>
                        <div className='flex justify-between w-full'><label  className='text-lg font-bold text-blue1'>Numero de circuit: <span className='font-normal text-darkmetal'>{cir.cir_num}</span></label></div>
                      
                      <div>
                        <label className='text-lg font-bold text-blue1'>Circuit: </label>
                        <span>{cir.cir_nom}</span>
                      </div>

											
											<label className='mt-1 text-lg font-bold text-blue1' >Categories: </label>
											{
												categories.map((e) => 
														
													<div key={e.cat_id} className='flex w-full gap-2'>
														{ cir.cir_categories.findIndex((cir_cat) => {return cir_cat.cat_id == e.cat_id } ) != -1 ? 
															<input
																checked
																className="cursor-pointer select-none" type="checkbox" 
																id={'check_cir'+cir.cir_num+'_'+e.cat_id} 
																name={e.cat_nom} 
																onChange={(evt)=> handleCatCirChange(evt, index)} 
																value={e.cat_id}
																disabled
															/> 
														: 
															<input 
																className="cursor-pointer select-none" 
																type="checkbox" 
																id={'check_cir'+cir.cir_num+'_'+e.cat_id} 
																name={e.cat_nom} 
																onChange={(evt)=> handleCatCirChange(evt, index)} 
																value={e.cat_id}
																disabled
															/> 
														}
														<label className="cursor-pointer select-none" htmlFor={'check_cir'+cir.cir_num+'_'+e.cat_id}>{e.cat_nom}</label>
													</div>
												)
											}

											
                      <div>
                        <label className='text-lg font-bold text-blue1'>Distancia: </label>
                        <span>{cir.cir_distancia} km</span>
                      </div>

											<div>
                        <label className='text-lg font-bold text-blue1'>Temps estimat: </label>
                        <span>{cir.cir_temps_estimat} m</span>
                      </div>

                      <div>
                        <label className='text-lg font-bold text-blue1'>Preu: </label>
                        <span>{cir.cir_preu} €</span>
                      </div>

                      {index == circuits.length - 1 ?
                        '' : <hr className='mt-2 text-darkmetal/80'></hr>
                      }
 
                      </div>
                      </div>
                      <div  className='flex sm:w-[100%] lg:w-[50%] h-fit'>
                        <CheckPointsList cursa={cursa} circuit={cir}/>
                      </div>
										</div>
										)}
                    

									</div>
								</div>
							</div>
						</div>
						<div className="sm:w-[100%] lg:w-[50%] p-4">
								
							<div className="relative flex w-auto max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
								<div className='flex flex-col items-center w-auto p-2 h-fit'>
                  {img != '' && img != null ?
                    <div className='my-6 flex justify-center w-[100%]'><img className=' shadow-xl rounded-xl mx-4 w-[90%]' src={img} /></div>
                    :
                    <Icon icon="material-symbols:image-not-supported" className='text-5xl text-blue1'/>
                  }
								</div>
							</div>
						</div>
					</div>
				</div>
        {cursa.cur_est_id != 2 ? ''
        :
				<div className='w-[100%] flex justify-center'>
					<input value="Fer inscripció" className='p-3 mx-auto text-white cursor-pointer d-block rounded-xl bg-blue1 hover:bg-cyan-600 active:bg-cyan-800 w-[50%] mb-4' type="submit" onClick={inscripcio}/>
        </div>
        }
			</div>
			}
    </>
    )
}