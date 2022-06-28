import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/home';
import Notifications from './screens/notifications';
import Messages from './screens/messages';
import Settings from './screens/settings';

const Tabs = createBottomTabNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name='home' component={Home} options={{ headerShown: false }} />
        <Tabs.Screen name='notifications' component={Notifications} />
        <Tabs.Screen name='messages' component={Messages} />
        <Tabs.Screen name='settings' component={Settings} />
      </Tabs.Navigator>
    </NavigationContainer>
  )
};

export default App;