import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { HomeScreen } from "./../screens/HomeScreen";
import { Explore } from "./../screens/Explore";
import { AddVideo } from "./../screens/AddVideo";
import { Subscriptions } from "./../screens/Subscriptions";
import { Library } from "./../screens/Library";
import HomeStack from "./HomeStack";
import {
  Foundation,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddVideo"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Subscriptions"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="subscriptions" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="video-collection" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
