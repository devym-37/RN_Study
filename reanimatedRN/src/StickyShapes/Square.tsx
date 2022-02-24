import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { addCurve, addLine, createPath, mix, serialize } from "react-native-redash";
import Svg, { Path } from "react-native-svg";

interface SquareProps {
    progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const V_FACTOR = 2.5;
const H_FACTOR = 0.3;
export const SIZE = 150;
export const MAX_HEIGHT = SIZE * V_FACTOR;

const Square = ({ progress }: SquareProps) => {
    const animatedProps = useAnimatedProps(() => {
        const factor = {
            x: mix(progress.value, 0, H_FACTOR),
            y: mix(progress.value, 1, V_FACTOR),
        };
        const p1 = { x: 0, y: 0 };
        const p2 = { x: SIZE, y: 0 };
        const p3 = { x: SIZE * (1 - factor.x), y: SIZE * factor.y };
        const p4 = { x: SIZE * factor.x, y: SIZE * factor.y };
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
            fill: "#45A6E5",
        };
    });

    return (
        <Svg>
            <AnimatedPath animatedProps={animatedProps} />
        </Svg>
    );
};

export default Square;
