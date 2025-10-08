import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';

import HomeScreen from "../screens/home/HomeScreen";
import MypageScreen from "../screens/mypage/MypageScreen";

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');

const TabNavigator = () => {
  return(
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
            height: height * 0.08,
            paddingTop: height * 0.01,
            },
            tabBarIcon: ({ focused, size }) => {
            let Icon = HomeGray;
            switch (route.name) {
                case 'Home':
                Icon = focused ? HomeBlack : HomeGray;
                break;
                case 'Snap':
                Icon = focused ? SnapBlack : SnapGray;
                break;
                case 'Mypage':
                Icon = focused ? MypageBlack : MypageGray;
                break;
            }
            return <Icon width={size} height={size} />;
            },
        })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Mypage" component={MypageScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;