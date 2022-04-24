import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Main = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Wave")} style={styles.buttonContainer}>
                <Text style={styles.text}>Waves</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("StickyShapes")} style={styles.buttonContainer}>
                <Text style={styles.text}>StickyShapes</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Swiper")} style={styles.buttonContainer}>
                <Text style={styles.text}>Swiper</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Pinch")} style={styles.buttonContainer}>
                <Text style={styles.text}>Pinch</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Worklets")} style={styles.buttonContainer}>
                <Text style={styles.text}>Worklets</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Transitions")} style={styles.buttonContainer}>
                <Text style={styles.text}>Transitions</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        width: 300,
        height: 40,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: "white",
    },
});

export default Main;