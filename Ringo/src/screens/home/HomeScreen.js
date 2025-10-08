import React from "react";
import styled from "styled-components/native";
import colors from "../../constants/colors";
import { ptdtext } from "../../components/CustomText";

const HomeScreen = () => {
  return (
    <Container>
      <Title>Home Screen</Title>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(ptdtext)`
  font-size: 24px;
  color: ${colors.black};
`; 