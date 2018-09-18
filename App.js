import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/reducers/rootReducer';
import rootSaga, {getUserData} from './src/sagas/saga';
import NavigationService from './NavigationService';

import HomeScreen from './src/components/HomeScreen';
import Questionnaires from './src/components/Questionnaires';
import Questions from './src/components/Questions';
import Knock from './src/components/Knock';
import Header from './src/components/Header';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(getUserData);


const RootStack = createStackNavigator({
  Home: HomeScreen,
  Knock: Knock,
  Questionnaires: Questionnaires,
  Questions: Questions,
},
{
  initialRouteName: 'Home',
  navigationOptions: ({navigation}) => ({
      headerTitle: navigation.state.routeName,
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </Provider>
    );
  }
}
