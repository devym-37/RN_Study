import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import WatchListScreen from "../screens/WatchListScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "#181818",
                },
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => <Entypo name='home' size={focused ? 30 : 25} color={color} />,
                }}
            />
            <Tab.Screen
                name='WatchList'
                component={WatchListScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => <FontAwesome name='star' size={focused ? 30 : 25} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
