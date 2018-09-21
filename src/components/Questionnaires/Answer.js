import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { answerQuestion } from '../../actions/actions';
// import { styles } from './styles';

class Answer extends React.Component {
  handleAnswerType = (answer, e) => {
    const question = this.props.question.id;
    e.preventDefault();
    this.props.answerQuestion(question, answer);
  }

  handleAnswerSelect = (answer) => {
    const question = this.props.question.id;
    this.props.answerQuestion(question, answer);
  }

  render () {
    const answerOpt = this.props.question.answer_options || [];
    return this.props.question.answerType === 'string' ? (
      <TextInput multiline
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onEndEditing={(e) => this.handleAnswerType(e.nativeEvent.text, e)}
      />
    ) : (
      <Picker
        selectedValue={this.props.question.answer}
        onValueChange={(val) => this.handleAnswerSelect(val)}>
        {answerOpt.map((a, key) => <Picker.Item key={key} label={a} value={a} />)}
      </Picker>
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
