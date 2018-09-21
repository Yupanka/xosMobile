import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { answerQuestion } from '../../actions/actions';
// import { styles } from './styles';

class Answer extends React.Component {
  handleAnswer = (answer, e) => {
    const question = this.props.question.id;
    e.preventDefault();
    this.props.answerQuestion(question, answer);
  }

  render () {
    const answerOpt = this.props.question.answer_options || [];
    return this.props.question.answerType === 'string' ? (
      <TextInput multiline
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onEndEditing={(e) => this.handleAnswer(e.nativeEvent.text, e)}
      />
    ) : (
      <FlatList
        data={answerOpt.map((a, key) => a)}
        renderItem={({ item }) => <Button key={item} title={item} onPress={(e) => this.handleAnswer(item, e)} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

Answer.propTypes = {
  question: PropTypes.object,
  answerQuestion: PropTypes.func
};

Answer.defaultProps = {
  question: { id: '', answer_options: [], answerType: '' },
  answerQuestion: () => {}
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  answerQuestion: (question, answer) => {
    return dispatch(answerQuestion(question, answer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
