import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import App from './App';

const Main = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};

registerRootComponent(Main)