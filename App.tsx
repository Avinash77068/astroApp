import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import Totalfiles from './src/Totalfiles';

const { width, height } = Dimensions.get('window');

const App = () => {
  // Generate 20 random stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * height,
    left: Math.random() * width,
    delay: Math.random() * 3,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Stars Layer */}
      {stars.map((star) => (
        <View
          key={star.id}
          style={{
            position: 'absolute',
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: 'white',
            top: star.top,
            left: star.left,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Totalfiles />
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a148c', // Cosmic purple gradient can be done with libraries if needed
      },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
});
