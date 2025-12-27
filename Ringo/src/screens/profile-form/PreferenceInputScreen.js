import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";


const { width } = Dimensions.get('window');

const PreferenceInputScreen = () => {
    const navigation = useNavigation();
    const [drinking, setDrinking] = useState('');
    const [smoking, setSmoking] = useState('');
    const [religion, setReligion] = useState('');

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        console.log('Drinking:', drinking);
        console.log('Smoking:', smoking);
        console.log('Religion:', religion);
        navigation.navigate('IntroductionScreen');
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

    const isNextButtonActive = drinking !== '' && smoking !== '' && religion !== '';

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={5} totalSteps={9}/>

                <MainTitle>
                    회원님의{"\n"}
                    정보를 입력해주세요
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
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const OptionButton = styled.TouchableOpacity`
    width: 48%;
    height: ${width * 0.13}px;
    margin-bottom: ${width * 0.03}px;
    background-color: ${({ selected }) =>
      selected ? '#E8F5E9' : '#F8F8F8'};
    border-radius: 8px;
    justify-content: center;
    padding-left: ${width * 0.04}px;
`;

const OptionText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: ${props => props.selected ? '#14C871' : '#666666'};
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;

export default PreferenceInputScreen;
