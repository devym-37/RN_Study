import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Animated, { Easing, useSharedValue } from "react-native-reanimated";
import { loop, bInterpolate } from "react-native-redash";
import { useMemoOne } from "use-memo-one";

const { Clock, useCode, set, block, cond, and, not, clockRunning, startClock, stopClock } = Animated;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

const LoopingAnimation = () => {
    const [play, setPlay] = useState(false);
    const { isPlaying, animation, clock } = useMemoOne(
        () => ({
            isPlaying: useSharedValue(0),
            animation: useSharedValue(0),
            clock: new Clock(),
        }),
        []
    );
    useCode(
        block([
            cond(and(not(clockRunning(clock)), isPlaying.value), startClock(clock)),
            cond(and(clockRunning(clock), not(isPlaying.value)), stopClock(clock)),
            set(
                animation.value,
                loop({
                    clock,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    boomerang: true,
                    autoStart: false,
                })
            ),
        ]),
        []
    );
    const scale = bInterpolate(animation, 0.4, 1);
    const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setPlay(!play);
                isPlaying.value = play ? 0 : 1;
            }}
        >
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
                    <View style={{ width: 100, height: 100, backgroundColor: "skyblue" }} />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LoopingAnimation;
