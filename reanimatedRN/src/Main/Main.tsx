import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const Main = ({ navigation }: any) => {
    return (
        <ScrollView>
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
                <Pressable onPress={() => navigation.navigate("FlatList")} style={styles.buttonContainer}>
                    <Text style={styles.text}>FlatList</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("StickyFooter")} style={styles.buttonContainer}>
                    <Text style={styles.text}>StickyFooter</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("ProgressBar")} style={styles.buttonContainer}>
                    <Text style={styles.text}>ProgressBar</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Masked View")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Masked View</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("WaveView")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Wave View</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("MomoHeader")} style={styles.buttonContainer}>
                    <Text style={styles.text}>MomoHeader</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Chanel")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Chanel</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Headspace")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Headspace</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("PathGradient")} style={styles.buttonContainer}>
                    <Text style={styles.text}>PathGradient</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("SpreadCards")} style={styles.buttonContainer}>
                    <Text style={styles.text}>SpreadCards</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Toolbar")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Toolbar</Text>
                </Pressable>
            </View>
        </ScrollView>
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
