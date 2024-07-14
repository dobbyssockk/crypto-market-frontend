import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import CryptoService from "../services/CryptoService.js";
import Message from "../components/Message.jsx";
import Spinner from "../components/Spinner.jsx";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

const Container = styled.div`
    padding-top: 50px;
    width: 800px;
    display: flex;
    flex-direction: column;
    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            .info {
                margin-left: 10px;
                h2 {
                    color: white;
                    font-size: 18px;
                    margin: 0 0 8px 0;
                }
                .date {
                    font-size: 13px;
                    color: grey;
                }
            }
        }
        .change {
            color: white;
            font-size: 18px;
        }
    }
`;

const CurrencyDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const cryptoService = new CryptoService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = async () => {
        try {
            const res = await cryptoService.getAssetDetails(id);
            setData(res);
            const transformedCandles = res.candles.map(candle => ({
                x: new Date(candle.timestamp),
                y: [candle.open, candle.high, candle.low, candle.close]
            }));
            setChartData({
                series: [{
                    data: transformedCandles
                }],
                options: {
                    chart: {
                        type: 'candlestick',
                        height: 500
                    },
                    title: {
                        text: 'CandleStick Chart',
                        align: 'left'
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true
                        }
                    }
                },
            });
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const spinnerComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <Message>Something is going wrong... Try again!</Message> : null;
    const content = (!loading && !error && data) ? <Currency data={data} /> : null;
    const chartComponent = (chartData?.series?.[0]?.data?.length) ? <ReactApexChart options={chartData.options} series={chartData.series} type="candlestick" height={350} /> : null;

    return (
        <Container>
            {spinnerComponent || errorComponent || content}
            {chartComponent}
        </Container>
    );
};

const Currency = (props) => {
    const data = props.data;

    return (
        <div className="flex">
            <div className="wrapper">
                <div>
                    <img src={data.logoUrl} alt=""/>
                </div>
                <div className="info">
                    <h2>{data.name} ({data.symbol})</h2>
                    <div className="date">{dayjs().format('ddd MMM DD YYYY')}</div>
                </div>
            </div>
            <div className="change">
                CHANGE <span style={{color: data.change < 0 ? "rgb(244, 67, 54)" : "rgb(24, 198, 131)"}}>
                    {parseFloat(data.change).toFixed(2)}%
                </span>
            </div>
        </div>
    );
}

Currency.propTypes = {
    data: PropTypes.object.isRequired
}

export default CurrencyDetail;