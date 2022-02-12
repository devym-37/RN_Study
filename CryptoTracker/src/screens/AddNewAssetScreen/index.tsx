import React, { FC, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useNavigation } from "@react-navigation/native";

interface Props {}

const AddNewAssetScreen: FC<Props> = () => {
    const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <SearchableDropDown
                items={[]}
                onItemSelect={(item) => console.log("item", item)}
                containerStyle={styles.dropDownContainer}
                itemStyle={styles.itemStyle}
                itemTextStyle={styles.itemText}
                resetValue={false}
                placeholder={"Select a coin..."}
                placeholderTextColor='white'
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1.5,
                        borderColor: "#444444",
                        borderRadius: 5,
                    },
                }}
            />
            <View style={styles.boughtQuantityContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={boughtAssetQuantity}
                        placeholder='0'
                        keyboardType='numeric'
                        style={styles.textInput}
                        onChangeText={setBoughtAssetQuantity}
                    />
                    <Text style={styles.coinIdText}>BTC</Text>
                </View>
                <Text style={styles.pricePerCoin}>$4000 per coin</Text>
            </View>
            <Pressable
                style={styles.buttonContainer}
                onPress={() => navigation.navigate("AddNewAssetScreen")}
            >
                <Text style={styles.buttonText}>Add New Asset</Text>
            </Pressable>
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
        color: "white",
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
