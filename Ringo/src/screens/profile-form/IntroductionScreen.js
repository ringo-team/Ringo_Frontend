import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const { width } = Dimensions.get('window');

const IntroductionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const previousData = route.params || {};
    
    console.log('IntroductionScreen - Received data:', previousData);
    
    const [introduction, setIntroduction] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        const profileData = {
            ...previousData,
            introduction
        };
        console.log('IntroductionScreen - Sending data:', profileData);
        navigation.navigate('HashtagInputScreen', profileData);
    };

    // 한글 기준 글자 수 계산 (한글 1자 = 1, 영문/숫자 1자 = 0.5로 계산)
    const getTextLength = (text) => {
        let length = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            // 한글 유니코드 범위: AC00-D7AF
            if (char.match(/[\uAC00-\uD7AF]/)) {
                length += 1;
            } else {
                length += 0.5;
            }
        }
        return Math.ceil(length);
    };

    const handleTextChange = (text) => {
        const textLength = getTextLength(text);
        if (textLength <= 250) {
            setIntroduction(text);
        }
    };

    const textLength = getTextLength(introduction);
    const isNextButtonActive = textLength >= 20 && textLength <= 250;

    return (
        <Wrapper>
            <Background />
            <Content>
                <Header>
                    <BackButton onPress={handleBack}>
                        <BackIcon width={width * 0.06} height={width * 0.06} />
                    </BackButton>
                    <HeaderTitle>프로필 입력</HeaderTitle>
                </Header>

                <StepIndicator>
                    <StepText>6</StepText>
                    <StepDivider>/</StepDivider>
                    <StepTotal>9</StepTotal>
                </StepIndicator>

                <MainTitle>
                    회원님을{"\n"}
                    자유롭게 소개해주세요
                </MainTitle>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <Section>
                        <SectionLabel>소개글</SectionLabel>
                        <CharacterCount>
                            <CharacterCountText isValid={textLength >= 20}>
                                최소 20자부터 250자까지 입력해주세요
                            </CharacterCountText>
                        </CharacterCount>
                        <IntroductionInput
                            value={introduction}
                            onChangeText={handleTextChange}
                            placeholder="안녕하세요! 새로운 인연을 만나고 싶어 가입했습니다. 맛집 탐방과 영화 보는 것을 좋아해요."
                            placeholderTextColor="#CCCCCC"
                            multiline
                            textAlignVertical="top"
                            maxLength={500}
                        />
                    </Section>

                    <Section>
                        <SectionLabel>이렇게 소개돼요</SectionLabel>
                        <PreviewContainer>
                            <PreviewPlaceholder>예시 이미지</PreviewPlaceholder>
                        </PreviewContainer>
                    </Section>
                </ScrollView>

                <ButtonRow>
                    <PreviousButton onPress={handlePrevious}>
                        <ButtonText>이전</ButtonText>
                    </PreviousButton>

                    <NextButton
                        onPress={handleNext}
                        disabled={!isNextButtonActive}
                        isActive={isNextButtonActive}
                    >
                        <NextButtonText isActive={isNextButtonActive}>
                            다음
                        </NextButtonText>
                    </NextButton>
                </ButtonRow>
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${width * 0.05}px;
    padding-top: ${width * 0.15}px;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${width * 0.06}px;
    justify-content: flex-start;
`;

const BackButton = styled.TouchableOpacity`
    padding: ${width * 0.02}px;
    margin-right: ${width * 0.03}px;
`;

const HeaderTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    font-weight: bold;
`;

const StepIndicator = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-bottom: ${width * 0.06}px;
`;

const StepText = styled(PtdBText)`
    font-size: 18px;
    color: ${colors.black};
    font-weight: bold;
`;

const StepDivider = styled(PtdBText)`
    font-size: 18px;
    color: #CCCCCC;
    margin: 0 ${width * 0.01}px;
    font-weight: bold;
`;

const StepTotal = styled(PtdBText)`
    font-size: 18px;
    color: #CCCCCC;
    font-weight: bold;
`;

const MainTitle = styled(PtdBText)`
    font-size: ${width * 0.065}px;
    color: ${colors.black};
    line-height: ${width * 0.09}px;
    margin-bottom: ${width * 0.06}px;
    font-weight: bold;
`;

const Section = styled.View`
    margin-bottom: ${width * 0.08}px;
`;

const SectionLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.02}px;
`;

const CharacterCount = styled.View`
    margin-bottom: ${width * 0.02}px;
`;

const CharacterCountText = styled(PtdText)`
    font-size: ${width * 0.032}px;
    color: ${props => props.isValid ? '#999999' : '#999999'};
`;

const IntroductionInput = styled.TextInput`
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    min-height: ${width * 0.6}px;
`;

const PreviewContainer = styled.View`
    background-color: #F8F8F8;
    border-radius: 12px;
    height: ${width * 0.8}px;
    justify-content: center;
    align-items: center;
`;

const PreviewPlaceholder = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #CCCCCC;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
    margin-top: ${width * 0.02}px;
    padding-bottom: ${width * 0.05}px;
`;

const PreviousButton = styled.TouchableOpacity`
    flex: 1;
    height: ${width * 0.13}px;
    background-color: #E0E0E0;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled(PtdBText)`
    color: #FFFFFF;
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

const NextButton = styled.TouchableOpacity`
    flex: 3;
    height: ${width * 0.13}px;
    background-color: ${props => props.isActive ? colors.primary || '#14C871' : '#E0E0E0'};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const NextButtonText = styled(PtdBText)`
    color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
    font-size: ${width * 0.04}px;
`;

export default IntroductionScreen;
