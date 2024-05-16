import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Filter } from '../../Components/Filter'
import axios from 'axios'
import { ModalShowRegistres } from '../../Components/ModalShowRegistres'

export const ResultatsScreen = () =>
{
  const [curses, setCurses] = useState([]);
  const [cursa, setCursa] = useState({circuits : []});
  const [circuito, setCircuito] = useState({categories : []});
  const [inscripcions, setInscripcions] = useState([]);
  const [modalsOpened, setModalsOpened] = useState({});
  const [ccc, setCCC] = useState(null);
  const [load,setLoad] = useState(false);
  const getCurses = async() => {
    let response = await axios.get(get_all_curses)
    response = response.data.curses
    response = response.filter(e => e.estat.est_id == 4);
    if(response.length > 0){
      $("#seleccion").show();
    }
    setCurses(response);
    setLoad(true);
	}

  useEffect(() => {
    getCurses();
    const interval = setInterval(() => {
      getCurses();
    }, 15000);
  }, [])

  const getResultats = async(ccc_id) => {
    let response = await axios.get(get_inscripcions_ccc, {params:{ccc_id : ccc_id}});
    response = response.data.inscripcions;
    response.sort((a, b) => b.ins_inscripcions - a.ins_inscripcions);
    setInscripcions(response);
  }

  const handleEscogerCursa = (cur_id) => {
    let c = curses.find(obj => obj.cur_id == cur_id);
    setCursa(c);
    $("#categories").hide();
    $("#circuitos").show(300);
  }

  const handleEscogerCircuito = (cir) => {
    setCircuito(cir);
    $("#categories").show(300);
  }

  const handleEscogerCategoria = (cat) => {
    $("#escollir").hide(300);
    $("#resultats").show(300);
    setCCC(cat);
    getResultats(cat);
    let mopens = {};
    inscripcions.map(i => {
      mopens[i.ins_id] = false;
    });
    setModalsOpened(mopens);
  }

  const tornarEscollir = () => {
    $("#resultats").hide(300);
    $("#escollir").show(300);
  }

  const openModal = (ins_id) => {
    $("#modal" + ins_id).show(100);
  }

  const closeModal = (ins_id) => {
    $("#modal" + ins_id).hide(100);
  }

  useEffect(() => {
    if (ccc) {
      const interval = setInterval(() => {
        getResultats(ccc);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [ccc]);

  return(
  <>
      <div className='min-w-full min-h-full p-6 bg-grey text-darkmetal'>
          <div className='container h-[100%] py-2 mx-auto'>
              <h1 className='mb-5 text-4xl text-center text-blue2'>Resultats en viu</h1>
              {
                !load ?                       
                <div className='flex justify-center'><Icon icon="line-md:loading-twotone-loop" className='w-[100px] h-[100px] text-white'/></div>
                : <>
                {
                  curses.length > 0 ? '' : <p className='text-3xl text-center text-blue2'>No hi ha cap cursa en curs<Icon icon="grommet-icons:run" className='inline-block ml-2 text-4xl'/> </p>
                }
              <div className='gap-2 sm:flex-col md:flex md:flex-row' id="escollir">
                <div className='rounded-lg bg-mint h-[100%] md:w-[50%] sm:w-[100%] p-3 mt-6 hidden' id="seleccion">
                    <p className='text-lg font-bold text-blue1'>Escollir cursa</p>
                    <div className='flex flex-col gap-3 mt-2'>
                    {
                      curses.map(c =>
                      <div key={c.cur_id} className='flex items-center gap-2 p-4 transition duration-150 bg-gray-100 rounded-lg cursor-pointer active:scale-90' onClick={() => handleEscogerCursa(c.cur_id)}>
                        <img src={window.location.origin+'/api/img/'+c.cur_foto} className='w-[50px] h-[50px] object-cover rounded-lg'></img>
                        {c.cur_nom}
                        <div className='flex items-center w-auto gap-1 p-1 rounded-lg shadow-md'>
                          <Icon icon="mingcute:location-fill" className='text-xl text-blue1'/>
                          {c.cur_lloc}
                        </div>
                      </div> 
                      )
                    }
                    </div>
                </div>
                <div className='flex md:w-[50%] sm:w-[100%] h-[100%] flex-col'>
                  <div className='hidden w-full p-3 mt-6 rounded-lg bg-mint' id="circuitos">
                    <p className='text-lg font-bold text-blue1'>Escollir circuit</p>
                    {
                      cursa.circuits.map(c => 
                        <div key={c.cir_id} className='flex items-center gap-2 p-4 transition duration-150 bg-gray-100 rounded-lg cursor-pointer active:scale-90' onClick={() => handleEscogerCircuito(c)}>
                          <p>{c.cir_nom} </p>
                          -
                          <p>numero: {c.cir_num}</p>
                        </div>
                      )
                    }
                  </div>
                  <div className='rounded-lg bg-mint h-[100%] w-full p-3 mt-6 hidden' id="categories">
                    <p className='text-lg font-bold text-blue1'>Escollir categoria</p>
                    <div className='flex flex-col gap-2'>
                    {
                      circuito.categories.map(ccc => 
                        <div key={ccc.ccc_id} className='flex items-center w-auto gap-2 p-4 transition duration-150 bg-gray-100 rounded-lg cursor-pointer active:scale-90' onClick={() => handleEscogerCategoria(ccc.ccc_id)}>
                          {ccc.categoria.cat_nom}
                        </div>
                      )
                    }
                    </div>
                  </div>
                </div>
              </div>
              <div id="resultats" className='hidden w-full h-full'>
                <div className="relative flex w-full max-w-[100%] h-fit flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                  <div className=' flex flex-col w-[100%] p-3'>
                  <Icon icon="mingcute:back-2-fill" className='text-4xl duration-200 cursor-pointer text-blue1 hover:scale-125 hover:-rotate-45' onClick={tornarEscollir}/>
                    <table className='table-inscrits placeholder-gray-400 w-[100%]'>
                      <thead>
                        <tr>
                          <th>Checkpoints superats</th>
                          <th>Temps ultim checkpoint</th>
                          <th>Dorsal</th>
                          <th>Nom i cognoms</th>
                          <th>Ver</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          inscripcions.map(i => 
                              <tr key={i.ins_id} className='transition duration-200 cursor-pointer' onClick={() => openModal(i.ins_id)}>
                                <td className='text-center'>{i.ins_checkpoints}/{circuito.cir_checkpoints}</td>
                                <td className='text-center'>{i.registres[i.registres.length - 1] ? i.registres[i.registres.length - 1].reg_temps : ''}</td>
                                <td className='text-center'>{i.ins_dorsal}</td>
                                <td className='text-center'>{i.participant.par_nom} {i.participant.par_cognoms}</td>
                                <td className='text-center'><Icon icon="mdi:eye" className='inline-block text-2xl text-blue1' /></td>
                              </tr>
                          )
                        }
                      </tbody>
                    </table>
                    {
                      inscripcions.map(i => 
                        <ModalShowRegistres key={i.ins_id} isOpen={modalsOpened[i.ins_id]} closeModal={() => closeModal(i.ins_id)} inscripcio={i} participant={i.participant}></ModalShowRegistres>
                      )
                    }
                  </div>
                </div>
              </div>
              </>
              }
              
          </div>
      </div>
  </>
  )
}