import { useState } from "react";

import InitialWindow from "../initialWindow/InitialWindow";
import PageHeader from "../pageHeader/PageHeader";
import SinglePage from "./SinglePage";

const MainPage = () => {
    
    return (
        <>
        <PageHeader/>
        <InitialWindow type = "movies"/>
        </>
    )
}

export default MainPage;