import React from "react";
import styled from "styled-components/native";
import { Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width, height } = Dimensions.get('window');

const SurveyIntroScreen = () => {
    const navigation = useNavigation();

    const handleStartSurvey = () => {
        // 설문 화면으로 이동
        navigation.navigate('');
    };

    const handleSkipSurvey = () => {
        // 첫 화면(LoginScreen)으로 돌아가기
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    return (
        <Wrapper>
            <Background />
            <Content>
                <TextContainer>
                    <MainTitle>만나서 반가워요!</MainTitle>
                    <SubTitle>
                        상대방과 만나기 위해서{"\n"}
                        약 5분 걸리는 구조화 설문을 진행해주세요!
                    </SubTitle>
                </TextContainer>

                <IllustrationContainer>
                    <SurveyImage
                        source={require('../../assets/imgs/join_success.png')}
                        resizeMode="contain"
                        onError={() => console.log('이미지 로드 실패 - join_success.png 파일을 확인해주세요')}
                    />
                </IllustrationContainer>

                <ButtonContainer>
                    <CustomButton
                        title="지금 설문 하기" 
                        onPress={handleStartSurvey}
                        isActive={true}
                        style={{ width: "100%", height: width * 0.13, borderRadius: 12}}
                    />
                    <SkipButton onPress={handleSkipSurvey}>
                        <SkipButtonText>나중에하기</SkipButtonText>
                    </SkipButton>
                </ButtonContainer>
            </Content>
        </Wrapper>
    );
};

export default SurveyIntroScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${width * 0.08}px;
`;

const TextContainer = styled.View`
    margin-top: ${height * 0.1}px;
    align-items: flex-start;
`;

const MainTitle = styled(PtdBText)`
    font-size: ${width * 0.065}px;
    color: ${colors.black};
    font-weight: bold;
    margin-bottom: ${width * 0.05}px;
`;

const SubTitle = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #666666;
    line-height: ${width * 0.055}px;
`;

const IllustrationContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: ${width * 0.1}px 0;
`;

const SurveyImage = styled.Image`
    width: ${width * 0.65}px;
    height: ${width * 0.65}px;
`;

const ButtonContainer = styled.View`
    margin-bottom: ${height * 0.05}px;
`;

const SkipButton = styled.TouchableOpacity`
    height: ${width * 0.13}px;
    justify-content: center;
    align-items: center;
`;

const SkipButtonText = styled(PtdText)`
    color: #999999;
    font-size: ${width * 0.04}px;
`;