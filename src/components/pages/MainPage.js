import { useState } from "react";

import InitialWindow from "../initialWindow/InitialWindow";
import PageHeader from "../pageHeader/PageHeader";
import SinglePage from "./SinglePage";

const MainPage = ({favoriteList, setFavoritesList}) => {
    
    return (
        <>
        <PageHeader/>
        <InitialWindow type = "movies" favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>
        </>
    )
}

export default MainPage;