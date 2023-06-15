import { Link } from 'react-router-dom';
import FavoriteListBtn from '../favoriteListBtn/FavoriteListBtn';
import RatingStars from '../ratingStars/RatingStars';

import './itemMovie.scss';

const ItemMovie = ({item, favoriteList, setFavoritesList, type}) => {
    const ratingStars = (rating) => {
        let goldStarWidth = rating * 10;
        return goldStarWidth;
    } 

    const colorRating = (rating) => {
        if(rating <= 7) return {'color': '#c3b983'};
        if(rating > 7 && rating <=10) return {'color': 'white'};
    }

    const handleFavorites = (movie, action) => {
        if (action === 'add') {
            setFavoritesList([...favoriteList, movie]);
        } else if (action === 'remove') {
            const updatedFavorites = favoriteList.filter((favMovie) => favMovie.id !== movie);
            setFavoritesList(updatedFavorites);
        }
    };


    return (
        <li
        className='movie__item'
        key={item.id}
        >
            <div className="movie__image">
                <img src={item.image} alt={item.title}/>
            </div>
            <div className="movie-wrapper">
                <div className="movie__title">{item.title}</div>
                <div className="movie__description">{item.description}</div>
                <div className="movie__buttons">
                    <Link to={`/${type}/${item.id}`} className="movie__item-button button__main">More Info</Link>
                    <FavoriteListBtn movie={item} favoriteList={favoriteList} onClick={handleFavorites}/>
                </div>
                <RatingStars rating={ratingStars(item.rating)}/>
                <div className="movie__rating">Рейтинг: <span style={colorRating(item.rating)}>{item.rating}</span> / 10</div>
            </div>
        </li>
    )
}
export default ItemMovie;