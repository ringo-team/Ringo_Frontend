import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import { ImageBackground } from 'react-native';

import GoogleLogo from "../../assets/imgs/icons/logo_google.svg";
import KaKaoLogo from "../../assets/imgs/icons/logo_kakao.svg";
import LoginBackgroundImage from "../../assets/imgs/login_background.png";

const { width } = Dimensions.get('window');
const iconSize = width * 0.06;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userId === 'master' && password === 'qwe123') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      });
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('TermsScreen');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Wrapper>
        <ImageBackground source={LoginBackgroundImage} style={{ flex: 1 }}>
          <Content>
            <TitleContainer>
              <Title>
                사진과 감성으로 이어지는{"\n"}
                특별한 만남의 시작
              </Title>
              <Subtitle>1분 만에 회원가입하기</Subtitle>
            </TitleContainer>

            <InputContainer>
              <InputField
                placeholder="아이디"
                value={userId}
                onChangeText={setUserId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <InputField
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              <ForgotPasswordButton onPress={handleSignUp}>
                <ForgotPasswordText>아이디 혹은 비밀번호를 잊으셨나요?</ForgotPasswordText>
              </ForgotPasswordButton>
            </InputContainer>

            <LoginButton onPress={handleLogin}>
              <LoginButtonText>로그인</LoginButtonText>
            </LoginButton>

            <OrDividerContainer>
              <OrLine />
              <OrText>또는</OrText>
              <OrLine />
            </OrDividerContainer>

            <SocialButtonsContainer>
              <SocialButton onPress={handleSignUp}>
                <GoogleLogo width={iconSize} height={iconSize} />
              </SocialButton>
              <SocialButton style={{ backgroundColor: '#FFEB3B' }} onPress={handleSignUp}>
                <KaKaoLogo width={iconSize} height={iconSize} />
              </SocialButton>
              <MainSocialButton onPress={handleSignUp}>
                <MainSocialButtonText>L</MainSocialButtonText>
              </MainSocialButton>
            </SocialButtonsContainer>
          </Content>
        </ImageBackground>
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: #F5F5F0;
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.08}px;
  justify-content: center;
`;

const TitleContainer = styled.View`
  align-items: flex-start;
  margin-bottom: ${width * 0.15}px;
`;

const Title = styled(PtdBText)`
  font-size: ${width * 0.065}px;
  color: ${colors.black};
  text-align: left;
  font-weight: bold;
  line-height: ${width * 0.08}px;
  margin-bottom: ${width * 0.03}px;
`;

const Subtitle = styled(PtdText)`
  font-size: ${width * 0.035}px;
  color: #666;
  text-align: left;
`;

const InputContainer = styled.View`
  margin-bottom: ${width * 0.08}px;
`;

const InputField = styled.TextInput`
  width: 100%;
  height: ${width * 0.13}px;
  background-color: #FFFFFF;
  border-radius: ${width * 0.03}px;
  padding: 0 ${width * 0.04}px;
  font-size: ${width * 0.04}px;
  margin-bottom: ${width * 0.04}px;
  border: 1px solid #E0E0E0;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: ${width * 0.13}px;
  background-color: #14C871;
  border-radius: ${width * 0.03}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${width * 0.08}px;
`;

const LoginButtonText = styled(PtdBText)`
  color: #FFFFFF;
  font-size: ${width * 0.04}px;
`;

const SocialButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${width * 0.04}px;
  gap: ${width * 0.04}px;
`;

const SocialButton = styled.TouchableOpacity`
  width: ${width * 0.12}px;
  height: ${width * 0.12}px;
  border-radius: ${width * 0.06}px;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const MainSocialButton = styled.TouchableOpacity`
  width: ${width * 0.12}px;
  height: ${width * 0.12}px;
  border-radius: ${width * 0.06}px;
  background-color: #14C871;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const MainSocialButtonText = styled(PtdBText)`
  font-size: ${width * 0.05}px;
  color: #FFFFFF;
`;

const HelpText = styled(PtdText)`
  font-size: ${width * 0.025}px;
  color: #666;
  position: absolute;
  bottom: ${width * -0.05}px;
  text-align: center;
  width: ${width * 0.25}px;
`;

const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin-top: ${width * 0.02}px;
`;

const ForgotPasswordText = styled(PtdText)`
  font-size: ${width * 0.032}px;
  color: #666;
  text-decoration-line: underline;
`;

const OrDividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${width * 0.04}px 0;
`;

const OrLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #E0E0E0;
`;

const OrText = styled(PtdText)`
  margin: 0 ${width * 0.04}px;
  font-size: ${width * 0.035}px;
  color: #666;
`;
