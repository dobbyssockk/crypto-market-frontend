import axios from 'axios';

class CryptoService {
    async getAssets(params) {
        const res = await axios.get('https://api.coincap.io/v2/assets', {
            params: {
                ...params,
            }
        });
        const assets = res.data.data;
        return assets.map(asset => ({
            id: asset.id,
            symbol: asset.symbol,
            name: asset.name,
            price: asset.priceUsd,
            logoUrl: `https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
        }));
    }
    async getAssetDetails(id) {
        const res = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        const asset = res.data.data;
        const candleRes = await axios.get(`http://localhost:3001/candles/${asset.symbol}`);
        return {
            id: asset.id,
            symbol: asset.symbol,
            name: asset.name,
            price: asset.priceUsd,
            change: asset.changePercent24Hr,
            logoUrl: `https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
            candles: candleRes.data,
        };
    }
}

export default CryptoService;