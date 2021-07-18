import React, { useRef, useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { IconsContainer } from "../components/iconsContainer/IconsContainer";
import { VideListItem } from "../components/VideListItem/VideListItem";
import { VideoPlayer } from "./../components/VideoPlayer/VideoPlayer";
import { DataStore } from "aws-amplify";
import { Video } from "../src/models";
import { Comment } from "../src/models";
import { VideoComments } from "../components/VideoComments/VideoComments";
import { VideoComment } from "../components/VideoComments/VideoComment";

export const VideoScreen = () => {
  const [video, setVideo] = useState<Video | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const commentsSheetRef = useRef<BottomSheetModal>(null);
  const route = useRoute();
  const videoId = route.params?.id;
  useEffect(() => {
    DataStore.query(Video, videoId).then(setVideo);
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!video) {
        return;
      }
      const rex = await DataStore.query(Comment);
      const videoComments = (await DataStore.query(Comment)).filter(
        (comment) => comment.videoID === video.id
      );
      setComments(videoComments);
    };
    fetchComments();
  }, [video]);

  const openComments = () => {
    commentsSheetRef.current?.present();
  };

  if (!video) {
    return <ActivityIndicator color="white" size="large" />;
  }

  let viewsString = video.views.toString();
  if (video.views > 1000000) {
    viewsString = (video.views / 1000000).toFixed(1) + "m";
  } else {
    if (video.views > 1000) {
      viewsString = (video.views / 1000).toFixed() + " k";
    }
  }

  return (
    <View>
      <View style={{ flex: 1 }}>
        <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />
        {/* info */}
        <View style={styles.midContainer}>
          <Text style={styles.midContainerTags}>{video.tags}</Text>
          <Text
            style={styles.midContainerTitle}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {video.title}
          </Text>
          <Text style={styles.midContainerSubTitle}>
            {video.User?.name} {viewsString} views {video.createdAt}
          </Text>
        </View>
        {/* Actions */}
        <IconsContainer />
        {/* user info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: video.User?.image,
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfoTextCont}>
              <Text style={styles.userInfoTitle}>{video.User?.name}</Text>
              <Text style={styles.userInfoSubTitle}>
                {video.User?.subscribers} subscribers
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
            {comments.length > 0 && <VideoComment comment={comments[0]} />}
          </Pressable>
        </View>
        {/* All comments */}
        <BottomSheetModal
          snapPoints={["75%"]}
          index={0}
          ref={commentsSheetRef}
          style={{ backgroundColor: "#121211" }}
        >
          <VideoComments comments={comments} videoID={video.id} />
        </BottomSheetModal>
        {/* recomended */}
        <View style={styles.line} />
      </View>
    </View>
  );
};

const VideoScreenWithRecomendations = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    DataStore.query(Video).then(setVideos);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheetModalProvider>
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideListItem video={item} />}
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
    marginBottom: 10,
  },
});
