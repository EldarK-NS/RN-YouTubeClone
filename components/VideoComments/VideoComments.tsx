import React from "react";
import { StyleSheet, Text, View } from "react-native";
import comments from "../../assets/data/comments.json";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { VideoComment } from "./VideoComment";

export const VideoComments = () => {
  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={comments}
        renderItem={({ item }) => <VideoComment comment={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121211",
    flex: 1,
  },
});
