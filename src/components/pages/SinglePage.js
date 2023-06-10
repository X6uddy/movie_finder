import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


import useMoviesService from '../../services/MoviesService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePage = ({Component, dataType}) => {
    
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getMovieById, clearError, getMovieByIdFromAPI} = useMoviesService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'movies':
                getMovieById(dataType ,id).then(onDataLoaded);
                break;
            case 'series':
                getMovieById(dataType ,id).then(onDataLoaded);
                break;
            case 'search':
                getMovieByIdFromAPI(id).then(onDataLoadedBySearch);
                break;
            // case 'actors':
            //     getCharacter(id).then(onDataLoaded);
            //     break;
            default: 
                throw new ErrorMessage('Sorry, something went wrong. Please go back to the previous page');
        }
    }

    const onDataLoaded = (data) => {
        setData(data[0]);
    }

    const onDataLoadedBySearch = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
    
}

export default SinglePage;