import {useEffect, useState} from 'react';
import CurrencyList from './CurrencyList';
import styled from "styled-components";
import CryptoService from "../services/CryptoService.js";
import search from '../assets/search.svg';

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

    .container {
        position: relative;
        display: flex;
        border-radius: 30px;
        overflow: hidden;

        input {
            width: 240px;
            font-size: 14px;
            background-color: #645F5F;
            padding: 8px 15px;
            padding-right: 55px;
            border: none;
            border-radius: 30px;
            color: #FFFFFF;
            outline: none;
        }

        input::placeholder {
            color: rgba(255, 255, 255, 0.68);
        }

        button {
            position: absolute;
            padding: 5px 0;
            width: 50px;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #6e6d6b;
            border: none;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
        button:active {
            opacity: 0.6;
        }
    }
`;

const Market = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [asset, setAsset] = useState("");

    const cryptoService = new CryptoService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = async () => {
        try {
            const res = await cryptoService.getAssets({limit: 6});
            setData(res);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const onSearch = async () => {
        try {
            setLoading(true);
            const res = await cryptoService.getAssets({limit: 6, search: asset});
            setData(res);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Wrapper>
                <h2>Market</h2>
                <div className="container">
                    <input type="text" value={asset} onChange={(e) => setAsset(e.target.value)} placeholder="Enter symbol (bitcoin, BTC...)"/>
                    <button onClick={onSearch}>
                        <img src={search} alt="search"/>
                    </button>
                </div>
            </Wrapper>
            <CurrencyList data={data} loading={loading} error={error}></CurrencyList>
        </Container>
    );
};

export default Market;