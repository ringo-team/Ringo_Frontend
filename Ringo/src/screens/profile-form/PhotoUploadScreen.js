import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import BackIcon from "../../assets/imgs/icons/back.svg";

const profileExampleImage = require('../../assets/imgs/profile_example.png');

const { width } = Dimensions.get('window');

const PhotoUploadScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const profileData = route.params || {};
    
    console.log('PhotoUploadScreen - 받은 profileData:', profileData);
    
    const [profileImage, setProfileImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleImagePicker = () => {
        Alert.alert(
            '프로필 사진 선택',
            '사진을 선택하는 방법을 선택해주세요',
            [
                {
                    text: '취소',
                    style: 'cancel'
                },
                {
                    text: '갤러리에서 선택',
                    onPress: () => openImageLibrary()
                },
                {
                    text: '카메라로 촬영',
                    onPress: () => openCamera()
                }
            ]
        );
    };

    const openImageLibrary = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setProfileImage({
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.fileName || 'profile.jpg',
                });
            }
        });
    };

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                Alert.alert('오류', '카메라를 실행하는 중 오류가 발생했습니다.');
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setProfileImage({
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.fileName || 'profile.jpg',
                });
            }
        });
    };

    // 프로필 사진 서버 업로드
    const uploadProfileImage = async () => {
        if (!profileImage) {
            Alert.alert('알림', '프로필 사진을 선택해주세요.');
            return;
        }

        setIsUploading(true);
        
        try {
            const userId = profileData.userId || profileData.registeredUserId;
            
            if (!userId) {
                Alert.alert('오류', '사용자 ID가 없습니다.');
                return;
            }

            const formData = new FormData();
            
            // userId 추가 (숫자 타입)
            formData.append('userId', parseInt(userId));
            
            // React Native에서 파일 업로드 시 올바른 형식
            formData.append('image', {
                uri: profileImage.uri,
                type: profileImage.type || 'image/jpeg',
                name: profileImage.name || 'profile.jpg'
            });

            console.log('프로필 사진 업로드 시작:', {
                userId: parseInt(userId),
                image: {
                    uri: profileImage.uri,
                    type: profileImage.type || 'image/jpeg',
                    name: profileImage.name || 'profile.jpg'
                }
            });

            const response = await fetch('http://localhost:8080/profiles', {
                method: 'POST',
                // React Native에서 multipart/form-data 사용 시 Content-Type 헤더 제거
                body: formData
            });

            console.log('응답 상태:', response.status);
            console.log('응답 헤더:', response.headers);

            if (response.status === 201) {
                const responseData = await response.text();
                console.log('프로필 사진 업로드 성공:', responseData);
                
                Alert.alert(
                    '업로드 완료',
                    '프로필 사진이 성공적으로 업로드되었습니다.',
                    [{
                        text: '확인',
                        onPress: () => navigation.navigate('FeedPhotoUploadScreen', profileData)
                    }]
                );
            } else {
                const errorData = await response.text();
                console.log('프로필 사진 업로드 실패:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
                Alert.alert(
                    '업로드 실패', 
                    `상태코드: ${response.status}\n${errorData || '프로필 사진 업로드에 실패했습니다.'}`
                );
            }
        } catch (error) {
            console.error('프로필 사진 업로드 오류:', error);
            Alert.alert('오류', '네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleNext = () => {
        uploadProfileImage();
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

                <StepIndicator>
                    <StepText>8</StepText>
                    <StepDivider>/</StepDivider>
                    <StepTotal>9</StepTotal>
                </StepIndicator>

                <MainTitle>
                    회원님의{"\n"}
                    프로필 사진을 업로드 해주세요
                </MainTitle>

                <InfoSection>
                    <InfoIcon>💡</InfoIcon>
                    <InfoTextContainer>
                        <InfoTitle>확인해주세요</InfoTitle>
                        <InfoDescription>
                            반드시 본인의 얼굴이 드러나야 해요{"\n"}
                            과도한 보정 사진은 지양해주세요{"\n"}
                            흐릿주신 사진은 심사를 거친 후에 프로필에 등록돼요{"\n"}
                            프로필 사진은 1장만 가능하며, 이후 수정 가능해요
                        </InfoDescription>
                    </InfoTextContainer>
                </InfoSection>

                <PhotoPreviewContainer>
                    {profileImage ? (
                        <ProfileImage source={{ uri: profileImage.uri }} />
                    ) : (
                        <ExampleImage source={profileExampleImage} />
                    )}
                </PhotoPreviewContainer>

                {!profileImage ? (
                    <UploadButton onPress={handleImagePicker}>
                        <UploadButtonText>프로필 사진 업로드</UploadButtonText>
                    </UploadButton>
                ) : (
                    <ButtonRowFixed>
                        <ReUploadButton onPress={handleImagePicker}>
                            <ReUploadButtonText>재등록</ReUploadButtonText>
                        </ReUploadButton>

                        <SubmitButton 
                            onPress={handleNext}
                            disabled={isUploading}
                            isUploading={isUploading}
                        >
                            <SubmitButtonText isUploading={isUploading}>
                                {isUploading ? '업로드 중...' : '등록하기'}
                            </SubmitButtonText>
                        </SubmitButton>
                    </ButtonRowFixed>
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

const PhotoPreviewContainer = styled.View`
    width: 100%;
    aspect-ratio: 1;
    background-color: #F0F0F0;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${width * 0.03}px;
    overflow: hidden;
`;

const ProfileImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const ExampleImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const PlaceholderText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #CCCCCC;
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

const ButtonRowFixed = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
    margin-top: ${width * 0.02}px;
`;

const ReUploadButton = styled.TouchableOpacity`
    flex: 1;
    height: ${width * 0.13}px;
    background-color: #E0E0E0;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
`;

const ReUploadButtonText = styled(PtdBText)`
    color: #FFFFFF;
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

const SubmitButton = styled.TouchableOpacity`
    flex: 3;
    height: ${width * 0.13}px;
    background-color: ${props => props.isUploading ? '#B0B0B0' : (colors.primary || '#14C871')};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.7 : 1};
`;

const SubmitButtonText = styled(PtdBText)`
    color: ${props => props.isUploading ? '#FFFFFF' : '#FFFFFF'};
    font-size: ${width * 0.04}px;
    font-weight: bold;
`;

export default PhotoUploadScreen;
