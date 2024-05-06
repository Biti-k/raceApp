import {useEffect} from 'react';
import NavBar from './NavBar';
import { MainProvider } from '../context/MainProvider';
import { MainScreen } from '../Screens/MainScreen';
import { Routes, Route , Navigate} from 'react-router-dom'

function Main() {

    useEffect(() => {
      console.log(get_all_categories);
    }, [])

    return (
        <>
        <MainProvider>
					<div className="container-fluid mt-2 bg-grey">
						<NavBar></NavBar>
						<div className='mt-3'></div>
						<Routes>
							<Route path="/" element={<MainScreen></MainScreen>} />
							{/* <Route path="/curses" element={<CursesScreen></CursesScreen>} /> */}
							<Route path="/*" element={<Navigate to="/"></Navigate>} />
						</Routes>
					</div>
        </MainProvider>
        </>
    );
}

export default Main;