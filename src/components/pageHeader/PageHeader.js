import { Link } from 'react-router-dom';

import movies_greeting from '../../resources/movies_greeting.jpeg';
import series_greeting from '../../resources/series_greeting.jpg';
import actors_greeting from '../../resources/actors_greeting.jpg';
import search_greeting from '../../resources/searchImg.png';

import './pageHeader.scss';

const PageHeader = () => {
    return (
        <div className="greeting__wrapper">
            <ul className="greeting__items">
                <li className="greeting__item">
                    <Link to={`/`}>
                        <img src={movies_greeting} alt='movies' className="greeting__item-photo"/>
                        <div className="greeting__item-name">Фильмы</div>
                    </Link>
                </li>

                <li className="greeting__item">
                    <Link to={`/series`}>
                        <img src={series_greeting} alt='series' className="greeting__item-photo"/>
                        <div className="greeting__item-name" >Сериалы</div>
                    </Link>
                </li>

                <li className="greeting__item">
                    <Link to={`/actors`}>
                        <img src={actors_greeting} alt='actors' className="greeting__item-photo"/>
                        <div className="greeting__item-name">Actors</div>
                    </Link>
                </li>

                <li className="greeting__item">
                    <Link to={`/search`}>
                        <img src={search_greeting} alt='search' className="greeting__item-photo"/>
                        <div className="greeting__item-name">Search</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default PageHeader;