import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigator';
import { StatusBar, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

