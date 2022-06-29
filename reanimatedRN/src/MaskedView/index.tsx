import React from "react";
import { View, Image } from "react-native";
import MaskedView from "@react-native-community/masked-view";

interface ComponentProps {
    ring: Ring;
}

type Color = string;

interface Ring {
    start: Color;
    end: Color;
    bg: Color;
    theta: number;
    size: number;
}

export default ({ ring }: ComponentProps) => {
    const maskElement = (
        <Image
            style={{
                width: ring.size,
                height: ring.size,
                backgroundColor: "transparent",
                borderRadius: ring.size / 2,
            }}
            source={require("./mask.png")}
        />
    );
    return (
        <View
            style={{
                width: ring.size,
                height: ring.size,
                borderRadius: ring.size / 2,
                backgroundColor: ring.start,
            }}
        >
            <MaskedView style={{ flex: 1, backgroundColor: "transparent" }} {...{ maskElement }}>
                <View style={{ flex: 1, borderRadius: ring.size / 2, backgroundColor: ring.start }} />
            </MaskedView>
        </View>
    );
};
