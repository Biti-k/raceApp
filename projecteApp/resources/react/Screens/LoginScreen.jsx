import { useEffect, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { MainContext } from '../context/MainContext'
import axios from "axios";
export const LoginScreen = () =>
{
  const [ loginValues, setLoginValues ] = useState({email: "" , password : ""});
  const { token, changeToken} = useContext(MainContext);
  const [mensajeError, setMensajeError ] = useState("");

  const login = async(evt) => {
    if(loginValues.email == '' || loginValues.password == ''){
      return;
    }
    const form = evt.target.closest('form');
    form.checkValidity()
    form.reportValidity();
    evt.preventDefault();
    let response = await axios.post(check_login, {email : loginValues.email, password : loginValues.password});
    if(response.data.resultado == 1){
      changeToken(true);
      window.location.href = "/";
    }else{
      setMensajeError(response.data.mensaje);
    }
  }

  useEffect(()=>{
    localStorage.removeItem('sessiontoken');
    changeToken(null);
  },[]);
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginValues({ ...loginValues, [name]: value });
  }
  return(
      <>
          <div className='relative z-10 flex items-center justify-center h-full min-w-full text-white main-screen bg-grey'>
          
            <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 w-[550px]">
                
                <div className="w-full font-bold border rounded-lg shadow bg-mint dark:border text-blue1 md:mt-0 xl:p-0 border-blue2/25">
                    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-blue1">
                            Log In
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-bold text-blue1">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-darkmetal sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 font-normal" placeholder="admin@milaifontanals.org" required={true} value={loginValues.email} onChange={(evt) => handleChange(evt)}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-bold text-blue1">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-darkmetal sm:text-sm rounded-lg focus:ring-primary-600 font-normal focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} value={loginValues.password} onChange={(evt) => handleChange(evt)} />
                            </div>
                            
                            <button type="submit" className="w-full text-white hover:shadow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition duration-200 bg-blue1 hover:bg-blue1/90" onClick={login}>Sign in</button>
                            <p className='text-center'>{mensajeError}</p>
                        </form>
                    </div>
                </div>
            </div>

          </div>
      </>
  )

}