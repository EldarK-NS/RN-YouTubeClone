import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video } from "../../src/models";

type VideListItemProps = {
  video: Video;
};

export const VideListItem = (props: VideListItemProps) => {
  const { video } = props;
  const navigation = useNavigation();

  const minutes = Math.floor(video.duration / 60);
  const seconds = video.duration % 60;

  let viewsString = video.views.toString();
  if (video.views > 1000000) {
    viewsString = (video.views / 1000000).toFixed(1) + "m";
  } else {
    if (video.views > 1000) {
      viewsString = (video.views / 1000).toFixed() + " k";
    }
  }
  const openVideoPage = () => {
    navigation.navigate("VideoScreen", { id: video.id });
  };

  return (
    <Pressable onPress={openVideoPage}>
      <View style={styles.videoCard}>
        <View>
          <Image style={styles.image} source={{ uri: video.thumbnail }} />
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </Text>
          </View>
        </View>
        <View style={styles.titleRow}>
          <Image
            source={{
              uri: video.User?.image,
            }}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text
              style={styles.midContainerTitle}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {video.title}
            </Text>
            <Text style={styles.midContainerSubTitle}>
              {video.User?.name || " No Name"} {viewsString} views{" "}
              {video.createdAt}
            </Text>
          </View>
          <Entypo
            name="dots-three-vertical"
            size={19}
            color="#fff"
            style={{ marginRight: 7 }}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  timerContainer: {
    backgroundColor: "black",
    height: 28,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  timerText: {
    color: "#fff",
    fontWeight: "bold",
    padding: 3,
  },
  videoCard: {},
  titleRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  midContainer: {
    marginHorizontal: 15,
    flex: 1,
  },
  midContainerTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  midContainerSubTitle: {
    color: "grey",
  },
});
