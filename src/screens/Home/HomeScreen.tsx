import React, { useCallback, memo } from 'react';
import { View, Text} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useAuth } from '../../hooks/useAuth';
import { useHomeData } from '../../hooks/useHomeData';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};


export const HomeScreen = memo<HomeScreenProps>(({ navigation }) => {
  const { user, logout } = useAuth();
  const { categories, items, loading, refreshing, error, refresh } = useHomeData();

  const handleLogout = useCallback(async () => {
    await logout();
    navigation.replace('Auth');
  }, [logout, navigation]);

 

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{strings.home.error}</Text>
        <Button title={strings.home.retry} onPress={refresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
});

HomeScreen.displayName = 'HomeScreen';
