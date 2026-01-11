import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import DatePicker from 'react-native-date-picker';

import colors from '../../constants/colors';
import config from '../../constants/config';
import { PtdText, PtdBText } from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';

// 아이콘
const PencilEditIcon = require('../../assets/imgs/icons/mypage/pencil_edit.png');
const ManIcon = require('../../assets/imgs/icons/man.png');
const WomanIcon = require('../../assets/imgs/icons/woman.png');
const DefaultProfileImage = require('../../assets/imgs/girl_profile_image.png');

const { width } = Dimensions.get('window');

const ProfileEditScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const passedProfileData = route.params?.profileData;

    // 탭 상태
    const [activeTab, setActiveTab] = useState('메인 프로필');

    // 프로필 데이터
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [nickname, setNickname] = useState('');
    const [nicknameCheckStatus, setNicknameCheckStatus] = useState(null); // null, 'available', 'duplicate'
    const [originalNickname, setOriginalNickname] = useState('');
    const [gender, setGender] = useState('남성'); // 남성, 여성
    const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mbti, setMbti] = useState({ ei: '', ns: '', tf: '', pj: '' });
    const [hashtags, setHashtags] = useState([]);
    const [hashtagInput, setHashtagInput] = useState('');

    // 드롭다운 모달 상태
    const [showMbtiPicker, setShowMbtiPicker] = useState({ ei: false, ns: false, tf: false, pj: false });

    // 프로필 사진 수정 모달
    const [showPhotoEditModal, setShowPhotoEditModal] = useState(false);

    // 변경사항 저장 확인 모달
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);

    // 초기 데이터 저장 (변경사항 추적용)
    const [originalData, setOriginalData] = useState({});

    // MBTI 선택 옵션
    const mbtiOptions = {
        ei: ['E', 'I'],
        ns: ['N', 'S'],
        tf: ['T', 'F'],
        pj: ['P', 'J'],
    };

    // 프로필 데이터 불러오기
    const fetchProfileData = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (!credentials) {
                console.log('저장된 토큰이 없습니다.');
                // 전달받은 데이터로 초기화
                if (passedProfileData) {
                    initializeWithData(passedProfileData, null);
                }
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
            
            if (!profileResponse.ok) {
                console.log('프로필 조회 실패:', profileResponse.status);
                // 전달받은 데이터로 초기화
                if (passedProfileData) {
                    initializeWithData(passedProfileData, null);
                }
                setIsLoading(false);
                return;
            }
            
            const profileResult = await profileResponse.json();
            console.log('프로필 정보:', profileResult);

            // 프로필 사진 조회
            let profileImageUrl = null;
            try {
                const profileImageResponse = await fetch(config.USER.GET_PROFILE_IMAGE(userId), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (profileImageResponse.ok) {
                    const profileImageResult = await profileImageResponse.json();
                    console.log('프로필 사진:', profileImageResult);
                    if (profileImageResult && profileImageResult.length > 0) {
                        profileImageUrl = profileImageResult[0]?.imageUrl;
                    }
                }
            } catch (imgError) {
                console.log('프로필 이미지 조회 실패:', imgError);
            }

            // 데이터 초기화
            initializeWithData(profileResult, profileImageUrl);

        } catch (error) {
            console.error('프로필 데이터 조회 오류:', error);
            // 오류 시 전달받은 데이터로 초기화
            if (passedProfileData) {
                initializeWithData(passedProfileData, null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 데이터로 상태 초기화
    const initializeWithData = (profileResult, profileImageUrl) => {
        if (profileResult) {
            setNickname(profileResult.nickname || '');
            setOriginalNickname(profileResult.nickname || '');
            setGender(profileResult.gender === 'MALE' ? '남성' : '여성');

            // 생년월일 파싱
            if (profileResult.birthday) {
                const birthday = new Date(profileResult.birthday);
                setBirthDate(birthday);
            }

            // MBTI 파싱
            if (profileResult.mbti && profileResult.mbti.length === 4) {
                setMbti({
                    ei: profileResult.mbti[0],
                    ns: profileResult.mbti[1],
                    tf: profileResult.mbti[2],
                    pj: profileResult.mbti[3],
                });
            }

            // 해시태그 설정
            if (profileResult.hashtags && Array.isArray(profileResult.hashtags)) {
                setHashtags(profileResult.hashtags);
            }
        }

        // 프로필 이미지 설정 (API 조회 결과 또는 전달받은 데이터의 profile 필드 사용)
        const finalImageUrl = profileImageUrl || profileResult?.profile || null;
        if (finalImageUrl) {
            setProfileImage(finalImageUrl);
        }

        // 초기 데이터 저장 (변경사항 추적용)
        setOriginalData({
            nickname: profileResult?.nickname || '',
            gender: profileResult?.gender === 'MALE' ? '남성' : '여성',
            birthDate: profileResult?.birthday ? new Date(profileResult.birthday).toISOString() : null,
            mbti: profileResult?.mbti || '',
            hashtags: profileResult?.hashtags || [],
            profileImage: finalImageUrl,
        });
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    // 닉네임 중복 확인
    const handleCheckNickname = async () => {
        if (nickname === originalNickname) {
            setNicknameCheckStatus('available');
            Alert.alert('확인', '현재 사용 중인 닉네임입니다.');
            return;
        }

        try {
            const response = await fetch(`${config.SIGNUP.CHECK_NICKNAME}?nickname=${encodeURIComponent(nickname)}`);
            const result = await response.json();

            if (result.result === '0000') {
                setNicknameCheckStatus('available');
                Alert.alert('확인', '사용 가능한 닉네임입니다.');
            } else if (result.result === 'E0008') {
                setNicknameCheckStatus('duplicate');
                Alert.alert('알림', '이미 사용 중인 닉네임입니다.');
            } else {
                setNicknameCheckStatus(null);
                Alert.alert('오류', result.message || '오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('닉네임 중복확인 오류:', error);
            Alert.alert('오류', '네트워크 오류가 발생했습니다.');
        }
    };

    // 해시태그 추가
    const handleAddHashtag = () => {
        const trimmedInput = hashtagInput.trim();
        if (trimmedInput === '' || hashtags.includes(trimmedInput)) {
            setHashtagInput('');
            return;
        }
        if (trimmedInput.length > 10) {
            Alert.alert('알림', '해시태그는 10자 이하로 입력해주세요.');
            return;
        }
        if (hashtags.length < 5) {
            setHashtags([...hashtags, trimmedInput]);
            setHashtagInput('');
        } else {
            Alert.alert('알림', '해시태그는 최대 5개까지 추가할 수 있습니다.');
        }
    };

    // 해시태그 삭제
    const handleRemoveHashtag = (indexToRemove) => {
        setHashtags(hashtags.filter((_, index) => index !== indexToRemove));
    };

    // 저장
    const handleSave = async () => {
        // 닉네임 변경 시 중복확인 필수
        if (nickname !== originalNickname && nicknameCheckStatus !== 'available') {
            Alert.alert('알림', '닉네임 중복확인을 해주세요.');
            return;
        }

        try {
            const credentials = await Keychain.getGenericPassword();
            if (!credentials) {
                Alert.alert('오류', '로그인 정보가 없습니다.');
                return;
            }

            const tokenData = JSON.parse(credentials.password);
            const { accessToken, userId } = tokenData;

            const birthday = birthDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식

            const mbtiString = mbti.ei && mbti.ns && mbti.tf && mbti.pj
                ? `${mbti.ei}${mbti.ns}${mbti.tf}${mbti.pj}`
                : null;

            const requestData = {
                id: userId,
                nickname: nickname,
                birthday: birthday,
                gender: gender === '남성' ? 'MALE' : 'FEMALE',
                mbti: mbtiString,
                hashtags: hashtags,
            };

            console.log('저장할 프로필 데이터:', requestData);

            // TODO: 프로필 수정 API 호출
            // const response = await fetch(config.USER.UPDATE_PROFILE, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${accessToken}`
            //     },
            //     body: JSON.stringify(requestData)
            // });

            Alert.alert('완료', '프로필이 저장되었습니다.', [
                { text: '확인', onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            console.error('프로필 저장 오류:', error);
            Alert.alert('오류', '프로필 저장에 실패했습니다.');
        }
    };

    // 미리보기
    const handlePreview = () => {
        navigation.navigate('ProfilePreview');
    };

    // 변경사항 확인
    const hasChanges = () => {
        const currentMbti = mbti.ei && mbti.ns && mbti.tf && mbti.pj
            ? `${mbti.ei}${mbti.ns}${mbti.tf}${mbti.pj}`
            : '';

        return (
            nickname !== originalData.nickname ||
            gender !== originalData.gender ||
            birthDate.toISOString() !== originalData.birthDate ||
            currentMbti !== originalData.mbti ||
            JSON.stringify(hashtags) !== JSON.stringify(originalData.hashtags) ||
            profileImage !== originalData.profileImage
        );
    };

    // DatePicker 확인
    const handleDateConfirm = (date) => {
        setBirthDate(date);
        setShowDatePicker(false);
    };

    // 뒤로가기 처리
    const handleBackPress = () => {
        if (hasChanges()) {
            setShowUnsavedModal(true);
        } else {
            navigation.goBack();
        }
    };

    // 프로필 사진 수정 버튼 클릭
    const handlePhotoEditPress = () => {
        setShowPhotoEditModal(true);
    };

    // 라이브러리에서 선택
    const handleSelectFromLibrary = () => {
        setShowPhotoEditModal(false);
        // TODO: 이미지 피커 라이브러리 열기
        console.log('라이브러리에서 선택');
    };

    // 사진 촬영
    const handleTakePhoto = () => {
        setShowPhotoEditModal(false);
        // TODO: 카메라 열기
        console.log('사진 촬영');
    };

    // 사진 삭제
    const handleDeletePhoto = () => {
        setShowPhotoEditModal(false);
        setProfileImage(null);
    };

    // 드롭다운 선택 컴포넌트
    const DropdownSelect = ({ value, placeholder, onPress }) => (
        <DropdownButton onPress={onPress}>
            <DropdownText selected={!!value}>{value || placeholder}</DropdownText>
            <DropdownArrow>▼</DropdownArrow>
        </DropdownButton>
    );

    // 피커 모달 컴포넌트
    const PickerModal = ({ visible, onClose, options, onSelect, title }) => (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <ModalOverlay onPress={onClose}>
                <ModalContent>
                    <ModalTitle>{title}</ModalTitle>
                    <ScrollView style={{ maxHeight: 300 }}>
                        {options.map((option, index) => (
                            <ModalOption
                                key={index}
                                onPress={() => {
                                    onSelect(option);
                                    onClose();
                                }}
                            >
                                <ModalOptionText>{option}</ModalOptionText>
                            </ModalOption>
                        ))}
                    </ScrollView>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );

    if (isLoading) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color={colors.primary} />
            </LoadingContainer>
        );
    }

    return (
        <Container>
            {/* 헤더 */}
            <Header>
                <BackButton onPress={handleBackPress} />
                <HeaderTitle>개인정보 수정</HeaderTitle>
            </Header>

            {/* 탭 바 */}
            <TabBar>
                {['메인 프로필', '사진', '정보'].map((tab) => (
                    <TabItem
                        key={tab}
                        active={activeTab === tab}
                        onPress={() => setActiveTab(tab)}
                    >
                        <TabText active={activeTab === tab}>{tab}</TabText>
                        {activeTab === tab && <TabIndicator />}
                    </TabItem>
                ))}
            </TabBar>

            <ScrollView showsVerticalScrollIndicator={false}>
                <ContentContainer>
                    {/* 프로필 사진 */}
                    <ProfileImageSection>
                        <ProfileImageContainer>
                            <ProfileImage
                                source={profileImage ? { uri: profileImage } : DefaultProfileImage}
                            />
                            <EditButton onPress={handlePhotoEditPress}>
                                <EditIconImage source={PencilEditIcon} />
                            </EditButton>
                        </ProfileImageContainer>
                    </ProfileImageSection>

                    {/* 닉네임 */}
                    <InputSection>
                        <InputLabelRow>
                            <InputLabel>닉네임</InputLabel>
                            <RequiredMark>*</RequiredMark>
                        </InputLabelRow>
                        <NicknameInputContainer>
                            <NicknameInput
                                value={nickname}
                                onChangeText={(text) => {
                                    setNickname(text);
                                    setNicknameCheckStatus(null);
                                }}
                                placeholder="닉네임을 입력해주세요"
                                placeholderTextColor="#CCCCCC"
                            />
                            <CheckButtonInline onPress={handleCheckNickname}>
                                <CheckButtonText>중복확인</CheckButtonText>
                            </CheckButtonInline>
                        </NicknameInputContainer>
                    </InputSection>

                    {/* 성별 */}
                    <InputSection>
                        <InputLabelRow>
                            <InputLabel>성별</InputLabel>
                            <RequiredMark>*</RequiredMark>
                        </InputLabelRow>
                        <GenderRow>
                            <GenderButton
                                selected={gender === '남성'}
                                onPress={() => setGender('남성')}
                            >
                                <GenderText selected={gender === '남성'}>남성</GenderText>
                                <GenderIcon source={ManIcon} />
                            </GenderButton>
                            <GenderButton
                                selected={gender === '여성'}
                                onPress={() => setGender('여성')}
                            >
                                <GenderText selected={gender === '여성'}>여성</GenderText>
                                <GenderIcon source={WomanIcon} />
                            </GenderButton>
                        </GenderRow>
                    </InputSection>

                    {/* 생년월일 */}
                    <InputSection>
                        <InputLabelRow>
                            <InputLabel>생년월일</InputLabel>
                            <RequiredMark>*</RequiredMark>
                        </InputLabelRow>
                        <BirthdayRow>
                            <BirthdayFieldWithLabel>
                                <DateInput onPress={() => setShowDatePicker(true)}>
                                    <DateInputText>{birthDate.getFullYear()}</DateInputText>
                                </DateInput>
                                <BirthdayLabel>년</BirthdayLabel>
                            </BirthdayFieldWithLabel>
                            <BirthdayFieldWithLabel>
                                <DateInputSmall onPress={() => setShowDatePicker(true)}>
                                    <DateInputText>{birthDate.getMonth() + 1}</DateInputText>
                                </DateInputSmall>
                                <BirthdayLabel>월</BirthdayLabel>
                            </BirthdayFieldWithLabel>
                            <BirthdayFieldWithLabel>
                                <DateInputSmall onPress={() => setShowDatePicker(true)}>
                                    <DateInputText>{birthDate.getDate()}</DateInputText>
                                </DateInputSmall>
                                <BirthdayLabel>일</BirthdayLabel>
                            </BirthdayFieldWithLabel>
                        </BirthdayRow>
                        
                        <DatePicker
                            modal
                            open={showDatePicker}
                            date={birthDate}
                            mode="date"
                            maximumDate={new Date()}
                            locale="ko"
                            title="생년월일 선택"
                            confirmText="확인"
                            cancelText="취소"
                            onConfirm={(date) => {
                                setBirthDate(date);
                                setShowDatePicker(false);
                            }}
                            onCancel={() => setShowDatePicker(false)}
                        />
                    </InputSection>

                    {/* MBTI */}
                    <InputSection>
                        <InputLabel>MBTI</InputLabel>
                        <MbtiRow>
                            {Object.keys(mbtiOptions).map((key) => (
                                <MbtiField key={key}>
                                    <DropdownSelect
                                        value={mbti[key]}
                                        placeholder="-"
                                        onPress={() => setShowMbtiPicker({ ...showMbtiPicker, [key]: true })}
                                    />
                                </MbtiField>
                            ))}
                        </MbtiRow>
                    </InputSection>

                    {/* 해시태그 */}
                    <InputSection>
                        <HashtagLabelRow>
                            <HashtagLabelWithInfo>
                                <InputLabel>해시태그</InputLabel>
                                <InfoIcon>
                                    <InfoText>?</InfoText>
                                </InfoIcon>
                            </HashtagLabelWithInfo>
                            <HashtagCount>{hashtags.length}/5</HashtagCount>
                        </HashtagLabelRow>
                        <HashtagInputContainer>
                            <HashtagPrefix>#</HashtagPrefix>
                            <HashtagTextInput
                                value={hashtagInput}
                                onChangeText={setHashtagInput}
                                placeholder="해시태그 입력"
                                placeholderTextColor="#CCCCCC"
                                returnKeyType="done"
                                onSubmitEditing={handleAddHashtag}
                                maxLength={10}
                            />
                        </HashtagInputContainer>
                        <HashtagList>
                            {hashtags.map((tag, index) => (
                                <HashtagChip key={index}>
                                    <HashtagText>#{tag}</HashtagText>
                                    <RemoveButton onPress={() => handleRemoveHashtag(index)}>
                                        <RemoveIcon>✕</RemoveIcon>
                                    </RemoveButton>
                                </HashtagChip>
                            ))}
                        </HashtagList>
                    </InputSection>
                </ContentContainer>
            </ScrollView>

            {/* 버튼들 - 하단 고정 */}
            <ButtonContainer>
                <SaveButton onPress={handleSave} disabled={false}>
                    <SaveButtonText>저장하기</SaveButtonText>
                </SaveButton>
                <PreviewButton onPress={handlePreview}>
                    <PreviewButtonText>프로필 미리보기</PreviewButtonText>
                </PreviewButton>
            </ButtonContainer>

            {/* MBTI 피커 모달들 */}
            {Object.keys(mbtiOptions).map((key) => (
                <PickerModal
                    key={key}
                    visible={showMbtiPicker[key]}
                    onClose={() => setShowMbtiPicker({ ...showMbtiPicker, [key]: false })}
                    options={mbtiOptions[key]}
                    onSelect={(value) => setMbti({ ...mbti, [key]: value })}
                    title={`MBTI ${key.toUpperCase()}`}
                />
            ))}

            {/* 프로필 사진 수정 모달 */}
            <Modal
                visible={showPhotoEditModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPhotoEditModal(false)}
            >
                <PhotoModalOverlay onPress={() => setShowPhotoEditModal(false)}>
                    <PhotoModalContent onStartShouldSetResponder={() => true}>
                        <PhotoModalTitle>프로필 사진 수정</PhotoModalTitle>
                        <PhotoModalSubtitle>
                            이미 얼굴 인증을 받은 사진이라면,{'\n'}
                            수정 시 재인증을 하셔야 해요!(약00분 소요)
                        </PhotoModalSubtitle>

                        <PhotoModalOption onPress={handleSelectFromLibrary}>
                            <PhotoModalOptionText>라이브러리에서 선택</PhotoModalOptionText>
                        </PhotoModalOption>

                        <PhotoModalOption onPress={handleTakePhoto}>
                            <PhotoModalOptionText>사진 촬영</PhotoModalOptionText>
                        </PhotoModalOption>

                        <PhotoModalOption onPress={handleDeletePhoto}>
                            <PhotoModalOptionTextRed>삭제하기</PhotoModalOptionTextRed>
                        </PhotoModalOption>

                        <PhotoModalCancel onPress={() => setShowPhotoEditModal(false)}>
                            <PhotoModalCancelText>취소</PhotoModalCancelText>
                        </PhotoModalCancel>
                    </PhotoModalContent>
                </PhotoModalOverlay>
            </Modal>

            {/* 변경사항 저장 확인 모달 */}
            <Modal
                visible={showUnsavedModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowUnsavedModal(false)}
            >
                <PhotoModalOverlay onPress={() => setShowUnsavedModal(false)}>
                    <PhotoModalContent onStartShouldSetResponder={() => true}>
                        <PhotoModalTitle>변경사항을 저장하지 않았어요!</PhotoModalTitle>
                        <PhotoModalSubtitle>
                            변경사항을 저장하지 않고 나가면{'\n'}
                            수정한 내용이 반영되지 않을 수도 있어요
                        </PhotoModalSubtitle>

                        <PhotoModalOption onPress={() => {
                            setShowUnsavedModal(false);
                            navigation.goBack();
                        }}>
                            <PhotoModalOptionText>저장하지 않고 나가기</PhotoModalOptionText>
                        </PhotoModalOption>

                        <PhotoModalOption onPress={() => {
                            setShowUnsavedModal(false);
                            handleSave();
                        }}>
                            <PhotoModalOptionTextPrimary>저장하기</PhotoModalOptionTextPrimary>
                        </PhotoModalOption>

                        <PhotoModalCancel onPress={() => setShowUnsavedModal(false)}>
                            <PhotoModalCancelText>취소</PhotoModalCancelText>
                        </PhotoModalCancel>
                    </PhotoModalContent>
                </PhotoModalOverlay>
            </Modal>
        </Container>
    );
};

// Styled Components
const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: ${width * 0.12}px;
    padding-horizontal: ${width * 0.02}px;
    padding-bottom: ${width * 0.03}px;
`;

const HeaderTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    margin-left: ${width * 0.02}px;
`;

const TabBar = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #E5E5E5;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    padding-vertical: ${width * 0.04}px;
    position: relative;
`;

const TabText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: ${props => props.active ? colors.black : '#CCCCCC'};
    font-weight: ${props => props.active ? 'bold' : 'normal'}
`;

const TabIndicator = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.black};
`;

const ContentContainer = styled.View`
    padding: ${width * 0.06}px;
`;

const ProfileImageSection = styled.View`
    align-items: center;
    margin-bottom: ${width * 0.06}px;
`;

const ProfileImageContainer = styled.View`
    position: relative;
`;

const ProfileImage = styled.Image`
    width: ${width * 0.3}px;
    height: ${width * 0.3}px;
    border-radius: ${width * 0.15}px;
`;

const EditButton = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    bottom: 0;
    width: ${width * 0.09}px;
    height: ${width * 0.09}px;
    border-radius: ${width * 0.045}px;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const EditIconImage = styled.Image`
    width: ${width * 0.045}px;
    height: ${width * 0.045}px;
    tint-color: #FFFFFF;
`;

const InputSection = styled.View`
    margin-bottom: ${width * 0.05}px;
`;

const InputLabelRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${width * 0.025}px;
`;

const InputLabel = styled(PtdBText)`
    font-size: ${width * 0.038}px;
    color: ${colors.black};
`;

const RequiredMark = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: #FF6B6B;
    margin-left: 2px;
`;

const NicknameInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #F8F8F8;
    border-radius: 25px;
    padding-horizontal: ${width * 0.05}px;
    height: ${width * 0.13}px;
`;

const NicknameInput = styled.TextInput`
    flex: 1;
    font-size: ${width * 0.038}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    padding: 0;
`;

const CheckButtonInline = styled.TouchableOpacity`
    padding-horizontal: ${width * 0.02}px;
`;

const CheckButtonText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: #999999;
`;

const GenderRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.03}px;
`;

const GenderButton = styled.TouchableOpacity`
    flex: 1;
    height: ${width * 0.13}px;
    background-color: #FFFFFF;
    border-width: 1px;
    border-color: ${props => props.selected ? colors.primary : '#E5E5E5'};
    border-radius: 25px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: ${width * 0.05}px;
`;

const GenderText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: ${props => props.selected ? colors.black : '#999999'};
`;

const GenderIcon = styled.Image`
    width: ${width * 0.08}px;
    height: ${width * 0.08}px;
`;

const BirthdayRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width * 0.02}px;
`;

const BirthdayFieldWithLabel = styled.View`
    flex-direction: row;
    align-items: center;
`;

const BirthdayInput = styled.TextInput`
    width: ${width * 0.22}px;
    height: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    text-align: center;
    font-size: ${width * 0.038}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
`;

const BirthdayInputSmall = styled.TextInput`
    width: ${width * 0.15}px;
    height: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    text-align: center;
    font-size: ${width * 0.038}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
`;

const DateInput = styled.TouchableOpacity`
    width: ${width * 0.22}px;
    height: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

const DateInputSmall = styled.TouchableOpacity`
    width: ${width * 0.15}px;
    height: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

const DateInputText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: ${colors.black};
`;

const BirthdayLabel = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${colors.black};
    margin-left: ${width * 0.015}px;
    margin-right: ${width * 0.02}px;
`;

const BirthdayField = styled.View`
    flex: 1;
`;

const MbtiRow = styled.View`
    flex-direction: row;
    gap: ${width * 0.025}px;
`;

const MbtiField = styled.View`
    width: ${width * 0.18}px;
`;

const DropdownButton = styled.TouchableOpacity`
    height: ${width * 0.12}px;
    background-color: #F8F8F8;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: ${width * 0.04}px;
`;

const DropdownText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${props => props.selected ? colors.black : '#CCCCCC'};
`;

const DropdownArrow = styled(PtdText)`
    font-size: ${width * 0.025}px;
    color: #CCCCCC;
`;

const HashtagLabelRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${width * 0.025}px;
`;

const HashtagLabelWithInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const InfoIcon = styled.View`
    width: ${width * 0.045}px;
    height: ${width * 0.045}px;
    border-radius: ${width * 0.0225}px;
    background-color: #CCCCCC;
    justify-content: center;
    align-items: center;
    margin-left: ${width * 0.02}px;
`;

const InfoText = styled(PtdText)`
    font-size: ${width * 0.03}px;
    color: #FFFFFF;
`;

const HashtagCount = styled(PtdText)`
    font-size: ${width * 0.032}px;
    color: #999999;
`;

const HashtagInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #F8F8F8;
    border-radius: 25px;
    padding-horizontal: ${width * 0.05}px;
    height: ${width * 0.13}px;
`;

const HashtagPrefix = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #CCCCCC;
    margin-right: ${width * 0.01}px;
`;

const HashtagTextInput = styled.TextInput`
    flex: 1;
    font-size: ${width * 0.038}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    padding: 0;
`;

const HashtagList = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${width * 0.02}px;
    margin-top: ${width * 0.03}px;
`;

const HashtagChip = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #F8F8F8;
    border-radius: 20px;
    padding-horizontal: ${width * 0.035}px;
    padding-vertical: ${width * 0.02}px;
`;

const HashtagText = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: ${colors.black};
    margin-right: ${width * 0.015}px;
`;

const RemoveButton = styled.TouchableOpacity`
    width: ${width * 0.04}px;
    height: ${width * 0.04}px;
    border-radius: ${width * 0.02}px;
    background-color: #CCCCCC;
    justify-content: center;
    align-items: center;
`;

const RemoveIcon = styled(PtdText)`
    font-size: ${width * 0.025}px;
    color: #FFFFFF;
    line-height: ${width * 0.025}px;
`;

const ButtonContainer = styled.View`
    padding-horizontal: ${width * 0.06}px;
    padding-top: ${width * 0.03}px;
    padding-bottom: ${width * 0.08}px;
    background-color: #FFFFFF;
`;

const SaveButton = styled.TouchableOpacity`
    height: ${width * 0.14}px;
    background-color: ${props => props.disabled ? '#E5E5E5' : colors.primary};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${width * 0.03}px;
`;

const SaveButtonText = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${props => props.disabled ? '#999999' : '#FFFFFF'};
`;

const PreviewButton = styled.TouchableOpacity`
    height: ${width * 0.14}px;
    background-color: #F8F8F8;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

const PreviewButtonText = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
`;

// 모달 스타일
const ModalOverlay = styled.TouchableOpacity`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;

const ModalContent = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: ${width * 0.05}px;
    max-height: 50%;
`;

const ModalTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    text-align: center;
    margin-bottom: ${width * 0.04}px;
`;

const ModalOption = styled.TouchableOpacity`
    padding-vertical: ${width * 0.04}px;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
`;

const ModalOptionText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    text-align: center;
`;

// 프로필 사진 수정 모달 스타일
const PhotoModalOverlay = styled.TouchableOpacity`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const PhotoModalContent = styled.View`
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: ${width * 0.08}px;
    width: ${width * 0.85}px;
`;

const PhotoModalTitle = styled(PtdBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    text-align: center;
    margin-bottom: ${width * 0.03}px;
`;

const PhotoModalSubtitle = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: #999999;
    text-align: center;
    line-height: ${width * 0.055}px;
    margin-bottom: ${width * 0.06}px;
`;

const PhotoModalOption = styled.TouchableOpacity`
    padding-vertical: ${width * 0.045}px;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
`;

const PhotoModalOptionText = styled(PtdText)`
    font-size: ${width * 0.042}px;
    color: ${colors.black};
    text-align: center;
`;

const PhotoModalOptionTextRed = styled(PtdText)`
    font-size: ${width * 0.042}px;
    color: #FF6B6B;
    text-align: center;
`;

const PhotoModalOptionTextPrimary = styled(PtdText)`
    font-size: ${width * 0.042}px;
    color: ${colors.primary};
    text-align: center;
`;

const PhotoModalCancel = styled.TouchableOpacity`
    padding-vertical: ${width * 0.045}px;
    margin-top: ${width * 0.02}px;
`;

const PhotoModalCancelText = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #999999;
    text-align: center;
`;

export default ProfileEditScreen;
