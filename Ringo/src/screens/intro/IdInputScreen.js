import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomModal from "../../components/CustomModal";

const { width } = Dimensions.get('window');

const IdInputScreen = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [showDuplicateCheck, setShowDuplicateCheck] = useState(false);
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // 아이디 유효성 검사
    const validateUserId = (id) => {
        // 영문, 숫자 2가지 포함 + 6자 이상 12자 이하
        const hasAlpha = /[a-zA-Z]/.test(id);
        const hasNumeric = /[0-9]/.test(id);
        const isValidLength = id.length >= 6 && id.length <= 12;
        const isOnlyAlphaNumeric = /^[a-zA-Z0-9]+$/.test(id);

        return hasAlpha && hasNumeric && isValidLength && isOnlyAlphaNumeric;
    };

    // 아이디 입력 처리
    const handleUserIdChange = (text) => {
        setUserId(text);
        const valid = validateUserId(text);
        setIsValid(valid);
        setShowDuplicateCheck(valid);
        setIsDuplicateChecked(false); // 아이디가 변경되면 중복확인 초기화
    };

    // 중복확인
    const handleDuplicateCheck = async () => {
        try {
            const response = await fetch(`http://localhost:8080/signup/check-loginId?email=${userId}`);
            const result = await response.json();
            
            if (response.ok) {
                // 성공 응답 (사용 가능한 아이디)
                setIsDuplicateChecked(true);
                setModalMessage("사용 가능한 아이디입니다.");
            } else {
                // 중복된 아이디
                setIsDuplicateChecked(false);
                setModalMessage("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            // 네트워크 오류 등
            console.error('아이디 중복확인 오류:', error);
            setIsDuplicateChecked(false);
            setModalMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
        
        setShowModal(true);
    };

    // 모달 확인 버튼
    const handleModalConfirm = () => {
        setShowModal(false);
    };    // 다음 버튼 클릭
    const handleNext = () => {
        if (isDuplicateChecked) {
            navigation.navigate('PasswordInputScreen', { userId: userId });
        }
    };

    // 조건 텍스트 색상 결정
    const getConditionColor = () => {
        if (userId.length === 0) return '#999999';
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
                    <TitleContainer>
                        <Title>아이디를 입력해 주세요</Title>
                    </TitleContainer>

                    <InputContainer>
                        <InputWrapper>
                            <UserIdInput
                                placeholder="아이디를 입력해주세요"
                                value={userId}
                                onChangeText={handleUserIdChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={12}
                                isValid={isValid}
                                hasText={userId.length > 0}
                                paddingRight={showDuplicateCheck ? 80 : 0}
                            />

                            {showDuplicateCheck && (
                                <DuplicateButtonInside onPress={handleDuplicateCheck}>
                                    <DuplicateButtonText>중복확인</DuplicateButtonText>
                                </DuplicateButtonInside>
                            )}
                        </InputWrapper>

                        <ConditionText color={getConditionColor()}>
                            영문, 숫자 2가지 / 6자 이상 12자 이하
                        </ConditionText>
                    </InputContainer>

                    <Spacer />
                </Content>

                <KeyboardToolbar>
                    <NextButton
                        onPress={handleNext}
                        disabled={!isDuplicateChecked}
                        isActive={isDuplicateChecked}
                    >
                        <NextButtonText isActive={isDuplicateChecked}>
                            다음
                        </NextButtonText>
                    </NextButton>
                </KeyboardToolbar>
            </Wrapper>

            {/* 커스텀 모달 */}
            <CustomModal
                visible={showModal}
                content={modalMessage}
                confirmText="확인"
                onConfirm={handleModalConfirm}
                onCancel={() => setShowModal(false)}
            />
        </KeyboardAvoidingView>
    );
};

export default IdInputScreen;

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

const ConditionText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${props => props.color};
    margin-top: ${width * 0.02}px;
`;

const InputWrapper = styled.View`
    position: relative;
`;

const UserIdInput = styled.TextInput`
    height: ${width * 0.13}px;
    border-bottom-width: 2px;
    border-bottom-color: ${props => {
        if (!props.hasText) return '#E0E0E0';
        return props.isValid ? '#14C871' : '#FF0000';
    }};
    padding-right: ${props => props.paddingRight || 0}px;
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    background-color: transparent;
`;

const DuplicateButtonInside = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    top: ${width * 0.02}px;
    bottom: ${width * 0.02}px;
    width: ${width * 0.18}px;
    background-color: #E3F2FD;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
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

const DuplicateButtonText = styled(PtdText)`
    color: #1976D2;
    font-size: ${width * 0.035}px;
    font-weight: bold;
`;

const Spacer = styled.View`
    flex: 1;
`;