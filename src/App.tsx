import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Home from './screens/home';
import Notifications from './screens/notifications';
import Messages from './screens/messages';
import Settings from './screens/settings';

const Tabs = createBottomTabNavigator();

const App = () => {
	return(
		<SafeAreaProvider>
			<NavigationContainer>
				<Tabs.Navigator screenOptions={({ route }) => ({
					tabBarIcon: ({ color, focused, size }) => {
						let iconeName: any;

						if(route.name === 'home') {
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
					tabBarActiveTintColor: '#5F5BFF',
					tabBarStyle: { position: 'absolute' },
					tabBarBackground: () => (
						<BlurView tint="light" intensity={100} style={{ flex: 1 }} />
					),
					headerBackground: () => (
						<BlurView tint="light" intensity={100} style={{ flex: 1 }} />
					),
					headerTitleAlign: 'left',
					headerTitle: () => {
						let headerName: string;

						if(route.name === 'home') {
							headerName = 'Nursely'
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
							<Text style={{ color: '#131313', fontWeight: '600', fontSize: 17 }}>{headerName}</Text>
						)
					}
				})}>
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

const Text = styled.Text``;