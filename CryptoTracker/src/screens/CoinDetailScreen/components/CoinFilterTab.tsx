import React, { FC, useState, useEffect, useRef, memo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

interface Props {
    filterDay: string;
    filterText: string;
    onClickRange: (range: string) => void;
    selectedRange: Range;
}

export type Range = "1" | "7" | "30" | "365" | "max";

const CoinFilterTab: FC<Props> = ({ filterDay, filterText, selectedRange, onClickRange }) => {
    const isSelected = (filter: Range) => filter === filterDay;

    return (
        <Pressable
            onPress={() => onClickRange(filterDay)}
            style={{ ...styles.container, backgroundColor: isSelected(selectedRange) ? "#1e1e1e" : "transparent" }}
        >
            <Text style={{ color: isSelected(selectedRange) ? "white" : "grey" }}>{filterText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
});

export default memo(CoinFilterTab);
