import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { styles } from './styles';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Wake Up, Neo</Text>
        <Text style={styles.welcome}>The Matrix has you</Text>
        <Button
          title="Follow the White Rabbit"
          onPress={() => this.props.navigator.push({screen: 'xosMobile.Knock', title: 'Knock'})}
        />
      </View>
    );
  }
}

export default Home;