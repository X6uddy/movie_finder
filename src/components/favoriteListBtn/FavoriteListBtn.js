
import addToList from '../../resources/addWatchLict.png';
import removeList from '../../resources/removeWatchList.png';

const FavoriteListBtn = ({movie, favoriteList, onClick}) => {
    const isFavorite = favoriteList.some((item) => item.id === movie.id);

    const btnAction = () => {
        isFavorite ? onClick(movie.id, 'remove') : onClick(movie, 'add');
    };

    return ( 
        <button className={` movie__button button button__main ${isFavorite ? 'movie__button-active' : null} `}  onClick={btnAction}>
            <img src={isFavorite ? removeList : addToList} alt="watchList" className='movie__iconAdd' />
            {isFavorite ? 'Удалить из WatchList' : 'Добавить в WatchList'}  
        </button>
    )
};

export default FavoriteListBtn;