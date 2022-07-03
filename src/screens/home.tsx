import styled from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Newsfeed from './newsfeed';
import Profile from './profile';
import Messages from './messages';
import PostDetails from './post-details';

const Stack = createNativeStackNavigator();

const Home = () => {
  return(
    <Stack.Navigator screenOptions={{ 
      headerLargeTitle: false,
      headerShadowVisible: true, 
      headerBlurEffect: 'prominent', 
      headerTransparent: true }}>
      <Stack.Screen 
        name='newsfeed' 
        component={Newsfeed} 
        options={{ 
          headerTitle: '',
          headerLeft: () => {
            return(
              <Text style={{ color: '#131313', fontWeight: '600', fontSize: 32 }}>Nursely</Text>
            )
          },
          headerRight: () => {
            return(
              <Btn>
                <ProfileImage source={{ uri: 'https://avatars.githubusercontent.com/u/100153203?v=4' }} />
              </Btn>
            )
          }
      }} />
      <Stack.Screen name='post-details' component={PostDetails} options={{ headerBackTitle: 'Newsfeed', headerTitle: '' }} />
      <Stack.Screen name='profile' component={Profile} options={{ headerBackTitle: 'Newsfeed', headerTitle: '', headerShown: false }} />
      <Stack.Screen name='messages' component={Messages} />
    </Stack.Navigator>
  )
};

export default Home;

const Text = styled.Text`

`;

const Btn = styled.TouchableHighlight``;

const ProfileImage = styled.Image`
border-radius: 16px;
  height: 32px;
  width: 32px;
`;