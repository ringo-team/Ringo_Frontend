import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "../../constants/colors";
import { PtdText, PtdBText } from "../../components/CustomText";

import { Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";

import CHATEMPTY from "../../assets/imgs/chat_empty.png";
import { DUMMY_CHAT_ROOMS } from "../../constants/ChatData";
import CustomButton from "../../components/CustomButton";

const { width } = Dimensions.get("window");

const ChatScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredRooms =
    activeTab === "ALL"
      ? DUMMY_CHAT_ROOMS
      : DUMMY_CHAT_ROOMS.filter((room) => room.unreadCount > 0);

  const isEmpty = filteredRooms.length === 0;

  const onPressChatRoom = (item) => {
    navigation.navigate("Chat", {
      screen: "ChatRoomScreen",
      params: {
        chatRoomId: item.id,
        name: item.name,
      },
    });
  };

  const renderItem = ({ item }) => {
    const isUnread = item.unreadCount > 0;

    return (
      <ChatRoom onPress={() => onPressChatRoom(item)}>
        <ProfileImage
          source={item.profileImage ? { uri: item.profileImage } : null}
        />

        <ChatInfo>
          <TopRow>
            <NameText>{item.name}</NameText>
            <TimeText>{item.updatedAt}</TimeText>
          </TopRow>

          <MessageText unread={isUnread} numberOfLines={1}>
            {item.lastMessage}
          </MessageText>
        </ChatInfo>

        {isUnread && (
          <UnreadBadge>
            <UnreadText>{item.unreadCount}</UnreadText>
          </UnreadBadge>
        )}
      </ChatRoom>
    );
  };

  return (
    <Wrapper>
      <Background />
      <Content>
        <TitleContainer>
          <Title>채팅</Title>
        </TitleContainer>
        <FilterRow>
          <FilterButton
            active={activeTab === "ALL"}
            onPress={() => setActiveTab("ALL")}
          >
            <FilterText active={activeTab === "ALL"}>전체</FilterText>
          </FilterButton>

          <FilterButton
            active={activeTab === "UNREAD"}
            onPress={() => setActiveTab("UNREAD")}
          >
            <FilterText active={activeTab === "UNREAD"}>안읽음</FilterText>

            {DUMMY_CHAT_ROOMS.filter((r) => r.unreadCount > 0).length > 0 && (
              <UnreadCountBadge>
                <UnreadCountText>
                  {DUMMY_CHAT_ROOMS.filter((r) => r.unreadCount > 0).length}
                </UnreadCountText>
              </UnreadCountBadge>
            )}
          </FilterButton>
        </FilterRow>

        {isEmpty ? (
          <EmptyWrapper>
            <ChatImage source={CHATEMPTY} />
            <EmptyContent>아직 연결된 사람이 없어요 :(</EmptyContent>
            <CustomButton
              title="보러가기"
              isActive={true}
              onPress={() => navigation.navigate("Home")}
              style={{ width: "25%", height: width * 0.09, borderRadius: 20, backgroundColor: colors.black, marginTop: 20 }}
            />
          </EmptyWrapper>
        ) : (
          <ChatList
            data={filteredRooms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </Content>
    </Wrapper>
  );
};

export default ChatScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.08}px;
`;

const TitleContainer = styled.View`
  margin-top: ${width * 0.1}px;
  margin-bottom: ${width * 0.07}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(PtdBText)`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.black};
`;

const FilterRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: ${({ active }) =>
    active ? colors.black : "#FFFFFF"};
  border-width: ${({ active }) => (active ? 0 : 1)}px;
  border-color: ${colors.gray100};
`;

const FilterText = styled(PtdBText)`
  font-size: 14px;
  color: ${({ active }) => (active ? "#FFFFFF" : colors.black)};
`;

const UnreadCountBadge = styled.View`
  background-color: #ff3b30;
  border-radius: 10px;
  padding: 2px 6px;
  margin-left: 6px;
`;

const UnreadCountText = styled(PtdBText)`
  font-size: 12px;
  color: #ffffff;
`;

const EmptyWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ChatImage = styled.Image`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  resize-mode: contain;
  margin-bottom: 16px;
`;

const EmptyContent = styled(PtdText)`
  font-size: 16px;
  color: ${colors.gray100};
`;

const ChatList = styled(FlatList)`
  margin-top: ${width * 0.02}px;
`;

const ChatRoom = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 14px 0;
`;

const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
  background-color: ${colors.gray200};
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const NameText = styled(PtdBText)`
  font-size: ${width * 0.04}px;
  margin-right: 8px;
  color: ${colors.black};
`;

const TimeText = styled(PtdText)`
  font-size: ${width * 0.032}px;
  color: ${colors.gray200};
`;

const MessageText = styled(PtdText)`
  font-size: 14px;
  color: ${({ unread }) => (unread ? colors.black : colors.gray200)};
  font-weight: ${({ unread }) => (unread ? "700" : "400")};
`;

const UnreadBadge = styled.View`
  background-color: #ff0000;
  border-radius: 10px;
  padding: 2px 6px;
`;

const UnreadText = styled(PtdText)`
  font-size: 12px;
  color: #ffffff;
`;