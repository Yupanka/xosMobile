import React from 'react';
import PropTypes from 'prop-types';
import { Button, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getQuestionList } from '../../actions/actions';
// import { styles } from './styles';
import HeaderComponent from '../ui-components/HeaderComponent';
// import QuestTabView from '../ui-components/QuestTabView';

class Questionnaires extends React.Component {
  constructor (props) {
    super(props);
    this.filteredQuestionnaires = this.filteredQuestionnaires.bind(this);
  }

  filteredQuestionnaires (data) {
    return (<FlatList
      data={data}
      renderItem={({ item, index }) => <Button title={item.name} onPress={(e) => this.props.getQuestionList(item.id, e)}/>}
      keyExtractor={(item, index) => index.toString()}
    />);
  }

  componentDidMount () {
    let screenTitle;
    if (this.props.userrole === 'General Manager') {
      screenTitle = 'GM Questionnaires';
    } else {
      screenTitle = 'GEMBA Walk';
    }

    this.props.navigation.setParams({
      title: screenTitle
    });
  }

  render () {
    return (
      <View>

        <HeaderComponent
          title={this.props.navigation.state.params ? this.props.navigation.state.params.title : this.props.navigation.state.routeName}
          nav={this.props.navigation.openDrawer}
        />
        <Text>Here will be a list of questionnaires filtered by type</Text>
        {this.props.questionnaires.map((q, key) => <Button title={q.name} key={key} />)}

        {/* <QuestTabView
          daily={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'daily'))}
          weekly={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'weekly'))}
          monthly={() => this.filteredQuestionnaires(this.props.questionnaires.filter((el) => el.type === 'monthly'))}
        /> */}

      </View>

    );
  }
}

Questionnaires.propTypes = {
  userrole: PropTypes.string,
  questionnaires: PropTypes.array,
  getQuestionList: PropTypes.func,
  navigation: PropTypes.object
};

Questionnaires.defaultProps = {
  userrole: '',
  questionnaires: [],
  getQuestionList: null,
  navigation: { setParams: () => {} }
};

const mapStateToProps = state => ({
  userrole: state.user.role,
  questionnaires: state.questionnaires.questionnaires
});

const mapDispatchToProps = dispatch => ({
  getQuestionList: (questID, e) => dispatch(getQuestionList(questID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);
