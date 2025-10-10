import React from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

import GoogleLogo from "../../assets/imgs/icons/logo_google.svg";
import KaKaoLogo from "../../assets/imgs/icons/logo_kakao.svg";

const { width } = Dimensions.get('window');
const iconSize = width * 0.06; // 아이콘 크기 조절

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('여기에 이동할 스크린 작성하시면 됩니다!'); // 로그인 버튼 클릭 후 이동할 스크린 이름으로 변경해주세요
  }
  return (
    <Wrapper>
      <Background />
      <Content>
        <Title>
          사진과 감성으로 이어지는{"\n"}
          특별한 만남의 시작
        </Title>

        <ButtonContainer>
          <GoogleButton onPress={handleLogin}>
            <IconWrapper>
              <GoogleLogo width={iconSize} height={iconSize} />
            </IconWrapper>
            <GoogleText>Google로 로그인</GoogleText>
          </GoogleButton>

          <KakaoButton onPress={handleLogin}>
            <IconWrapper>
              <KaKaoLogo width={iconSize} height={iconSize} />
            </IconWrapper>
            <KakaoText>카카오로 로그인</KakaoText>
          </KakaoButton>

          <RingoButton onPress={handleLogin}>
            <IconWrapper>
              {/* <RingoLogo width={iconSize} height={iconSize} /> */}
            </IconWrapper>
            <RingoText>링고 로그인</RingoText>
          </RingoButton>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

export default LoginScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(PtdBText)`
  font-size: ${width * 0.065}px;
  color: ${colors.black};
  font-weight: bold;
  margin-bottom: ${width * 0.99}px;
  align-self: flex-start;
  margin-left: ${width * 0.1}px;
`;

const ButtonContainer = styled.View`
  width: ${width * 0.8}px;
  gap: ${width * 0.02}px;
  flex-direction: column;
  justify-content: center;
`;

const ButtonBase = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${width * 0.13}px;
  border-radius: 12px;
  gap: ${width * 0.02}px;
`

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const GoogleButton = styled(ButtonBase)`
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
`;

const GoogleText = styled(PtdText)`
  color: #000000;
  font-size: ${width * 0.04}px;
`;

const KakaoButton = styled(ButtonBase)`
  background-color: #FEE500;
`;

const KakaoText = styled(PtdText)`
  color: #000000;
  font-size: ${width * 0.04}px;
`;

const RingoButton = styled(ButtonBase)`
  background-color: #14C871;
`;

const RingoText = styled(PtdText)`
  color: #FFFFFF;
  font-size: ${width * 0.04}px;
`;
