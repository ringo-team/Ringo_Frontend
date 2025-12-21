import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";
import { REGION_DATA, PROVINCES } from "../../constants/regionData";

const { width } = Dimensions.get('window');

const LocationSelectScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const previousData = route.params || {};
    
    console.log('LocationSelectScreen - Received data:', previousData);

    // 거주지
    const [residenceProvince, setResidenceProvince] = useState("");
    const [residenceDistrict, setResidenceDistrict] = useState("");

    // 활동지역
    const [activityProvince, setActivityProvince] = useState("");
    const [activityDistrict, setActivityDistrict] = useState("");

    // 모달 상태
    const [showProvinceModal, setShowProvinceModal] = useState(false);
    const [showDistrictModal, setShowDistrictModal] = useState(false);
    const [currentType, setCurrentType] = useState(""); // "residence" or "activity"

    const handleBack = () => {
        navigation.goBack();
    };

    const handleProvinceSelect = (province) => {
        if (currentType === "residence") {
            setResidenceProvince(province);
            setResidenceDistrict("");
        } else {
            setActivityProvince(province);
            setActivityDistrict("");
        }
        setShowProvinceModal(false);
    };

    const handleDistrictSelect = (district) => {
        if (currentType === "residence") {
            setResidenceDistrict(district);
        } else {
            setActivityDistrict(district);
        }
        setShowDistrictModal(false);
    };

    const openProvinceModal = (type) => {
        setCurrentType(type);
        setShowProvinceModal(true);
    };

    const openDistrictModal = (type) => {
        setCurrentType(type);
        setShowDistrictModal(true);
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        const profileData = {
            ...previousData,
            address: {
                city: residenceProvince,
                district: residenceDistrict
            },
            activeAddress: {
                city: activityProvince,
                district: activityDistrict
            }
        };
        console.log('LocationSelectScreen - Sending data:', profileData);
        navigation.navigate('InfoInputScreen', profileData);
    };

    const isNextButtonActive = residenceProvince && residenceDistrict &&
        activityProvince && activityDistrict;

    return (
        <Wrapper>
            <Background />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content>
                    <Header>
                        <BackButton onPress={handleBack}>
                            <BackIcon width={width * 0.06} height={width * 0.06} />
                        </BackButton>
                        <HeaderTitle>프로필 입력</HeaderTitle>
                    </Header>

                    <StepIndicator>
                        <StepText>3</StepText>
                        <StepDivider>/</StepDivider>
                        <StepTotal>9</StepTotal>
                    </StepIndicator>

                    <MainTitle>
                        회원님의{"\n"}
                        활동 지역을 선택해주세요
                    </MainTitle>

                    <Section>
                        <SectionLabel>거주지</SectionLabel>
                        <PickerRow>
                            <SelectButton onPress={() => openProvinceModal("residence")}>
                                <SelectButtonText hasValue={!!residenceProvince}>
                                    {residenceProvince || "시/도"}
                                </SelectButtonText>
                                <ArrowText>▼</ArrowText>
                            </SelectButton>

                            <SelectButton
                                onPress={() => openDistrictModal("residence")}
                                disabled={!residenceProvince}
                            >
                                <SelectButtonText hasValue={!!residenceDistrict}>
                                    {residenceDistrict || "시/군/구"}
                                </SelectButtonText>
                                <ArrowText>▼</ArrowText>
                            </SelectButton>
                        </PickerRow>
                    </Section>

                    <Section>
                        <SectionLabel>활동지역</SectionLabel>
                        <SectionDescription>
                            직장이나 학교의 위치, 혹은 거주지와 같아도 상관없어요!
                        </SectionDescription>
                        <PickerRow>
                            <SelectButton onPress={() => openProvinceModal("activity")}>
                                <SelectButtonText hasValue={!!activityProvince}>
                                    {activityProvince || "시/도"}
                                </SelectButtonText>
                                <ArrowText>▼</ArrowText>
                            </SelectButton>

                            <SelectButton
                                onPress={() => openDistrictModal("activity")}
                                disabled={!activityProvince}
                            >
                                <SelectButtonText hasValue={!!activityDistrict}>
                                    {activityDistrict || "시/군/구"}
                                </SelectButtonText>
                                <ArrowText>▼</ArrowText>
                            </SelectButton>
                        </PickerRow>
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
            </ScrollView>

            {/* 시/도 선택 모달 */}
            <Modal
                visible={showProvinceModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowProvinceModal(false)}
            >
                <ModalOverlay onPress={() => setShowProvinceModal(false)}>
                    <ModalContent onPress={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>시/도 선택</ModalTitle>
                            <CloseButton onPress={() => setShowProvinceModal(false)}>
                                <CloseText>✕</CloseText>
                            </CloseButton>
                        </ModalHeader>
                        <ModalScrollView>
                            {PROVINCES.map((province) => (
                                <OptionButton
                                    key={province}
                                    onPress={() => handleProvinceSelect(province)}
                                >
                                    <OptionText>{province}</OptionText>
                                </OptionButton>
                            ))}
                        </ModalScrollView>
                    </ModalContent>
                </ModalOverlay>
            </Modal>

            {/* 시/군/구 선택 모달 */}
            <Modal
                visible={showDistrictModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDistrictModal(false)}
            >
                <ModalOverlay onPress={() => setShowDistrictModal(false)}>
                    <ModalContent onPress={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>시/군/구 선택</ModalTitle>
                            <CloseButton onPress={() => setShowDistrictModal(false)}>
                                <CloseText>✕</CloseText>
                            </CloseButton>
                        </ModalHeader>
                        <ModalScrollView>
                            {currentType === "residence" && residenceProvince &&
                                REGION_DATA[residenceProvince]?.map((district) => (
                                    <OptionButton
                                        key={district}
                                        onPress={() => handleDistrictSelect(district)}
                                    >
                                        <OptionText>{district}</OptionText>
                                    </OptionButton>
                                ))
                            }
                            {currentType === "activity" && activityProvince &&
                                REGION_DATA[activityProvince]?.map((district) => (
                                    <OptionButton
                                        key={district}
                                        onPress={() => handleDistrictSelect(district)}
                                    >
                                        <OptionText>{district}</OptionText>
                                    </OptionButton>
                                ))
                            }
                        </ModalScrollView>
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
    padding: ${width * 0.05}px;
    padding-top: ${width * 0.15}px;
    padding-bottom: ${width * 0.1}px;
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

const SectionDescription = styled(PtdText)`
    font-size: ${width * 0.032}px;
    color: #999999;
    margin-bottom: ${width * 0.03}px;
    line-height: ${width * 0.045}px;
`;

const PickerRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
`;

const SelectButton = styled.TouchableOpacity`
    flex: 1;
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${width * 0.13}px;
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

const SelectButtonText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${props => props.hasValue ? colors.black : '#CCCCCC'};
`;

const ArrowText = styled(PtdText)`
    font-size: ${width * 0.025}px;
    color: #999999;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
    margin-top: ${width * 0.08}px;
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

const ModalOverlay = styled.Pressable`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;

const ModalContent = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    max-height: ${width * 1.2}px;
`;

const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${width * 0.05}px;
    border-bottom-width: 1px;
    border-bottom-color: #E0E0E0;
`;

const ModalTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
`;

const CloseButton = styled.TouchableOpacity`
    padding: ${width * 0.02}px;
`;

const CloseText = styled(PtdText)`
    font-size: ${width * 0.05}px;
    color: #999999;
`;

const ModalScrollView = styled.ScrollView`
    max-height: ${width * 1}px;
`;

const OptionButton = styled.TouchableOpacity`
    padding: ${width * 0.045}px ${width * 0.05}px;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
`;

const OptionText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
`;

export default LocationSelectScreen;
