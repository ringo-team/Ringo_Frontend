import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/intro/LoginScreen";

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

    </Stack.Navigator>
    );
};

export default IntroStackNavigator;
