import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const { width } = Dimensions.get('window');

const InfoInputScreen = () => {
    const navigation = useNavigation();
    const [job, setJob] = useState('');
    const [height, setHeight] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        console.log('Job:', job);
        console.log('Height:', height);
        // navigation.navigate('NextScreen');
    };

    const isNextButtonActive = job.trim() !== '' && height.trim() !== '';

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
                    <StepText>4</StepText>
                    <StepDivider>/</StepDivider>
                    <StepTotal>9</StepTotal>
                </StepIndicator>

                <MainTitle>
                    회원님의{"\n"}
                    정보를 입력해주세요
                </MainTitle>

                <Section>
                    <SectionLabel>직업</SectionLabel>
                    <InputField
                        value={job}
                        onChangeText={setJob}
                        placeholder="불타는망고"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType="done"
                    />
                </Section>

                <Section>
                    <SectionLabel>키</SectionLabel>
                    <HeightInputContainer>
                        <HeightInput
                            value={height}
                            onChangeText={setHeight}
                            placeholder=""
                            placeholderTextColor="#CCCCCC"
                            keyboardType="numeric"
                            returnKeyType="done"
                            maxLength={3}
                        />
                        <UnitTextInside>cm</UnitTextInside>
                    </HeightInputContainer>
                </Section>

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
    margin-bottom: ${width * 0.08}px;
    font-weight: bold;
`;

const Section = styled.View`
    margin-bottom: ${width * 0.06}px;
`;

const SectionLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.03}px;
`;

const InputField = styled.TextInput`
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    height: ${width * 0.13}px;
`;

const HeightInputContainer = styled.View`
    width: 50%;
    position: relative;
`;

const HeightInput = styled.TextInput`
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px;
    padding-right: ${width * 0.15}px;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    height: ${width * 0.13}px;
`;

const UnitTextInside = styled(PtdText)`
    position: absolute;
    right: ${width * 0.04}px;
    top: ${width * 0.04}px;
    font-size: ${width * 0.04}px;
    color: #999999;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
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

export default InfoInputScreen;
