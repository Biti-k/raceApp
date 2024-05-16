import { useState, useContext, useEffect } from 'react'
import { useParams  } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { validarRequired } from '../../validators/script';
import { CheckPointsList } from '../Components/CheckPointsList';


export const CursaScreen = () =>
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
    }
    const circuitData = {
			cir_id : null,
			cir_num : '',
			cir_nom : '',
			cir_distancia : '',
			cir_temps_estimat : '',
			cir_preu : '',
      cir_checkpoints : '',
			cir_categories : [],
			checkpoints : []
    }

    const [url, setUrl] = useState('');
    const [cursa, setCursa] = useState(cursaData);
    const [circuits, setCircuits] = useState([]);
    const [esports, setEsports] = useState([]);
    const [img, setImg] = useState('');
    const [categories, setCategories] = useState([]);
    
    
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
			if(validar()){

				const fileInput = document.getElementById('cur_foto');
				const file = fileInput.files[0];
				
				const formData = new FormData();
				formData.append('cur_foto', file);
				formData.append('cursa', JSON.stringify(cursa));
				formData.append('circuits', JSON.stringify(circuits));
				
				axios.post(url, formData , {headers: {'Content-Type': 'multipart/form-data'}})
				.then(response => {
					//recargar las cursas globales
					window.location = '/admin/curses';
				})
				.catch(error => {
					console.error('Error al guardar la cursa:', error);
				});
			
			}
    }

		const validarCirCat = ()=>{
			
			let valid = true;
			
			circuits.forEach((ele) =>{
				let input = '#cir_cat_'+ele.cir_num;
				$(input).text('');
				if(ele.cir_categories.length == 0 ){
					valid = false;
					$(input).text("Has d'escollir una categoria");
				}

			});

			return valid;
		}

		const validar = ()=>{

			validarRequired($('#cur_nom'))
			validarRequired($('#cur_lloc'))
			validarRequired($('#cur_data_inici'))
			validarRequired($('#cur_data_fi'))
			validarRequired($('#cur_limit_inscr'))
			validarRequired($('#cur_esp_id'))			
			validarCirCat()


			//valida tots els circuits

			let valid = true;
	
			let cirs_noms = $('input[name="cir_nom"]');
			$(cirs_noms).each((i, ele)=>{if(!validarRequired($(ele))){valid = false;}});
			
			let cir_distancia = $('input[name="cir_distancia"]');
			$(cir_distancia).each((i, ele)=>{if(!validarRequired($(ele))){valid = false;}});

			let cir_checkpoints = $('input[name="cir_checkpoints"]');
			$(cir_checkpoints).each((i, ele)=>{if(!validarRequired($(ele))){valid = false;}});

			let cir_temps_estimat = $('input[name="cir_temps_estimat"]');
			$(cir_temps_estimat).each((i, ele)=>{if(!validarRequired($(ele))){valid = false;}});

			let cir_preu = $('input[name="cir_preu"]');
			$(cir_preu).each((i, ele)=>{if(!validarRequired($(ele))){valid = false;}});

			
			if(
				valid &&
				validarRequired($('#cur_nom')) &&
				validarRequired($('#cur_lloc')) &&
				validarRequired($('#cur_data_inici')) &&
				validarRequired($('#cur_data_fi')) &&
				validarRequired($('#cur_limit_inscr')) &&
				validarRequired($('#cur_esp_id')) &&
				validarCirCat()
			){
				return true;
			}else{

				return false;
			}
			
			
			
		}
    


    return(
			<>
			<form onSubmit={handleSubmit}>
				<div className='min-w-full min-h-full text-white bg-grey'>
					<div className='flex flex-col items-center min-w-full'>
					<div className='flex justify-center min-w-full'>
						<div className='relative my-6 ml-6 flex-col items-center w-[50%]'>
							<div className="relative flex w-full max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
									
								<h1 className='mt-4 text-2xl text-center text-blue1'>Nova Cursa</h1>
								<div className=' flex w-[100%]'>
								
									<div className="mx-5 mb-5 w-[100%] ">
										<br/><label>Nom: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="cur_nom" name="cur_nom" value={cursa.cur_nom} onChange={handleChange}/>
										
										<br/><label>Desc: </label>
										<br/><textarea rows="7" className='border rounded-xl p-3 text-black w-[100%]' id="cur_desc" name="cur_desc" value={cursa.cur_desc} onChange={handleChange}/>
										
										<br/><label>Lloc: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="cur_lloc" name="cur_lloc" value={cursa.cur_lloc} onChange={handleChange}/>

										<br/><label>Data Inici: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="date" id="cur_data_inici" name="cur_data_inici" value={cursa.cur_data_inici} onChange={handleChange}/>

										<br/><label>Data fi: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="date" id="cur_data_fi" name="cur_data_fi" value={cursa.cur_data_fi} onChange={handleChange}/>

										<br/><label>Limit inscrits: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" min="1" id="cur_limit_inscr" name="cur_limit_inscr" value={cursa.cur_limit_inscr} onChange={handleChange}/>

										<br/><label>Web: </label>
										<br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="cur_web" name="cur_web" value={cursa.cur_web} onChange={handleChange}/>
										
										<br/><label>Esport: </label>
										<br/><select className='border rounded-xl p-3 text-black w-[100%]' id="cur_esp_id" name="cur_esp_id" value={cursa.cur_esp_id} onChange={handleChangeEsport}>
											<option value="" >Selecciona un esport</option>
											{esports.map((ele)=>
												<option key={ele.value} value={ele.value} > {ele.title} </option>
											)}
										</select>
										<br/>
										<span className="text-red-700 errors" name="errorsCirCat"></span>
											
											
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
									<div className='w-full px-5 mt-0 mb-5'>
										<br/><label>Foto: </label>
										<br/><input className='border rounded-xl p-3 text-black bg-white w-[100%] cursor-pointer' type="file" id="cur_foto" name="cur_foto" value={cursa.cur_foto} onChange={handleChange}/>
									</div>
								</div>
							</div>

						</div>

					</div>

          <div className='flex justify-start min-w-full'>
            <div className="relative mb-6 mx-6 flex w-[100%] max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
            
              <h1 className='mt-4 mb-3 text-2xl text-center text-blue1'>Circuits</h1> 
              
              <div onClick={handleAddCir} className='button-new-cursa flex justify-center items-center p-5 w-fit h-[40px] rounded-xl cursor-pointer bg-blue1 hover:bg-cyan-600 active:bg-cyan-800 text-white select-none'>Nou circuit</div>
              
              { circuits.map((cir, index) =>
              <div  key={cir.cir_num}>
                <div className=' flex w-[100%] h-fit p-5'>
                  <div className="mx-5 w-[50%] ">    
                    
                      <br/>
                        <div className='flex justify-between w-full'><label >Numero de circuit: {cir.cir_num}</label><Icon icon="mdi:trash-can" onClick={()=>handleDeleteCircuit(index)} className='text-2xl transition duration-200 cursor-pointer text-blue1 hover:scale-110 active:text-red-700'/></div>

                      <label >Nom: </label>
                      <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" name="cir_nom" value={cir.cir_nom} onChange={(evt)=> handleChangeCir(evt, index) }/>
                      
                      <br/><label className='mt-1' >Categoires: </label>
											<div>
												{
													categories.map((e) => 
															
														<div key={e.cat_id} >
															{ cir.cir_categories.findIndex((cir_cat) => {return cir_cat.cat_id == e.cat_id } ) != -1 ? 
																<input
																	checked
																	
																	className=" w-fit cursor-pointer select-none" type="checkbox" 
																	id={'check_cir'+cir.cir_num+'_'+e.cat_id} 
																	name={e.cat_nom} 
																	onChange={(evt)=> handleCatCirChange(evt, index)} 
																	value={e.cat_id}
																/> 
															: 
																<input 
																	key={e.cat_id}
																	className=" w-fit cursor-pointer select-none" 
																	type="checkbox" 
																	id={'check_cir'+cir.cir_num+'_'+e.cat_id} 
																	name={e.cat_nom} 
																	onChange={(evt)=> handleCatCirChange(evt, index)} 
																	value={e.cat_id}
																/> 
															}
															<label className=" gap-2 cursor-pointer select-none" htmlFor={'check_cir'+cir.cir_num+'_'+e.cat_id}>{e.cat_nom}</label>
															<br/>
														</div>
													)
												}
												<span id={'cir_cat_'+cir.cir_num} className='text-red-700 errors'></span>
                      </div>

                      <br/><label>Distancia (km): </label>
                      <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" min="1" name="cir_distancia" value={cir.cir_distancia} onChange={(evt)=> handleChangeCir(evt, index) }/>
                      
                      <br/><label>Numero de checkpoints: </label>
                      <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" min="1" name="cir_checkpoints" value={cir.cir_checkpoints} onChange={(evt)=> handleChangeCir(evt, index) }/>

                      <br/><label>Temps estimat (minuts): </label>
                      <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" min="1" name="cir_temps_estimat" value={cir.cir_temps_estimat} onChange={(evt)=> handleChangeCir(evt, index) }/>

                      <br/><label>Preu: </label>
                      <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" min="1" name="cir_preu" value={cir.cir_preu} onChange={(evt)=> handleChangeCir(evt, index) }/>
                      {index == circuits.length - 1 ?
                        '' : <hr className='mt-2 text-darkmetal/80'></hr>
                      }

                  </div>
                  <div  className=' flex w-[50%] h-fit'>
                    <CheckPointsList cursa={cursa} circuit={cir}/>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

					<div className='flex justify-start min-w-full'>
						<div className="relative mb-6 mx-6 flex w-[100%] max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
							<div className=' flex w-[100%] h-fit p-5'>
								<div className="mx-5 w-[100%] ">    
									<input value="Guardar" className='p-3 text-white cursor-pointer rounded-xl bg-blue1 hover:bg-cyan-600 active:bg-cyan-800' type="submit"/>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</form>
    </>
    )
}