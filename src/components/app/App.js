import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const SeriesPage = lazy(() => import('../pages/SeriesPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const WatchList = lazy(() => import('../pages/WatchList'));
const SingleMovie = lazy(() => import('../pages/singleMovie/SingleMovie'));


const App = () => {

    const [favoriteList, setFavoritesList] = useState([]);

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage favoriteList={favoriteList} setFavoritesList={setFavoritesList}  />}/>

                        <Route path="/search" element={<SearchPage favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>} />

                        <Route path='/series' element={<SeriesPage favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>} />

                        <Route path='/movies/:id' element={<SinglePage Component={SingleMovie} dataType='movies'/>}/>

                        <Route path='/search/:id' element={<SinglePage Component={SingleMovie} dataType='search'/>}/>
                        
                        <Route path='/series/:id' element={<SinglePage Component={SingleMovie} dataType='series'/>}/>

                        <Route path="/watchList" element={<WatchList favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>} />

                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App;