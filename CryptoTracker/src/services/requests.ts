import axios from "axios";

export const getDetailCoinData = async (coinId: string) => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );

        return response.data;
    } catch (e) {
        console.log("getDetailCoinData error : ", e);
    }
};

export const getCoinMarketChart = async (coinId: string) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`);
        return response.data;
    } catch (e) {
        console.log("getCoinMarketChart error : ", e);
    }
};

export const getMarketData = async (pageNumber = 1) => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
        );
        return response.data;
    } catch (e) {
        console.log("getMarketData error : ", e);
    }
};

export const getWatchlistedCoins = async (pageNumber = 1, coinIds: string) => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getAllCoins = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
};
