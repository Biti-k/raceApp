import {useEffect} from 'react';
import { Routes, Route , Navigate} from 'react-router-dom'
import NavBar from './NavBar';
import { MainProvider } from '../context/MainProvider';
import { MainScreen } from '../Screens/MainScreen';
import { CursesScreen } from '../Screens/CursesScreen';
import { CursaScreen } from '../Screens/CursaScreen';
import { CursesUserScreen } from '../Screens/users/CursesUserScreen';
import { CursaUserScreen } from '../Screens/users/CursaUserScreen';
import { InscripcionScreen } from '../Screens/users/InscripcionsScreen';
import { CheckInScreen } from '../Screens/CheckInScreen';
import { ResultatsScreen } from '../Screens/users/ResultatsScreen';

function Main() {

    // useEffect(() => {
    //   console.log(get_all_categories);
    // }, [])

    return (
        <>
        <MainProvider>
            <div className='min-h-full bg-grey'>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/" element={<MainScreen></MainScreen>} />
                    <Route path="/curses" element={<CursesUserScreen></CursesUserScreen>} />
                    <Route path="/curses/cursa/:id" element={<CursaUserScreen></CursaUserScreen>} />
                    <Route path="/admin/curses" element={<CursesScreen></CursesScreen>} />
                    <Route path="/admin/curses/cursa/:id" element={<CursaScreen></CursaScreen>} />
                    <Route path="/admin/curses/cursa/checkin/:id" element={<CheckInScreen></CheckInScreen>} />
                    <Route path="/inscripcio/:id" element={<InscripcionScreen></InscripcionScreen>} />
                    <Route path="/resultats" element={<ResultatsScreen></ResultatsScreen>} />
                    <Route path="/*" element={<Navigate to="/"></Navigate>} />
                </Routes>
            </div>
        </MainProvider>
        </>
    );
}

export default Main;