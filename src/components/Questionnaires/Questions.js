import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { answerQuestion } from '../../actions/actions';
// import { styles } from './styles';
import { getQuestions } from '../../selectors/selectors';
import Question from './Question';
import HeaderComponent from '../ui-components/HeaderComponent';

class Questions extends React.Component {
  constructor (props) {
    super(props);
    this.returnBack = this.returnBack.bind(this);
  }
  componentDidMount () {
    this.props.navigation.setParams({
      title: this.props.questionnaire.name
    });
  }
  returnBack (e) {
    // e.preventDefault();
    this.props.navigation.navigate('Questionnaires');
  }

  render () {
    return (<View>
      <HeaderComponent
        title={this.props.navigation.state.params ? this.props.navigation.state.params.title : this.props.navigation.state.routeName}
        back={this.returnBack}
        nav={this.props.navigation.openDrawer}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.props.questionnaire.questions}
        renderItem={({ item }) => <Question item={item} />}
      />
    </View>
    );
  }
}

Questions.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  match: PropTypes.object,
  navigation: PropTypes.object
};

Questions.defaultProps = {
  questionnaire: {},
  navigation: { setParams: () => {} }
};

const mapStateToProps = state => ({
  questionnaire: getQuestions(state.questionList)
});

const mapDispatchToProps = dispatch => ({
  answerQuestion: (question, answer, e) => {
    e.preventDefault();
    return dispatch(answerQuestion(question, answer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
