import React from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { VideListItem } from "../components/VideListItem/VideListItem";
import videos from "../assets/data/videos.json";

export const HomeScreen = () => {
  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideListItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
