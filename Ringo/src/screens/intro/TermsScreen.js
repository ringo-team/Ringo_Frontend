import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from 'react-native';
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
    privacy: false,
    photo: false,
    marketing: false
  });

  const [expandedTerms, setExpandedTerms] = useState({
    service: false,
    privacy: false,
    photo: false,
    marketing: false
  });

  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue,
      photo: newValue,
      marketing: newValue
    });
  };

  const handleIndividualAgreement = (type) => {
    const newAgreements = {
      ...agreements,
      [type]: !agreements[type]
    };

    // 필수 약관들이 모두 체크되었는지 확인
    newAgreements.all = newAgreements.service && newAgreements.privacy && newAgreements.photo && newAgreements.marketing;

    setAgreements(newAgreements);
  };

  const toggleTermsExpansion = (type) => {
    setExpandedTerms({
      ...expandedTerms,
      [type]: !expandedTerms[type]
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // 필수 약관들이 모두 체크되었는지 확인
    if (agreements.service && agreements.privacy && agreements.photo) {
      navigation.navigate('PhoneVerificationScreen');
    }
  };

  // 필수 약관들이 모두 체크되었는지 확인
  const isRequiredTermsChecked = agreements.service && agreements.privacy && agreements.photo;

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

          {/* 서비스 이용약관 */}
          <TermsItem>
            <AgreementRow onPress={() => handleIndividualAgreement('service')}>
              <CheckBox checked={agreements.service}>
                <CheckMark checked={agreements.service}>✓</CheckMark>
              </CheckBox>
              <AgreementText>서비스 이용약관(필수)</AgreementText>
              <ArrowIcon
                onPress={() => toggleTermsExpansion('service')}
                expanded={expandedTerms.service}
              >
                {expandedTerms.service ? "⌄" : ">"}
              </ArrowIcon>
            </AgreementRow>
            {expandedTerms.service && (
              <TermsContent showsVerticalScrollIndicator={true}>
                <TermsTitle>제1조 (목적)</TermsTitle>
                <TermsText>
                  본 약관은 링고(이하 "회사")가 제공하는 구조화 설문 기반 촬영 및 연결 서비스(이하 "서비스")의 이용조건, 절차 및 관리·의무를 규정함을 목적으로 합니다.
                </TermsText>

                <TermsTitle>제2조 (정의)</TermsTitle>
                <TermsText>
                  ① 서비스: 회원의 구조화 설문 응답, 사진 촬영 및 연결 과정 전반을 포함하는 모든 온라인·오프라인 기능을 말합니다.
                  {"\n"}② 회원: 본 약관에 동의하고 회사와 이용계약을 체결한 자를 의미합니다.
                  {"\n"}③ 촬영 콘텐츠: 회사 또는 위탁작가가 촬영·보정한 회원의 사진, 영상 등을 말합니다.
                  {"\n"}④ 게시물: 회원이 서비스 내에 게시한 텍스트, 이미지, 댓글 등 일체의 정보를 의미합니다.
                  {"\n"}⑤ 구조화 설문: 개인의 성향·취향·관계적 태도를 파악하기 위해 회사가 설계한 체계적 문항 응답 시스템을 의미합니다.
                </TermsText>

                <TermsTitle>제3조 (서비스의 제공)</TermsTitle>
                <TermsText>
                  ① 회사는 회원에게 다음과 같은 서비스를 제공합니다:
                  {"\n"}  - 구조화 설문 시스템을 통한 개인 성향 분석
                  {"\n"}  - 전문 사진작가를 통한 프로필 촬영 서비스
                  {"\n"}  - 촬영된 사진의 전문적 보정 및 편집
                  {"\n"}  - 성향 분석 결과를 바탕으로 한 매칭 서비스
                  {"\n"}② 서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다.
                  {"\n"}③ 회사는 서비스의 품질 향상을 위해 지속적으로 서비스를 개선하고 업데이트할 수 있습니다.
                </TermsText>

                <TermsTitle>제4조 (회원의 의무)</TermsTitle>
                <TermsText>
                  ① 회원은 다음 행위를 하여서는 안됩니다:
                  {"\n"}  - 타인의 개인정보를 도용하거나 허위 정보를 제공하는 행위
                  {"\n"}  - 서비스를 이용하여 법령이나 공서양속에 위반되는 행위
                  {"\n"}  - 회사의 지적재산권을 침해하는 행위
                  {"\n"}  - 서비스의 안정적 운영을 방해하는 행위
                  {"\n"}② 회원은 본인의 개인정보 관리에 대한 책임을 집니다.
                  {"\n"}③ 회원은 촬영 약속 시간을 준수하여야 하며, 취소 시 사전에 통지하여야 합니다.
                </TermsText>

                <TermsTitle>제5조 (서비스 이용료 및 결제)</TermsTitle>
                <TermsText>
                  ① 서비스 이용료는 회사가 정한 요금표에 따릅니다.
                  {"\n"}② 결제는 신용카드, 계좌이체, 간편결제 등의 방법으로 가능합니다.
                  {"\n"}③ 이용료 납부 후 서비스가 제공되며, 사전 결제를 원칙으로 합니다.
                </TermsText>
              </TermsContent>
            )}
          </TermsItem>

          {/* 개인정보 수집 및 이용 */}
          <TermsItem>
            <AgreementRow onPress={() => handleIndividualAgreement('privacy')}>
              <CheckBox checked={agreements.privacy}>
                <CheckMark checked={agreements.privacy}>✓</CheckMark>
              </CheckBox>
              <AgreementText>개인정보 수집 및 이용(필수)</AgreementText>
              <ArrowIcon
                onPress={() => toggleTermsExpansion('privacy')}
                expanded={expandedTerms.privacy}
              >
                {expandedTerms.privacy ? "⌄" : ">"}
              </ArrowIcon>
            </AgreementRow>
            {expandedTerms.privacy && (
              <TermsContent>
                <TermsTitle>제1조 (수집 및 이용 항목)</TermsTitle>
                <TermsText>
                  회사는 다음의 개인정보를 마케팅 및 이벤트 정보 제공 목적으로 이용할 수 있습니다.
                  {"\n"}• 회원가입 시 자발적 입력
                  {"\n"}선택 항목사항: 연락처(휴대전화 번호)
                </TermsText>

                <TermsTitle>제2조 (이용 목적)</TermsTitle>
                <TermsText>
                  회사는 회원의 동의에 따라 다음의 목적으로 마케팅 정보를 제공합니다.
                  {"\n"}1. 신규 서비스, 기능, 업데이트 안내
                </TermsText>
              </TermsContent>
            )}
          </TermsItem>

          {/* 초상권 및 촬영물 활용 동의 */}
          <TermsItem>
            <AgreementRow onPress={() => handleIndividualAgreement('photo')}>
              <CheckBox checked={agreements.photo}>
                <CheckMark checked={agreements.photo}>✓</CheckMark>
              </CheckBox>
              <AgreementText>초상권 및 촬영물 활용 동의(필수)</AgreementText>
              <ArrowIcon
                onPress={() => toggleTermsExpansion('photo')}
                expanded={expandedTerms.photo}
              >
                {expandedTerms.photo ? "⌄" : ">"}
              </ArrowIcon>
            </AgreementRow>
            {expandedTerms.photo && (
              <TermsContent>
                <TermsText>
                  회원은 서비스 이용 과정에서 촬영되는 사진, 영상 등의 초상권 사용에 동의합니다.
                </TermsText>
              </TermsContent>
            )}
          </TermsItem>

          {/* 마케팅·이벤트 안내 수신 */}
          <TermsItem>
            <AgreementRow onPress={() => handleIndividualAgreement('marketing')}>
              <CheckBox checked={agreements.marketing}>
                <CheckMark checked={agreements.marketing}>✓</CheckMark>
              </CheckBox>
              <AgreementText>마케팅·이벤트 안내 수신(선택)</AgreementText>
              <ArrowIcon
                onPress={() => toggleTermsExpansion('marketing')}
                expanded={expandedTerms.marketing}
              >
                {expandedTerms.marketing ? "⌄" : ">"}
              </ArrowIcon>
            </AgreementRow>
            {expandedTerms.marketing && (
              <TermsContent>
                <TermsText>
                  회사는 다음의 개인정보를 마케팅 및 이벤트 정보 제공 목적으로 이용할 수 있습니다.
                  {"\n"}• 회원가입 시 자발적 입력
                  {"\n"}선택 항목사항: 연락처(휴대전화 번호)
                </TermsText>
              </TermsContent>
            )}
          </TermsItem>
        </AgreementContainer>

        <ButtonContainer>
          <ContinueButton
            onPress={handleContinue}
            disabled={!isRequiredTermsChecked}
            isActive={isRequiredTermsChecked}
          >
            <ContinueText isActive={isRequiredTermsChecked}>
              계속하기
            </ContinueText>
          </ContinueButton>
        </ButtonContainer>
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
    margin-bottom: ${width * 0.05}px;
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

const TermsItem = styled.View`
    margin-bottom: ${width * 0.02}px;
`;

const AgreementRow = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${width * 0.04}px 0;
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
    padding: ${width * 0.02}px;
`;

const Divider = styled.View`
    height: 1px;
    background-color: #E0E0E0;
    margin: ${width * 0.02}px 0;
`;

const TermsContent = styled.ScrollView`
    max-height: ${width * 0.6}px;
    padding: ${width * 0.04}px;
    padding-left: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    margin-top: ${width * 0.02}px;
`;

const TermsTitle = styled(PtdBText)`
    font-size: ${width * 0.035}px;
    color: ${colors.black};
    font-weight: bold;
    margin-bottom: ${width * 0.02}px;
`;

const TermsText = styled(PtdText)`
    font-size: ${width * 0.032}px;
    color: #666666;
    line-height: ${width * 0.045}px;
    margin-bottom: ${width * 0.03}px;
`;

const ButtonContainer = styled.View`
    background-color: #FFFFFF;
    padding-top: ${width * 0.03}px;
    padding-bottom: ${width * 0.15}px;
    padding-horizontal: ${width * 0.01}px;
    margin-top: ${width * 0.02}px;
    margin-bottom: -${width * 0.15}px;
    border-radius: 0px;
`;

const ContinueButton = styled.TouchableOpacity`
    height: ${width * 0.13}px;
    background-color: ${props => props.isActive ? colors.primary || '#14C871' : '#E0E0E0'};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ContinueText = styled(PtdText)`
    color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;