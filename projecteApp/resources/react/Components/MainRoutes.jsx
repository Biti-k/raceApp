import {useEffect, useContext} from 'react';
import { Routes, Route , Navigate} from 'react-router-dom'
import NavBar from './NavBar';
import { MainScreen } from '../Screens/MainScreen';
import { CursesScreen } from '../Screens/CursesScreen';
import { CursaScreen } from '../Screens/CursaScreen';
import { CursesUserScreen } from '../Screens/users/CursesUserScreen';
import { CursaUserScreen } from '../Screens/users/CursaUserScreen';
import { InscripcionScreen } from '../Screens/users/InscripcionsScreen';
import { CheckInScreen } from '../Screens/CheckInScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import { ResultatsScreen } from '../Screens/users/ResultatsScreen';
import { ResultatsFinalScreen } from '../Screens/users/ResultatsFinalScreen';
import { MainContext } from "../context/MainContext"

function MainRoutes() {

    const {token, setToken} = useContext(MainContext)

    useEffect(() => {
        console.log(token);
    }, [])

    return (
        <>
          <div className='min-h-full bg-grey'>
              <NavBar></NavBar>
              <Routes>
                  <Route path="/" element={<MainScreen></MainScreen>} />
                  <Route path="/curses" element={<CursesUserScreen></CursesUserScreen>} />
                  <Route path="/curses/cursa/:id" element={<CursaUserScreen></CursaUserScreen>} />
                  { token != null ?
										<>
											<Route path="/admin/curses" element={<CursesScreen></CursesScreen>} />
											<Route path="/admin/curses/cursa/:id" element={<CursaScreen></CursaScreen>} />
											<Route path="/admin/curses/cursa/checkin/:id" element={<CheckInScreen></CheckInScreen>} />
										</>
                    :
										<>
											
										</>
                  }
                  
                  
                  
                  <Route path="/inscripcio/:id" element={<InscripcionScreen></InscripcionScreen>} />
                  <Route path="/resultats" element={<ResultatsScreen></ResultatsScreen>} />
                  <Route path="/resultats/final" element={<ResultatsFinalScreen></ResultatsFinalScreen>} />
									<Route path="/login" element={<LoginScreen></LoginScreen>}/>
                  <Route path="/*" element={<Navigate to="/"></Navigate>} />
              </Routes>
          </div>
        </>
    );
}

export default MainRoutes;