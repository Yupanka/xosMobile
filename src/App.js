import React from 'react';
// import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga, { getUserData } from './sagas/saga';
import NavigationService from './NavigationService';
import HomeScreen from './components/Home/HomeScreen';
import Questionnaires from './components/Questionnaires/Questionnaires';
import Questions from './components/Questionnaires/Questions';
import Knock from './components/Knock';
import Action from './components/Action';
import HeaderComponent from './components/ui-components/HeaderComponent';
import DrawerMenu from './components/Home/DrawerMenu';
import {
  // Drawer,
  Provider as PaperProvider,
  DefaultTheme
} from 'react-native-paper';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(getUserData);

// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Knock,
//   Questionnaires,
//   Questions,
//   Action
// },
// {
//   initialRouteName: 'Home',
//   navigationOptions: ({ navigation }) => {
//     console.log(navigation)
//     return ({
//     header: <HeaderComponent
//       title={navigation.state.params ? navigation.state.params.title : navigation.state.routeName}
//       nav={navigation}  />
//   })
//   }
// });

const DrawerNav = createDrawerNavigator(
  { Home: HomeScreen,
    Knock,
    Questionnaires,
    Questions,
    Action },
  /* eslint-disable react/display-name, react/prop-types */
  {
    initialRouteName: 'Knock',
    contentComponent: ({ navigation }) => (
      <DrawerMenu nav={navigation} />

    ),
    /* eslint-enable react/display-name, react/prop-types */

    navigationOptions: ({ navigation }) => {
      return ({
        header: <HeaderComponent
          title={navigation.state.params ? navigation.state.params.title : navigation.state.routeName}
          nav={navigation.openDrawer()} />
      });
    }
  }
);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
};

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <DrawerNav ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
          {/* <RootStack ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          /> */}
        </PaperProvider>
      </Provider>
    );
  }
}
