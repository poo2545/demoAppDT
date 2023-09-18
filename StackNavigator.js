import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./screensChat/LoginScreen";
import RegisterScreen from "./screensChat/RegisterScreen";
import HomeScreen from "./screensChat/HomeScreen";
import FriendsScreen from "./screensChat/FriendsScreen";
import ChatsScreen from "./screensChat/ChatsScreen";
import ChatMessagesScreen from "./screensChat/ChatMessagesScreen";
import { FontAwesome5 } from '@expo/vector-icons';

import WelcomeScreen from "./screens2/WelcomeScreen";
import JounalScreen from "./screens2/JounalScreen";
import DragScreen from "./screens2/DragScreen";
import ProfileScreen from "./screens2/ProfileScreen";
import HomePage from './screens2/HomePage';
import FoodList from './screens2/FoodList';

import Breakfast from "./JounalFood/Breakfast";
import Lunch from "./JounalFood/Lunch";
import Dinner from './JounalFood/Dinner';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Friends"
          component={FriendsScreen}
        />
        <Stack.Screen name="Chats"
          component={ChatsScreen}
        />
        <Stack.Screen name="Messages"
          component={ChatMessagesScreen}
        />
        <Stack.Screen name="FoodList"
          component={FoodList}
        />

        <Stack.Screen name="Breakfast"
          component={Breakfast}
        />

        <Stack.Screen name="Lunch"
          component={Lunch}
        />
        <Stack.Screen name="Dinner"
          component={Dinner} 
        />

        <Stack.Screen name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#52B788',
        inactiveTintColor: '#00000',
        style: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} /> // Change icon and size
          ),
        }}
      />
      <Tab.Screen
        name="Jounal"
        component={JounalScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book" size={24} color={color} /> // Change icon and size
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="comment-alt" size={24} color={color} /> // Change icon and size
          ),
        }}
      />

      <Tab.Screen
        name="Drag"
        component={DragScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book-medical" size={24} color={color} /> // Change icon and size
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} /> // Change icon and size
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
