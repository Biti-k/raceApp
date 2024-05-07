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
        <div className=' min-w-full min-h-full bg-grey text-white'>
            <div className='flex justify-center min-w-full'>
                <div className="relative my-6 flex w-full max-w-[50%] flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                    <div className="relative mx-4 mt-4 overflow-hidden shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border text-darkmetal shadow-blue-gray-500/40">
                    </div>
                    <h1 className=' text-2xl text-center text-blue1'>Nova Cursa</h1>
                    <div className=' flex w-[100%]'>
                    
                        <form className="mx-5 mb-5 w-[100%] " onSubmit={handleSubmit}>
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

                            <br/><label>Esport: </label>
                            <br/><select className='border rounded-xl p-3 text-black w-[100%]' name="cur_esp_id" value={cursa.cur_esp_id} onChange={handleChange}>
                                <option value="-1">Selecciona un esport</option>
                                {esports.map((ele)=>
                                    <option key={ele.value} value={ele.value} > {ele.title} </option>
                                )}
                            </select>

                            <br/><label>Limit inscrits: </label>
                            <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="number" name="cur_limit_inscr" value={cursa.cur_limit_inscr} onChange={handleChange}/>

                            <br/><label>Web: </label>
                            <br/><input className='border rounded-xl p-3 text-black w-[100%]' type="text" name="cur_web" value={cursa.cur_web} onChange={handleChange}/>
                            
                            
                            <br/><label>Foto: </label>
                            <br/><input className='border rounded-xl p-3 text-black bg-white w-[100%] cursor-pointer' type="file" id="cur_foto" name="cur_foto" value={cursa.cur_foto} onChange={handleChange}/>
                            
                            <br/>
                            <br/>
                            <input className='p-3 rounded cursor-pointer bg-blue1 hover:bg-cyan-600' type="submit"/>
                        </form>

                        
                    </div>
                </div>
                {img != '' ?
                    <div className='my-6'><img className=' shadow-xl rounded-xl mx-4 w-[500px]' src={img} /></div>
                    :
                    null
                }
            </div>
        </div>
    </>
    )
}