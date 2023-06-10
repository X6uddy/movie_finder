import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PageHeader from '../pageHeader/PageHeader';
import useMoviesService from '../../services/MoviesService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import RatingStars from '../ratingStars/RatingStars';

import imgNotFound from '../../resources/imgnotFound.jpg'


import './initialWindow.scss';


const InitialWindow = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewMovieItem] = useState(false);
    const [movieEnded, setMovieEnded] = useState(false);

    const {type} = props;
    const {loading, error, getTrendingMovies} = useMoviesService();
    
    useEffect(() => {
        onRequest(type);
    }, [])
       
    const onRequest = (type, initial) => {
            initial ? setNewMovieItem(false) : setNewMovieItem(true);
            getTrendingMovies(type)
                .then(onMovieListLoaded);
    }

    const onMovieListLoaded = async(newMovieList) => {
        let ended = false;
        if (newMovieList.length < 5) {
            ended = true;
        }
        setMovieList([...movieList, ...newMovieList]);
        setNewMovieItem(false);
        setMovieEnded(ended);
    }

    const ratingStars = (rating) => {
        let goldStarWidth = rating * 10;
        return goldStarWidth;
    } 

    const colorRating = (rating) => {
        if(rating <= 7) return {'color': 'red'};
        if(rating > 7 && rating <=10) return {'color': 'white'};
    }


    function renderItems (arr) {
        const items = arr.map((item, i) => {
            
            return (
                <li
                className='movie__item'
                key={i}
                tabIndex={i} 
                >
                    <div className="movie__image">
                        <img src={item.image} alt={item.title}/>
                    </div>
                    <div className="movie-wrapper">
                        <div className="movie__title">{item.title}</div>
                        <div className="movie__description">{item.description}</div>
                        <Link to={`/${type}/${item.id}`} className="movie__item-button button__main">More Info</Link>
                        <RatingStars rating={ratingStars(item.rating)}/>
                        <div className="movie__rating">Рейтинг: <span style={colorRating(item.rating)}>{item.rating}</span> / 10</div>
                    </div>
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

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {items}
        <button 
            disabled={newItemLoading} 
            style={{'display' : movieEnded ? 'none' : 'block'}}
            className="button button__main"
            onClick={() => onRequest(type)}>
            <div className="inner">load more</div>
        </button>
        </>
    )
}

export default InitialWindow;