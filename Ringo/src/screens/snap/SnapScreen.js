import React from "react";
import styled from "styled-components/native";
import colors from "../../constants/colors";
import { PtdText } from "../../components/CustomText";

const SnapScreen = () => {
    return (
        <Container>
            <Title>Snap Screen</Title>
        </Container>
    );
};

export default SnapScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;

const Title = styled(PtdText)`
  font-size: 24px;
  color: ${colors.black};
`;