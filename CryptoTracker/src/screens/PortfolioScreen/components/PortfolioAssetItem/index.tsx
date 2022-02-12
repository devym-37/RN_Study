import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
    assetItem: AssetInfo;
}

interface AssetInfo {
    currentPrice: number;
    image: string;
    name: string;
    priceChangePercentage: number;
    quantityBought: number;
    ticker: string;
}

const PortfolioAssetItem = ({ assetItem }: Props) => {
    const {
        currentPrice,
        image,
        name,
        priceChangePercentage,
        quantityBought,
        ticker,
    } = assetItem;

    const isChangePositive = () => priceChangePercentage >= 0;

    const renderHoldings = () => (quantityBought * currentPrice).toFixed(2);

    return (
        <View style={styles.coinContainer}>
            <Image
                source={{ uri: image }}
                style={{
                    height: 30,
                    width: 30,
                    marginRight: 10,
                    alignSelf: "center",
                }}
            />
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.ticker}>{ticker}</Text>
            </View>
            <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                <Text style={styles.title}>{currentPrice}</Text>
                <View style={{ flexDirection: "row" }}>
                    <AntDesign
                        name={isChangePositive() ? "caretup" : "caretdown"}
                        size={12}
                        color={isChangePositive() ? "#16c784" : "#ea3943"}
                        style={{ alignSelf: "center", marginRight: 5 }}
                    />
                    <Text
                        style={{
                            color: isChangePositive() ? "#16c784" : "#ea3943",
                            fontWeight: "600",
                        }}
                    >
                        {priceChangePercentage?.toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.title}>${renderHoldings()}</Text>
                <Text style={styles.ticker}>
                    {quantityBought} {ticker}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "flex-end",
    },
    ticker: {
        color: "grey",
        fontWeight: "700",
    },
    coinContainer: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#121212",
    },
    quantityContainer: {
        marginLeft: "auto",
        alignItems: "flex-end",
    },
});

export default PortfolioAssetItem;
