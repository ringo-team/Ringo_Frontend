import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import colors from "../../constants/colors";
import config from "../../constants/config";
import { PtdText, PtdBText } from "../../components/CustomText";

// Icons
import BellReceiveIcon from "../../assets/imgs/icons/mypage/bell_receive.png";
import HeartSendIcon from "../../assets/imgs/icons/mypage/heart_send.png";
import PencilEditIcon from "../../assets/imgs/icons/mypage/pencil_edit.png";
import EditServeyIcon from "../../assets/imgs/icons/mypage/edit_servey.png";
import OptionIcon from "../../assets/imgs/icons/mypage/option.png";
import BlockIcon from "../../assets/imgs/icons/mypage/block.png";
import NotificationIcon from "../../assets/imgs/icons/mypage/notification.png";
import QuestionIcon from "../../assets/imgs/icons/mypage/question.png";

// Profile Image
import GirlProfileImage from "../../assets/imgs/girl_profile_image.png";

const { width, height } = Dimensions.get('window');

// 음주/흡연/종교 변환 함수
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

const getGenderLabel = (value) => {
  return value === 'MALE' ? '남성' : value === 'FEMALE' ? '여성' : value;
};

const MypageScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 프로필 정보 조회
  const fetchProfile = async () => {
    try {
      // 저장된 토큰 가져오기
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        console.log('저장된 토큰이 없습니다.');
        setIsLoading(false);
        return;
      }

      const tokenData = JSON.parse(credentials.password);
      const accessToken = tokenData.accessToken;

      const response = await fetch(config.USER.GET_PROFILE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      console.log('프로필 정보 조회 응답:', data);

      if (response.ok) {
        setProfileData(data);
      } else {
        console.error('프로필 조회 실패:', data);
      }
    } catch (error) {
      console.error('프로필 조회 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
        <BackButton>
          <BackButtonText>‹</BackButtonText>
        </BackButton>
      </Header>

      <ProfileSection>
        <ProfileImageContainer>
          {profileData?.profile ? (
            <ProfileImage source={{ uri: profileData.profile }} />
          ) : (
            <ProfileImage source={GirlProfileImage} />
          )}
        </ProfileImageContainer>
        <ProfileInfo>
          <ProfileName>{profileData?.nickname || '닉네임'}</ProfileName>
          <ProfileDescription>
            {profileData?.job || ''} {profileData?.height ? `· ${profileData.height}cm` : ''}
          </ProfileDescription>
          <VerificationLink>본인 인증하러 가기</VerificationLink>
        </ProfileInfo>
      </ProfileSection>

      <PointSection>
        <PointRow>
          <PointLabelContainer>
            <PointLabel>나의 링포인트  </PointLabel>
            <PointValue>2000 P</PointValue>
          </PointLabelContainer>
          <PointButton>
            <PointButtonText>포인트 충전하기</PointButtonText>
          </PointButton>
        </PointRow>
      </PointSection>

      <StatsSection>
        <StatCard style={{ backgroundColor: '#F3E8FF' }} onPress={() => navigation.navigate('ConnectionRequestsScreen')}>
          <StatIconContainer>
            <StatIcon source={BellReceiveIcon} />
          </StatIconContainer>
          <StatInfo>
            <StatLabel>나에게 온 연결신청</StatLabel>
            <StatNumber style={{ color: '#8B5CF6' }}>6</StatNumber>
          </StatInfo>
        </StatCard>
        <StatCard style={{ backgroundColor: '#EEF2FF' }} onPress={() => navigation.navigate('SentConnectionsScreen')}>
          <StatIconContainer>
            <StatIcon source={HeartSendIcon} />
          </StatIconContainer>
          <StatInfo>
            <StatLabel>내가 보낸 연결신청</StatLabel>
            <StatNumber style={{ color: '#6366F1' }}>4</StatNumber>
          </StatInfo>
        </StatCard>
      </StatsSection>

      <Divider />

      <MenuSection>
        <MenuItem>
          <MenuIcon source={PencilEditIcon} />
          <MenuText>프로필 정보 수정</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon source={EditServeyIcon} />
          <MenuText>답변 수정하기</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon source={OptionIcon} />
          <MenuText>설정 및 계정 관리</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon source={BlockIcon} />
          <MenuText>지인 차단</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon source={NotificationIcon} />
          <MenuText>공지사항</MenuText>
        </MenuItem>
        <MenuItem>
          <MenuIcon source={QuestionIcon} />
          <MenuText>문의하기</MenuText>
        </MenuItem>
      </MenuSection>

      <ProfilePreviewButton onPress={() => navigation.navigate('ProfilePreview')}>
        <ProfilePreviewButtonText>프로필 미리보기</ProfilePreviewButtonText>
      </ProfilePreviewButton>
    </Container>
  );
};

export default MypageScreen;

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  position: relative;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${width * 0.04}px;
  padding-top: ${height * 0.06}px;
`;

const BackButton = styled.TouchableOpacity`
  padding: ${width * 0.02}px;
`;

const BackButtonText = styled(PtdText)`
  font-size: ${width * 0.08}px;
  color: ${colors.black};
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${width * 0.04}px;
`;

const ProfileImageContainer = styled.View`
  margin-right: ${width * 0.04}px;
`;

const ProfileImage = styled.Image`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  border-radius: ${width * 0.15}px;
`;

const ProfileInfo = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const ProfileName = styled(PtdBText)`
  font-size: ${width * 0.055}px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: ${width * 0.04}px;
`;

const ProfileDescription = styled(PtdText)`
  font-size: ${width * 0.03}px;
  color: #666;
  text-align: left;
  margin-bottom: ${width * 0.01}px;
`;

const VerificationLink = styled(PtdText)`
  font-size: ${width * 0.03}px;
  color: #666;
  text-align: left;
  text-decoration-line: underline;
`;

const PointSection = styled.View`
  background-color: #F8F9FA;
  margin: ${width * 0.04}px;
  padding: ${width * 0.04}px;
  border-radius: ${width * 0.03}px;
  margin-bottom: ${width * 0.03}px;
`;

const PointLabel = styled(PtdText)`
  font-size: ${width * 0.04}px;
  color: #666;
`;

const PointLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PointRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PointValue = styled(PtdBText)`
  font-size: ${width * 0.04}px;
  font-weight: bold;
  color: ${colors.black};
`;

const PointButton = styled.TouchableOpacity`
`;

const PointButtonText = styled(PtdText)`
  font-size: ${width * 0.032}px;
  font-weight: bold;
  color: #666;
  text-decoration-line: underline;
`;

const StatsSection = styled.View`
  flex-direction: row;
  padding: 0 ${width * 0.04}px;
  gap: ${width * 0.03}px;
  margin-bottom: ${width * 0.03}px;
`;

const StatCard = styled.TouchableOpacity`
  flex: 1;
  height: ${(width / 2) * 0.45}px;
  padding: ${width * 0.045}px ${width * 0.04}px;
  border-radius: ${width * 0.04}px;
  flex-direction: column;
  justify-content: space-between;
`;

const StatIconContainer = styled.View`
  justify-content: flex-start;
`;

const StatIconBg = styled.View`
  width: ${width * 0.12}px;
  height: ${width * 0.12}px;
  border-radius: ${width * 0.06}px;
  align-items: center;
  justify-content: center;
`;

const StatIcon = styled.Image`
  width: ${width * 0.055}px;
  height: ${width * 0.055}px;
  resize-mode: contain;
`;

const StatInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled(PtdText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  font-weight: 600;
  line-height: ${width * 0.043}px;
`;

const StatNumber = styled(PtdBText)`
  font-size: ${width * 0.045}px;
  font-weight: 600;
`;

const Divider = styled.View`
  height: 4px;
  background-color: #F5F5F5;
  margin: ${width * 0.04}px 0 0 0;
`;

const MenuSection = styled.View`
  padding: ${width * 0.04}px;
  margin-bottom: ${width * 0.02}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${width * 0.03}px 0;
`;

const MenuIcon = styled.Image`
  width: ${width * 0.06}px;
  height: ${width * 0.06}px;
  margin-right: ${width * 0.04}px;
`;

const MenuText = styled(PtdText)`
  font-size: ${width * 0.04}px;
  font-weight: 600;
  color: ${colors.black};
`;

const ProfilePreviewButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${width * 0.08}px;
  right: ${width * 0.06}px;
  background-color: ${colors.black};
  border-radius: ${width * 0.08}px;
  padding: ${width * 0.04}px ${width * 0.06}px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ProfilePreviewButtonText = styled(PtdBText)`
  color: #FFFFFF;
  font-size: ${width * 0.04}px;
  font-weight: 600;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;