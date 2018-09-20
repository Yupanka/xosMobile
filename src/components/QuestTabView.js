import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

export default class QuestTabView extends React.Component {

state = {
    index: 0,
    routes: [
      { key: 'daily', title: 'Daily' },
      { key: 'weekly', title: 'Weekly' },
      { key: 'monthly', title: 'Monthly' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    daily: this.props.daily,
    weekly: this.props.weekly,
    monthly: this.props.monthly,
  });

  render() {
    console.log(typeof(this.props.daily))
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}