import React, { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailCoinData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

const AddNewAssetScreen: FC<Props> = () => {
    const [allCoins, setAllCoins] = useState([]);
    const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const [assetsInStorage, setAssetsInStorage] = useRecoilState(allPortfolioBoughtAssetsInStorage);
    const navigation = useNavigation();

    useEffect(() => {
        fetchAllCoins();
    }, []);

    useEffect(() => {
        if (selectedCoinId) {
            fetchCoinInfo();
        }
    }, [selectedCoinId]);

    const fetchAllCoins = async () => {
        if (loading) return;

        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins);

        setLoading(false);
    };

    const fetchCoinInfo = async () => {
        if (selectedCoinId === null) return;
        if (loading) return;

        setLoading(true);
        const coinInfo = await getDetailCoinData(selectedCoinId);
        setSelectedCoin(coinInfo);

        setLoading(false);
    };

    const emptyAssetQuantity = () => boughtAssetQuantity === "";

    const onAddNewAsset = async () => {
        const newAsset = {
            id: selectedCoin.id,
            name: selectedCoin.name,
            image: selectedCoin.image.small,
            ticker: selectedCoin.symbol.toUpperCase(),
            quantityBought: parseFloat(boughtAssetQuantity),
            priceBought: selectedCoin.market_data.current_price.usd,
        };
        const newAssets = [...assetsInStorage, newAsset];
        const jsonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_coin", jsonValue);
        setAssetsInStorage(newAssets);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <SearchableDropDown
                items={allCoins}
                onItemSelect={(item) => setSelectedCoinId(item.id)}
                containerStyle={styles.dropDownContainer}
                itemStyle={styles.itemStyle}
                itemTextStyle={styles.itemText}
                resetValue={false}
                placeholder={selectedCoinId || "Select a coin..."}
                placeholderTextColor='white'
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1.5,
                        borderColor: "#444444",
                        borderRadius: 5,
                        backgroundColor: "#1e1e1e",
                        color: "white",
                    },
                }}
            />
            {selectedCoin && (
                <>
                    <View style={styles.boughtQuantityContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={boughtAssetQuantity}
                                placeholder='0'
                                keyboardType='numeric'
                                style={styles.textInput}
                                onChangeText={setBoughtAssetQuantity}
                            />
                            <Text style={styles.coinIdText}>{selectedCoin.symbol.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.pricePerCoin}>
                            ${selectedCoin.market_data.current_price.usd * boughtAssetQuantity} per coin
                        </Text>
                    </View>
                    <Pressable
                        style={[
                            styles.buttonContainer,
                            { backgroundColor: emptyAssetQuantity() ? "#303030" : "#4169E1" },
                        ]}
                        onPress={onAddNewAsset}
                        // onPress={() => AsyncStorage.clear()}
                        disabled={emptyAssetQuantity()}
                    >
                        <Text style={[styles.buttonText, { color: emptyAssetQuantity() ? "grey" : "white" }]}>
                            Add New Asset
                        </Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropDownContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#444444",
        borderRadius: 5,
    },
    itemText: {
        color: "white",
    },
    textInputContainer: {
        flexDirection: "row",
    },
    textInput: {
        color: "white",
        fontSize: 90,
    },
    coinIdText: {
        color: "grey",
        fontWeight: "700",
        fontSize: 20,
        marginTop: 25,
        marginLeft: 5,
    },
    boughtQuantityContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
    },
    buttonContainer: {
        backgroundColor: "#4169E1",
        padding: 10,
        alignItems: "center",
        marginVertical: 40,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "600",
    },
    pricePerCoin: {
        color: "grey",
        fontWeight: "600",
        fontSize: 17,
        letterSpacing: 0.5,
    },
});

export default AddNewAssetScreen;
