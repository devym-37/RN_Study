import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedScrollHandler,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

import Item, { MAX_HEIGHT } from "./Item";
import { items } from "./Model";

const snapPoints = items.map((_, i) => i * -MAX_HEIGHT);
const styles = StyleSheet.create({
    container: {
        height: (items.length + 1) * MAX_HEIGHT,
        backgroundColor: "black",
    },
});

const Channel = () => {
    const y = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: ({ contentOffset: { y: value } }) => {
            y.value = value;
        },
    });

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>({
        onStart: (_, context) => {
            context.y = y.value;
        },
        onActive: ({ translationY }, context) => {
            y.value = clamp(context.y + translationY, -(items.length - 1), 0);
        },
        onEnd: ({ velocityY: velocity }) => {
            const dest = snapPoint(y.value, velocity, snapPoints);
            y.value = withSpring(dest, { velocity });
        },
    });

    return (
        <>
            <StatusBar hidden />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                {/* <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} snapToInterval={MAX_HEIGHT}> */}
                <Animated.View style={styles.container}>
                    {items.map((item, index) => (
                        <Item item={item} key={index} y={y} index={index} />
                    ))}
                </Animated.View>
                {/* </Animated.ScrollView> */}
            </PanGestureHandler>
        </>
    );
};

export default Channel;
