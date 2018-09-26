import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(getUserData);

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Knock,
  Questionnaires,
  Questions,
  Action
},
{
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    header: <HeaderComponent title={navigation.state.params ? navigation.state.params.title : navigation.state.routeName} />
  })
});

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
          <RootStack ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          />
        </PaperProvider>
      </Provider>
    );
  }
}
