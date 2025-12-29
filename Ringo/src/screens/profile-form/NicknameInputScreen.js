import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const NicknameInputScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const previousData = route.params || {};
    
    console.log('NicknameInputScreen - 받은 previousData:', previousData);
    const [nickname, setNickname] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(null); // null: 미확인, true: 중복, false: 사용가능
    const [showModal, setShowModal] = useState(false);

    const handleCheckDuplicate = () => {
        // TODO: 실제 중복 확인 API 호출
        // 임시로 랜덤하게 중복/사용가능 판정
        const isAvailable = Math.random() > 0.5;
        setIsDuplicate(!isAvailable);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        // 다음 화면으로 이동
        console.log('Nickname:', nickname);
        
        const profileData = {
            ...previousData,
            nickname: nickname
        };
        
        console.log('NicknameInputScreen - 전달할 profileData:', profileData);
        navigation.navigate('LocationSelectScreen', profileData);
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

    const isNextButtonActive = isDuplicate === false; // 중복확인 성공 시에만 활성화

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={2} totalSteps={9}/>

                <MainTitle>
                    회원님의{"\n"}
                    닉네임을 입력해주세요
                </MainTitle>

                <Section>
                    <SectionLabel>닉네임</SectionLabel>
                    <InputRow>
                        <NicknameInput
                            value={nickname}
                            onChangeText={(text) => {
                                setNickname(text);
                                setIsDuplicate(null); // 입력 시 중복확인 상태 초기화
                            }}
                            placeholder="블티는맛고"
                            placeholderTextColor="#CCCCCC"
                        />
                        <CheckButton
                            onPress={handleCheckDuplicate}
                            disabled={!nickname.trim()}
                        >
                            <CheckButtonText>중복확인</CheckButtonText>
                        </CheckButton>
                    </InputRow>
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

            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleModalClose}
            >
                <ModalOverlay onPress={handleModalClose}>
                    <ModalContent onPress={(e) => e.stopPropagation()}>
                        <ModalMessage>
                            {isDuplicate
                                ? "중복된 닉네임입니다."
                                : "사용 가능한 닉네임입니다."}
                        </ModalMessage>
                        <ModalButton onPress={handleModalClose}>
                            <ModalButtonText>확인</ModalButtonText>
                        </ModalButton>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
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

const InputRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.02}px;
`;

const NicknameInput = styled.TextInput`
    flex: 1;
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px ${width * 0.04}px;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
`;

const CheckButton = styled.TouchableOpacity`
    background-color: #FFFFFF;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    padding: ${width * 0.04}px ${width * 0.05}px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const CheckButtonText = styled(PtdBText)`
    font-size: ${width * 0.035}px;
    color: ${colors.black};
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;

const ModalOverlay = styled.Pressable`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.View`
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: ${width * 0.06}px;
    width: ${width * 0.7}px;
    align-items: center;
`;

const ModalMessage = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    text-align: center;
    margin-bottom: ${width * 0.05}px;
`;

const ModalButton = styled.TouchableOpacity`
    background-color: ${colors.primary || '#14C871'};
    border-radius: 8px;
    padding: ${width * 0.03}px ${width * 0.08}px;
`;

const ModalButtonText = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: #FFFFFF;
`;

export default NicknameInputScreen;
