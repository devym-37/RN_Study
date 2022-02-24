import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import Square, { SIZE, MAX_HEIGHT } from "./Square";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: (width - SIZE) / 2,
        top: 0,
        bottom: 0,
        width: SIZE,
    },
});

const StickyShapes = () => {
    const isOnTop = useSharedValue(true);
    const sticked = useSharedValue(true);
    const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));
    const translateY = useSharedValue(0);
    const progress = useDerivedValue(
        () => sticking.value * interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP)
    );
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: ({ translationY }) => {
            translateY.value = translationY;
            if (translateY.value > MAX_HEIGHT) {
                sticked.value = false;
            }
        },
        onEnd: ({ velocityY: velocity }) => {
            const destination = snapPoint(translateY.value, velocity, [0, height - SIZE]);
            translateY.value = withSpring(destination, { velocity }, () => {
                sticked.value = true;
                if (destination !== 0) {
                    isOnTop.value = !isOnTop.value;
                    translateY.value = 0;
                }
            });
        },
    });

    const container = useAnimatedStyle(() => ({
        transform: [{ rotate: isOnTop.value ? "0deg" : "180deg" }],
    }));
    const square = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: (1 - sticking.value) * translateY.value }],
        };
    });

    return (
        <Animated.View style={[styles.container, container]}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[StyleSheet.absoluteFill, square]}>
                    <Square progress={progress} />
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

export default StickyShapes;
