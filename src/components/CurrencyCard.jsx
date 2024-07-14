import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteStar from "./FavoriteStar.jsx";
import {useContext} from "react";
import {CryptoFavoritesContext} from "../contexts/CryptoFavoritesContext.jsx";

const Card = styled.div`
    position: relative;
    background-color: #2A2A2D;
    color: #FFFFFF;
    width: 246px;
    border-radius: 20px;
    padding: 18px;
    cursor: pointer;
    .icon {
        width: 35px;
        height: 35px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .currency_info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-right: 16px;
        .name {
            flex: 1;
            padding: 0 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .symbol {
            font-size: 12px;
            color: #AB9F9F;
        }
        .star {
            display: none;
            position: absolute;
            top: 9px;
            right: 8px;
        }
        .favorite {
            display: block;
        }
    }
    .price {
        text-align: center;
    }
    &:hover .star {
        display: block;
    }
`;

const CurrencyCard = (props) => {
    const {id, symbol, name, price, logoUrl} = props;
    const {favorites, toggleFavorite} = useContext(CryptoFavoritesContext);
    const navigate  = useNavigate();

    const isFavorite = favorites.includes(id);
    const favStarClasses = isFavorite ? 'star favorite' : 'star';

    const handleClick = () => {
        navigate(`/currency/${id}`);
    };

    return (
        <Card onClick={handleClick}>
            <div className="currency_info">
                <div className="icon">
                    <img src={logoUrl} alt="currency icon"/>
                </div>
                <div className="name">{name}</div>
                <div className="symbol">{symbol.toUpperCase()}</div>
                <FavoriteStar
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(id);
                    }}
                    isFavorite={isFavorite}
                    className={favStarClasses}
                />
            </div>
            <div className="price">$ {price}</div>
        </Card>
    );
};

CurrencyCard.propTypes = {
    id: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired
}

export default CurrencyCard;