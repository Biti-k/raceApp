import {useEffect} from 'react';
import { Routes, Route , Navigate} from 'react-router-dom'
import NavBar from './NavBar';
import { MainProvider } from '../context/MainProvider';
import { MainScreen } from '../Screens/MainScreen';
import { CursesScreen } from '../Screens/CursesScreen';
import { CursaScreen } from '../Screens/CursaScreen';

function Main() {

    // useEffect(() => {
    //   console.log(get_all_categories);
    // }, [])

    return (
        <>
        <MainProvider>
            <div>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/" element={<MainScreen></MainScreen>} />
                    <Route path="/curses" element={<CursesScreen></CursesScreen>} />
                    <Route path="/curses/cursa/:id" element={<CursaScreen></CursaScreen>} />
                    <Route path="/*" element={<Navigate to="/"></Navigate>} />
                </Routes>
            </div>
        </MainProvider>
        </>
    );
}

export default Main;