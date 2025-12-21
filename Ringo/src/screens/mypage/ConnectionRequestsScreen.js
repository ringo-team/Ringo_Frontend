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
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';

// 임시 이미지들
const SampleImage1 = require('../../assets/imgs/boy_profile_image.png');
const SampleImage2 = require('../../assets/imgs/boy_feed_image_01.png');
const SampleImage3 = require('../../assets/imgs/boy_feed_image_02.png');

const { width, height } = Dimensions.get('window');

const ConnectionRequestsScreen = () => {
    const navigation = useNavigation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [connectionRequests, setConnectionRequests] = useState([
        {
            id: 1,
            name: '파승승',
            age: 27,
            gender: '남',
            tags: ['#보드게임', '#라면전문가', '#고양이', '#백그', '#엘지트윈스'],
            image: SampleImage1,
            verified: true,
        },
        {
            id: 2,
            name: '한지성',
            age: 26,
            gender: '남',
            tags: ['#쓰리라차', '#스트레이키즈', '#퀴카', '#안장', '#ISFP'],
            image: SampleImage2,
        },
        {
            id: 3,
            name: '차은우',
            age: 29,
            gender: '남',
            tags: ['#드라마', '#촬영생', '#강아지', '#오버워치', '#아스트로'],
            image: SampleImage3,
        },
        {
            id: 4,
            name: '김땡땡',
            age: 21,
            gender: '남',
            tags: ['#보드게임', '#라면전문가', '#고양이', '#백그', '#엘지트윈스'],
            image: SampleImage1,
            verified: true,
        },
        {
            id: 5,
            name: '이민혁',
            age: 24,
            gender: '남',
            tags: ['#비투비', '#음악', '#기타', '#여행', '#카페'],
            image: SampleImage2,
            verified: true,
        },
        {
            id: 6,
            name: '박서준',
            age: 28,
            gender: '남',
            tags: ['#영화', '#연기', '#운동', '#맛집', '#드라이브'],
            image: SampleImage3,
        },
        {
            id: 7,
            name: '정국',
            age: 25,
            gender: '남',
            tags: ['#BTS', '#노래', '#춤', '#게임', '#운동'],
            image: SampleImage1,
            verified: true,
        },
        {
            id: 8,
            name: '송강',
            age: 23,
            gender: '남',
            tags: ['#모델', '#배우', '#패션', '#사진', '#독서'],
            image: SampleImage2,
        },
    ]);

    const handleEditPress = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDeletePress = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        setConnectionRequests(prev => prev.filter(req => req.id !== selectedUser.id));
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const renderConnectionCard = ({ item, index }) => {
        const isLeftColumn = index % 2 === 0;

        return (
            <CardContainer isEditMode={isEditMode} isLeftColumn={isLeftColumn}>
                {isEditMode && (
                    <DeleteButton onPress={() => handleDeletePress(item)}>
                        <DeleteButtonText>×</DeleteButtonText>
                    </DeleteButton>
                )}
                <CardImageContainer>
                    <CardImage source={item.image} />
                    <CardOverlay>
                        <CardGradient />
                        <CardContent>
                            <UserName>
                                {item.name} ({item.age}세 {item.gender})
                                {item.verified && <VerifiedIcon>✓</VerifiedIcon>}
                            </UserName>
                            <TagsText>
                                {item.tags.join(' ')}
                            </TagsText>
                        </CardContent>
                    </CardOverlay>
                </CardImageContainer>
            </CardContainer>
        );
    };

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* 헤더 */}
            <Header>
                <BackButton onPress={() => navigation.goBack()}>
                    <BackButtonText>‹</BackButtonText>
                </BackButton>
                <HeaderSpacer />
                <EditButton onPress={handleEditPress}>
                    <EditButtonText>{isEditMode ? '완료' : '편집'}</EditButtonText>
                </EditButton>
            </Header>

            {/* 제목 */}
            <TitleSection>
                <MainTitle>나를 선택한 회원을 확인하세요!</MainTitle>
            </TitleSection>

            {/* 연결신청 리스트 */}
            <ContentContainer>
                <FlatList
                    data={connectionRequests}
                    renderItem={renderConnectionCard}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: width * 0.05,
                        paddingTop: width * 0.03,
                        paddingBottom: width * 0.03
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: width * 0.03
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </ContentContainer>

            {/* 삭제 확인 모달 */}
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleDeleteCancel}
            >
                <ModalContainer>
                    <ModalBackground onPress={handleDeleteCancel}>
                        <ModalContent>
                            <ModalTitle>상대방을 목록에서 삭제할까요?</ModalTitle>
                            <ModalSubtitle>삭제하면 자동으로 연결신청이 거절됩니다</ModalSubtitle>

                            {selectedUser && (
                                <UserPreview>
                                    <UserPreviewImage source={selectedUser.image} />
                                    <PreviewGradient>
                                        <PreviewCardContent>
                                            <PreviewUserName>
                                                {selectedUser.name} ({selectedUser.age}세 {selectedUser.gender})
                                                {selectedUser.verified && <PreviewVerifiedIcon>✓</PreviewVerifiedIcon>}
                                            </PreviewUserName>
                                            <PreviewTagsText>
                                                {selectedUser.tags.join(' ')}
                                            </PreviewTagsText>
                                        </PreviewCardContent>
                                    </PreviewGradient>
                                </UserPreview>
                            )}

                            <ModalButtons>
                                <ModalButton onPress={handleDeleteConfirm} isDelete={true}>
                                    <ModalButtonText isDelete={true}>삭제하기</ModalButtonText>
                                </ModalButton>
                                <ModalButton onPress={handleDeleteCancel} isDelete={false}>
                                    <ModalButtonText isDelete={false}>취소</ModalButtonText>
                                </ModalButton>
                            </ModalButtons>
                        </ModalContent>
                    </ModalBackground>
                </ModalContainer>
            </Modal>
        </Container>
    );
};

