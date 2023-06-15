import { Link } from 'react-router-dom';

import useMoviesService from '../../services/MoviesService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ItemMovie from '../itemMovie/ItemMovie';


const WatchList = ({favoriteList, setFavoritesList}) => {

    const {loading, error} = useMoviesService();

    const deleteWatchList = () => {
        setFavoritesList([]);
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            
            return (
                <ItemMovie item={item} setFavoritesList={setFavoritesList} favoriteList={favoriteList} />
            )
        });

        let countItems = arr.length;

        return (
            <>
                <h3 className='movie__count'>Количество добавленных фильмов: {countItems}</h3>
                <button className="button__main" onClick={() => deleteWatchList()}>Очистить список</button>
                <ul className="movie__grid">
                    {items}
                </ul>
            </>
        )
    }

    const items = renderItems(favoriteList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const itemRender = items ? items : <WatchListEmpty/> ;

    return (
        <>
        {errorMessage}
        {spinner}
        {itemRender}
        </>
    )
}

const WatchListEmpty = () => {
    return (
        <>
            <div className="movie__empty">
                Похоже вы не добавили ни одного фильма в список желаемых фильмов. 
                <br />
                Пожалуйста, посетите страницы с фильмами и нажмите кнопку "Добавить в WatchList", 
                <br />
                Затем вернитесь сюда снова !
            </div>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </>
    )
}
export default WatchList;