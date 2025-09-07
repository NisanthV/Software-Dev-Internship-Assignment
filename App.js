import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoListScreen from './screens/VideoListScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import ManageScreen from './screens/ManageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VideoList" component={VideoListScreen} options={{ title: 'YouTube Videos' }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ title: 'Now Playing' }} />
        <Stack.Screen name="Manage" component={ManageScreen} options={{ title: 'Manage Data' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
