import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import video from "../assets/data/video.json";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { IconsContainer } from "../components/iconsContainer/IconsContainer";
import { TextInput } from "react-native-gesture-handler";
import { VideListItem } from "../components/VideListItem/VideListItem";
import videos from "../assets/data/videos.json";
import { VideoPlayer } from "./../components/VideoPlayer/VideoPlayer";

let viewsString = video.views.toString();
if (video.views > 1000000) {
  viewsString = (video.views / 1000000).toFixed(1) + "m";
} else {
  if (video.views > 1000) {
    viewsString = (video.views / 1000).toFixed() + " k";
  }
}

const VideoScreen = () => {
  return (
    <View>
      {/* info */}
      <View style={styles.midContainer}>
        <Text style={styles.midContainerTags}>{video.tags}</Text>
        <Text style={styles.midContainerTitle}>{video.title}</Text>
        <Text style={styles.midContainerSubTitle}>
          {video.user.name} {viewsString} views {video.createdAt}
        </Text>
      </View>
      {/* Actions */}
      <IconsContainer />
      {/* user info */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: video.user.image,
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfoTextCont}>
            <Text style={styles.userInfoTitle}>{video.user.name}</Text>
            <Text style={styles.userInfoSubTitle}>
              {video.user.subscribers} subscribers
            </Text>
          </View>
        </View>
        <Text style={styles.subscrButton}>SUBSCRIBE</Text>
      </View>
      {/* comments */}
      <View style={styles.commentsContainer}>
        <View style={styles.commentsContainerTitle}>
          <Text style={styles.commentsContainerText}>Comments 1,5 k</Text>
          <MaterialCommunityIcons
            name="arrow-up-down-bold-outline"
            size={20}
            color="lightgrey"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={{
              uri: video.user.image,
            }}
            style={styles.avatar2}
          />
          <TextInput
            placeholder="   Enter comment"
            style={styles.commentInput}
            placeholderTextColor="grey"
          />
        </View>
      </View>
      {/* recomended */}
      <View style={styles.line} />
    </View>
  );
};

const VideoScreenWithRecomendations = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />
      {/* <Image style={styles.videoPlayer} source={{ uri: video.thumbnail }} /> */}
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideListItem data={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={VideoScreen}
      />
    </SafeAreaView>
  );
};

export default VideoScreenWithRecomendations;

const styles = StyleSheet.create({
  videoPlayer: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#121211",
  },
  midContainer: {
    marginHorizontal: 15,
  },
  midContainerTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 5,
  },
  midContainerTags: {
    color: "#0094E3",
    marginTop: 8,
  },
  midContainerSubTitle: {
    color: "grey",
    marginTop: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#6b6a68",
    alignItems: "center",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    flex: 1,
  },
  userInfoTextCont: {
    marginLeft: 10,
  },
  userInfoTitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  userInfoSubTitle: {
    color: "grey",
    fontSize: 14,
  },
  subscrButton: {
    color: "red",
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  commentsContainer: {
    flexDirection: "column",
  },
  commentsContainerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 7,
  },
  commentsContainerText: {
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  commentInput: {
    width: 300,
    height: 30,
    backgroundColor: "black",
    marginLeft: 8,
    color: "grey",
    borderRadius: 5,
  },
  avatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
  line: {
    borderWidth: 4,
    borderColor: "#6b6a68",
  },
});
