import React from 'react';
import { Text, View } from 'react-native';
// import { Text, View, Button } from 'react-native';
import { styles } from './styles';

class Knock extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Knock knock</Text>
      </View>
    );
  }
}

export default Knock;
