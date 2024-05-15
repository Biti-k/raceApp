import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../context/MainContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Filter } from '../../Components/Filter'
import axios from 'axios'

export const ResultatsScreen = () =>
{
  const [curses, setCurses] = useState([]);
  const [cursa, setCursa] = useState({});
    
  const getCurses = async() => {
    let response = await axios.get(get_all_curses)

    setCurses(response.data.curses);
	}

  useEffect(() => {
      getCurses();
  }, [])

  const handleEscogerCursa = (cur_id) => {
    let c = curses.find(obj => obj.cur_id == cur_id);
    
  }

  return(
  <>
      <div className='min-w-full min-h-full bg-grey text-darkmetal'>
          <div className='container h-[100%] py-2 mx-auto'>
              <h1 className='text-4xl text-center text-blue2'>Resultats en viu</h1>
              <div className='rounded-lg bg-mint h-[90%] w-[50%] p-3 mt-6'>
                  <p className='text-lg font-bold text-blue1'>Escollir cursa</p>
                  <div className='flex flex-col gap-3 mt-2'>
                  {
                    curses.map(c =>
                    <div key={c.cur_id} className='flex items-center gap-2 p-4 transition duration-150 bg-gray-100 rounded-lg cursor-pointer active:scale-90' onClick={handleEscogerCursa(c.cur_id)}>
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
          </div>
      </div>
  </>
  )
}