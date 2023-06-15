import PageHeader from "../pageHeader/PageHeader";
import SearchItem from "../searchItem/SearchItem";

const SearchPage = ({favoriteList, setFavoritesList}) => {
    return (
        <>
        <PageHeader/>
        <SearchItem type='search' favoriteList={favoriteList} setFavoritesList={setFavoritesList}/>
        </>
    )
}
export default SearchPage;