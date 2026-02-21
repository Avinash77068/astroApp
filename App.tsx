import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigator';
import { StatusBar, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <RootNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
