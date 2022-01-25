import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Pressable} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';

const COLOR = '#b5b5b5';
const ACTIVE_COLOR = '#f76c68';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto name="tinder" size={30} color={activeScreen === 'HOME' ? ACTIVE_COLOR : COLOR} />
          </Pressable>

          <MaterialCommunityIcons name="star-four-points" size={30} color={COLOR} />

          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons name="ios-chatbubbles" size={30} color={activeScreen === 'CHAT' ? ACTIVE_COLOR : COLOR} />
          </Pressable>

          <FontAwesome name="user" size={30} color={COLOR} />
        </View>
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'CHAT' && <MatchesScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

export default App;
