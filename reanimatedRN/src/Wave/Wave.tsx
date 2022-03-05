import React, { useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
    Easing,
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import MaskedView from "@react-native-community/masked-view";
import Svg, { Circle, Path } from "react-native-svg";
import StyleGuide from "../components/StyleGuide";

const SIZE = Dimensions.get("window").width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Wave = () => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }), -1, true);
    }, []);

    const data = useDerivedValue(() => {
        const m = mix.bind(null, progress.value);
        return {
            from: {
                x: m(-0.1, -1),
                y: m(0.2, 0.5),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });

    const data2 = useDerivedValue(() => {
        const m = mix.bind(null, 1 - progress.value);
        return {
            from: {
                x: m(-0.1, -1),
                y: m(0.2, 0.5),
            },
            c1: { x: m(0, 0.5), y: m(0.7, 1) },
            c2: { x: m(1, 0.5), y: m(0.3, 0) },
            to: { x: m(1.1, 2), y: m(0.8, 0.5) },
        };
    });

    const path = useAnimatedProps(() => {
        const { from, c1, c2, to } = data.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });

    const path1 = useAnimatedProps(() => {
        const { from, c1, c2, to } = data2.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
        };
    });

    // const from = useAnimatedProps(() => {
    //     const { x, y } = data.value.from;
    //     return {
    //         cx: x,
    //         cy: y,
    //     };
    // });

    // const c1 = useAnimatedProps(() => {
    //     const { x, y } = data.value.c1;
    //     return {
    //         cx: x,
    //         cy: y,
    //     };
    // });

    // const c2 = useAnimatedProps(() => {
    //     const { x, y } = data.value.c2;
    //     return {
    //         cx: x,
    //         cy: y,
    //     };
    // });

    // const to = useAnimatedProps(() => {
    //     const { x, y } = data.value.to;
    //     return {
    //         cx: x,
    //         cy: y,
    //     };
    // });

    return (
        <View style={styles.container}>
            <MaskedView
                maskElement={
                    <View
                        style={{
                            backgroundColor: "black",
                            width: SIZE,
                            height: SIZE,
                            borderRadius: SIZE / 2,
                        }}
                    />
                }
            >
                <Svg width={SIZE} height={SIZE} style={{ backgroundColor: "#242424" }} viewBox='0 0 1 1'>
                    <AnimatedPath fill='#86b4ff' animatedProps={path1} />
                    <AnimatedPath fill={StyleGuide.palette.primary} animatedProps={path} />
                    {/* <AnimatedCircle r={0.05} fill='blue' animatedProps={from} />
                <AnimatedCircle r={0.05} fill='red' animatedProps={c1} />
                <AnimatedCircle r={0.05} fill='red' animatedProps={c2} />
                <AnimatedCircle r={0.05} fill='blue' animatedProps={to} /> */}
                </Svg>
            </MaskedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
});

export default Wave;
