import starred from '../assets/star-solid.svg';
import unstarred from '../assets/star-regular.svg';
import styled from "styled-components";
import PropTypes from "prop-types";

const Star = styled.div`
    width: 22px;
    height: 22px;
    img {
        width: 100%;
        height: 100%;
    }
`;

const FavoriteStar = (props) => {
    const {isFavorite, className, onClick} = props;
    const imgPath = isFavorite ? starred : unstarred;
    return (
        <Star onClick={onClick} className={className}>
            <img src={imgPath} alt=""/>
        </Star>
    );
};

FavoriteStar.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default FavoriteStar;