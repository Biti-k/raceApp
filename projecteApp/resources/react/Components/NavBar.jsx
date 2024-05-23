import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext } from 'react'
import { MainContext } from '../context/MainContext';

export const NavBar = () => 
{

	const handleMenuToggle = (evt)=>{
		if(evt.target.checked){
			$('#menu').addClass('hidden');
		}else{
			$('#menu').removeClass('hidden');
		}
	}

	const {token, setToken} = useContext(MainContext)

    return (
        <>
			<nav id="header" className="z-30 w-full py-1 border-b shadow-lg border-blue1 bg-mint b top-10 h-min-[60px] h-auto">
				<div className="flex justify-between w-full px-6 py-2 mt-0">
					<label htmlFor="menu-toggle" className="block cursor-pointer sm:hidden">
						<svg className="text-blue-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</label>
					<input className="hidden" type="checkbox" id="menu-toggle" onClick={handleMenuToggle}/>
					
					<div className="flex-row hidden w-full sm:flex md:flex md:items-center md:w-auto" id="menu">
						<nav>
						<ul className="items-center justify-between pt-4 ml-4 text-base md:text-lg lg:text-xl sm:flex md:flex md:pt-0 text-blue1 lg:ml-0">
							<li className="mr-3 font-bold transition hover:text-darkmetal"><NavLink to="/">Maxxis<Icon icon="maki:racetrack" className='inline-block'/></NavLink></li>
							<li className="mr-3 font-bold transition hover:text-darkmetal"><NavLink to="/curses">Curses</NavLink></li>
							<li className="mr-3 font-bold transition hover:text-darkmetal"><NavLink to="/resultats">Resultats en viu</NavLink></li>
							<li className="mr-3 font-bold transition hover:text-darkmetal"><NavLink to="/resultats/final">Resultats Final</NavLink></li>
							{token != null ?
								<>
									<li className="mr-3 text-xl font-bold transition hover:text-darkmetal"><NavLink to="/admin/curses">Admin Curses</NavLink></li>
									<li className="mr-3 text-xl font-bold transition hover:text-darkmetal"><NavLink to="/admin/curses/cursa/new">New Cursa</NavLink></li>
								</>
								:
								<></>
							}

						</ul>
						</nav>
					</div>
					
					<div className="flex flex-wrap items-center justify-end order-2 mr-0 md:mr-4" id="nav-content">
						<div className="flex items-center w-full auth md:w-full">
							{ token != null ? 
								<NavLink to="/login"><Button contenido="Tancar sesió"></Button></NavLink>
							:
								<NavLink to="/login"><Button contenido="Iniciar Sessió"></Button></NavLink>
							}
						</div>
					</div>
				</div>
			</nav>
        </>
    )
}

export default NavBar;