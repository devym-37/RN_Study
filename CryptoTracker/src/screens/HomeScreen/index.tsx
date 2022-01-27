import React from "react";
import { FlatList } from "react-native";
import CoinItem, { MarketCoinInfo } from "@components/CoinItem";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";

const HomeScreen = () => {
    const renderItem = ({ item }: MarketCoinInfo) => <CoinItem marketCoin={item} />;

    return <FlatList data={cryptocurrencies} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />;
};

export default HomeScreen;
