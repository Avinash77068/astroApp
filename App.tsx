/**
 * App Entry Point
 * Configures TanStack Query and renders RootNavigator
 * RootNavigator handles authentication state routing
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetworkLogger, { startNetworkLogging } from 'react-native-network-logger';
import { queryClient } from './src/config/queryClient';
import { RootNavigator } from './src/app/navigation/RootNavigator';


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
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />

          {__DEV__ && (
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => setShowLogger(prev => !prev)}>
              <Text style={styles.buttonText}>
                {showLogger ? 'Close Logs' : 'Logs'}
              </Text>
            </TouchableOpacity>
          )}

          {showLogger && <NetworkLogger />}
        </View>
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
