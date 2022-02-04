import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { ChartPathProvider, ChartPath } from "@rainbow-me/animated-charts";
import Coin from "../../../assets/data/crypto.json";
import CoinDetailHeader from "./components/CoinDetailHeader";

const { width: screenWidth } = Dimensions.get("window");

const CoinDetailScreen = () => {
    const {
        image: { small },
        name,
        symbol,
        prices,
        market_data: { market_cap_rank, current_price, price_change_percentage_24h },
    } = Coin;
    const percentageColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

    return (
        <View style={styles.container}>
            <ChartPathProvider data={{ points: prices.map((price) => ({ x: price[0], y: price[1] })), smoothingStrategy: "bezier" }}>
                <CoinDetailHeader imageUri={small} symbol={symbol} marketRank={market_cap_rank} />
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.currentPrice}>${current_price.usd}</Text>
                    </View>
                    <View style={[styles.pricePercentContainer, { backgroundColor: percentageColor }]}>
                        <AntDesign name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={12} color={"white"} style={styles.icon} />

                        <Text style={styles.pricePercent}>{price_change_percentage_24h.toFixed(2)}%</Text>
                    </View>
                </View>

                <ChartPath height={screenWidth / 2} stroke='yellow' width={screenWidth} />
                <ChartPath style={{ backgroundColor: "blue" }} />
            </ChartPathProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    priceContainer: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        color: "white",
        fontSize: 15,
    },
    currentPrice: {
        color: "white",
        fontSize: 30,
        fontWeight: "600",
        letterSpacing: 1,
    },
    pricePercentContainer: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
        flexDirection: "row",
    },
    pricePercent: {
        color: "white",
        fontSize: 17,
        fontWeight: "500",
    },
    icon: {
        alignSelf: "center",
        marginRight: 5,
    },
});

export default CoinDetailScreen;
