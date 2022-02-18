import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PortfolioAssetItem from "../PortfolioAssetItem";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortfolioAssets } from "../../../../atoms/PortfolioAssets";

interface Props {}

const PortfolioAssetsList: FC<Props> = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(allPortfolioAssets);
    console.log("assets", assets);
    const getCurrentBalance = () =>
        assets.reduce((total, currentAsset) => total + currentAsset.currentPrice * currentAsset.quantityBought, 0);

    const getCurrentValueChange = () => {
        const currentBalance = getCurrentBalance();
        const boughtBalance = assets.reduce(
            (total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought,
            0
        );

        return currentBalance - boughtBalance;
    };

    const getCurrentPercentageChange = () => {
        const currentBalance = getCurrentBalance();
        const boughtBalance = assets.reduce(
            (total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought,
            0
        );

        if (boughtBalance === 0) return 0;

        return (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0;
    };

    const isChangePositive = () => getCurrentValueChange() >= 0;

    const renderItem = ({ item }) => {
        return <PortfolioAssetItem assetItem={item} />;
    };

    const renderListHeader = () => {
        return (
            <>
                <View style={styles.balanceContainer}>
                    <View>
                        <Text style={styles.currentBalance}>Current Balance</Text>
                        <Text style={styles.currentBalanceValue}>${getCurrentBalance().toFixed(2)}</Text>
                        <Text
                            style={{
                                ...styles.valueChange,
                                color: isChangePositive() ? "green" : "red",
                            }}
                        >
                            ${getCurrentValueChange().toFixed(2)} (All Time)
                        </Text>
                    </View>
                    {getCurrentPercentageChange() !== 0 && (
                        <View
                            style={{
                                ...styles.priceChangePercentageContainer,
                                backgroundColor: isChangePositive() ? "green" : "red",
                            }}
                        >
                            <AntDesign
                                name={isChangePositive() ? "caretup" : "caretdown"}
                                size={12}
                                color={"white"}
                                style={{ alignSelf: "center", marginRight: 5 }}
                            />
                            <Text style={styles.percentageChange}>{getCurrentPercentageChange()}%</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.assetsLabel}>Your Assets</Text>
            </>
        );
    };

    const renderFooter = () => {
        return (
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate("AddNewAssetScreen")}>
                <Text style={styles.buttonText}>Add New Asset</Text>
            </Pressable>
        );
    };

    return (
        <FlatList
            data={assets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListHeaderComponent={renderListHeader()}
            ListFooterComponent={renderFooter()}
        />
    );
};

const styles = StyleSheet.create({
    currentBalance: {
        color: "white",
        fontWeight: "600",
        fontSize: 15,
    },
    currentBalanceValue: {
        color: "white",
        fontSize: 40,
        fontWeight: "700",
        letterSpacing: 1,
    },
    valueChange: {
        fontWeight: "600",
        fontSize: 16,
        color: "white",
    },
    percentageChange: {
        color: "white",
        fontWeight: "600",
        fontSize: 17,
        alignSelf: "flex-end",
        flex: 1,
    },
    balanceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10,
    },
    priceChangePercentageContainer: {
        flexDirection: "row",
        paddingHorizontal: 3,
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "flex-end",
    },
    assetsLabel: {
        color: "white",
        fontSize: 23,
        fontWeight: "700",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: "#4169E1",
        padding: 10,
        alignItems: "center",
        marginVertical: 25,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default PortfolioAssetsList;
