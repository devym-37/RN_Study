import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { faker } from "@faker-js/faker";

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
    const genderType = i % 2 === 0 ? "men" : "women";
    return {
        key: i,
        image: `https://randomuser.me/api/portraits/${genderType}/${i}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const BG_IMG = "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const FlatListAnimation = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Image source={{ uri: BG_IMG }} style={StyleSheet.absoluteFillObject} blurRadius={80} />
            <Animated.FlatList
                data={DATA}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                })}
                keyExtractor={(item) => item.key.toString()}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item, index }) => {
                    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
                    const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)];

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                    });

                    return (
                        <Animated.View
                            style={{
                                flexDirection: "row",
                                padding: SPACING,
                                marginBottom: SPACING,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                borderRadius: 12,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 10,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                transform: [{ scale }],
                                opacity,
                            }}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE,
                                    borderRadius: AVATAR_SIZE,
                                    marginRight: SPACING / 2,
                                }}
                            />
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "700" }}>{item.name}</Text>
                                <Text style={{ fontSize: 18, opacity: 0.7 }}>{item.jobTitle}</Text>
                                <Text style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}>{item.email}</Text>
                            </View>
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
};

export default FlatListAnimation;
