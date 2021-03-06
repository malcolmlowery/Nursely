import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { auth, onAuthStateChanged, signOut } from './firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Newsfeed from './src/screens/newsfeed';
import Notifications from './src/screens/notifications';
import Messages from './src/screens/messages';
import Settings from './src/screens/settings';
import PostDetails from './src/screens/post-details';
import Profile from './src/screens/profile';
import CreatePost from './src/screens/create-post';
import Message from './src/screens/message';
import Login from './src/screens/login';
import SignUp from './src/screens/signup';

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
						<Button onPress={() => signOut(auth)}>
							<ProfileImage source={{ uri: auth.currentUser?.photoURL || '' }} />
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
				options={{ headerTitle: '', headerBackTitle: 'Newsfeed' }} 
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
				options={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }}
			/>
			<Stack.Screen name='messages' component={Messages} />
		</Stack.Navigator>
	)
};

const MessageStackNavigator = () => {
	return(
		<Stack.Navigator screenOptions={({ route }) => ({
			headerShown: true,
			headerBlurEffect: 'prominent',
			headerTransparent: true,
			headerTintColor: '#5F5BFF'
		})}>
			<Stack.Screen name='messages' component={Messages} options={{ headerTitle: '', headerLeft: () => <Text style={{ color: '#131313', fontWeight: '600', fontSize: 28 }}>Messages</Text> }} />
		   <Stack.Screen name='message' component={Message} options={{ headerLargeTitle: true, headerTitle: 'Chatroom', headerBackTitle: 'Messages', }} />
		</Stack.Navigator>
	)
};

const NotificationsStackNavigator = () => {
	return(
		<Stack.Navigator screenOptions={({ route }) => ({
			headerShown: true,
			headerBlurEffect: 'prominent',
			headerTransparent: true,
		})}>
			<Stack.Screen name='messages' component={Notifications} options={{ headerTitle: '', headerLeft: () => <Text style={{ color: '#131313', fontWeight: '600', fontSize: 28 }}>Notifications</Text> }} />
			<Stack.Screen name='post-details' component={PostDetails} options={{ headerTitle: '', headerBackTitle: 'Notifications' }} />
		</Stack.Navigator>
	)
};

const App = () => {
	const [userAuthenticated, setUserAuthenticated] = useState(false)
	
	onAuthStateChanged(auth, async (user) => {
		if(user) {
			const token = await user.getIdToken();
			await AsyncStorage.setItem('token', token)
			setUserAuthenticated(true)
		} else {
			setUserAuthenticated(false)
		}
	})

  	return(
	<NavigationContainer>
		{ userAuthenticated ?
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
					} else if(route.name === 'messages-route') {
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
				<Tabs.Screen name='notifications' component={NotificationsStackNavigator} options={{ headerShown: false }} />
				<Tabs.Screen name='messages-route' component={MessageStackNavigator} options={{ headerShown: false }} />
				<Tabs.Screen name='settings' component={Settings} />
			</Tabs.Navigator>
			:
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='login' component={Login} />
				<Stack.Screen name='sign-up' component={SignUp} />
			</Stack.Navigator>
			
		}
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