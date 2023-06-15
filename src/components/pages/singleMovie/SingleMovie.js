
import './singleMovie.scss';

const SingleMovie = ({data}) => {

    const {title, image, releaseYear, genre, description, rating, director, country} = data;



    return (
        <div className="single-movie">
            <img src={image} alt={title} className="single-movie__image" />
            <div className="single-movie__info">
                <h2 className="single-movie__title">{title}</h2>
                <h3>О фильме</h3>
                <div className="single-movie__release">Год выпуска: <span>{releaseYear}</span></div>
                <div className="single-movie__genre">Жанр: <span>{genre}</span></div>
                <div className="single-movie__country">Страна: <span>{country}</span> </div>
                <div className="single-movie__director">Режисер: <span>{director}</span></div>
                <p className="single-movie__descr">Описание: <span>{description}</span></p>
                <div className="single-movie__rating">Рейтинг: <span>{rating}</span></div>
            </div>
        </div>
    )
}

export default SingleMovie;