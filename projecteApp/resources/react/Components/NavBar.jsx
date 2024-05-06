import { NavLink } from 'react-router-dom';

export const NavBar = () => 
{

    return (
        <>
					<nav>
						<div>
							<NavLink to="/">Maxxis</NavLink>
							<div>
								<ul>
									<li>
										<NavLink to="/curses">Curses</NavLink>
									</li>
									<li>
										<NavLink to="/curses/cursa/new">New Cursa</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</nav>
        </>
    )
}

export default NavBar;