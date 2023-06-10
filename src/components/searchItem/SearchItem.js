import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import * as Yup from 'yup';

import useMoviesService from "../../services/MoviesService";
import RatingStars from "../ratingStars/RatingStars";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './searchItem.scss';

const SearchItem = (props) => {
    
    const [item, setItem] = useState(null);
    const {type} = props;
    const {loading, error, getSearchMovies, clearError} = useMoviesService();


    const onMovieLoaded = (movie) => {
        setItem(movie)
    }

    const onSearchRequest = (title) => {
        clearError();
        getSearchMovies(title)
            .then(onMovieLoaded)
    }

    const ratingStars = (rating) => {
        let goldStarWidth = rating * 10;
        return goldStarWidth;
    } 

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const spinner = loading ? <Spinner/> : null;
    const results = !item ? null : item.title ?
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
                <Link to={`/${type}/${item.id}`} className="movie__item-button button__main">More Info</Link>
                <RatingStars rating={ratingStars(item.rating)}/>
                <div className="movie__rating">Рейтинг: {item.rating} / 10</div>
            </div>
        </li> 
    : 
    <div className="movie__search-error">
        The movie was not found. Check the name and try again
    </div>;

return (
        
    <div className="movie__search-form">
        <Formik
            initialValues = {{
                movieName: ''
            }}
            validationSchema = {Yup.object({
                movieName: Yup.string().required('This field is required')
            })}
            onSubmit = { ({movieName}) => {
                onSearchRequest(movieName);
            }}
        >
            <Form>
                <label className="movie__search-label" htmlFor="movieName">Enter the name of the movie or series:</label>
                <div className="movie__search-wrapper">
                    <Field 
                        id="movieName" 
                        name='movieName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikErrorMessage component="div" className="movie__search-error" name="movieName" />
            </Form>
        </Formik>
        {spinner}
        {errorMessage}
        {results}
    </div>
    
)
}

export default SearchItem;