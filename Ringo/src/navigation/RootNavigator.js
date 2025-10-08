import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import HomeScreen from "../screens/home/HomeScreen";
import IntroStackNavigator from "./IntroStackNavigator";

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
  </Nav.Navigator>
  );
};

export default RootNavigator;