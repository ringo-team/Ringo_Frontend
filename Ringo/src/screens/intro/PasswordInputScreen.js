import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

const { width } = Dimensions.get('window');

const PasswordInputScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // 비밀번호 유효성 검사
    const validatePassword = (pwd) => {
        // 영문, 숫자 2가지 포함 + 8자 이상
        const hasAlpha = /[a-zA-Z]/.test(pwd);
        const hasNumeric = /[0-9]/.test(pwd);
        const isValidLength = pwd.length >= 8;
        const isOnlyAlphaNumeric = /^[a-zA-Z0-9]+$/.test(pwd);

        return hasAlpha && hasNumeric && isValidLength && isOnlyAlphaNumeric;
    };

    // 비밀번호 입력 처리
    const handlePasswordChange = (text) => {
        setPassword(text);
        const valid = validatePassword(text);
        setIsValid(valid);
        setShowConfirm(valid);
        if (confirmPassword.length > 0) {
            setIsMatching(text === confirmPassword);
        }
    };

    // 비밀번호 확인 처리
    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        const matching = text.length > 0 && text === password;
        setIsMatching(matching);
    };

    // 다음 버튼 클릭
    const handleNext = () => {
        if (isValid && isMatching) {
            navigation.navigate('SurveyIntroScreen');
        }
    };

    const getPasswordConditionColor = () => {
        if (password.length === 0) return '#999999';
        return isValid ? '#14C871' : '#FF0000';
    }

    // 조건 텍스트 색상 결정
    const getConfirmConditionColor = () => {
        if (confirmPassword.length === 0) return '#999999';
        return isMatching ? '#14C871' : '#FF0000';
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Wrapper>
                <Background />
                <Content>
                    <TitleContainer>
                        <Title>비밀번호를 입력해 주세요</Title>
                    </TitleContainer>

                    <InputContainer>
                        <InputWrapper>
                            <PasswordInput
                                placeholder="비밀번호를 입력해주세요"
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                isValid={isValid}
                                hasText={password.length > 0}
                            />
                        </InputWrapper>

                        <ConditionText color={getPasswordConditionColor()}>
                            영문, 숫자 2가지 / 최소 8자 이상
                        </ConditionText>

                        {showConfirm && (
                            <>
                                <InputWrapper style={{ marginTop: width * 0.08 }}>
                                    <PasswordInput
                                        placeholder="비밀번호를 다시 입력해주세요"
                                        value={confirmPassword}
                                        onChangeText={handleConfirmPasswordChange}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        isValid={isMatching}
                                        hasText={confirmPassword.length > 0}
                                    />
                                </InputWrapper>

                                <ConditionText color={getConfirmConditionColor()}>
                                    {confirmPassword.length === 0
                                        ? '비밀번호를 다시 입력해주세요'
                                        : isMatching
                                            ? '비밀번호가 일치합니다'
                                            : '비밀번호가 일치하지 않습니다'}
                                </ConditionText>
                            </>
                        )}
                    </InputContainer>

                    <Spacer />
                </Content>

                <KeyboardToolbar>
                    <NextButton
                        onPress={handleNext}
                        disabled={!isValid || !isMatching}
                        isActive={isValid && isMatching}
                    >
                        <NextButtonText isActive={isValid && isMatching}>
                            다음
                        </NextButtonText>
                    </NextButton>
                </KeyboardToolbar>
            </Wrapper>
        </KeyboardAvoidingView>
    );
};

export default PasswordInputScreen;

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

const InputContainer = styled.View`
    margin-bottom: ${width * 0.1}px;
`;

const InputWrapper = styled.View`
    position: relative;
`;

const PasswordInput = styled.TextInput`
    height: ${width * 0.13}px;
    border-bottom-width: 2px;
    border-bottom-color: ${props => {
        if (!props.hasText) return '#E0E0E0';
        return props.isValid ? '#14C871' : '#FF0000';
    }};
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    background-color: transparent;
`;

const ConditionText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${props => props.color};
    margin-top: ${width * 0.02}px;
`;

const KeyboardToolbar = styled.View`
    height: ${width * 0.12}px;
    background-color: #14C871;
    justify-content: center;
    align-items: center;
`;

const NextButton = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    background-color: ${props => props.isActive ? '#14C871' : '#E0E0E0'};
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const NextButtonText = styled(PtdText)`
    color: #FFFFFF;
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

const Spacer = styled.View`
    flex: 1;
`;