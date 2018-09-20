import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import { styles } from './styles';
import HeaderSearch from './HeaderSearch';
import NavigationService from '../../NavigationService.js';

class HeaderComponent extends React.Component {
	constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
	handleGoBack(e) {
		e.preventDefault();
		NavigationService.goBack();
	}
  render() {
    return (
    	<View>
    		<Appbar.Header>
	        <Appbar.BackAction
	          onPress={this.handleGoBack}
	        />
	        <Appbar.Content
	          title={this.props.title}
	          subtitle="Subtitle"
	        />
	        <Appbar.Action icon="more-vert" />
	      </Appbar.Header>
				<HeaderSearch location={this.props.location} area={this.props.area} />
			</View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  location: state.user.location,
  area: state.user.area,
  title: ownProps.title,
});

export default connect(mapStateToProps)(HeaderComponent);
