import { MainContext } from "./MainContext"
import { useState, useContext, useEffect } from 'react'
import axios from "axios";
export const MainProvider = ({children})=>
{

    const [isLoad, setIsLoad] = useState(true);

	// const [productes, setProductes] = useState([]);
	const [curses, setCurses] = useState([]);
	const getCurses = async() => {
		let response = await axios.get(get_all_curses)
		setCurses(response.data.curses);
	}

	useEffect(() => {
		getCurses();
	},[]);
	// const fetchProductes = async () =>{
	// 	const response = await fetch('https://fakestoreapi.com/products')
	// 	const data = await response.json()
	// 	setProductes(data);
	// 	setIsLoad(true)
	// }

	// useEffect( ()=>{
	// 	fetchProductes()
	// }, [])


    return(
        <MainContext.Provider value={{isLoad,curses}}>
            {children}
        </MainContext.Provider>
    )
}