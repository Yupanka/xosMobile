import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, View, Button, SectionList, TouchableOpacity, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { getQuestionList } from '../actions/actions';
import { styles } from './styles';
import ErrorAlert from './ErrorAlert'
import HeaderComponent from './HeaderComponent';
import { BottomNavigation, Text } from 'react-native-paper';
import QuestTabView from './QuestTabView';

class Questionnaires extends React.Component {
  constructor(props) {
    super(props);
    this.filteredQuestionnaires = this.filteredQuestionnaires.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: ({state}) => <HeaderComponent 
          title={navigation.state.params ? navigation.state.params.title : ''} 
          />
        }
  };

  filteredQuestionnaires(data) {
    return (<FlatList
      data={data}
      renderItem={({item, index}) => <Button title={item.name} onPress={(e) => this.props.getQuestionList(item.id, e)}/>}
      keyExtractor={(item, index) => index.toString()}
    />)
  }

  componentDidMount() {
    let screenTitle;
    if (this.props.userrole === 'General Manager') {
      screenTitle = "GM Questionnaire";
    } else {
      screenTitle = "GEMBA Walk";
    }

    this.props.navigation.setParams({
      title: screenTitle
    })
  }
  
  render() {
    return ( <QuestTabView 
      daily={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'daily'))}
      weekly={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'weekly'))}
      monthly={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'monthly'))}
     /> )
  }
}

Questionnaires.propTypes = {
  userrole: PropTypes.string,
  questionnaires: PropTypes.array,
  getQuestionList: PropTypes.func,
};

Questionnaires.defaultProps = {
  userrole: '',
  questionnaires: [],
  getQuestionList: null,
};

const mapStateToProps = state => ({
  userrole: state.user.role,
  questionnaires: state.questionnaires.questionnaires,
});

const mapDispatchToProps = dispatch => ({ 
  getQuestionList: (questID, e) => dispatch(getQuestionList(questID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);
