import React, { useCallback, memo } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { HomeItem, CategoryItem } from '../../types/api.types';
import { useAuth } from '../../hooks/useAuth';
import { useHomeData } from '../../hooks/useHomeData';
import { Loader } from '../../components/Loader/Loader';
import { Button } from '../../components/Button/Button';
import { styles } from './styles';
import { strings } from '../../constants/strings';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const CategoryItemComponent = memo<{ item: CategoryItem }>(({ item }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Text style={styles.categoryIcon}>{item.icon}</Text>
    <Text style={styles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
));

CategoryItemComponent.displayName = 'CategoryItemComponent';

const HomeItemComponent = memo<{ item: HomeItem }>(({ item }) => (
  <TouchableOpacity style={styles.homeItem}>
    <View style={styles.itemIcon}>
      <Text style={styles.itemEmoji}>{item.image}</Text>
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemRating}>⭐ {item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

HomeItemComponent.displayName = 'HomeItemComponent';

export const HomeScreen = memo<HomeScreenProps>(({ navigation }) => {
  const { user, logout } = useAuth();
  const { categories, items, loading, refreshing, error, refresh } = useHomeData();

  const handleLogout = useCallback(async () => {
    await logout();
    navigation.replace('Auth');
  }, [logout, navigation]);

  const renderCategory = useCallback(
    ({ item }: { item: CategoryItem }) => <CategoryItemComponent item={item} />,
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: HomeItem }) => <HomeItemComponent item={item} />,
    []
  );

  const keyExtractor = useCallback((item: HomeItem | CategoryItem) => item.id, []);

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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.home.categories}</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{strings.home.welcome},</Text>
          <Text style={styles.userName}>{user?.fullName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={strings.home.searchPlaceholder}
        placeholderTextColor={styles.placeholder.color}
      />

      <Text style={styles.sectionTitle}>{strings.home.items}</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{strings.home.empty}</Text>
          </View>
        }
      />
    </View>
  );
});

HomeScreen.displayName = 'HomeScreen';
