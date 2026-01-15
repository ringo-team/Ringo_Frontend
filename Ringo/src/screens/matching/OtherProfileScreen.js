import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar,
    Modal,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import colors from '../../constants/colors';
import config from '../../constants/config';

// 기본 이미지
const DefaultProfileImage = require('../../assets/imgs/boy_profile_image.png');

// 아이콘들
const ProfileReportIcon = require('../../assets/imgs/icons/mypage/profile_report.png');
const ProfileHeartBubbleIcon = require('../../assets/imgs/icons/mypage/profile_heart_bubble.png');

const { width, height } = Dimensions.get('window');

// 변환 함수들
const getDrinkingLabel = (value) => {
    const labels = {
        'ALWAYS': '주 5-7회',
        'OFTEN': '주 3-4회',
        'RARELY': '주 1-2회',
        'ON_NEED': '필요할 때만',
        'NEVER': '절대 마시지 않음'
    };
    return labels[value] || value;
};

const getSmokingLabel = (value) => {
    const labels = {
        'SMOKING': '흡연',
        'ELECTRONIC': '전자담배',
        'NO_SMOKING': '금연 중',
        'NEVER': '비흡연'
    };
    return labels[value] || value;
};

const getReligionLabel = (value) => {
    const labels = {
        'CHRISTIANITY': '기독교',
        'BUDDHISM': '불교',
        'CATHOLIC': '천주교',
        'ATHEIST': '무교'
    };
    return labels[value] || value;
};

const OtherProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId, profileData: passedProfileData } = route.params || {};

    const [activeTab, setActiveTab] = useState('사진');
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(passedProfileData || null);
    const [feedImages, setFeedImages] = useState([]);
    const [isConnectModalVisible, setIsConnectModalVisible] = useState(false);

    // 데이터 조회
    const fetchData = async () => {
        if (!userId) {
            console.log('userId가 없습니다.');
            setIsLoading(false);
            return;
        }

        try {
            const credentials = await Keychain.getGenericPassword();
            if (!credentials) {
                console.log('저장된 토큰이 없습니다.');
                setIsLoading(false);
                return;
            }

            const tokenData = JSON.parse(credentials.password);
            const { accessToken } = tokenData;

            // 프로필 정보가 전달되지 않은 경우 조회
            if (!passedProfileData) {
                const profileResponse = await fetch(config.USER.GET_OTHER_PROFILE(userId), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const profileText = await profileResponse.text();
                if (profileText) {
                    const profileResult = JSON.parse(profileText);
                    console.log('타인 프로필 정보:', profileResult);
                    if (profileResult.result === '0000') {
                        setProfileData(profileResult);
                    }
                }
            }

            // 피드 사진 조회
            const feedsResponse = await fetch(config.USER.GET_FEEDS(userId), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const feedsText = await feedsResponse.text();
            if (feedsText) {
                const feedsResult = JSON.parse(feedsText);
                console.log('피드 사진:', feedsResult);
                if (feedsResult?.result === '0000' && feedsResult?.list) {
                    setFeedImages(feedsResult.list);
                } else if (feedsResult && Array.isArray(feedsResult)) {
                    setFeedImages(feedsResult);
                }
            }

        } catch (error) {
            console.error('데이터 조회 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const allImages = feedImages;

    const openImageModal = (index) => {
        if (allImages.length > 0) {
            setSelectedImageIndex(index % allImages.length);
            setIsImageModalVisible(true);
        }
    };

    const closeImageModal = () => {
        setIsImageModalVisible(false);
        setSelectedImageIndex(-1);
    };

    const goToPreviousImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const renderPhotosContent = () => {
        if (allImages.length === 0) {
            return (
                <PhotosContainer>
                    <EmptyText>등록된 사진이 없습니다.</EmptyText>
                </PhotosContainer>
            );
        }

        return (
            <PhotosContainer>
                <PhotoGrid>
                    {allImages.map((image, index) => (
                        <PhotoGridItem key={index}>
                            <TouchableOpacity onPress={() => openImageModal(index)}>
                                <GridPhoto source={{ uri: image.imageUrl }} />
                            </TouchableOpacity>
                        </PhotoGridItem>
                    ))}
                </PhotoGrid>
            </PhotosContainer>
        );
    };

    const renderInfoContent = () => (
        <InfoContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <InfoSection>
                    <InfoTitle>기본 정보</InfoTitle>
                    <InfoRow>
                        <InfoLabel>키</InfoLabel>
                        <InfoValue>{profileData?.height ? `${profileData.height}cm` : '-'}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>직업</InfoLabel>
                        <InfoValue>{profileData?.job || '-'}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>음주</InfoLabel>
                        <InfoValue>{profileData?.isDrinking ? getDrinkingLabel(profileData.isDrinking) : '-'}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>흡연</InfoLabel>
                        <InfoValue>{profileData?.isSmoking ? getSmokingLabel(profileData.isSmoking) : '-'}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                        <InfoLabel>종교</InfoLabel>
                        <InfoValue>{profileData?.religion ? getReligionLabel(profileData.religion) : '-'}</InfoValue>
                    </InfoRow>
                </InfoSection>

                <InfoSection>
                    <InfoTitle>자기소개</InfoTitle>
                    <InfoDescription>
                        {profileData?.biography || '등록된 자기소개가 없습니다.'}
                    </InfoDescription>
                </InfoSection>
            </ScrollView>
        </InfoContainer>
    );

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ backgroundColor: 'white', paddingBottom: height * 0.15 }}
                showsVerticalScrollIndicator={false}
            >
                <Container>

                    {/* 배경 이미지 */}
                    <BackgroundContainer>
                        {profileData?.profile ? (
                            <BackgroundImage source={{ uri: profileData.profile }} />
                        ) : (
                            <BackgroundImage source={DefaultProfileImage} />
                        )}
                    </BackgroundContainer>

                    {/* 하단 탭 영역 */}
                    <BottomSection>
                        {/* 프로필 정보 헤더 */}
                        <ProfileHeader>
                            <ProfileHeaderGradient />
                            <ProfileHeaderContent>
                                <ProfileHeaderLeft>
                                    <ProfileName>
                                        {profileData?.nickname || '닉네임'} ({profileData?.gender === 'MALE' ? '남' : profileData?.gender === 'FEMALE' ? '여' : ''})
                                    </ProfileName>
                                    <ProfileTags>
                                        {profileData?.hashtags && profileData.hashtags.length > 0
                                            ? profileData.hashtags.map(tag => `#${tag}`).join(' ')
                                            : ''}
                                    </ProfileTags>
                                </ProfileHeaderLeft>
                                <ConnectButton onPress={() => setIsConnectModalVisible(true)}>
                                    <ConnectButtonIcon source={ProfileHeartBubbleIcon} />
                                    <ConnectButtonText>연결신청</ConnectButtonText>
                                </ConnectButton>
                            </ProfileHeaderContent>
                        </ProfileHeader>

                        <TabContainer>
                            <TabButton
                                isActive={activeTab === '사진'}
                                onPress={() => setActiveTab('사진')}
                            >
                                <TabText isActive={activeTab === '사진'}>사진</TabText>
                            </TabButton>
                            <TabButton
                                isActive={activeTab === '정보'}
                                onPress={() => setActiveTab('정보')}
                            >
                                <TabText isActive={activeTab === '정보'}>정보</TabText>
                            </TabButton>
                        </TabContainer>

                        <ContentContainer>
                            {activeTab === '사진' ? renderPhotosContent() : renderInfoContent()}
                        </ContentContainer>
                    </BottomSection>

                </Container>
            </ScrollView>

            {/* 고정 헤더 */}
            <FixedHeader>
                <BackButton onPress={() => navigation.goBack()}>
                    <BackButtonText>‹</BackButtonText>
                </BackButton>
                <ReportButton>
                    <ReportIcon source={ProfileReportIcon} />
                </ReportButton>
            </FixedHeader>

            {/* 이미지 확대 모달 */}
            <Modal
                visible={isImageModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeImageModal}
            >
                <ImageModalContainer>
                    <ImageModalBackground onPress={closeImageModal}>
                        <ImageModalContent>
                            <ImageContainer>
                                {allImages[selectedImageIndex] && (
                                    <ModalImage source={{ uri: allImages[selectedImageIndex].imageUrl }} />
                                )}
                                <CloseButton onPress={closeImageModal}>
                                    <CloseButtonText>×</CloseButtonText>
                                </CloseButton>
                            </ImageContainer>

                            {allImages.length > 1 && (
                                <>
                                    <NavigationButton
                                        style={{ left: 8 }}
                                        onPress={goToPreviousImage}
                                    >
                                        <NavigationButtonText>‹</NavigationButtonText>
                                    </NavigationButton>

                                    <NavigationButton
                                        style={{ right: 8 }}
                                        onPress={goToNextImage}
                                    >
                                        <NavigationButtonText>›</NavigationButtonText>
                                    </NavigationButton>
                                </>
                            )}

                            <ImageDescriptionContainer>
                                <ImageDescription>
                                    {allImages[selectedImageIndex]?.content || ''}
                                </ImageDescription>
                            </ImageDescriptionContainer>
                        </ImageModalContent>
                    </ImageModalBackground>
                </ImageModalContainer>
            </Modal>

            {/* 연결신청 모달 */}
            <Modal
                visible={isConnectModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsConnectModalVisible(false)}
            >
                <ConnectModalOverlay>
                    <ConnectModalContainer>
                        <ConnectModalTitle>연결 요청을 하시겠어요?</ConnectModalTitle>
                        <ConnectModalWarningLabel>주의</ConnectModalWarningLabel>
                        <ConnectModalWarningText>
                            연결 요청은 회원님과 상대방의 유사도가 낮으면{"\n"}이루어지지 않을 수도 있어요
                        </ConnectModalWarningText>
                        <ConnectModalPointText>19포인트 차감</ConnectModalPointText>
                        <ConnectModalButton onPress={() => setIsConnectModalVisible(false)}>
                            <ConnectModalButtonText>연결 요청</ConnectModalButtonText>
                        </ConnectModalButton>
                        <ConnectModalCancelButton onPress={() => setIsConnectModalVisible(false)}>
                            <ConnectModalCancelText>뒤로 가기</ConnectModalCancelText>
                        </ConnectModalCancelButton>
                    </ConnectModalContainer>
                </ConnectModalOverlay>
            </Modal>
        </View>
    );
};

export default OtherProfileScreen;

// Styled Components
const Container = styled.View`
  min-height: ${height}px;
  background-color: ${colors.black};
`;

const BackgroundContainer = styled.View`
  position: absolute;
  top: -${height * 0.06}px;
  left: 0;
  right: 0;
  height: ${height * 0.71}px;
  justify-content: flex-start;
  align-items: center;
`;

const BackgroundImage = styled.Image`
  width: 100%;
  flex: 1;
  resize-mode: contain;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

const BackButtonText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const ReportButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

const ReportIcon = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: white;
`;

const ProfileName = styled.Text`
  color: white;
  font-size: ${width * 0.05}px;
  font-weight: bold;
  margin-bottom: ${width * 0.01}px;
`;

const ProfileTags = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${width * 0.032}px;
  line-height: ${width * 0.04}px;
`;

const ConnectButton = styled.TouchableOpacity`
  background-color: ${colors.black};
  border-radius: ${width * 0.05}px;
  padding: ${width * 0.025}px ${width * 0.04}px;
  flex-direction: row;
  align-items: center;
`;

const ConnectButtonIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const ConnectButtonText = styled.Text`
  color: white;
  font-size: ${width * 0.032}px;
  font-weight: 600;
`;

const BottomSection = styled.View`
  position: absolute;
  top: ${height * 0.48}px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ProfileHeader = styled.View`
  position: relative;
  background-color: transparent;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
`;

const ProfileHeaderGradient = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0)'],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ProfileHeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: ${width * 0.04}px;
  z-index: 1;
