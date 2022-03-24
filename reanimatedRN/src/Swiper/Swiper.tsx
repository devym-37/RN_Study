import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
    add,
    clockRunning,
    cond,
    debug,
    divide,
    eq,
    floor,
    not,
    set,
    useCode,
    useValue,
} from "react-native-reanimated";
import { usePanGestureHandler, timing, snapPoint, useClock } from "react-native-redash/lib/module/v1";

export const assets = [
    require("./assets/1.jpg"),
    require("./assets/2.jpg"),
    require("./assets/3.jpg"),
    require("./assets/4.jpeg"),
    require("./assets/5.jpeg"),
];

const { width, height } = Dimensions.get("window");

const snapPoints = assets.map((_, i) => i * -width);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
    },
    pictures: {
        width: width * assets.length,
        height,
        flexDirection: "row",
    },
    picture: {
        width,
        height,
        overflow: "hidden",
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
    },
});

const Swiper = () => {
    const clock = useClock();
    const index = useValue(0);
    const offsetX = useValue(0);
    const translateX = useValue(0);
    const { gestureHandler, state, velocity, translation } = usePanGestureHandler();

    const to = snapPoint(translateX, velocity.x, snapPoints);

    useCode(
        () => [
            cond(eq(state, State.ACTIVE), [set(translateX, add(offsetX, translation.x))]),
            cond(eq(state, State.END), [
                set(translateX, timing({ index, from: translateX, to })),
                set(offsetX, translateX),
                cond(not(clockRunning(clock)), [set(index, floor(divide(translateX, -width))), debug("index", index)]),
            ]),
        ],
        []
    );

    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <Animated.View style={[styles.pictures, { transform: [{ translateX }] }]}>
                        {assets.map((source) => (
                            <View key={source} style={styles.picture}>
                                <Image style={styles.image} {...{ source }} />
                            </View>
                        ))}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default Swiper;
