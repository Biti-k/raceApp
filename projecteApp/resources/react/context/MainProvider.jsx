import { MainContext } from "./MainContext"
import { useState, useContext, useEffect } from 'react'

export const MainProvider = ({children})=>
{

    const [isLoad, setIsLoad] = useState(true);

	// const [productes, setProductes] = useState([]);

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
        <MainContext.Provider value={{isLoad}}>
            {children}
        </MainContext.Provider>
    )
}