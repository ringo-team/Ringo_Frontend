import React from "react";
import styled from "styled-components/native";
import colors from "../../constants/colors";
import { ptdtext } from "../../components/CustomText";

const LoginScreen = () => {
  return (
    <Container>
      <Title>Login Screen</Title>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(ptdtext)`
  font-size: 24px;
  color: ${colors.black};
`;