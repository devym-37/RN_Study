import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    children: React.ReactElement;
}

const WatchListContext = createContext([]);

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }: Props) => {
    const [watchListCoinIds, setWatchListCoinIds] = useState<string[]>([]);

    useEffect(() => {
        getWatchListDate();
    }, []);

    const getWatchListDate = async () => {
        try {
            const response = await AsyncStorage.getItem("@watchList_coins");

            setWatchListCoinIds(response !== null ? JSON.parse(response) : []);
        } catch (e) {
            console.log("getWatchListDate : ", e);
        }
    };

    const saveWatchListCoinId = async (coinId: string) => {
        try {
            const newWatchList = [...watchListCoinIds, coinId];
            const saveCoins = JSON.stringify(newWatchList);
            await AsyncStorage.setItem("@watchList_coins", saveCoins);
            setWatchListCoinIds(newWatchList);
        } catch (e) {
            console.log("storeWatchListDate", e);
        }
    };

    const removeWatchListCoinId = async (coinId: string) => {
        const watchList = watchListCoinIds.filter((coin) => coin !== coinId);
        const saveCoins = JSON.stringify(watchList);
        await AsyncStorage.setItem("@watchList_coins", saveCoins);
        setWatchListCoinIds(watchList);
    };

    return (
        <WatchListContext.Provider
            value={{
                watchListCoinIds,
                saveWatchListCoinId,
                removeWatchListCoinId,
            }}
        >
            {children}
        </WatchListContext.Provider>
    );
};

export default WatchListProvider;
