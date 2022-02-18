import React, { FC, useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { useWatchList } from "../../Contexts/WatchListContext";
import CoinItem, { MarketCoinInfo } from "../../components/CoinItem";
import { getWatchListedCoins } from "../../services/requests";

interface Props {}

const WatchListScreen: FC<Props> = () => {
    const { watchListCoinIds } = useWatchList();

    const [likeCoins, setLikeCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const transformCoinIds = () => watchListCoinIds.join("%2C");

    useEffect(() => {
        if (watchListCoinIds.length > 0) {
            fetchWatchListedCoins();
        }
    }, [watchListCoinIds]);

    const fetchWatchListedCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coinsData = await getWatchListedCoins(1, transformCoinIds());

        setLikeCoins(coinsData);
        setLoading(false);
    };

    const renderItem = ({ item }: MarketCoinInfo) => <CoinItem marketCoin={item} />;

    return (
        <FlatList
            data={likeCoins}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={loading} tintColor='white' onRefresh={fetchWatchListedCoins} />}
        />
    );
};

const styles = StyleSheet.create({});

export default WatchListScreen;
