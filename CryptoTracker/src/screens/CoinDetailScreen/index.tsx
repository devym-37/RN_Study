import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import Coin from "../../../assets/data/crypto.json";
import CoinDetailHeader from "./components/CoinDetailHeader";

const CoinDetailScreen = () => {
    const {
        image: { small },
        name,
        symbol,
        market_data: { market_cap_rank },
    } = Coin;

    return (
        <>
            <CoinDetailHeader imageUri={small} name={name} symbol={symbol} marketRank={market_cap_rank} />
        </>
    );
};

const styles = StyleSheet.create({});

export default CoinDetailScreen;
