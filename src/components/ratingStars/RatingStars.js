import blackStars from '../../resources/blackStar.png';
import goldStar from '../../resources/goldStar.png';

import "./ratingStars.scss";

const RatingStars = (props) => {
    const starStyle = {
        width: props.rating + '%'
    }
    return (
        <div className="ratingStars">
            <div className="goldStars" style={starStyle}></div>
        </div>
    )
}
export default RatingStars;