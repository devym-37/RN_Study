import React from "react";
import { View, Button } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming, withRepeat, withDelay } from "react-native-reanimated";

const SIZE = 300;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const WaveView = () => {
    const c1y = useSharedValue(0.2);
    const c2y = useSharedValue(0.8);

    const animatedProps = useAnimatedProps(() => {
        const path = ["M 0 0.5", `C 0.3 ${c1y.value}, 0.7 ${c2y.value}, 1 0.5`, "V 1", "H 0"].join(" ");

        return {
            d: path,
        };
    });

    const handleWave = () => {
        c1y.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
        c2y.value = withDelay(300, withRepeat(withTiming(0.2, { duration: 800 }), -1, true));
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title='파도 시작' onPress={handleWave} />
            <Svg style={{ width: SIZE, height: SIZE }} viewBox='0 0 1 1'>
                <AnimatedPath fill='blue' animatedProps={animatedProps} />
            </Svg>
        </View>
    );
};

export default WaveView;
