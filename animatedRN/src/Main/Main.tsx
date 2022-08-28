import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const Main = ({ navigation }: any) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate("Accordion")} style={styles.buttonContainer}>
                    <Text style={styles.text}>Accordion</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("LoopingAnimation")} style={styles.buttonContainer}>
                    <Text style={styles.text}>LoopingAnimation</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("AdvancedFlatList")} style={styles.buttonContainer}>
                    <Text style={styles.text}>AdvancedFlatList</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("AdvancedCarouselFlatList")}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.text}>AdvancedCarouselFlatList</Text>
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
