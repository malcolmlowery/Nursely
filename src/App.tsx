import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Newsfeed from './screens/newsfeed';
import Notifications from './screens/notifications';
import Messages from './screens/messages';
import Settings from './screens/settings';
import PostDetails from './screens/post-details';
import Profile from './screens/profile';
import CreatePost from './screens/create-post';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainScreenStack = () => {
	return(
		<Stack.Navigator screenOptions={({ route }) => ({
			headerBlurEffect: 'prominent',
			headerTransparent: true,
			headerTitle: () => {
				let headerName: string;

				if(route.name === 'newsfeed') {
					headerName = 'Nursely'
				} else if(route.name === 'profile') {
					headerName = ''
				} else if(route.name === 'notifications') {
					headerName = 'Notifications'
				} else if(route.name === 'messages') {
					headerName = 'Messages'
				} else if(route.name === 'settings') {
					headerName = 'Settings'
				} else {
					headerName = 'N/A'
				}

				return(
					<Text style={{ color: '#131313', fontWeight: '600', fontSize: 28 }}>{headerName}</Text>
				)
			},
			headerRight: () => {
				if(route.name === 'newsfeed') {
					return(
						<Button>
							<ProfileImage source={{ uri: 'https://avatars.githubusercontent.com/u/100153203?v=4' }} />
						</Button>
					)
				}
			}
		})}>
			<Stack.Screen 
				name='newsfeed' 
				component={Newsfeed} 
				options={{ 
					headerTitle: '',
					headerLeft: () => {
						return(
							<Text style={{ color: '#131313', fontWeight: '600', fontSize: 28 }}>Nursely</Text>
						)
					}
				}} 
			/>
			<Stack.Screen 
				name='post-details' 
				component={PostDetails} 
				options={{ 
					headerTitle: '',
					headerBackTitle: 'Newsfeed', 
				}} 
			/>
			<Stack.Screen 
				name='profile' 
				component={Profile} 
				options={{ 
					headerShown: true,
					headerBackTitle: 'Newsfeed', 
					headerLargeTitle: true,
					title: 'Malcolm Lowery'
				}} 
			/>
			<Stack.Screen 
				name='createPost'
				component={CreatePost}
				options={({ navigation }) => ({
					presentation: 'transparentModal',
					animation: 'fade',
					headerShown: false
				})}
			/>
			<Stack.Screen name='messages' component={Messages} />
		</Stack.Navigator>
	)
};

const App = () => {
  return(
	<NavigationContainer>
		<Tabs.Navigator screenOptions={({ route }) => ({
			headerShown: true,
			tabBarActiveTintColor: '#5F5BFF',
			tabBarStyle: { position: 'absolute' },
			headerTitleAlign: 'left',
			tabBarBackground: () => (
				<BlurView tint="light" intensity={100} style={{ flex: 1 }} />
			),
			headerBackground: () => (
				<BlurView tint="light" intensity={100} style={{ flex: 1 }} />
			),
			tabBarIcon: ({ color, focused, size }) => {
				let iconeName: any;

				if(route.name === '/') {
					iconeName = focused ? 'home' : 'home-outline'
				} else if(route.name === 'notifications') {
					iconeName = focused ? 'notifications' : 'notifications-outline'
				} else if(route.name === 'messages') {
					iconeName = focused ? 'mail' : 'mail-outline'
				} else if(route.name === 'settings') {
					iconeName = focused ? 'settings' : 'settings-outline'
				} else {
					iconeName = 'help'
				}

				return(
					<Ionicons color={color} name={iconeName} size={size} />
				)
			},
			tabBarLabel: '',
			tabBarItemStyle: ({ top: 10 }),
			headerTitle: () => {
				let headerName: string;

				if(route.name === '/') {
					headerName = 'Nursely'
				} else if(route.name === 'notifications') {
					headerName = 'Notifications'
				} else if(route.name === 'messages') {
					headerName = 'Messages'
				} else if(route.name === 'settings') {
					headerName = 'Settings'
				} else if(route.name === 'profile') {
					headerName = ''
				}
				else {
					headerName = 'N/A'
				}

				return(
					<Text style={{ color: '#131313', fontWeight: '600', fontSize: 28 }}>{headerName}</Text>
				)
			}
		})}>
			<Tabs.Screen name='/' component={MainScreenStack} options={{ headerShown: false }} />
			<Tabs.Screen name='notifications' component={Notifications} />
			<Tabs.Screen name='messages' component={Messages} />
			<Tabs.Screen name='settings' component={Settings} />
		</Tabs.Navigator>
	</NavigationContainer>
  )
};

export default App;

const Text = styled.Text``;

const Button = styled.TouchableOpacity``;

const ProfileImage = styled.Image`
	border-radius: 16px;
	height: 32px;
	width: 32px;
`;

const TabItemText = styled.Text`
	color: #5F5BFF;
	font-size: 11px;
	font-weight: 400;
`;