import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import video from "../../assets/data/video.json";
export const IconsContainer = () => {
  return (
    <View style={styles.actionsContainer}>
      <View style={styles.actionsContainerItem}>
        <AntDesign name="like1" color="lightgrey" size={25} />
        <Text style={styles.actionsText}>{video.likes}</Text>
      </View>
      <View style={styles.actionsContainerItem}>
        <AntDesign name="dislike2" color="lightgrey" size={25} />
        <Text style={styles.actionsText}>{video.dislikes}</Text>
      </View>
      <View style={styles.actionsContainerItem}>
        <Octicons name="comment-discussion" size={25} color="lightgrey" />
        <Text style={styles.actionsText}>Live chat</Text>
      </View>
      <View style={styles.actionsContainerItem}>
        <MaterialCommunityIcons
          name="share-outline"
          size={30}
          color="lightgrey"
        />
        <Text style={styles.actionsText}>Share</Text>
      </View>
      <View style={styles.actionsContainerItem}>
        <MaterialCommunityIcons
          name="plus-box-multiple-outline"
          size={25}
          color="lightgrey"
        />
        <Text style={styles.actionsText}>Save</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionsContainerItem: {
    justifyContent: "space-around",
    alignItems: "center",
    width: 60,
    height: 60,
    marginVertical: 8,
  },
  actionsText: {
    color: "lightgrey",
  },
});
