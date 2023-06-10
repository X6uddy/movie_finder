import { useHttp } from "../hooks/http.hook";
import imgnotFound from '../resources/imgnotFound.jpg'

const useMoviesService = () => {

    const {loading, getResource, error, clearError} = useHttp();
    const _type = 'movies';


    const getTrendingMovies = async (type = _type) => {
        const res = await getResource(`http://localhost:3000/popular_${type}`);
        return res.map(_transformMovies);
    }; 

    const getMovieById = async (type = _type, id) => {
        const res = await getResource(`http://localhost:3000/popular_${type}?id=${id}`)
        return res.map(_transformMovies);
    };

    const getSearchMovies = async (title) => {
        const res = await getResource(`http://www.omdbapi.com/?t=${title}&apikey=4a9888d9&plot=full`);
        return _transformSearch(res);
    };

    const getMovieByIdFromAPI = async (id) => {
        const res = await getResource(`http://www.omdbapi.com/?i=${id}&apikey=4a9888d9`);
        return _transformSearch(res);
    };



    const _transformMovies = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            image: movie.image,
            releaseYear: movie.releaseYear,
            genre: movie.genre,
            description: movie.description,
            rating: movie.rating,
            director: movie.director,
            country: movie.country
        }
    };

    const _transformSearch = (movie) => {
        return {
            id: movie.imdbID,
            title: movie.Title,
            image: movie.Poster,
            releaseYear: movie.Year,
            genre: movie.Genre,
            description: `${movie.Plot.slice(0, 200)}...`,
            rating: movie.imdbRating,
            director: movie.Director,
            country: movie.Country
        }
    }

    return {loading, error, clearError, getSearchMovies, getTrendingMovies, getMovieById, getMovieByIdFromAPI};
}

export default useMoviesService;