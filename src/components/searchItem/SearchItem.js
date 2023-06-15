import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import * as Yup from 'yup';

import ItemMovie from "../itemMovie/ItemMovie";
import useMoviesService from "../../services/MoviesService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './searchItem.scss';

const SearchItem = ({type, favoriteList, setFavoritesList}) => {
    
    const [item, setItem] = useState(null);
    const {loading, error, getSearchMovies, clearError} = useMoviesService();


    const onMovieLoaded = (movie) => {
        setItem(movie)
    }

    const onSearchRequest = (title) => {
        clearError();
        getSearchMovies(title)
            .then(onMovieLoaded)
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const spinner = loading ? <Spinner/> : null;
    const results = !item ? null : item.title ?
            <ul className="movie__grid">
                <ItemMovie item={item} type={type} setFavoritesList={setFavoritesList} favoriteList={favoriteList} />
            </ul>
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