import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import CoinItem, { MarketCoinInfo } from "../../components/CoinItem";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import { getMarketData } from "../../services/requests";

const LIMIT_DATA = 50;

const HomeScreen = () => {
    const [coins, setCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const pageNo = useRef(1);

    useEffect(() => {
        fetchCoins(pageNo.current);
    }, []);

    const fetchCoins = async (pageNumber: number) => {
        const coinsData = await getMarketData(pageNumber);
        if (coinsData.length === LIMIT_DATA) {
            pageNo.current += 1;
        }
        setCoins((prevState) => [...prevState, ...coinsData]);
        setLoading(false);
    };

    const refetchCoins = async () => {
        setLoading(true);
        pageNo.current = 1;
        const coinsData = await getMarketData(pageNo.current);
        setCoins(coinsData);
        setLoading(false);
    };

    const renderItem = ({ item }: MarketCoinInfo) => <CoinItem marketCoin={item} />;

    if (loading || !coins) {
        return <ActivityIndicator />;
    }

    return (
        <FlatList
            data={coins}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={loading} tintColor='white' onRefresh={refetchCoins} />}
            onEndReached={() => fetchCoins(pageNo.current)}
        />
    );
};

export default HomeScreen;
