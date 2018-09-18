import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { styles } from './styles';

class Header extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.screen}</Text>
      </View>
    );
  }
}

export default Header;