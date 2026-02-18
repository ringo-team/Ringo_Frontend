const BASE_URL = "http://10.0.2.2:8080";
 //기본 API URL

const config = {
  API_URL: BASE_URL,

  AUTH: {
    LOGIN: `${BASE_URL}/login`, //로그인
    LOGOUT: `${BASE_URL}/logout`, //로그아웃
    TOKEN: `${BASE_URL}/refresh`, //토큰 갱신(refresh))
    DELETE: `${BASE_URL}/users/:id`, //회원 탈퇴
    FIND_ID: `${BASE_URL}/users/find-id`, //아이디 찾기
    RESET_PASSWORD: `${BASE_URL}/users/reset-password`, //비밀번호 재발급
  },

  PROFILE: {

  },

  SNAP: {

  },

  CHAT: {
    MAKE: `${BASE_URL}/chatrooms`, //채팅방 생성
    DELETE: (roomId) => `${BASE_URL}/chatrooms/${roomId}`, //채팅방 삭제
    MESSAGE_CALL: (roomId) => `${BASE_URL}/chatrooms/${roomId}/messages`,//채팅방 메세지 불러오기
    ROOM_CALL: (userId) => `${BASE_URL}/users/${userId}/chatrooms`, //사용자 채팅방 불러오기
    MEMBER_INFO: (chatroomId) => `${BASE_URL}/chatrooms/${chatroomId}/member-info`, //채팅방 멤버 정보(프로필, 해시태그)
  },

  SURVEY: {

  },

  MATCH: {

  },

};

export default config;