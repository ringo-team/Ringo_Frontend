import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Background from "../../components/Background";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get('window');

const HashtagInputScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const profileData = route.params || {}; // 이전 화면들에서 전달된 프로필 정보

    // 디버깅: 받은 데이터 확인
    console.log('=== HashtagInputScreen 디버깅 ===');
    console.log('전체 profileData:', JSON.stringify(profileData, null, 2));
    console.log('userId:', profileData.userId);
    console.log('registeredUserId:', profileData.registeredUserId);
    console.log('nickname:', profileData.nickname);
    console.log('address:', profileData.address);
    console.log('job:', profileData.job);
    console.log('=== 디버깅 끝 ===');

    const [hashtagInput, setHashtagInput] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    // 프로필 정보 서버 전송
    const submitProfileData = async () => {
        const userId = profileData.userId || profileData.registeredUserId;

        if (!userId) {
            console.log('사용자 ID 없음 - profileData:', profileData);
            Alert.alert('오류', '사용자 ID가 없습니다.');
            return;
        }

        console.log('사용할 userId:', userId);

        setIsLoading(true);

        try {
            const requestData = {
                id: userId,
                nickname: profileData.nickname,
                address: {
                    city: profileData.address?.city || '',
                    district: profileData.address?.district || ''
                },
                activeAddress: {
                    city: profileData.activeAddress?.city || profileData.address?.city || '',
                    district: profileData.activeAddress?.district || profileData.address?.district || ''
                },
                job: profileData.job,
                height: profileData.height,
                isSmoking: profileData.isSmoking,
                isDrinking: profileData.isDrinking,
                religion: profileData.religion,
                biography: profileData.biography,
                hashtags: hashtags
            };

            console.log('전송할 프로필 데이터:', requestData);

            const response = await fetch('http://localhost:8080/signup/user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('프로필 등록 성공:', result);

                Alert.alert(
                    '프로필 등록 완료',
                    '프로필이 성공적으로 등록되었습니다.',
                    [{
                        text: '확인',
                        onPress: () => navigation.navigate('PhotoUploadScreen', { ...profileData, hashtags })
                    }]
                );
            } else {
                const errorData = await response.json();
                Alert.alert('오류', errorData.message || '프로필 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('프로필 등록 오류:', error);
            Alert.alert('오류', '네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (hashtags.length > 0) {
            submitProfileData();
        }
    };

    const handleAddHashtag = () => {
        const trimmedInput = hashtagInput.trim();

        // 빈 입력이거나 이미 존재하는 해시태그면 추가하지 않음
        if (trimmedInput === '' || hashtags.includes(trimmedInput)) {
            setHashtagInput('');
            return;
        }

        // 글자수 체크 (10자 이하)
        if (trimmedInput.length > 10) {
            setHashtagInput('');
            return;
        }

        // 최대 10개까지만 추가
        if (hashtags.length < 5) {
            setHashtags([...hashtags, trimmedInput]);
            setHashtagInput('');
        }
    };

    const handleRemoveHashtag = (indexToRemove) => {
        setHashtags(hashtags.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter') {
            e.preventDefault();
            handleAddHashtag();
        }
    };

    const StepIndicator = ({ currentStep, totalSteps }) => {
        return (
            <Indicator>
                <IndicatorText>
                    {currentStep}
                    <DividerText> / {totalSteps} </DividerText>
                </IndicatorText>
            </Indicator>
        )
    };

    const isNextButtonActive = hashtags.length > 0 && !isLoading;

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <Title>프로필 입력</Title>
                </TitleContainer>

                <StepIndicator currentStep={7} totalSteps={9} />

                <MainTitle>
                    회원님을{"\n"}
                    표현할 해시태그를 입력해주세요
                </MainTitle>

                <SectionLabelRow>
                    <SectionLabel>해시태그</SectionLabel>
                    <InfoIcon>
                        <InfoText>?</InfoText>
                    </InfoIcon>
                </SectionLabelRow>

                <HashtagInputContainer>
                    <HashtagPrefix>#</HashtagPrefix>
                    <HashtagTextInput
                        value={hashtagInput}
                        onChangeText={setHashtagInput}
                        onKeyPress={handleKeyPress}
                        placeholder="보드게임"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType="done"
                        onSubmitEditing={handleAddHashtag}
                        editable={hashtags.length < 10}
                        maxLength={10}
                    />
                </HashtagInputContainer>

                {hashtags.length >= 10 && (
                    <LimitMessage>최대 10개까지 추가할 수 있습니다</LimitMessage>
                )}

                <HashtagScrollContainer>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {hashtags.length > 0 && (
                            <HashtagListWrapper>
                                {hashtags.map((tag, index) => (
                                    <HashtagChip key={index}>
                                        <HashtagText>#{tag}</HashtagText>
                                        <RemoveButton onPress={() => handleRemoveHashtag(index)}>
                                            <RemoveIcon>✕</RemoveIcon>
                                        </RemoveButton>
                                    </HashtagChip>
                                ))}
                            </HashtagListWrapper>
                        )}
                    </ScrollView>
                </HashtagScrollContainer>

                <ButtonContainer>
                    <CustomButton
                        title="이전"
                        isActive={true}
                        activeColor={colors.gray100}
                        onPress={handlePrevious}
                        style={{ height: width * 0.13, borderRadius: 12 }}
                    />

                    <CustomButton
                        title="다음"
                        disabled={!isNextButtonActive}
                        isActive={isNextButtonActive}
                        onPress={handleNext}
                        style={{ width: "85%", height: width * 0.13, borderRadius: 12 }}
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

const Indicator = styled.View`
    align-items: left;
    margin-bottom: ${width * 0.034}px;
`;

const IndicatorText = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
    font-weight: bold;
`;

const DividerText = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.gray100};
    font-weight: bold;
`;

const MainTitle = styled(PtdBText)`
    font-size: ${width * 0.06}px;
    color: ${colors.black};
    line-height: ${width * 0.09}px;
    margin-bottom: ${width * 0.06}px;
    font-weight: bold;
`;

const SectionLabelRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${width * 0.03}px;
`;

const SectionLabel = styled(PtdBText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
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

const HashtagInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: ${width * 0.04}px;
    height: ${width * 0.13}px;
`;

const HashtagPrefix = styled(PtdText)`
    font-size: ${width * 0.04}px;
    color: #CCCCCC;
    margin-right: ${width * 0.01}px;
`;

const HashtagTextInput = styled.TextInput`
    flex: 1;
    font-size: ${width * 0.04}px;
    font-family: 'Pretendard-Regular';
    color: ${colors.black};
    padding: 0;
`;

const LimitMessage = styled(PtdText)`
    font-size: ${width * 0.035}px;
    color: #FF6B6B;
    margin-top: ${width * 0.03}px;
`;

const HashtagScrollContainer = styled.View`
    flex: 1;
    margin-top: ${width * 0.05}px;
`;

const HashtagListWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${width * 0.03}px;
`;

const HashtagChip = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    border: 1px solid #14C871;
    border-radius: 20px;
    padding-horizontal: ${width * 0.04}px;
    padding-vertical: ${width * 0.025}px;
    margin-bottom: ${width * 0.03}px;
`;

const HashtagText = styled(PtdText)`
    font-size: ${width * 0.038}px;
    color: #14C871;
    margin-right: ${width * 0.02}px;
`;

const RemoveButton = styled.TouchableOpacity`
    width: ${width * 0.045}px;
    height: ${width * 0.045}px;
    border-radius: ${width * 0.0225}px;
    background-color: #CCCCCC;
    justify-content: center;
    align-items: center;
`;

const RemoveIcon = styled(PtdText)`
    font-size: ${width * 0.03}px;
    color: #FFFFFF;
    line-height: ${width * 0.03}px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    margin-top: auto;
    margin-bottom: ${width * 0.05}px;
`;

export default HashtagInputScreen;