export default ConnectionRequestsScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${height * 0.06}px ${width * 0.05}px ${width * 0.04}px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const BackButtonText = styled.Text`
  color: ${colors.black};
  font-size: 24px;
  font-weight: bold;
`;

const HeaderSpacer = styled.View`
  flex: 1;
`;

const TitleSection = styled.View`
  padding: ${width * 0.05}px;
  background-color: white;
`;

const MainTitle = styled.Text`
  font-size: ${width * 0.05}px;
  font-weight: 400;
  color: ${colors.black};
  text-align: left;
`;

const EditButton = styled.TouchableOpacity`
  padding: ${width * 0.02}px;
`;

const EditButtonText = styled.Text`
  color: ${colors.black};
  font-size: ${width * 0.04}px;
  font-weight: 500;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

const CardContainer = styled.View`
  width: ${(width - width * 0.12) / 2}px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transform: ${props => props.isEditMode ? 'scale(0.9)' : 'scale(1)'};
  border-width: 1px;
  border-color: #f0f0f0;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${width * 0.02}px;
  right: ${width * 0.02}px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #ff4444;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const CardImageContainer = styled.View`
  width: 100%;
  height: ${(width - width * 0.12) / 2 * 4 / 3}px;
  position: relative;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const CardOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
`;

const CardGradient = styled(LinearGradient).attrs({
    colors: ['transparent', 'rgba(0, 0, 0, 0.8)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CardContent = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${width * 0.03}px;
  z-index: 1;
`;

const UserName = styled.Text`
  color: white;
  font-size: ${width * 0.032}px;
  font-weight: 600;
  margin-bottom: ${width * 0.01}px;
`;

const TagsText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${width * 0.025}px;
  line-height: ${width * 0.032}px;
`; const VerifiedIcon = styled.Text`
  color: #007AFF;
  font-size: ${width * 0.03}px;
  margin-left: ${width * 0.01}px;
`;

// 모달 스타일들
const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: ${width * 0.75}px;
  background-color: white;
  border-radius: ${width * 0.05}px;
  padding: ${width * 0.05}px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 700;
  color: ${colors.black};
  text-align: center;
  margin-bottom: ${width * 0.015}px;
`;

const ModalSubtitle = styled.Text`
  font-size: ${width * 0.032}px;
  color: #ff5555;
  text-align: center;
  margin-bottom: ${width * 0.04}px;
`;

const UserPreview = styled.View`
  width: ${width * 0.45}px;
  height: ${width * 0.58}px;
  background-color: white;
  border-radius: ${width * 0.03}px;
  overflow: hidden;
  margin-bottom: ${width * 0.04}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

const UserPreviewImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  position: absolute;
`;

const PreviewGradient = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)'],
    locations: [0, 0.6, 1],
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
`;

const PreviewCardContent = styled.View`
  padding: ${width * 0.025}px;
`;

const PreviewUserName = styled.Text`
  color: white;
  font-size: ${width * 0.032}px;
  font-weight: 600;
  margin-bottom: ${width * 0.008}px;
  flex-direction: row;
  align-items: center;
`;

const PreviewVerifiedIcon = styled.Text`
  color: #007AFF;
  font-size: ${width * 0.028}px;
  margin-left: ${width * 0.008}px;
`;

const PreviewTagsText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${width * 0.025}px;
  line-height: ${width * 0.032}px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  gap: ${width * 0.03}px;
  width: 100%;
`;

const ModalButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${width * 0.038}px;
  border-radius: ${width * 0.025}px;
  align-items: center;
  background-color: white;
`;

const ModalButtonText = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 400;
  color: ${props => props.isDelete ? '#ff5555' : '#666'};
`;