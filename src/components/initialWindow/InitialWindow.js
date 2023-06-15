import { useEffect, useState } from 'react';

import useMoviesService from '../../services/MoviesService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ItemMovie from '../itemMovie/ItemMovie';


import './initialWindow.scss';


const InitialWindow = ({type, favoriteList, setFavoritesList}) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewMovieItem] = useState(false);
    const [movieEnded, setMovieEnded] = useState(false);


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


    // const btnText = !styleAddBtn ? 'Добавить в список' : 'Убрать из списка';
    // const activeBtn = styleAddBtn ? 'movie__button-active' : null;


    function renderItems (arr) {
        const items = arr.map((item, i) => {
            
            return (
                <ItemMovie item={item} type={type} setFavoritesList={setFavoritesList} favoriteList={favoriteList} />
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
            id='load_more'
            onClick={() => onRequest(type)}>
            <div className="inner">load more</div>
        </button>
        </>
    )
}

export default InitialWindow;