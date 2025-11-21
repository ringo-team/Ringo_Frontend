import React from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from "react-native";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <CoinContainer>
            <CoinIcon>🪙</CoinIcon>
            <CoinText>50</CoinText>
          </CoinContainer>
        </Header>

        <MainContent>
          <SectionTitle>오늘의 질문 답하기</SectionTitle>
          <SectionSubtitle>답변이 쌓일 수록 나와 맞는 사람을 추천해줄요!</SectionSubtitle>

          <QuestionCard>
            <QuestionNumber>3/5</QuestionNumber>
            <QuestionText>
              커피 맛보다 공간의 조용함과 좌석{"\n"}
              구조가 내 취향을 결정한다
            </QuestionText>
            <OptionContainer>
              <Option>
                <OptionCircle />
                <OptionText>매우 아니다</OptionText>
              </Option>
              <Option>
                <OptionCircle />
                <OptionText>아니다</OptionText>
              </Option>
              <Option>
                <OptionCircle />
                <OptionText>보통이다</OptionText>
              </Option>
              <Option>
                <OptionCircle />
                <OptionText>그렇다</OptionText>
              </Option>
              <Option>
                <OptionCircle selected />
                <OptionText>매우 그렇다</OptionText>
              </Option>
            </OptionContainer>

            <NavigationContainer>
              <NavButton>
                <NavText>← 이전</NavText>
              </NavButton>
              <NavButton>
                <NavText>다음 →</NavText>
              </NavButton>
            </NavigationContainer>

            <CompleteButton>
              <CompleteButtonText>완료</CompleteButtonText>
            </CompleteButton>
          </QuestionCard>
        </MainContent>

        <EventSection>
          <EventHeader>
            <EventTitle>이벤트</EventTitle>
          </EventHeader>
          <EventCard>
            <EventImage />
            <EventContent>
              <EventSubtitle>새로님을 위한 추천</EventSubtitle>
              <EventMainTitle>카페 세녁</EventMainTitle>
              <EventLocation>서울시 동작구 어머구동</EventLocation>
            </EventContent>
          </EventCard>
        </EventSection>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${width * 0.04}px;
  padding-top: ${width * 0.12}px;
`;

const CoinContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  padding: ${width * 0.02}px ${width * 0.04}px;
  border-radius: ${width * 0.05}px;
`;

const CoinIcon = styled(PtdText)`
  font-size: ${width * 0.04}px;
  margin-right: ${width * 0.01}px;
`;

const CoinText = styled(PtdBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;

const MainContent = styled.View`
  padding: ${width * 0.06}px;
`;

const SectionTitle = styled(PtdBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.02}px;
`;

const SectionSubtitle = styled(PtdText)`
  font-size: ${width * 0.035}px;
  color: #666;
  margin-bottom: ${width * 0.06}px;
`;

const QuestionCard = styled.View`
  background-color: #FFFFFF;
  border-radius: ${width * 0.04}px;
  padding: ${width * 0.06}px;
  border: 1px solid #E0E0E0;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const QuestionNumber = styled(PtdText)`
  font-size: ${width * 0.035}px;
  color: #666;
  margin-bottom: ${width * 0.04}px;
`;

const QuestionText = styled(PtdBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.06}px;
  line-height: ${width * 0.06}px;
`;

const OptionContainer = styled.View`
  margin-bottom: ${width * 0.06}px;
`;

const Option = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${width * 0.03}px;
`;

const OptionCircle = styled.View`
  width: ${width * 0.05}px;
  height: ${width * 0.05}px;
  border-radius: ${width * 0.025}px;
  border: 2px solid ${props => props.selected ? '#14C871' : '#E0E0E0'};
  background-color: ${props => props.selected ? '#14C871' : 'transparent'};
  margin-right: ${width * 0.03}px;
`;

const OptionText = styled(PtdText)`
  font-size: ${width * 0.035}px;
  color: ${colors.black};
`;

const NavigationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${width * 0.04}px;
`;

const NavButton = styled.TouchableOpacity``;

const NavText = styled(PtdText)`
  font-size: ${width * 0.035}px;
  color: #666;
`;

const CompleteButton = styled.TouchableOpacity`
  background-color: #14C871;
  padding: ${width * 0.03}px ${width * 0.08}px;
  border-radius: ${width * 0.06}px;
  align-self: center;
`;

const CompleteButtonText = styled(PtdBText)`
  color: #FFFFFF;
  font-size: ${width * 0.035}px;
`;

const EventSection = styled.View`
  padding: ${width * 0.06}px;
  background-color: #F8F8F8;
`;

const EventHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${width * 0.04}px;
`;

const EventTitle = styled(PtdBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;

const EventCard = styled.View`
  background-color: #FFFFFF;
  border-radius: ${width * 0.03}px;
  overflow: hidden;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const EventImage = styled.View`
  width: 100%;
  height: ${width * 0.4}px;
  background-color: #E0E0E0;
`;

const EventContent = styled.View`
  padding: ${width * 0.04}px;
`;

const EventSubtitle = styled(PtdText)`
  font-size: ${width * 0.03}px;
  color: #666;
  margin-bottom: ${width * 0.01}px;
`;

const EventMainTitle = styled(PtdBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.01}px;
`;

const EventLocation = styled(PtdText)`
  font-size: ${width * 0.03}px;
  color: #666;
`; 