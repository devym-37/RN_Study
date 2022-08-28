import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Accordion from "./src/Accordion";
import LoopingAnimation from "./src/LoopingAnimation";
import Main from "./src/Main";
import AdvancedFlatList from "./src/AdvancedFlatList";
import AdvancedCarouselFlatList from "./src/AdvancedCarouselFlatList";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='Main'
            component={Main}
            options={{
                title: "Main",
            }}
        />
        <Stack.Screen
            name='Accordion'
            component={Accordion}
            options={{
                title: "Accordion",
            }}
        />
        <Stack.Screen
            name='LoopingAnimation'
            component={LoopingAnimation}
            options={{
                title: "LoopingAnimation",
            }}
        />
        <Stack.Screen
            name='AdvancedFlatList'
            component={AdvancedFlatList}
            options={{
                title: "AdvancedFlatList",
            }}
        />
        <Stack.Screen
            name='AdvancedCarouselFlatList'
            component={AdvancedCarouselFlatList}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
