import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, Extrapolate, interpolate, lessThan, multiply } from "react-native-reanimated";

import { transformOrigin } from "react-native-redash";
import HalfCircle from "./HalfCircle";
import { PI, RADIUS } from "./Constants";

interface CircularProgressProps {
    progress: Animated.Node<number>;
    bg: string;
    fg: string;
}

export default ({ progress, bg, fg }: CircularProgressProps) => {
    const theta = multiply(progress, 2 * PI);
    const opacity = lessThan(theta, PI);
    const rotate = interpolate(theta, [PI, 2 * PI], [0, PI], {
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <HalfCircle color={fg} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin({ x: 0, y: RADIUS / 2 }, { rotate: theta }),
                        opacity,
                    }}
                >
                    <HalfCircle color={bg} />
                </Animated.View>
            </View>
            <View style={{ transform: [{ rotate: "180deg" }] }}>
                <HalfCircle color={fg} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin({ x: 0, y: RADIUS / 2 }, { rotate }),
                    }}
                >
                    <HalfCircle color={bg} />
                </Animated.View>
            </View>
        </>
    );
};
