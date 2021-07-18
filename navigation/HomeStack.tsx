import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabOneParamList } from "../types";
import { HomeScreen } from "../screens/HomeScreen";
import logo from "../assets/images/logo.png";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";

const HomeStack = createStackNavigator<TabOneParamList>();

function CustomHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.icons}>
          <Feather name="cast" size={24} color="white" />
          <AntDesign name="bells" size={24} color="white" />
          <AntDesign name="search1" size={24} color="white" />
          <FontAwesome name="user-circle-o" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeStackComponent() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 130,
    height: 25,
  },
  icons: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between",
  },
});

export default HomeStackComponent;
