import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import Home from './screens/home';
import Notifications from './screens/notifications';
import Messages from './screens/messages';
import Settings from './screens/settings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tabs = createBottomTabNavigator();

const App = () => {
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={{ flex: 1 }} />
        ),
      }}>
        <Tabs.Screen name='home' component={Home} options={{ headerShown: false }} />
        <Tabs.Screen name='notifications' component={Notifications} />
        <Tabs.Screen name='messages' component={Messages} />
        <Tabs.Screen name='settings' component={Settings} />
      </Tabs.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  )
};

export default App;