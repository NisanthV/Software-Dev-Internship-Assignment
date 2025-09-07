import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  StatusBar,
  BackHandler 
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

const VideoPlayerScreen = ({ route, navigation }) => {
  const { video } = route.params;
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsControlsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [isControlsVisible]);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFullscreen) {
        setIsFullscreen(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [isFullscreen]);

  const toggleControls = () => setIsControlsVisible(!isControlsVisible);

  // Clean video ID (remove any demo suffix)
  const cleanVideoId = video.id.replace(/_\d+$/, '') || 'LDauagw72aw';
  
  // YouTube embed URL for direct playback
  const videoUrl = `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&controls=1&fs=1&rel=0&modestbranding=1`;

  const minimizePlayer = () => {
    // You can add minimize logic here later
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#000" 
        barStyle="light-content" 
        hidden={isFullscreen}
      />
      
      {/* Video Player Container */}
      <View style={[
        styles.playerContainer, 
        isFullscreen && styles.fullscreenPlayer
      ]}>
        <WebView
          style={styles.webview}
          source={{ uri: videoUrl }}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          onFullscreenPlayerWillPresent={() => setIsFullscreen(true)}
          onFullscreenPlayerWillDismiss={() => setIsFullscreen(false)}
        />
        
        {/* Minimize Button */}
        {!isFullscreen && (
          <TouchableOpacity 
            style={styles.minimizeButton} 
            onPress={minimizePlayer}
          >
            <Text style={styles.minimizeText}>−</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Video Details (Hidden in fullscreen) */}
      {!isFullscreen && (
        <View style={styles.details}>
          <Text style={styles.title}>{video.snippet.title}</Text>
          
          <View style={styles.videoMeta}>
            <View style={styles.channelContainer}>
              <View style={styles.channelAvatar} />
              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>{video.snippet.channelTitle}</Text>
                <Text style={styles.subscribers}>1.2M subscribers</Text>
              </View>
              <TouchableOpacity style={styles.subscribeButton}>
                <Text style={styles.subscribeText}>Subscribe</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.stats}>
              {video.statistics.viewCount} views • {video.statistics.likeCount} likes
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>👍</Text>
              <Text style={styles.actionText}>{video.statistics.likeCount}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>👎</Text>
              <Text style={styles.actionText}>Dislike</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📥</Text>
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description} numberOfLines={3}>
              {video.snippet.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  playerContainer: { 
    height: width * 0.5625, 
    backgroundColor: '#000',
    position: 'relative' 
  },
  fullscreenPlayer: {
    height: '100%',
    width: '100%',
  },
  webview: { 
    flex: 1,
  },
  minimizeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  minimizeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12,
    lineHeight: 24,
  },
  videoMeta: { 
    marginBottom: 16 
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subscribers: {
    fontSize: 12,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stats: { 
    fontSize: 14, 
    color: '#666',
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  descriptionContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default VideoPlayerScreen;