`;

const ProfileHeaderLeft = styled.View`
  flex: 1;
  margin-right: ${width * 0.03}px;
`;

const PhotoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${width * 0.02}px;
  justify-content: space-between;
`;

const PhotoGridItem = styled.View`
  width: ${(width - width * 0.06) / 3}px;
  height: ${((width - width * 0.06) / 3) * 1.25}px;
  margin-bottom: ${width * 0.01}px;
`;

const GridPhoto = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const TabContainer = styled.View`
  flex-direction: row;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${width * 0.04}px;
  align-items: center;
  border-bottom-width: ${props => props.isActive ? '2px' : '0px'};
  border-bottom-color: ${colors.black};
`;

const TabText = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? colors.black : '#666'};
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const PhotosContainer = styled.View`
  background-color: white;
  min-height: ${height * 0.8}px;
  padding-bottom: ${width * 0.2}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: ${width * 0.05}px;
`;

const InfoSection = styled.View`
  margin-bottom: ${width * 0.06}px;
`;

const InfoTitle = styled.Text`
  font-size: ${width * 0.045}px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: ${width * 0.03}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${width * 0.02}px;
`;

const InfoLabel = styled.Text`
  font-size: ${width * 0.04}px;
  color: #666;
`;

const InfoValue = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 600;
  color: ${colors.black};
