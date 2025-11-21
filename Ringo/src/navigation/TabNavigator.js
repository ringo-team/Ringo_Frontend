import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image } from 'react-native';

import HomeScreen from "../screens/home/HomeScreen";
import SnapScreen from "../screens/snap/SnapScreen";
import MatchingScreen from "../screens/matching/MatchingScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import MypageScreen from "../screens/mypage/MypageScreen";

// Tab icons
import TabHomeIcon from "../assets/imgs/icons/tab/tab_home.png";
import TabSnapIcon from "../assets/imgs/icons/tab/tab_snap.png";
import TabMatchingIcon from "../assets/imgs/icons/tab/tab_matching.png";
import TabChatIcon from "../assets/imgs/icons/tab/tab_chat.png";
import TabMypageIcon from "../assets/imgs/icons/tab/tab_mypage.png";

const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window');

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: height * 0.08,
          paddingTop: height * 0.01,
          paddingBottom: height * 0.01,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          const iconSize = width * 0.06;

          switch (route.name) {
            case 'Home':
              iconSource = TabHomeIcon;
              break;
            case 'Snap':
              iconSource = TabSnapIcon;
              break;
            case 'Matching':
              iconSource = TabMatchingIcon;
              break;
            case 'Chat':
              iconSource = TabChatIcon;
              break;
            case 'Mypage':
              iconSource = TabMypageIcon;
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: iconSize,
                height: iconSize,
                opacity: focused ? 1 : 0.4,
                tintColor: focused ? '#14C871' : '#999999'
              }}
              resizeMode="contain"
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Matching" component={MatchingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Mypage" component={MypageScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;