import React from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchListProvider from "./src/Contexts/WatchListContext";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size='large' />;
    }

    return (
        <NavigationContainer theme={{ colors: { background: "#121212" } }}>
            <RecoilRoot>
                <WatchListProvider>
                    <View style={styles.container}>
                        <StatusBar style='light' />
                        <Navigation />
                    </View>
                </WatchListProvider>
            </RecoilRoot>
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
