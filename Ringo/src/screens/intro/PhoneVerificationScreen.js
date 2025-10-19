import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

const { width } = Dimensions.get('window');

const PhoneVerificationScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleVerification = () => {
        if (phoneNumber.trim()) {
            // 휴대폰 인증 로직 구현
            navigation.navigate('IdInputScreen'); // 아이디 입력 화면으로 이동
        }
    };

    return (
        <Wrapper>
            <Background />
            <Content>
                <Header>
                    <BackButton onPress={handleBackPress}>
                        <BackText>{"<"}</BackText>
                    </BackButton>
                </Header>

                <TitleContainer>
                    <Title>휴대폰 본인 인증</Title>
                </TitleContainer>

                <PhoneInputContainer>
                    <InputLabel>휴대폰 번호</InputLabel>
                    <PhoneInput
                        placeholder="휴대폰 번호를 입력해주세요"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        maxLength={11}
                    />
                </PhoneInputContainer>

                <Spacer />

                <VerificationButton
                    onPress={handleVerification}
                    disabled={!phoneNumber.trim()}
                    isActive={phoneNumber.trim().length > 0}
                >
                    <VerificationText isActive={phoneNumber.trim().length > 0}>
                        휴대폰 인증하기
                    </VerificationText>
                </VerificationButton>
            </Content>
        </Wrapper>
    );
};

export default PhoneVerificationScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.05}px;
`;

const Header = styled.View`
  margin-top: ${width * 0.1}px;
  margin-bottom: ${width * 0.1}px;
`;

const BackButton = styled.TouchableOpacity`
  width: ${width * 0.08}px;
  height: ${width * 0.08}px;
  justify-content: center;
  align-items: center;
`;

const BackText = styled(PtdText)`
  font-size: ${width * 0.06}px;
  color: ${colors.black};
`;

const TitleContainer = styled.View`
  margin-bottom: ${width * 0.15}px;
`;

const Title = styled(PtdBText)`
  font-size: ${width * 0.065}px;
  color: ${colors.black};
  font-weight: bold;
`;

const PhoneInputContainer = styled.View`
  margin-bottom: ${width * 0.1}px;
`;

const InputLabel = styled(PtdText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.03}px;
`;

const PhoneInput = styled.TextInput`
  height: ${width * 0.13}px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 0 ${width * 0.04}px;
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  background-color: #FFFFFF;
`;

const Spacer = styled.View`
  flex: 1;
`;

const VerificationButton = styled.TouchableOpacity`
  height: ${width * 0.13}px;
  background-color: ${props => props.isActive ? colors.primary || '#14C871' : '#E0E0E0'};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${width * 0.1}px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const VerificationText = styled(PtdText)`
  color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
  font-size: ${width * 0.04}px;
  font-weight: bold;
`;