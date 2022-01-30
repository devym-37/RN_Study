import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
    name: string;
    currentPrice: number;
    pricePercentage: number;
}

const CoinDetailScreen = ({ name, currentPrice, pricePercentage }: Props) => {
    const percentageColor = pricePercentage < 0 ? "#ea3943" : "#16c784" || "white";

    return (
        <View style={styles.priceContainer}>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.currnetPrice}>${currentPrice}</Text>
            </View>
            <View style={[styles.pricePercentContainer, { backgroundColor: percentageColor }]}>
                <AntDesign name={pricePercentage < 0 ? "caretdown" : "caretup"} size={12} color={"white"} style={styles.icon} />
                <Text style={styles.pricePercent}>{pricePercentage.toFixed(2)}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    currnetPrice: {
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
