import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CoinItem from "@components/CoinItem";
import cryptocurrencies from "./assets/data/cryptocurrencies.json";

export default function App() {
    const renderItem = ({ item }) => <CoinItem marketCoin={item} />;

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <FlatList data={cryptocurrencies} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 50,
    },
});
