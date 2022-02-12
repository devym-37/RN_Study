import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../Contexts/WatchListContext";

interface Props {
    coinId: number;
    imageUri: string;
    symbol: string;
    marketRank: number;
}

const CoinDetailHeader = ({ coinId, imageUri, symbol, marketRank }: Props) => {
    const navigation = useNavigation();
    const { watchListCoinIds, saveWatchListCoinId, removeWatchListCoinId } =
        useWatchList();
    console.log("watchListCoinIds", watchListCoinIds);
    console.log("coinId", coinId);
    const checkIfCoinWatchListed = () =>
        watchListCoinIds.some(
            (watchedCoinId: string) => watchedCoinId === coinId
        );

    const handleClickWatchedCoin = () => {
        if (checkIfCoinWatchListed()) {
            removeWatchListCoinId(coinId);
        } else {
            console.log("saveWatchListCoinId");
            saveWatchListCoinId(coinId);
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons
                name='chevron-back-sharp'
                size={30}
                color='white'
                onPress={() => navigation.goBack()}
            />
            <View style={styles.subContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Text style={styles.name}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={styles.marketRank}>#{marketRank}</Text>
                </View>
            </View>
            <FontAwesome
                name={checkIfCoinWatchListed() ? "star" : "star-o"}
                size={25}
                color={checkIfCoinWatchListed() ? "#FFBF00" : "white"}
                onPress={handleClickWatchedCoin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    subContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 25,
        height: 25,
    },
    name: {
        color: "white",
        fontWeight: "bold",
        marginHorizontal: 5,
        fontSize: 17,
    },
    marketRank: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    rankContainer: {
        backgroundColor: "#585858",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
});

export default CoinDetailHeader;
