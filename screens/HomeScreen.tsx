import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { VideListItem } from "../components/VideListItem/VideListItem";
// import videos from "../assets/data/videos.json";
import { DataStore, graphqlOperation } from "aws-amplify";
import { Video } from "../src/models";

export const HomeScreen = () => {
  const [videos, setVideos] = useState<Video>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await DataStore.query(Video);
      console.log(response);
      setVideos(response);
    };
    fetchVideos();
  }, []);
  return (
    <View>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideListItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
