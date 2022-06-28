import { registerRootComponent } from 'expo';
import App from './App';

const Main = () => {
  return (
    <App />
  )
};

registerRootComponent(Main)