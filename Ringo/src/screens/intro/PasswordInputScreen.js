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
    const [isValid, setIsValid] = useState(false);

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
    };

    // 다음 버튼 클릭
    const handleNext = () => {
        if (isValid) {
            navigation.navigate('PasswordConfirmScreen', { password });
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    // 조건 텍스트 색상 결정
    const getConditionColor = () => {
        if (password.length === 0) return '#999999';
        return isValid ? '#14C871' : '#FF0000';
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Wrapper>
                <Background />
                <Content>
                    <Header>
                        <BackButton onPress={handleBackPress}>
                            <BackText>{"<"}</BackText>
                        </BackButton>
                    </Header>

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

                        <ConditionText color={getConditionColor()}>
                            영문, 숫자 2가지 / 최소 8자 이상
                        </ConditionText>
                    </InputContainer>

                    <Spacer />
                </Content>

                <KeyboardToolbar>
                    <NextButton
                        onPress={handleNext}
                        disabled={!isValid}
                        isActive={isValid}
                    >
                        <NextButtonText isActive={isValid}>
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