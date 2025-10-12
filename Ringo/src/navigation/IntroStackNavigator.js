import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/intro/LoginScreen";
import TermsScreen from "../screens/intro/TermsScreen";
import PhoneVerificationScreen from "../screens/intro/PhoneVerificationScreen";
import IdInputScreen from "../screens/intro/IdInputScreen";

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

        </Stack.Navigator>
    );
};

export default IntroStackNavigator;
