import { MainContext } from "./MainContext"
import { useState, useContext, useEffect } from 'react'
import axios from "axios";
export const MainProvider = ({children})=>
{

    const [token,setToken] = useState(null);

    return(
        <MainContext.Provider value={{token}}>
            {children}
        </MainContext.Provider>
    )
}