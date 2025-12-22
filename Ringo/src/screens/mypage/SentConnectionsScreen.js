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

const SentConnectionsScreen = () => {
    const navigation = useNavigation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sentConnections, setSentConnections] = useState([
        {
            id: 1,
            name: '파승승',
            age: 27,
            gender: '남',
            tags: ['#보드게임', '#라면전문가', '#고양이', '#백그', '#엘지트윈스'],
            image: SampleImage1,
            verified: true,
            status: '수락됨',
            message: '하이 헬로우\n마이 네임 이즈 닉네임닉네임\n\n당신의 영국에서 온 사진,, 아주 인상깊게 봤습니다.\n아주 흔하시더라고요~\n저는 혼남이 좋습니다.\n저와 함께 놀이공원가서 놀아요\n\n연락 기다리고 있겠습니다.'
        },
        {
            id: 2,
            name: '구건일',
            age: 28,
            gender: '남',
            tags: ['#버클리뮤지엄', '#쌉리더', '#드림', '#리더', '#뉴욕'],
            image: SampleImage2,
            status: '응답 대기 중',
            message: '안녕하세요! 프로필이 정말 멋있네요. 음악을 좋아하시는 것 같은데, 저도 음악에 관심이 많아서 이야기 나눠보고 싶어요.'
        },
        {
            id: 3,
            name: '서창빈',
            age: 27,
            gender: '남',
            tags: ['#힙합', '#블랙', '#다이나믹듀오', '#프로틴', '#웰스'],
            image: SampleImage3,
            status: '거절됨',
            message: '프로필 보고 관심이 생겼습니다. 함께 운동하며 좋은 시간 보낼 수 있을 것 같아요!'
        },
        {
            id: 4,
            name: '박명랑',
            age: 22,
            gender: '남',
            tags: ['#아몬드', '#자떡치', '#워워', '#이랜처', '#젓'],
            image: SampleImage1,
            verified: true,
            status: '응답 대기 중',
            message: '안녕하세요! 취미가 비슷한 것 같아서 연락드려요.'
        }
    ]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleEditPress = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDeletePress = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        setSentConnections(prev => prev.filter(req => req.id !== selectedUser.id));
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleMessagePress = (user) => {
        setSelectedUser(user);
        setShowMessageModal(true);
    };

    const handleCloseModal = () => {
        setShowMessageModal(false);
        setSelectedUser(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case '수락됨':
                return '#7B68EE';
            case '거절됨':
                return '#ff5555';
            case '응답 대기 중':
            default:
                return '#999';
        }
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

                <StatusText status={item.status}>
                    {item.status}
                </StatusText>

                <MessageButton onPress={() => handleMessagePress(item)}>
                    <MessageButtonText>내가 보낸 메시지</MessageButtonText>
                </MessageButton>
            </CardContainer>
        );
    };

    return (
        <Container>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            {/* Header */}
            <Header>
                <BackButton onPress={handleBack}>
                    <BackButtonText>‹</BackButtonText>
                </BackButton>
                <EditButton onPress={handleEditPress}>
                    <HeaderTitle>{isEditMode ? '완료' : '편집'}</HeaderTitle>
                </EditButton>
            </Header>

            {/* Title */}
            <TitleContainer>
                <Title>내가 선택한 상대방을 확인하세요</Title>
            </TitleContainer>

            {/* Connection Cards */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <CardsContainer>
                    <FlatList
                        data={sentConnections}
                        renderItem={renderConnectionCard}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: width * 0.03,
                        }}
                        scrollEnabled={false}
                        contentContainerStyle={{
                            paddingHorizontal: width * 0.05,
                            paddingBottom: width * 0.1,
                        }}
                    />
                </CardsContainer>
            </ScrollView>

            {/* Message Modal */}
            <Modal
                visible={showMessageModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <ModalContainer>
                    <ModalBackground onPress={handleCloseModal}>
                        <MessageModalContent onPress={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>내가 보낸 메시지</ModalTitle>
                                <CloseButton onPress={handleCloseModal}>
                                    <CloseButtonText>×</CloseButtonText>
                                </CloseButton>
                            </ModalHeader>

                            {selectedUser && (
                                <>
                                    <MessageHeader>
                                        <MessageHeaderText>하이 헬로우</MessageHeaderText>
                                        <MessageHeaderText>마이 네임 이즈 닉네임닉네임</MessageHeaderText>
                                    </MessageHeader>

                                    <MessageContent>
                                        <MessageText>{selectedUser.message}</MessageText>
                                    </MessageContent>
                                </>
                            )}
                        </MessageModalContent>
                    </ModalBackground>
                </ModalContainer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={handleDeleteCancel}
            >
                <ModalContainer>
                    <ModalBackground onPress={handleDeleteCancel}>
                        <DeleteModalContent>
                            <DeleteModalTitle>상대방을 목록에서 삭제할까요?</DeleteModalTitle>
                            <DeleteModalSubtitle>삭제하면 자동으로 연결신청이 거절됩니다</DeleteModalSubtitle>

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

                            <DeleteModalButtons>
                                <DeleteModalButton onPress={handleDeleteConfirm} isDelete={true}>
                                    <DeleteModalButtonText isDelete={true}>삭제하기</DeleteModalButtonText>
                                </DeleteModalButton>
                                <DeleteModalButton onPress={handleDeleteCancel} isDelete={false}>
                                    <DeleteModalButtonText isDelete={false}>취소</DeleteModalButtonText>
                                </DeleteModalButton>
                            </DeleteModalButtons>
                        </DeleteModalContent>
                    </ModalBackground>
                </ModalContainer>
            </Modal>
        </Container>
    );
};

