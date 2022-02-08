import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName='Root' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Root' component={BottomTabNavigator} />
            <Stack.Screen name='CoinDetail' component={CoinDetailScreen} />
        </Stack.Navigator>
    );
};

export default Navigation;
