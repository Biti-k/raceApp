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

    const [cursa, setCursa] = useState(cursaData);
    const [esports, setEsports] = useState([]);

    useEffect(()=>{
        getSelects();
        if(id != 'new'){
            //recojer datos para update de cursa
        }

    },[]);

    const getSelects = async()=>{
        const response = await axios.get(get_all_esports);
        console.log(response.data);
        
        let select = []

        response.data.esports.forEach((ele)=>{
            select.push({title: ele.esp_nom, value: ele.esp_id});
        });
        
        console.log(select);
        
        setEsports(select);
    }

    const handleChange = (evt)=>{
        const { name, value } = evt.target;
        setCursa({ ...cursa, [name]: value });
    }

    const handleEsportChange = (evt)=>{
        const { name, value } = evt.target;
        setCursa({ ...cursa, [name]: value });
    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(cursa);

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('cur_foto', file);
        
        axios.post(store_cursa, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Archivo subido exitosamente:', response.data);
        })
        .catch(error => {
            console.error('Error al subir el archivo:', error);
        });
    }

    return(
    <>
        <span>{JSON.stringify(cursa)}</span><br/>
        <h2>Cursa Screen</h2>

        <form onSubmit={handleSubmit}>
            <br/><label>Nom: </label>
            <br/><input type="text" name="cur_nom" value={cursa.cur_nom} onChange={handleChange}/>
            
            <br/><label>Desc: </label>
            <br/><textarea name="cur_desc" value={cursa.cur_desc} onChange={handleChange}/>
            
            <br/><label>Lloc: </label>
            <br/><input type="text" name="cur_lloc" value={cursa.cur_lloc} onChange={handleChange}/>

            <br/><label>Esport: </label>
            <br/><select  name="cur_lloc" value={cursa.cur_esp_id} onChange={handleEsportChange}>
                <option value="-1">Selecciona un esport</option>
                {esports.map((ele)=>
                    <option key={ele.value} value={ele.value} > {ele.title} </option>
                )}
            </select>

            <br/><label>Limit inscrits: </label>
            <br/><input type="number" name="cur_limit_inscr" value={cursa.cur_limit_inscr} onChange={handleChange}/>

            <br/><label>Web: </label>
            <br/><input type="text" name="cur_web" value={cursa.cur_web} onChange={handleChange}/>
            
            
            <br/><label>Foto: </label>
            <br/><input type="file" name="cur_foto" value={cursa.cur_foto} onChange={handleChange}/>
            
            <br/>
            <br/>
            <input type="submit"/>
        </form>
    </>
    )
}