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
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import colors from '../../constants/colors';
import config from '../../constants/config';

// 기본 이미지
const GirlProfileImage = require('../../assets/imgs/girl_profile_image.png');

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

const ProfilePreviewScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('사진');
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [profileImages, setProfileImages] = useState([]);
  const [snapImages, setSnapImages] = useState([]);

  // 데이터 조회
  const fetchData = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        console.log('저장된 토큰이 없습니다.');
        setIsLoading(false);
        return;
      }

      const tokenData = JSON.parse(credentials.password);
      const { accessToken, userId } = tokenData;

      // 프로필 정보 조회
      const profileResponse = await fetch(config.USER.GET_PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const profileResult = await profileResponse.json();
      console.log('프로필 정보:', profileResult);
      setProfileData(profileResult);

      // 프로필 사진 조회
      const profileImageResponse = await fetch(config.USER.GET_PROFILE_IMAGE(userId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const profileImageResult = await profileImageResponse.json();
      console.log('프로필 사진:', profileImageResult);
      if (profileImageResult && Array.isArray(profileImageResult)) {
        setProfileImages(profileImageResult);
      } else if (profileImageResult?.imageUrl) {
        setProfileImages([{ imageUrl: profileImageResult.imageUrl }]);
      }

      // 피드 사진 조회
      const snapsResponse = await fetch(config.USER.GET_SNAPS(userId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const snapsResult = await snapsResponse.json();
      console.log('피드 사진:', snapsResult);
      // 응답 형식: { result: "0000", list: [...] }
      if (snapsResult?.result === '0000' && snapsResult?.list) {
        setSnapImages(snapsResult.list);
      } else if (snapsResult && Array.isArray(snapsResult)) {
        setSnapImages(snapsResult);
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

  // 사진 탭에는 피드 사진만 표시
  const allImages = snapImages;

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
        contentContainerStyle={{ backgroundColor: 'white', paddingBottom: height * 0.22 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>

          {/* 배경 이미지 */}
          <BackgroundContainer>
            {profileData?.profile ? (
              <BackgroundImage source={{ uri: profileData.profile }} />
            ) : (
              <BackgroundImage source={GirlProfileImage} />
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
                <ConnectButton>
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

      {/* 고정 버튼들 */}
      <FixedHeader>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>‹</BackButtonText>
        </BackButton>
        <NotificationButton>
          <NotificationIcon source={ProfileReportIcon} />
        </NotificationButton>
      </FixedHeader>

      <FixedFloatingButtons>
        <FloatingButton style={{ backgroundColor: 'white' }}>
          <FloatingButtonText style={{ color: colors.black }}>프로필 수정하기</FloatingButtonText>
        </FloatingButton>
        <FloatingButton style={{ backgroundColor: colors.black }}>
          <FloatingButtonText style={{ color: 'white' }}>마이페이지 가기</FloatingButtonText>
        </FloatingButton>
      </FixedFloatingButtons>

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
    </View>
  );
};

export default ProfilePreviewScreen;

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

const NotificationButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

const NotificationIcon = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: white;
`;

const ProfileOverlay = styled.View`
  position: absolute;
  bottom: ${height * 0.45}px;
  left: ${width * 0.05}px;
  right: ${width * 0.05}px;
  z-index: 10;
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

const PhotoSlide = styled.View`
  width: ${width}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${width * 0.05}px;
`;

const ProfilePhoto = styled.Image`
  width: ${width * 0.8}px;
  height: ${width * 0.8}px;
  border-radius: ${width * 0.04}px;
  resize-mode: cover;
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

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${width * 0.02}px;
`;

const Tag = styled.View`
  background-color: #F0F0F0;
  border-radius: ${width * 0.04}px;
  padding: ${width * 0.02}px ${width * 0.03}px;
  margin-bottom: ${width * 0.02}px;
`;

const TagText = styled.Text`
  font-size: ${width * 0.032}px;
  color: #666;
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

const FixedFloatingButtons = styled.View`
  position: absolute;
  bottom: ${width * 0.03}px;
  right: ${width * 0.05}px;
  z-index: 1000;
`;

const FloatingButton = styled.TouchableOpacity`
  border-radius: ${width * 0.08}px;
  padding: ${width * 0.03}px ${width * 0.05}px;
  margin-bottom: ${width * 0.03}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const FloatingButtonText = styled.Text`
  font-size: ${width * 0.035}px;
  font-weight: 600;
`;

// 이미지 모달 관련 스타일 컴포넌트들
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