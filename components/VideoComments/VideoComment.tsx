import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

interface VideoCommentsProps {
  comment: {
    id: string;
    createdAt: string;
    comment: string;
    user: {
      name: string;
      image: string;
    };
    likes: number;
    dislikes: number;
    replies: number;
  };
}

export const VideoComment = ({ comment }: VideoCommentsProps) => {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{
          uri: comment.user.image,
        }}
        style={styles.avatar2}
      />
      <Text style={styles.commentText}>{comment.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  commentText: {
    color: "white",
    marginLeft: 10,
  },
  avatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
});
