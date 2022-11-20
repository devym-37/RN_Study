/* eslint-disable prettier/prettier */
import { CornerPathEffect, rect, SkiaValue, Vector } from "@shopify/react-native-skia";
import {
    usePaintRef,
    Blur,
    ColorMatrix,
    Paint,
    Group,
    mix,
    dist,
    vec,
    fitbox,
    processTransform,
    Skia,
    Path,
    useComputedValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const getPointAtLength = (length: number, from: Vector, to: Vector) => {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const x = from.x + length * Math.cos(angle);
    const y = from.y + length * Math.sin(angle);
    return vec(x, y);
};

const src = Skia.XYWHRect(0, 0, 24, 24);
const pause = Skia.Path.Make();
pause.addRect(Skia.XYWHRect(0, 0, 8, 24));
pause.addRect(Skia.XYWHRect(24 - 8, 0, 8, 24));

const t = dist(vec(0, 0), vec(24, 12)) / 2;
const mid1 = getPointAtLength(t, vec(0, 0), vec(24, 12));
const mid2 = getPointAtLength(t, vec(0, 24), vec(24, 12));

const play = Skia.Path.Make();
play.moveTo(0, 0);
play.lineTo(mid1.x, mid1.y);
play.lineTo(mid2.x, mid2.y);
play.lineTo(0, 24);
play.close();
play.moveTo(mid1.x, mid1.y);
play.lineTo(24, 12);
play.lineTo(24, 12);
play.lineTo(mid2.x, mid2.y);
play.close();

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = 20;
const dst = Skia.XYWHRect(c.x - r, c.y - r, r * 2, r * 2);
const m3 = Skia.Matrix();
processTransform(m3, fitbox("contain", src, dst));
pause.transform(m3);
play.transform(m3);

interface Play2Props {
    progress: SkiaValue<number>;
    c: Vector;
    r: number;
}

const bounds = play.computeTightBounds();

export const Play = ({ progress, r }: Play2Props) => {
    const paint = usePaintRef();

    const path = useComputedValue(() => {
        const p = pause.interpolate(play, progress.current)!;

        p.simplify();

        return p;
    }, [progress]);

    const sr = 0.8 * r;

    return (
        <>
            <Paint ref={paint}>
                <Blur blur={10} />
                <ColorMatrix matrix={[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 20, -10]} />
            </Paint>
            <Group transform={fitbox("contain", bounds, rect(c.x - sr, c.y - sr, sr * 2, sr * 2))} layer={paint}>
                <Path path={path} color='white'>
                    <CornerPathEffect r={4} />
                </Path>
            </Group>
        </>
    );
};
