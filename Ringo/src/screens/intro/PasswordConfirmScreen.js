import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

const { width } = Dimensions.get('window');

const PasswordConfirmScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { password: originalPassword } = route.params;
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatching, setIsMatching] = useState(false);

    // 비밀번호 확인 처리
    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        const matching = text.length > 0 && text === originalPassword;
        setIsMatching(matching);
    };

    // 다음 버튼 클릭
    const handleNext = () => {
        if (isMatching) {
            navigation.navigate('SurveyIntroScreen'); // 설문 안내 화면으로 이동
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    // 조건 텍스트 색상 결정
    const getConditionColor = () => {
        if (confirmPassword.length === 0) return '#999999';
        return isMatching ? '#14C871' : '#FF0000';
    };

    // 조건 텍스트 내용 결정
    const getConditionText = () => {
        if (confirmPassword.length === 0) return '비밀번호를 다시 입력해주세요';
        return isMatching ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다';
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
                        <Title>비밀번호를 확인해주세요</Title>
                    </TitleContainer>

                    <InputContainer>
                        {/* 첫 번째 비밀번호 표시 (읽기 전용) */}
                        <InputWrapper>
                            <PasswordInput
                                value={originalPassword}
                                secureTextEntry={true}
                                editable={false}
                                isValid={true}
                                hasText={true}
                                isReadOnly={true}
                            />
                        </InputWrapper>
                        
                        {/* 두 번째 비밀번호 입력 */}
                        <InputWrapper style={{ marginTop: 20 }}>
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
                        
                        <ConditionText color={getConditionColor()}>
                            {getConditionText()}
                        </ConditionText>
                    </InputContainer>

                    <Spacer />
                </Content>
                
                <KeyboardToolbar>
                    <NextButton 
                        onPress={handleNext}
                        disabled={!isMatching}
                        isActive={isMatching}
                    >
                        <NextButtonText isActive={isMatching}>
                            다음
                        </NextButtonText>
                    </NextButton>
                </KeyboardToolbar>
            </Wrapper>
        </KeyboardAvoidingView>
    );
};

export default PasswordConfirmScreen;

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
        if (props.isReadOnly) return '#E0E0E0';
        if (!props.hasText) return '#E0E0E0';
        return props.isValid ? '#14C871' : '#FF0000';
    }};
    font-size: ${width * 0.04}px;
    color: ${props => props.isReadOnly ? '#999999' : colors.black};
    background-color: transparent;
    opacity: ${props => props.isReadOnly ? 0.7 : 1};
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