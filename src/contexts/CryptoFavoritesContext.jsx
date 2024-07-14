import { createContext, useState } from 'react';
import PropTypes from "prop-types";

const CryptoFavoritesContext = createContext();

const CryptoFavoritesProvider = ({children}) => {
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            const filteredFavorites = favorites.filter(item => item !== id)
            setFavorites(filteredFavorites);
            localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
        } else {
            const updatedFavorites = [...favorites, id]
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    }

    return (
        <CryptoFavoritesContext.Provider value={{favorites, setFavorites, toggleFavorite}}>
            {children}
        </CryptoFavoritesContext.Provider>
    );
};

CryptoFavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export {CryptoFavoritesContext, CryptoFavoritesProvider};