import './appHeader.scss';
import { NavLink, Link } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Movies</span> Finder portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'red' : 'inherit'})}
                        to="/"
                        > Movies </NavLink></li>
                    /
                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'red' : 'inherit'})}
                        to="/series"
                        
                        >Series </NavLink></li>
                    /
                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'red' : 'inherit'})}
                        to="/actors"
                        
                        >Actors </NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;