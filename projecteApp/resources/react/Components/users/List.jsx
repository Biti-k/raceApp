import {useEffect, useState} from 'react';
import Card from './Card';
export const List = ({curses, filtros}) => {
    const [cursesFiltrades, setCursesFiltrades] = useState(curses);
    useEffect(() => {
        let mostrarTodos = 0;
        let copiedObject = JSON.parse(JSON.stringify(curses));
        let keysFiltros = Object.keys(filtros);
        let filtrosDefinitivos = {};
        //comprobar filtros en uso, si un filtro esta en uso, se filtra, sino no. Creando un nuevo array de filtros.
        keysFiltros.forEach((e) => {
            if(filtros[e] != ""){
                filtrosDefinitivos[e] = filtros[e];
            }else{
                mostrarTodos++;
            }
        })
        if(mostrarTodos < keysFiltros.length){
            let cursesF = [];
            let keysDefinitivas = Object.keys(filtrosDefinitivos);
            //por cada cursa mirar si concuerda con los filtros no vacios.
            curses.forEach((cursa, cur_key) => {
                keysDefinitivas.forEach((fil_key) => {
                    //si ya existe por otro filtro no se añade por el otro.
                    if(cursa[fil_key].toLowerCase().includes(filtrosDefinitivos[fil_key].toLowerCase()) && !cursesF.includes(cursa)){
                        cursesF.push(cursa);
                    }
                })
            })
            setCursesFiltrades(cursesF);
        }else{
            setCursesFiltrades(curses);
        }


    }, [filtros, curses]);

    useEffect(() => {
        setCursesFiltrades(curses);
    }, [curses])

    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {
                cursesFiltrades.map(cursa => 
                    <Card cursa={cursa} key={cursa.cur_id}/>
                )
            }
            {
                cursesFiltrades.length > 0 ? '' : <p className='text-2xl text-blue2'>No hi ha curses disponibles</p>
            }
        </div>
    );
}

export default List;