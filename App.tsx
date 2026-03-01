import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigator';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NetworkLogger, {
  startNetworkLogging,
} from 'react-native-network-logger';

const queryClient = new QueryClient();

export default function App() {
  const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      startNetworkLogging();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <RootNavigator />

            {/* Floating Debug Button */}
            {__DEV__ && (
              <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setShowLogger(prev => !prev)}
              >
                <Text style={styles.buttonText}>
                  {showLogger ? 'Close Logs' : 'Logs'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Network Logger Overlay */}
            {showLogger && <NetworkLogger />}
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 5,
    zIndex: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
