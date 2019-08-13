import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import * as Components from '../components';

const LoginStack = createStackNavigator({
  Landing: {
    screen: Components.Landing,
  },
}, {
  initialRouteName: 'Landing',
  headerMode: 'none',
});

const AppStack = createDrawerNavigator({
  Home: {
    screen: Components.Home,
  },
  Order: {
    screen: Components.Order,
  },
}, {
  contentComponent: Components.Drawer,
  initialRouteName: 'Home',
  headerMode: 'none',
});

const RootStack = createSwitchNavigator({
  Login: { screen: LoginStack },
  App: { screen: AppStack }
}, {
  headerMode: 'none', // TODO we may use RN Nav header.
  initialRouteName: 'App' // TODO: change to Login
});

export default createAppContainer(RootStack);
