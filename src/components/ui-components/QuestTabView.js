import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlatList, View } from 'react-native';
import { List } from 'react-native-paper';

export default class QuestTabView extends React.Component {
    state = {
      active: 'daily'
    }

  handleFilter = (val, e) => {
    e.preventDefault();
    this.setState({ active: val });
  }

  render () {
    const q = this.props.questionnaires.filter((quest) => quest.type === this.state.active);
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={q}
          renderItem={({ item }) => <List.Item
            title={item.name}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={(e) => this.props.loadQuestions(item.id, e)}
          />}
        />
        <Button title="Daily" onPress={(e) => this.handleFilter('daily', e)} />
        <Button title="Weekly" onPress={(e) => this.handleFilter('weekly', e)} />
        <Button title="Monthly" onPress={(e) => this.handleFilter('monthly', e)} />
      </View>
    );
  }
}

QuestTabView.propTypes = {
  questionnaires: PropTypes.array,
  loadQuestions: PropTypes.func
};

QuestTabView.defaultProps = {
  questionnaires: [],
  loadQuestions: () => {}
};
