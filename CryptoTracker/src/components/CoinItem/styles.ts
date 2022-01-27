import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3,
    },
    text: {
        color: "white",
        marginRight: 5,
    },
    coinContainer: {
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#282828",
        padding: 15,
    },
    rank: {
        fontWeight: "bold",
        color: "white",
    },
    rankContainer: {
        backgroundColor: "#585858",
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    image: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: "center",
    },
    infoContainer: {
        flexDirection: "row",
    },
    icon: {
        alignSelf: "center",
        marginRight: 5,
    },
    priceContainer: {
        marginLeft: "auto",
        alignItems: "flex-end",
    },
    marketText: {
        color: "white",
    },
});

export default styles;
