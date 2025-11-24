import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MypageScreen from '../screens/mypage/MypageScreen';
import ProfilePreviewScreen from '../screens/mypage/ProfilePreviewScreen';

const Stack = createNativeStackNavigator();

const MypageStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MypageMain" component={MypageScreen} />
      <Stack.Screen name="ProfilePreview" component={ProfilePreviewScreen} />
    </Stack.Navigator>
  );
};

export default MypageStackNavigator;