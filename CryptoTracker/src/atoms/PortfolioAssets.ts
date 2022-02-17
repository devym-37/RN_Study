import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchListedCoins } from "../services/requests";

export const allPortfolioBoughtAssets = selector({
    key: "allPortfolioBoughtAssets",
    get: async () => {
        const jsonValue = await AsyncStorage.getItem("@portfolio_coins");
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    },
});

export const allPortfolioBoughtAssetsFromAPI = selector({
    key: "allPortfolioBoughtAssetsFromAPI",
    get: async ({ get }) => {
        const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
        const portfolioAssetsMarketData = await getWatchListedCoins(
            1,
            boughtPortfolioAssets.map((portfolioAsset: any) => portfolioAsset.id).join(",")
        );

        const boughtAssets = boughtPortfolioAssets.map((boughtAsset: any) => {
            const portfolioAsset = portfolioAssetsMarketData.filter((item: any) => boughtAsset.id === item.id)[0];
            return {
                ...boughtAsset,
                currentPrice: portfolioAsset.current_price,
                priceChangePercentage: portfolioAsset.price_change_percentage_24h,
            };
        });

        return boughtAssets.sort(
            (item1: any, item2: any) =>
                item1.quantityBought * item1.currentPrice < item2.quantityBought * item2.currentPrice
        );
    },
});

export const allPortfolioAssets = atom({
    key: "allPortfolioAssets",
    default: allPortfolioBoughtAssetsFromAPI,
});

export const allPortfolioBoughtAssetsInStorage = atom({
    key: "allPortfolioBoughtAssetsInStorage",
    default: allPortfolioBoughtAssets,
});
