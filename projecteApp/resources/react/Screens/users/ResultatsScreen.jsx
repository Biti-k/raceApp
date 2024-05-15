import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Filter } from '../../Components/Filter'
import axios from 'axios'

export const ResultatsScreen = () =>
{
  const [curses, setCurses] = useState([]);
  const [cursa, setCursa] = useState({circuits : []});
  const [circuito, setCircuito] = useState({categories : []});
  const getCurses = async() => {
    let response = await axios.get(get_all_curses)

    setCurses(response.data.curses);
	}

  useEffect(() => {
      getCurses();
  }, [])

  const handleEscogerCursa = (cur_id) => {
    let c = curses.find(obj => obj.cur_id == cur_id);
    setCursa(c);
    console.log(c);
    $("#circuitos").show(300);
  }

  const handleEscogerCircuito = (cir) => {
    setCircuito(cir);
    $("#categories").show(300);
  }

  const handleEscogerCategoria = (cat) => {
    $("#escollir").hide(300);
  }

  return(
  <>
      <div className='min-w-full min-h-full bg-grey text-darkmetal'>
          <div className='container h-[100%] py-2 mx-auto'>
              <h1 className='text-4xl text-center text-blue2'>Resultats en viu</h1>
              <div className='gap-2 sm:flex-col md:flex md:flex-row' id="escollir">
                <div className='rounded-lg bg-mint h-[100%] md:w-[50%] sm:w-[100%] p-3 mt-6 '>
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
              
          </div>
      </div>
  </>
  )
}