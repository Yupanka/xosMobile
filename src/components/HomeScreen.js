import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadQuestionnaires } from '../actions/actions';
import { styles } from './styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome, {this.props.username}</Text>
        {(this.props.userrole && this.props.userrole === 'General Manager') ?
        (<Button
          title="GM Checklist"
          onPress={(e) => this.props.requestQuestionnaires(this.props.userrole, e)}
        />) : 
        (<View>
          <Button
          title="GEMBA Walk"
          onPress={(e) => this.props.requestQuestionnaires(this.props.userrole, e)}
        />
        <Button
          title="Risk Items"
          onPress={() => this.props.navigation.navigate('Knock')}
        />
        </View>)}
        <Button
          title="Assign Action"
          onPress={() => this.props.navigation.navigate('Knock')}
        />
        <Button
          title="Give Recognition"
          onPress={() => this.props.navigation.navigate('Knock')}
        />
        <Button
          title="Best Practice"
          onPress={() => this.props.navigation.navigate('Knock')}
        />

        
      </View>
    );
  }
}

HomeScreen.propTypes = {
  usename: PropTypes.string,
  userrole: PropTypes.string,
};

const mapStateToProps = state => ({
  username: state.user.username,
  userrole: state.user.role,
});

const mapDispatchToProps = dispatch => ({ 
  requestQuestionnaires: (role, e) => {
    e.preventDefault();
    dispatch(loadQuestionnaires(role))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
