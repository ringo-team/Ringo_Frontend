import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

const { width } = Dimensions.get('window');

const TermsScreen = () => {
  const navigation = useNavigation();
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false
  });

  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue
    });
  };

  const handleIndividualAgreement = (type) => {
    const newAgreements = {
      ...agreements,
      [type]: !agreements[type]
    };

    // 모든 개별 약관이 체크되었는지 확인
    newAgreements.all = newAgreements.service && newAgreements.privacy;

    setAgreements(newAgreements);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (agreements.service && agreements.privacy) {
      navigation.navigate('PhoneVerificationScreen'); // 휴대폰 본인인증 화면으로 이동
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
          <Title>약관동의</Title>
        </TitleContainer>

        <AgreementContainer>
          <AllAgreementRow onPress={handleAllAgreement}>
            <CheckBox checked={agreements.all}>
              <CheckMark checked={agreements.all}>✓</CheckMark>
            </CheckBox>
            <AgreementText>전체 동의</AgreementText>
          </AllAgreementRow>

          <Divider />

          <AgreementRow onPress={() => handleIndividualAgreement('service')}>
            <CheckBox checked={agreements.service}>
              <CheckMark checked={agreements.service}>✓</CheckMark>
            </CheckBox>
            <AgreementText>서비스 이용약관(필수)</AgreementText>
            <ArrowIcon>{">"}</ArrowIcon>
          </AgreementRow>

          <AgreementRow onPress={() => handleIndividualAgreement('privacy')}>
            <CheckBox checked={agreements.privacy}>
              <CheckMark checked={agreements.privacy}>✓</CheckMark>
            </CheckBox>
            <AgreementText>개인정보 수집 및 이용(필수)</AgreementText>
            <ArrowIcon>{">"}</ArrowIcon>
          </AgreementRow>
        </AgreementContainer>

        <ContinueButton
          onPress={handleContinue}
          disabled={!(agreements.service && agreements.privacy)}
          isActive={agreements.service && agreements.privacy}
        >
          <ContinueText isActive={agreements.service && agreements.privacy}>
            계속하기
          </ContinueText>
        </ContinueButton>
      </Content>
    </Wrapper>
  );
};

export default TermsScreen;

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
  margin-bottom: ${width * 0.2}px;
`;

const Title = styled(PtdBText)`
  font-size: ${width * 0.065}px;
  color: ${colors.black};
  font-weight: bold;
`;

const AgreementContainer = styled.View`
  flex: 1;
`;

const AllAgreementRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${width * 0.04}px 0;
  margin-bottom: ${width * 0.02}px;
`;

const AgreementRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${width * 0.04}px 0;
  margin-bottom: ${width * 0.02}px;
`;

const CheckBox = styled.View`
  width: ${width * 0.06}px;
  height: ${width * 0.06}px;
  border-radius: ${width * 0.03}px;
  border: 2px solid ${props => props.checked ? colors.primary || '#14C871' : '#E0E0E0'};
  background-color: ${props => props.checked ? colors.primary || '#14C871' : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: ${width * 0.03}px;
`;

const CheckMark = styled(PtdText)`
  color: ${props => props.checked ? '#FFFFFF' : 'transparent'};
  font-size: ${width * 0.035}px;
  font-weight: bold;
`;

const AgreementText = styled(PtdText)`
  flex: 1;
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;

const ArrowIcon = styled(PtdText)`
  font-size: ${width * 0.04}px;
  color: #999999;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #E0E0E0;
  margin: ${width * 0.02}px 0;
`;

const ContinueButton = styled.TouchableOpacity`
  height: ${width * 0.13}px;
  background-color: ${props => props.isActive ? colors.primary || '#14C871' : '#E0E0E0'};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${width * 0.1}px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ContinueText = styled(PtdText)`
  color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
  font-size: ${width * 0.04}px;
  font-weight: bold;
`;