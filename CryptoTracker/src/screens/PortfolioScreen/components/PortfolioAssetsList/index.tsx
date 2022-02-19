import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRecoilValue, useRecoilState } from "recoil";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PortfolioAssetItem from "../PortfolioAssetItem";
import { allPortfolioAssets, allPortfolioBoughtAssetsInStorage } from "../../../../atoms/PortfolioAssets";

interface Props {}

const PortfolioAssetsList: FC<Props> = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(allPortfolioAssets);
    const [storageAssets, setStorageAssets] = useRecoilState(allPortfolioBoughtAssetsInStorage);

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

    const onDeleteAsset = async (asset) => {
        const newAssets = storageAssets.filter((coin) => coin.unique_id !== asset.item.unique_id);
        const jsonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_coins", jsonValue);
        setStorageAssets(newAssets);
    };

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

    const renderDeleteButton = (data) => {
        return (
            <Pressable style={styles.deleteButtonContainer} onPress={() => onDeleteAsset(data)}>
                <FontAwesome name='trash-o' size={24} color='white' />
            </Pressable>
        );
    };

    return (
        <SwipeListView
            data={assets}
            keyExtractor={({ id }, index) => `${id}${index}`}
            renderItem={renderItem}
            rightOpenValue={-75}
            disableRightSwipe
            closeOnRowPress
            renderHiddenItem={(data) => renderDeleteButton(data)}
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
    },
    balanceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    priceChangePercentageContainer: {
        flexDirection: "row",
        paddingHorizontal: 3,
        paddingVertical: 8,
        borderRadius: 5,
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
    deleteButtonContainer: {
        flex: 1,
        backgroundColor: "#EA3943",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 30,
        marginLeft: 20,
    },
});

export default PortfolioAssetsList;
