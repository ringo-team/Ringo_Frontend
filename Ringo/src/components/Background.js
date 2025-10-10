import React from "react";
import styled from "styled-components/native";
import colors from "../constants/colors";

const Container = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: ${colors.white};
`;

export default function Background() {
    return <Container />;
}