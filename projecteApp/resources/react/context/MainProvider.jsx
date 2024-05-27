import { MainContext } from "./MainContext"
import { useReducer } from 'react'
import axios from "axios";

const initialState = localStorage.getItem('sessiontoken');

export const MainProvider = ({children})=>{

        const tokenReducer = (state = initialState, action = {}) =>{
            switch(action.type){                
                case 'changeToken':
                    return action.payload;
                break;  

                default:
    
                break;
            }
        }

        const [token, dispatch] = useReducer(tokenReducer, initialState)        
    
        const changeToken = (state)=>{
            const action = {
                type: 'changeToken', 
                payload: state
            }

            if(state == null){
               
                localStorage.removeItem('sessiontoken');
            }else{
                localStorage.setItem('sessiontoken', state);
            }
            
            dispatch(action)
        }


    return(
        <MainContext.Provider value={{token, changeToken}}>
            {children}
        </MainContext.Provider>
    )
}