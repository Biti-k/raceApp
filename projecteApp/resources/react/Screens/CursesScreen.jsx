import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../context/MainContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import List from '../Components/List'
import { Filter } from '../Components/Filter'
import axios from 'axios'
export const CursesScreen = () =>
{
  const [curses, setCurses] = useState([]);
  const [filtros, setFiltros] = useState({"cur_lloc" : '', "cur_nom" : ''});
  
  const [load, setLoad] = useState(false);

	const getCurses = async () => {
		let response = await axios.get(get_all_curses)
		setCurses(response.data.curses);
    inscripcions(response.data.curses);
    setLoad(true);
	}

    const inscripcions = (curses) => {
      curses.forEach((c,i)=>{
        let inscrits = 0;
        c.circuits.forEach((cir,cir_i)=>{
          cir.categories.forEach((ccc, ccc_i) => {
            inscrits = inscrits + ccc.inscripcions.length;
          })
        })
        c.inscrits = inscrits;
      });
      setCurses(curses);
    }
  
  const reload = ()=>{
    getCurses();
  }

	useEffect(() => {
		getCurses();
	},[]);
    return(
    <>
        <div className='min-w-full min-h-full bg-grey'>
            <div className='container py-2 mx-auto'>
                <div>
                    <h1 className='mb-6 text-5xl text-center text-blue2'>Curses <Icon icon="whh:raceflag" className='inline' /></h1>
                    <Filter props_filtros={filtros} setFiltros={setFiltros}></Filter>
                    {!load ?
                        <div className='flex justify-center'><Icon icon="line-md:loading-twotone-loop" className='w-[100px] h-[100px] text-white'/></div>
                      :
                        <List curses={curses} reload={reload} filtros={filtros}></List>
                    } 
                </div>
            </div>
        </div>
    </>
    )
}