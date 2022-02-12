import React, { FC } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

interface Props {}

const PortfolioScreen: FC<Props> = () => {
    return (
        <View>
            <Text>PortfolioScreen</Text>
            <PortfolioAssetsList />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PortfolioScreen;
