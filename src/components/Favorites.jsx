import styled from 'styled-components';
import CurrencyList from "./CurrencyList.jsx";
import {useContext, useEffect, useState} from "react";
import {CryptoFavoritesContext} from "../contexts/CryptoFavoritesContext.jsx";
import CryptoService from "../services/CryptoService.js";

const Container = styled.div`
    width: 760px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;
    h2 {
        font-size: 34px;
    }
    div {
        font-size: 14px;
    }
`;

const Favorites = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {favorites} = useContext(CryptoFavoritesContext);

    const cryptoService = new CryptoService();

    useEffect(() => {
        onRequest();
    }, [favorites]);

    const onRequest = async () => {
        try {
            setLoading(true);
            if (!favorites.length) return setData([]);
            const res = await cryptoService.getAssets({ids: favorites.join(',')});
            setData(res);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Wrapper>
                <h2>Favorites</h2>
            </Wrapper>
            <CurrencyList data={data} loading={loading} error={error}></CurrencyList>
        </Container>
    );
};

export default Favorites;