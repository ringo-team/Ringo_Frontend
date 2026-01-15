import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const MBTIInputScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const previousData = route.params || {};

    console.log('MBTIInputScreen - Received data:', previousData);

    const [mbti, setMbti] = useState({
        ei: '', // E or I
        ns: '', // N or S
        tf: '', // T or F
        jp: '', // J or P
    });

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        const mbtiString = `${mbti.ei}${mbti.ns}${mbti.tf}${mbti.jp}`;
        const profileData = {
            ...previousData,
            mbti: mbtiString
        };
        console.log('MBTIInputScreen - Sending data:', profileData);
        navigation.navigate('IntroductionScreen', profileData);
    };

    const handleSkip = () => {
        const profileData = {
            ...previousData,
            mbti: ''
        };
        console.log('MBTIInputScreen - Skipping, Sending data:', profileData);
        navigation.navigate('IntroductionScreen', profileData);
    };

    const StepIndicator = ({ currentStep, totalSteps }) => {
        return (
            <Indicator>
                <IndicatorText>
                    {currentStep}
                    <DividerText> / {totalSteps} </DividerText>
                </IndicatorText>
            </Indicator>
        )
    };

    const selectMbti = (category, value) => {
        setMbti(prev => ({ ...prev, [category]: value }));
    };

    const isNextButtonActive = mbti.ei && mbti.ns && mbti.tf && mbti.jp;

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={6} totalSteps={10} />

                <MainTitle>
                    회원님의{"\n"}
                    MBTI를 알려주세요
                </MainTitle>

                <SectionsContainer>
                    {/* 에너지 방향 E/I */}
                    <Section>
                        <SectionLabel>에너지 방향</SectionLabel>
                        <OptionsRow>
                            <OptionButton
                                selected={mbti.ei === 'E'}
                                onPress={() => selectMbti('ei', 'E')}
                            >
                                <OptionText selected={mbti.ei === 'E'}>E</OptionText>
                            </OptionButton>
                            <OptionButton
                                selected={mbti.ei === 'I'}
                                onPress={() => selectMbti('ei', 'I')}
                            >
                                <OptionText selected={mbti.ei === 'I'}>I</OptionText>
                            </OptionButton>
                        </OptionsRow>
                    </Section>

                    {/* 인식 기능 N/S */}
                    <Section>
                        <SectionLabel>인식 기능</SectionLabel>
                        <OptionsRow>
                            <OptionButton
                                selected={mbti.ns === 'N'}
                                onPress={() => selectMbti('ns', 'N')}
                            >
                                <OptionText selected={mbti.ns === 'N'}>N</OptionText>
                            </OptionButton>
                            <OptionButton
                                selected={mbti.ns === 'S'}
                                onPress={() => selectMbti('ns', 'S')}
                            >
                                <OptionText selected={mbti.ns === 'S'}>S</OptionText>
                            </OptionButton>
                        </OptionsRow>
                    </Section>

                    {/* 판단 기능 F/T */}
                    <Section>
                        <SectionLabel>판단 기능</SectionLabel>
                        <OptionsRow>
                            <OptionButton
                                selected={mbti.tf === 'F'}
                                onPress={() => selectMbti('tf', 'F')}
                            >
                                <OptionText selected={mbti.tf === 'F'}>F</OptionText>
                            </OptionButton>
                            <OptionButton
                                selected={mbti.tf === 'T'}
                                onPress={() => selectMbti('tf', 'T')}
                            >
                                <OptionText selected={mbti.tf === 'T'}>T</OptionText>
                            </OptionButton>
                        </OptionsRow>
                    </Section>

                    {/* 생활 양식 J/P */}
                    <Section>
                        <SectionLabel>생활 양식</SectionLabel>
                        <OptionsRow>
                            <OptionButton
                                selected={mbti.jp === 'J'}
                                onPress={() => selectMbti('jp', 'J')}
                            >
                                <OptionText selected={mbti.jp === 'J'}>J</OptionText>
                            </OptionButton>
                            <OptionButton
                                selected={mbti.jp === 'P'}
                                onPress={() => selectMbti('jp', 'P')}
                            >
                                <OptionText selected={mbti.jp === 'P'}>P</OptionText>
                            </OptionButton>
                        </OptionsRow>
                    </Section>
                </SectionsContainer>

                <SkipButton onPress={handleSkip}>
                    <SkipButtonText>건너뛰기</SkipButtonText>
                </SkipButton>

                <ButtonContainer>
                    <CustomButton
                        title="이전"
                        isActive={true}
                        activeColor={colors.gray100}
                        onPress={handlePrevious}
                        style={{ height: width * 0.13, borderRadius: 12 }}
                    />

                    <CustomButton
                        title="다음"
                        disabled={!isNextButtonActive}
                        isActive={isNextButtonActive}
                        onPress={handleNext}
                        style={{ width: "85%", height: width * 0.13, borderRadius: 12 }}
                    />
                </ButtonContainer>
            </Content>
        </Wrapper>
    );
};

export default MBTIInputScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${width * 0.08}px;
`;

const TitleContainer = styled.View`
    margin-top: ${width * 0.12}px;
    margin-left: ${width * 0.1}px;
    margin-bottom: ${width * 0.1}px;
`;

const Title = styled(PtdBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
`;

const Indicator = styled.View`
    width: 100%;
    height: 4px;
    background-color: ${colors.gray100};
    border-radius: 2px;
    margin-bottom: ${width * 0.05}px;
    overflow: hidden;
`;

const IndicatorText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${colors.primary};
    position: absolute;
    bottom: -${width * 0.06}px;
`;

const DividerText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${colors.gray300};
`;

const MainTitle = styled(PtdBText)`
    font-size: ${width * 0.065}px;
    color: ${colors.black};
    line-height: ${width * 0.09}px;
    margin-bottom: ${width * 0.08}px;
`;

const SectionsContainer = styled.View`
    flex: 1;
`;

const Section = styled.View`
    margin-bottom: ${width * 0.06}px;
`;

const SectionLabel = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.03}px;
`;

const OptionsRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
`;

const OptionButton = styled.TouchableOpacity`
    flex: 1;
    height: ${width * 0.14}px;
    background-color: ${props => props.selected ? colors.primary : '#F5F5F5'};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

const OptionText = styled(PtdText)`
    font-size: ${width * 0.045}px;
    color: ${props => props.selected ? '#FFFFFF' : '#999999'};
`;

const SkipButton = styled.TouchableOpacity`
    align-items: center;
    padding: ${width * 0.03}px;
    margin-bottom: ${width * 0.05}px;
`;

const SkipButtonText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    text-decoration-line: underline;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: ${width * 0.03}px;
    padding-bottom: ${width * 0.05}px;
`;
