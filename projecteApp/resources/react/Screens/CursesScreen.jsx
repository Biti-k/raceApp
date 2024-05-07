import { useState, useContext, useEffect } from 'react'
import { MainContext } from '../context/MainContext'
import { Icon } from '@iconify/react/dist/iconify.js'
import List from '../Components/List'
import { Filter } from '../Components/Filter'
export const CursesScreen = () =>
{
    const {curses} = useContext(MainContext)
    return(
    <>
        <div className='min-w-full min-h-full bg-grey'>
            <div className='container py-2 mx-auto'>
                <div>
                    <h1 className='mb-6 text-5xl text-center text-blue2'>Curses <Icon icon="whh:raceflag" className='inline' /></h1>
                    <Filter></Filter>
                    <List curses={curses}></List>
                </div>
            </div>
        </div>
    </>
    )
}