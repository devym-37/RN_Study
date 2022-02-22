import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { addCurve, addLine, createPath, mix, serialize } from "react-native-redash";
import Svg, { Path } from "react-native-svg";

interface SquareProps {}

const AnimatedPath = Animated.createAnimatedComponent(Path);
export const SIZE = 150;

const V_FACTOR = 3;
const H_FACTOR = 0.4;
const progress = 1;

const Square = () => {
    const animatedProps = useAnimatedProps(() => {
        const distortion = {
            x: mix(progress, 0, SIZE * H_FACTOR),
            y: mix(progress, 1, V_FACTOR),
        };
        const p1 = { x: 0, y: 0 };
        const p2 = { x: SIZE, y: 0 };
        const p3 = { x: SIZE - distortion.x, y: SIZE * distortion.y };
        const p4 = { x: distortion.x, y: SIZE * distortion.y };
        const path = createPath(p1);
        addLine(path, p2);
        addCurve(path, {
            c1: { x: p2.x, y: 0 },
            c2: { x: p3.x, y: 0 },
            to: p3,
        });
        addLine(path, p4);
        addCurve(path, {
            c1: { x: p4.x, y: 0 },
            c2: { x: p1.x, y: 0 },
            to: p1,
        });
        return {
            d: serialize(path),
            fill: "#3bde",
        };
    });

    return (
        <Svg>
            <AnimatedPath animatedProps={animatedProps} />
        </Svg>
    );
};

export default Square;
