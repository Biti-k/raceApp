import { useState, useContext, useEffect } from 'react'
export const CursesScreen = () =>
{

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