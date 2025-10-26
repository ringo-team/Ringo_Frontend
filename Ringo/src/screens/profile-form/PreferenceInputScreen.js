import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const { width } = Dimensions.get('window');

const PreferenceInputScreen = () => {
    const navigation = useNavigation();
    const [drinking, setDrinking] = useState('');
    const [smoking, setSmoking] = useState('');
    const [religion, setReligion] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        console.log('Drinking:', drinking);
        console.log('Smoking:', smoking);
        console.log('Religion:', religion);
        // navigation.navigate('NextScreen');
    };

    const isNextButtonActive = drinking !== '' && smoking !== '' && religion !== '';

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
                    <StepText>5</StepText>
                    <StepDivider>/</StepDivider>
                    <StepTotal>9</StepTotal>
                </StepIndicator>

                <MainTitle>
                    회원님의{"\n"}
                    취향을 입력해주세요
                </MainTitle>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <Section>
                        <SectionLabel>음주</SectionLabel>
                        <OptionsGrid>
                            <OptionButton
                                selected={drinking === '주 5-7회'}
                                onPress={() => setDrinking('주 5-7회')}
                            >
                                <OptionText selected={drinking === '주 5-7회'}>
                                    주 5-7회
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={drinking === '주 3-4회'}
                                onPress={() => setDrinking('주 3-4회')}
                            >
                                <OptionText selected={drinking === '주 3-4회'}>
                                    주 3-4회
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={drinking === '주 1-2회'}
                                onPress={() => setDrinking('주 1-2회')}
                            >
                                <OptionText selected={drinking === '주 1-2회'}>
                                    주 1-2회
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={drinking === '필요할 때만'}
                                onPress={() => setDrinking('필요할 때만')}
                            >
                                <OptionText selected={drinking === '필요할 때만'}>
                                    필요할 때만
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={drinking === '절대 마시지 않음'}
                                onPress={() => setDrinking('절대 마시지 않음')}
                            >
                                <OptionText selected={drinking === '절대 마시지 않음'}>
                                    절대 마시지 않음
                                </OptionText>
                            </OptionButton>
                        </OptionsGrid>
                    </Section>

                    <Section>
                        <SectionLabel>흡연</SectionLabel>
                        <OptionsGrid>
                            <OptionButton
                                selected={smoking === '흡연'}
                                onPress={() => setSmoking('흡연')}
                            >
                                <OptionText selected={smoking === '흡연'}>
                                    흡연
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={smoking === '비흡연'}
                                onPress={() => setSmoking('비흡연')}
                            >
                                <OptionText selected={smoking === '비흡연'}>
                                    비흡연
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={smoking === '전자담배'}
                                onPress={() => setSmoking('전자담배')}
                            >
                                <OptionText selected={smoking === '전자담배'}>
                                    전자담배
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={smoking === '금연 중'}
                                onPress={() => setSmoking('금연 중')}
                            >
                                <OptionText selected={smoking === '금연 중'}>
                                    금연 중
                                </OptionText>
                            </OptionButton>
                        </OptionsGrid>
                    </Section>

                    <Section>
                        <SectionLabel>종교</SectionLabel>
                        <OptionsGrid>
                            <OptionButton
                                selected={religion === '기독교'}
                                onPress={() => setReligion('기독교')}
                            >
                                <OptionText selected={religion === '기독교'}>
                                    기독교
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={religion === '불교'}
                                onPress={() => setReligion('불교')}
                            >
                                <OptionText selected={religion === '불교'}>
                                    불교
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={religion === '천주교'}
                                onPress={() => setReligion('천주교')}
                            >
                                <OptionText selected={religion === '천주교'}>
                                    천주교
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={religion === '무교'}
                                onPress={() => setReligion('무교')}
                            >
                                <OptionText selected={religion === '무교'}>
                                    무교
                                </OptionText>
                            </OptionButton>

                            <OptionButton
                                selected={religion === '기타'}
                                onPress={() => setReligion('기타')}
                            >
                                <OptionText selected={religion === '기타'}>
                                    기타
                                </OptionText>
                            </OptionButton>
                        </OptionsGrid>
                    </Section>
                </ScrollView>

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
    margin-bottom: ${width * 0.06}px;
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

const OptionsGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${width * 0.03}px;
`;

const OptionButton = styled.TouchableOpacity`
    width: ${(width - width * 0.1 - width * 0.03) / 2}px;
    height: ${width * 0.13}px;
    background-color: ${props => props.selected ? '#E8F5E9' : '#F8F8F8'};
    border-radius: 8px;
    justify-content: center;
    align-items: flex-start;
    padding-left: ${width * 0.04}px;
`;

const OptionText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: ${props => props.selected ? '#14C871' : '#666666'};
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
    margin-top: ${width * 0.02}px;
    padding-bottom: ${width * 0.05}px;
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

export default PreferenceInputScreen;
