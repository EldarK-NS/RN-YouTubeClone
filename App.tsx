import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import Amplify, { Auth, DataStore } from "aws-amplify";
import { User } from "./src/models";
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";
Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useEffect(() => {
    const saveUserToDB = async () => {
      //get user from Cognito
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;
      console.log(userId);
      //check user exists in DB
      const user = (await DataStore.query(User)).find(
        (user) => user.sub === userId
      );
      if (!user) {
        //if not save user to DB
        await DataStore.save(
          new User({
            sub: userId,
            name: userInfo.attributes.email,
            subscribers: 0,
          })
        );
      } else {
        console.log("User already exists in DB");
      }
    };
    saveUserToDB();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Navigation colorScheme={"dark"} />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
