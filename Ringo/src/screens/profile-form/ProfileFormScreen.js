import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const ProfileFormScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { registeredUserId } = route.params || {};

    console.log('ProfileFormScreen - registeredUserId:', registeredUserId);
    const [selectedGender, setSelectedGender] = useState(null); // 'male' or 'female'
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleDateConfirm = (date) => {
        setBirthDate(date);
        setShowDatePicker(false);
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        // 다음 화면으로 이동
        console.log('Selected Gender:', selectedGender);
        console.log('Birth Date:', birthDate);

        const profileData = {
            registeredUserId,
            gender: selectedGender,
            birthday: birthDate.toISOString().split('T')[0] // YYYY-MM-DD 형식
        };

        console.log('ProfileFormScreen - 전달할 profileData:', profileData);
        navigation.navigate('NicknameInputScreen', profileData);
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
    }

    const isNextButtonActive = selectedGender !== null;

    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={1} totalSteps={10} />

                <MainTitle>
                    회원님의{"\n"}
                    기본 정보를 알려주세요
                </MainTitle>

                <Section>
                    <SectionLabel>성별</SectionLabel>
                    <GenderContainer>
                        <GenderButton
                            selected={selectedGender === 'male'}
                            onPress={() => handleGenderSelect('male')}
                        >
                            <GenderText selected={selectedGender === 'male'}>남성</GenderText>
                            <GenderIcon source={require('../../assets/imgs/icons/man.png')} />
                        </GenderButton>

                        <GenderButton
                            selected={selectedGender === 'female'}
                            onPress={() => handleGenderSelect('female')}
                        >
                            <GenderText selected={selectedGender === 'female'}>여성</GenderText>
                            <GenderIcon source={require('../../assets/imgs/icons/woman.png')} />
                        </GenderButton>
                    </GenderContainer>
                </Section>

                <Section>
                    <SectionLabel>생년월일</SectionLabel>
                    <DateContainer>
                        <DateInputWrapper>
                            <DateInput onPress={() => setShowDatePicker(!showDatePicker)}>
                                <DateInputText>{year}</DateInputText>
                            </DateInput>
                            <DateLabel>년</DateLabel>
                        </DateInputWrapper>

                        <DateInputWrapper>
                            <DateInput onPress={() => setShowDatePicker(!showDatePicker)}>
                                <DateInputText>{month}</DateInputText>
                            </DateInput>
                            <DateLabel>월</DateLabel>
                        </DateInputWrapper>

                        <DateInputWrapper>
                            <DateInput onPress={() => setShowDatePicker(!showDatePicker)}>
                                <DateInputText>{day}</DateInputText>
                            </DateInput>
                            <DateLabel>일</DateLabel>
                        </DateInputWrapper>
                    </DateContainer>

                    <DatePicker
                        modal
                        open={showDatePicker}
                        date={birthDate}
                        mode="date"
                        maximumDate={new Date()}
                        locale="ko"
                        title="생년월일 선택"
                        confirmText="확인"
                        cancelText="취소"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setShowDatePicker(false)}
                    />
                </Section>

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
    margin-bottom: ${width * 0.08}px;
`;

const SectionLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.03}px;
`;

const GenderContainer = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
`;

const GenderButton = styled.TouchableOpacity`
    flex: 1;
    height: 72px;
    background-color: #FFFFFF;
    border: 2px solid ${props => props.selected ? '#14C871' : '#E0E0E0'};
    border-radius: 12px;
    padding: ${width * 0.04}px ${width * 0.05}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const GenderText = styled(PtdBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    font-weight: bold;
`;

const GenderIcon = styled.Image`
    width: 48px;
    height: 48px;
    resize-mode: contain;
`;

const DateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width * 0.03}px;
`;

const DateInputWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const DateInput = styled.TouchableOpacity`
    background-color: #FFFFFF;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    padding: ${width * 0.035}px ${width * 0.06}px;
    min-width: ${width * 0.17}px;
    align-items: center;
    justify-content: center;
`;

const DateInputText = styled(PtdText)`
    font-size: ${width * 0.042}px;
    color: ${colors.black};
`;

const DateLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-left: ${width * 0.02}px;
    font-weight: bold;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;


export default ProfileFormScreen;
