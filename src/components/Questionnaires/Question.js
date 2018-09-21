import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-native-paper';
import { View } from 'react-native';
import Answer from './Answer';

export default class Question extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hideSection: true
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  toggleHidden () {
    this.setState({
      hideSection: !this.state.hideSection
    });
  }

  render () {
    return this.props.item.answer ? (
      <View>
        <List.Item
          title={this.props.item.question}
          description={this.props.item.answer}
          onPress={this.toggleHidden}
        />
        {!this.state.hideSection && <Answer question={this.props.item} />}

      </View>) : (
      <View>
        <List.Item
          title={this.props.item.question}
          onPress={this.toggleHidden}
        />
        {!this.state.hideSection && <Answer question={this.props.item} />}
      </View>
    );
  }
}

Question.propTypes = {
  item: PropTypes.object.isRequired
};

Question.defaultProps = {
  item: { question: '', answer: '' }
};
