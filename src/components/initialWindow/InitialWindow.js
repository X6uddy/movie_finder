import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import useMoviesService from '../../services/MoviesService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import movies_greeting from '../../resources/movies_greeting.jpeg';
import series_greeting from '../../resources/series_greeting.jpg';
import actors_greeting from '../../resources/actors_greeting.jpg';
import imgNotFound from '../../resources/imgnotFound.jpg'


import './initialWindow.scss';


const InitialWindow = () => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewMovieItem] = useState(false);
    const [offset, setOffset] = useState(210);
    const [movieEnded, setMovieEnded] = useState(false);

    const {loading, error, clearError, getTrendingMovies} = useMoviesService();
    
    useEffect(() => {
        onRequest();
    }, [])
       
    const onRequest = (offset, initial) => {
            initial ? setNewMovieItem(false) : setNewMovieItem(true);
            getTrendingMovies(offset)
                .then(onMovieListLoaded)
    }

    const onMovieListLoaded = async(newMovieList) => {
        let ended = false;
        if (newMovieList.length < 8) {
            ended = true;
        }
        setMovieList([...movieList, ...newMovieList]);
        setNewMovieItem(false);
        setOffset(offset + 9);
        setMovieEnded(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => {
            item.classList.remove('movie__item_selected')
        });
        itemRefs.current[id].classList.add('movie__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            
            return (
                <li
                className='movie__item'
                key={item.id}
                tabIndex={item.id} 
                ref={el => itemRefs.current[i] = el}
                >
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="movie__title">{item.title}</div>
                </li>
            )
        });

        return (
            <ul className="movie__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(movieList);

    // const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="greeting__wrapper">
            {/* <h1 className="greeting">Приветствую вас на сайте MovieFinder. 
                Здесь вы можете выбрать себе фильм на вечер или найти разную информацию 
                по определенному фильму, сериалу, актеру и так далее.
            </h1> */}
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
                        <div className="greeting__item-name">Сериалы</div>
                    </Link>
                </li>

                <li className="greeting__item">
                    <Link to={`/actors`}>
                        <img src={actors_greeting} alt='actors' className="greeting__item-photo"/>
                        <div className="greeting__item-name">Actors</div>
                    </Link>
                </li>
            </ul>

            {/* {errorMessage} */}
            {spinner}
            {items}
            <button 
                disabled={newItemLoading} 
                style={{'display' : movieEnded ? 'none' : 'block'}}
                className="button button__main"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default InitialWindow;