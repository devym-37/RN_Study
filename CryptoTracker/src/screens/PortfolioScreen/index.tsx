import React, { FC, Suspense } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

interface Props {}

const PortfolioScreen: FC<Props> = () => {
    return (
        <View style={{ flex: 1 }}>
            <Suspense fallback={<Text style={{ color: "white" }}>Loading Please Wait</Text>}>
                <PortfolioAssetsList />
            </Suspense>
        </View>
    );
};

const styles = StyleSheet.create({});

export default PortfolioScreen;
