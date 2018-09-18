import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, Text, View, Button, SectionList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { getQuestionList } from '../actions/actions';
import { styles } from './styles';
import ErrorAlert from './ErrorAlert'

class Questionnaires extends React.Component {
  static navigationOptions = {
    title: "Questionnaires",
  };
  
  render() {
    return (
      <View>
      <SectionList
        renderItem={({item, index, section}) => <Button key={index} title={item.name} onPress={(e) => this.props.getQuestionList(item.id, e)}/>}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontWeight: 'bold'}}>{title}</Text>
        )}
        sections={[
          {title: 'Daily', data: this.props.questionnaires.filter((el) => el.type === 'daily').map((q, key) => q)},
          {title: 'Weekly', data: this.props.questionnaires.filter((el) => el.type === 'weekly').map((q, key) => q)},
          {title: 'Monthly', data: this.props.questionnaires.filter((el) => el.type === 'monthly').map((q, key) => q)},
        ]}
        keyExtractor={(item, index) => item + index}
        ListEmptyComponent={() => <Text>Sorry, we found nothing</Text>}
      />
<TouchableOpacity onPress = {(e) =>{e.preventDefault(); ErrorAlert("OOPS")}} style = {styles.button}>
         <Text>Alert</Text>
      </TouchableOpacity>
      </View>
    );
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