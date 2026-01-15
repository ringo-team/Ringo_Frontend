import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HomeScreen from "../screens/home/HomeScreen";
import IntroStackNavigator from "./IntroStackNavigator";
import OtherProfileScreen from "../screens/matching/OtherProfileScreen";

const Nav = createNativeStackNavigator();

const RootNavigator = () => {
  return (
  <Nav.Navigator
    initialRouteName="IntroStackNavigator"
    screenOptions={{ headerShown: false }}
  >
    <Nav.Screen name="HomeScreen" component={HomeScreen} />
    <Nav.Screen name="TabNavigator" component={TabNavigator} />
    <Nav.Screen 
        name="IntroStackNavigator" 
        component={IntroStackNavigator} 
        initialParams={{ screen: 'LoginScreen'}}
        />
    <Nav.Screen name="OtherProfile" component={OtherProfileScreen} />
  </Nav.Navigator>
  );
};

export default RootNavigator;