import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Comment, User } from "../../src/models";
import { DataStore } from "aws-amplify";

interface VideoCommentsProps {
  comment: Comment;
}

export const VideoComment = ({ comment }: VideoCommentsProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    DataStore.query(User, comment.userID as string).then(setUser);
  }, []);
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{
          uri: user?.image,
        }}
        style={styles.avatar2}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={[styles.commentName]}>{user?.name}</Text>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </View>
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
    color: "#d2d4d2",
    marginLeft: 10,
    fontSize: 16,
  },
  commentName: {
    color: "grey",
    marginLeft: 10,
    fontSize: 12,
  },
  avatar2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
});
