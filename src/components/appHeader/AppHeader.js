import { NavLink, Link } from 'react-router-dom';

import movieIcon from '../../resources/movieIcon.png'

import './appHeader.scss';


const AppHeader = () => {
    return (
        <header className="app__header">
            <div className='title__wrapper'>
                <img src={movieIcon} alt="icon" className='app__icon' />
                <h1 className="app__title">
                    <Link to="/">
                        Movies Finder portal
                    </Link>
                </h1>
            </div>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'rgb(110, 186, 163)' : 'inherit'})}
                        to="/"
                        > Movies </NavLink></li>
                    
                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'rgb(110, 186, 163)' : 'inherit'})}
                        to="/series"
                        
                        >Series </NavLink></li>

                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'rgb(110, 186, 163)' : 'inherit'})}
                        to="/search"
                        
                        >Search </NavLink></li>

                    <li><NavLink 
                        end
                        style={({isActive}) => ({color: isActive ? 'rgb(110, 186, 163)' : 'inherit'})}
                        to="/watchList"
                        
                        >MovieList</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;