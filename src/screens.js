import { Navigation } from 'react-native-navigation';

import Home from './components/Home';
import Knock from './components/Knock';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('xosMobile.Home', () => Home, store, Provider);
	Navigation.registerComponent('xosMobile.Knock', () => Knock, store, Provider);
}
