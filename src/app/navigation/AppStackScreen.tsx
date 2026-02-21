import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStackScreen from './BottomStackScreen';

const Stack = createNativeStackNavigator();

export default function AppStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomStack"
        component={BottomStackScreen}
      />
    </Stack.Navigator>
  );
}
