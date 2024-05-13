import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
export const MainScreen = () =>
{
/*     useEffect(() => {
        document.title = 'MaxxisRace|Administrador';
    }, []) */


    return(
        <>
            <div className='relative z-10 min-w-full text-white main-screen bg-grey'>
                <div className="absolute z-0 w-full h-full videoBackground">
                    <video autoPlay loop muted className="relative object-cover object-center w-full h-full blur-[3px]">
                        <source src="/media/back.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute top-0 w-full h-full bg-blue2/10">
                    </div>
                </div>
                <div className='relative z-20 flex flex-col items-center justify-center h-full'>
                    <h2 className='w-auto p-2 text-5xl italic rounded-md bg-opacity-80 drop-shadow-md bg-blue1'>Maxxis Race<Icon icon="maki:racetrack" className='inline-block'/></h2>
                    <p className='text-xl'>Gestionament de curses, fet fàcil!</p>
                    <div className='mt-10'>
                    <NavLink to={'/curses'}>
                        <button
                            className="block px-2 select-none rounded-lg w-full bg-blue1 py-1 text-center align-middle  text-sm font-bold uppercase text-white shadow-md shadow-blue-2/20 transition-all hover:shadow-lg hover:shadow-red-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none h-16 group"
                            type="button"
                            data-ripple-light="true"
                            >
                            <p className="inline transition duration-500">Incriu-te!</p>    
                        </button>
                    </NavLink>
                    </div>
                </div>
                
            </div>


        </>
    )

}