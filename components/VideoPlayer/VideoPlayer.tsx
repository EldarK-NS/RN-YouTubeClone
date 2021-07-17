import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Audio, Video } from "expo-av";

interface VideoPlayerProps {
  videoURI: string;
  thumbnailURI: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { videoURI, thumbnailURI } = props;
  return (
    <View>
      <Video
        source={{ uri: videoURI }}
        style={styles.player}
        posterSource={{ uri: thumbnailURI }}
        posterStyle={{
          resizeMode: "cover",
        }}
        usePoster={false}
        resizeMode="contain"
        useNativeControls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
