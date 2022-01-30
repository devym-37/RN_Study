import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

interface Props {
    imageUri: string;
    name: string;
    symbol: string;
    marketRank: number;
}

const CoinDetailHeader = ({ imageUri, name, symbol, marketRank }: Props) => {
    return (
        <View style={styles.container}>
            <Ionicons name='chevron-back-sharp' size={30} color='white' />
            <View style={styles.subContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Text style={styles.name}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={styles.marketRank}>#{marketRank}</Text>
                </View>
            </View>
            <EvilIcons name='user' size={30} color='white' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
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