export default SentConnectionsScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${width * 0.05}px;
  padding-top: ${width * 0.12}px;
  background-color: white;
`;

const BackButton = styled.TouchableOpacity`
  padding: ${width * 0.02}px;
`;

const BackButtonText = styled.Text`
  font-size: ${width * 0.08}px;
  color: ${colors.black};
`;

const EditButton = styled.TouchableOpacity`
  padding: ${width * 0.02}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${width * 0.04}px;
  color: #666;
`;

const TitleContainer = styled.View`
  padding-horizontal: ${width * 0.05}px;
  margin-bottom: ${width * 0.06}px;
`;

const Title = styled.Text`
  font-size: ${width * 0.055}px;
  font-weight: 700;
  color: ${colors.black};
  line-height: ${width * 0.07}px;
`;

const CardsContainer = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  width: ${(width - width * 0.1 - width * 0.03) / 2}px;
  margin-bottom: ${width * 0.04}px;
  position: relative;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: ${width * 0.015}px;
  right: ${width * 0.015}px;
  width: ${width * 0.06}px;
  height: ${width * 0.06}px;
  background-color: #ff5555;
  border-radius: ${width * 0.03}px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-size: ${width * 0.04}px;
  font-weight: bold;
  line-height: ${width * 0.045}px;
`;

const CardImageContainer = styled.View`
  width: 100%;
  height: ${width * 0.55}px;
  border-radius: ${width * 0.03}px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CardGradient = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)'],
    locations: [0, 0.6, 1],
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
  flex-direction: row;
  align-items: center;
`;

const VerifiedIcon = styled.Text`
  color: #007AFF;
  font-size: ${width * 0.03}px;
  margin-left: ${width * 0.01}px;
`;

const TagsText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${width * 0.025}px;
  line-height: ${width * 0.032}px;
`;

const StatusText = styled.Text`
  font-size: ${width * 0.032}px;
  font-weight: 600;
  color: ${props => props.status === '수락됨' ? '#7B68EE' : props.status === '거절됨' ? '#ff5555' : '#999'};
  text-align: center;
  margin-top: ${width * 0.02}px;
  margin-bottom: ${width * 0.015}px;
`;

const MessageButton = styled.TouchableOpacity`
  border: 1px solid #ddd;
  border-radius: ${width * 0.015}px;
  padding: ${width * 0.02}px;
  align-items: center;
`;

const MessageButtonText = styled.Text`
  font-size: ${width * 0.028}px;
  color: #666;
`;

// Modal Styles
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

const MessageModalContent = styled.TouchableOpacity`
  width: ${width * 0.85}px;
  max-height: ${height * 0.7}px;
  background-color: white;
  border-radius: ${width * 0.03}px;
  overflow: hidden;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${width * 0.04}px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const ModalTitle = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 600;
  color: ${colors.black};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${width * 0.01}px;
`;

const CloseButtonText = styled.Text`
  font-size: ${width * 0.06}px;
  color: #666;
`;

const MessageHeader = styled.View`
  padding: ${width * 0.04}px;
  padding-bottom: ${width * 0.02}px;
`;

const MessageHeaderText = styled.Text`
  font-size: ${width * 0.035}px;
  font-weight: 600;
  color: ${colors.black};
  line-height: ${width * 0.045}px;
`;

const MessageContent = styled.ScrollView`
  max-height: ${height * 0.4}px;
  padding-horizontal: ${width * 0.04}px;
  padding-bottom: ${width * 0.04}px;
`;

const MessageText = styled.Text`
  font-size: ${width * 0.033}px;
  color: ${colors.black};
  line-height: ${width * 0.045}px;
`;

// Delete Modal Styles
const DeleteModalContent = styled.View`
  width: ${width * 0.75}px;
  background-color: white;
  border-radius: ${width * 0.05}px;
  padding: ${width * 0.05}px;
  align-items: center;
`;

const DeleteModalTitle = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 700;
  color: ${colors.black};
  text-align: center;
  margin-bottom: ${width * 0.015}px;
`;

const DeleteModalSubtitle = styled.Text`
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

const DeleteModalButtons = styled.View`
  flex-direction: row;
  gap: ${width * 0.03}px;
  width: 100%;
`;

const DeleteModalButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${width * 0.038}px;
  border-radius: ${width * 0.025}px;
  align-items: center;
  background-color: white;
`;

const DeleteModalButtonText = styled.Text`
  font-size: ${width * 0.04}px;
  font-weight: 600;
  color: ${props => props.isDelete ? '#ff5555' : '#666'};
`;