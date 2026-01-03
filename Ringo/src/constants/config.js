export const BASE_URL = 'http://localhost:8080'; //기본 API URL

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

  SIGNUP: {
    CHECK_LOGIN_ID: `${BASE_URL}/signup/check-loginId`, //아이디 중복 확인
    CHECK_NICKNAME: `${BASE_URL}/signup/check-nickname`, //닉네임 중복 확인
    REGISTER: `${BASE_URL}/signup`, //회원가입
    USER_INFO: `${BASE_URL}/signup/user-info`, //프로필 정보 저장
  },

  PROFILE: {
    UPLOAD: `${BASE_URL}/profiles`, //프로필 사진 업로드
  },

  SNAP: {

  },

  SURVEY: {

  },

  MATCH: {

  },

};

export default config;