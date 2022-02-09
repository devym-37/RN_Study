import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useWatchList } from "../../Contexts/WatchListContext";

interface Props {}

const WatchListScreen: FC<Props> = () => {
    const wishList = useWatchList();
    return (
        <View>
            <Text>WatchListScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default WatchListScreen;
