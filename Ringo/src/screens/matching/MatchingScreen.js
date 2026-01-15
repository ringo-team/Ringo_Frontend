import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native';
import colors from "../../constants/colors";
import config from "../../constants/config";
import { PtdBText } from "../../components/CustomText";

// 기본 이미지
const DefaultProfileImage = require('../../assets/imgs/boy_profile_image.png');

const { width, height } = Dimensions.get('window');

const MatchingScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [targetUserId, setTargetUserId] = useState(13);

  // userId의 프로필 정보 조회
  const fetchUserProfile = async () => {

    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        console.log('저장된 토큰이 없습니다.');
        setIsLoading(false);
        return;
      }

      const tokenData = JSON.parse(credentials.password);
      const { accessToken } = tokenData;

      // 프로필 정보 조회
      console.log('API 호출:', config.USER.GET_OTHER_PROFILE(targetUserId));
      const profileResponse = await fetch(config.USER.GET_OTHER_PROFILE(targetUserId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const result = await profileResponse.json();
      console.log('프로필 응답 status:', profileResponse.status);
      console.log('프로필 정보:', JSON.stringify(result));

      if (profileResponse.ok && result.result === '0000') {
        setUserData(result);
      } else {
        console.log('프로필 조회 실패:', profileResponse.status, result);
      }

    } catch (error) {
      console.error('프로필 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // 나이 계산
  const calculateAge = (birthday) => {
    if (!birthday) return '';
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // 성별 변환
  const getGenderLabel = (gender) => {
    return gender === 'MALE' ? '남' : gender === 'FEMALE' ? '여' : '';
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>매칭</HeaderTitle>
      </Header>

      <ContentContainer>
        {/* 프로필 카드 - ConnectionRequestsScreen과 동일한 디자인 */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('OtherProfile', { userId: targetUserId })}
        >
          <CardContainer>
            <CardImageContainer>
              <CardImage source={userData?.profile ? { uri: userData.profile } : DefaultProfileImage} />
              <CardOverlay>
                <CardGradient />
                <CardContent>
                  <UserName>
                    {userData?.nickname || '사용자'} ({calculateAge(userData?.birthday)}세 {getGenderLabel(userData?.gender)})
                  </UserName>
                  <TagsText>
                    {userData?.hashtags?.map(tag => `#${tag}`).join(' ') || ''}
                  </TagsText>
                </CardContent>
              </CardOverlay>
            </CardImageContainer>
          </CardContainer>
        </TouchableOpacity>
      </ContentContainer>
    </Container>
  );
};

export default MatchingScreen;

const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Header = styled.View`
    padding: ${width * 0.05}px;
    padding-top: ${height * 0.07}px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;
`;

const HeaderTitle = styled(PtdBText)`
    font-size: ${width * 0.045}px;
    color: ${colors.black};
`;

const ContentContainer = styled.View`
    flex: 1;
    background-color: #f8f8f8;
    padding: ${width * 0.05}px;
    align-items: center;
    justify-content: center;
`;

const CardContainer = styled.View`
    width: ${(width - width * 0.12) / 2}px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    border-width: 1px;
    border-color: #f0f0f0;
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
`;

const VerifiedIcon = styled.Text`
    color: #007AFF;
    font-size: ${width * 0.03}px;
    margin-left: ${width * 0.01}px;
`;