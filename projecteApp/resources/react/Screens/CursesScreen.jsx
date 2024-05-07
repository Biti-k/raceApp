import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../context/MainContext'
import List from '../Components/List'
export const CursesScreen = () =>
{
    const {curses} = useContext(MainContext)
    return(
    <>
        <div className='min-w-full min-h-full bg-grey'>
            <div className='container px-2 mx-auto'>
                <h1 className='text-5xl text-blue2'>Curses</h1>
            </div>
            <div>
                <List curses={curses}>
                    
                </List>
            </div>
            
        </div>
    </>
    )
}