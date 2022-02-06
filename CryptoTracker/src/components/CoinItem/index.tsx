import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

interface Props {
    marketCoin: MarketCoinInfo;
}

export interface MarketCoinInfo {
    id: number;
    name: string;
    current_price: string;
    market_cap_rank: string;
    price_change_percentage_24h: number;
    symbol: string;
    market_cap: number;
    image: string;
}

const CoinItem = ({ marketCoin }: Props) => {
    const { id, name, current_price, market_cap_rank, price_change_percentage_24h, symbol, market_cap, image } = marketCoin;

    const navigation = useNavigation();

    const percentageColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

    const normalizeMarketCap = (marketCap: number) => {
        if (marketCap > 1e12) {
            return `${(marketCap / 1e12).toFixed(3)} T`;
        }
        if (marketCap > 1e9) {
            return `${(marketCap / 1e9).toFixed(3)} B`;
        }
        if (marketCap > 1e6) {
            return `${(marketCap / 1e6).toFixed(3)} M`;
        }
        if (marketCap > 1e3) {
            return `${(marketCap / 1e3).toFixed(3)} K`;
        }
        return marketCap;
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate("CoinDetail", { coinId: id })} style={styles.coinContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <View>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rank}>{market_cap_rank}</Text>
                    </View>
                    <Text style={styles.text}>{symbol.toUpperCase()}</Text>
                    <AntDesign name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={12} color={percentageColor} style={styles.icon} />
                    <Text style={{ color: percentageColor }}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.title}>{current_price}</Text>
                <Text style={styles.marketText}>MCap {normalizeMarketCap(market_cap)}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CoinItem;
