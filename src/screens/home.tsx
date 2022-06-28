import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Newsfeed from './newsfeed';
import Profile from './profile';
import Messages from './messages';

const Stack = createNativeStackNavigator();

const Home = () => {
  return(
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name='newsfeed' component={Newsfeed} options={{ headerLargeTitle: false, headerTitle: 'Nursely' }} />
      <Stack.Screen name='profile' component={Profile} />
      <Stack.Screen name='messages' component={Messages} />
    </Stack.Navigator>
  )
};

export default Home;