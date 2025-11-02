import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const feedExampleImage = require('../../assets/imgs/feed_example.png');

const { width } = Dimensions.get('window');

const FeedPhotoUploadScreen = () => {
    const navigation = useNavigation();
    const [feedImages, setFeedImages] = useState([]);
    const [feedDescriptions, setFeedDescriptions] = useState({});

    const handleBack = () => {
        navigation.goBack();
    };

    const handleImagePicker = () => {
        const remainingSlots = 9 - feedImages.length;

        if (remainingSlots === 0) {
            Alert.alert('알림', '최대 9개까지만 선택할 수 있습니다.');
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: remainingSlots,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
            } else if (response.assets && response.assets.length > 0) {
                const newImages = response.assets.map(asset => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || 'feed.jpg',
                }));

                const totalImages = feedImages.length + newImages.length;
                if (totalImages > 9) {
                    Alert.alert('알림', '최대 9개까지만 선택할 수 있습니다.');
                    setFeedImages([...feedImages, ...newImages.slice(0, 9 - feedImages.length)]);
                } else {
                    setFeedImages([...feedImages, ...newImages]);
                }
            }
        });
    };

    const handleRemoveImage = (indexToRemove) => {
        setFeedImages(feedImages.filter((_, index) => index !== indexToRemove));
        const newDescriptions = { ...feedDescriptions };
        delete newDescriptions[indexToRemove];
        setFeedDescriptions(newDescriptions);
    };

    const handleImagePress = (imageUri, index) => {
        navigation.navigate('FeedDescriptionScreen', {
            imageUri: imageUri,
            imageIndex: index,
            onSave: (idx, description) => {
                setFeedDescriptions(prev => ({
                    ...prev,
                    [idx]: description
                }));
            }
        });
    };

    const handleNext = () => {
        if (feedImages.length === 0) {
            Alert.alert('알림', '최소 1개 이상의 피드 사진을 선택해주세요.');
            return;
        }
        console.log('Feed Images:', feedImages);
        console.log('Feed Descriptions:', feedDescriptions);
        // navigation.navigate('NextScreen');
    };

    const handleSkip = () => {
        // navigation.navigate('NextScreen');
    };

    const isNextButtonActive = feedImages.length > 0;

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
                    <StepText>9</StepText>
                    <StepDivider>/</StepDivider>
                    <StepTotal>9</StepTotal>
                </StepIndicator>

                <MainTitle>
                    회원님의{"\n"}
                    피드를 꾸며주세요
                </MainTitle>

                <InfoSection>
                    <InfoIcon>💡</InfoIcon>
                    <InfoTextContainer>
                        <InfoTitle>확인해주세요</InfoTitle>
                        <InfoDescription>
                            회원님을 표현할 수 있다면 어떤 사진이든 OK!{"\n"}
                            최대 9장까지, 올려주신 사진은 심사를 거친 후에{"\n"}
                            프로필에 등록돼요
                        </InfoDescription>
                    </InfoTextContainer>
                </InfoSection>

                {feedImages.length === 0 ? (
                    <ExampleImageContainer>
                        <ExampleImage source={feedExampleImage} />
                    </ExampleImageContainer>
                ) : (
                    <FeedGridContainer>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <FeedGrid>
                                {feedImages.map((image, index) => (
                                    <FeedImageWrapper
                                        key={index}
                                        onPress={() => handleImagePress(image.uri, index)}
                                    >
                                        <FeedImage source={{ uri: image.uri }} />
                                        <RemoveButton onPress={() => handleRemoveImage(index)}>
                                            <RemoveButtonText>✕</RemoveButtonText>
                                        </RemoveButton>
                                    </FeedImageWrapper>
                                ))}
                            </FeedGrid>
                        </ScrollView>
                    </FeedGridContainer>
                )}

                <UploadButton onPress={handleImagePicker}>
                    <UploadButtonText>사진 업로드</UploadButtonText>
                </UploadButton>

                {feedImages.length > 0 ? (
                    <NextButton onPress={handleNext} isActive={true}>
                        <NextButtonText isActive={true}>등록하기</NextButtonText>
                    </NextButton>
                ) : (
                    <SkipButton onPress={handleSkip}>
                        <SkipButtonText>다음에 하기</SkipButtonText>
                    </SkipButton>
                )}
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

const InfoSection = styled.View`
    flex-direction: row;
    background-color: #FFF9E6;
    border-radius: 12px;
    padding: ${width * 0.03}px;
    margin-bottom: ${width * 0.04}px;
`;

const InfoIcon = styled.Text`
    font-size: ${width * 0.05}px;
    margin-right: ${width * 0.02}px;
`;

const InfoTextContainer = styled.View`
    flex: 1;
`;

const InfoTitle = styled(PtdBText)`
    font-size: ${width * 0.035}px;
    color: ${colors.black};
    margin-bottom: ${width * 0.015}px;
    font-weight: bold;
`;

const InfoDescription = styled(PtdText)`
    font-size: ${width * 0.028}px;
    color: #666666;
    line-height: ${width * 0.042}px;
`;

const ExampleImageContainer = styled.View`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: ${width * 0.03}px;
`;

const ExampleImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const FeedGridContainer = styled.View`
    flex: 1;
    margin-bottom: ${width * 0.03}px;
`;

const FeedGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${width * 0.02}px;
`;

const FeedImageWrapper = styled.TouchableOpacity`
    width: ${(width - width * 0.1 - width * 0.04) / 3}px;
    height: ${(width - width * 0.1 - width * 0.04) / 3}px;
    position: relative;
`;

const FeedImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

const RemoveButton = styled.TouchableOpacity`
    position: absolute;
    top: ${width * 0.01}px;
    right: ${width * 0.01}px;
    width: ${width * 0.05}px;
    height: ${width * 0.05}px;
    border-radius: ${width * 0.025}px;
    background-color: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
`;

const RemoveButtonText = styled(PtdText)`
    color: #FFFFFF;
    font-size: ${width * 0.03}px;
`;

const UploadButton = styled.TouchableOpacity`
    width: 100%;
    height: ${width * 0.13}px;
    background-color: ${colors.primary || '#14C871'};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    margin-top: ${width * 0.02}px;
`;

const UploadButtonText = styled(PtdBText)`
    color: #FFFFFF;
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

const NextButton = styled.TouchableOpacity`
    width: 100%;
    height: ${width * 0.13}px;
    background-color: ${props => props.isActive ? colors.primary || '#14C871' : '#E0E0E0'};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    margin-top: ${width * 0.02}px;
`;

const NextButtonText = styled(PtdBText)`
    color: ${props => props.isActive ? '#FFFFFF' : '#999999'};
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

const SkipButton = styled.TouchableOpacity`
    width: 100%;
    height: ${width * 0.13}px;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    margin-top: ${width * 0.02}px;
`;

const SkipButtonText = styled(PtdText)`
    color: #999999;
    font-size: ${width * 0.04}px;
    text-decoration: underline;
`;

export default FeedPhotoUploadScreen;
