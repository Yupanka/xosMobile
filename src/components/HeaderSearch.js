import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { HeaderBackButton } from 'react-navigation';
import { styles } from './styles';

class HeaderSearch extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      hideSearch: true
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }
	toggleHidden () {
    this.setState({
      hideSearch: !this.state.hideSearch
    })
  }
  render() {
    return (
    	<View>
  			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
          <Text style={{color: '#fff'}} onPress={this.toggleHidden}>{this.props.location}</Text>
          <Text style={{color: '#fff'}} onPress={this.toggleHidden}>{this.props.area}</Text>
  			</View>
  			{!this.state.hideSearch && <Searchbar placeholder='Search locations' />}
			</View>
    );
  }
}

export default HeaderSearch;
