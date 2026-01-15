import React from "react";
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../constants/colors";
import BackButton from "../components/BackButton";

import LoginScreen from "../screens/intro/LoginScreen";
import TermsScreen from "../screens/intro/TermsScreen";
import PhoneVerificationScreen from "../screens/intro/PhoneVerificationScreen";
import IdInputScreen from "../screens/intro/IdInputScreen";
import PasswordInputScreen from "../screens/intro/PasswordInputScreen";
import SurveyIntroScreen from "../screens/intro/SurveyIntroScreen";
import ProfileFormScreen from "../screens/profile-form/ProfileFormScreen";
import NicknameInputScreen from "../screens/profile-form/NicknameInputScreen";
import LocationSelectScreen from "../screens/profile-form/LocationSelectScreen";
import InfoInputScreen from "../screens/profile-form/InfoInputScreen";
import PreferenceInputScreen from "../screens/profile-form/PreferenceInputScreen";
import MBTIInputScreen from "../screens/profile-form/MBTIInputScreen";
import IntroductionScreen from "../screens/profile-form/IntroductionScreen";
import HashtagInputScreen from "../screens/profile-form/HashtagInputScreen";
import PhotoUploadScreen from "../screens/profile-form/PhotoUploadScreen";
import FeedPhotoUploadScreen from "../screens/profile-form/FeedPhotoUploadScreen";
import FeedDescriptionScreen from "../screens/profile-form/FeedDescriptionScreen";

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const IntroStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: true,
                headerStyle: {
                    elevation: 0,
                },
                headerTitleStyle: {
                    marginTop: height * 0.03,
                    fontSize: width * 0.05,
                    fontFamily: 'Pretendard-Bold',
                    color: colors.black,
                },
                headerLeft: () =>
                    route.name !== 'LoginScreen' ? (
                        <BackButton onPress={() => navigation.goBack()} />
                    ) : null,
                title: '',
                headerTransparent: true,
            })}
        >
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TermsScreen"
                component={TermsScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="PhoneVerificationScreen"
                component={PhoneVerificationScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="IdInputScreen"
                component={IdInputScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="PasswordInputScreen"
                component={PasswordInputScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="SurveyIntroScreen"
                component={SurveyIntroScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProfileFormScreen"
                component={ProfileFormScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="NicknameInputScreen"
                component={NicknameInputScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="LocationSelectScreen"
                component={LocationSelectScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="InfoInputScreen"
                component={InfoInputScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="PreferenceInputScreen"
                component={PreferenceInputScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="MBTIInputScreen"
                component={MBTIInputScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="IntroductionScreen"
                component={IntroductionScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="HashtagInputScreen"
                component={HashtagInputScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="PhotoUploadScreen"
                component={PhotoUploadScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="FeedPhotoUploadScreen"
                component={FeedPhotoUploadScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="FeedDescriptionScreen"
                component={FeedDescriptionScreen}
                options={{ title: "" }}
            />
        </Stack.Navigator>
    );
};

export default IntroStackNavigator;