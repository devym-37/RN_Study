import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PortfolioAssetItem from "../PortfolioAssetItem";

interface Props {}

const PortfolioAssetsList: FC<Props> = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return <PortfolioAssetItem assetItem={item} />;
    };

    const renderListHeader = () => {
        return (
            <>
                <View style={styles.balanceContainer}>
                    <View>
                        <Text style={styles.currentBalance}>
                            Current Balance
                        </Text>
                        <Text style={styles.currentBalanceValue}>${1111}</Text>
                        <Text
                            style={{
                                ...styles.valueChange,
                                color: true ? "green" : "red",
                            }}
                        >
                            ${1111} (All Time)
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.priceChangePercentageContainer,
                            backgroundColor: true ? "green" : "red",
                        }}
                    >
                        <AntDesign
                            name={true ? "caretup" : "caretdown"}
                            size={12}
                            color={"white"}
                            style={{ alignSelf: "center", marginRight: 5 }}
                        />
                        <Text style={styles.percentageChange}>{1.2}%</Text>
                    </View>
                </View>
                <Text style={styles.assetsLabel}>Your Assets</Text>
            </>
        );
    };

    const renderFooter = () => {
        return (
            <Pressable
                style={styles.buttonContainer}
                onPress={() => navigation.navigate("AddNewAssetScreen")}
            >
                <Text style={styles.buttonText}>Add New Asset</Text>
            </Pressable>
        );
    };

    return (
        <View>
            <Text>PortfolioAssetsList</Text>
            <FlatList
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={renderListHeader()}
                ListFooterComponent={renderFooter()}
            />
        </View>
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
        fontSize: 15,
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
        fontWeight: "500",
        fontSize: 17,
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
