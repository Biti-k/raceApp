import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


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

    const [url, setUrl] = useState('');
    const [cursa, setCursa] = useState(cursaData);
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
    }

    const loadPage = ()=>{
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

    const handleChangeCategoria = (evt) => {
        const { name, value } = evt.target;
        setCursa({ ...cursa, [name]: value });

        getCategoriesEsport(value);
    }

    const getCategoriesEsport = async(cur_esp_id) => {
        if(cur_esp_id != -1){
            let response = await axios.post(get_cursa_form_categories, {esp_id : cur_esp_id});
            console.log(response);
            setCategories(response.data.categories);
        }else{
            setCategories([]);
        }
    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        
        const fileInput = document.getElementById('cur_foto');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('cur_foto', file);
        formData.append('cursa', JSON.stringify(cursa));
        
        axios.post(url, formData , {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => {
            //recargar las cursas globales?
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
                        
                        <div className="relative my-6 ml-6 flex w-full max-w-[50%] flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                            
                            <h1 className='mt-4 text-2xl text-center text-blue1'>Nova Cursa</h1>
                            <div className=' flex w-[100%]'>
                            
                                <div className="mx-5 mb-5 w-[100%] ">
                                    <br/><label >Nom: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" name="cur_nom" value={cursa.cur_nom} onChange={handleChange}/>
                                
                                    
                                    <br/><label>Desc: </label>
                                    <br/><textarea rows="7" className='border rounded-xl p-3 text-black w-[100%]' name="cur_desc" value={cursa.cur_desc} onChange={handleChange}/>
                                    
                                    <br/><label>Lloc: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" name="cur_lloc" value={cursa.cur_lloc} onChange={handleChange}/>

                                    <br/><label>Data Inici: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="date" name="cur_data_inici" value={cursa.cur_data_inici} onChange={handleChange}/>

                                    <br/><label>Data fi: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="date" name="cur_data_fi" value={cursa.cur_data_fi} onChange={handleChange}/>

                                    <br/><label>Limit inscrits: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" name="cur_limit_inscr" value={cursa.cur_limit_inscr} onChange={handleChange}/>

                                    <br/><label>Web: </label>
                                    <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" name="cur_web" value={cursa.cur_web} onChange={handleChange}/>
                                    
                                    
                                    
                                    <br/>
                                    
                                    
                                </div>

                                
                            </div>
                        </div>
                        <div className="w-[50%]">
                            

                                <div className="relative my-6 mx-6 flex w-auto max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                                    <div className='flex flex-col items-center w-auto h-fit'>
                                        {img != '' ?
                                            <div className='my-6'><img className=' shadow-xl rounded-xl mx-4 w-[500px]' src={img} /></div>
                                            :
                                            null
                                        }
                                        <div className='w-full px-5 mt-0 mb-5'>
                                            <br/><label>Foto: </label>
                                            <br/><input className='border rounded-xl p-3 text-black bg-white w-[100%] cursor-pointer' type="file" id="cur_foto" name="cur_foto" value={cursa.cur_foto} onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                            
                                
                            <div className="relative my-6 mx-6 flex w-auto max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                            <h1 className='mt-4 text-2xl text-center text-blue1'>Esport-categoria</h1>
                                <div className='flex w-auto p-5 h-fit'>
                                    <div className="mx-5 mb-5 w-[100%] ">
                                        <br/><label>Esport: </label>
                                        <br/><select className='border rounded-xl p-3 text-black w-[100%]' name="cur_esp_id" value={cursa.cur_esp_id} onChange={handleChangeCategoria}>
                                            <option value="-1">Selecciona un esport</option>
                                            {esports.map((ele)=>
                                                <option key={ele.value} value={ele.value} > {ele.title} </option>
                                            )}
                                        </select>
                                        <div className='flex flex-col gap-2 mt-3 w-[100%]'>
                                            {
                                                categories.map((e) => 
                                                    <div key={e.cat_id} className='flex gap-2'>
                                                    <input type="checkbox" name="categories[]" value={e.cat_id}/>
                                                    <label>{e.cat_nom}</label>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>


                            
                        </div>

                    </div>

                    <div className='flex justify-start min-w-full'>
                        <div className="relative mb-6 mx-6 flex w-[100%] max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                            <div className=' flex w-[100%] h-fit p-5'>
                                <div className="mx-5 w-[100%] ">    
                                    <input className='p-3 rounded-xl cursor-pointer bg-blue1 hover:bg-cyan-600 active:w-[110%]' type="submit"/>
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