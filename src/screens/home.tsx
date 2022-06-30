import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Newsfeed from './newsfeed';
import Profile from './profile';
import Messages from './messages';
import PostDetails from './post-details';

const Stack = createNativeStackNavigator();

const Home = () => {
  return(
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name='newsfeed' component={Newsfeed} options={{ headerLargeTitle: true, headerTitle: 'Nursely', headerTransparent: true, headerBlurEffect: 'prominent' }} />
      <Stack.Screen name='post-details' component={PostDetails} options={{ headerBackTitle: 'Newsfeed', headerTitle: '' }} />
      <Stack.Screen name='profile' component={Profile} options={{ headerBackTitle: 'Newsfeed', headerTitle: '' }} />
      <Stack.Screen name='messages' component={Messages} />
    </Stack.Navigator>
  )
};

export default Home;