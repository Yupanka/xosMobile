import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation } from 'react-native-paper';

export default class QuestTabView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'daily', title: 'Daily' },
      { key: 'weekly', title: 'Weekly' },
      { key: 'monthly', title: 'Monthly' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    daily: this.props.daily,
    weekly: this.props.weekly,
    monthly: this.props.monthly
  });

  render () {
    console.log(typeof (this.props.daily));
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

QuestTabView.propTypes = {
  daily: PropTypes.func,
  weekly: PropTypes.func,
  monthly: PropTypes.func
};

QuestTabView.defaultProps = {
  daily: () => {},
  weekly: () => {},
  monthly: () => {}
};
