import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

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
    const handleDuplicateCheck = () => {
        // 조건을 만족하면 항상 사용 가능하다고 설정
        setIsDuplicateChecked(true);
        setModalMessage("사용 가능한 아이디입니다.");
        setShowModal(true);
    };

    // 모달 확인 버튼
    const handleModalConfirm = () => {
        setShowModal(false);
    };    // 다음 버튼 클릭
    const handleNext = () => {
        if (isDuplicateChecked) {
            navigation.navigate('다음 스크린 이름');
        }
    }; const handleBackPress = () => {
        navigation.goBack();
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
                    <Header>
                        <BackButton onPress={handleBackPress}>
                            <BackText>{"<"}</BackText>
                        </BackButton>
                    </Header>

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
            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <ModalOverlay>
                    <ModalContainer>
                        <ModalContent>
                            <ModalMessage>{modalMessage}</ModalMessage>
                            <ModalButton onPress={handleModalConfirm}>
                                <ModalButtonText>확인</ModalButtonText>
                            </ModalButton>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default IdInputScreen;

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
    background-color: #F8F8F8;
    border-top-width: 1px;
    border-top-color: #E0E0E0;
    justify-content: center;
    padding: 0 ${width * 0.05}px;
`;

const NextButton = styled.TouchableOpacity`
    height: ${width * 0.1}px;
    background-color: ${props => props.isActive ? '#14C871' : '#E0E0E0'};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const NextButtonText = styled(PtdText)`
    color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
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

// 모달 스타일
const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    width: ${width * 0.7}px;
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: ${width * 0.06}px;
    align-items: center;
`;

const ModalContent = styled.View`
    align-items: center;
`;

const ModalMessage = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    text-align: center;
    margin-bottom: ${width * 0.06}px;
    line-height: ${width * 0.055}px;
`;

const ModalButton = styled.TouchableOpacity`
    padding: ${width * 0.025}px ${width * 0.05}px;
`;

const ModalButtonText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #14C871;
    font-weight: bold;
`;