`;

const InfoDescription = styled.Text`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  line-height: ${width * 0.055}px;
`;

const FixedHeader = styled.View`
  position: absolute;
  top: ${height * 0.06}px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${width * 0.05}px;
  z-index: 1000;
`;

// 이미지 모달 관련 스타일
const ImageModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ImageModalBackground = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ImageModalContent = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${width * 0.03}px;
  right: ${width * 0.03}px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const ImageContainer = styled.View`
  position: relative;
  width: ${width - 80}px;
  height: ${(width - 80) * 1.2}px;
  justify-content: center;
  align-items: center;
`;

const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  z-index: 10;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const NavigationButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-top-left-radius: ${width * 0.03}px;
  border-top-right-radius: ${width * 0.03}px;
`;

const ImageDescriptionContainer = styled.View`
  background-color: white;
  padding: ${width * 0.05}px;
  border-bottom-left-radius: ${width * 0.03}px;
  border-bottom-right-radius: ${width * 0.03}px;
  min-height: ${width * 0.1}px;
  width: ${width - 80}px;
`;

const ImageDescription = styled.Text`
  font-size: ${width * 0.035}px;
  color: #333;
  text-align: left;
  line-height: ${width * 0.05}px;
`;

const EmptyText = styled.Text`
  font-size: ${width * 0.04}px;
  color: #999;
  text-align: center;
  padding: ${width * 0.1}px;
`;

// 연결신청 모달 스타일
const ConnectModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ConnectModalContainer = styled.View`
  background-color: white;
  border-radius: 16px;
  padding: 24px 20px 20px 20px;
  align-items: center;
  width: ${width - 40}px;
  height: 290px;
  justify-content: space-between;
`;

const ConnectModalTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #333;
`;

const ConnectModalWarningLabel = styled.Text`
  font-size: 12px;
  color: #FF6B6B;
  text-decoration: underline;
`;

const ConnectModalWarningText = styled.Text`
  font-size: 13px;
  color: #FF6B6B;
  text-align: center;
  line-height: 20px;
`;

const ConnectModalPointText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const ConnectModalButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #333;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
`;

const ConnectModalButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const ConnectModalCancelButton = styled.TouchableOpacity`
  width: 100%;
  background-color: white;
  padding: 14px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
  align-items: center;
`;

const ConnectModalCancelText = styled.Text`
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;
