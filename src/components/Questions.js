import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, Text, View, Button, FlatList, Picker} from 'react-native';
import { connect } from 'react-redux';
import { answerQuestion } from '../actions/actions';
import { styles } from './styles';
import { getQuestions } from '../selectors/selectors';
import Answer from './Answer';

class Questions extends React.Component {
  
  render() {
    return (
      <FlatList
        data={this.props.questionnaire.questions.map((q, key) => q)}
        renderItem={({item}) => <View>
          <Text>{item.question}</Text>
          <Text>{item.answer}</Text>
          <Answer question={item} />
          </View>}
      />
    )
  }
}
// onpress on answer appears picker. Picker shows options from the props passed to it by parent. On select it executes function passed from parent
// then what - does it hide? or it hides on click on the parent? or on focus loss?

Questions.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  match: PropTypes.object
};

Questions.defaultProps = {
  questionnaire: {},
};

const mapStateToProps = state => ({
  questionnaire: getQuestions(state.questionList),
});

const mapDispatchToProps = dispatch => ({ 
  answerQuestion: (question, answer, e) => {
    e.preventDefault();
    return dispatch(answerQuestion(question, answer))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
