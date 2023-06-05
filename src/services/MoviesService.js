import { useHttp } from "../hooks/http.hook";

const useMoviesService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://ott-details.p.rapidapi.com/advancedsearch';
    const _pageOffset = 1;
    const _startYear = 2022;
    const _endYear = 2023;
    const _minRate = 7;
    const _maxRate = 10;
    const _type = 'movie';


    const getTrendingMovies = async (
                                    offset = _pageOffset,
                                    startYear = _startYear,
                                    endYear = _endYear,
                                    minRate = _minRate,
                                    maxRate = _maxRate,
                                    type = _type
                                    ) => {
        // const res = await request(`${_apiBase}?start_year=${startYear}&end_year=${endYear}&min_imdb=${minRate}&max_imdb=${maxRate}&language=english&type=${type}&sort=latest&page=${offset}`);
        const res = await request(`https://ott-details.p.rapidapi.com/advancedsearch?start_year=2022&end_year=2023&min_imdb=7&max_imdb=10&language=english&type=movie&sort=latest&page=1`);
        return res.results.map(_transformMovies);
    }; 

    const _transformMovies = (movie) => {
        return {
            id: movie.imdbid,
            title: movie.title,
            description: movie.synopsis,
            year: movie.released,
            score: movie.imdbrating,
            thumbnail: movie.imageurl,
            type: movie.type
        };
    };

    return {loading, error, clearError, getTrendingMovies};
}

export default useMoviesService;