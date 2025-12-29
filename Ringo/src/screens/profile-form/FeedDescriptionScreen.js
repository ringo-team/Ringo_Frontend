import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const FeedDescriptionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { imageUri, imageIndex, onSave } = route.params;

    const [description, setDescription] = useState('');

    const handleSave = () => {
        if (onSave) {
            onSave(imageIndex, description);
        }
        navigation.goBack();
    };

    const handleTextChange = (text) => {
        if (text.length <= 100) {
            setDescription(text);
        }
    };

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <MainTitle>
                    회원님의 순간을{"\n"}
                    공유해주세요
                </MainTitle>

                <SubTitle>상대방이 회원님을 알아가는데 도움이 될 수 있어요</SubTitle>

                <PhotoContainer>
                    <FeedImage source={{ uri: imageUri }} />
                </PhotoContainer>

                <SectionLabel>소개글</SectionLabel>
                <CharacterCount>최대 100자까지 입력 가능</CharacterCount>

                <DescriptionInput
                    value={description}
                    onChangeText={handleTextChange}
                    placeholder="블타는맛고"
                    placeholderTextColor="#CCCCCC"
                    multiline
                    textAlignVertical="top"
                    maxLength={100}
                />
                <ButtonContainer>
                    <CustomButton
                        title="완료"
                        isActive={true}
                        onPress={handleSave}
                        style={{width:"100%", height: width * 0.13, borderRadius: 12}}
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

const MainTitle = styled(PtdBText)`
    font-size: ${width * 0.065}px;
    color: ${colors.black};
    line-height: ${width * 0.09}px;
    margin-bottom: ${width * 0.03}px;
    font-weight: bold;
`;

const SubTitle = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: #999999;
    margin-bottom: ${width * 0.03}px;
`;

const PhotoContainer = styled.View`
    width: 80%;
    aspect-ratio: 1;
    background-color: #F0F0F0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: ${width * 0.03}px;
    align-self: center;
`;

const FeedImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const SectionLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.02}px;
`;

const CharacterCount = styled(PtdText)`
    font-size: ${width * 0.032}px;
    color: #999999;
    margin-bottom: ${width * 0.02}px;
`;

const DescriptionInput = styled.TextInput`
    background-color: #F8F8F8;
    border-radius: 12px;
    padding: ${width * 0.04}px;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    min-height: ${width * 0.25}px;
    margin-bottom: ${width * 0.03}px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;

export default FeedDescriptionScreen;
