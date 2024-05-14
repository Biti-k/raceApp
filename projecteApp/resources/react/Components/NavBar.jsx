import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { Icon } from '@iconify/react/dist/iconify.js';
export const NavBar = () => 
{

    return (
        <>
			<nav id="header" className="z-30 w-full py-1 border-b shadow-lg border-blue1 bg-mint b top-10 h-[60px]">
				<div className="flex items-center justify-between w-full px-6 py-2 mt-0">
					<label htmlFor="menu-toggle" className="block cursor-pointer md:hidden">
						<svg className="text-blue-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
						<title>menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</label>
					<input className="hidden" type="checkbox" id="menu-toggle" />
					
					<div className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1" id="menu">
						<nav>
						<ul className="items-center justify-between pt-4 text-base md:flex md:pt-0 text-blue1">
							<li className="mr-3 text-2xl font-bold transition hover:text-darkmetal"><NavLink to="/">Maxxis<Icon icon="maki:racetrack" className='inline-block'/></NavLink></li>
							<li className="mr-3 text-xl font-bold transition hover:text-darkmetal"><NavLink to="/curses">Curses</NavLink></li>
							<li className="mr-3 text-xl font-bold transition hover:text-darkmetal"><NavLink to="/admin/curses">Admin Curses</NavLink></li>
							<li className="mr-3 text-xl font-bold transition hover:text-darkmetal"><NavLink to="/admin/curses/cursa/new">New Cursa</NavLink></li>
						</ul>
						</nav>
					</div>
					
					{/* <div className="flex flex-wrap items-center justify-end order-2 mr-0 md:order-3 md:mr-4" id="nav-content">
						<div className="flex items-center w-full auth md:w-full">
						<Button contenido="Cerrar sesión"></Button>
						</div>
					</div> */}
				</div>
			</nav>
        </>
    )
}

export default NavBar;