import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { VideoComment } from "./VideoComment";
import { Comment, User } from "../../src/models";
import { Ionicons } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";

interface VideoCommentsProps {
  comments: Comment[] | null;
  videoID: string;
}

export const VideoComments = ({ comments, videoID }: VideoCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const sendComment = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const userSub = userInfo.attributes.sub;
    const user = (await DataStore.query(User)).find((u) => u.sub === userSub);
    if (!user) {
      console.error("User not found");
      return;
    }

    await DataStore.save(
      new Comment({
        comment: newComment,
        likes: 0,
        dislikes: 0,
        replies: 0,
        videoID,
        userID: user.id,
      })
    );
    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="  Enter comment"
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor="grey"
          style={styles.inputText}
          multiline
        />
        {newComment.length > 0 && (
          <Pressable onPress={sendComment}>
            <Ionicons name="md-send-sharp" size={30} color="#1d5ef5" />
          </Pressable>
        )}
      </View>
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
    backgroundColor: "#2d2e2d",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
    justifyContent: "space-between",
  },
  inputText: {
    borderRadius: 10,
    color: "white",
    width: 300,
    marginLeft: 10,
    fontSize: 16,
  },
});
