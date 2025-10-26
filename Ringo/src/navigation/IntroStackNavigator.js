import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/intro/LoginScreen";
import TermsScreen from "../screens/intro/TermsScreen";
import PhoneVerificationScreen from "../screens/intro/PhoneVerificationScreen";
import IdInputScreen from "../screens/intro/IdInputScreen";
import PasswordInputScreen from "../screens/intro/PasswordInputScreen";
import PasswordConfirmScreen from "../screens/intro/PasswordConfirmScreen";
import SurveyIntroScreen from "../screens/intro/SurveyIntroScreen";
import ProfileFormScreen from "../screens/profile-form/ProfileFormScreen";
import NicknameInputScreen from "../screens/profile-form/NicknameInputScreen";
import LocationSelectScreen from "../screens/profile-form/LocationSelectScreen";
import InfoInputScreen from "../screens/profile-form/InfoInputScreen";
import PreferenceInputScreen from "../screens/profile-form/PreferenceInputScreen";
import IntroductionScreen from "../screens/profile-form/IntroductionScreen";
import HashtagInputScreen from "../screens/profile-form/HashtagInputScreen";

const Stack = createNativeStackNavigator();

const IntroStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: '로그인' }}
            />
            <Stack.Screen
                name="TermsScreen"
                component={TermsScreen}
                options={{ title: '약관동의' }}
            />
            <Stack.Screen
                name="PhoneVerificationScreen"
                component={PhoneVerificationScreen}
                options={{ title: '휴대폰 본인인증' }}
            />
            <Stack.Screen
                name="IdInputScreen"
                component={IdInputScreen}
                options={{ title: '아이디 입력' }}
            />
            <Stack.Screen
                name="PasswordInputScreen"
                component={PasswordInputScreen}
                options={{ title: '비밀번호 입력' }}
            />
            <Stack.Screen
                name="PasswordConfirmScreen"
                component={PasswordConfirmScreen}
                options={{ title: '비밀번호 확인' }}
            />
            <Stack.Screen
                name="SurveyIntroScreen"
                component={SurveyIntroScreen}
                options={{ title: '설문 안내' }}
            />
            <Stack.Screen
                name="ProfileFormScreen"
                component={ProfileFormScreen}
                options={{ title: '프로필 입력' }}
            />
            <Stack.Screen
                name="NicknameInputScreen"
                component={NicknameInputScreen}
                options={{ title: '닉네임 입력' }}
            />
            <Stack.Screen
                name="LocationSelectScreen"
                component={LocationSelectScreen}
                options={{ title: '활동 지역 선택' }}
            />
            <Stack.Screen
                name="InfoInputScreen"
                component={InfoInputScreen}
                options={{ title: '정보 입력' }}
            />
            <Stack.Screen
                name="PreferenceInputScreen"
                component={PreferenceInputScreen}
                options={{ title: "취향 입력" }}
            />
            <Stack.Screen
                name="IntroductionScreen"
                component={IntroductionScreen}
                options={{ title: "소개 입력" }}
            />
            <Stack.Screen
                name="HashtagInputScreen"
                component={HashtagInputScreen}
                options={{ title: "해시태그 입력" }}
            />
        </Stack.Navigator>
    );
};

export default IntroStackNavigator;

