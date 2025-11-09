const BASE_URL = ''; //기본 API URL

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

  SURVEY: {

  },

  MATCH: {

  },

};