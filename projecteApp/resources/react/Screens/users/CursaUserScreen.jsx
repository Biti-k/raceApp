import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CursaUserScreen = () =>
{

    const { id } = useParams();

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
        
        if(cur.cur_foto != null){
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
			if(id != 'new'){
					//recojer datos para update de cursa
					getCursa()
					setUrl(update_cursa)
			}else{
					setCursa(cursaData)
					setImg('')
					setUrl(store_cursa)
			}
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

    const handleChange = (evt)=>{
			const { name, value } = evt.target;
			setCursa({ ...cursa, [name]: value });
    }

    const handleAddCir = () =>{
			//Ordenar ?
			let num = circuits.length > 0 ? circuits[circuits.length-1].cir_num + 1 : 1;
			let data = circuitData;
			data.cir_num = num;
			setCircuits([...circuits, data]);
    }

    const handleChangeEsport = (evt) => {
			const { name, value } = evt.target;
			setCursa({ ...cursa, [name]: value });
			
			getCategoriesEsport(value);
    }

    const handleChangeCir = (evt, index) =>{
			const { name, value } = evt.target;
			
			let cirs = circuits;
			cirs[index][name] = value; 

			setCircuits([...cirs]);
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
			}else{
				setCategories([]);
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

    const handleSubmit = (evt) =>{
			evt.preventDefault();
			
			const fileInput = document.getElementById('cur_foto');
			const file = fileInput.files[0];
			
			const formData = new FormData();
			formData.append('cur_foto', file);
			formData.append('cursa', JSON.stringify(cursa));
			formData.append('circuits', JSON.stringify(circuits));
			
			axios.post(url, formData , {headers: {'Content-Type': 'multipart/form-data'}})
			.then(response => {
				//recargar las cursas globales
				loadPage()
			})
			.catch(error => {
				console.error('Error al subir el archivo:', error);
			});
    }
    


    return(
			<>
			<form onSubmit={handleSubmit}>
				<div className='min-w-full min-h-full text-white bg-grey'>
					<div className='flex flex-col items-center min-w-full'>
					<div className='flex justify-center min-w-full'>
						<div className='relative my-6 ml-6 flex-col items-center w-[50%]'>
							<div className="relative flex w-full max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
									
								<h1 className='mt-4 text-2xl text-center text-blue1'>Cursa</h1>
								<div className=' flex w-[100%]'>
								
									<div className="mx-5 mb-5 w-[100%] ">
										<br/><label >Nom: </label>
										<br/><span className='text-black w-[100%]' >{cursa.cur_nom} </span>
								
										
										<br/><label>Desc: </label>
										<br/><p className='text-black w-[100%]' >{cursa.cur_desc}</p>
										
										<br/><label>Lloc: </label>
										<br/><span className='text-black w-[100%]'>{cursa.cur_lloc}</span>

										<br/><label>Data Inici: </label>
										<br/><span className='text-black w-[100%]'>{cursa.cur_data_inici}</span>

										<br/><label>Data fi: </label>
										<br/><span className='text-black w-[100%]'>{cursa.cur_data_fi}</span>

										<br/><label>Limit inscrits: </label>
										<br/><span className='text-black w-[100%]'>{cursa.cur_limit_inscr}</span>

										<br/><label>Web: </label>
										<br/><span className='text-black w-[100%]'>{cursa.cur_web}</span>
										
										<br/><label>Esport: </label>
										<br/><span className='text-black w-[100%]'>{cursa.esport.esp_nom}</span>
											
										<br/>
											
											
									</div>

										
								</div>

							</div>
							
							<div className="relative mt-6 flex w-[100%] max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
					
								<h1 className='mt-4 text-2xl text-center text-blue1'>Circuits</h1> 
								
								<div className=' flex w-[100%] h-fit p-5'>
									<div className="mx-5 w-[100%] ">    
										{ circuits.map((cir, index) =>
										<div key={cir.cir_num}>
											<br/>
                        <div className='flex justify-between w-full'><label >Numero de circuit: {cir.cir_num}</label></div>

	                    <label >Nom: </label>
											<br/><span>{cir.cir_nom}</span>
											
											<br/><label className='mt-1' >Categoires: </label>
											{
												categories.map((e) => 
														
													<div key={e.cat_id} className='flex gap-2 w-fit'>
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
											
											<br/><label>Distancia: </label>
											<br/><span>{cir.cir_distancia}</span>
											
											<br/><label>Temps estimat (minuts): </label>
											<br/><span>{cir.cir_temps_estimat}</span>

											<br/><label>Preu: </label>
											<br/><span>{cir.cir_preu}</span>
                      {index == circuits.length - 1 ?
                        '' : <hr className='mt-2 text-darkmetal/80'></hr>
                      }
                      
										</div>
										)}

									</div>
								</div>
							</div>
						</div>
						<div className="w-[50%]">
								
							<div className="relative my-6 mx-6 flex w-auto max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
								<div className='flex flex-col items-center w-auto h-fit'>
									{img != '' ?
										<div className='my-6 flex justify-center w-[100%]'><img className=' shadow-xl rounded-xl mx-4 w-[90%]' src={img} /></div>
										:
										null
									}
								</div>
							</div>

						</div>
					</div>
				</div>
				<div className='w-[100%] flex justify-center'>
					<input value="Fer inscripció" className='p-3 mx-auto text-white cursor-pointer d-block rounded-xl bg-blue1 hover:bg-cyan-600 active:bg-cyan-800' type="submit" onClick={inscripcio}/>
        		</div>
			</div>
		</form>
    </>
    )
}