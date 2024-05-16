import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonChange } from "../../Components/ButtonChange";
import { validarNif, validarRequired, validarTelefon, validarData, validarEmail } from '../../../validators/script';

export const InscripcionScreen = () => {
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
    cir_categories : [],
  }
  
  const inscripcioData = {
    ins_ccc_id : '',
    ins_retirat : null,
  }

  const participantData = {
    par_nif : '',
    par_nom : '',
    par_cognoms : '',
    par_data_naixement : "",
    par_telefon : "",
    par_email : "",
    par_es_federat : false,
  }
  const { id } = useParams();
  const [botones,setBotones] = useState({});
  const [cursa, setCursa] = useState(cursaData);
  const [circuits, setCircuits] = useState([]);
  const [inscripcion, setInscripcion] = useState(inscripcioData);
  const [participant, setParticipant] = useState(participantData);
  const [ccc, setCCC] = useState({});
  const [circuitoEscogido, setCircuitoEscogido] = useState([]);
  const [load,setLoad] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if(name in participant){
      setParticipant({...participant, [name]: value})
    }else{
      setInscripcion({...inscripcion, [name]:value});
      
    }
  }

  const handleFederat = (evt) => {
    let valor = participant.par_es_federat;
    setParticipant({...participant, ["par_es_federat"] : !valor});
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

  const getCursa = async () => {
    const response = await axios.post(get_cursa, {id : id});
    let cur = response.data.cursa;
    cur.cur_data_inici = cur.cur_data_inici != null ? cur.cur_data_inici.substring(0,10): '';
    cur.cur_data_fi = cur.cur_data_fi != null ? cur.cur_data_fi.substring(0,10): '';
    cur.cur_foto = '';
    setCursa(cur);
    returnCircuits(cur);
    setLoad(true);
  }

  const initialBotones = () => {
    let cirs = {};
    circuits.forEach(e => {
      cirs[e.cir_id] = false;
    })
    setBotones(cirs);
  }

  const handleApuntarseButton = (id) => {
      let circuito = id;
      id = ccc[id];
      let bt = botones;
      bt[circuito] = !botones[circuito];
      setBotones(bt);
      if(!circuitoEscogido.includes(circuito)){
        setCircuitoEscogido([...circuitoEscogido,circuito]);
      }else{
        setCircuitoEscogido(circuitoEscogido.filter(item => item != circuito));
      }
      setInscripcion({...inscripcion , ['ins_ccc_id']:id});
  }

  const handleChangeCCC = (evt) => {
    const { name, value, id } = evt.target;
    let myid = id.split("_")[0];
    let cir_id = name.split("_")[1];
    setCCC({...ccc, [cir_id]:myid});
    
  }

  const validarCCC = () => {
    if(circuitoEscogido.length == 0 || !ccc[circuitoEscogido[circuitoEscogido.length - 1]]){
      $("#errorsCCC").text("Has d'escollir un circuit i categoria");
      return 0;
    }else if(circuitoEscogido.length > 1){
      $("#errorsCCC").text("Només et pots inscriure a un circuit i categoria");
      return 0;
    }else{
      $("#errorsCCC").text("");
      return 1;
    }
  }

  const validar = ()=>{
    validarRequired($('#par_nom'))
    validarRequired($("#par_cognoms"))
    validarNif($("#par_nif"))
    validarData($("#par_data_naixement"))
    validarTelefon($("#par_telefon"))
    validarEmail($("#par_email"))
    validarCCC()
    if(
      validarRequired($('#par_nom'))
      && validarRequired($("#par_cognoms"))
      && validarNif($("#par_nif"))
      && validarData($("#par_data_naixement"))
      && validarTelefon($("#par_telefon"))
      && validarEmail($("#par_email"))
      && validarCCC()
    ){
      return true;
    }else{
      return false;
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    $("#msj").text("");
    if(validar()){
      
      let url = store_inscripcio;
      const formData = new FormData();
      let obj = {
        "participant" : participant,
        "inscripcio" : inscripcion
      }
      axios.post(url, obj)
      .then(response => {
        $("#msj").text("Inscripció realitzada amb exit.");
        setInscripcion(inscripcioData);
        setParticipant(participantData);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    
    
    
  }

  useEffect(() => {
    getCursa();
    initialBotones();
  }, [])

  return(
    <>
      <form onSubmit={handleSubmit} className="h-[100%]">
      <div className='flex justify-center min-w-full min-h-full text-white bg-grey'>
        <div className='flex flex-col items-center w-full'> 
          <div id="msj" className="mt-2 text-3xl font-bold text-blue2">
            
          </div>
          <div className='flex justify-center min-w-full h-[100%] w-full'>
            <div className="relative flex min-h-[90%] p-4 flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal mt-6 text-base w-[50%] mx-6 my-6">
              <p className="mb-3 text-2xl">Inscripció per la cursa: {cursa.cur_nom}</p>
              <label>Nom del participant</label>
              <input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="par_nom" name="par_nom" onChange={handleChange} value={participant.par_nom} />
              <div className="mt-3">
                <label>Cognoms del participant</label>
                <input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="par_cognoms" name="par_cognoms" onChange={handleChange} value={participant.par_cognoms}/>
              </div>
              <div className="mt-3">
                <label>NIF del participant</label>
                <input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="par_nif" name="par_nif" onChange={handleChange} value={participant.par_nif}/>
              </div>
              <div className="mt-3">
                <label>Data naixement del participant</label>
                <input className='border rounded-xl p-3 text-black w-[100%]' type="date" id="par_data_naixement" name="par_data_naixement" onChange={handleChange} value={participant.par_data_naixement}/>
              </div>
              <div className="mt-3">
                <label>Telèfon del participant</label>
                <input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="par_telefon" name="par_telefon" onChange={handleChange} value={participant.par_telefon}/>
              </div>
              <div className="mt-3">
                <label>Email del participant</label>
                <input className='border rounded-xl p-3 text-black w-[100%]' type="text" id="par_email" name="par_email" onChange={handleChange} value={participant.par_email}/>
              </div>
              <div className="flex gap-2 mt-3">
                <input className='' type="checkbox" name="par_es_federat" id="par_es_federat" onChange={handleFederat}/>
                <label htmlFor="par_es_federat" value={participant.par_es_federat}>Federat</label>
              </div>

            </div>
            <div className="relative flex w-[50%] min-h-[90%] p-4 flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal mt-6 text-base mx-6 my-6">
              <div className="flex flex-col gap-2">
                <p className="text-2xl">Circuits</p>
                <div className="circuits">
                  {circuits.map(e => 
                    <div key={e.cir_id}>
                      <p className="font-bold text-blue1">Nom del circuit: <span className="font-normal text-darkmetal">{e.cir_nom}</span></p>
                      <p className="font-bold text-blue1">Preu: <span className="font-normal text-darkmetal">{e.cir_preu} €</span> </p>
                      <p className="font-bold text-blue1">Distància: <span className="font-normal text-darkmetal">{e.cir_distancia} km</span></p>
                      <p className="font-bold text-blue1">Temps estimat: <span className="font-normal text-darkmetal">{e.cir_temps_estimat} minuts</span></p>
                      <p className="my-2">Categories</p>
                      {
                        e.categories.map(cc =>
                          <div key={cc.ccc_id} className="flex gap-2">
                            <input type="radio" name={"ccc_"+e.cir_id} id={cc.ccc_id+"_"+cc.categoria.cat_nom} onChange={handleChangeCCC}/>
                            <label htmlFor={cc.ccc_id+"_"+cc.categoria.cat_nom}>{cc.categoria.cat_nom}</label>
                          </div>
                        )
                      }
                      <ButtonChange handleClick={() => handleApuntarseButton(e.cir_id)} agregarContent={"Apuntar-se"} quitarContent={"Desapuntar-se"} id={e.cir_id} agregado={botones[e.cir_id]}></ButtonChange>
                      <hr className="my-2"></hr>

                    </div>
                  )}
                </div>

              </div>
              <div className="text-red-700 errors" id="errorsCCC">
              
              </div>
            </div>  
          </div>
          <input value="Finalitzar inscripció" className='p-3 text-white cursor-pointer rounded-xl bg-blue1 hover:bg-cyan-600 active:bg-cyan-800 w-[50%] mx-auto mb-2' type="submit"/>
        </div>
      </div>
      </form>
    </>
  );

}