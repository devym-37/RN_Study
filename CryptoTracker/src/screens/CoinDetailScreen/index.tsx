import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ChartPathProvider, ChartPath, ChartDot, ChartYLabel } from "@rainbow-me/animated-charts";
import { useRoute } from "@react-navigation/native";
import Coin from "../../../assets/data/crypto.json";
import CoinDetailHeader from "./components/CoinDetailHeader";
import { getDetailCoinData, getCoinMarketChart } from "../../services/requests";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DEFAULT_COIN_VALUE = "1";

const CoinDetailScreen = () => {
    const [coinValue, setCoinValue] = useState<string>(DEFAULT_COIN_VALUE);
    const [usdValue, setUsdValue] = useState<string>("");
    const [coin, setCoin] = useState(null);
    const [coinMarketChart, setCoinMarketChart] = useState(null);
    const [loading, setLoading] = useState(true);

    const route = useRoute();

    const {
        params: { coinId },
    } = route;

    const fetchCoinData = async () => {
        const fetchedCoinData = await getDetailCoinData(coinId);
        const fetchedCoinMarketChart = await getCoinMarketChart(coinId);
        setCoinMarketChart(fetchedCoinMarketChart);
        setCoin(fetchedCoinData);
        setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
        setLoading(false);
    };

    useEffect(() => {
        fetchCoinData();
    }, []);

    if (loading || !coin || !coinMarketChart) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    const {
        id,
        image: { small },
        name,
        symbol,
        market_data: { market_cap_rank, current_price, price_change_percentage_24h },
    } = coin;

    const { prices } = coinMarketChart;

    const percentageColor = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

    const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

    const formatCurrency = (value: any) => {
        "worklet";

        if (value === "") {
            if (current_price.usd < 1) {
                return `$${current_price.usd}`;
            }
            return `$${current_price.usd.toFixed(2)}`;
        }
        if (current_price.usd < 1) {
            return `$${parseFloat(value)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };

    const handleChangeCoinValue = (value: any) => {
        setCoinValue(value);
        const floatValue = parseFloat(value.replace(",", ".")) || 0;
        setUsdValue((floatValue * current_price.usd).toString());
    };

    const handleChangeUsdValue = (value: any) => {
        setUsdValue(value);
        const floatValue = parseFloat(value.replace(",", ".")) || 0;
        setCoinValue((floatValue / current_price.usd).toString());
    };

    return (
        <View style={styles.container}>
            <ChartPathProvider
                data={{
                    points: prices.map(([x, y]) => ({ x, y })),
                    smoothingStrategy: "bezier",
                }}
            >
                <CoinDetailHeader coinId={id} imageUri={small} symbol={symbol} marketRank={market_cap_rank} />
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
                    </View>
                    <View style={[styles.pricePercentContainer, { backgroundColor: percentageColor }]}>
                        <AntDesign
                            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
                            size={12}
                            color={"white"}
                            style={styles.icon}
                        />

                        <Text style={styles.pricePercent}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>
                <View>
                    <ChartPath
                        strokeWidth={2}
                        height={SCREEN_WIDTH / 2}
                        stroke={chartColor}
                        screenWidth={2}
                        width={SCREEN_WIDTH}
                    />
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={{ color: "white", alignSelf: "center" }}>{symbol.toUpperCase()}</Text>
                        <TextInput
                            style={styles.input}
                            value={coinValue.toString()}
                            onChangeText={handleChangeCoinValue}
                        />
                    </View>

                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
                        <TextInput
                            style={styles.input}
                            value={usdValue.toString()}
                            keyboardType='numeric'
                            onChangeText={handleChangeUsdValue}
                        />
                    </View>
                </View>
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
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        padding: 10,
        fontSize: 16,
        color: "white",
    },
    loadingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CoinDetailScreen;
