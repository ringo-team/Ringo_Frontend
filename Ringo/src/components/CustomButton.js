import React from "react";
import { Dimensions } from "react-native";

import styled from "styled-components";
import colors from "../constants/colors";
import { PtdText } from "./CustomText";

const { width, height } = Dimensions.get("window");

const CustomButton = ({ 
    onPress,
    title = '다음',
    isActive = false,
    activeColor = "#14C871",
    inactiveColor = colors.gray100,
    style,
}) => {
    const handlePress = () => {
        if (onPress) onPress();
    };
    return (
        <Wrapper>
            <Button 
                onPress={handlePress} 
                isActive={isActive}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                style={style}
                disabled={!isActive}
                activeOpacity={0.8}>
                <ButtonText isActive={isActive}>{title}</ButtonText>
            </Button>
        </Wrapper>
    );
}

export default CustomButton;

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ isActive, activeColor, inactiveColor }) =>
    isActive ? activeColor : inactiveColor};
  padding: 12px 24px;
  border-radius: 8px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.8)};
`;

const ButtonText = styled(PtdText)`
  color: ${({ isActive }) => (isActive ? "#FFFFFF" : colors.gray200)};
  font-size: ${width * 0.045}px;
  text-align: center;
  font-weight: bold;
`;