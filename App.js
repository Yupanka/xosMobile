import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './src/reducers/rootReducer';
import rootSaga, { getUserData } from './src/sagas/saga';
import NavigationService from './NavigationService';
import HomeScreen from './src/components/Home/HomeScreen';
import Questionnaires from './src/components/Questionnaires/Questionnaires';
import Questions from './src/components/Questionnaires/Questions';
import Knock from './src/components/Knock';
import HeaderComponent from './src/components/ui-components/HeaderComponent';

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
  Questions
},
{
  initialRouteName: 'Home',
  navigationOptions: ({ navigation }) => ({
    header: <HeaderComponent title={navigation.state.params ? navigation.state.params.title : navigation.state.routeName} />,
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  })
});

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <RootStack ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        />
      </Provider>
    );
  }
}
