import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const assets = [
    require("./assets/1.jpg"),
    require("./assets/2.jpg"),
    require("./assets/3.jpg"),
    require("./assets/4.jpeg"),
    require("./assets/5.jpeg"),
];

const Swiper = () => {
    return (
        <View>
            <Text>Swiper</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Swiper;
