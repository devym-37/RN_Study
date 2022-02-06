import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailScreen from "./src/screens/CoinDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";

export default function App() {
    return (
        <NavigationContainer theme={{ colors: { background: "#121212" } }}>
            <View style={styles.container}>
                <StatusBar style='light' />
                <Navigation />
            </View>
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
