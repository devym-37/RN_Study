import { Animated } from "react-native";

export const getFeatureViewAnimation = (animatedValue: Animated.Value, outputX: number) => {
    const TRANSLATE_X_INPUT_RANGE = [0, 80];
    const translateY = {
        translateY: animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -50],
            extrapolate: "clamp",
        }),
    };
    return {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: TRANSLATE_X_INPUT_RANGE,
                    outputRange: [0, outputX],
                    extrapolate: "clamp",
                }),
            },
            translateY,
        ],
    };
};
