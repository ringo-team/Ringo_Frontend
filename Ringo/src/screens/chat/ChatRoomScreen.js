import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../../constants/colors";
import { PtdText } from "../../components/CustomText";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";

const { width } = Dimensions.get("window");

const ChatRoomScreen = () => {
    const route = useRoute();
    const { chatroomId, name, profileImage: paramProfileImage, hashtags: paramHashtags, memberInfo } = route.params || {};
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [profileImage, setProfileImage] = useState(
      paramProfileImage || memberInfo?.profileUrl || null
    );
    const [hashtags, setHashtags] = useState(
      paramHashtags || memberInfo?.hashtag || []
    );

    const storageKey = `chat_messages_${chatroomId}`;

    useEffect(() => {
      const load = async () => {
        try {
          // load persisted messages
          const raw = await AsyncStorage.getItem(storageKey);
          if (raw) {
            const parsed = JSON.parse(raw);
            setMessages(parsed);
            return;
          }
          if (memberInfo && Array.isArray(memberInfo.messages) && memberInfo.messages.length) {
            setMessages(memberInfo.messages);
            await AsyncStorage.setItem(storageKey, JSON.stringify(memberInfo.messages));
            return;
          }
        } catch (e) {
          console.warn('Failed to load messages', e.message || e);
        }
      };

      load();
    }, [storageKey, memberInfo]);

    const isFirstChat = messages.length === 0;

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const now = new Date();

        const newMessage = {
            id: Date.now(),
            text,
            isMe: true,
            time: now.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: now.toDateString(),
        };

        try {
          setMessages((prev) => {
            const next = [...prev, newMessage];
            AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch((e) =>
              console.warn('Failed to save messages', e.message || e)
            );
            return next;
          });
        } catch (e) {
          console.warn('Failed to persist message', e.message || e);
        }

        setInput("");
    };

    return (
        <Wrapper>
            <Background />
            <Content>
                <TitleContainer>
                    <BackButton />
                </TitleContainer>
                <Header>
                      <ProfileImage
                        source={profileImage ? { uri: profileImage } : undefined}
                      />
                    <HeaderInfo>
                        <NameText>{name}</NameText>
                        <TagText>
                          {Array.isArray(hashtags) && hashtags.length
                            ? hashtags.map((h) => `#${h}`).join(' ')
                            : ''}
                        </TagText>
                    </HeaderInfo>
                    <ProfileButton>
                        <ProfileButtonText>프로필 보기</ProfileButtonText>
                    </ProfileButton>
                </Header>

            <Divider />

            <ConnectRow>
                <Line />
                <ConnectText>{name}님과 연결됐어요</ConnectText>
                <Line />
            </ConnectRow>

            <MessageArea>
            {messages.map((msg, index) => {
                const prevMessage = messages[index - 1];
                const showDate =
                index === 0 || prevMessage?.date !== msg.date;

                return (
                <React.Fragment key={msg.id}>
                    {showDate && (
                    <DateWrapper>
                        <DateText>
                        {new Date(msg.date).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                        </DateText>
                    </DateWrapper>
                    )}

                    <BubbleWrapper isMe={msg.isMe}>
                    <ChatBubble isMe={msg.isMe}>
                        <BubbleText isMe={msg.isMe}>{msg.text}</BubbleText>
                    </ChatBubble>
                    </BubbleWrapper>
                </React.Fragment>
                );
            })}
            </MessageArea>

            {isFirstChat && (
                <SuggestionArea>
                <StartTitle>이렇게 시작해보세요!</StartTitle>

                <SuggestionButton
                    onPress={() =>
                    setInput("안녕하세요! 매칭돼서 반가워요 😊")
                    }
                >
                    <SuggestionText>안녕하세요! 매칭돼서 반가워요 😊</SuggestionText>
                </SuggestionButton>

                <SuggestionButton
                    onPress={() =>
                    setInput("안녕하세요! 오늘 하루는 어떠셨어요?")
                    }
                >
                    <SuggestionText>안녕하세요! 오늘 하루는 어떠셨어요?</SuggestionText>
                </SuggestionButton>

                <SuggestionButton
                    onPress={() =>
                    setInput("매칭 감사해요! 편하게 이야기 나눠봐요 🤝")
                    }
                >
                    <SuggestionText>매칭 감사해요! 편하게 이야기 나눠봐요 🤝</SuggestionText>
                </SuggestionButton>
                </SuggestionArea>
            )}

            <InputArea>
                <StyledInput
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChangeText={setInput}
                />
                <SendButton onPress={() => sendMessage(input)}>
                <SendText>전송</SendText>
                </SendButton>
            </InputArea>
        </Content>
    </Wrapper>
  );
};

export default ChatRoomScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.08}px;
`;

const TitleContainer = styled.View`
  margin-bottom: ${width * 0.01}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const ProfileImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin-right: 12px;
`;

const HeaderInfo = styled.View`
  flex: 1;
`;

const NameText = styled(PtdText)`
  font-size: 17px;
  color: ${colors.black};
`;

const ProfileButton = styled.TouchableOpacity`
    flex-direction: row;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: ${colors.gray100};
`;

const ProfileButtonText = styled(PtdText)`
  font-size: 12px;
  color: ${colors.black};
`;

const TagText = styled(PtdText)`
  font-size: 13px;
  margin-top: 4px;
  color: ${colors.gray500};
`;

const Divider = styled.View`
  height:1px;
  background-color: ${colors.gray200};
  margin: 16px 0;
`;

const ConnectRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${colors.gray300};
`;

const ConnectText = styled(PtdText)`
  margin: 0 12px;
  font-size: 13px;
  color: ${colors.gray500};
`;

const MessageArea = styled.ScrollView`
  flex: 1;
`;

const DateWrapper = styled.View`
  align-items: center;
`;

const DateText = styled(PtdText)`
  font-size: 12px;
  color: ${colors.black};
  padding: 6px 12px;
`;

const BubbleWrapper = styled.View`
  align-items: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const ChatBubble = styled.View`
  max-width: 75%;
  padding: 12px 14px;
  border-radius: 16px;
  background-color: ${({ isMe }) =>
    isMe ? "#693BF2" : colors.gray100};
`;

const BubbleText = styled(PtdText)`
  font-size: 15px;
  color: ${({ isMe }) => (isMe ? "#FFFFFF" : colors.black)};
`;

const TimeTextBubble = styled(PtdText)`
  font-size: 11px;
  color: ${colors.gray400};
  margin-top: 4px;
`;

const SuggestionArea = styled.View`
  margin-bottom: 12px;
`;

const StartTitle = styled(PtdText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 12px;
`;

const SuggestionButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.primary};
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 8px;
`;

const SuggestionText = styled(PtdText)`
  font-size: 15px;
  text-align: center;
`;

const InputArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  border-width: 1px;
  border-color: ${colors.gray300};
  border-radius: 20px;
  padding: 10px 14px;
  font-size: 15px;
`;

const SendButton = styled.TouchableOpacity`
  margin-left: 8px;
  padding: 10px 14px;
`;

const SendText = styled(PtdText)`
  color: ${colors.primary};
  font-size: 15px;
`;