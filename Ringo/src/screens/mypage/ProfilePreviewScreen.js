import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';

// 임시 이미지들 - 실제 구현시 사용자 이미지로 교체
const GirlProfileImage = require('../../assets/imgs/girl_profile_image.png');
const SampleImage1 = require('../../assets/imgs/girl_profile_image.png');
const SampleImage2 = require('../../assets/imgs/girl_profile_image.png');

// 아이콘들
const ProfileReportIcon = require('../../assets/imgs/icons/mypage/profile_report.png');
const ProfileHeartBubbleIcon = require('../../assets/imgs/icons/mypage/profile_heart_bubble.png');

const { width, height } = Dimensions.get('window');

const ProfilePreviewScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('사진');
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const profileImages = [SampleImage1, SampleImage2, GirlProfileImage];

  const openImageModal = (index) => {
    setSelectedImageIndex(index % profileImages.length);
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImageIndex(-1);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? profileImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === profileImages.length - 1 ? 0 : prev + 1
    );
  };

  const renderPhotosContent = () => {
    // 3x3 그리드를 위해 9개 사진만 사용
    const gridImages = [...profileImages, ...profileImages, ...profileImages].slice(0, 9);
    
    return (
      <PhotosContainer>
        <PhotoGrid>
          {gridImages.map((image, index) => (
            <PhotoGridItem key={index}>
              <TouchableOpacity onPress={() => openImageModal(index)}>
                <GridPhoto source={image} />
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
            <InfoLabel>나이</InfoLabel>
            <InfoValue>25세</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>키</InfoLabel>
            <InfoValue>165cm</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>직업</InfoLabel>
            <InfoValue>디자이너</InfoValue>
          </InfoRow>
        </InfoSection>

        <InfoSection>
          <InfoTitle>관심사</InfoTitle>
          <TagsContainer>
            <Tag><TagText>#음식</TagText></Tag>
            <Tag><TagText>#명탐정코난</TagText></Tag>
            <Tag><TagText>#여행블로그</TagText></Tag>
            <Tag><TagText>#강아지</TagText></Tag>
            <Tag><TagText>#NCT127</TagText></Tag>
          </TagsContainer>
        </InfoSection>

        <InfoSection>
          <InfoTitle>자기소개</InfoTitle>
          <InfoDescription>
            안녕하세요! 디자인 일을 하고 있고, 여행과 음식을 좋아합니다. 
            특히 명탐정코난을 정말 좋아해서 관련 굿즈 수집도 하고 있어요. 
            강아지 키우고 있고, NCT127 팬입니다 ㅎㅎ
          </InfoDescription>
        </InfoSection>
      </ScrollView>
    </InfoContainer>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: colors.black, paddingBottom: height * 0.22 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
      
      {/* 배경 이미지 */}
      <BackgroundContainer>
        <BackgroundImage source={GirlProfileImage} />
      </BackgroundContainer>
      
      {/* 하단 탭 영역 */}
      <BottomSection>
        {/* 프로필 정보 헤더 */}
        <ProfileHeader>
          <ProfileHeaderGradient />
          <ProfileHeaderContent>
            <ProfileHeaderLeft>
              <ProfileName>닉네임닉네임 (25세 여)</ProfileName>
              <ProfileTags>
                #음식 #명탐정코난 #여행블로그{"\n"}#강아지 #NCT127
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
              <CloseButton onPress={closeImageModal}>
                <CloseButtonText>×</CloseButtonText>
              </CloseButton>
              
              <ImageContainer>
                <NavigationButton 
                  style={{ left: width * 0.05 }}
                  onPress={goToPreviousImage}
                >
                  <NavigationButtonText>‹</NavigationButtonText>
                </NavigationButton>
                
                <ModalImage source={profileImages[selectedImageIndex]} />
                
                <NavigationButton 
                  style={{ right: width * 0.05 }}
                  onPress={goToNextImage}
                >
                  <NavigationButtonText>›</NavigationButtonText>
                </NavigationButton>
              </ImageContainer>
              
              <ImageDescription>
                이 사진은 영국에서부터 온 사진으로 제가 정말 좋아하는 사진입니다
              </ImageDescription>
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
  align-items: flex-start;
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
  width: ${width * 0.9}px;
  max-height: ${height * 0.8}px;
  background-color: white;
  border-radius: ${width * 0.05}px;
  padding: ${width * 0.05}px;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${width * 0.03}px;
  right: ${width * 0.03}px;
  width: ${width * 0.08}px;
  height: ${width * 0.08}px;
  border-radius: ${width * 0.04}px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const CloseButtonText = styled.Text`
  font-size: ${width * 0.05}px;
  color: #666;
  font-weight: bold;
`;

const ImageContainer = styled.View`
  position: relative;
  width: 100%;
  align-items: center;
  margin: ${width * 0.05}px 0;
`;

const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  width: ${width * 0.1}px;
  height: ${width * 0.1}px;
  border-radius: ${width * 0.05}px;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const NavigationButtonText = styled.Text`
  font-size: ${width * 0.06}px;
  color: white;
  font-weight: bold;
`;

const ModalImage = styled.Image`
  width: ${width * 0.7}px;
  height: ${width * 0.8}px;
  border-radius: ${width * 0.03}px;
  resize-mode: contain;
`;

const ImageDescription = styled.Text`
  font-size: ${width * 0.035}px;
  color: #333;
  text-align: center;
  line-height: ${width * 0.05}px;
  margin-top: ${width * 0.03}px;
`;