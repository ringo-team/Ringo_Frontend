import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get("window");

const PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleVerification = () => {
    if (phoneNumber.trim()) {
      // 휴대폰 인증 로직
      navigation.navigate("IdInputScreen");
    }
  };

  const isActive = phoneNumber.trim().length > 0;

  return (
    <Wrapper>
      <Background />
        <Content>
          <TitleContainer>
            <Title>휴대폰 본인 인증</Title>
          </TitleContainer>

          <PhoneInputContainer>
            <PhoneInput
              placeholder="휴대폰 번호를 입력해주세요"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </PhoneInputContainer>

          <Spacer />
        </Content>
        
      <ButtonContainer>
        <CustomButton
          title="휴대폰 인증하기"
          onPress={handleVerification}
          isActive={isActive}
          disabled={!isActive}
          style={{ width: "90%", height: width * 0.13, borderRadius: 12 }}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

export default PhoneVerificationScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.08}px;
`;

const TitleContainer = styled.View`
  margin-top: ${width * 0.25}px;
  margin-bottom: ${width * 0.1}px;
`;

const Title = styled(PtdBText)`
  font-size: ${width * 0.065}px;
  color: ${colors.black};
  font-weight: bold;
`;

const PhoneInputContainer = styled.View`
  margin-bottom: ${width * 0.1}px;
`;

const PhoneInput = styled.TextInput`
  height: ${width * 0.13}px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 ${width * 0.04}px;
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  background-color: #ffffff;
`;

const Spacer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  background-color: #ffffff;
  padding-top: ${width * 0.03}px;
  padding-bottom: ${width * 0.15}px;
  padding-horizontal: ${width * 0.01}px;
`;