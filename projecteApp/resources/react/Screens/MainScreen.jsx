import { useState, useContext } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
export const MainScreen = () =>
{



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
                </div>
                
            </div>


        </>
    )

}