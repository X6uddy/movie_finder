import InitialWindow from "../initialWindow/InitialWindow";
import PageHeader from "../pageHeader/PageHeader";

const SeriesPage = ({favoriteList, setFavoritesList}) => {
    return (
        <>
        <PageHeader/>
        <InitialWindow type = "series" favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>
        </>
    )
}

export default SeriesPage;