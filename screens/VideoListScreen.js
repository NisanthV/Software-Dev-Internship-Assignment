import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { URL } from '../BASE_URL';
const VideoListScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);

  const fetchRealYouTubeData = async () => {
    try {
      const response = await axios.get(`${URL}/youtube/`);
      const data = response.data;
      console.log(data)
      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRealYouTubeData();
    }, [])
  );

  const VideoItem = ({ video }) => (
    <TouchableOpacity 
      style={styles.videoItem} 
      onPress={() => navigation.navigate('VideoPlayer', { video })}
    >
      <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{video.snippet.title}</Text>
        <Text style={styles.channel}>{video.snippet.channelTitle}</Text>
        <Text style={styles.views}>{video.statistics.viewCount} views</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Manage Data" onPress={() => navigation.navigate('Manage')} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoItem video={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  videoItem: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  thumbnail: { width: 120, height: 90, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  channel: { fontSize: 14, color: '#666', marginBottom: 2 },
  views: { fontSize: 12, color: '#999' }
});

export default VideoListScreen;
