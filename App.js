import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/reducers/rootReducer';
import rootSaga, {getUserData} from './src/sagas/saga';
import NavigationService from './NavigationService';
import { registerScreens } from './src/screens';
import { Navigation } from 'react-native-navigation';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

registerScreens(store, Provider);


sagaMiddleware.run(rootSaga);
//sagaMiddleware.run(getUserData);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.startApp();
  }


  startApp() {    
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Home',
          screen: 'xosMobile.Home',
          title: 'Home',
        },
        // {
        //   label: 'Questionnaires',
        //   screen: 'xosMobile.Questionnaires',
        //   title: 'Questionnaires',
        // },
        // {
        //   label: 'Questions',
        //   screen: 'xosMobile.Questions',
        //   title: 'Questions',
        // },
        {
          label: 'Knock',
          screen: 'xosMobile.Knock',
          title: 'Knock',
        },
      ]
    });
  }
}

export default App;
