import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const { width } = Dimensions.get('window');

const FeedDescriptionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { imageUri, imageIndex, onSave } = route.params;

    const [description, setDescription] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

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
                <Header>
                    <BackButton onPress={handleBack}>
                        <BackIcon width={width * 0.06} height={width * 0.06} />
                    </BackButton>
                    <HeaderTitle>프로필 입력</HeaderTitle>
                </Header>

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

                <SaveButton onPress={handleSave}>
                    <SaveButtonText>완료</SaveButtonText>
                </SaveButton>
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

const SaveButton = styled.TouchableOpacity`
    width: 100%;
    height: ${width * 0.13}px;
    background-color: ${colors.primary || '#14C871'};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    margin-top: ${width * 0.02}px;
`;

const SaveButtonText = styled(PtdBText)`
    color: #FFFFFF;
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

export default FeedDescriptionScreen;
