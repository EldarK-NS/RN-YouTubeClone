import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconsContainer } from "../components/iconsContainer/IconsContainer";
import { VideListItem } from "../components/VideListItem/VideListItem";
import video from "../assets/data/video.json";
import videos from "../assets/data/videos.json";
import { VideoPlayer } from "./../components/VideoPlayer/VideoPlayer";
// import BottomSheet from "@gorhom/bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { VideoComments } from "./../components/VideoComments/VideoComments";

let viewsString = video.views.toString();
if (video.views > 1000000) {
  viewsString = (video.views / 1000000).toFixed(1) + "m";
} else {
  if (video.views > 1000) {
    viewsString = (video.views / 1000).toFixed() + " k";
  }
}

export const VideoScreen = () => {
  const commentsSheetRef = useRef<BottomSheetModal>(null);

  const openComments = () => {
    commentsSheetRef.current?.present();
  };

  return (
    <View>
      <View style={{ flex: 1 }}>
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
          <Pressable onPress={openComments}>
            <View style={styles.commentsContainerTitle}>
              <Text style={styles.commentsContainerText}>Comments 1,5 k</Text>
              <MaterialCommunityIcons
                name="arrow-up-down-bold-outline"
                size={20}
                color="lightgrey"
              />
            </View>
          </Pressable>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: video.user.image,
              }}
              style={styles.avatar2}
            />
            <TextInput
              placeholder="  Enter comment"
              style={styles.input}
              placeholderTextColor="grey"
            />
          </View>
        </View>
        {/* All comments */}
        <BottomSheetModal
          snapPoints={["75%"]}
          index={0}
          ref={commentsSheetRef}
          style={{ backgroundColor: "#121211" }}
        >
          <VideoComments />
        </BottomSheetModal>
        {/* recomended */}
        {/* <View style={styles.line} /> */}
      </View>
    </View>
  );
};

const VideoScreenWithRecomendations = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheetModalProvider>
        <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideListItem data={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={VideoScreen}
        />
      </BottomSheetModalProvider>
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

  line: {
    borderWidth: 4,
    borderColor: "#6b6a68",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  input: {
    width: 250,
    height: 35,
    backgroundColor: "black",
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
