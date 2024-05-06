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
								</ul>
							</div>
						</div>
					</nav>
        </>
    )
}

export default NavBar;