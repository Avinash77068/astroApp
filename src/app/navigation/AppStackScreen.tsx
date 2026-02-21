import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStackScreen from './BottomStackScreen';
import ChatWithAstrologer from '../../component/screen/ChatScreen/ChatScreen/ChatWithAstrologer';

const Stack = createNativeStackNavigator();

export default function AppStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomStack"
        component={BottomStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatWithAstrologer"
        component={ChatWithAstrologer}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
}
