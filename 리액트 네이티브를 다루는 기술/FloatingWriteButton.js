import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function FloatingWriteButton() {
    return (
        <View style={styles.wrapper}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    Platform.ios === "ios" && {
                        opacity: pressed ? 0.6 : 1,
                    },
                ]}
            >
                <Icon name='add' size={24} style={styles.icon} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        // ios 전용 그림자
        shadowColor: "#4d4d4d",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // 안드로이드 전용 그림자
        elevation: 5,
        // 안드로이드에서 물결 효과가 영역 밖으로 낙자ㅣ 않도록 설정
        // ios에서는 overflow가 hidden일 경우 그림자가 보여지지 않는다
        overflow: Platform.select({ android: "hidden" }),
    },
});

export default FloatingWriteButton;
