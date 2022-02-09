import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailScreen from "./src/screens/CoinDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchListProvider from "./src/Contexts/WatchListContext";

export default function App() {
    return (
        <NavigationContainer theme={{ colors: { background: "#121212" } }}>
            <WatchListProvider>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <Navigation />
                </View>
            </WatchListProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: 50,
    },
});
