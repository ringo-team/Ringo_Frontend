import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const PtdText = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.ptdtext, style]} {...props}>
            {children}
        </Text>
    );
};

const PtdBText = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.ptdbtext, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    ptdtext: {
        fontFamily: 'Pretendard-Regular',
        color: colors.black,
    },
    ptdbtext: {
        fontFamily: 'Pretendard-Bold',
        color: colors.black,
    },
});

export { PtdText, PtdBText };