import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MypageScreen from '../screens/mypage/MypageScreen';
import ProfilePreviewScreen from '../screens/mypage/ProfilePreviewScreen';
import ProfileEditScreen from '../screens/mypage/ProfileEditScreen';
import ConnectionRequestsScreen from '../screens/mypage/ConnectionRequestsScreen';
import SentConnectionsScreen from '../screens/mypage/SentConnectionsScreen';

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
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="ConnectionRequestsScreen" component={ConnectionRequestsScreen} />
      <Stack.Screen name="SentConnectionsScreen" component={SentConnectionsScreen} />
    </Stack.Navigator>
  );
};

export default MypageStackNavigator;