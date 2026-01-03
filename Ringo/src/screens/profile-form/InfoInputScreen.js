import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const InfoInputScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const previousData = route.params || {};
    
    console.log('InfoInputScreen - Received data:', previousData);
    
    const [job, setJob] = useState('');
    const [height, setHeight] = useState('');

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        const profileData = {
            ...previousData,
            job,
            height
        };
        console.log('InfoInputScreen - Sending data:', profileData);
        navigation.navigate('PreferenceInputScreen', profileData);
    };

    const StepIndicator = ({ currentStep, totalSteps}) => {
        return (
            <Indicator>
                <IndicatorText>
                    {currentStep} 
                    <DividerText> / {totalSteps} </DividerText>
                </IndicatorText>
            </Indicator>
        )
    };

    const isNextButtonActive = job.trim() !== '' && height.trim() !== '';

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={4} totalSteps={9}/>

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

                <ButtonContainer>
                    <CustomButton
                        title="이전"
                        isActive={true}
                        activeColor={colors.gray100}
                        onPress={handlePrevious}
                        style={{height: width * 0.13, borderRadius: 12}}
                    />
                    
                    <CustomButton
                        title="다음"
                        disabled={!isNextButtonActive}
                        isActive={isNextButtonActive}
                        onPress={handleNext}
                        style={{width: "85%", height: width * 0.13, borderRadius: 12}}
                    />
                </ButtonContainer>
            </Content>
        </Wrapper>
    );
};

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
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    font-weight: bold;
`;

const Indicator = styled.View`
    align-items: left;
    margin-bottom: ${width * 0.034}px;
`;
    
const IndicatorText = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    font-weight: bold;
`;

const DividerText = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.gray100};
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

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;

export default InfoInputScreen;
