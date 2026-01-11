import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from "../screens/chat/ChatScreen";
import ChatRoomScreen from "../screens/chat/ChatRoomScreen";

const Stack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;