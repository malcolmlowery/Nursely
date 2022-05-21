import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Avatar from './components/Avatar';
import Newsfeed from './screens/newsfeed';

const Stack = createNativeStackNavigator();;

const headerBtn = () => {
  return(
    <Avatar 
      size='large'
      top={40}
      uri='https://avatars.githubusercontent.com/u/100153203?s=400&u=2b1dee06b9230cca80480cbf7ecf0defc67aa414&v=4s'
    />
  )
}

const App = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='newsfeed' 
        component={Newsfeed} 
        options={{
          title: 'Nursely',
          headerTitleStyle: { 
            color: '#131313'
          },
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerRight: () => headerBtn()
        }}
      />
    </Stack.Navigator>
  )
};

export default App;